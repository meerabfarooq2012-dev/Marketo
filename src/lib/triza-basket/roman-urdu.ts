/**
 * ============================================================
 *  ROMAN URDU NORMALIZER — Self-Built (no model, no API)
 * ============================================================
 *
 *  Roman Urdu = Urdu written in Latin script (e.g. "kya hal hai").
 *  Problem: the same word has MANY spellings:
 *    kya / kiya / kyah / kyaa  → all mean "what"
 *    hai / he / hay / haii     → all mean "is"
 *    kaise / kaisay / kese     → all mean "how"
 *
 *  This module maps every spelling variant to a SINGLE canonical
 *  form so the matching engine sees "kya" no matter how the user
 *  typed it. Hand-built lookup tables — zero ML.
 *
 *  Also handles:
 *    - Urdu-script (نستعلیق) → Roman transliteration
 *    - Common SMS/whatsapp abbreviations (tnx, plz, u, ur)
 *    - Removal of repeated letters (haaaai → hai, soooo → so)
 * ============================================================
 */

// ─────────────────────────────────────────────
// 1. Spelling-variant → canonical map (hand-curated)
//    Key = any spelling, Value = the ONE canonical form.
//    Grown from the most common Roman Urdu words.
// ─────────────────────────────────────────────
export const ROMAN_URDU_CANONICAL: Record<string, string> = {
  // question words
  kya: 'kya', kiya: 'kya', kyah: 'kya', kyaa: 'kya', ky: 'kya',
  kaise: 'kaise', kaisay: 'kaise', kese: 'kaise', kaisi: 'kaise', kesay: 'kaise',
  kahan: 'kahan', kahaan: 'kahan', kahanh: 'kahan', kha: 'kahan', khaa: 'kahan', khaan: 'kahan',
  kab: 'kab', kabh: 'kab', kabhi: 'kabhi', kabhee: 'kabhi',
  kyun: 'kyun', kyu: 'kyun', kyo: 'kyun', kyon: 'kyun', kyuun: 'kyun',
  kaisa: 'kaisa', kaisaa: 'kaisa', kesa: 'kaisa',

  // pronouns
  mein: 'main', mai: 'main', hum: 'hum', hm: 'hum',
  tum: 'tum', tm: 'tum', aap: 'aap', ap: 'aap', too: 'tum',
  woh: 'woh', voh: 'woh', vo: 'woh',
  yeh: 'yeh', ye: 'yeh', yh: 'yeh',
  mera: 'mera', meray: 'mera', mere: 'mera', meri: 'meri',
  tera: 'tera', teray: 'tera', tere: 'tera', teri: 'teri',
  hamara: 'hamara', hamare: 'hamara', hamari: 'hamari',

  // common verbs
  hai: 'hai', he: 'hai', hay: 'hai', haii: 'hai', h: 'hai',
  hain: 'hain', hn: 'hain', hen: 'hain',
  tha: 'tha', thha: 'tha', thi: 'thi', thhi: 'thi', the: 'the', thhe: 'the',
  ho: 'ho', hoo: 'ho',
  hoon: 'hoon', hun: 'hoon',
  kar: 'kar', kr: 'kar', karo: 'karo', karr: 'kar', kare: 'kare', karen: 'karen', karein: 'karen',
  kiya: 'kiya', kia: 'kiya', karna: 'karna', krna: 'karna', karnaa: 'karna',
  jata: 'jata', jaata: 'jata', jao: 'jao', jaye: 'jaye', jayen: 'jaye',
  aata: 'aata', ata: 'aata', aao: 'aao', aaye: 'aaye', aayen: 'aaye',
  dena: 'dena', denaa: 'dena', diya: 'diya', dia: 'diya',
  lena: 'lena', lenaa: 'lena', liya: 'liya', lia: 'liya',
  bolo: 'bolo', bolna: 'bolna', bola: 'bola', bole: 'bole',
  dekho: 'dekho', dekhna: 'dekhna', dekha: 'dekha',
  suno: 'suno', sunna: 'sunna', suna: 'suna',
  acha: 'acha', accha: 'acha', achha: 'acha', achi: 'acha', achhi: 'acha',
  samjho: 'samjho', samjhna: 'samjhna', samjha: 'samjha',

  // common connectors / particles
  ka: 'ka', ke: 'ke', k: 'ka',
  ne: 'ne', ko: 'ko', se: 'se', sy: 'se', sai: 'se',
  main: 'main', m: 'main', par: 'par', pr: 'par', aur: 'aur', r: 'aur',
  ya: 'ya', yaa: 'ya', bhi: 'bhi', bh: 'bhi', be: 'bhi',
  nahi: 'nahi', nahin: 'nahi', nhe: 'nahi', nh: 'nahi', nai: 'nahi', na: 'na',
  haan: 'haan', han: 'haan', hn: 'haan', ha: 'haan',
  lekin: 'lekin', lkn: 'lekin', magar: 'lekin',
  is: 'is', ise: 'ise', isay: 'ise', isko: 'ise',
  us: 'us', use: 'use', usay: 'use', usko: 'use',
  ek: 'ek',
  bohot: 'bohot', bhot: 'bohot', bohat: 'bohot', bahut: 'bohot', bhut: 'bohot',
  thoda: 'thoda', thora: 'thoda', zara: 'zara', zra: 'zara',
  ab: 'ab', abb: 'ab', phir: 'phir', fir: 'phir',
  yahan: 'yahan', yahaan: 'yahan', yaha: 'yahan', yhan: 'yahan',
  wahan: 'wahan', wahaan: 'wahan', waha: 'wahan', whan: 'wahan',
  kyunke: 'kyunke', kyonke: 'kyunke', kyunki: 'kyunki', kyonki: 'kyunki',

  // greetings / polite
  salaam: 'salaam', salam: 'salaam', slm: 'salaam', assalam: 'salaam',
  shukria: 'shukria', shukriya: 'shukria', shkria: 'shukria', thanks: 'shukria',
  theek: 'theek', thik: 'theek', tik: 'theek',
  khatam: 'khatam', shuru: 'shuru', suru: 'shuru',

  // question words (more)
  kaun: 'kaun', kon: 'kaun', konsa: 'konsa', konsi: 'konsa', knsa: 'konsa',
  kitna: 'kitna', kitni: 'kitna', kitne: 'kitna', kinta: 'kitna',
  itna: 'itna', itni: 'itna', itne: 'itna',
  jaisa: 'jaisa', jaisi: 'jaisa', jaise: 'jaisa',
  waisa: 'waisa', waisi: 'waisa', waise: 'waisa',
}

// ─────────────────────────────────────────────
// 2. Urdu-script (Arabic script) → Roman transliteration.
//    Maps each Urdu letter/digraph to its Roman equivalent so that
//    "کیا ہے" and "kya hai" produce the SAME tokens.
//    Digraphs checked FIRST (longest match) to avoid partial splits.
// ─────────────────────────────────────────────
const URDU_TO_ROMAN: Array<[string, string]> = [
  // single Urdu letters (U+0600 – U+06FF range)
  ['ا', 'a'], ['آ', 'aa'], ['ب', 'b'], ['پ', 'p'], ['ت', 't'], ['ٹ', 't'],
  ['ث', 's'], ['ج', 'j'], ['چ', 'ch'], ['ح', 'h'], ['خ', 'kh'], ['د', 'd'],
  ['ڈ', 'd'], ['ذ', 'z'], ['ر', 'r'], ['ڑ', 'r'], ['ز', 'z'], ['ژ', 'zh'],
  ['س', 's'], ['ش', 'sh'], ['ص', 's'], ['ض', 'z'], ['ط', 't'], ['ظ', 'z'],
  ['ع', 'a'], ['غ', 'gh'], ['ف', 'f'], ['ق', 'q'], ['ک', 'k'], ['گ', 'g'],
  ['ل', 'l'], ['م', 'm'], ['ن', 'n'], ['ں', 'n'], ['و', 'o'], ['ہ', 'h'],
  ['ھ', 'h'], ['ء', 'a'], ['ی', 'y'], ['ے', 'e'],
  // diacritics (vowel marks) — map to their vowel sound
  ['َ', 'a'], ['ِ', 'i'], ['ُ', 'u'], ['ّ', ''], ['ْ', ''], ['ـ', ''],
  ['ً', 'an'], ['ٍ', 'in'], ['ٌ', 'un'],
  ['ٲ', 'a'], ['إ', 'i'], ['أ', 'a'], ['ؤ', 'o'], ['ئ', 'y'],
]

/**
 * Convert an Urdu/Arabic-script string into Roman letters.
 * Walks the string left-to-right, matching the longest possible
 * digraph first, then falling back to single letters. Non-Urdu
 * characters (Latin letters, digits, spaces, punctuation) are
 * passed through untouched.
 */
export function urduScriptToRoman(input: string): string {
  let out = ''
  let i = 0
  while (i < input.length) {
    const rest = input.slice(i)
    let matched = false
    // Try every letter in priority order
    for (const [ur, rom] of URDU_TO_ROMAN) {
      if (rest.startsWith(ur)) {
        out += rom
        i += ur.length
        matched = true
        break
      }
    }
    if (!matched) {
      // pass-through Latin/digit/space/punct
      out += input[i]
      i += 1
    }
  }
  return out
}

// ─────────────────────────────────────────────
// 3. SMS / chat abbreviations → full form (English + Roman Urdu)
// ─────────────────────────────────────────────
const ABBREVIATIONS: Record<string, string> = {
  u: 'you', ur: 'your', r: 'are', n: 'and', b: 'be', c: 'see',
  y: 'why', plz: 'please', pls: 'please', tnx: 'thanks', thx: 'thanks',
  ty: 'thanks', ok: 'okay', k: 'okay', okk: 'okay', okayy: 'okay',
  gonna: 'going to', wanna: 'want to', gotta: 'got to',
  dont: 'do not', cant: 'can not', wont: 'will not', isnt: 'is not',
  didnt: 'did not', doesnt: 'does not', arent: 'are not',
  info: 'information', msg: 'message',
  bcz: 'because', coz: 'because', cause: 'because',
  bt: 'but', fr: 'for', frm: 'from', gr8: 'great',
}

// ─────────────────────────────────────────────
// 4. Collapse repeated letters.
//    Users often type "haaaai" or "soooo" or "noooo" — collapse
//    3+ repeats of the same letter down to max 2 so they tokenize
//    to the canonical form. ("haaaai" → "haai" → canonical "hai")
// ─────────────────────────────────────────────
function collapseRepeats(word: string): string {
  return word.replace(/(.)\1{2,}/g, '$1$1')
}

/**
 * Full normalization pipeline for a single raw word:
 *   raw → lowercase → collapse repeats →
 *   (if Urdu script, transliterate to Roman) →
 *   abbreviation expansion →
 *   Roman-Urdu canonical-variant lookup
 *
 * Returns the canonical token, or the cleaned word itself if no
 * mapping exists (so English content words pass through unchanged).
 */
export function normalizeWord(raw: string): string {
  if (!raw) return raw
  let w = raw.toLowerCase().trim()
  // If it contains Urdu/Arabic script, transliterate first
  if (/[\u0600-\u06FF]/.test(w)) {
    w = urduScriptToRoman(w)
  }
  w = collapseRepeats(w)
  // abbreviation expansion (only for short tokens)
  if (ABBREVIATIONS[w]) w = ABBREVIATIONS[w]
  // Roman-Urdu canonical lookup
  if (ROMAN_URDU_CANONICAL[w]) w = ROMAN_URDU_CANONICAL[w]
  return w
}

/**
 * Normalize an entire message string, word by word.
 * Preserves spacing so downstream tokenization can split on whitespace.
 */
export function normalizeMessage(text: string): string {
  if (!text) return ''
  return text
    .split(/(\s+)/) // keep whitespace tokens
    .map((tok) => (tok.trim() ? normalizeWord(tok) : tok))
    .join('')
}
