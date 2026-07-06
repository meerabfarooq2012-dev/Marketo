/**
 * ============================================================
 *  Import Mathematics Formula Encyclopedia — Volume 9
 *  Chapter 4 Part 2 (Differential Calculus Applications:
 *  Rolle's & MVT, Cauchy's MVT, L'Hôpital's Rule,
 *  Linear Approximation & Differentials, Related Rates,
 *  Optimization, First & Second Derivative Tests,
 *  Concavity & Inflection, Curve Sketching & Asymptotes,
 *  Newton's Method, Taylor & Maclaurin Polynomials,
 *  Error Bounds, Antiderivatives, Separable ODEs,
 *  Marginal Analysis) into TRIZA's database
 * ============================================================
 *
 *  Reads data/math-formulas-vol9-ch04p2.json and inserts
 *  each formula as a TrizaKnowledgeItem inside a dedicated
 *  "math-formulas-vol9-ch04p2" basket.
 *
 *  Usage:
 *    bun run scripts/import-math-formulas-vol9-ch04p2.ts              # import all
 *    bun run scripts/import-math-formulas-vol9-ch04p2.ts --dry-run    # preview only
 *    bun run scripts/import-math-formulas-vol9-ch04p2.ts --limit 10   # first 10 only
 *
 *  Idempotent: if a "math-formulas-vol9-ch04p2" basket
 *  already exists, the script reports the count and exits.
 * ============================================================
 */
import { readFileSync } from 'fs'
import { db } from '../src/lib/db'

interface MathItem {
  question: string
  answer: string
  topic: string
  intent: string
  keywords: string[]
}

interface MathFile {
  generatedAt: string
  totalItems: number
  subject: string
  volume: string
  source: string
  language: string
  religionNeutral: boolean
  items: MathItem[]
}

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const limitArg = args.indexOf('--limit')
const limit = limitArg >= 0 ? parseInt(args[limitArg + 1] ?? '0', 10) : 0

async function main() {
  console.log('━'.repeat(60))
  console.log('  TRIZA — Math Formulas Vol 9 Ch04 Part 2 (Differential Calculus Applications) Importer')
  console.log('━'.repeat(60))

  // 1. Load the JSON
  const raw = readFileSync('data/math-formulas-vol9-ch04p2.json', 'utf-8')
  const data: MathFile = JSON.parse(raw)
  let items = data.items
  console.log(`  Loaded ${items.length} items from data/math-formulas-vol9-ch04p2.json`)
  console.log(`  Subject: ${data.subject}`)
  console.log(`  Volume: ${data.volume}`)
  console.log(`  Generated: ${data.generatedAt}`)
  if (limit > 0 && limit < items.length) {
    items = items.slice(0, limit)
    console.log(`  --limit ${limit} → importing only first ${limit}`)
  }
  if (dryRun) {
    console.log('\n  --dry-run: preview only, no DB writes.')
    console.log('\n  Sample items:')
    for (const item of items.slice(0, 5)) {
      console.log(`    [${item.topic}] Q: ${item.question}`)
      console.log(`         A: ${item.answer.substring(0, 120)}...`)
    }
    return
  }

  // 2. Idempotency check
  const existing = await db.trizaKnowledgeBasket.findFirst({
    where: { source: 'math-formulas-vol9-ch04p2' },
  })
  if (existing) {
    const count = await db.trizaKnowledgeItem.count({
      where: { basketId: existing.id },
    })
    console.log(`\n  ⚠ A "math-formulas-vol9-ch04p2" basket already exists.`)
    console.log(`    Basket id: ${existing.id}`)
    console.log(`    Items already imported: ${count}`)
    console.log(`    To re-import, delete the basket first in the DB.`)
    return
  }

  // 3. Create the basket
  const basket = await db.trizaKnowledgeBasket.create({
    data: {
      source: 'math-formulas-vol9-ch04p2',
      sourceLabel: 'Math Formula Encyclopedia — Vol 9 Ch04 Part 2 (Differential Calculus Applications: MVT, L\'Hôpital, Linear Approx, Related Rates, Optimization, Curve Sketching, Newton\'s Method, Taylor Polynomials, Antiderivatives, ODEs, Marginal Analysis)',
      rawContent: `Volume 9 Chapter 4 Part 2 of the Mathematics Formula Encyclopedia (Comprehensive Reference). ${items.length} formulas covering: Rolle\'s Theorem & Mean Value Theorem (Rolle conditions, MVT formula f\'(c)=[f(b)−f(a)]/(b−a), geometric interpretation, MVT for inequalities, MVT to prove constant function, Cauchy\'s generalized MVT); L\'Hôpital\'s Rule (statement, conditions 0/0 ∞/∞, ∞−∞ via common denominator, 0·∞ via rewrite, exponential forms 1^∞ 0^0 ∞^0 via logarithm, common pitfalls including oscillating derivatives); Linear Approximation & Differentials (linearization L(x)=f(a)+f\'(a)(x−a), differentials dy=f\'(x)dx, error estimation, accuracy and second-derivative error bound, common approximations for small x); Related Rates (technique chain rule w.r.t. time, expanding circle, sliding ladder via Pythagoras, filling cone with similar triangles, shadow problems, distance between two moving objects); Optimization (procedure, max area of rectangle with fixed perimeter = square, min surface area of cylinder h=2r, inscribed rectangle in semicircle, min distance from point to curve, cost minimization in packaging, closed-interval optimization via endpoints); First & Second Derivative Tests (First Derivative Test sign change, Second Derivative Test f\'\'(c) sign, critical points, increasing/decreasing intervals, higher-derivative test when f\'\'(c)=0); Concavity & Inflection (concave up/down via f\'\' sign, inflection point where concavity changes, concavity-tangent relationship Jensen inequality, finding all inflection points, concavity at critical points); Curve Sketching & Asymptotes (vertical asymptotes via denominator zeros and one-sided limits, horizontal asymptotes via degrees of P and Q, oblique/slant asymptotes via long division, full curve sketching checklist, rational function graphing, worked example); Newton\'s Method (formula x_(n+1)=x_n−f(x_n)/f\'(x_n), failures divergence/cycle/multiple roots, quadratic convergence error estimate, application to nth roots including Babylonian method); Taylor & Maclaurin Polynomials (T_n formula, Maclaurin at 0, eˣ series, sin/cos series, binomial series (1+x)^k, composite function Taylor via substitution); Taylor Remainder & Error Bounds (Lagrange remainder R_n=f^(n+1)(c)(x−a)^(n+1)/(n+1)!, max error bound M|x−a|^(n+1)/(n+1)!, required degree for given accuracy, alternating series error bound = first omitted term); Antiderivatives (definition F\'=f, basic formulas power/log/exp/trig/inverse-trig, linearity and substitution rules, u-substitution method, initial value problem); Separable ODEs (definition dy/dx=g(x)h(y), exponential growth/decay dy/dt=ky with half-life, IVP solving, Newton\'s Law of Cooling T(t)=T_s+(T₀−T_s)e^(kt)); Marginal Analysis (marginal cost/revenue/profit as derivatives, profit maximization MR=MC, elasticity of demand, maximum revenue when E=1). Every entry includes the formula, variables explained, and a worked numerical example with ✓ verification.`,
      metaJson: JSON.stringify({
        format: 'qa',
        count: items.length,
        subject: 'mathematics_formulas_volume_9_chapter_04_part_02',
        volume: 'Volume 9 — Comprehensive Formula Encyclopedia, Chapter 4 Part 2',
        language: 'en',
        religionNeutral: true,
        sections: 14,
      }),
      status: 'processed',
      itemCount: items.length,
      processedAt: new Date(),
    },
  })
  console.log(`\n  ✓ Created basket: ${basket.id}`)

  // 4. Insert items in batches
  const BATCH = 100
  let inserted = 0
  const t0 = Date.now()
  for (let i = 0; i < items.length; i += BATCH) {
    const batch = items.slice(i, i + BATCH)
    await db.trizaKnowledgeItem.createMany({
      data: batch.map((item) => ({
        basketId: basket.id,
        question: item.question.toLowerCase() + ' | ' + item.question,
        answer: item.answer,
        topic: 'math_vol9_' + item.topic,
        intent: item.intent,
        keywords: item.keywords.join(', '),
      })),
    })
    inserted += batch.length
    const elapsed = ((Date.now() - t0) / 1000).toFixed(1)
    const rate = (inserted / Math.max(1, Date.now() - t0) * 1000).toFixed(0)
    process.stdout.write(
      `\r  Inserted ${inserted}/${items.length} (${rate} items/s, ${elapsed}s)`
    )
  }
  console.log('')

  // 5. Final report
  const totalItems = await db.trizaKnowledgeItem.count()
  const vol9ch04p2Items = await db.trizaKnowledgeItem.count({
    where: { topic: { startsWith: 'math_vol9_ch04p2_' } },
  })
  console.log('\n  ' + '━'.repeat(56))
  console.log(`  ✓ Vol 9 Ch04 Part 2 formula items imported: ${vol9ch04p2Items}`)
  console.log(`  ✓ Total knowledge items now:                ${totalItems}`)
  console.log(`  ✓ Time: ${((Date.now() - t0) / 1000).toFixed(1)}s`)
  console.log('  ' + '━'.repeat(56))

  // 6. Sample check
  console.log('\n  Sample imported item:')
  const anySample = await db.trizaKnowledgeItem.findFirst({
    where: { topic: { startsWith: 'math_vol9_ch04p2_' } },
  })
  if (anySample) {
    console.log(`    Topic: ${anySample.topic}`)
    console.log(`    Q: ${anySample.question.split(' | ')[1] ?? anySample.question}`)
    console.log(`    A: ${anySample.answer.substring(0, 200)}...`)
  }
}

main()
  .catch((err) => {
    console.error('\n  ✗ Import failed:', err)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
