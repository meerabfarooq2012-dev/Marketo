import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { parseBasketContent } from '@/lib/triza-basket/parser'
import { invalidateIndex } from '@/lib/triza-basket/matcher'

/**
 * POST /api/triza/basket/process
 *   "Process the basket" — take every PENDING basket chunk, parse it,
 *   and insert the parsed items into TrizaKnowledgeItem. Marks each
 *   chunk as "processed" (or "error" if parsing failed).
 *
 *   Body (optional): { basketIds?: string[] }
 *     - If basketIds provided, process only those chunks.
 *     - Otherwise process ALL pending chunks.
 *
 *   Returns: { processedChunks, addedItems, errors, totalItemsInStore }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const { basketIds } = body || {}

    const where =
      Array.isArray(basketIds) && basketIds.length > 0
        ? { id: { in: basketIds }, status: 'pending' as const }
        : { status: 'pending' as const }

    const pending = await db.trizaKnowledgeBasket.findMany({
      where,
      orderBy: { createdAt: 'asc' },
    })

    let addedItems = 0
    const errors: Array<{ basketId: string; error: string }> = []
    let processedChunks = 0

    for (const chunk of pending) {
      try {
        const result = parseBasketContent(chunk.rawContent)
        if (result.items.length === 0) {
          await db.trizaKnowledgeBasket.update({
            where: { id: chunk.id },
            data: {
              status: 'error',
              errorMsg: result.errors.join(' ') || 'No items could be parsed.',
              itemCount: 0,
              processedAt: new Date(),
            },
          })
          errors.push({
            basketId: chunk.id,
            error: result.errors.join(' ') || 'No items could be parsed.',
          })
          continue
        }

        // Insert all parsed items for this chunk in one transaction
        await db.$transaction(
          result.items.map((item) =>
            db.trizaKnowledgeItem.create({
              data: {
                basketId: chunk.id,
                question: item.question,
                answer: item.answer,
                topic: item.topic,
                intent: item.intent,
                keywords: item.keywords,
              },
            })
          )
        )

        await db.trizaKnowledgeBasket.update({
          where: { id: chunk.id },
          data: {
            status: 'processed',
            itemCount: result.items.length,
            errorMsg: null,
            processedAt: new Date(),
          },
        })

        addedItems += result.items.length
        processedChunks += 1
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e)
        await db.trizaKnowledgeBasket.update({
          where: { id: chunk.id },
          data: {
            status: 'error',
            errorMsg: msg.slice(0, 500),
            processedAt: new Date(),
          },
        })
        errors.push({ basketId: chunk.id, error: msg })
      }
    }

    // Invalidate the in-memory index so the next chat sees new items
    invalidateIndex()

    const totalItemsInStore = await db.trizaKnowledgeItem.count()

    return NextResponse.json({
      processedChunks,
      addedItems,
      errors,
      totalItemsInStore,
    })
  } catch (err) {
    console.error('[basket process] error:', err)
    return NextResponse.json({ error: 'Failed to process basket' }, { status: 500 })
  }
}
