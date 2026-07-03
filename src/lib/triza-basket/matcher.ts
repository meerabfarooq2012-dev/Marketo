/**
 * ============================================================
 *  MATCHER — Self-Made TF-IDF + Cosine + Synonym Engine
 * ============================================================
 *
 *  This is the BRAIN of the Knowledge-Basket TRIZA. It answers
 *  chats using ONLY the rows in the `TrizaKnowledgeItem` table —
 *  no external model, no API key, no pretrained embeddings.
 *
 *  Scoring pipeline (all hand-written, pure CPU):
 *
 *    user message
 *      → normalize (Roman Urdu + English)
 *      → tokenize (drop stopwords)
 *      → expand with synonym map
 *      → compute query TF-IDF vector
 *      → for EACH knowledge item:
 *          • cosine similarity (TF-IDF)   — semantic rarity
 *          • keyword overlap (Jaccard)    — direct term hit
 *          • exact-phrase bonus           — strong signal
 *          • feedback weight              — 👍/👎 Hebbian learning
 *          → fusedScore = 0.55·cos + 0.30·overlap + 0.15·phrase
 *      → pick best, apply confidence threshold
 *      → if below threshold → "I don't know" (honest, no guessing)
 *
 *  The TF-IDF index is rebuilt lazily and cached in-memory; it is
 *  invalidated whenever the knowledge store changes (add/delete/
 *  process-basket). For a few hundred items this is sub-millisecond.
 * ============================================================
 */

import { db } from '@/lib/db'
import { tokenizeContent, tokenizeAll } from './tokenizer'
import { normalizeMessage } from './roman-urdu'

// ─────────────────────────────────────────────
// Hand-built synonym / cross-language map.
// Maps a token to a SET of equivalent tokens so a query containing
// "make" also lights up items containing "create"/"build", and a
// Roman-Urdu "kaise" maps to English "how". This is the
// "semantic understanding without a model" layer.
// ─────────────────────────────────────────────
const SYNONYM_MAP: Record<string, string[]> = {
  // English synonyms
  make: ['create', 'build', 'construct', 'produce'],
  create: ['make', 'build', 'generate'],
  build: ['make', 'create', 'construct'],
  big: ['large', 'huge', 'massive', 'enormous'],
  small: ['tiny', 'little', 'miniature', 'compact'],
  fast: ['quick', 'rapid', 'speedy', 'swift'],
  slow: ['sluggish', 'gradual', 'unhurried'],
  good: ['great', 'excellent', 'fine', 'nice', 'quality'],
  bad: ['poor', 'terrible', 'awful', 'wrong'],
  start: ['begin', 'commence', 'initiate', 'launch'],
  end: ['finish', 'complete', 'conclude', 'stop'],
  help: ['assist', 'aid', 'support', 'guide'],
  learn: ['study', 'understand', 'grasp', 'learn'],
  teach: ['explain', 'instruct', 'educate', 'show'],
  problem: ['issue', 'trouble', 'difficulty', 'error'],
  solution: ['answer', 'fix', 'resolution', 'remedy'],
  important: ['crucial', 'essential', 'key', 'vital', 'significant'],
  easy: ['simple', 'straightforward', 'effortless'],
  hard: ['difficult', 'tough', 'challenging', 'complex'],
  use: ['utilize', 'employ', 'apply'],
  cause: ['reason', 'source', 'origin', 'trigger'],
  effect: ['result', 'outcome', 'consequence', 'impact'],
  definition: ['meaning', 'definition', 'explanation', 'define'],
  example: ['instance', 'sample', 'illustration', 'case'],
  difference: ['distinction', 'contrast', 'differ'],

  // Roman Urdu → English cross-map (canonical roman forms → english)
  kya: ['what'],
  kaise: ['how', 'way', 'method'],
  kahan: ['where', 'place', 'location'],
  kab: ['when', 'time'],
  kyun: ['why', 'reason', 'cause'],
  kaun: ['who', 'person', 'name'],
  konsa: ['which', 'what'],
  kitna: ['how much', 'how many', 'amount', 'quantity'],
  karna: ['do', 'make', 'perform', 'action'],
  karo: ['do', 'make', 'perform'],
  samjho: ['understand', 'explain', 'learn'],
  batado: ['tell', 'inform', 'say'],
  dikhao: ['show', 'display', 'see'],
  batao: ['tell', 'inform', 'say'],
}

/**
 * Expand a list of content tokens with their synonyms.
 * Returns the union (originals + synonyms), deduplicated.
 */
function expandSynonyms(tokens: string[]): string[] {
  const out = new Set<string>(tokens)
  for (const t of tokens) {
    const syns = SYNONYM_MAP[t]
    if (syns) for (const s of syns) out.add(s)
  }
  return Array.from(out)
}

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
export interface KnowledgeItemRow {
  id: string
  question: string
  answer: string
  topic: string
  intent: string
  keywords: string
  uses: number
  upCount: number
  downCount: number
}

export interface MatchResult {
  /** Best matching item id, or null if nothing met the threshold */
  itemId: string | null
  /** The answer text to speak (or null) */
  answer: string | null
  /** 0–1 confidence */
  confidence: number
  /** Topic of the matched item */
  topic: string | null
  /** Intent of the matched item */
  intent: string | null
  /** Human-readable reasoning steps (for transparency) */
  steps: string[]
  /** Top-5 candidate items with their scores (for debugging) */
  candidates: Array<{ itemId: string; question: string; score: number }>
  /** Total items searched */
  totalItems: number
  /** Processing time in ms */
  processingTimeMs: number
}

// ─────────────────────────────────────────────
// In-memory TF-IDF index (rebuilt lazily, invalidated on change)
// ─────────────────────────────────────────────
interface IndexedItem {
  row: KnowledgeItemRow
  /** Content tokens (question + keywords + topic), expanded with synonyms */
  tokens: string[]
  /** Term-frequency map: token → count */
  tf: Map<string, number>
  /** TF-IDF weight vector: token → weight */
  vector: Map<string, number>
  /** L2 norm of the vector (for cosine) */
  norm: number
  /** Set of exact phrases (multi-word question fragments) for phrase bonus */
  phrases: string[]
  /** Feedback weight (Hebbian): starts at 1, +0.05 per 👍, -0.10 per 👎, clamped [0.2, 2] */
  feedbackWeight: number
}

let indexCache: IndexedItem[] | null = null
let indexN = 0 // total items in current index
let indexDocFreq: Map<string, number> = new Map()
let indexVocabSize = 0
let indexVersion = 0 // bump to invalidate

/** Mark the index stale so the next query rebuilds it. Call after any
 *  mutation to TrizaKnowledgeItem (add/delete/process/feedback). */
export function invalidateIndex(): void {
  indexCache = null
  indexVersion += 1
}

/** Build (or rebuild) the in-memory TF-IDF index from the DB. */
async function ensureIndex(): Promise<IndexedItem[]> {
  if (indexCache) return indexCache

  const rows = await db.trizaKnowledgeItem.findMany({
    orderBy: { createdAt: 'asc' },
  })
  const items: IndexedItem[] = []
  const docFreq = new Map<string, number>()

  for (const r of rows) {
    const row: KnowledgeItemRow = {
      id: r.id,
      question: r.question,
      answer: r.answer,
      topic: r.topic,
      intent: r.intent,
      keywords: r.keywords,
      uses: r.uses,
      upCount: r.upCount,
      downCount: r.downCount,
    }
    // Build the "document" for this item: question tokens + keyword tokens + topic tokens
    const docText = `${r.question} ${r.keywords} ${r.topic}`
    let tokens = tokenizeContent(docText)
    tokens = expandSynonyms(tokens)

    // TF
    const tf = new Map<string, number>()
    for (const t of tokens) tf.set(t, (tf.get(t) || 0) + 1)

    // contribute to doc-frequency (unique tokens only)
    for (const t of new Set(tokens)) {
      docFreq.set(t, (docFreq.get(t) || 0) + 1)
    }

    // Phrases for exact-phrase bonus: take the question, normalize,
    // and extract 2-3 word sliding windows.
    const normalizedQ = normalizeMessage(r.question).toLowerCase()
    const qWords = normalizedQ.split(/[^a-z0-9]+/).filter((w) => w.length > 1)
    const phrases: string[] = []
    for (let i = 0; i < qWords.length - 1; i++) {
      phrases.push(`${qWords[i]} ${qWords[i + 1]}`)
      if (i < qWords.length - 2) {
        phrases.push(`${qWords[i]} ${qWords[i + 1]} ${qWords[i + 2]}`)
      }
    }

    // Hebbian feedback weight
    const fb = 1 + r.upCount * 0.05 - r.downCount * 0.10
    const feedbackWeight = Math.max(0.2, Math.min(2, fb))

    items.push({
      row,
      tokens,
      tf,
      vector: new Map(), // filled in second pass
      norm: 0,
      phrases,
      feedbackWeight,
    })
  }

  // IDF
  const N = items.length || 1
  function idf(token: string): number {
    const df = docFreq.get(token) || 0
    if (df === 0) return 0
    return Math.log((N + 1) / (df + 1)) + 1
  }

  // Second pass: build TF-IDF vectors + norms
  for (const it of items) {
    const total = it.tokens.length || 1
    const vec = new Map<string, number>()
    let normSq = 0
    for (const [tok, count] of it.tf) {
      const w = (count / total) * idf(tok)
      vec.set(tok, w)
      normSq += w * w
    }
    it.vector = vec
    it.norm = Math.sqrt(normSq)
  }

  indexCache = items
  indexN = N
  indexDocFreq = docFreq
  indexVocabSize = docFreq.size
  return items
}

// ─────────────────────────────────────────────
// Scoring functions
// ─────────────────────────────────────────────

/** Cosine similarity between query TF-IDF vector and an item vector. */
function cosineScore(
  queryVec: Map<string, number>,
  queryNorm: number,
  item: IndexedItem
): number {
  if (queryNorm === 0 || item.norm === 0) return 0
  let dot = 0
  // iterate over the smaller vector
  const [small, large] =
    queryVec.size < item.vector.size ? [queryVec, item.vector] : [item.vector, queryVec]
  for (const [tok, w] of small) {
    const other = large.get(tok)
    if (other) dot += w * other
  }
  return dot / (queryNorm * item.norm)
}

/** Jaccard-like keyword overlap: |query∩item| / |query∪item|. */
function overlapScore(queryTokens: string[], item: IndexedItem): number {
  const qSet = new Set(queryTokens)
  const iSet = new Set(item.tokens)
  if (qSet.size === 0 || iSet.size === 0) return 0
  let inter = 0
  for (const t of qSet) if (iSet.has(t)) inter += 1
  const union = qSet.size + iSet.size - inter
  return inter / union
}

/** Exact-phrase bonus: fraction of item phrases found in the query. */
function phraseScore(normalizedQuery: string, item: IndexedItem): number {
  if (item.phrases.length === 0) return 0
  let hits = 0
  for (const p of item.phrases) {
    if (p.length > 3 && normalizedQuery.includes(p)) hits += 1
  }
  return Math.min(1, hits / Math.max(1, item.phrases.length))
}

// ─────────────────────────────────────────────
// Greeting / smalltalk handlers (no knowledge item needed)
// ─────────────────────────────────────────────
const GREETING_PATTERNS = [
  /^(hi|hello|hey|salam|salaam|assalam|aoa|assalam o alaikum)\b/i,
  /\b(hi|hello|hey|salam|salaam)\s+(triza|ai|bot)\b/i,
]
const THANKS_PATTERNS = [
  /^(thanks|thank you|shukria|shukriya|tnx|thx)\b/i,
]
const IDENTITY_PATTERNS = [
  /\b(who are you|what are you|your name|tum kaun ho|aap kaun ho|tumhara naam|aap ka naam)\b/i,
]

function detectSmalltalk(message: string): { intent: string; answer: string } | null {
  const m = message.trim()
  for (const re of GREETING_PATTERNS) {
    if (re.test(m)) {
      return {
        intent: 'greeting',
        answer:
          "Salam! Main TRIZA hoon — apna bana hua AI. Main wahi jaanti hoon jo aap mujhe basket ke zariye sikhate hain. Koi sawaal poochiye!",
      }
    }
  }
  for (const re of THANKS_PATTERNS) {
    if (re.test(m)) {
      return {
        intent: 'smalltalk',
        answer: 'Koi baat nahi! Aur kuch poochna chahein?',
      }
    }
  }
  for (const re of IDENTITY_PATTERNS) {
    if (re.test(m)) {
      return {
        intent: 'identity',
        answer:
          'Main TRIZA hoon — ek self-built AI. Koi model ya API use nahi karti. Aap mujhe apna knowledge basket mein daal kar sikhate hain, aur main wahi seekhi hui baat apne andaaz mein batati hoon.',
      }
    }
  }
  return null
}

// ─────────────────────────────────────────────
// Main answer function
// ─────────────────────────────────────────────

/** Minimum fused score required to answer (below this → honest "I don't know"). */
const CONFIDENCE_THRESHOLD = 0.18

/**
 * Answer a user message using ONLY the knowledge-basket store.
 * No model, no API. Pure hand-written scoring.
 */
export async function answerWithBasket(message: string): Promise<MatchResult> {
  const t0 = Date.now()
  const steps: string[] = []

  // 1. Smalltalk shortcut (greetings / thanks / identity)
  const smalltalk = detectSmalltalk(message)
  if (smalltalk) {
    steps.push(`Detected intent: ${smalltalk.intent} (handled directly)`)
    return {
      itemId: null,
      answer: smalltalk.answer,
      confidence: 1.0,
      topic: 'smalltalk',
      intent: smalltalk.intent,
      steps,
      candidates: [],
      totalItems: 0,
      processingTimeMs: Date.now() - t0,
    }
  }

  // 2. Ensure index is built
  const items = await ensureIndex()
  if (items.length === 0) {
    steps.push('Knowledge store is empty — nothing learned yet.')
    return {
      itemId: null,
      answer:
        'Abhi main kuch nahi jaanti — mera knowledge basket khaali hai. Pehle apna knowledge basket mein daaliye (paste, Q&A, ya file upload kar ke), phir "Process Basket" dabaiye. Us ke baad main seekhungi aur jawab dungi.',
      confidence: 0,
      topic: null,
      intent: null,
      steps,
      candidates: [],
      totalItems: 0,
      processingTimeMs: Date.now() - t0,
    }
  }

  // 3. Tokenize + expand query
  let queryTokens = tokenizeContent(message)
  queryTokens = expandSynonyms(queryTokens)
  const normalizedQuery = normalizeMessage(message).toLowerCase()

  steps.push(`Tokenized query → ${queryTokens.length} content tokens`)
  if (queryTokens.length === 0) {
    steps.push('No content tokens after stopword removal — cannot match.')
    return {
      itemId: null,
      answer:
        'Main samjhi nahi. Thora sa tafseel se sawaal poochiye — taake main apne knowledge store mein dhoond saku.',
      confidence: 0,
      topic: null,
      intent: null,
      steps,
      candidates: [],
      totalItems: items.length,
      processingTimeMs: Date.now() - t0,
    }
  }

  // 4. Build query TF-IDF vector
  const qTf = new Map<string, number>()
  for (const t of queryTokens) qTf.set(t, (qTf.get(t) || 0) + 1)
  const qTotal = queryTokens.length
  const N = items.length || 1
  function qIdf(token: string): number {
    const df = indexDocFreq.get(token) || 0
    if (df === 0) return 0
    return Math.log((N + 1) / (df + 1)) + 1
  }
  const qVec = new Map<string, number>()
  let qNormSq = 0
  for (const [tok, count] of qTf) {
    const w = (count / qTotal) * qIdf(tok)
    qVec.set(tok, w)
    qNormSq += w * w
  }
  const qNorm = Math.sqrt(qNormSq)

  // 5. Score every item
  const scored = items.map((it) => {
    const cos = cosineScore(qVec, qNorm, it)
    const ov = overlapScore(queryTokens, it)
    const ph = phraseScore(normalizedQuery, it)
    const fused = (0.55 * cos + 0.30 * ov + 0.15 * ph) * it.feedbackWeight
    return { item: it, cos, ov, ph, fused }
  })
  scored.sort((a, b) => b.fused - a.fused)

  const best = scored[0]
  const top5 = scored.slice(0, 5).map((s) => ({
    itemId: s.item.row.id,
    question: s.item.row.question.split('|')[0].slice(0, 80),
    score: Number(s.fused.toFixed(4)),
  }))

  steps.push(
    `Scored ${items.length} items — best fused=${best.fused.toFixed(4)} ` +
      `(cos=${best.cos.toFixed(3)}, overlap=${best.ov.toFixed(3)}, phrase=${best.ph.toFixed(3)}, fb=${best.item.feedbackWeight.toFixed(2)})`
  )

  // 6. Threshold check (honest "I don't know")
  if (best.fused < CONFIDENCE_THRESHOLD) {
    steps.push(`Below confidence threshold (${CONFIDENCE_THRESHOLD}) — honest "I don't know".`)
    return {
      itemId: null,
      answer:
        'Mujhe is sawaal ka jawab nahi pata — maine abhi tak yeh nahi seekha. Aap is ka jawab apne knowledge basket mein add kar dein (paste / Q&A / file), "Process Basket" dabaiye, phir main jawab dungi. Seekhna mera kaam hai!',
      confidence: Number(best.fused.toFixed(4)),
      topic: null,
      intent: null,
      steps,
      candidates: top5,
      totalItems: items.length,
      processingTimeMs: Date.now() - t0,
    }
  }

  // 7. Bump usage count (fire-and-forget, non-blocking)
  db.trizaKnowledgeItem
    .update({
      where: { id: best.item.row.id },
      data: { uses: { increment: 1 } },
    })
    .catch(() => {
      /* ignore — usage stats are best-effort */
    })

  // 8. Confidence scaled to a friendlier 0–1 range
  const confidence = Math.min(1, best.fused / 0.6)

  return {
    itemId: best.item.row.id,
    answer: best.item.row.answer,
    confidence: Number(confidence.toFixed(4)),
    topic: best.item.row.topic,
    intent: best.item.row.intent,
    steps,
    candidates: top5,
    totalItems: items.length,
    processingTimeMs: Date.now() - t0,
  }
}

// ─────────────────────────────────────────────
// Stats helper (for the UI dashboard)
// ─────────────────────────────────────────────
export async function getIndexStats(): Promise<{
  totalItems: number
  vocabSize: number
  indexVersion: number
}> {
  await ensureIndex()
  return {
    totalItems: indexN,
    vocabSize: indexVocabSize,
    indexVersion,
  }
}
