'use client'

import { useState } from 'react'
import { Calculator, Brain, Loader2, Lightbulb, CheckCircle2, Clock, Zap, BookOpen, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

interface SolveStep {
  title: string
  detail: string
}
interface SolveResult {
  solved: boolean
  type: string
  steps: SolveStep[]
  finalAnswer: string
  processingTimeMs: number
  note?: string
  error?: string
}

const EXAMPLES = [
  { label: 'Arithmetic', eq: '2 + 3 * 4 - 6 / 2' },
  { label: 'Power', eq: '2^10' },
  { label: 'Sqrt', eq: 'sqrt(144) + cbrt(27)' },
  { label: 'Linear', eq: 'solve 3x + 5 = 20' },
  { label: 'Linear 2', eq: 'solve 2x - 7 = 11' },
  { label: 'Quadratic', eq: 'solve 2x^2 - 7x + 3 = 0' },
  { label: 'Quadratic 2', eq: 'solve x^2 - 5x + 6 = 0' },
  { label: 'System 2x2', eq: '2x + 3y = 8, x - y = 1' },
  { label: 'Percentage', eq: '15% of 200' },
  { label: 'Trig', eq: 'sin(1.0472) + cos(0)' },
]

export function MathSolverTab() {
  const [equation, setEquation] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SolveResult | null>(null)
  const [history, setHistory] = useState<Array<{ eq: string; ans: string; ok: boolean; t: number }>>([])

  async function handleSolve() {
    if (!equation.trim()) {
      toast.error('Pehle koi equation likhein')
      return
    }
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch('/api/triza/math-solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ equation: equation.trim() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Solve fail hua')
      setResult(data)
      setHistory((h) => [
        { eq: equation.trim(), ans: data.finalAnswer, ok: data.solved, t: data.processingMs || data.processingTimeMs || 0 },
        ...h.slice(0, 9),
      ])
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Kuch ghalt hua')
    } finally {
      setLoading(false)
    }
  }

  function loadExample(eq: string) {
    setEquation(eq)
    setResult(null)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      {/* Main solver */}
      <div className="space-y-4">
        <div className="rounded-2xl border border-border/60 bg-card/50 backdrop-blur p-4 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Calculator className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-semibold">Math Equation Solver</h2>
            <Badge variant="secondary" className="ml-auto bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
              <Brain className="w-3 h-3 mr-1" /> Self-built engine
            </Badge>
          </div>

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 p-3 text-xs text-amber-800 dark:text-amber-200">
            <strong>TRIZA khud solve karta hai</strong> — koi LLM, API key ya model use nahi hota.
            Yeh apne hand-written rules se step-by-step solve karta hai (jaise Chat tab ka TF-IDF engine).
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Apna math problem likhein
            </label>
            <Textarea
              value={equation}
              onChange={(e) => setEquation(e.target.value)}
              placeholder="e.g. solve 2x^2 - 7x + 3 = 0"
              className="min-h-[100px] font-mono text-sm resize-y"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                  handleSolve()
                }
              }}
            />
            <p className="text-xs text-muted-foreground">
              Tip: Ctrl/Cmd + Enter se solve karein
            </p>
          </div>

          <Button
            onClick={handleSolve}
            disabled={loading || !equation.trim()}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> TRIZA soch raha hai...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" /> Solve karein
              </>
            )}
          </Button>
        </div>

        {/* Result */}
        {loading && (
          <div className="rounded-2xl border border-border/60 bg-card/50 p-6 space-y-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Equation analyze ho rahi hai...</span>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-muted rounded animate-pulse w-3/4" />
              <div className="h-3 bg-muted rounded animate-pulse w-full" />
              <div className="h-3 bg-muted rounded animate-pulse w-5/6" />
            </div>
          </div>
        )}

        {result && !loading && (
          <div className="rounded-2xl border border-emerald-500/30 bg-card/50 backdrop-blur p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                {result.solved ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-amber-500" />
                )}
                <h3 className="font-semibold">
                  {result.solved ? 'Solution' : 'Could not solve'}
                </h3>
                {result.type && result.solved && (
                  <Badge variant="outline" className="text-xs capitalize">
                    {result.type.replace(/_/g, ' ')}
                  </Badge>
                )}
              </div>
              <Badge variant="outline" className="text-xs">
                <Clock className="w-3 h-3 mr-1" /> {result.processingTimeMs}ms
              </Badge>
            </div>

            {result.solved && (
              <div className="rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 p-4">
                <div className="text-xs uppercase tracking-wide text-emerald-700 dark:text-emerald-300 font-semibold mb-1">
                  Final Answer
                </div>
                <div className="text-xl font-mono font-bold text-emerald-700 dark:text-emerald-300 break-words">
                  {result.finalAnswer}
                </div>
              </div>
            )}

            {result.note && (
              <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 p-3 text-sm text-amber-800 dark:text-amber-200">
                {result.note}
              </div>
            )}

            {/* Steps — TRIZA ka khud ka dimaagh */}
            {result.steps.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                  <Brain className="w-4 h-4 text-emerald-600" />
                  TRIZA ne yaise socha:
                </div>
                <ol className="space-y-2">
                  {result.steps.map((s, i) => (
                    <li key={i} className="rounded-lg border border-border/60 bg-background/60 p-3">
                      <div className="flex items-start gap-2">
                        <span className="inline-flex items-center justify-center min-w-[22px] h-[22px] rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-xs font-bold mt-0.5">
                          {i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-foreground">{s.title}</div>
                          <pre className="mt-1 text-xs text-muted-foreground whitespace-pre-wrap font-mono bg-transparent border-0 p-0">
                            {s.detail}
                          </pre>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {!result.solved && (
              <div className="rounded-lg bg-muted/40 border border-border/60 p-3 text-sm text-muted-foreground">
                TRIZA abhi seekh raha hai. Upar di gayi example categories try karein.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div className="space-y-4">
        <div className="rounded-2xl border border-border/60 bg-card/50 backdrop-blur p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <h3 className="font-semibold text-sm">Examples — try karein</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex.label}
                onClick={() => loadExample(ex.eq)}
                className="px-2.5 py-1 rounded-md text-xs border border-border bg-background hover:bg-emerald-500/10 hover:border-emerald-500/40 transition"
                title={ex.eq}
              >
                {ex.label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card/50 backdrop-blur p-4 space-y-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <h3 className="font-semibold text-sm">TRIZA kya solve kar sakta hai</h3>
          </div>
          <ul className="text-xs space-y-1.5 text-muted-foreground">
            <li>• <strong>Arithmetic</strong>: 2+3*4, sqrt(16), 2^10</li>
            <li>• <strong>Linear eq</strong>: solve 3x + 5 = 20</li>
            <li>• <strong>Quadratic</strong>: solve ax^2 + bx + c = 0</li>
            <li>• <strong>System 2x2</strong>: ax+by=e, cx+dy=f</li>
            <li>• <strong>Percentage</strong>: 15% of 200</li>
            <li>• <strong>Trig/Log</strong>: sin(x), cos(x), log(x), ln(x)</li>
          </ul>
        </div>

        {history.length > 0 && (
          <div className="rounded-2xl border border-border/60 bg-card/50 backdrop-blur p-4 space-y-3">
            <h3 className="font-semibold text-sm">Recent</h3>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {history.map((h, i) => (
                <button
                  key={i}
                  onClick={() => loadExample(h.eq)}
                  className="w-full text-left rounded-lg border border-border/60 p-2.5 hover:bg-muted/50 transition"
                >
                  <div className="text-xs font-mono truncate text-foreground">{h.eq}</div>
                  <div className={`text-xs font-mono mt-0.5 ${h.ok ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600'}`}>
                    {h.ok ? '= ' : '→ '}{h.ans}
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">{h.t}ms</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
