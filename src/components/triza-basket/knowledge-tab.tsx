'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  BookOpen,
  Search,
  Trash2,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  ChevronRight,
  Loader2,
  Hash,
  TrendingUp,
  Inbox,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { toast } from 'sonner'

interface KnowledgeItem {
  id: string
  question: string
  answer: string
  topic: string
  intent: string
  keywords: string
  uses: number
  upCount: number
  downCount: number
  createdAt: string
}

interface KnowledgeTabProps {
  onChanged: () => void
}

const TOPIC_COLORS: Record<string, string> = {
  science: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200',
  math: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200',
  technology: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-200',
  history: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200',
  geography: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200',
  health: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200',
  business: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200',
  'daily-life': 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-200',
  general: 'bg-gray-100 text-gray-800 dark:bg-gray-800/60 dark:text-gray-200',
  urdu: 'bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-200',
}

function topicColor(t: string): string {
  return TOPIC_COLORS[t] || TOPIC_COLORS.general
}

export function KnowledgeTab({ onChanged }: KnowledgeTabProps) {
  const [items, setItems] = useState<KnowledgeItem[]>([])
  const [topics, setTopics] = useState<Array<{ topic: string; count: number }>>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeTopic, setActiveTopic] = useState<string>('')
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (activeTopic) params.set('topic', activeTopic)
      if (search) params.set('q', search)
      params.set('limit', '300')
      const res = await fetch(`/api/triza/knowledge?${params.toString()}`)
      const data = await res.json()
      setItems(data.items || [])
      setTopics(data.topics || [])
    } catch {
      toast.error('Knowledge load nahi hua')
    } finally {
      setLoading(false)
    }
  }, [activeTopic, search])

  useEffect(() => {
    load()
  }, [load])

  function toggleExpand(id: string) {
    const next = new Set(expanded)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setExpanded(next)
  }

  function toggleSelect(id: string) {
    const next = new Set(selected)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelected(next)
  }

  async function giveFeedback(id: string, feedback: 'up' | 'down') {
    try {
      await fetch(`/api/triza/knowledge/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedback }),
      })
      // optimistic local update
      setItems((prev) =>
        prev.map((it) =>
          it.id === id
            ? {
                ...it,
                upCount: feedback === 'up' ? it.upCount + 1 : Math.max(0, it.upCount - 1),
                downCount:
                  feedback === 'down' ? it.downCount + 1 : Math.max(0, it.downCount - 1),
              }
            : it
        )
      )
      toast.success(feedback === 'up' ? '👍 Shukria! Yeh seekhna mazboot hua.' : '👎 Note kar liya — is sawaal par TRIZA dheere dheere behtar jawab degi.')
      onChanged()
    } catch {
      toast.error('Feedback save nahi hua')
    }
  }

  async function deleteOne(id: string) {
    try {
      await fetch(`/api/triza/knowledge/${id}`, { method: 'DELETE' })
      setItems((prev) => prev.filter((it) => it.id !== id))
      toast.success('Seekha hua hata diya')
      onChanged()
    } catch {
      toast.error('Delete nahi hua')
    }
  }

  async function deleteSelected() {
    if (selected.size === 0) return
    try {
      const res = await fetch('/api/triza/knowledge', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: Array.from(selected) }),
      })
      const data = await res.json()
      toast.success(`${data.deleted} items hata diye`)
      setSelected(new Set())
      load()
      onChanged()
    } catch {
      toast.error('Bulk delete nahi hua')
    }
  }

  const totalUses = items.reduce((s, it) => s + it.uses, 0)

  return (
    <div className="space-y-4">
      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="p-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-xl font-bold">{items.length}</p>
              <p className="text-[11px] text-muted-foreground">Total seekha</p>
            </div>
          </div>
        </Card>
        <Card className="p-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
              <Hash className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <p className="text-xl font-bold">{topics.length}</p>
              <p className="text-[11px] text-muted-foreground">Topics</p>
            </div>
          </div>
        </Card>
        <Card className="p-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-900/40 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-sky-600" />
            </div>
            <div>
              <p className="text-xl font-bold">{totalUses}</p>
              <p className="text-[11px] text-muted-foreground">Baar use hua</p>
            </div>
          </div>
        </Card>
        <Card className="p-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center">
              <Inbox className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <p className="text-xl font-bold">{selected.size}</p>
              <p className="text-[11px] text-muted-foreground">Selected</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="p-3 sm:p-4 space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Sawaal, jawab, ya keyword search karein..."
                className="pl-9"
              />
            </div>
            {selected.size > 0 && (
              <Button variant="destructive" size="sm" onClick={deleteSelected}>
                <Trash2 className="w-4 h-4 mr-1" />
                {selected.size} delete
              </Button>
            )}
          </div>

          {/* Topic filter chips */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setActiveTopic('')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                activeTopic === ''
                  ? 'bg-emerald-600 text-white'
                  : 'bg-muted text-muted-foreground hover:bg-muted/70'
              }`}
            >
              All ({topics.reduce((s, t) => s + t.count, 0)})
            </button>
            {topics.map((t) => (
              <button
                key={t.topic}
                onClick={() => setActiveTopic(t.topic)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  activeTopic === t.topic
                    ? 'bg-emerald-600 text-white'
                    : topicColor(t.topic) + ' hover:opacity-80'
                }`}
              >
                {t.topic} ({t.count})
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Items list */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            Knowledge Store
            <span className="text-xs font-normal text-muted-foreground">
              ({items.length} items)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Loading...
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 mx-auto mb-3 text-muted-foreground/30" />
              <p className="text-sm font-medium">Abhi tak kuch nahi seekha</p>
              <p className="text-xs text-muted-foreground mt-1">
                Basket tab par ja ke knowledge daalein aur &quot;Process&quot; dabayein.
              </p>
            </div>
          ) : (
            <ScrollArea className="max-h-[600px] -mx-2 px-2">
              <div className="space-y-2">
                {items.map((item) => {
                  const isOpen = expanded.has(item.id)
                  const isSelected = selected.has(item.id)
                  const qParts = item.question.split('|')
                  return (
                    <div
                      key={item.id}
                      className={`rounded-lg border transition-colors ${
                        isSelected
                          ? 'border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20'
                          : 'border-border bg-background hover:border-emerald-300/60'
                      }`}
                    >
                      <div className="flex items-start gap-2 p-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelect(item.id)}
                          className="mt-1 accent-emerald-600"
                          aria-label="select"
                        />
                        <button
                          onClick={() => toggleExpand(item.id)}
                          className="mt-0.5 text-muted-foreground hover:text-foreground shrink-0"
                        >
                          {isOpen ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </button>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-medium text-foreground line-clamp-1">
                              {qParts[0]}
                            </p>
                            <div className="flex items-center gap-1 shrink-0">
                              <Badge className={`text-[10px] ${topicColor(item.topic)}`} variant="secondary">
                                {item.topic}
                              </Badge>
                            </div>
                          </div>
                          {qParts.length > 1 && (
                            <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
                              triggers: {qParts.slice(0, 3).join(' · ')}
                              {qParts.length > 3 ? ` +${qParts.length - 3}` : ''}
                            </p>
                          )}
                          {isOpen && (
                            <div className="mt-2 space-y-2">
                              <p className="text-xs text-foreground whitespace-pre-wrap bg-muted/40 rounded p-2 leading-relaxed">
                                {item.answer}
                              </p>
                              {item.keywords && (
                                <p className="text-[11px] text-muted-foreground">
                                  <span className="font-medium">Keywords:</span> {item.keywords}
                                </p>
                              )}
                              <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                                <span>Intent: {item.intent}</span>
                                <span>·</span>
                                <span>Uses: {item.uses}</span>
                                <span>·</span>
                                <span className="text-emerald-600">👍 {item.upCount}</span>
                                <span className="text-rose-600">👎 {item.downCount}</span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-1 shrink-0">
                          <button
                            onClick={() => giveFeedback(item.id, 'up')}
                            className="p-1 rounded hover:bg-emerald-100 dark:hover:bg-emerald-900/40 text-emerald-600"
                            title="Acha jawab"
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => giveFeedback(item.id, 'down')}
                            className="p-1 rounded hover:bg-rose-100 dark:hover:bg-rose-900/40 text-rose-600"
                            title="Behtar ho sakta hai"
                          >
                            <ThumbsDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteOne(item.id)}
                            className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/40 text-muted-foreground hover:text-destructive"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
