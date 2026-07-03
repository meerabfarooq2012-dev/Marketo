/**
 * ============================================================
 *  TOKENIZER — Self-Built (no model, no API)
 * ============================================================
 *
 *  Splits a message into meaningful tokens for the matching engine.
 *  Pipeline:
 *    1. Normalize via the Roman-Urdu normalizer (handles spelling
 *       variants, Urdu-script transliteration, abbreviations).
 *    2. Lowercase + split on non-alphanumeric boundaries.
 *    3. Drop stopwords (English + Roman Urdu) and very short tokens.
 *
 *  Stopwords are the high-frequency function words that carry almost
 *  no semantic signal — removing them lets rare content words
 *  ("photosynthesis", "photosynthesis", "quaid-e-azam") dominate
 *  the TF-IDF score.
 * ============================================================
 */

import { normalizeMessage } from './roman-urdu'

// English + Roman-Urdu stopwords. Merged so a single lookup table
// handles both languages. Roman-Urdu stopwords are the canonical
// forms produced by the normalizer (hai, kya, ka, etc.).
export const STOPWORDS = new Set<string>([
  // English
  'the','a','an','and','or','but','is','are','was','were','be','been',
  'being','have','has','had','do','does','did','will','would','could',
  'should','may','might','must','can','to','of','in','on','at','by',
  'for','with','about','against','between','into','through','during',
  'before','after','above','below','from','up','down','out','off',
  'over','under','again','further','then','once','here','there','when',
  'where','why','how','all','any','both','each','few','more','most',
  'other','some','such','no','nor','not','only','own','same','so',
  'than','too','very','just','now','what','which','who','whom',
  'this','that','these','those','am','if','because','as','until',
  'while','tell','me','more','explain','describe','please','okay',
  // Roman Urdu (canonical forms from normalizer)
  'hai','hain','tha','thi','the','ho','hoon','kar','kya','kaise',
  'kahan','kab','kyun','ka','ke','ki','ne','ko','se','main','mein',
  'par','aur','ya','bhi','nahi','na','haan','lekin','is','us','ek',
  'woh','yeh','ab','phir','yahan','wahan','mera','tera','tum','aap',
  'hum','karo','kare','karen','jaye','aao','aaye','dena','lena',
  'diya','liya','bolo','dekho','suno','acha','theek','bhot','bohot',
  'thoda','zara','konsa','kitna','itna','jaisa','waisa','salaam',
  'shukria','khatam','shuru',
])

export interface Token {
  /** The normalized token text */
  text: string
  /** Whether this token is a content word (not a stopword) */
  isContent: boolean
}

/**
 * Tokenize a message into normalized tokens (including stopwords,
 * marked). Most callers want only content tokens — use
 * `tokenizeContent()` for that.
 */
export function tokenize(message: string): Token[] {
  if (!message) return []
  const normalized = normalizeMessage(message)
  const raw = normalized
    .toLowerCase()
    .split(/[^a-z0-9]+/) // split on anything not alphanumeric
    .filter(Boolean)

  const out: Token[] = []
  for (const w of raw) {
    if (w.length < 2) continue
    const isContent = !STOPWORDS.has(w)
    if (isContent || w.length >= 3) {
      out.push({ text: w, isContent })
    }
  }
  return out
}

/**
 * Tokenize and return ONLY content tokens (stopwords removed).
 * This is what the TF-IDF matcher uses.
 */
export function tokenizeContent(message: string): string[] {
  return tokenize(message)
    .filter((t) => t.isContent)
    .map((t) => t.text)
}

/**
 * Tokenize and return ALL tokens (content + stopwords), useful for
 * exact-phrase / substring matching.
 */
export function tokenizeAll(message: string): string[] {
  return tokenize(message).map((t) => t.text)
}
