'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import {
  MessageCircle,
  Send,
  Loader2,
  Brain,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Zap,
  Lightbulb,
  AlertTriangle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  meta?: {
    confidence: number
    topic: string | null
    intent: string | null
    steps: string[]
    candidates: Array<{ itemId: string; question: string; score: number }>
    totalItems: number
    vocabSize: number
    processingTimeMs: number
    matchedItemId: string | null
  }
}

interface ChatTabProps {
  stats: {
    knowledge: { totalItems: number }
    index: { vocabSize: number; totalItems: number }
  } | null
}

const SUGGESTIONS = [
  'what is photosynthesis',
  'gravity kya hai',
  'how to boil rice',
  'einstein kaun the',
  'paise kaise bachaye',
  'internet kya hai',
  'salam triza',
]

export function ChatTab({ stats }: ChatTabProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [expandedMeta, setExpandedMeta] = useState<Set<string>>(new Set())
  const scrollRef = useRef<HTMLDivElement>(null)

  const totalItems = stats?.knowledge.totalItems ?? stats?.index.totalItems ?? 0
  const empty = totalItems === 0

  // Scroll to bottom on new message
  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [])
  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  async function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || sending) return

    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      role: 'user',
      content: trimmed,
    }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setSending(true)

    try {
      const res = await fetch('/api/triza/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'chat failed')

      const aiMsg: ChatMessage = {
        id: `a_${Date.now()}`,
        role: 'assistant',
        content: data.answer || '(koi jawab nahi mila)',
        meta: {
          confidence: data.confidence,
          topic: data.topic,
          intent: data.intent,
          steps: data.steps || [],
          candidates: data.candidates || [],
          totalItems: data.totalItems,
          vocabSize: data.vocabSize,
          processingTimeMs: data.processingTimeMs,
          matchedItemId: data.matchedItemId,
        },
      }
      setMessages((prev) => [...prev, aiMsg])
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Chat fail hua')
      const errMsg: ChatMessage = {
        id: `e_${Date.now()}`,
        role: 'assistant',
        content: 'Maf karein, kuch technical masla hua. Phir try karein.',
      }
      setMessages((prev) => [...prev, errMsg])
    } finally {
      setSending(false)
    }
  }

  function toggleMeta(id: string) {
    const next = new Set(expandedMeta)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setExpandedMeta(next)
  }

  function confidenceColor(c: number): string {
    if (c >= 0.6) return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200'
    if (c >= 0.3) return 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200'
    return 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200'
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
      {/* Chat area (3 cols) */}
      <div className="lg:col-span-3 flex flex-col">
        <Card className="flex-1 flex flex-col min-h-[60vh] lg:min-h-[70vh]">
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scroll">
              <div className="p-4 space-y-4 min-h-full">
                {messages.length === 0 && (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-3">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold">TRIZA se baat karein</h3>
                    <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
                      {empty
                        ? 'Abhi TRIZA ne kuch nahi seekha. Pehle "Demo load" ya Basket tab se knowledge daalein.'
                        : 'TRIZA ne jo seekha hai wahi apne andaaz mein batayegi. Niche se sawaal shuru karein.'}
                    </p>
                    {!empty && (
                      <div className="flex flex-wrap gap-2 justify-center mt-4 max-w-lg mx-auto">
                        {SUGGESTIONS.map((s) => (
                          <button
                            key={s}
                            onClick={() => send(s)}
                            className="px-3 py-1.5 rounded-full text-xs bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {messages.map((msg) => {
                  const isUser = msg.role === 'user'
                  const showMeta = !isUser && msg.meta
                  const metaOpen = expandedMeta.has(msg.id)
                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-2 sm:gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          isUser
                            ? 'bg-foreground text-background'
                            : 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white'
                        }`}
                      >
                        {isUser ? (
                          <span className="text-xs font-bold">U</span>
                        ) : (
                          <Brain className="w-4 h-4" />
                        )}
                      </div>
                      <div className={`flex-1 min-w-0 max-w-[85%] ${isUser ? 'flex justify-end' : ''}`}>
                        <div
                          className={`rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap leading-relaxed ${
                            isUser
                              ? 'bg-foreground text-background rounded-tr-sm'
                              : 'bg-muted rounded-tl-sm'
                          }`}
                        >
                          {msg.content}
                        </div>

                        {/* Meta panel for assistant messages */}
                        {showMeta && msg.meta && (
                          <div className="mt-1.5 space-y-1.5">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <Badge className={`text-[10px] ${confidenceColor(msg.meta.confidence)}`}>
                                confidence {(msg.meta.confidence * 100).toFixed(0)}%
                              </Badge>
                              {msg.meta.topic && (
                                <Badge variant="outline" className="text-[10px]">
                                  {msg.meta.topic}
                                </Badge>
                              )}
                              {msg.meta.intent && (
                                <Badge variant="outline" className="text-[10px]">
                                  {msg.meta.intent}
                                </Badge>
                              )}
                              <Badge variant="outline" className="text-[10px]">
                                <Zap className="w-2.5 h-2.5 mr-0.5" />
                                {msg.meta.processingTimeMs}ms
                              </Badge>
                              <button
                                onClick={() => toggleMeta(msg.id)}
                                className="text-[10px] text-muted-foreground hover:text-foreground flex items-center gap-0.5 ml-1"
                              >
                                {metaOpen ? (
                                  <ChevronDown className="w-3 h-3" />
                                ) : (
                                  <ChevronRight className="w-3 h-3" />
                                )}
                                reasoning
                              </button>
                            </div>

                            {metaOpen && (
                              <div className="rounded-lg border border-border bg-background/60 p-2.5 text-[11px] space-y-2">
                                {msg.meta.steps.length > 0 && (
                                  <div>
                                    <p className="font-semibold text-muted-foreground mb-1">
                                      Reasoning steps:
                                    </p>
                                    <ul className="space-y-0.5">
                                      {msg.meta.steps.map((s, i) => (
                                        <li key={i} className="font-mono text-[10px] text-muted-foreground">
                                          → {s}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                {msg.meta.candidates.length > 0 && (
                                  <div>
                                    <p className="font-semibold text-muted-foreground mb-1">
                                      Top candidates:
                                    </p>
                                    <ul className="space-y-0.5">
                                      {msg.meta.candidates.map((c, i) => (
                                        <li key={c.itemId} className="flex items-center gap-1.5">
                                          <span className="text-muted-foreground">#{i + 1}</span>
                                          <span className="truncate flex-1">{c.question}</span>
                                          <span className="font-mono text-[10px] text-emerald-600">
                                            {c.score.toFixed(3)}
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                <div className="flex gap-3 text-[10px] text-muted-foreground pt-1 border-t border-border/50">
                                  <span>indexed: {msg.meta.totalItems}</span>
                                  <span>vocab: {msg.meta.vocabSize}</span>
                                  {msg.meta.matchedItemId && (
                                    <span className="text-emerald-600">✓ matched</span>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}

                {sending && (
                  <div className="flex gap-2 sm:gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shrink-0">
                      <Brain className="w-4 h-4 text-white" />
                    </div>
                    <div className="rounded-2xl rounded-tl-sm bg-muted px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '120ms' }} />
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '240ms' }} />
                        <span className="text-xs text-muted-foreground ml-2">soch rahi hoon...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input */}
            <div className="border-t border-border p-3">
              <div className="flex gap-2 items-end">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      send(input)
                    }
                  }}
                  placeholder={empty ? 'Pehle knowledge daalein...' : 'Sawaal likhein... (Enter = send, Shift+Enter = new line)'}
                  disabled={sending}
                  rows={1}
                  className="min-h-[44px] max-h-32 resize-none"
                />
                <Button
                  onClick={() => send(input)}
                  disabled={!input.trim() || sending}
                  size="icon"
                  className="h-11 w-11 shrink-0 bg-emerald-600 hover:bg-emerald-700"
                >
                  {sending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Side panel (1 col) — how it works */}
      <div className="lg:col-span-1 space-y-3">
        <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border-emerald-200/60 dark:border-emerald-900/40">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold text-sm">Yeh kaise kaam karta hai</h3>
            </div>
            <ol className="space-y-2 text-xs text-muted-foreground">
              <li className="flex gap-2">
                <span className="font-bold text-emerald-600">1.</span>
                <span>Aap knowledge basket (tokri) mein daalte hain — paste, Q&A, file, ya manual.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-emerald-600">2.</span>
                <span>&quot;Process&quot; se har chunk parse ho ke structured items ban jate hain.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-emerald-600">3.</span>
                <span>Aap sawaal poochte hain. TRIZA TF-IDF + cosine similarity se best match dhoondti hai.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-emerald-600">4.</span>
                <span>Woh seekha hua jawab apne andaaz mein batati hai — bina kisi model ya API ke.</span>
              </li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <h3 className="font-semibold text-sm">Self-built engine</h3>
            </div>
            <ul className="space-y-1.5 text-[11px] text-muted-foreground">
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-emerald-500" />
                Roman Urdu normalizer (spelling variants → canonical)
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-emerald-500" />
                Urdu-script → Roman transliteration
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-emerald-500" />
                TF-IDF vectors + cosine similarity
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-emerald-500" />
                Keyword overlap + phrase bonus
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-emerald-500" />
                Hand-built synonym map (EN + Roman Urdu)
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-emerald-500" />
                Hebbian feedback (👍/👎 adjusts weight)
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-emerald-500" />
                Honest &quot;I don&apos;t know&quot; below threshold
              </li>
            </ul>
          </CardContent>
        </Card>

        {empty && (
          <Card className="border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-amber-800 dark:text-amber-200">
                    Knowledge store khaali hai
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Header mein &quot;Demo load&quot; dabayein ya Basket tab se apna knowledge daalein.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
