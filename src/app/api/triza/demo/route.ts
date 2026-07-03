import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { invalidateIndex } from '@/lib/triza-basket/matcher'

/**
 * POST /api/triza/demo
 *   Seeds a small demo knowledge set directly into the store so the
 *   user can immediately chat with TRIZA and see how it learns.
 *   Idempotent — only inserts items that don't already exist
 *   (matched by question prefix).
 */
export async function POST(_req: NextRequest) {
  try {
    const demo: Array<{
      question: string
      answer: string
      topic: string
      intent: string
      keywords: string
    }> = [
      {
        question: 'what is photosynthesis|how do plants make food|photosynthesis kya hai|photosynthesis',
        answer:
          'Photosynthesis wo process hai jis mein plants apni khaana banate hain. Leaves mein chlorophyll naam ka green substance hota hai jo sunlight ko capture karta hai. Phir plant carbon dioxide (hawa se) aur water (zameen se) use kar ke glucose (sugar) banata hai, aur oxygen bahar release karta hai. Simple equation: 6CO2 + 6H2O + sunlight → C6H12O6 + 6O2. Iske bina zameen par koi food chain nahi chal sakti.',
        topic: 'science',
        intent: 'factual_question',
        keywords: 'photosynthesis, plants, chlorophyll, sunlight, glucose, oxygen, carbon dioxide',
      },
      {
        question: 'what is gravity|gravity kya hai|why do things fall|gravitational force',
        answer:
          'Gravity wo force hai jo do objects ke beech pull karta hai. Earth ki gravity har cheez ko earth ki taraf (neeche) kheenchti hai — isliye hum zameen par rehte hain aur girne wali cheezein neeche aati hain. Newton ne bataya: jitna heavy object, utni zyada gravity; aur jitna door, utni kam gravity. Gravity hamari duniya ko stable rakhti hai — moon earth ke around ghoomta hai gravity ki wajah se.',
        topic: 'science',
        intent: 'factual_question',
        keywords: 'gravity, force, newton, earth, moon, attraction, weight',
      },
      {
        question: 'how to boil rice|chawal kaise banaye|how to cook rice perfectly|rice recipe',
        answer:
          'Chawal banana aasaan hai:\n1. 1 cup rice ko 2-3 baar paani se dho kar saaf kar lein.\n2. Ek pot mein 2 cups paani ubaalein (thoda zyada paani bhi theek hai).\n3. Ubalte paani mein rice daalein, thoda namak daalein.\n4. Aanch dheema kar dein, pot ka dhakkan lagayein.\n5. 15-18 minute tak pakne dein, dhakkan hata kar check karein.\n6. Jab paani sookh jaye aur rice naram ho jaye, gas band karke 5 minute dhakne ke neeche rakhein.\nSaaf rice = al dente (thoda firm), not mushy.',
        topic: 'daily-life',
        intent: 'how_to',
        keywords: 'rice, chawal, boil, cook, recipe, kitchen, food',
      },
      {
        question: 'who was albert einstein|einstein kaun the|einstein theory of relativity',
        answer:
          'Albert Einstein ek famous scientist the (1879-1955, Germany born). Unhone Theory of Relativity di — jis mein E=mc2 ka formula aata hai. Yeh batata hai ki energy (E) aur mass (m) ek hi cheez ke do roop hain. Einstein ne bataya ki time aur space ek sath (spacetime) kaam karte hain, aur gravity actually spacetime ke bend karne ki wajah se hoti hai. 1921 mein unhe Nobel Prize mila.',
        topic: 'history',
        intent: 'factual_question',
        keywords: 'einstein, relativity, scientist, physics, emc2, energy, mass, nobel',
      },
      {
        question: 'how to save money|paise kaise bachaye|money saving tips|budget tips',
        answer:
          'Paise bachane ke 5 aasaan tarike:\n1. 50/30/20 rule: 50% zaroorat (rent, food), 30% khwahish (entertainment), 20% bachat.\n2. Har mahine pehle saving karein, baad mein nahi (pay yourself first).\n3. Faltu kharch track karein — coffee, subscriptions, impulsive shopping.\n4. Emergency fund banayein (3-6 mahine ka kharcha).\n5. Cashback apps aur discounts use karein, lekin sirf cheezein khareedne jo zaroori hain.\nChoti bachat bhi lambayi mein bada fund banati hai.',
        topic: 'business',
        intent: 'how_to',
        keywords: 'money, save, budget, saving, finance, emergency fund, 50/30/20',
      },
      {
        question: 'what is the internet|internet kya hai|how does the internet work',
        answer:
          'Internet ek global network hai jo duniya bhar ke computers ko jodata hai. Yeh TCP/IP protocols use karta hai — data ko chhote packets mein tod kar bhejta hai, har packet alag route se ja sakta hai. Aap jab website kholte hain, to aapka computer ek server se maang bhejta hai, server data wapas bhejta hai, aur browser usay screen par dikhata hai. DNS (Domain Name System) website naam ko IP address mein convert karta hai — jaise phonebook.',
        topic: 'technology',
        intent: 'factual_question',
        keywords: 'internet, network, tcp/ip, packets, server, dns, browser, protocol',
      },
    ]

    let added = 0
    let skipped = 0
    for (const item of demo) {
      // Check if already exists (by first question phrase)
      const firstQ = item.question.split('|')[0]
      const exists = await db.trizaKnowledgeItem.findFirst({
        where: { question: { contains: firstQ } },
        select: { id: true },
      })
      if (exists) {
        skipped += 1
        continue
      }
      await db.trizaKnowledgeItem.create({ data: item })
      added += 1
    }
    invalidateIndex()
    return NextResponse.json({ added, skipped, total: demo.length })
  } catch (err) {
    console.error('[triza demo] error:', err)
    return NextResponse.json({ error: 'Failed to seed demo' }, { status: 500 })
  }
}
