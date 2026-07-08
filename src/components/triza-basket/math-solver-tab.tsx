'use client'

import { useState } from 'react'
import { Calculator, Sparkles, Loader2, Lightbulb, CheckCircle2, Clock, ChevronDown, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

interface SolveResult {
  solution: string
  steps: string[]
  finalAnswer: string | null
  thinking: string
  processingTimeMs: number
}

const EXAMPLES = [
  { label: 'Quadratic', eq: 'Solve 2x^2 - 7x + 3 = 0' },
  { label: 'Calculus', eq: 'Find the derivative of f(x) = 3x^3 sin(x)' },
  { label: 'Integral', eq: 'Integrate x^2 * e^x dx' },
  { label: 'Linear Eq', eq: 'Solve the system: 2x + 3y = 8, x - y = 1' },
  { label: 'Limit', eq: 'Evaluate lim x->0 (sin x) / x' },
  { label: 'Trig', eq: 'Solve 2 cos^2(x) - cos(x) - 1 = 0 for 0 <= x < 2pi' },
  { label: 'Matrix', eq: 'Find eigenvalues of A = [[2,1],[1,2]]' },
  { label: 'Word Prob', eq: 'A train travels 120 km in 2 hours. What is its speed in m/s?' },
]

export function MathSolverTab() {
  const [equation, setEquation] = useState('')
  const [mode, setMode] = useState<'solve' | 'explain' | 'verify'>('solve')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SolveResult | null>(null)
  const [showThinking, setShowThinking] = useState(false)
  const [history, setHistory] = useState<Array<{ eq: string; ans: string | null; t: number }>>([])

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
        body: JSON.stringify({ equation: equation.trim(), mode }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Solve fail hua')
      setResult(data)
      setHistory((h) => [
        { eq: equation.trim(), ans: data.finalAnswer, t: data.processingTimeMs },
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
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-semibold">Math Equation Solver</h2>
            <Badge variant="secondary" className="ml-auto">
              <Sparkles className="w-3 h-3 mr-1" /> AI powered
            </Badge>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Apna math problem likhein
            </label>
            <Textarea
              value={equation}
              onChange={(e) => setEquation(e.target.value)}
              placeholder="e.g. Solve x^2 - 5x + 6 = 0"
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

          {/* Mode selector */}
          <div className="flex flex-wrap gap-2">
            {(
              [
                { k: 'solve', l: 'Solve', d: 'Step-by-step solution' },
                { k: 'explain', l: 'Explain', d: 'Concept + solve' },
                { k: 'verify', l: 'Verify', d: 'Check answer' },
              ] as const
            ).map((m) => (
              <button
                key={m.k}
                onClick={() => setMode(m.k)}
                className={`px-3 py-1.5 rounded-lg text-sm border transition ${
                  mode === m.k
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                    : 'border-border bg-background hover:bg-muted'
                }`}
                title={m.d}
              >
                {m.l}
              </button>
            ))}
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
                <Sparkles className="w-4 h-4 mr-2" /> Solve karein
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
              <div className="h-3 bg-muted rounded animate-pulse w-2/3" />
            </div>
          </div>
        )}

        {result && !loading && (
          <div className="rounded-2xl border border-emerald-500/30 bg-card/50 backdrop-blur p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h3 className="font-semibold">Solution</h3>
              </div>
              <Badge variant="outline" className="text-xs">
                <Clock className="w-3 h-3 mr-1" /> {result.processingTimeMs}ms
              </Badge>
            </div>

            {result.finalAnswer && (
              <div className="rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 p-4">
                <div className="text-xs uppercase tracking-wide text-emerald-700 dark:text-emerald-300 font-semibold mb-1">
                  Final Answer
                </div>
                <div className="text-xl font-mono font-bold text-emerald-700 dark:text-emerald-300">
                  {result.finalAnswer}
                </div>
              </div>
            )}

            <div className="prose prose-sm dark:prose-invert max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed bg-transparent p-0 border-0">
                {result.solution}
              </pre>
            </div>

            {result.thinking && (
              <div className="border-t border-border/60 pt-3">
                <button
                  onClick={() => setShowThinking((s) => !s)}
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                >
                  {showThinking ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                  AI reasoning chain (thinking)
                </button>
                {showThinking && (
                  <pre className="mt-2 text-xs text-muted-foreground whitespace-pre-wrap font-mono bg-muted/40 rounded-lg p-3 max-h-80 overflow-y-auto">
                    {result.thinking}
                  </pre>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sidebar: examples + history */}
      <div className="space-y-4">
        <div className="rounded-2xl border border-border/60 bg-card/50 backdrop-blur p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <h3 className="font-semibold text-sm">Examples</h3>
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

        {history.length > 0 && (
          <div className="rounded-2xl border border-border/60 bg-card/50 backdrop-blur p-4 space-y-3">
            <h3 className="font-semibold text-sm">Recent</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {history.map((h, i) => (
                <button
                  key={i}
                  onClick={() => loadExample(h.eq)}
                  className="w-full text-left rounded-lg border border-border/60 p-2.5 hover:bg-muted/50 transition"
                >
                  <div className="text-xs font-mono truncate text-foreground">{h.eq}</div>
                  {h.ans && (
                    <div className="text-xs text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
                      = {h.ans}
                    </div>
                  )}
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
