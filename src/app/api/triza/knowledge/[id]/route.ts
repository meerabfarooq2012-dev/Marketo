import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { invalidateIndex } from '@/lib/triza-basket/matcher'

/**
 * DELETE /api/triza/knowledge/[id]
 *   Delete ONE knowledge item.
 *
 * PATCH /api/triza/knowledge/[id]
 *   Update an item, OR adjust feedback (👍/👎).
 *   Body for feedback: { feedback: "up" | "down" | "clear" }
 *   Body for edit:     { question?, answer?, topic?, intent?, keywords? }
 */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await db.trizaKnowledgeItem.delete({ where: { id } })
    invalidateIndex()
    return NextResponse.json({ deleted: true, id })
  } catch (err) {
    console.error('[knowledge DELETE id] error:', err)
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()

    // Feedback path
    if (body?.feedback) {
      const fb = body.feedback as string
      const current = await db.trizaKnowledgeItem.findUnique({ where: { id } })
      if (!current) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
      }
      let upCount = current.upCount
      let downCount = current.downCount
      if (fb === 'up') {
        upCount = current.upCount + 1
        if (downCount > 0) downCount = Math.max(0, downCount - 1)
      } else if (fb === 'down') {
        downCount = current.downCount + 1
        if (upCount > 0) upCount = Math.max(0, upCount - 1)
      } else if (fb === 'clear') {
        upCount = 0
        downCount = 0
      }
      const updated = await db.trizaKnowledgeItem.update({
        where: { id },
        data: { upCount, downCount },
      })
      invalidateIndex()
      return NextResponse.json({
        id: updated.id,
        upCount: updated.upCount,
        downCount: updated.downCount,
      })
    }

    // Edit path
    const data: Record<string, string> = {}
    if (typeof body.question === 'string') data.question = body.question.trim()
    if (typeof body.answer === 'string') data.answer = body.answer.trim()
    if (typeof body.topic === 'string') data.topic = body.topic.trim()
    if (typeof body.intent === 'string') data.intent = body.intent.trim()
    if (typeof body.keywords === 'string') data.keywords = body.keywords.trim()

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 })
    }
    const updated = await db.trizaKnowledgeItem.update({ where: { id }, data })
    invalidateIndex()
    return NextResponse.json({
      id: updated.id,
      updated: true,
    })
  } catch (err) {
    console.error('[knowledge PATCH id] error:', err)
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 })
  }
}
