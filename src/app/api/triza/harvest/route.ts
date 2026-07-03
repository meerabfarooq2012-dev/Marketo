import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { harvestTopic } from '@/lib/triza-basket/harvester'
import { invalidateIndex } from '@/lib/triza-basket/matcher'

/**
 * POST /api/triza/harvest
 *
 *   The Knowledge Harvester Agent — TRIZA ka "internet se seekhne
 *   wala" agent. User ek topic deta hai, agent internet par us
 *   topic par search karta hai, top pages read karta hai, aur
 *   unka content TRIZA ke knowledge store mein daal deta hai.
 *
 *   Body: { topic: string, maxSources?: number }
 *     - topic (required): kis topic par knowledge collect karni hai
 *     - maxSources (optional): kitne pages read karne hain (2–10, default 5)
 *
 *   Response: {
 *     success: boolean,
 *     topic: string,
 *     basketId: string,          // basket entry for transparency
 *     sourcesFound: number,      // search results
 *     sourcesRead: number,       // successfully read
 *     sourcesFailed: number,
 *     itemsAdded: number,        // knowledge items created
 *     totalItemsInStore: number, // total items after harvest
 *     processingTimeMs: number,
 *     sources: Array<{ url, title, hostName, readSuccess, contentLength, paragraphsExtracted, error? }>,
 *     errors: string[]
 *   }
 *
 *   IMPORTANT: Yeh route z-ai-web-dev-sdk use karta hai sirf DATA
 *   collect karne ke liye (web_search + page_reader). TRIZA ki
 *   conversation engine model-free rehti hai — woh apna TF-IDF +
 *   cosine + synonym algorithm use karti hai.
 */
export const maxDuration = 60 // harvesting may take a while (reading 5+ pages)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const { topic, maxSources } = body || {}

    if (!topic || typeof topic !== 'string' || !topic.trim()) {
      return NextResponse.json(
        { error: 'topic is required (e.g. "photosynthesis", "Pakistan history")' },
        { status: 400 }
      )
    }

    const trimmedTopic = topic.trim()
    const sources = Math.min(10, Math.max(2, Number(maxSources) || 5))

    // 1. Harvest knowledge from the internet
    const result = await harvestTopic(trimmedTopic, { maxSources: sources })

    if (result.items.length === 0) {
      return NextResponse.json({
        success: false,
        topic: trimmedTopic,
        message:
          result.errors.length > 0
            ? `Internet se knowledge collect nahi ho saki. ${result.errors[0]}`
            : 'Is topic par internet se koi useful content nahi mila.',
        sourcesFound: result.sourcesFound,
        sourcesRead: result.sourcesRead,
        sourcesFailed: result.sourcesFailed,
        itemsAdded: 0,
        processingTimeMs: result.processingTimeMs,
        sources: result.sources.map((s) => ({
          url: s.url,
          title: s.title,
          hostName: s.hostName,
          readSuccess: s.readSuccess,
          contentLength: s.contentLength,
          paragraphsExtracted: s.paragraphsExtracted,
          error: s.error,
        })),
        errors: result.errors,
      })
    }

    // 2. Create a basket entry for the harvested content (transparency —
    //    user can see in the Basket tab what was collected from where)
    const topicSlug =
      trimmedTopic
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '')
        .slice(0, 40) || 'harvested'

    const basket = await db.trizaKnowledgeBasket.create({
      data: {
        source: 'harvest',
        sourceLabel: `Internet: ${trimmedTopic}`,
        // Keep a preview of the raw content (truncate for storage)
        rawContent: result.rawCombinedText.slice(0, 15000),
        metaJson: JSON.stringify({
          topic: trimmedTopic,
          topicSlug,
          sourcesFound: result.sourcesFound,
          sourcesRead: result.sourcesRead,
          sources: result.sources.map((s) => ({
            url: s.url,
            title: s.title,
            hostName: s.hostName,
            readSuccess: s.readSuccess,
            paragraphsExtracted: s.paragraphsExtracted,
          })),
          harvestedAt: new Date().toISOString(),
        }),
        // Already processed — items go straight to the knowledge store
        status: 'processed',
        itemCount: result.items.length,
        processedAt: new Date(),
      },
    })

    // 3. Insert all harvested items as permanent knowledge items
    //    Use a transaction for atomicity
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

    // 4. Invalidate the in-memory TF-IDF index so new items are searchable
    invalidateIndex()

    const totalItemsInStore = await db.trizaKnowledgeItem.count()

    return NextResponse.json({
      success: true,
      topic: trimmedTopic,
      basketId: basket.id,
      sourcesFound: result.sourcesFound,
      sourcesRead: result.sourcesRead,
      sourcesFailed: result.sourcesFailed,
      totalContentChars: result.totalContentChars,
      totalParagraphs: result.totalParagraphs,
      itemsAdded: result.items.length,
      totalItemsInStore,
      processingTimeMs: result.processingTimeMs,
      sources: result.sources.map((s) => ({
        url: s.url,
        title: s.title,
        hostName: s.hostName,
        readSuccess: s.readSuccess,
        contentLength: s.contentLength,
        paragraphsExtracted: s.paragraphsExtracted,
        error: s.error,
      })),
      errors: result.errors,
    })
  } catch (err) {
    console.error('[harvest] error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Harvest failed' },
      { status: 500 }
    )
  }
}
