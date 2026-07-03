/**
 * ============================================================
 *  TRIZA — Bulk Knowledge Generator (CLI-based)
 * ============================================================
 *
 *  Takes topics from scripts/topics.json, calls the z-ai CLI
 *  for each to generate a full KnowledgeEntry, and writes
 *  everything into src/lib/triza-engine/batch-auto-generated.ts
 *
 *  Usage:  bun run scripts/generate-knowledge.ts
 *
 *  Rate-limit safe: sequential, retry+backoff, saves progress.
 * ============================================================
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";

// ── Types ──────────────────────────────────────────────────
interface TopicSpec {
  id: string;
  topic_name: string;
  domain: string;
  intent?: string;
}

interface GeneratedEntry {
  id: string;
  patterns: string[];
  keywords: string[];
  topic: string;
  intent: string;
  response: string;
}

// ── Config ─────────────────────────────────────────────────
const TOPICS_FILE = join(process.cwd(), "scripts", "topics.json");
const OUTPUT_FILE = join(
  process.cwd(),
  "src",
  "lib",
  "triza-engine",
  "batch-auto-generated.ts"
);
const PROGRESS_FILE = join(process.cwd(), "scripts", "topics-progress.json");
const SAVE_EVERY = 3;
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 3000;

// ── LLM call via CLI ───────────────────────────────────────
function callLLM(prompt: string): string {
  // Write prompt to a temp file to avoid shell escaping issues
  const tmpPrompt = "/tmp/triza-gen-prompt.txt";
  const tmpOutput = "/tmp/triza-gen-output.json";
  writeFileSync(tmpPrompt, prompt, "utf-8");
  // Use -o flag to save clean JSON to file (avoids stderr mixing)
  const cmd = `z-ai chat -p "$(cat ${tmpPrompt})" -o ${tmpOutput} 2>/dev/null`;
  execSync(cmd, {
    encoding: "utf-8",
    timeout: 90000,
    maxBuffer: 1024 * 1024 * 10,
    stdio: ["pipe", "pipe", "pipe"],
  });
  // Read the clean JSON output file
  const raw = readFileSync(tmpOutput, "utf-8");
  const parsed = JSON.parse(raw);
  return parsed.choices?.[0]?.message?.content?.trim() || "";
}

// ── Generate one entry ─────────────────────────────────────
async function generateEntry(spec: TopicSpec): Promise<GeneratedEntry> {
  const intent = spec.intent || "factual_question";
  const prompt = `You are a knowledge engineer for TRIZA, a transparent AI. Generate a detailed knowledge entry for the topic: "${spec.topic_name}" (domain: ${spec.domain}).

Respond with ONLY valid JSON (no markdown fences, no explanation) in this exact format:
{
  "patterns": ["token1", "token2", "token3", "token4", "token5"],
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5", "keyword6"],
  "response": "the full markdown explanation"
}

Rules:
1. "patterns": 4-8 specific trigger words/phrases a user might type. Lowercase. Most distinctive terms.
2. "keywords": 5-10 related keywords for fuzzy matching. Lowercase.
3. "response": A 400-600 word markdown explanation with:
   - A brief intro paragraph
   - 3-5 sections with ### subheadings
   - A closing "### Why It Matters" paragraph
   - English only, no emojis, no religious doctrine
   - Factual, educational, specific
   - Use **bold** for key terms
4. Do NOT include the topic name as a heading at the top.
5. Return ONLY the JSON object, nothing else.`;

  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const raw = callLLM(prompt);
      if (!raw) throw new Error("Empty LLM response");

      // Strip markdown fences
      let cleaned = raw.trim();
      cleaned = cleaned.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "").trim();

      // Extract JSON object
      const jsonStart = cleaned.indexOf("{");
      const jsonEnd = cleaned.lastIndexOf("}");
      if (jsonStart === -1 || jsonEnd === -1) {
        throw new Error("No JSON found in response");
      }
      const jsonStr = cleaned.substring(jsonStart, jsonEnd + 1);
      const parsed = JSON.parse(jsonStr);

      if (!parsed.patterns || !Array.isArray(parsed.patterns) || parsed.patterns.length < 3) {
        throw new Error("Invalid patterns array");
      }
      if (!parsed.keywords || !Array.isArray(parsed.keywords) || parsed.keywords.length < 3) {
        throw new Error("Invalid keywords array");
      }
      if (!parsed.response || typeof parsed.response !== "string" || parsed.response.length < 200) {
        throw new Error("Response too short or invalid");
      }

      return {
        id: spec.id,
        patterns: parsed.patterns.map((p: string) => String(p).toLowerCase().trim()).filter(Boolean),
        keywords: parsed.keywords.map((k: string) => String(k).toLowerCase().trim()).filter(Boolean),
        topic: spec.domain,
        intent,
        response: parsed.response,
      };
    } catch (err: any) {
      lastError = err;
      console.error(`  ✗ Attempt ${attempt} failed: ${err.message.substring(0, 100)}`);
      if (attempt < MAX_RETRIES) {
        await new Promise((r) => setTimeout(r, RETRY_DELAY_MS * attempt));
      }
    }
  }

  throw new Error(`Failed after ${MAX_RETRIES} retries: ${lastError?.message}`);
}

// ── Escape helpers ─────────────────────────────────────────
function escapeForTemplate(str: string): string {
  return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

function escapeRegexToken(token: string): string {
  return token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// ── Write batch file ───────────────────────────────────────
function writeBatchFile(entries: GeneratedEntry[]): void {
  const header = `/**
 * ============================================================
 *  TRIZA — Auto-Generated Knowledge Batch
 * ============================================================
 *
 *  Generated by scripts/generate-knowledge.ts using z-ai CLI.
 *  DO NOT EDIT BY HAND.
 *
 *  To regenerate:  bun run scripts/generate-knowledge.ts
 *  To add topics:  edit scripts/topics.json
 *
 *  Generated: ${new Date().toISOString()}
 *  Entries: ${entries.length}
 * ============================================================
 */

import type { KnowledgeEntry } from './types'

export const AUTO_GENERATED_ENTRIES: KnowledgeEntry[] = [
`;

  const body = entries
    .map((e) => {
      const patternStr = e.patterns.map(escapeRegexToken).join("|");
      const keywordsStr = e.keywords.map((k) => `'${k.replace(/'/g, "\\'")}'`).join(", ");
      return `  {
    id: '${e.id}',
    patterns: [/\\b(${patternStr})\\b/i],
    keywords: [${keywordsStr}],
    intent: '${e.intent}',
    topic: '${e.topic}',
    response: () => \`${escapeForTemplate(e.response)}\`,
  },`;
    })
    .join("\n\n");

  writeFileSync(OUTPUT_FILE, header + body + "\n]\n", "utf-8");
  console.log(`\n✓ Wrote ${entries.length} entries to batch-auto-generated.ts`);
}

// ── Progress ───────────────────────────────────────────────
function loadProgress(): GeneratedEntry[] {
  if (existsSync(PROGRESS_FILE)) {
    try {
      return JSON.parse(readFileSync(PROGRESS_FILE, "utf-8"));
    } catch {
      return [];
    }
  }
  return [];
}

function saveProgress(entries: GeneratedEntry[]): void {
  writeFileSync(PROGRESS_FILE, JSON.stringify(entries, null, 2), "utf-8");
}

// ── Main ───────────────────────────────────────────────────
async function main() {
  console.log("=== TRIZA Bulk Knowledge Generator ===\n");

  if (!existsSync(TOPICS_FILE)) {
    console.error(`✗ Topics file not found: ${TOPICS_FILE}`);
    process.exit(1);
  }
  const topics: TopicSpec[] = JSON.parse(readFileSync(TOPICS_FILE, "utf-8"));
  console.log(`Loaded ${topics.length} topics`);

  const existing = loadProgress();
  const existingIds = new Set(existing.map((e) => e.id));
  const toGenerate = topics.filter((t) => !existingIds.has(t.id));
  console.log(`Already generated: ${existing.length}`);
  console.log(`Remaining: ${toGenerate.length}\n`);

  if (toGenerate.length === 0) {
    console.log("All topics done. Writing batch file...");
    writeBatchFile(existing);
    return;
  }

  const all = [...existing];
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < toGenerate.length; i++) {
    const spec = toGenerate[i];
    const progress = `[${i + 1}/${toGenerate.length}]`;
    console.log(`${progress} ${spec.topic_name} (${spec.domain})`);

    try {
      const entry = await generateEntry(spec);
      all.push(entry);
      successCount++;
      const wc = entry.response.split(/\s+/).length;
      console.log(`  ✓ ${wc} words, ${entry.patterns.length} patterns`);

      if (all.length % SAVE_EVERY === 0) {
        saveProgress(all);
      }
    } catch (err: any) {
      failCount++;
      console.error(`  ✗ FAILED: ${err.message.substring(0, 80)}`);
      saveProgress(all);
    }

    if (i < toGenerate.length - 1) {
      await new Promise((r) => setTimeout(r, 800));
    }
  }

  saveProgress(all);
  writeBatchFile(all);

  console.log(`\n=== COMPLETE ===`);
  console.log(`Success: ${successCount} | Failed: ${failCount}`);
  console.log(`Total entries: ${all.length}`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
