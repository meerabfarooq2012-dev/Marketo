'use client'

import { BasketApp } from '@/components/triza-basket/basket-app'

/**
 * ============================================================
 *  TRIZA — Bulk Knowledge Collector + Basket · Self-Built AI
 * ============================================================
 *
 *  TRIZA ka kaam teen hisson mein bata hua hai:
 *
 *  1. BULK HARVEST (Sara internet ek hi waqt mein)
 *     - User knowledge packs choose karta hai (Science, History,
 *       Pakistan, Tech, Health, Islam, Sports, General, Everyday)
 *       — ya apni custom topic list paste karta hai
 *     - Ek hi baar mein HUNDREDS of topics par internet se
 *       knowledge collect hoti hai (jaise ChatGPT ne kiya)
 *     - Har topic par agent khud search + read karta hai
 *     - Live progress dikhta hai: "Topic 47/250: gravity..."
 *     - Sach: pura internet (petabytes) ek machine par mumkin
 *       nahi, lekin hundreds of curated topics bilkul mumkin hai
 *
 *  2. SINGLE HARVEST (Aik topic)
 *     - User koi aik topic deta hai (e.g. "photosynthesis")
 *     - Agent us topic par internet se search + read karta hai
 *
 *  3. CHAT (Apne dimaagh se jawab)
 *     - User sawaal poochta hai
 *     - TRIZA apna TF-IDF + cosine + synonym engine use karta hai
 *     - Knowledge store se best match nikaal ke jawab deta hai
 *     - 100% model-free — koi LLM/API nahi
 *
 *  Paanch tabs:
 *    1. Bulk Harvest    — hundreds of topics ek hi waqt mein
 *    2. Single Harvest  — kisi aik topic par knowledge collect karo
 *    3. Basket          — manually knowledge collect karo (paste/Q&A/file)
 *    4. Knowledge       — dekho/edit karo TRIZA ne kya seekha
 *    5. Chat            — TRIZA se baat karo (model-free)
 * ============================================================
 */
export default function HomePage() {
  return <BasketApp />
}
