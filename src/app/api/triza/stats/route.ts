import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getIndexStats } from '@/lib/triza-basket/matcher'

/**
 * GET /api/triza/stats
 *   Dashboard numbers: basket counts, knowledge-store counts, index stats.
 */
export async function GET(_req: NextRequest) {
  try {
    const [
      pendingBasket,
      processedBasket,
      errorBasket,
      totalItems,
      totalUses,
      topUsed,
      recentItems,
      indexStats,
      topics,
    ] = await Promise.all([
      db.trizaKnowledgeBasket.count({ where: { status: 'pending' } }),
      db.trizaKnowledgeBasket.count({ where: { status: 'processed' } }),
      db.trizaKnowledgeBasket.count({ where: { status: 'error' } }),
      db.trizaKnowledgeItem.count(),
      db.trizaKnowledgeItem.aggregate({ _sum: { uses: true } }),
      db.trizaKnowledgeItem.findMany({
        orderBy: { uses: 'desc' },
        take: 5,
        select: { id: true, question: true, topic: true, uses: true, upCount: true, downCount: true },
      }),
      db.trizaKnowledgeItem.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: { id: true, question: true, topic: true, createdAt: true },
      }),
      getIndexStats(),
      db.trizaKnowledgeItem.groupBy({
        by: ['topic'],
        _count: { _all: true },
        orderBy: { _count: { topic: 'desc' } },
        take: 12,
      }),
    ])

    return NextResponse.json({
      basket: {
        pending: pendingBasket,
        processed: processedBasket,
        error: errorBasket,
        total: pendingBasket + processedBasket + errorBasket,
      },
      knowledge: {
        totalItems,
        totalUses: totalUses._sum.uses || 0,
        topics: topics.map((t) => ({ topic: t.topic, count: t._count._all })),
      },
      index: {
        totalItems: indexStats.totalItems,
        vocabSize: indexStats.vocabSize,
        version: indexStats.indexVersion,
      },
      topUsed: topUsed.map((t) => ({
        id: t.id,
        question: t.question.split('|')[0].slice(0, 100),
        topic: t.topic,
        uses: t.uses,
        upCount: t.upCount,
        downCount: t.downCount,
      })),
      recent: recentItems.map((r) => ({
        id: r.id,
        question: r.question.split('|')[0].slice(0, 100),
        topic: r.topic,
        createdAt: r.createdAt.toISOString(),
      })),
    })
  } catch (err) {
    console.error('[triza stats] error:', err)
    return NextResponse.json({ error: 'Failed to load stats' }, { status: 500 })
  }
}
