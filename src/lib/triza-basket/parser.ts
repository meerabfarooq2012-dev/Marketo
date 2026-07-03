/**
 * ============================================================
 *  BASKET PARSER — turns raw dropped text into structured items
 * ============================================================
 *
 *  The basket (tokri) collects raw knowledge from MANY sources.
 *  This module figures out the FORMAT of each raw chunk and splits
 *  it into clean { question, answer, topic, intent, keywords }
 *  records that the matcher can index.
 *
 *  Supported formats (auto-detected):
 *
 *    1. Q&A pairs — lines like:
 *         Q: What is photosynthesis?
 *         A: It is the process by which plants make food...
 *       OR:
 *         What is photosynthesis? | It is the process...
 *       OR:
 *         Question: ... Answer: ...
 *
 *    2. Definition blocks — a term followed by a colon/newline:
 *         Photosynthesis: the process by which plants make food.
 *         Gravity: a force that attracts objects toward each other.
 *
 *    3. JSON array — each element { question, answer, topic?, keywords? }
 *
 *    4. CSV — columns: question,answer[,topic,keywords]
 *
 *    5. Free paragraphs — each non-empty paragraph becomes ONE item
 *       whose "question" is the first sentence and "answer" is the
 *       full paragraph. Topic auto-tagged as "general".
 *
 *  Everything is heuristic + hand-written. No model.
 * ============================================================
 */

export interface ParsedItem {
  question: string
  answer: string
  topic: string
  intent: string
  keywords: string
}

export interface ParseResult {
  items: ParsedItem[]
  format: string
  errors: string[]
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

/** Extract comma-separated keywords from an answer's most frequent content words. */
function autoKeywords(text: string): string {
  // Lightweight: take words longer than 4 chars, dedup, top 6
  const words = text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 4)
  const seen = new Set<string>()
  const out: string[] = []
  for (const w of words) {
    if (!seen.has(w) && out.length < 6) {
      seen.add(w)
      out.push(w)
    }
  }
  return out.join(', ')
}

/** Auto-detect intent from the question text. */
function autoIntent(question: string): string {
  const q = question.toLowerCase()
  if (/^(how to|how do i|how can i|kaise|kaise banaye|kaise kare)/.test(q)) return 'how_to'
  if (/^(hi|hello|hey|salam|salaam)/.test(q)) return 'greeting'
  if (/\b(what is|what are|define|kya hai|kya hain|kya hota hai|tell me about)\b/.test(q))
    return 'factual_question'
  return 'factual_question'
}

/** Detect a likely topic from the text using simple keyword hints. */
function autoTopic(text: string): string {
  const t = text.toLowerCase()
  const rules: Array<[string, RegExp]> = [
    ['science', /\b(physics|chemistry|biology|atom|molecule|cell|energy|force|photosynthesis|gravity|element|reaction)\b/],
    ['math', /\b(algebra|geometry|calculus|equation|theorem|number|fraction|integral|matrix|probability)\b/],
    ['technology', /\b(computer|software|program|code|algorithm|database|network|internet|ai|machine learning|api)\b/],
    ['history', /\b(history|war|empire|ancient|century|revolution|civilization|king|battle|independence)\b/],
    ['geography', /\b(country|city|mountain|river|ocean|continent|climate|capital|map|location)\b/],
    ['health', /\b(health|disease|medicine|diet|exercise|body|symptom|treatment|nutrition|vitamin)\b/],
    ['business', /\b(business|market|finance|money|economy|investment|profit|trade|company|sales)\b/],
    ['daily-life', /\b(cooking|food|home|family|travel|shopping|cleaning|recipe|kitchen|house)\b/],
    ['urdu', /[\u0600-\u06FF]/],
  ]
  for (const [topic, re] of rules) {
    if (re.test(t)) return topic
  }
  return 'general'
}

// ─────────────────────────────────────────────
// Format detectors / parsers
// ─────────────────────────────────────────────

/** Try JSON array parse. Returns null if not JSON. */
function tryParseJson(raw: string): ParseResult | null {
  const trimmed = raw.trim()
  if (!trimmed.startsWith('[') && !trimmed.startsWith('{')) return null
  try {
    const data = JSON.parse(trimmed)
    const arr = Array.isArray(data) ? data : [data]
    const items: ParsedItem[] = []
    const errors: string[] = []
    for (const obj of arr) {
      if (typeof obj !== 'object' || obj === null) continue
      const q = obj.question || obj.q || obj.trigger
      const a = obj.answer || obj.a || obj.response
      if (!q || !a) {
        errors.push('Skipped a JSON entry missing question/answer.')
        continue
      }
      items.push({
        question: String(q),
        answer: String(a),
        topic: obj.topic ? String(obj.topic) : autoTopic(`${q} ${a}`),
        intent: obj.intent ? String(obj.intent) : autoIntent(String(q)),
        keywords: obj.keywords ? String(obj.keywords) : autoKeywords(`${q} ${a}`),
      })
    }
    return { items, format: 'json', errors }
  } catch {
    return null
  }
}

/** Try CSV parse (question,answer[,topic,keywords]). */
function tryParseCsv(raw: string): ParseResult | null {
  const lines = raw.split(/\r?\n/).filter((l) => l.trim())
  if (lines.length < 2) return null
  // First line must look like a header
  const header = lines[0].toLowerCase()
  if (!header.includes('question') || !header.includes('answer')) return null
  const items: ParsedItem[] = []
  const errors: string[] = []
  for (let i = 1; i < lines.length; i++) {
    // Simple CSV split (no quoted-comma handling for v1)
    const cols = lines[i].split(',').map((c) => c.trim())
    if (cols.length < 2) {
      errors.push(`Row ${i + 1}: skipped (need at least question,answer).`)
      continue
    }
    const [q, a, topic, keywords] = cols
    if (!q || !a) continue
    items.push({
      question: q,
      answer: a,
      topic: topic || autoTopic(`${q} ${a}`),
      intent: autoIntent(q),
      keywords: keywords || autoKeywords(`${q} ${a}`),
    })
  }
  if (items.length === 0) return null
  return { items, format: 'csv', errors }
}

/** Parse Q:A pairs in flexible formats (Q:/A:, Question:/Answer:, pipe, tab). */
function parseQaPairs(raw: string): ParseResult {
  const lines = raw.split(/\r?\n/).map((l) => l.trim())
  const items: ParsedItem[] = []
  const errors: string[] = []

  // Pair up Q:/A: lines
  const qaRegex =
    /^(?:q|question|sawaal|q\??)\s*[:.\-)]\s*(.+)$/i
  const ansRegex =
    /^(?:a|answer|jawab|ans|a\??)\s*[:.\-)]\s*(.+)$/i

  let i = 0
  let currentQ = ''
  let currentA = ''
  let matchedAny = false

  function flush() {
    if (currentQ && currentA) {
      items.push({
        question: currentQ.trim(),
        answer: currentA.trim(),
        topic: autoTopic(`${currentQ} ${currentA}`),
        intent: autoIntent(currentQ),
        keywords: autoKeywords(`${currentQ} ${currentA}`),
      })
      matchedAny = true
    }
    currentQ = ''
    currentA = ''
  }

  while (i < lines.length) {
    const line = lines[i]
    const qm = line.match(qaRegex)
    const am = line.match(ansRegex)
    if (qm) {
      flush()
      currentQ = qm[1]
    } else if (am) {
      currentA = am[1]
    } else if (currentA && line) {
      // continuation of the answer
      currentA += '\n' + line
    } else if (currentQ && !currentA && line) {
      // continuation of the question
      currentQ += ' ' + line
    }
    i += 1
  }
  flush()

  if (matchedAny) {
    return { items, format: 'qa', errors }
  }

  // Try pipe-separated single-line pairs: "question | answer"
  const pipePairs = raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.includes('|') && l.split('|').length >= 2)

  if (pipePairs.length > 0) {
    for (const line of pipePairs) {
      const parts = line.split('|')
      const q = parts[0]?.trim()
      const a = parts.slice(1).join('|').trim()
      if (q && a) {
        items.push({
          question: q,
          answer: a,
          topic: autoTopic(`${q} ${a}`),
          intent: autoIntent(q),
          keywords: autoKeywords(`${q} ${a}`),
        })
      }
    }
    if (items.length > 0) return { items, format: 'qa-pipe', errors }
  }

  // No QA format detected — fall through to paragraph parsing
  return { items: [], format: 'none', errors }
}

/** Parse definition blocks: "Term: definition..." */
function parseDefinitions(raw: string): ParseResult {
  const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
  const items: ParsedItem[] = []
  let defsFound = 0
  for (const line of lines) {
    const m = line.match(/^([A-Za-z][A-Za-z0-9 \-]{2,40}):\s+(.{20,})$/)
    if (m) {
      defsFound += 1
      const term = m[1].trim()
      const def = m[2].trim()
      items.push({
        question: `what is ${term}|define ${term}|${term} kya hai|${term} meaning`,
        answer: `${term}: ${def}`,
        topic: autoTopic(`${term} ${def}`),
        intent: 'factual_question',
        keywords: autoKeywords(`${term} ${def}`),
      })
    }
  }
  if (defsFound >= 2) {
    return { items, format: 'definition', errors: [] }
  }
  return { items: [], format: 'none', errors: [] }
}

/** Parse free paragraphs — each paragraph becomes one item. */
function parseParagraphs(raw: string): ParseResult {
  const paras = raw
    .split(/\n\s*\n/) // blank-line separated paragraphs
    .map((p) => p.trim())
    .filter((p) => p.length > 30)

  const items: ParsedItem[] = []
  for (const para of paras) {
    // First sentence = question trigger, full paragraph = answer
    const firstSentenceMatch = para.match(/^(.+?[.!?])\s/)
    const firstSentence = firstSentenceMatch ? firstSentenceMatch[1] : para.slice(0, 80)
    items.push({
      question: firstSentence.slice(0, 120),
      answer: para,
      topic: autoTopic(para),
      intent: autoIntent(firstSentence),
      keywords: autoKeywords(para),
    })
  }
  return { items, format: 'paragraph', errors: [] }
}

// ─────────────────────────────────────────────
// Master entry point — tries every parser in priority order
// ─────────────────────────────────────────────

/**
 * Parse a raw basket chunk into structured knowledge items.
 * Tries JSON → CSV → Q&A pairs → definitions → paragraphs.
 * Returns the first format that yields ≥1 item.
 */
export function parseBasketContent(raw: string): ParseResult {
  if (!raw || !raw.trim()) {
    return { items: [], format: 'empty', errors: ['Empty content.'] }
  }

  // 1. JSON
  const json = tryParseJson(raw)
  if (json && json.items.length > 0) return json

  // 2. CSV
  const csv = tryParseCsv(raw)
  if (csv && csv.items.length > 0) return csv

  // 3. Q&A pairs
  const qa = parseQaPairs(raw)
  if (qa.items.length > 0) return qa

  // 4. Definitions
  const defs = parseDefinitions(raw)
  if (defs.items.length > 0) return defs

  // 5. Paragraphs (fallback)
  const paras = parseParagraphs(raw)
  if (paras.items.length > 0) return paras

  return {
    items: [],
    format: 'unknown',
    errors: ['Could not detect any known format. Try Q&A pairs, definitions, JSON, CSV, or paragraphs.'],
  }
}
