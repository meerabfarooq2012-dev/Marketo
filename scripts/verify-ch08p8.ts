/**
 * Verify ch08p8 production chat retrieval: 50 queries, target 100% direct hits.
 * Each query is the item's question. Expected returned topic = math_vol9_ch08p8_<topic>.
 */
import { readFileSync } from 'fs'

const PROD_URL = 'https://triza-ai.vercel.app'
const ORIGIN = 'https://triza-ai.vercel.app'
const STORED_PREFIX = 'math_vol9_'

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

interface ChatStep {
  step?: string
  topic?: string
  confidence?: number
  [key: string]: unknown
}

interface ChatResponse {
  answer?: string
  topic?: string
  confidence?: number
  steps?: ChatStep[]
  match?: { topic?: string; confidence?: number; [k: string]: unknown }
  [key: string]: unknown
}

async function queryChat(question: string): Promise<{ topic: string; confidence: number } | null> {
  try {
    const resp = await fetch(`${PROD_URL}/api/triza/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: ORIGIN,
      },
      body: JSON.stringify({ message: question }),
    })

    if (!resp.ok) {
      console.error(`  HTTP ${resp.status} for: ${question.substring(0, 60)}...`)
      return null
    }

    const data: ChatResponse = await resp.json()

    // Try to extract topic + confidence from various possible locations
    let topic: string | undefined
    let confidence: number | undefined

    if (data.match?.topic) {
      topic = data.match.topic
      confidence = data.match.confidence
    } else if (data.topic) {
      topic = data.topic
      confidence = data.confidence
    } else if (data.steps && Array.isArray(data.steps)) {
      // Find the step that has a topic
      for (const step of data.steps) {
        if (step.topic) {
          topic = step.topic
          confidence = step.confidence
          break
        }
      }
    }

    if (topic) {
      return { topic, confidence: confidence ?? 0 }
    }

    return null
  } catch (err) {
    console.error(`  Error: ${err instanceof Error ? err.message : String(err)}`)
    return null
  }
}

async function main() {
  const raw = readFileSync('data/math-formulas-vol9-ch08p8.json', 'utf-8')
  const file: FormulaFile = JSON.parse(raw)
  console.log(`Verifying ${file.items.length} ch08p8 items against production chat...\n`)

  const results: Array<{
    index: number
    topic: string
    expected: string
    got: string | null
    confidence: number
    hit: 'direct' | 'cross-part' | 'cross-volume' | 'miss'
  }> = []

  for (let i = 0; i < file.items.length; i++) {
    const item = file.items[i]
    const expectedTopic = STORED_PREFIX + item.topic // e.g. math_vol9_ch08p8_joint_pmf_discrete

    const result = await queryChat(item.question)

    if (!result) {
      results.push({
        index: i,
        topic: item.topic,
        expected: expectedTopic,
        got: null,
        confidence: 0,
        hit: 'miss',
      })
      console.log(`  [${i + 1}/50] MISS: ${item.topic}`)
    } else {
      const got = result.topic
      let hit: 'direct' | 'cross-part' | 'cross-volume' | 'miss'

      if (got === expectedTopic) {
        hit = 'direct'
      } else if (got.startsWith('math_vol9_ch08p8_')) {
        hit = 'cross-part'
      } else if (got.startsWith('math_vol9_')) {
        hit = 'cross-volume'
      } else {
        hit = 'miss'
      }

      results.push({
        index: i,
        topic: item.topic,
        expected: expectedTopic,
        got,
        confidence: result.confidence,
        hit,
      })

      const mark = hit === 'direct' ? '✓' : hit === 'cross-part' ? '~' : hit === 'cross-volume' ? 'x' : '?'
      console.log(
        `  [${i + 1}/50] ${mark} ${item.topic} -> ${got} (conf=${result.confidence.toFixed(3)})`
      )
    }

    // Small delay
    if ((i + 1) % 10 === 0) {
      await new Promise((r) => setTimeout(r, 300))
    }
  }

  // Summary
  const direct = results.filter((r) => r.hit === 'direct').length
  const crossPart = results.filter((r) => r.hit === 'cross-part').length
  const crossVol = results.filter((r) => r.hit === 'cross-volume').length
  const miss = results.filter((r) => r.hit === 'miss').length

  console.log(`\n=== VERIFICATION SUMMARY ===`)
  console.log(`Total queries: ${results.length}`)
  console.log(`Direct hits:   ${direct}/${results.length} (${((direct / results.length) * 100).toFixed(1)}%)`)
  console.log(`Cross-part:    ${crossPart}/${results.length}`)
  console.log(`Cross-volume:  ${crossVol}/${results.length}`)
  console.log(`Misses:        ${miss}/${results.length}`)

  if (crossPart + crossVol + miss > 0) {
    console.log(`\nNon-direct hits:`)
    results
      .filter((r) => r.hit !== 'direct')
      .forEach((r) => {
        console.log(`  ${r.topic}: expected ${r.expected}, got ${r.got} (${r.hit})`)
      })
  }

  const confidences = results.filter((r) => r.hit === 'direct').map((r) => r.confidence)
  if (confidences.length > 0) {
    console.log(
      `\nDirect hit confidences: min=${Math.min(...confidences).toFixed(3)}, max=${Math.max(...confidences).toFixed(3)}, avg=${(confidences.reduce((a, b) => a + b, 0) / confidences.length).toFixed(3)}`
    )
  }
}

main().catch((err) => {
  console.error('Fatal:', err)
  process.exit(1)
})
