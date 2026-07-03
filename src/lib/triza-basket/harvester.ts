/**
 * ============================================================
 *  KNOWLEDGE HARVESTER — Internet se knowledge collect karne wala agent
 * ============================================================
 *
 *  Yeh TRIZA ka "Knowledge Harvester Agent" hai. User koi topic
 *  deta hai (e.g. "photosynthesis", "Pakistan history", "how to
 *  cook biryani"), aur yeh agent:
 *
 *    1. Internet par woh topic search karta hai (jaise Google/ChatGPT)
 *    2. Top N results ke pages read karta hai
 *    3. Har page se clean text extract karta hai (HTML tags hata kar)
 *    4. Useful paragraphs filter karta hai (navigation/ads hata kar)
 *    5. Un paragraphs ko Q&A items mein convert karta hai
 *       (existing parser use karke — first sentence = trigger,
 *        full paragraph = answer)
 *
 *  Phir API route in items ko seedha TrizaKnowledgeItem table
 *  mein daal deta hai — TRIZA turant seekh jati hai.
 *
 *  IMPORTANT: Yeh sirf DATA COLLECTION ke liye z-ai-web-dev-sdk
 *  use karta hai (web_search + page_reader). TRIZA ki conversation
 *  engine model-free rehti hai — woh apna TF-IDF + cosine + synonym
 *  algorithm use karti hai jawab dene ke liye.
 * ============================================================
 */

import ZAI from 'z-ai-web-dev-sdk'
import type { ParsedItem } from './parser'

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface HarvestSource {
  url: string
  title: string
  snippet: string
  hostName: string
  rank: number
  readSuccess: boolean
  contentLength: number
  paragraphsExtracted: number
  error?: string
}

export interface HarvestResult {
  topic: string
  query: string
  sourcesFound: number
  sourcesRead: number
  sourcesFailed: number
  totalContentChars: number
  totalParagraphs: number
  itemsExtracted: number
  items: ParsedItem[]
  sources: HarvestSource[]
  rawCombinedText: string
  processingTimeMs: number
  errors: string[]
}

export interface HarvestOptions {
  /** Kitne search results read karne hain (2–10). Default: 5 */
  maxSources?: number
  /** Ek page se kitna text lena hai (chars). Default: 8000 */
  maxCharsPerPage?: number
  /** Ek page se kitne paragraphs lena hai. Default: 20 */
  maxParagraphsPerPage?: number
}

// ─────────────────────────────────────────────
// HTML → Clean Text converter
// ─────────────────────────────────────────────

/**
 * HTML ko clean plain text mein convert kare.
 * Scripts, styles, tags sab hata deta hai.
 */
function htmlToText(html: string): string {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<\/h[1-6]>/gi, '\n\n')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/\u00a0/g, ' ')
    .replace(/\u2013/g, '-')
    .replace(/\u2014/g, '-')
    .replace(/\u2018/g, "'")
    .replace(/\u2019/g, "'")
    .replace(/\u201c/g, '"')
    .replace(/\u201d/g, '"')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

// ─────────────────────────────────────────────
// Paragraph quality filter
// ─────────────────────────────────────────────

/** Junk patterns — navigation, menus, cookie notices, etc. */
const JUNK_PATTERNS = [
  /^(?:menu|navigation|search|login|sign up|sign in|subscribe|follow us|copyright|all rights reserved|cookie|privacy policy|terms of|skip to|back to top|share this|related posts|leave a (?:reply|comment)|you may also like|advertisement|sponsored|read more|view all|learn more|click here|get started|contact us|about us|home)\s*$/i,
  /^\d+\s*(?:shares|likes|views|comments|tweets)\s*$/i,
  /^(?:accept|reject|manage)\s+(?:cookies|all)\s*$/i,
  /^(?:previous|next)\s+(?:post|article|page)\s*$/i,
]

/**
 * Ek paragraph ko check kare — kya yeh useful content hai ya junk?
 * Useful = meaningful length, enough words, no navigation/menu text.
 */
function isUsefulParagraph(p: string): boolean {
  // Must be reasonably long
  if (p.length < 50) return false

  const words = p.split(/\s+/).filter(Boolean)
  // Must have enough words
  if (words.length < 8) return false

  // Skip junk patterns
  for (const re of JUNK_PATTERNS) {
    if (re.test(p.trim())) return false
  }

  // Skip text that's mostly URLs
  const urlCount = (p.match(/https?:\/\//g) || []).length
  if (urlCount > 2) return false

  // Skip text that's mostly punctuation/symbols
  const alphaCount = (p.match(/[a-zA-Z]/g) || []).length
  if (alphaCount < p.length * 0.4) return false

  // Skip very repetitive text (e.g. "......."):
  const uniqueWords = new Set(words.map((w) => w.toLowerCase()))
  if (uniqueWords.size < words.length * 0.4) return false

  return true
}

/**
 * Clean text se useful paragraphs nikaale.
 */
function extractParagraphs(text: string): string[] {
  const paras = text
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s+/g, ' ').trim())
    .filter(isUsefulParagraph)

  // Deduplicate (some pages repeat content)
  const seen = new Set<string>()
  const out: string[] = []
  for (const p of paras) {
    const key = p.slice(0, 100).toLowerCase()
    if (!seen.has(key)) {
      seen.add(key)
      out.push(p)
    }
  }
  return out
}

// ─────────────────────────────────────────────
// Paragraph → Knowledge Item converter
// (bypasses parser's format detection — web content
//  is inherently paragraph-based, not Q&A format)
// ─────────────────────────────────────────────

/** Extract the first sentence from a paragraph — used as the trigger. */
function firstSentence(text: string): string {
  const m = text.match(/^(.+?[.!?])\s/)
  if (m && m[1].length > 15) return m[1].trim()
  // Fallback: first 120 chars at word boundary
  const slice = text.slice(0, 120)
  const lastSpace = slice.lastIndexOf(' ')
  return (lastSpace > 40 ? slice.slice(0, lastSpace) : slice).trim()
}

/** Auto-detect intent from text (simplified version of parser's autoIntent). */
function detectIntent(text: string): string {
  const t = text.toLowerCase()
  if (/\b(how to|how do|how can|steps to|way to|method to)\b/.test(t)) return 'how_to'
  if (/\b(what is|what are|define|definition of|meaning of|kya hai)\b/.test(t))
    return 'factual_question'
  if (/\b(why|reason|cause|kyun)\b/.test(t)) return 'factual_question'
  return 'factual_question'
}

/** Extract top content words as keywords (simplified autoKeywords). */
function extractKeywords(text: string): string {
  const words = text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 4)
  const seen = new Set<string>()
  const out: string[] = []
  for (const w of words) {
    if (!seen.has(w) && out.length < 8) {
      seen.add(w)
      out.push(w)
    }
  }
  return out.join(', ')
}

/**
 * Convert an array of paragraphs directly into knowledge items.
 *
 * Each paragraph becomes ONE item:
 *   - question = topic-based triggers + first sentence (pipe-separated)
 *     e.g. "what is gravity | gravity | gravity definition | Gravity is..."
 *   - answer = full paragraph (what TRIZA will speak)
 *   - topic = user-specified topic slug
 *   - intent = auto-detected
 *   - keywords = top content words
 *
 * The topic-based triggers are crucial for matching: when the user
 * asks "what is gravity", the matcher tokenizes the query and looks
 * for items with overlapping tokens. By including "what is gravity"
 * and "gravity definition" as triggers, the item's token set includes
 * strong match words beyond just the paragraph content.
 */
function paragraphsToItems(
  paragraphs: string[],
  topicSlug: string,
  topicOriginal: string
): ParsedItem[] {
  const items: ParsedItem[] = []
  const seenTriggers = new Set<string>()

  // Build topic-based trigger phrases (pipe-separated, added to every item)
  // e.g. for topic "gravity": "what is gravity | gravity | gravity definition"
  const topicLower = topicOriginal.toLowerCase().trim()
  const topicTriggers = [
    `what is ${topicLower}`,
    topicLower,
    `${topicLower} definition`,
    `define ${topicLower}`,
    `tell me about ${topicLower}`,
  ].join(' | ')

  for (const para of paragraphs) {
    if (para.length < 50) continue // too short to be useful

    const trigger = firstSentence(para)
    if (!trigger || trigger.length < 10) continue

    // Deduplicate by trigger (first 60 chars)
    const triggerKey = trigger.slice(0, 60).toLowerCase()
    if (seenTriggers.has(triggerKey)) continue
    seenTriggers.add(triggerKey)

    // Combine topic triggers + the paragraph's first sentence
    const question = `${topicTriggers} | ${trigger}`

    items.push({
      question,
      answer: para,
      topic: topicSlug,
      intent: detectIntent(para),
      keywords: extractKeywords(para),
    })
  }
  return items
}

// ─────────────────────────────────────────────
// Main harvester
// ─────────────────────────────────────────────

/**
 * Internet se kisi topic par knowledge collect kare.
 *
 * Flow:
 *   1. web_search se top results nikaalo
 *   2. Har result ka page page_reader se read karo
 *   3. HTML se clean text nikaalo
 *   4. Useful paragraphs filter karo
 *   5. Sab paragraphs ko combine karke parseBasketContent se
 *      Q&A items banao
 *   6. Topic override karo (sab items ko user ka topic do)
 *
 * @returns HarvestResult with items ready for the knowledge store
 */
export async function harvestTopic(
  topic: string,
  options: HarvestOptions = {}
): Promise<HarvestResult> {
  const t0 = Date.now()
  const maxSources = Math.min(10, Math.max(2, options.maxSources ?? 5))
  const maxCharsPerPage = options.maxCharsPerPage ?? 8000
  const maxParagraphsPerPage = options.maxParagraphsPerPage ?? 20
  const errors: string[] = []

  // 1. Initialize ZAI SDK
  let zai: Awaited<ReturnType<typeof ZAI.create>>
  try {
    zai = await ZAI.create()
  } catch (e) {
    return {
      topic,
      query: topic,
      sourcesFound: 0,
      sourcesRead: 0,
      sourcesFailed: 0,
      totalContentChars: 0,
      totalParagraphs: 0,
      itemsExtracted: 0,
      items: [],
      sources: [],
      rawCombinedText: '',
      processingTimeMs: Date.now() - t0,
      errors: [`SDK init failed: ${e instanceof Error ? e.message : String(e)}`],
    }
  }

  // 2. Search the web
  let searchResults: Array<{
    url: string
    name: string
    snippet: string
    host_name: string
    rank: number
  }> = []

  try {
    const results = await zai.functions.invoke('web_search', {
      query: topic,
      num: maxSources,
    })
    searchResults = Array.isArray(results) ? results : []
  } catch (e) {
    return {
      topic,
      query: topic,
      sourcesFound: 0,
      sourcesRead: 0,
      sourcesFailed: 0,
      totalContentChars: 0,
      totalParagraphs: 0,
      itemsExtracted: 0,
      items: [],
      sources: [],
      rawCombinedText: '',
      processingTimeMs: Date.now() - t0,
      errors: [`Search failed: ${e instanceof Error ? e.message : String(e)}`],
    }
  }

  if (searchResults.length === 0) {
    return {
      topic,
      query: topic,
      sourcesFound: 0,
      sourcesRead: 0,
      sourcesFailed: 0,
      totalContentChars: 0,
      totalParagraphs: 0,
      itemsExtracted: 0,
      items: [],
      sources: [],
      rawCombinedText: '',
      processingTimeMs: Date.now() - t0,
      errors: ['No search results found for this topic.'],
    }
  }

  // 3. Read each page
  const sources: HarvestSource[] = []
  const allParagraphs: string[] = []
  let totalContentChars = 0

  for (const result of searchResults) {
    const source: HarvestSource = {
      url: result.url,
      title: result.name,
      snippet: result.snippet || '',
      hostName: result.host_name || '',
      rank: result.rank || 0,
      readSuccess: false,
      contentLength: 0,
      paragraphsExtracted: 0,
    }

    try {
      const pageResult = await zai.functions.invoke('page_reader', {
        url: result.url,
      })

      // The page_reader returns { data: { title, html, url, ... } }
      // but be defensive about the shape
      const pageData =
        (pageResult as { data?: { html?: string; title?: string } })?.data ||
        (pageResult as { html?: string; title?: string }) ||
        {}
      const html: string = pageData.html || ''
      const pageTitle: string = pageData.title || result.name

      if (!html || html.length < 100) {
        source.error = 'Page content too short or empty'
        errors.push(`${result.url}: content too short`)
        sources.push(source)
        continue
      }

      // Convert HTML to clean text
      let text = htmlToText(html)

      // Limit per-page size
      if (text.length > maxCharsPerPage) {
        text = text.slice(0, maxCharsPerPage)
      }

      // Extract meaningful paragraphs
      const paras = extractParagraphs(text).slice(0, maxParagraphsPerPage)

      if (paras.length === 0) {
        source.error = 'No useful paragraphs found'
        errors.push(`${result.url}: no useful paragraphs`)
        sources.push(source)
        continue
      }

      // Collect individual paragraphs (NOT joined into blocks —
      // we convert each paragraph directly into a knowledge item)
      for (const p of paras) {
        allParagraphs.push(p)
      }

      source.readSuccess = true
      source.contentLength = text.length
      source.paragraphsExtracted = paras.length
      totalContentChars += text.length
    } catch (e) {
      source.error = e instanceof Error ? e.message.slice(0, 200) : String(e).slice(0, 200)
      errors.push(`Read failed ${result.url}: ${source.error}`)
    }

    sources.push(source)
  }

  // 4. Convert paragraphs directly into knowledge items.
  //    We bypass the basket parser's format detection because web
  //    content is inherently paragraph-based — the parser might
  //    mis-detect it as Q&A format if the page contains "Q:" or
  //    "A:" patterns, missing most of the content.
  const topicSlug =
    topic
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '')
      .slice(0, 40) || 'harvested'

  const items: ParsedItem[] = paragraphsToItems(allParagraphs, topicSlug, topic)

  // Keep a combined text preview for the basket record (transparency)
  const rawCombinedText = allParagraphs.join('\n\n')

  return {
    topic,
    query: topic,
    sourcesFound: searchResults.length,
    sourcesRead: sources.filter((s) => s.readSuccess).length,
    sourcesFailed: sources.filter((s) => !s.readSuccess).length,
    totalContentChars,
    totalParagraphs: allParagraphs.length,
    itemsExtracted: items.length,
    items,
    sources,
    rawCombinedText,
    processingTimeMs: Date.now() - t0,
    errors,
  }
}
