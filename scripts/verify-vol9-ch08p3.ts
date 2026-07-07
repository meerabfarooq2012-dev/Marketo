/**
 * Verify Vol 9 Ch08 Part 1 — query production chat for each item,
 * check whether the returned topic matches the expected math_vol9_ch08p3_* topic.
 */
import { readFileSync } from 'fs'

const data = JSON.parse(
  readFileSync('data/math-formulas-vol9-ch08p3.json', 'utf8')
) as {
  items: { question: string; topic: string; keywords: string[] }[]
}

const STORED_PREFIX = 'math_vol9_' // topicPrefix from route.ts VOLUME_CONFIG
const PART_PREFIX = 'math_vol9_ch08p3_' // for detecting cross-part hits
const CHAT_URL = 'https://triza-ai.vercel.app/api/triza/chat'
const ORIGIN = 'https://triza-ai.vercel.app'

// Craft a distinctive query from the question + keywords.
// Lead with the most distinctive keyword term for better retrieval.
function craftQuery(q: { question: string; topic: string; keywords: string[] }): string {
  // Use the question as-is (already distinctive for ch08p3)
  return q.question
}

async function queryChat(message: string): Promise<{
  topic: string | null
  confidence: number
  score?: number
  answer: string
}> {
  try {
    const res = await fetch(CHAT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: ORIGIN,
      },
      body: JSON.stringify({ message, mode: 'exact' }),
      signal: AbortSignal.timeout(30000),
    })
    if (!res.ok) {
      return { topic: null, confidence: 0, answer: `HTTP ${res.status}` }
    }
    const j = (await res.json()) as {
      topic?: string | null
      confidence?: number
      answer?: string
    }
    return {
      topic: j.topic ?? null,
      confidence: j.confidence ?? 0,
      answer: (j.answer ?? '').slice(0, 120),
    }
  } catch (e) {
    return { topic: null, confidence: 0, answer: `ERR ${String(e).slice(0, 80)}` }
  }
}

async function main() {
  const items = data.items
  const results: {
    idx: number
    topic: string
    expected: string
    got: string | null
    confidence: number
    category: 'direct' | 'cross_part' | 'cross_volume' | 'miss'
  }[] = []

  for (let i = 0; i < items.length; i++) {
    const it = items[i]
    const expected = STORED_PREFIX + it.topic
    const query = craftQuery(it)
    const r = await queryChat(query)
    let category: 'direct' | 'cross_part' | 'cross_volume' | 'miss'
    if (r.topic && r.topic === expected) category = 'direct'
    else if (r.topic && r.topic.startsWith(PART_PREFIX)) category = 'cross_part'
    else if (r.topic) category = 'cross_volume'
    else category = 'miss'

    results.push({
      idx: i + 1,
      topic: it.topic,
      expected,
      got: r.topic,
      confidence: r.confidence,
      category,
    })
    const tag =
      category === 'direct' ? '✓' : category === 'cross_part' ? '~' : category === 'cross_volume' ? 'x' : '?'
    const gotShort = r.topic ? r.topic.replace('math_vol9_', '') : 'NULL'
    process.stdout.write(
      `q${i + 1} ${tag} [${r.confidence.toFixed(3)}] ${it.topic} -> ${gotShort}\n`
    )
    // small delay to be polite
    await new Promise((r) => setTimeout(r, 250))
  }

  // Summary
  const direct = results.filter((r) => r.category === 'direct').length
  const crossPart = results.filter((r) => r.category === 'cross_part').length
  const crossVol = results.filter((r) => r.category === 'cross_volume').length
  const miss = results.filter((r) => r.category === 'miss').length
  console.log('\n========== SUMMARY ==========')
  console.log(`Total queries:   ${results.length}`)
  console.log(`Direct hits:     ${direct} (${((direct / results.length) * 100).toFixed(1)}%)`)
  console.log(`Cross-part:      ${crossPart}`)
  console.log(`Cross-volume:    ${crossVol}`)
  console.log(`Misses:          ${miss}`)

  // Section breakdown
  const sections: Record<string, { total: number; direct: number }> = {}
  for (const r of results) {
    // Section by index ranges (8,7,6,7,7,7,8)
    let section = 'S?'
    if (r.idx <= 8) section = 'S1 Combinatorics'
    else if (r.idx <= 15) section = 'S2 Axioms'
    else if (r.idx <= 21) section = 'S3 Classical/Geometric'
    else if (r.idx <= 28) section = 'S4 Conditional'
    else if (r.idx <= 35) section = 'S5 Bayes'
    else if (r.idx <= 42) section = 'S6 Independence'
    else section = 'S7 Worked'
    if (!sections[section]) sections[section] = { total: 0, direct: 0 }
    sections[section].total++
    if (r.category === 'direct') sections[section].direct++
  }
  console.log('\n--- Section direct-hit rates ---')
  for (const [s, v] of Object.entries(sections)) {
    console.log(`${s}: ${v.direct}/${v.total} (${((v.direct / v.total) * 100).toFixed(0)}%)`)
  }

  // List cross-volume / miss details
  const nonDirect = results.filter((r) => r.category !== 'direct' && r.category !== 'cross_part')
  if (nonDirect.length) {
    console.log('\n--- Cross-volume / Miss details ---')
    for (const r of nonDirect) {
      console.log(`q${r.idx} ${r.topic} -> ${r.got ?? 'NULL'} [${r.confidence.toFixed(3)}]`)
    }
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
