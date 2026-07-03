import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { parseBasketContent } from '@/lib/triza-basket/parser'

/**
 * GET /api/triza/basket
 *   List all basket chunks (default: only pending). ?status=all for everything.
 *
 * POST /api/triza/basket
 *   Drop a new chunk into the basket (tokri).
 *   Body: { source, sourceLabel?, rawContent, meta? }
 *     source: "paste" | "qa" | "file" | "manual"
 *   The chunk is saved with status "pending" — it stays in the
 *   basket until the user clicks "Process Basket".
 */

export async function GET(req: NextRequest) {
  try {
    const status = req.nextUrl.searchParams.get('status') || 'pending'
    const where = status === 'all' ? {} : { status }
    const rows = await db.trizaKnowledgeBasket.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { items: true } } },
    })
    return NextResponse.json({
      basket: rows.map((r) => ({
        id: r.id,
        source: r.source,
        sourceLabel: r.sourceLabel,
        rawContent: r.rawContent,
        metaJson: r.metaJson,
        status: r.status,
        itemCount: r.itemCount,
        errorMsg: r.errorMsg,
        producedItems: r._count.items,
        createdAt: r.createdAt.toISOString(),
        processedAt: r.processedAt ? r.processedAt.toISOString() : null,
      })),
      total: rows.length,
    })
  } catch (err) {
    console.error('[basket GET] error:', err)
    return NextResponse.json({ error: 'Failed to load basket' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { source, sourceLabel, rawContent, meta } = body || {}

    if (!rawContent || typeof rawContent !== 'string' || !rawContent.trim()) {
      return NextResponse.json({ error: 'rawContent is required' }, { status: 400 })
    }
    const validSources = ['paste', 'qa', 'file', 'manual', 'harvest']
    const src = validSources.includes(source) ? source : 'manual'

    // Pre-parse (dry-run) so the UI can show how many items WILL be produced
    const preview = parseBasketContent(rawContent)

    const row = await db.trizaKnowledgeBasket.create({
      data: {
        source: src,
        sourceLabel: sourceLabel ? String(sourceLabel).slice(0, 200) : null,
        rawContent,
        metaJson: meta ? JSON.stringify(meta) : null,
        status: 'pending',
        itemCount: preview.items.length,
      },
    })

    return NextResponse.json({
      id: row.id,
      source: row.source,
      sourceLabel: row.sourceLabel,
      status: row.status,
      itemCount: row.itemCount,
      previewFormat: preview.format,
      previewErrors: preview.errors,
      createdAt: row.createdAt.toISOString(),
    })
  } catch (err) {
    console.error('[basket POST] error:', err)
    return NextResponse.json({ error: 'Failed to add to basket' }, { status: 500 })
  }
}
