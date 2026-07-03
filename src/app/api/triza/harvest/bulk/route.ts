import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { harvestTopic } from '@/lib/triza-basket/harvester'
import { invalidateIndex } from '@/lib/triza-basket/matcher'

/**
 * ============================================================
 *  BULK HARVEST — Internet se HUNDREDS of topics ek hi waqt mein
 * ============================================================
 *
 *  POST /api/triza/harvest/bulk
 *    Body: {
 *      topics: string[],              // list of topics to harvest
 *      maxSourcesPerTopic?: number    // 2–5 (default 3 for speed)
 *    }
 *
 *  Response: Server-Sent Events (SSE) stream
 *    event: start
 *      data: { totalTopics, startedAt }
 *
 *    event: topic_start
 *      data: { index, topic, total }
 *
 *    event: topic_done
 *      data: { index, topic, itemsAdded, sourcesRead, sourcesFailed,
 *              cumulativeItems, cumulativeSources, failedTopics,
 *              elapsedMs }
 *
 *    event: topic_error
 *      data: { index, topic, error }
 *
 *    event: complete
 *      data: { totalTopics, totalItemsAdded, totalSourcesRead,
 *              totalSourcesFailed, failedTopics, totalTimeMs,
 *              totalItemsInStore }
 *
 *  IMPORTANT: Yeh route z-ai-web-dev-sdk use karta hai sirf DATA
 *  collect karne ke liye. TRIZA ki conversation engine model-free
 *  rehti hai.
 * ============================================================
 */

export const maxDuration = 300 // bulk may take several minutes

interface BulkProgress {
  index: number
  topic: string
  itemsAdded: number
  sourcesRead: number
  sourcesFailed: number
  error?: string
}

function sseEvent(event: string, data: unknown): string {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const { topics, maxSourcesPerTopic } = body || {}

    if (!Array.isArray(topics) || topics.length === 0) {
      return new Response(
        JSON.stringify({ error: 'topics array is required (non-empty)' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Clean + dedupe + cap the topic list
    const cleanTopics = Array.from(
      new Set(
        topics
          .map((t: unknown) => (typeof t === 'string' ? t.trim() : ''))
          .filter((t: string) => t.length > 0)
      )
    ).slice(0, 150) // hard cap at 150 topics per bulk run

    if (cleanTopics.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No valid topics provided' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const sourcesPerTopic = Math.min(5, Math.max(2, Number(maxSourcesPerTopic) || 3))

    const startedAt = Date.now()
    let cumulativeItems = 0
    let cumulativeSourcesRead = 0
    let cumulativeSourcesFailed = 0
    const failedTopics: string[] = []

    const encoder = new TextEncoder()

    const stream = new ReadableStream({
      async start(controller) {
        const send = (event: string, data: unknown) => {
          try {
            controller.enqueue(encoder.encode(sseEvent(event, data)))
          } catch {
            // controller may be closed if client disconnected
          }
        }

        send('start', {
          totalTopics: cleanTopics.length,
          startedAt: new Date(startedAt).toISOString(),
          sourcesPerTopic,
        })

        for (let i = 0; i < cleanTopics.length; i++) {
          const topic = cleanTopics[i]

          send('topic_start', {
            index: i,
            topic,
            total: cleanTopics.length,
          })

          let progress: BulkProgress
          try {
            const result = await harvestTopic(topic, {
              maxSources: sourcesPerTopic,
              maxCharsPerPage: 6000,
              maxParagraphsPerPage: 15,
            })

            if (result.items.length > 0) {
              // Create a basket entry for transparency
              const topicSlug =
                topic
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, '_')
                  .replace(/^_+|_+$/g, '')
                  .slice(0, 40) || 'harvested'

              try {
                const basket = await db.trizaKnowledgeBasket.create({
                  data: {
                    source: 'bulk-harvest',
                    sourceLabel: `Bulk: ${topic}`,
                    rawContent: result.rawCombinedText.slice(0, 8000),
                    metaJson: JSON.stringify({
                      topic,
                      topicSlug,
                      bulkRun: true,
                      sourcesRead: result.sourcesRead,
                      itemsExtracted: result.items.length,
                      harvestedAt: new Date().toISOString(),
                    }),
                    status: 'processed',
                    itemCount: result.items.length,
                    processedAt: new Date(),
                  },
                })

                await db.$transaction(
                  result.items.map((item) =>
                    db.trizaKnowledgeItem.create({
                      data: {
                        basketId: basket.id,
                        question: item.question,
                        answer: item.answer,
                        topic: item.topic,
                        intent: item.intent,
                        keywords: item.keywords,
                      },
                    })
                  )
                )

                // Invalidate index periodically (every 5 topics) for efficiency
                if (i % 5 === 0 || i === cleanTopics.length - 1) {
                  invalidateIndex()
                }
              } catch (dbErr) {
                console.error('[bulk-harvest] db error:', dbErr)
              }
            }

            cumulativeItems += result.items.length
            cumulativeSourcesRead += result.sourcesRead
            cumulativeSourcesFailed += result.sourcesFailed

            if (result.items.length === 0) {
              failedTopics.push(topic)
            }

            progress = {
              index: i,
              topic,
              itemsAdded: result.items.length,
              sourcesRead: result.sourcesRead,
              sourcesFailed: result.sourcesFailed,
            }

            send('topic_done', {
              ...progress,
              cumulativeItems,
              cumulativeSources: cumulativeSourcesRead,
              failedTopics: failedTopics.length,
              elapsedMs: Date.now() - startedAt,
            })
          } catch (e) {
            const errMsg = e instanceof Error ? e.message : String(e)
            console.error(`[bulk-harvest] topic "${topic}" failed:`, errMsg)
            failedTopics.push(topic)
            cumulativeSourcesFailed += sourcesPerTopic

            send('topic_error', {
              index: i,
              topic,
              error: errMsg.slice(0, 200),
            })

            send('topic_done', {
              index: i,
              topic,
              itemsAdded: 0,
              sourcesRead: 0,
              sourcesFailed: sourcesPerTopic,
              cumulativeItems,
              cumulativeSources: cumulativeSourcesRead,
              failedTopics: failedTopics.length,
              elapsedMs: Date.now() - startedAt,
            })
          }
        }

        // Final index invalidation to ensure all new items are searchable
        invalidateIndex()

        const totalItemsInStore = await db.trizaKnowledgeItem
          .count()
          .catch(() => -1)

        send('complete', {
          totalTopics: cleanTopics.length,
          totalItemsAdded: cumulativeItems,
          totalSourcesRead: cumulativeSourcesRead,
          totalSourcesFailed: cumulativeSourcesFailed,
          failedTopics: failedTopics.length,
          failedTopicList: failedTopics,
          totalTimeMs: Date.now() - startedAt,
          totalItemsInStore,
        })

        try {
          controller.close()
        } catch {
          // already closed
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
        'X-Accel-Buffering': 'no', // disable proxy buffering (Caddy)
      },
    })
  } catch (err) {
    console.error('[bulk-harvest] fatal error:', err)
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : 'Bulk harvest failed',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
