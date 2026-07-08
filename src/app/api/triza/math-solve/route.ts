import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

/**
 * POST /api/triza/math-solve
 *   TRIZA khud AI (LLM) use karke math equation solve karta hai.
 *   Koi template nahi — real-time step-by-step solution.
 *
 *   Body: { equation: string, mode?: 'solve' | 'explain' | 'verify' }
 *   Response: { solution, steps, finalAnswer, thinking, processingTimeMs }
 */
export async function POST(req: NextRequest) {
  const started = Date.now()
  try {
    const body = await req.json()
    const { equation, mode = 'solve' } = body || {}

    if (!equation || typeof equation !== 'string' || !equation.trim()) {
      return NextResponse.json({ error: 'equation is required' }, { status: 400 })
    }

    const zai = await ZAI.create()

    const systemPrompt = `You are TRIZA, an expert mathematics tutor. You solve math problems with rigorous step-by-step reasoning.

Rules:
- ALWAYS show every step clearly, numbered.
- Use proper mathematical notation (use ^ for powers, sqrt(), fractions a/b, Greek names like alpha, theta).
- State the method/technique used before applying it.
- Box or clearly mark the FINAL ANSWER at the end like: FINAL ANSWER: <value>.
- If the problem has no single numeric answer (proof/derivation), clearly state the conclusion.
- If the input is not a valid math problem, politely say so.
- Keep language simple — explain in a mix of English and simple Urdu/Hindi words when helpful.
- Be concise but complete. No filler.`

    const modeInstruction: Record<string, string> = {
      solve: 'Solve this problem completely, step by step, and give the final answer.',
      explain: 'Explain the concept and method behind this problem, then solve it.',
      verify: 'Verify the given solution/claim. If correct, confirm; if wrong, give the correct solution.',
    }

    const userMessage = `${modeInstruction[mode] || modeInstruction.solve}

PROBLEM:
${equation.trim()}`

    const completion = await zai.chat.completions.create({
      messages: [
        { role: 'assistant', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      thinking: { type: 'enabled' },
    })

    const solution = completion.choices[0]?.message?.content || ''
    const thinking =
      (completion.choices[0]?.message as unknown as { reasoning_content?: string })
        ?.reasoning_content || ''

    // Extract final answer (text after "FINAL ANSWER:")
    let finalAnswer: string | null = null
    const m = solution.match(/FINAL\s*ANSWER\s*[:\s]*([^\n]+)/i)
    if (m) finalAnswer = m[1].trim()

    // Split into steps by numbered lines "1.", "2." etc. or "Step 1"
    const steps: string[] = []
    const stepRegex = /(?:^|\n)\s*(?:Step\s*\d+[:.]?|\d+[.)])\s*(.+)/g
    let match: RegExpExecArray | null
    while ((match = stepRegex.exec(solution)) !== null) {
      steps.push(match[1].trim())
    }

    return NextResponse.json({
      solution,
      steps: steps.length ? steps : [],
      finalAnswer,
      thinking,
      processingTimeMs: Date.now() - started,
    })
  } catch (err) {
    console.error('[triza math-solve] error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Math solve failed' },
      { status: 500 }
    )
  }
}
