import { NextRequest, NextResponse } from 'next/server'
import { answerWithBasket, getIndexStats } from '@/lib/triza-basket/matcher'

/**
 * POST /api/triza/chat
 *   The self-made TRIZA answers using ONLY the knowledge-basket store.
 *   No model. No API key. Pure hand-written TF-IDF + cosine + synonyms.
 *
 *   Body: { message: string }
 *   Response: { answer, confidence, topic, intent, steps[], candidates[], totalItems, processingTimeMs }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { message } = body || {}

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'message is required' }, { status: 400 })
    }

    const result = await answerWithBasket(message.trim())
    const stats = await getIndexStats()

    return NextResponse.json({
      answer: result.answer,
      confidence: result.confidence,
      topic: result.topic,
      intent: result.intent,
      matchedItemId: result.itemId,
      steps: result.steps,
      candidates: result.candidates,
      totalItems: result.totalItems,
      vocabSize: stats.vocabSize,
      processingTimeMs: result.processingTimeMs,
    })
  } catch (err) {
    console.error('[triza chat] error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Chat failed' },
      { status: 500 }
    )
  }
}
