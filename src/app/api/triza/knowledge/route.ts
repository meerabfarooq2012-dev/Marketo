import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { invalidateIndex } from '@/lib/triza-basket/matcher'

/**
 * GET /api/triza/knowledge
 *   List knowledge items. Optional: ?topic=science  ?intent=how_to  ?q=photosynth  ?limit=200
 *
 * POST /api/triza/knowledge
 *   Add a SINGLE knowledge item directly (bypass the basket).
 *   Body: { question, answer, topic?, intent?, keywords? }
 *
 * DELETE /api/triza/knowledge
 *   Bulk delete by ids. Body: { ids: string[] }
 */
export async function GET(req: NextRequest) {
  try {
    const topic = req.nextUrl.searchParams.get('topic')
    const intent = req.nextUrl.searchParams.get('intent')
    const q = req.nextUrl.searchParams.get('q')
    const limit = Math.min(
      500,
      parseInt(req.nextUrl.searchParams.get('limit') || '200', 10)
    )

    const where: Record<string, unknown> = {}
    if (topic) where.topic = topic
    if (intent) where.intent = intent
    if (q) {
      where.OR = [
        { question: { contains: q } },
        { answer: { contains: q } },
        { keywords: { contains: q } },
      ]
    }

    const rows = await db.trizaKnowledgeItem.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
    })

    const topics = await db.trizaKnowledgeItem.groupBy({
      by: ['topic'],
      _count: { _all: true },
      orderBy: { _count: { topic: 'desc' } },
    })

    return NextResponse.json({
      items: rows.map((r) => ({
        id: r.id,
        basketId: r.basketId,
        question: r.question,
        answer: r.answer,
        topic: r.topic,
        intent: r.intent,
        keywords: r.keywords,
        uses: r.uses,
        upCount: r.upCount,
        downCount: r.downCount,
        createdAt: r.createdAt.toISOString(),
      })),
      total: rows.length,
      topics: topics.map((t) => ({ topic: t.topic, count: t._count._all })),
    })
  } catch (err) {
    console.error('[knowledge GET] error:', err)
    return NextResponse.json({ error: 'Failed to load knowledge' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { question, answer, topic, intent, keywords } = body || {}

    if (!question || typeof question !== 'string' || !question.trim()) {
      return NextResponse.json({ error: 'question is required' }, { status: 400 })
    }
    if (!answer || typeof answer !== 'string' || !answer.trim()) {
      return NextResponse.json({ error: 'answer is required' }, { status: 400 })
    }

    const row = await db.trizaKnowledgeItem.create({
      data: {
        question: question.trim(),
        answer: answer.trim(),
        topic: (topic || 'general').toString().trim(),
        intent: (intent || 'factual_question').toString().trim(),
        keywords: (keywords || '').toString().trim(),
      },
    })
    invalidateIndex()
    return NextResponse.json({ id: row.id, created: true })
  } catch (err) {
    console.error('[knowledge POST] error:', err)
    return NextResponse.json({ error: 'Failed to add knowledge item' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const { ids } = body || {}
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'ids[] required' }, { status: 400 })
    }
    const result = await db.trizaKnowledgeItem.deleteMany({
      where: { id: { in: ids } },
    })
    invalidateIndex()
    return NextResponse.json({ deleted: result.count })
  } catch (err) {
    console.error('[knowledge DELETE] error:', err)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
