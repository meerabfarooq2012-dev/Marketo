'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import {
  Globe2,
  Loader2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Zap,
  Database,
  Clock,
  MessageCircle,
  Layers,
  CheckSquare,
  Square,
  X,
  PartyPopper,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { toast } from 'sonner'
import { TOPIC_PACKS, getTotalTopicCount } from '@/lib/triza-basket/topic-packs'

interface BulkHarvestTabProps {
  onChanged: () => void
  onGoToChat: () => void
}

interface TopicLogEntry {
  index: number
  topic: string
  itemsAdded: number
  sourcesRead: number
  status: 'done' | 'error'
  error?: string
}

interface CompletePayload {
  totalTopics: number
  totalItemsAdded: number
  totalSourcesRead: number
  totalSourcesFailed: number
  failedTopics: number
  totalTimeMs: number
  totalItemsInStore: number
}

type Phase = 'idle' | 'running' | 'done' | 'error'

export function BulkHarvestTab({ onChanged, onGoToChat }: BulkHarvestTabProps) {
  const [selectedPacks, setSelectedPacks] = useState<Set<string>>(new Set(['science']))
  const [customTopics, setCustomTopics] = useState('')
  const [sourcesPerTopic, setSourcesPerTopic] = useState(3)
  const [phase, setPhase] = useState<Phase>('idle')
  const [log, setLog] = useState<TopicLogEntry[]>([])
  const [currentTopic, setCurrentTopic] = useState<string>('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [totalTopics, setTotalTopics] = useState(0)
  const [cumulativeItems, setCumulativeItems] = useState(0)
  const [cumulativeSources, setCumulativeSources] = useState(0)
  const [failedCount, setFailedCount] = useState(0)
  const [elapsedMs, setElapsedMs] = useState(0)
  const [completeResult, setCompleteResult] = useState<CompletePayload | null>(null)
  const abortRef = useRef<AbortController | null>(null)
  const logEndRef = useRef<HTMLDivElement | null>(null)

  // Auto-scroll the log to bottom as new entries arrive
  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [log])

  const selectedTopicList = (() => {
    const topics: string[] = []
    for (const pack of TOPIC_PACKS) {
      if (selectedPacks.has(pack.id)) {
        topics.push(...pack.topics)
      }
    }
    // Add custom topics (one per line)
    const custom = customTopics
      .split('\n')
      .map((t) => t.trim())
      .filter((t) => t.length > 0)
    topics.push(...custom)
    // Dedupe
    return Array.from(new Set(topics))
  })()

  const selectedCount = selectedTopicList.length
  // Estimate: ~3-5s per topic with 3 sources (search + read 3 pages)
  const estimatedSeconds = Math.round((selectedCount * (sourcesPerTopic * 1.5 + 2)) )
  const estimatedMin = Math.floor(estimatedSeconds / 60)
  const estimatedSec = estimatedSeconds % 60

  function togglePack(id: string) {
    setSelectedPacks((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function selectAllPacks() {
    setSelectedPacks(new Set(TOPIC_PACKS.map((p) => p.id)))
  }

  function clearPacks() {
    setSelectedPacks(new Set())
  }

  const runBulk = useCallback(async () => {
    if (selectedTopicList.length === 0) {
      toast.error('Pehle koi pack choose karein ya topics likhein')
      return
    }

    setPhase('running')
    setLog([])
    setCurrentTopic('')
    setCurrentIndex(0)
    setTotalTopics(selectedTopicList.length)
    setCumulativeItems(0)
    setCumulativeSources(0)
    setFailedCount(0)
    setElapsedMs(0)
    setCompleteResult(null)

    const controller = new AbortController()
    abortRef.current = controller

    try {
      const res = await fetch('/api/triza/harvest/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topics: selectedTopicList,
          maxSourcesPerTopic: sourcesPerTopic,
        }),
        signal: controller.signal,
      })

      if (!res.ok || !res.body) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.error || `Server error ${res.status}`)
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      // Parse SSE events from the stream
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const events = buffer.split('\n\n')
        buffer = events.pop() || '' // keep incomplete chunk in buffer

        for (const rawEvent of events) {
          const lines = rawEvent.split('\n')
          let eventType = ''
          let dataStr = ''
          for (const line of lines) {
            if (line.startsWith('event: ')) eventType = line.slice(7).trim()
            else if (line.startsWith('data: ')) dataStr += line.slice(6)
          }
          if (!eventType || !dataStr) continue

          let data: Record<string, unknown>
          try {
            data = JSON.parse(dataStr)
          } catch {
            continue
          }

          if (eventType === 'start') {
            setTotalTopics(data.totalTopics as number)
          } else if (eventType === 'topic_start') {
            setCurrentTopic(data.topic as string)
            setCurrentIndex((data.index as number) + 1)
          } else if (eventType === 'topic_done') {
            const entry: TopicLogEntry = {
              index: data.index as number,
              topic: data.topic as string,
              itemsAdded: data.itemsAdded as number,
              sourcesRead: data.sourcesRead as number,
              status: (data.itemsAdded as number) === 0 ? 'error' : 'done',
            }
            setLog((prev) => [...prev, entry])
            setCumulativeItems(data.cumulativeItems as number)
            setCumulativeSources(data.cumulativeSources as number)
            setFailedCount(data.failedTopics as number)
            setElapsedMs(data.elapsedMs as number)
          } else if (eventType === 'topic_error') {
            // Error is also followed by topic_done in the API, so we
            // just note it — the topic_done entry will record itemsAdded=0
          } else if (eventType === 'complete') {
            const payload: CompletePayload = {
              totalTopics: data.totalTopics as number,
              totalItemsAdded: data.totalItemsAdded as number,
              totalSourcesRead: data.totalSourcesRead as number,
              totalSourcesFailed: data.totalSourcesFailed as number,
              failedTopics: data.failedTopics as number,
              totalTimeMs: data.totalTimeMs as number,
              totalItemsInStore: data.totalItemsInStore as number,
            }
            setCompleteResult(payload)
            setPhase('done')
            setElapsedMs(payload.totalTimeMs)
            onChanged()
            toast.success(
              `Bulk harvest complete! ${payload.totalItemsAdded} items seekh liye.`
            )
          }
        }
      }
    } catch (e) {
      if ((e as Error).name === 'AbortError') {
        toast.info('Bulk harvest roka gaya')
        setPhase('idle')
      } else {
        console.error('[bulk-harvest] error:', e)
        setPhase('error')
        toast.error(e instanceof Error ? e.message : 'Bulk harvest failed')
      }
    } finally {
      abortRef.current = null
    }
  }, [selectedTopicList, sourcesPerTopic, onChanged])

  function stopBulk() {
    if (abortRef.current) {
      abortRef.current.abort()
    }
  }

  function reset() {
    setPhase('idle')
    setLog([])
    setCompleteResult(null)
    setCurrentTopic('')
    setCumulativeItems(0)
    setCumulativeSources(0)
    setFailedCount(0)
    setElapsedMs(0)
  }

  const progressPct =
    totalTopics > 0 && phase === 'running'
      ? Math.round((log.length / totalTopics) * 100)
      : phase === 'done'
        ? 100
        : 0

  const elapsedMin = Math.floor(elapsedMs / 60000)
  const elapsedSec = Math.floor((elapsedMs % 60000) / 1000)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
      {/* LEFT: selection + controls (3 cols) */}
      <div className="lg:col-span-3 space-y-4">
        <Card className="border-emerald-200/60 dark:border-emerald-900/40">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Globe2 className="w-5 h-5 text-emerald-600" />
              Bulk Knowledge Collector
              <span className="text-xs font-normal text-muted-foreground">
                (sara internet ek hi waqt mein)
              </span>
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Ek hi baar mein <strong>hundreds of topics</strong> par internet se
              knowledge collect karo. Packs choose karein ya apni list paste karein —
              TRIZA ka agent sab topics par search + read karke seedha seekh jayega.
              Yeh ChatGPT-level broad knowledge ka practical version hai.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Topic Packs grid */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-xs flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  Knowledge Packs (choose karein)
                </Label>
                <div className="flex gap-1">
                  <button
                    onClick={selectAllPacks}
                    disabled={phase === 'running'}
                    className="text-[10px] px-2 py-0.5 rounded border border-border hover:bg-muted disabled:opacity-50"
                  >
                    Sab select
                  </button>
                  <button
                    onClick={clearPacks}
                    disabled={phase === 'running'}
                    className="text-[10px] px-2 py-0.5 rounded border border-border hover:bg-muted disabled:opacity-50"
                  >
                    Clear
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {TOPIC_PACKS.map((pack) => {
                  const selected = selectedPacks.has(pack.id)
                  return (
                    <button
                      key={pack.id}
                      onClick={() => togglePack(pack.id)}
                      disabled={phase === 'running'}
                      className={`relative text-left p-2.5 rounded-lg border transition-all disabled:opacity-60 ${
                        selected
                          ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 ring-1 ring-emerald-400/40'
                          : 'border-border bg-background hover:border-emerald-300 hover:bg-muted/40'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-lg leading-none">{pack.emoji}</span>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold leading-tight truncate">
                            {pack.name}
                          </p>
                          <p className="text-[10px] text-muted-foreground truncate">
                            {pack.urduName}
                          </p>
                          <Badge
                            variant="secondary"
                            className="mt-1 text-[9px] px-1 py-0 h-4"
                          >
                            {pack.topics.length} topics
                          </Badge>
                        </div>
                        {selected ? (
                          <CheckSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        ) : (
                          <Square className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Custom topics textarea */}
            <div>
              <Label htmlFor="custom-topics" className="text-xs">
                Apni custom topics (optional — ek topic per line)
              </Label>
              <textarea
                id="custom-topics"
                value={customTopics}
                onChange={(e) => setCustomTopics(e.target.value)}
                disabled={phase === 'running'}
                placeholder={'e.g.\nhow to make pizza\ncar engine working\nhistory of football'}
                className="mt-1 w-full min-h-[80px] max-h-[160px] p-2.5 text-sm rounded-md border border-input bg-background resize-y focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:opacity-50"
              />
            </div>

            {/* Sources per topic slider */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/40">
              <Label className="text-xs whitespace-nowrap">Har topic ke pages:</Label>
              <input
                type="range"
                min={2}
                max={5}
                value={sourcesPerTopic}
                onChange={(e) => setSourcesPerTopic(Number(e.target.value))}
                disabled={phase === 'running'}
                className="flex-1 accent-emerald-600 disabled:opacity-50"
              />
              <Badge
                variant="secondary"
                className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200"
              >
                {sourcesPerTopic} pages
              </Badge>
            </div>

            {/* Selection summary + estimate */}
            {phase === 'idle' && (
              <div className="flex flex-wrap items-center gap-2 p-3 rounded-lg border border-emerald-200/60 bg-emerald-50/40 dark:bg-emerald-950/20">
                <Database className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
                  {selectedCount} topics
                </span>
                <span className="text-xs text-muted-foreground">selected</span>
                <span className="text-xs text-muted-foreground mx-1">·</span>
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-xs text-muted-foreground">
                  ~{estimatedMin > 0 ? `${estimatedMin}m ` : ''}{estimatedSec}s
                </span>
                <span className="text-xs text-muted-foreground mx-1">·</span>
                <span className="text-xs text-muted-foreground">
                  ~{selectedCount * sourcesPerTopic} pages read honge
                </span>
              </div>
            )}

            {/* Action buttons */}
            {phase === 'idle' && (
              <Button
                onClick={runBulk}
                disabled={selectedCount === 0}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 h-11"
              >
                <Globe2 className="w-4 h-4 mr-2" />
                Bulk Harvest Shuru Karo — {selectedCount} topics
              </Button>
            )}

            {phase === 'running' && (
              <Button
                onClick={stopBulk}
                variant="destructive"
                className="w-full h-11"
              >
                <X className="w-4 h-4 mr-2" />
                Roko (Stop)
              </Button>
            )}

            {phase === 'done' && (
              <div className="flex gap-2">
                <Button
                  onClick={() => onGoToChat()}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 h-11"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Ab TRIZA se baat karein
                </Button>
                <Button onClick={reset} variant="outline" className="h-11">
                  Aur collect karein
                </Button>
              </div>
            )}

            {phase === 'error' && (
              <Button onClick={reset} variant="outline" className="w-full h-11">
                Dobara try karein
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Honest note about "all internet" */}
        {phase === 'idle' && (
          <Card className="bg-muted/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                &quot;Sara internet&quot; ke baare mein sach
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground space-y-2">
              <p>
                ChatGPT aur Google ne <strong>petabytes</strong> data par saalon
                ka training kiya hai (cro rupees kharch). Literally pura internet
                crawl karna ek machine par mumkin nahi.
              </p>
              <p>
                Lekin yeh Bulk Collector <strong>hundreds of curated topics</strong>{' '}
                par internet se real-time knowledge collect karta hai — Science,
                History, Pakistan, Tech, Health, Islam, Sports, aur roz-marra
                zindagi ke topics. Har topic par agent khud search karta hai,
                top pages read karta hai, aur knowledge store mein daal deta hai.
              </p>
              <p className="text-emerald-700 dark:text-emerald-400 font-medium pt-1 border-t border-border/60">
                ✓ Data collection: web-search + page-reader (real internet)
              </p>
              <p className="text-emerald-700 dark:text-emerald-400 font-medium">
                ✓ Baat-cheet: 100% model-free (TF-IDF + cosine + synonyms)
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* RIGHT: live progress + log (2 cols) */}
      <div className="lg:col-span-2 space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              {phase === 'running' ? (
                <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
              ) : phase === 'done' ? (
                <PartyPopper className="w-5 h-5 text-emerald-600" />
              ) : (
                <Sparkles className="w-5 h-5 text-muted-foreground" />
              )}
              Live Progress
            </CardTitle>
            <CardDescription className="text-xs">
              {phase === 'running'
                ? `Topic ${currentIndex}/${totalTopics}: ${currentTopic}`
                : phase === 'done'
                  ? 'Bulk harvest mukammal!'
                  : 'Start dabane ke baad yahan live progress dikhega'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Progress bar */}
            {(phase === 'running' || phase === 'done') && (
              <>
                <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>{progressPct}%</span>
                  <span>
                    {log.length}/{totalTopics} topics done
                  </span>
                </div>
              </>
            )}

            {/* Stat tiles */}
            {(phase === 'running' || phase === 'done') && (
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/30 p-2 text-center">
                  <p className="text-lg font-bold text-emerald-600">
                    {cumulativeItems}
                  </p>
                  <p className="text-[10px] text-muted-foreground">Items seekhe</p>
                </div>
                <div className="rounded-lg bg-sky-50 dark:bg-sky-950/30 p-2 text-center">
                  <p className="text-lg font-bold text-sky-600">
                    {cumulativeSources}
                  </p>
                  <p className="text-[10px] text-muted-foreground">Pages read</p>
                </div>
                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 p-2 text-center">
                  <p className="text-lg font-bold text-amber-600">
                    {elapsedMin > 0 ? `${elapsedMin}m ` : ''}
                    {elapsedSec}s
                  </p>
                  <p className="text-[10px] text-muted-foreground">Time</p>
                </div>
                <div className="rounded-lg bg-rose-50 dark:bg-rose-950/30 p-2 text-center">
                  <p className="text-lg font-bold text-rose-600">{failedCount}</p>
                  <p className="text-[10px] text-muted-foreground">Failed</p>
                </div>
              </div>
            )}

            {/* Complete summary */}
            {phase === 'done' && completeResult && (
              <div className="p-3 rounded-lg border border-emerald-300 bg-emerald-50 dark:bg-emerald-950/30 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">
                    Bulk harvest kamyab!
                  </p>
                </div>
                <div className="text-xs text-muted-foreground space-y-0.5">
                  <p>
                    <strong>{completeResult.totalItemsAdded}</strong> naye knowledge
                    items collect kiye
                  </p>
                  <p>
                    <strong>{completeResult.totalSourcesRead}</strong> internet
                    pages read kiye
                  </p>
                  <p>
                    <strong>{completeResult.totalTopics}</strong> topics process kiye
                    ({completeResult.failedTopics} fail hue)
                  </p>
                  {completeResult.totalItemsInStore >= 0 && (
                    <p>
                      Ab TRIZA ke paas kul{' '}
                      <strong>{completeResult.totalItemsInStore}</strong> knowledge
                      items hain
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Live log */}
            {(phase === 'running' || phase === 'done') && log.length > 0 && (
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1.5">
                  Topic log ({log.length})
                </p>
                <ScrollArea className="max-h-[320px] -mx-1 px-1">
                  <div className="space-y-1">
                    {log.map((entry) => (
                      <div
                        key={entry.index}
                        className={`flex items-start gap-2 p-1.5 rounded text-xs ${
                          entry.status === 'done'
                            ? 'bg-emerald-50/60 dark:bg-emerald-950/20'
                            : 'bg-rose-50/60 dark:bg-rose-950/20'
                        }`}
                      >
                        {entry.status === 'done' ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="font-medium truncate leading-tight">
                            {entry.topic}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {entry.status === 'done'
                              ? `${entry.itemsAdded} items · ${entry.sourcesRead} pages`
                              : 'Fail ho gaya'}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={logEndRef} />
                  </div>
                </ScrollArea>
              </div>
            )}

            {/* Idle state placeholder */}
            {phase === 'idle' && (
              <div className="text-center py-10 text-sm text-muted-foreground">
                <Globe2 className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>Abhi koi harvest nahi chal raha</p>
                <p className="text-[11px] mt-1">
                  Packs choose karein aur &quot;Bulk Harvest&quot; dabayein
                </p>
                <p className="text-[10px] mt-3 text-muted-foreground/70">
                  Kul {getTotalTopicCount()} topics available across {TOPIC_PACKS.length}{' '}
                  packs
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
