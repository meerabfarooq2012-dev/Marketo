/**
 * Direct import of ch08p4 formulas to production via /api/triza/knowledge POST.
 *
 * This bypasses git push + Vercel rebuild by using the knowledge API endpoint
 * to add each item directly to the production database.
 *
 * Format matches import-formulas route:
 *   question: item.question.toLowerCase() + ' | ' + item.question
 *   topic: 'math_vol9_' + item.topic
 *   keywords: item.keywords.join(', ')
 *   intent: item.intent
 */
import { readFileSync } from 'fs'

const PROD_URL = 'https://triza-ai.vercel.app'
const ORIGIN = 'https://triza-ai.vercel.app'
const TOPIC_PREFIX = 'math_vol9_'

interface FormulaItem {
  question: string
  answer: string
  topic: string
  intent: string
  keywords: string[]
}

interface FormulaFile {
  items: FormulaItem[]
}

async function main() {
  const raw = readFileSync('data/math-formulas-vol9-ch08p4.json', 'utf-8')
  const file: FormulaFile = JSON.parse(raw)
  console.log(`Loaded ${file.items.length} items from JSON`)

  let success = 0
  let failed = 0
  const errors: string[] = []

  for (let i = 0; i < file.items.length; i++) {
    const item = file.items[i]
    const fullTopic = TOPIC_PREFIX + item.topic
    const formattedQuestion = item.question.toLowerCase() + ' | ' + item.question
    const keywordsStr = item.keywords.join(', ')

    const body = {
      question: formattedQuestion,
      answer: item.answer,
      topic: fullTopic,
      intent: item.intent,
      keywords: keywordsStr,
    }

    try {
      const resp = await fetch(`${PROD_URL}/api/triza/knowledge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Origin: ORIGIN,
        },
        body: JSON.stringify(body),
      })

      if (!resp.ok) {
        const text = await resp.text()
        throw new Error(`HTTP ${resp.status}: ${text}`)
      }

      const data = await resp.json()
      success++
      if (i < 3 || (i + 1) % 10 === 0) {
        console.log(`  [${i + 1}/${file.items.length}] OK: ${item.topic} -> ${data.id}`)
      }
    } catch (err) {
      failed++
      const msg = `  [${i + 1}/${file.items.length}] FAIL: ${item.topic} -> ${err instanceof Error ? err.message : String(err)}`
      console.error(msg)
      errors.push(msg)
    }

    // Small delay to avoid overwhelming the API
    if ((i + 1) % 10 === 0) {
      await new Promise((r) => setTimeout(r, 500))
    }
  }

  console.log(`\n=== IMPORT COMPLETE ===`)
  console.log(`Success: ${success}/${file.items.length}`)
  console.log(`Failed: ${failed}/${file.items.length}`)
  if (errors.length) {
    console.log('Errors:')
    errors.forEach((e) => console.log(e))
  }

  // Verify total count
  try {
    const statsResp = await fetch(`${PROD_URL}/api/triza/stats`, {
      headers: { Origin: ORIGIN },
    })
    if (statsResp.ok) {
      const stats = await statsResp.json()
      console.log(`\nProduction total items: ${stats.totalItems || stats.total || 'unknown'}`)
    }
  } catch {
    // stats endpoint might have different format
  }
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
