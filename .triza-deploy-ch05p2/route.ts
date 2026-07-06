import { NextRequest, NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'
import { db } from '@/lib/db'
import { invalidateIndex } from '@/lib/triza-basket/matcher'

/**
 * POST /api/triza/import-formulas
 *
 *   Imports the Mathematics Formula Encyclopedia (Volumes 1 & 2)
 *   into the connected database (PostgreSQL on Vercel production,
 *   SQLite in local dev).
 *
 *   This endpoint reads the JSON files committed in /data and
 *   inserts each formula as a TrizaKnowledgeItem. It is IDEMPOTENT:
 *   if a basket with the matching source already exists, that
 *   volume is skipped.
 *
 *   Body (optional): { volumes?: ['vol1','vol2'] }
 *     - If omitted, imports all available volumes.
 *
 *   Response: {
 *     success: boolean,
 *     volumes: Array<{ volume, source, imported, skipped, error? }>,
 *     totalImported: number,
 *     totalItemsInStore: number
 *   }
 *
 *   Security: optional ADMIN_TOKEN env check. If ADMIN_TOKEN is set
 *   in the environment, the request must include it in the
 *   `x-admin-token` header (or as a `token` field in the body).
 */
export const maxDuration = 60

interface FormulaItem {
  question: string
  answer: string
  topic: string
  intent: string
  keywords: string[]
}

interface FormulaFile {
  generatedAt: string
  totalItems: number
  subject: string
  volume: string
  source: string
  language: string
  religionNeutral: boolean
  items: FormulaItem[]
}

const VOLUME_CONFIG: Record<
  string,
  { file: string; basketSource: string; label: string; topicPrefix: string }
> = {
  vol1: {
    file: 'data/math-formulas-vol1.json',
    basketSource: 'math-formulas-vol1',
    label: 'Mathematics Formula Encyclopedia — Volume 1 (Class 1-5)',
    topicPrefix: 'math_vol1_',
  },
  vol2: {
    file: 'data/math-formulas-vol2.json',
    basketSource: 'math-formulas-vol2',
    label: 'Mathematics Formula Encyclopedia — Volume 2 (Class 6-8)',
    topicPrefix: 'math_vol2_',
  },
  vol3: {
    file: 'data/math-formulas-vol3.json',
    basketSource: 'math-formulas-vol3',
    label: 'Mathematics Formula Encyclopedia — Volume 3 (Class 9-10)',
    topicPrefix: 'math_vol3_',
  },
  vol4: {
    file: 'data/math-formulas-vol4.json',
    basketSource: 'math-formulas-vol4',
    label: 'Mathematics Formula Encyclopedia — Volume 4 (Class 11-12)',
    topicPrefix: 'math_vol4_',
  },
  vol5: {
    file: 'data/math-formulas-vol5.json',
    basketSource: 'math-formulas-vol5',
    label: 'Mathematics Formula Encyclopedia — Volume 5 (Undergraduate BS/BSc)',
    topicPrefix: 'math_vol5_',
  },
  vol6: {
    file: 'data/math-formulas-vol6.json',
    basketSource: 'math-formulas-vol6',
    label: 'Mathematics Formula Encyclopedia — Volume 6 (MSc Mathematics)',
    topicPrefix: 'math_vol6_',
  },
  vol7: {
    file: 'data/math-formulas-vol7.json',
    basketSource: 'math-formulas-vol7',
    label: 'Mathematics Formula Encyclopedia — Volume 7 (AI Mathematics: ML & DL)',
    topicPrefix: 'math_vol7_',
  },
  vol8: {
    file: 'data/math-formulas-vol8.json',
    basketSource: 'math-formulas-vol8',
    label: 'Mathematics Formula Encyclopedia — Volume 8 (PhD Mathematics & AI Research)',
    topicPrefix: 'math_vol8_',
  },
  vol9ch01p1: {
    file: 'data/math-formulas-vol9-ch01p1.json',
    basketSource: 'math-formulas-vol9-ch01p1',
    label:
      'Mathematics Formula Encyclopedia — Volume 9 Chapter 1 Part 1 (Foundations: Number Systems, Algebra & Number Theory)',
    topicPrefix: 'math_vol9_',
  },
  vol9ch01p2: {
    file: 'data/math-formulas-vol9-ch01p2.json',
    basketSource: 'math-formulas-vol9-ch01p2',
    label:
      'Mathematics Formula Encyclopedia — Volume 9 Chapter 1 Part 2 (Advanced Identities, Series & Number Theory)',
    topicPrefix: 'math_vol9_',
  },
  vol9ch02p1: {
    file: 'data/math-formulas-vol9-ch02p1.json',
    basketSource: 'math-formulas-vol9-ch02p1',
    label:
      'Mathematics Formula Encyclopedia — Volume 9 Chapter 2 Part 1 (Algebra: Identities, Exponents, Logarithms & Quadratics)',
    topicPrefix: 'math_vol9_',
  },
  vol9ch02p2: {
    file: 'data/math-formulas-vol9-ch02p2.json',
    basketSource: 'math-formulas-vol9-ch02p2',
    label:
      'Mathematics Formula Encyclopedia — Volume 9 Chapter 2 Part 2 (Algebra: Higher Binomials, Factoring & Symmetric Identities)',
    topicPrefix: 'math_vol9_',
  },
  vol9ch02p3: {
    file: 'data/math-formulas-vol9-ch02p3.json',
    basketSource: 'math-formulas-vol9-ch02p3',
    label:
      'Mathematics Formula Encyclopedia — Volume 9 Chapter 2 Part 3 (Algebra: Polynomials, Vieta, Binomial Coefficients & Factoring)',
    topicPrefix: 'math_vol9_',
  },
  vol9ch02p4: {
    file: 'data/math-formulas-vol9-ch02p4.json',
    basketSource: 'math-formulas-vol9-ch02p4',
    label:
      'Mathematics Formula Encyclopedia — Volume 9 Chapter 2 Part 4 (Algebra: Exponents, Logarithms, Series & Progressions)',
    topicPrefix: 'math_vol9_',
  },
  vol9ch03p1: {
    file: 'data/math-formulas-vol9-ch03p1.json',
    basketSource: 'math-formulas-vol9-ch03p1',
    label:
      'Mathematics Formula Encyclopedia — Volume 9 Chapter 3 Part 1 (Trigonometry: Ratios, Identities, Sum/Difference, Multiple & Half Angles)',
    topicPrefix: 'math_vol9_',
  },
  vol9ch03p2: {
    file: 'data/math-formulas-vol9-ch03p2.json',
    basketSource: 'math-formulas-vol9-ch03p2',
    label:
      'Mathematics Formula Encyclopedia — Volume 9 Chapter 3 Part 2 (Trigonometry: Inverse Trig Identities, Trigonometric Equations, Hyperbolic Functions)',
    topicPrefix: 'math_vol9_',
  },
  vol9ch03p3: {
    file: 'data/math-formulas-vol9-ch03p3.json',
    basketSource: 'math-formulas-vol9-ch03p3',
    label:
      'Mathematics Formula Encyclopedia — Volume 9 Chapter 3 Part 3 (Trigonometry: Complex Plane, Polar Form, De Moivre, Roots of Unity, Polar Coordinates & Curves, Trig Substitution Integrals)',
    topicPrefix: 'math_vol9_',
  },
  vol9ch04p1: {
    file: 'data/math-formulas-vol9-ch04p1.json',
    basketSource: 'math-formulas-vol9-ch04p1',
    label:
      'Mathematics Formula Encyclopedia — Volume 9 Chapter 4 Part 1 (Differential Calculus: Limits, Continuity, Derivative Definition, Differentiation Rules, Chain Rule, Trigonometric/Inverse-Trig/Exponential/Logarithmic/Hyperbolic Derivatives, Higher-Order, Implicit & Logarithmic Differentiation, Inverse Functions, Tangent/Normal Lines)',
    topicPrefix: 'math_vol9_',
  },
  vol9ch04p2: {
    file: 'data/math-formulas-vol9-ch04p2.json',
    basketSource: 'math-formulas-vol9-ch04p2',
    label:
      'Mathematics Formula Encyclopedia — Volume 9 Chapter 4 Part 2 (Differential Calculus Applications: Rolle and Mean Value Theorems, Cauchy MVT, L-Hopital Rule, Linear Approximation and Differentials, Related Rates, Optimization, First and Second Derivative Tests, Concavity and Inflection, Curve Sketching and Asymptotes, Newton Method, Taylor and Maclaurin Polynomials, Error Bounds, Antiderivatives, Separable ODEs, Marginal Analysis)',
    topicPrefix: 'math_vol9_',
  },
  vol9ch04p3: {
    file: 'data/math-formulas-vol9-ch04p3.json',
    basketSource: 'math-formulas-vol9-ch04p3',
    label:
      'Mathematics Formula Encyclopedia — Volume 9 Chapter 4 Part 3 (Integral Calculus: Riemann Sums, FTC, Indefinite Integrals, Substitution, Integration by Parts, Trigonometric Integrals, Trigonometric Substitution, Partial Fractions, Improper Integrals, Applications, Numerical Integration, Hyperbolic Integrals)',
    topicPrefix: 'math_vol9_',
  },
  vol9ch05p1: {
    file: 'data/math-formulas-vol9-ch05p1.json',
    basketSource: 'math-formulas-vol9-ch05p1',
    label:
      'Mathematics Formula Encyclopedia — Volume 9 Chapter 5 Part 1 (Sequences, Series, Convergence Tests: Integral Test, Comparison Tests, Alternating Series Test, Ratio Test, Root Test, Power Series, Taylor and Maclaurin Series, Applications of Taylor Series, Parametric Equations and Calculus, Polar Coordinates and Calculus)',
    topicPrefix: 'math_vol9_',
  },
  vol9ch05p2: {
    file: 'data/math-formulas-vol9-ch05p2.json',
    basketSource: 'math-formulas-vol9-ch05p2',
    label:
      'Mathematics Formula Encyclopedia — Volume 9 Chapter 5 Part 2 (Multivariable Calculus: Vectors in 2D and 3D, Dot Product, Cross Product, Lines and Planes in 3D, Quadric Surfaces, Vector-Valued Functions, Calculus of VVF, Arc Length and Curvature, Motion in Space, Functions of Several Variables, Limits and Continuity, Partial Derivatives, Chain Rule, Directional Derivatives and Gradient, Tangent Planes and Linear Approximation, Extrema, Lagrange Multipliers, Double Integrals, Double Integrals in Polar, Triple Integrals in Cylindrical and Spherical, Applications of Multiple Integrals)',
    topicPrefix: 'math_vol9_',
  },
}

export async function POST(req: NextRequest) {
  try {
    // Security check (optional — only enforced if ADMIN_TOKEN env is set)
    const adminToken = process.env.ADMIN_TOKEN
    if (adminToken) {
      const headerToken = req.headers.get('x-admin-token')
      let bodyToken: string | undefined
      try {
        const peekBody = await req.clone().json().catch(() => ({}))
        bodyToken = peekBody?.token
      } catch {
        // ignore
      }
      if (headerToken !== adminToken && bodyToken !== adminToken) {
        return NextResponse.json(
          { error: 'Unauthorized: invalid or missing admin token' },
          { status: 401 }
        )
      }
    }

    const body = await req.json().catch(() => ({}))
    const requestedVolumes: string[] = body?.volumes?.length
      ? body.volumes
      : Object.keys(VOLUME_CONFIG)

    const results: Array<{
      volume: string
      source: string
      imported: number
      skipped: boolean
      error?: string
    }> = []
    let totalImported = 0

    for (const volKey of requestedVolumes) {
      const config = VOLUME_CONFIG[volKey]
      if (!config) {
        results.push({
          volume: volKey,
          source: '',
          imported: 0,
          skipped: false,
          error: `Unknown volume "${volKey}". Available: ${Object.keys(VOLUME_CONFIG).join(', ')}`,
        })
        continue
      }

      // Idempotency check
      const existing = await db.trizaKnowledgeBasket.findFirst({
        where: { source: config.basketSource },
      })
      if (existing) {
        const count = await db.trizaKnowledgeItem.count({
          where: { basketId: existing.id },
        })
        results.push({
          volume: volKey,
          source: config.basketSource,
          imported: 0,
          skipped: true,
        })
        console.log(
          `[import-formulas] ${volKey}: already imported (${count} items), skipping`
        )
        continue
      }

      // Read the JSON file (bundled with the app on Vercel)
      let fileData: FormulaFile
      try {
        const filePath = join(process.cwd(), config.file)
        const raw = readFileSync(filePath, 'utf-8')
        fileData = JSON.parse(raw)
      } catch (readErr) {
        results.push({
          volume: volKey,
          source: config.basketSource,
          imported: 0,
          skipped: false,
          error: `Could not read ${config.file}: ${readErr instanceof Error ? readErr.message : 'unknown error'}`,
        })
        continue
      }

      const items = fileData.items
      if (!items || items.length === 0) {
        results.push({
          volume: volKey,
          source: config.basketSource,
          imported: 0,
          skipped: false,
          error: 'No items found in the JSON file',
        })
        continue
      }

      // Create the basket
      const basket = await db.trizaKnowledgeBasket.create({
        data: {
          source: config.basketSource,
          sourceLabel: config.label,
          rawContent: `${fileData.volume}. ${items.length} formulas. Every entry includes the formula, variables explained, and a worked example. Subject: ${fileData.subject}.`,
          metaJson: JSON.stringify({
            format: 'qa',
            count: items.length,
            subject: fileData.subject,
            volume: fileData.volume,
            language: fileData.language,
            religionNeutral: fileData.religionNeutral,
          }),
          status: 'processed',
          itemCount: items.length,
          processedAt: new Date(),
        },
      })

      // Insert items in batches (safe for both SQLite and Postgres)
      const BATCH = 100
      let inserted = 0
      for (let i = 0; i < items.length; i += BATCH) {
        const batch = items.slice(i, i + BATCH)
        await db.trizaKnowledgeItem.createMany({
          data: batch.map((item) => ({
            basketId: basket.id,
            question: item.question.toLowerCase() + ' | ' + item.question,
            answer: item.answer,
            topic: config.topicPrefix + item.topic,
            intent: item.intent,
            keywords: item.keywords.join(', '),
          })),
        })
        inserted += batch.length
      }

      totalImported += inserted
      results.push({
        volume: volKey,
        source: config.basketSource,
        imported: inserted,
        skipped: false,
      })
      console.log(`[import-formulas] ${volKey}: imported ${inserted} items`)
    }

    // Invalidate the in-memory TF-IDF index so new items are searchable
    invalidateIndex()

    const totalItemsInStore = await db.trizaKnowledgeItem.count()

    return NextResponse.json({
      success: true,
      volumes: results,
      totalImported,
      totalItemsInStore,
      message:
        totalImported > 0
          ? `Imported ${totalImported} formula items. ${results.filter((r) => r.skipped).length} volume(s) were already present and skipped.`
          : `No new items imported. All requested volumes were already present.`,
    })
  } catch (err) {
    console.error('[import-formulas] error:', err)
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : 'Import failed',
        success: false,
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/triza/import-formulas
 *   Returns the status of formula imports (which volumes are present).
 */
export async function GET() {
  try {
    const statuses: Array<{
      volume: string
      source: string
      present: boolean
      itemCount: number
    }> = []

    for (const [volKey, config] of Object.entries(VOLUME_CONFIG)) {
      const basket = await db.trizaKnowledgeBasket.findFirst({
        where: { source: config.basketSource },
      })
      const itemCount = basket
        ? await db.trizaKnowledgeItem.count({
            where: { basketId: basket.id },
          })
        : 0
      statuses.push({
        volume: volKey,
        source: config.basketSource,
        present: !!basket,
        itemCount,
      })
    }

    const totalItems = await db.trizaKnowledgeItem.count()

    return NextResponse.json({
      success: true,
      volumes: statuses,
      totalItemsInStore: totalItems,
    })
  } catch (err) {
    console.error('[import-formulas GET] error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Status check failed' },
      { status: 500 }
    )
  }
}
