'use client'

import { BasketApp } from '@/components/triza-basket/basket-app'

/**
 * ============================================================
 *  TRIZA — Knowledge Harvester + Basket · Self-Built AI
 * ============================================================
 *
 *  TRIZA ka kaam do hisson mein bata hua hai:
 *
 *  1. HARVEST (Internet se seekhna)
 *     - User koi topic deta hai (e.g. "photosynthesis")
 *     - TRIZA ka agent internet par search karta hai (web-search)
 *     - Top pages read karta hai (web-reader)
 *     - Clean text nikaal ke Q&A items banaata hai
 *     - Seedha knowledge store mein daal deta hai
 *     - Jaise Google/ChatGPT knowledge collect karte hain!
 *
 *  2. CHAT (Apne dimaagh se jawab)
 *     - User sawaal poochta hai
 *     - TRIZA apna TF-IDF + cosine + synonym engine use karta hai
 *     - Knowledge store se best match nikaal ke jawab deta hai
 *     - 100% model-free — koi LLM/API nahi
 *
 *  Chaar tabs:
 *    1. Harvest  — internet se kisi topic par knowledge collect karo
 *    2. Basket   — manually knowledge collect karo (paste/Q&A/file)
 *    3. Knowledge — dekho/edit karo TRIZA ne kya seekha
 *    4. Chat     — TRIZA se baat karo (model-free)
 * ============================================================
 */
export default function HomePage() {
  return <BasketApp />
}
