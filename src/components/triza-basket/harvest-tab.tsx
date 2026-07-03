'use client'

import { useState, useCallback } from 'react'
import {
  Globe,
  Search,
  Loader2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  FileText,
  Zap,
  ArrowRight,
  BookOpen,
  Clock,
  MessageCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { toast } from 'sonner'

interface Source {
  url: string
  title: string
  hostName: string
  readSuccess: boolean
  contentLength: number
  paragraphsExtracted: number
  error?: string
}

interface HarvestResponse {
  success: boolean
  topic: string
  message?: string
  basketId?: string
  sourcesFound: number
  sourcesRead: number
  sourcesFailed: number
  totalContentChars?: number
  totalParagraphs?: number
  itemsAdded: number
  totalItemsInStore?: number
  processingTimeMs?: number
  sources: Source[]
  errors: string[]
}

interface HarvestTabProps {
  onChanged: () => void
  onGoToChat: () => void
}

const EXAMPLE_TOPICS = [
  'photosynthesis',
  'Pakistan history',
  'how to cook biryani',
  'solar system planets',
  'artificial intelligence basics',
  'human heart function',
  'world war 2 causes',
  'types of clouds',
]

type Phase = 'idle' | 'searching' | 'reading' | 'processing' | 'done' | 'error'

export function HarvestTab({ onChanged, onGoToChat }: HarvestTabProps) {
  const [topic, setTopic] = useState('')
  const [maxSources, setMaxSources] = useState(5)
  const [harvesting, setHarvesting] = useState(false)
  const [phase, setPhase] = useState<Phase>('idle')
  const [result, setResult] = useState<HarvestResponse | null>(null)

  const harvest = useCallback(async () => {
    if (!topic.trim()) {
      toast.error('Pehle koi topic likhein')
      return
    }
    setHarvesting(true)
    setPhase('searching')
    setResult(null)

    // Simulate phase progression for better UX (the API call is the real work)
    const readingTimer = setTimeout(() => {
      if (harvesting) setPhase('reading')
    }, 2500)
    const processingTimer = setTimeout(() => {
      if (harvesting) setPhase('processing')
    }, 6000)

    try {
      const res = await fetch('/api/triza/harvest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: topic.trim(), maxSources }),
      })
      const data: HarvestResponse = await res.json()

      clearTimeout(readingTimer)
      clearTimeout(processingTimer)

      if (!res.ok || !data.success) {
        setPhase('error')
        setResult(data)
        toast.error(data.message || data.error || 'Harvest nahi hua')
        return
      }

      setPhase('done')
      setResult(data)
      toast.success(
        `${data.itemsAdded} naye items seekh liye! ${data.sourcesRead} sources se.`
      )
      onChanged()
    } catch (e) {
      clearTimeout(readingTimer)
      clearTimeout(processingTimer)
      setPhase('error')
      toast.error(e instanceof Error ? e.message : 'Harvest failed')
    } finally {
      setHarvesting(false)
    }
  }, [topic, maxSources, harvesting, onChanged])

  function reset() {
    setPhase('idle')
    setResult(null)
    setTopic('')
  }

  const phaseSteps: Array<{ key: Phase; label: string; icon: typeof Search }> = [
    { key: 'searching', label: 'Internet par search', icon: Search },
    { key: 'reading', label: 'Pages read ho rahe', icon: FileText },
    { key: 'processing', label: 'Knowledge process', icon: Sparkles },
    { key: 'done', label: 'Seekh liya!', icon: CheckCircle2 },
  ]

  const currentPhaseIndex = phaseSteps.findIndex((p) => p.key === phase)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
      {/* LEFT: input + progress (3 cols) */}
      <div className="lg:col-span-3 space-y-4">
        <Card className="border-sky-200/60 dark:border-sky-900/40">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Globe className="w-5 h-5 text-sky-600" />
              Internet se Knowledge Harvest
              <span className="text-xs font-normal text-muted-foreground">
                (agent khud collect kare)
              </span>
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Koi topic likhein — TRIZA ka agent internet par us topic par search karega,
              top pages read karega, aur unka knowledge seedha seekh jayega. Bilkul Google
              ya ChatGPT ki tarah — lekin baat-cheet model-free hogi.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Topic input */}
            <div>
              <Label htmlFor="harvest-topic" className="text-xs">
                Topic — kis baare mein seekhna hai?
              </Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="harvest-topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !harvesting) harvest()
                  }}
                  placeholder="e.g. photosynthesis, Pakistan history, how to cook biryani..."
                  className="flex-1"
                  disabled={harvesting}
                />
                <Button
                  onClick={harvest}
                  disabled={harvesting || !topic.trim()}
                  className="bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 px-6"
                >
                  {harvesting ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Globe className="w-4 h-4 mr-2" />
                  )}
                  {harvesting ? 'Ho raha...' : 'Harvest'}
                </Button>
              </div>
            </div>

            {/* Example topic chips */}
            {!harvesting && phase === 'idle' && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Examples (click to use):</p>
                <div className="flex flex-wrap gap-1.5">
                  {EXAMPLE_TOPICS.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTopic(t)}
                      className="px-2.5 py-1 text-xs rounded-full border border-border bg-background hover:border-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/30 transition-colors"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sources slider */}
            {!harvesting && phase === 'idle' && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/40">
                <Label className="text-xs whitespace-nowrap">Kitne pages:</Label>
                <input
                  type="range"
                  min={2}
                  max={10}
                  value={maxSources}
                  onChange={(e) => setMaxSources(Number(e.target.value))}
                  className="flex-1 accent-sky-600"
                />
                <Badge variant="secondary" className="bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200">
                  {maxSources} pages
                </Badge>
              </div>
            )}

            {/* Progress phases */}
            {harvesting && (
              <div className="space-y-3 p-4 rounded-lg border border-sky-200 bg-sky-50/50 dark:border-sky-900/40 dark:bg-sky-950/20">
                <p className="text-sm font-medium text-sky-700 dark:text-sky-300">
                  TRIZA agent kaam kar raha hai...
                </p>
                <div className="space-y-2">
                  {phaseSteps.slice(0, 3).map((step, idx) => {
                    const Icon = step.icon
                    const isActive = idx === currentPhaseIndex
                    const isDone = idx < currentPhaseIndex
                    return (
                      <div
                        key={step.key}
                        className={`flex items-center gap-2 text-sm transition-opacity ${
                          isActive || isDone ? 'opacity-100' : 'opacity-40'
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : isActive ? (
                          <Loader2 className="w-4 h-4 text-sky-600 animate-spin" />
                        ) : (
                          <Icon className="w-4 h-4 text-muted-foreground" />
                        )}
                        <span className={isActive ? 'font-medium text-sky-700 dark:text-sky-300' : ''}>
                          {step.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Result summary */}
            {phase === 'done' && result && (
              <div className="p-4 rounded-lg border border-emerald-200 bg-emerald-50/50 dark:border-emerald-900/40 dark:bg-emerald-950/20 space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                    TRIZA ne &quot;{result.topic}&quot; seekh liya!
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="rounded-lg bg-background/60 p-2 text-center">
                    <p className="text-lg font-bold text-sky-600">{result.sourcesRead}</p>
                    <p className="text-[10px] text-muted-foreground">Sources read</p>
                  </div>
                  <div className="rounded-lg bg-background/60 p-2 text-center">
                    <p className="text-lg font-bold text-emerald-600">{result.itemsAdded}</p>
                    <p className="text-[10px] text-muted-foreground">Items seekhe</p>
                  </div>
                  <div className="rounded-lg bg-background/60 p-2 text-center">
                    <p className="text-lg font-bold text-amber-600">
                      {result.totalItemsInStore ?? 0}
                    </p>
                    <p className="text-[10px] text-muted-foreground">Total knowledge</p>
                  </div>
                  <div className="rounded-lg bg-background/60 p-2 text-center">
                    <p className="text-lg font-bold text-purple-600">
                      {result.processingTimeMs
                        ? `${(result.processingTimeMs / 1000).toFixed(1)}s`
                        : '—'}
                    </p>
                    <p className="text-[10px] text-muted-foreground">Time</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-1">
                  <Button
                    onClick={() => onGoToChat()}
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <MessageCircle className="w-3.5 h-3.5 mr-1" />
                    Ab baat karein
                  </Button>
                  <Button onClick={reset} size="sm" variant="outline">
                    Aur seekhein
                  </Button>
                </div>
              </div>
            )}

            {/* Error display */}
            {phase === 'error' && result && (
              <div className="p-4 rounded-lg border border-red-200 bg-red-50/50 dark:border-red-900/40 dark:bg-red-950/20 space-y-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-sm font-semibold text-red-700 dark:text-red-300">
                    Harvest nahi hua
                  </p>
                </div>
                <p className="text-xs text-red-600 dark:text-red-400">
                  {result.message || result.errors[0] || 'Unknown error'}
                </p>
                {result.sources.length > 0 && (
                  <p className="text-[11px] text-muted-foreground">
                    {result.sourcesFound} sources mile, lekin read nahi ho sake.
                  </p>
                )}
                <Button onClick={reset} size="sm" variant="outline">
                  Dobara try karein
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* How it works */}
        {phase === 'idle' && (
          <Card className="bg-muted/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                Yeh kaise kaam karta hai?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground space-y-2">
              <div className="flex items-start gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-sky-100 text-sky-700 text-[10px] font-bold shrink-0">1</span>
                <p>Agent topic internet par search karta hai (web search)</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-sky-100 text-sky-700 text-[10px] font-bold shrink-0">2</span>
                <p>Top pages read karta hai aur clean text nikaalta hai</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-sky-100 text-sky-700 text-[10px] font-bold shrink-0">3</span>
                <p>Useful paragraphs filter karta hai (navigation/ads hata kar)</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-sky-100 text-sky-700 text-[10px] font-bold shrink-0">4</span>
                <p>Har paragraph ko Q&A item mein convert karta hai</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold shrink-0">5</span>
                <p>Seedha knowledge store mein daal deta hai — TRIZA turant seekh jati hai!</p>
              </div>
              <div className="pt-2 border-t border-border/60 mt-2">
                <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                  ✓ Data collection ke liye web tools use hote hain
                </p>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                  ✓ Baat-cheet 100% model-free hai (TF-IDF + cosine + synonyms)
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* RIGHT: sources list (2 cols) */}
      <div className="lg:col-span-2 space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <BookOpen className="w-5 h-5 text-sky-600" />
              Sources
            </CardTitle>
            <CardDescription className="text-xs">
              {result
                ? `${result.sourcesRead}/${result.sourcesFound} pages successfully read`
                : 'Harvest ke baad yahan sources dikhenge'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="max-h-[560px] -mx-2 px-2">
              {!result ? (
                <div className="text-center py-12 text-sm text-muted-foreground">
                  <Globe className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p>Abhi koi source nahi</p>
                  <p className="text-[11px] mt-1">Topic likh ke Harvest dabayein</p>
                </div>
              ) : result.sources.length === 0 ? (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  Koi source nahi mila
                </div>
              ) : (
                <div className="space-y-2">
                  {result.sources.map((src, idx) => (
                    <div
                      key={src.url + idx}
                      className={`rounded-lg border p-3 text-xs space-y-1.5 ${
                        src.readSuccess
                          ? 'border-emerald-300/60 bg-emerald-50/40 dark:bg-emerald-950/20'
                          : 'border-red-300/60 bg-red-50/40 dark:bg-red-950/20'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {src.readSuccess ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="font-medium line-clamp-2 leading-tight">{src.title}</p>
                          <a
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] text-sky-600 hover:underline mt-0.5"
                          >
                            {src.hostName}
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      </div>
                      {src.readSuccess ? (
                        <div className="flex items-center gap-2 flex-wrap pl-5">
                          <Badge
                            variant="secondary"
                            className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200 text-[10px]"
                          >
                            {src.paragraphsExtracted} paragraphs
                          </Badge>
                          <span className="text-[10px] text-muted-foreground">
                            {(src.contentLength / 1000).toFixed(1)}k chars
                          </span>
                        </div>
                      ) : (
                        <p className="text-[10px] text-red-600 dark:text-red-400 pl-5">
                          {src.error || 'Read failed'}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Errors (if any) */}
        {result && result.errors.length > 0 && (
          <Card className="border-red-200/60 dark:border-red-900/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2 text-red-700 dark:text-red-400">
                <AlertCircle className="w-4 h-4" />
                Warnings ({result.errors.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="max-h-[160px]">
                <ul className="text-[11px] text-muted-foreground space-y-1">
                  {result.errors.slice(0, 10).map((err, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-red-500 shrink-0">•</span>
                      <span className="line-clamp-2">{err}</span>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
