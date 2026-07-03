'use client'

import { BasketApp } from '@/components/triza-basket/basket-app'

/**
 * ============================================================
 *  TRIZA — Knowledge Basket (Tokri) · Self-Built AI
 * ============================================================
 *
 *  Aik hi baar mein knowledge add karne ka apna tareeqa:
 *
 *    Bache ki tarah — alag-alag jagah se knowledge uthao
 *    (paste / Q&A / file / manual) aur ek hi "tokri" mein
 *    dalo. Phir "Process Basket" se TRIZA sab seekh jati hai.
 *
 *  Phir TRIZA apne andaaz mein baat karti hai — bina kisi
 *  model ya API ke. Sirf hand-written TF-IDF + cosine +
 *  Roman-Urdu normalizer + synonym map.
 *
 *  Three tabs:
 *    1. Basket   — collect knowledge from many sources
 *    2. Knowledge — view / edit / feedback what TRIZA learned
 *    3. Chat     — talk to TRIZA (self-made, no model)
 * ============================================================
 */
export default function HomePage() {
  return <BasketApp />
}
