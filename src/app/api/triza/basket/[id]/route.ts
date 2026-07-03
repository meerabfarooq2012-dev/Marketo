import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { invalidateIndex } from '@/lib/triza-basket/matcher'

/**
 * DELETE /api/triza/basket/[id]
 *   Remove ONE basket chunk. Also deletes the knowledge items that
 *   were produced from it (cascade via basketId SetNull would orphan
 *   them; we explicitly delete to keep the store clean — unless
 *   ?keepItems=1 is passed).
 *
 * DELETE /api/triza/basket?clear=all
 *   Remove ALL pending basket chunks (does NOT touch processed ones
 *   or their produced items).
 */
export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split('/').pop()
    const clearAll = req.nextUrl.searchParams.get('clear')

    if (clearAll === 'all') {
      // Clear all PENDING basket chunks only
      const result = await db.trizaKnowledgeBasket.deleteMany({
        where: { status: 'pending' },
      })
      return NextResponse.json({ cleared: result.count })
    }

    if (!id || id === 'basket') {
      return NextResponse.json({ error: 'Basket id required' }, { status: 400 })
    }

    const keepItems = req.nextUrl.searchParams.get('keepItems') === '1'

    // Optionally delete the items this chunk produced
    if (!keepItems) {
      await db.trizaKnowledgeItem.deleteMany({ where: { basketId: id } })
      invalidateIndex()
    }

    await db.trizaKnowledgeBasket.delete({ where: { id } })
    return NextResponse.json({ deleted: true, id })
  } catch (err) {
    console.error('[basket DELETE] error:', err)
    return NextResponse.json({ error: 'Failed to delete basket item' }, { status: 500 })
  }
}
