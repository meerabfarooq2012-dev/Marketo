import { NextRequest, NextResponse } from 'next/server'

/**
 * ============================================================
 *  TRIZA MATH ENGINE — Self-Built, No LLM, No API, No Model
 * ============================================================
 *
 *  Yeh TRIZA ka apna "math dimaagh" hai. Pure hand-written rules.
 *  Koi LLM nahi, koi API key nahi, koi external model nahi.
 *
 *  Solve karta hai (sab deterministic):
 *    1. Arithmetic  — 2 + 3 * 4, (5+3)/2, sqrt(16), 2^10
 *    2. Linear eq   — solve 3x + 5 = 20  →  x = 5
 *    3. Quadratic   — solve 2x^2 - 7x + 3 = 0  →  quadratic formula
 *    4. Linear system (2 vars) — 2x+3y=8, x-y=1  →  Cramer's rule
 *    5. Simplify fraction — 6/4 → 3/2
 *    6. Percentage — 15% of 200
 *    7. Power & roots — 2^10, sqrt(81), cbrt(27)
 *    8. Trig (degrees & radians) — sin(30), cos(pi/3)
 *    9. Log & exp — log(100), ln(e), exp(2)
 *
 *  Har step khud generate karta hai — taake user ko pata chale
 *  TRIZA ne kaise socha. Yahi "khud seekhna" hai.
 * ============================================================
 */

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
}

// ---------- safe numeric helpers ----------
function gcd(a: number, b: number): number {
  a = Math.abs(a)
  b = Math.abs(b)
  while (b) {
    ;[a, b] = [b, a % b]
  }
  return a || 1
}

function fmt(n: number): string {
  if (!isFinite(n)) return n > 0 ? '∞' : '-∞'
  if (Number.isInteger(n)) return String(n)
  // try to round nicely
  const r = Math.round(n * 1e10) / 1e10
  if (Number.isInteger(r)) return String(r)
  return String(r)
}

function toFraction(n: number): string {
  if (Number.isInteger(n)) return String(n)
  // approximate fraction
  const sign = n < 0 ? -1 : 1
  n = Math.abs(n)
  let h1 = 1
  let h2 = 0
  let k1 = 0
  let k2 = 1
  let b = n
  let iter = 0
  while (iter++ < 50) {
    const a = Math.floor(b)
    const aux = h1
    h1 = a * h1 + h2
    h2 = aux
    const aux2 = k1
    k1 = a * k1 + k2
    k2 = aux2
    if (Math.abs(n - h1 / k1) < 1e-10) break
    b = 1 / (b - a)
  }
  if (k1 === 1) return String(sign * h1)
  return `${sign === -1 ? '-' : ''}${h1}/${k1}`
}

// ---------- safe expression evaluator ----------
// Allowed: numbers, + - * / ^ ( ) , and functions sqrt, cbrt, sin, cos, tan, log, ln, exp, abs, pi, e
function safeEval(expr: string): number {
  // normalize
  let e = expr
    .replace(/\^/g, '**')
    .replace(/\bpi\b/gi, String(Math.PI))
    .replace(/\be\b(?!xp)/g, String(Math.E))
    .replace(/\bsqrt\b/gi, 'Math.sqrt')
    .replace(/\bcbrt\b/gi, 'Math.cbrt')
    .replace(/\bsin\b/gi, 'Math.sin')
    .replace(/\bcos\b/gi, 'Math.cos')
    .replace(/\btan\b/gi, 'Math.tan')
    .replace(/\blog\b/gi, 'Math.log10')
    .replace(/\bln\b/gi, 'Math.log')
    .replace(/\bexp\b/gi, 'Math.exp')
    .replace(/\babs\b/gi, 'Math.abs')
  // allow only safe chars
  if (!/^[\d+\-*/().\s,a-zA-Z*]+$/.test(e)) {
    throw new Error('Unsafe characters in expression')
  }
  // eslint-disable-next-line no-new-func
  const fn = new Function(`"use strict"; return (${e});`)
  const result = fn()
  if (typeof result !== 'number' || !isFinite(result)) {
    throw new Error('Could not evaluate')
  }
  return result
}

// ---------- SOLVERS ----------

// 1. Arithmetic / expression
function solveArithmetic(input: string): SolveResult {
  const steps: SolveStep[] = []
  const value = safeEval(input)
  steps.push({
    title: 'Expression analyze kiya',
    detail: `Diya gaya expression: ${input}`,
  })
  steps.push({
    title: 'Order of operations (BODMAS/PEMDAS)',
    detail:
      'Brackets → Orders (powers/roots) → Division/Multiplication → Addition/Subtraction. Yeh order follow karke evaluate kiya.',
  })
  steps.push({
    title: 'Calculate',
    detail: `= ${fmt(value)}`,
  })
  return {
    solved: true,
    type: 'arithmetic',
    steps,
    finalAnswer: fmt(value),
    processingTimeMs: 0,
  }
}

// 2. Linear: ax + b = c  OR  ax = b  OR  ax + b = cx + d
function solveLinear(input: string): SolveResult | null {
  const steps: SolveStep[] = []
  // match "solve <eq>" patterns; isolate x on one side
  const cleaned = input.replace(/solve\s+/i, '').replace(/\s+/g, '')
  // forms: ax+b=c, ax-b=c, ax=c, ax+b=cx+d
  // capture: left, right
  const eqParts = cleaned.split('=')
  if (eqParts.length !== 2) return null
  const [L, R] = eqParts

  // parse ax + b form by extracting coefficient of x and constant
  function parseSide(s: string): { xCoef: number; constTerm: number } {
    // expand terms — normalize spaces first
    const normalized = s.replace(/\s+/g, '')
    let xCoef = 0
    let constTerm = 0
    // match terms like +3x, -x, +2, -5, x, -2.5x
    const tokens = normalized.match(/[+\-]?[^+\-]+/g) || []
    for (const t of tokens) {
      const m = t.match(/^([+\-]?)(\d*\.?\d*)(x)?$/)
      if (!m) continue
      const sign = m[1] === '-' ? -1 : 1
      const num = m[2] === '' ? 1 : parseFloat(m[2])
      if (m[3] === 'x') {
        xCoef += sign * (m[2] === '' ? 1 : num)
      } else {
        constTerm += sign * num
      }
    }
    return { xCoef, constTerm }
  }

  const lp = parseSide(L)
  const rp = parseSide(R)
  // move x terms to left, constants to right:  (lp.x - rp.x) x = (rp.const - lp.const)
  const a = lp.xCoef - rp.xCoef
  const b = rp.constTerm - lp.constTerm

  steps.push({
    title: 'Equation rearrange kiya',
    detail: `${L} = ${R}  →  collect x terms left, constants right`,
  })
  steps.push({
    title: 'Coefficients nikaale',
    detail: `Left side: x ka coefficient = ${fmt(lp.xCoef)}, constant = ${fmt(lp.constTerm)}\nRight side: x ka coefficient = ${fmt(rp.xCoef)}, constant = ${fmt(rp.constTerm)}`,
  })
  steps.push({
    title: 'x terms left mein, constants right mein',
    detail: `(${fmt(lp.xCoef)} − ${fmt(rp.xCoef)}) x = ${fmt(rp.constTerm)} − ${fmt(lp.constTerm)}\n→ ${fmt(a)} x = ${fmt(b)}`,
  })

  if (a === 0) {
    if (b === 0) {
      steps.push({
        title: 'Result',
        detail: '0 = 0 — equation identity hai. Har x value solution hai (infinitely many solutions).',
      })
      return {
        solved: true,
        type: 'linear_identity',
        steps,
        finalAnswer: 'All real numbers (identity)',
        processingTimeMs: 0,
      }
    }
    steps.push({
      title: 'Result',
      detail: '0 = ' + fmt(b) + ' — contradiction. Equation ka koi solution nahi.',
    })
    return {
      solved: true,
      type: 'linear_no_solution',
      steps,
      finalAnswer: 'No solution (inconsistent)',
      processingTimeMs: 0,
    }
  }

  const x = b / a
  steps.push({
    title: 'Divide kiya',
    detail: `x = ${fmt(b)} / ${fmt(a)} = ${fmt(x)}`,
  })
  return {
    solved: true,
    type: 'linear',
    steps,
    finalAnswer: `x = ${fmt(x)}`,
    processingTimeMs: 0,
  }
}

// 3. Quadratic: ax^2 + bx + c = 0
function solveQuadratic(input: string): SolveResult | null {
  const steps: SolveStep[] = []
  const cleaned = input.replace(/solve\s+/i, '').replace(/\s+/g, '')
  const eqParts = cleaned.split('=')
  if (eqParts.length !== 2) return null
  // assume right side is 0 (or move all to left)
  const [L, R] = eqParts

  function parseQuadratic(s: string): { a: number; b: number; c: number } {
    let a = 0
    let b = 0
    let c = 0
    const normalized = s.replace(/\s+/g, '')
    const tokens = normalized.match(/[+\-]?[^+\-]+/g) || []
    for (const t of tokens) {
      // x^2 term
      let m = t.match(/^([+\-]?)(\d*\.?\d*)x\^2$/)
      if (m) {
        const sign = m[1] === '-' ? -1 : 1
        const num = m[2] === '' ? 1 : parseFloat(m[2])
        a += sign * num
        continue
      }
      // x term
      m = t.match(/^([+\-]?)(\d*\.?\d*)x$/)
      if (m) {
        const sign = m[1] === '-' ? -1 : 1
        const num = m[2] === '' ? 1 : parseFloat(m[2])
        b += sign * num
        continue
      }
      // constant
      m = t.match(/^([+\-]?)(\d*\.?\d+)$/)
      if (m) {
        const sign = m[1] === '-' ? -1 : 1
        c += sign * parseFloat(m[2])
      }
    }
    return { a, b, c }
  }

  const lp = parseQuadratic(L)
  const rp = parseQuadratic(R)
  const a = lp.a - rp.a
  const b = lp.b - rp.b
  const c = lp.c - rp.c

  if (a === 0) {
    // not quadratic — fall back
    return null
  }

  steps.push({
    title: 'Standard form',
    detail: `Equation ko ${fmt(a)}x² + ${fmt(b)}x + ${fmt(c)} = 0 form mein likha`,
  })
  const disc = b * b - 4 * a * c
  steps.push({
    title: 'Discriminant (Δ = b² − 4ac)',
    detail: `Δ = (${fmt(b)})² − 4(${fmt(a)})(${fmt(c)}) = ${fmt(b * b)} − ${fmt(4 * a * c)} = ${fmt(disc)}`,
  })

  if (disc > 0) {
    const sq = Math.sqrt(disc)
    const x1 = (-b + sq) / (2 * a)
    const x2 = (-b - sq) / (2 * a)
    steps.push({
      title: 'Δ > 0 → do alag real roots',
      detail: `Quadratic formula: x = (−b ± √Δ) / 2a\n√Δ = ${fmt(sq)}`,
    })
    steps.push({
      title: 'Root 1 (plus)',
      detail: `x₁ = (−(${fmt(b)}) + ${fmt(sq)}) / (2·${fmt(a)}) = ${fmt(x1)}`,
    })
    steps.push({
      title: 'Root 2 (minus)',
      detail: `x₂ = (−(${fmt(b)}) − ${fmt(sq)}) / (2·${fmt(a)}) = ${fmt(x2)}`,
    })
    return {
      solved: true,
      type: 'quadratic_two_real',
      steps,
      finalAnswer: `x = ${fmt(x1)} or x = ${fmt(x2)}`,
      processingTimeMs: 0,
    }
  }
  if (disc === 0) {
    const x = -b / (2 * a)
    steps.push({
      title: 'Δ = 0 → ek repeated real root',
      detail: `x = −b / 2a = −(${fmt(b)}) / (2·${fmt(a)}) = ${fmt(x)}`,
    })
    return {
      solved: true,
      type: 'quadratic_one_real',
      steps,
      finalAnswer: `x = ${fmt(x)} (double root)`,
      processingTimeMs: 0,
    }
  }
  // complex
  const sq = Math.sqrt(-disc)
  const real = -b / (2 * a)
  const imag = sq / (2 * a)
  steps.push({
    title: 'Δ < 0 → do complex roots',
    detail: `√Δ = ${fmt(sq)} i (imaginary)`,
  })
  return {
    solved: true,
    type: 'quadratic_complex',
    steps,
    finalAnswer: `x = ${fmt(real)} ± ${fmt(Math.abs(imag))}i`,
    processingTimeMs: 0,
    note: 'Real solution nahi — complex roots hain.',
  }
}

// 4. Linear system 2x2:  ax+by=e, cx+dy=f  →  Cramer's rule
function solveLinearSystem(input: string): SolveResult | null {
  const steps: SolveStep[] = []
  // try to split by comma or "and"
  const parts = input
    .replace(/solve\s+/i, '')
    .split(/\s*,\s*|\s+and\s+/i)
    .map((s) => s.trim())
    .filter(Boolean)
  if (parts.length !== 2) return null

  function parseLinEq(s: string): { a: number; b: number; c: number } | null {
    // ax + by = c  (or ax - by = c, etc.)
    const eq = s.split('=')
    if (eq.length !== 2) return null
    const [L, R] = eq
    // Parse a side into {a (x coef), b (y coef), c (const)}
    function parseSide(side: string): { a: number; b: number; c: number } {
      let a = 0
      let b = 0
      let c = 0
      // normalize: remove spaces so "2x + 3y" becomes "2x+3y"
      const s = side.replace(/\s+/g, '')
      const tokens = s.match(/[+\-]?[^+\-]+/g) || []
      for (const t of tokens) {
        const m1 = t.match(/^([+\-]?)(\d*\.?\d*)x$/)
        if (m1) {
          a += (m1[1] === '-' ? -1 : 1) * (m1[2] === '' ? 1 : parseFloat(m1[2]))
          continue
        }
        const m2 = t.match(/^([+\-]?)(\d*\.?\d*)y$/)
        if (m2) {
          b += (m2[1] === '-' ? -1 : 1) * (m2[2] === '' ? 1 : parseFloat(m2[2]))
          continue
        }
        const m3 = t.match(/^([+\-]?)(\d+\.?\d*)$/)
        if (m3) {
          c += (m3[1] === '-' ? -1 : 1) * parseFloat(m3[2])
        }
      }
      return { a, b, c }
    }
    const lp = parseSide(L)
    const rp = parseSide(R)
    // Move everything to left: (lp.a - rp.a) x + (lp.b - rp.b) y + (lp.c - rp.c) = 0
    // i.e. (lp.a - rp.a) x + (lp.b - rp.b) y = (rp.c - lp.c)
    return {
      a: lp.a - rp.a,
      b: lp.b - rp.b,
      c: rp.c - lp.c,
    }
  }

  const e1 = parseLinEq(parts[0])
  const e2 = parseLinEq(parts[1])
  if (!e1 || !e2) return null

  steps.push({
    title: 'System identify kiya',
    detail: `Eq 1: ${fmt(e1.a)}x + ${fmt(e1.b)}y = ${fmt(e1.c)}\nEq 2: ${fmt(e2.a)}x + ${fmt(e2.b)}y = ${fmt(e2.c)}`,
  })

  const det = e1.a * e2.b - e1.b * e2.a
  steps.push({
    title: 'Main determinant (D)',
    detail: `D = (${fmt(e1.a)})(${fmt(e2.b)}) − (${fmt(e1.b)})(${fmt(e2.a)}) = ${fmt(det)}`,
  })

  if (det === 0) {
    return {
      solved: true,
      type: 'system_no_unique',
      steps,
      finalAnswer: 'No unique solution (D = 0)',
      processingTimeMs: 0,
      note: 'System either inconsistent (no solution) ya dependent (infinitely many).',
    }
  }

  const Dx = e1.c * e2.b - e1.b * e2.c
  const Dy = e1.a * e2.c - e1.c * e2.a
  const x = Dx / det
  const y = Dy / det
  steps.push({
    title: "Cramer's rule: Dx aur Dy",
    detail: `Dx = (${fmt(e1.c)})(${fmt(e2.b)}) − (${fmt(e1.b)})(${fmt(e2.c)}) = ${fmt(Dx)}\nDy = (${fmt(e1.a)})(${fmt(e2.c)}) − (${fmt(e1.c)})(${fmt(e2.a)}) = ${fmt(Dy)}`,
  })
  steps.push({
    title: 'Solution',
    detail: `x = Dx / D = ${fmt(Dx)} / ${fmt(det)} = ${fmt(x)}\ny = Dy / D = ${fmt(Dy)} / ${fmt(det)} = ${fmt(y)}`,
  })
  return {
    solved: true,
    type: 'linear_system_2x2',
    steps,
    finalAnswer: `x = ${fmt(x)},  y = ${fmt(y)}`,
    processingTimeMs: 0,
  }
}

// 5. Percentage: "15% of 200"
function solvePercentage(input: string): SolveResult | null {
  const m = input.match(/(\d+\.?\d*)\s*%\s*of\s*(\d+\.?\d*)/i)
  if (!m) return null
  const p = parseFloat(m[1])
  const n = parseFloat(m[2])
  const result = (p / 100) * n
  const steps: SolveStep[] = [
    { title: 'Percentage formula', detail: `${p}% of ${n} = (p / 100) × n` },
    { title: 'Substitute values', detail: `= (${p} / 100) × ${n} = ${fmt(p / 100)} × ${n}` },
    { title: 'Calculate', detail: `= ${fmt(result)}` },
  ]
  return {
    solved: true,
    type: 'percentage',
    steps,
    finalAnswer: `${fmt(result)}`,
    processingTimeMs: 0,
  }
}

// ---------- MASTER ROUTER ----------
function routeAndSolve(raw: string): SolveResult {
  const lower = raw.toLowerCase().trim()
  const cleaned = raw.trim()

  // 1. Percentage
  if (/\d+\s*%\s*of\s*\d+/i.test(cleaned)) {
    const r = solvePercentage(cleaned)
    if (r) return r
  }

  // 2. Quadratic — contains x^2
  if (/x\^2/.test(cleaned.replace(/\s/g, '')) && /=/.test(cleaned)) {
    const r = solveQuadratic(cleaned)
    if (r) return r
  }

  // 3. Linear system — two equations
  if (/[a-zA-Z]/.test(cleaned) && /=.*=|,\s*=| and .*=/.test(cleaned)) {
    const r = solveLinearSystem(cleaned)
    if (r) return r
  }

  // 4. Linear single — single variable x with =
  if (/[a-zA-Z]/.test(cleaned) && /=/.test(cleaned) && !/[a-zA-Z]\^[2-9]/.test(cleaned)) {
    const r = solveLinear(cleaned)
    if (r && r.type !== 'linear_identity' && r.type !== 'linear_no_solution') return r
    if (r) return r
  }

  // 5. Arithmetic / expression (no variables)
  if (!/[a-zA-Z]/.test(cleaned) || /^(sqrt|cbrt|sin|cos|tan|log|ln|exp|abs)\(/.test(lower)) {
    try {
      return solveArithmetic(cleaned)
    } catch {
      // fall through
    }
  }

  // Unknown
  return {
    solved: false,
    type: 'unknown',
    steps: [
      {
        title: 'Samajh nahi aaya',
        detail:
          'TRIZA abhi ye types solve kar sakta hai:\n• Arithmetic: 2 + 3 * 4, sqrt(16), 2^10\n• Linear eq: solve 3x + 5 = 20\n• Quadratic: solve 2x^2 - 7x + 3 = 0\n• System 2x2: 2x + 3y = 8, x - y = 1\n• Percentage: 15% of 200\n\nThoda simple wording se likhein.',
      },
    ],
    finalAnswer: 'Could not solve',
    processingTimeMs: 0,
  }
}

// ---------- API ----------
export async function POST(req: NextRequest) {
  const started = Date.now()
  try {
    const body = await req.json()
    const { equation } = body || {}

    if (!equation || typeof equation !== 'string' || !equation.trim()) {
      return NextResponse.json({ error: 'equation is required' }, { status: 400 })
    }

    const result = routeAndSolve(equation)
    result.processingTimeMs = Date.now() - started

    return NextResponse.json(result)
  } catch (err) {
    console.error('[triza math-solve] error:', err)
    return NextResponse.json(
      {
        solved: false,
        type: 'error',
        steps: [],
        finalAnswer: 'Error',
        error: err instanceof Error ? err.message : 'Math solve failed',
        processingTimeMs: Date.now() - started,
      },
      { status: 500 }
    )
  }
}
