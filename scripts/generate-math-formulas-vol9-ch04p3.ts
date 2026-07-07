/**
 * ============================================================
 *  Mathematics Formula Encyclopedia — Volume 9
 *  Comprehensive Formula Reference
 *  Chapter 4 — Part 3 (Integral Calculus)
 *  Definite Integral & Riemann Sums, Fundamental Theorem of
 *  Calculus, Indefinite Integrals & Basic Rules, Substitution,
 *  Integration by Parts, Trigonometric Integrals,
 *  Trigonometric Substitution, Partial Fractions,
 *  Improper Integrals, Applications (Area, Volume, Arc Length,
 *  Surface Area, Work, Center of Mass, Hydrostatic Force),
 *  Numerical Integration (Trapezoidal, Simpson's Rule),
 *  Hyperbolic Integrals
 *  Generator for TRIZA
 * ============================================================
 *
 *  Output: data/math-formulas-vol9-ch04p3.json
 * ============================================================
 */
import { writeFileSync, mkdirSync } from 'fs'

interface MathItem {
  question: string
  answer: string
  topic: string
  intent: 'factual_question' | 'how_to' | 'formula_recall' | 'problem_solving'
  keywords: string[]
}

const items: MathItem[] = []

function add(
  question: string,
  answer: string,
  topic: string,
  intent: MathItem['intent'] = 'formula_recall',
  keywords: string[] = []
) {
  items.push({ question, answer, topic, intent, keywords })
}

// ============================================================
// SECTION 1 — RIEMANN SUMS & DEFINITE INTEGRAL DEFINITION (6 items)
// ============================================================
add(
  'What is a Riemann sum?',
  'Riemann sum: Approximation of the area under a curve. Partition [a,b] into n subintervals of width Δxᵢ = xᵢ − xᵢ₋₁. Choose sample points xᵢ* in each subinterval. The Riemann sum is Σᵢ f(xᵢ*)·Δxᵢ. Three common choices: Left (xᵢ* = xᵢ₋₁), Right (xᵢ* = xᵢ), Midpoint (xᵢ* = (xᵢ₋₁+xᵢ)/2). The definite integral is the limit: ∫_a^b f(x)dx = lim(n→∞) Σf(xᵢ*)Δx. Example: Estimate ∫_0^2 x² dx using right Riemann sum with n=4. Δx=0.5, points 0.5,1,1.5,2. Sum = 0.25·0.5 + 1·0.5 + 2.25·0.5 + 4·0.5 = 0.125+0.5+1.125+2 = 3.75. (Actual = 8/3 ≈ 2.667.) ✓',
  'ch04p3_riemann_sum',
  'formula_recall',
  ['Riemann sum', 'partition', 'left right midpoint', 'approximation', 'area']
)

add(
  'What is the definition of the definite integral as a limit?',
  'Definite integral as a limit: ∫_a^b f(x)dx = lim(n→∞, ‖P‖→0) Σᵢ₌₁ⁿ f(xᵢ*)Δxᵢ, where ‖P‖ is the mesh (largest subinterval width). If this limit exists, f is integrable on [a,b]. All continuous functions on [a,b] are integrable. The integral represents signed area: positive where f>0, negative where f<0. Example: ∫_0^3 (2x)dx = lim Σ 2(xᵢ*)Δx. With n subintervals of equal width 3/n: sum = Σ 2(3i/n)(3/n) = (18/n²)Σi = (18/n²)(n(n+1)/2) = 9(n+1)/n → 9. So ∫_0^3 2x dx = 9. ✓',
  'ch04p3_definite_integral_definition',
  'formula_recall',
  ['definite integral', 'limit', 'definition', 'integrable', 'signed area']
)

add(
  'What are the properties of the definite integral?',
  'Properties of definite integrals: (1) ∫_a^a f(x)dx = 0. (2) ∫_a^b f(x)dx = −∫_b^a f(x)dx (reversing limits flips sign). (3) Linearity: ∫_a^b [c·f(x) + d·g(x)]dx = c∫f dx + d∫g dx. (4) Additivity: ∫_a^b f + ∫_b^c f = ∫_a^c f. (5) Comparison: if f ≤ g on [a,b], then ∫f ≤ ∫g. (6) |∫f| ≤ ∫|f|. (7) If m ≤ f ≤ M, then m(b−a) ≤ ∫_a^b f ≤ M(b−a). Example: ∫_1^4 3x² dx = 3·[x³/3]_1^4 = 3·(64/3 − 1/3) = 63. ✓',
  'ch04p3_integral_properties',
  'formula_recall',
  ['properties', 'linearity', 'additivity', 'comparison', 'bounds']
)

add(
  'What is the average value of a function on an interval?',
  'Average value of a function: f_avg = (1/(b−a))·∫_a^b f(x)dx. This is the height of a rectangle over [a,b] with the same area as the integral. The Mean Value Theorem for Integrals guarantees (for continuous f) a point c in [a,b] where f(c) = f_avg. Example: Average value of f(x)=x² on [0,3]: f_avg = (1/3)∫_0^3 x²dx = (1/3)(27/3) = (1/3)(9) = 3. Find c with f(c)=3: c²=3 ⇒ c=√3 ≈ 1.732 ∈ [0,3]. ✓',
  'ch04p3_average_value',
  'formula_recall',
  ['average value', 'mean value', 'MVT for integrals', 'rectangle', 'function']
)

add(
  'How do you evaluate definite integrals using sigma notation and limits?',
  'Evaluating integrals via limits of sums: For ∫_a^b f(x)dx with n equal subintervals, Δx=(b−a)/n, right endpoints xᵢ=a+i·Δx. ∫_a^b f(x)dx = lim(n→∞) Σᵢ₌₁ⁿ f(a+i·(b−a)/n)·(b−a)/n. Use sum formulas: Σi = n(n+1)/2, Σi² = n(n+1)(2n+1)/6, Σi³ = [n(n+1)/2]². Example: ∫_0^1 x² dx = lim Σ(i/n)²·(1/n) = lim (1/n³)·Σi² = lim (1/n³)·n(n+1)(2n+1)/6 = lim (2n³+3n²+n)/(6n³) = 2/6 = 1/3. ✓',
  'ch04p3_sigma_limit_evaluation',
  'problem_solving',
  ['sigma notation', 'limit of sum', 'sum formulas', 'definition', 'evaluate']
)

add(
  'What is the net change theorem?',
  'Net Change Theorem: The definite integral of a rate of change gives the total change: ∫_a^b F\'(t)dt = F(b) − F(a). If F\'(t) is the rate (velocity, growth rate, etc.), the integral gives net change in F. Example: A particle\'s velocity v(t)=t²−2t+3 (m/s). Displacement from t=0 to t=4: ∫_0^4 (t²−2t+3)dt = [t³/3 − t² + 3t]_0^4 = 64/3 − 16 + 12 = 64/3 − 4 = 52/3 ≈ 17.33 m. Total distance (use |v|): need to split at zeros of v, but v(t)=(t−1)²+2 > 0 always, so distance = displacement = 52/3 m. ✓',
  'ch04p3_net_change_theorem',
  'formula_recall',
  ['net change', 'rate of change', 'displacement', 'velocity', 'total change']
)

// ============================================================
// SECTION 2 — FUNDAMENTAL THEOREM OF CALCULUS (5 items)
// ============================================================
add(
  'What is the Fundamental Theorem of Calculus Part 1?',
  'FTC Part 1: If f is continuous on [a,b] and F(x) = ∫_a^x f(t)dt, then F is differentiable on (a,b) and F\'(x) = f(x). In other words, d/dx[∫_a^x f(t)dt] = f(x). The integral function is an antiderivative of f. Example: d/dx[∫_2^x sin(t²)dt] = sin(x²). Example 2 (with chain rule): d/dx[∫_0^{x²} e^t dt] = e^{x²}·2x = 2x·e^{x²}. ✓',
  'ch04p3_ftc_part1',
  'formula_recall',
  ['Fundamental Theorem', 'FTC', 'Part 1', 'derivative of integral', 'antiderivative']
)

add(
  'What is the Fundamental Theorem of Calculus Part 2?',
  'FTC Part 2 (Evaluation Theorem): If f is continuous on [a,b] and F is ANY antiderivative of f (F\'=f), then ∫_a^b f(x)dx = F(b) − F(a) = [F(x)]_a^b. This connects definite integrals to antiderivatives — no Riemann sums needed. Example: ∫_0^2 x³ dx = [x⁴/4]_0^2 = 16/4 − 0 = 4. Example 2: ∫_0^{π/2} sin x dx = [−cos x]_0^{π/2} = −cos(π/2) − (−cos 0) = 0 + 1 = 1. ✓',
  'ch04p3_ftc_part2',
  'formula_recall',
  ['FTC Part 2', 'evaluation theorem', 'antiderivative', 'evaluate', 'F(b) minus F(a)']
)

add(
  'How do you differentiate an integral with variable limits?',
  'Differentiating integrals with variable limits (Leibniz rule): d/dx[∫_{a(x)}^{b(x)} f(t)dt] = f(b(x))·b\'(x) − f(a(x))·a\'(x). Special cases: (1) Lower limit constant, upper = x: d/dx[∫_a^x f(t)dt] = f(x). (2) Upper = x²: d/dx[∫_a^{x²} f(t)dt] = f(x²)·2x. Example: d/dx[∫_x^{x³} cos(t)dt] = cos(x³)·3x² − cos(x)·1 = 3x²cos(x³) − cos(x). ✓',
  'ch04p3_derivative_integral_variable_limits',
  'formula_recall',
  ['Leibniz rule', 'variable limits', 'FTC', 'derivative of integral', 'chain rule']
)

add(
  'How do you use the FTC to evaluate a definite integral step by step?',
  'Evaluating definite integrals via FTC: (1) Find an antiderivative F of f (F\'=f). (2) Compute F(b) − F(a). (3) The result is a number (signed area). Example: ∫_1^4 (3x² + 2x − 1)dx. Antiderivative F(x) = x³ + x² − x. F(4) = 64 + 16 − 4 = 76. F(1) = 1 + 1 − 1 = 1. Integral = 76 − 1 = 75. ✓',
  'ch04p3_ftc_evaluation_steps',
  'problem_solving',
  ['FTC', 'evaluate', 'definite integral', 'antiderivative', 'steps']
)

add(
  'What is the relationship between integration and differentiation as inverse operations?',
  'Integration and differentiation are inverse operations (per FTC): (1) Differentiating an integral: d/dx[∫_a^x f(t)dt] = f(x). (2) Integrating a derivative: ∫_a^b F\'(x)dx = F(b) − F(a). Together: ∫_a^b F\'(x)dx = F(b) − F(a) and d/dx[∫_a^x f(t)dt] = f(x). They "undo" each other (up to a constant for indefinite integrals). Example: Differentiate then integrate: d/dx[x²] = 2x, then ∫2x dx = x² + C. Integrate then differentiate: ∫3x²dx = x³+C, then d/dx[x³+C] = 3x². ✓',
  'ch04p3_integration_differentiation_inverse',
  'formula_recall',
  ['inverse operations', 'FTC', 'undo', 'differentiation integration', 'relationship']
)

// ============================================================
// SECTION 3 — INDEFINITE INTEGRALS & BASIC RULES (6 items)
// ============================================================
add(
  'What are the basic integration formulas?',
  'Basic indefinite integrals: ∫xⁿ dx = x^(n+1)/(n+1) + C (n≠−1). ∫(1/x)dx = ln|x| + C. ∫eˣ dx = eˣ + C. ∫aˣ dx = aˣ/ln a + C. ∫sin x dx = −cos x + C. ∫cos x dx = sin x + C. ∫sec²x dx = tan x + C. ∫csc²x dx = −cot x + C. ∫sec x tan x dx = sec x + C. ∫csc x cot x dx = −csc x + C. ∫1/(1+x²)dx = arctan x + C. ∫1/√(1−x²)dx = arcsin x + C. ∫tan x dx = ln|sec x| + C. ∫cot x dx = ln|sin x| + C. Example: ∫5x⁴ dx = x⁵ + C. ✓',
  'ch04p3_basic_integrals',
  'formula_recall',
  ['basic integrals', 'formulas', 'antiderivatives', 'table', 'common']
)

add(
  'What is the linearity property of indefinite integrals?',
  'Linearity of indefinite integrals: ∫[a·f(x) + b·g(x)]dx = a·∫f(x)dx + b·∫g(x)dx, for constants a, b. Integrate term-by-term, constants factor out. Example: ∫(4x³ − 3x² + 2x − 5)dx = 4·x⁴/4 − 3·x³/3 + 2·x²/2 − 5x + C = x⁴ − x³ + x² − 5x + C. Example 2: ∫(3eˣ − 2sin x + 1/x)dx = 3eˣ + 2cos x + ln|x| + C. ✓',
  'ch04p3_linearity_integrals',
  'formula_recall',
  ['linearity', 'term by term', 'constant multiple', 'indefinite integral']
)

add(
  'How do you integrate functions involving radicals?',
  'Integrating radicals: Rewrite radical as a power, then use power rule. √x = x^(1/2), so ∫√x dx = ∫x^(1/2)dx = x^(3/2)/(3/2) + C = (2/3)x^(3/2) + C. 1/√x = x^(−1/2), so ∫1/√x dx = ∫x^(−1/2)dx = 2x^(1/2) + C = 2√x + C. ∛(x²) = x^(2/3), so ∫∛(x²)dx = (3/5)x^(5/3) + C. Example: ∫(√x + 1/x²)dx = (2/3)x^(3/2) − 1/x + C. ✓',
  'ch04p3_integrate_radicals',
  'problem_solving',
  ['radical', 'square root', 'power rule', 'fractional exponent', 'integrate']
)

add(
  'How do you integrate using algebraic manipulation first?',
  'Algebraic manipulation before integrating: Expand products, divide out, complete the square, or simplify. Example 1: ∫(x+1)(x−2)dx = ∫(x²−x−2)dx = x³/3 − x²/2 − 2x + C. Example 2: ∫(x²+1)/x dx = ∫(x + 1/x)dx = x²/2 + ln|x| + C. Example 3: ∫1/(1+eˣ)dx. Multiply by e^(−x)/e^(−x): ∫e^(−x)/(e^(−x)+1)dx = −ln(e^(−x)+1) + C. ✓',
  'ch04p3_algebraic_manipulation',
  'problem_solving',
  ['algebraic', 'expand', 'divide', 'simplify', 'manipulation']
)

add(
  'How do you find a definite integral from a graph or table?',
  'Integrating from graph/table: Use geometry (area of triangles, rectangles, semicircles) or numeric methods (Trapezoidal, Simpson\'s). Areas above x-axis are positive; below are negative. Example: Given f with f(0)=0, f(1)=2, f(2)=2, f(3)=0 (trapezoid 0≤x≤2, triangle 2≤x≤3). ∫_0^3 f(x)dx = area of trapezoid (h₁=0, h₂=2, w=2): (0+2)/2·2 = 2; plus triangle (base 1, height 2): 1/2·1·2 = 1. Total = 2 + 1 = 3. ✓',
  'ch04p3_graph_table_integration',
  'problem_solving',
  ['graph', 'table', 'geometry', 'area', 'numeric']
)

add(
  'What are the integrals of common composite forms?',
  'Common composite integrals (recognize reverse chain rule): ∫f\'(x)/f(x) dx = ln|f(x)| + C. ∫f\'(x)·e^{f(x)} dx = e^{f(x)} + C. ∫f\'(x)·cos(f(x)) dx = sin(f(x)) + C. ∫f\'(x)·sec²(f(x)) dx = tan(f(x)) + C. ∫f\'(x)/√(1−f²) dx = arcsin(f(x)) + C. ∫f\'(x)/(1+f²) dx = arctan(f(x)) + C. Example: ∫2x/(x²+1) dx = ln|x²+1| + C (here f=x²+1, f\'=2x). ✓',
  'ch04p3_composite_integrals',
  'formula_recall',
  ['composite', 'reverse chain rule', 'recognition', 'common forms', 'ln']
)

// ============================================================
// SECTION 4 — SUBSTITUTION METHOD (5 items)
// ============================================================
add(
  'What is the substitution method for integration?',
  'Substitution method (u-substitution): Reverse of chain rule. If ∫f(g(x))·g\'(x)dx, let u=g(x), du=g\'(x)dx. Substitute: ∫f(u)du. Integrate, then substitute back. For definite integrals, also change limits: when x=a, u=g(a); when x=b, u=g(b). Example: ∫2x·cos(x²)dx. Let u=x², du=2x dx. ∫cos(u)du = sin(u)+C = sin(x²)+C. ✓',
  'ch04p3_substitution_method',
  'formula_recall',
  ['substitution', 'u-substitution', 'reverse chain rule', 'change of variable']
)

add(
  'How do you choose the substitution u?',
  'Choosing u: Look for a function whose derivative also appears (possibly up to a constant). Common choices: (1) Inside of a composition: f(g(x)) → u=g(x). (2) Denominator of a quotient: 1/h(x) → u=h(x). (3) Exponent: e^{g(x)} → u=g(x). (4) Argument of trig: sin(g(x)) → u=g(x). (5) Expression under radical: √(g(x)) → u=g(x). Example: ∫x·√(x²+1)dx. u=x²+1, du=2x dx. Need factor of 2: (1/2)∫√u du = (1/2)·(2/3)u^(3/2) = (1/3)(x²+1)^(3/2) + C. ✓',
  'ch04p3_choosing_substitution',
  'problem_solving',
  ['choose u', 'substitution', 'strategy', 'pick', 'identify']
)

add(
  'How do you handle substitutions when du does not exactly match?',
  'Adjusting for missing factors in substitution: If du = g\'(x)dx differs from the integrand by a constant factor, multiply and divide. If the integrand has extra x terms or other functions of x that cannot be expressed in terms of u, substitution may not work — try another approach. Example: ∫x³·√(x²+1)dx. u=x²+1, du=2x dx. Rewrite x³ = x²·x, and x² = u−1. So ∫x²·√(x²+1)·x dx = ∫(u−1)·√u·(du/2) = (1/2)∫(u^(3/2) − u^(1/2))du = (1/2)[(2/5)u^(5/2) − (2/3)u^(3/2)] = (1/5)u^(5/2) − (1/3)u^(3/2) + C. ✓',
  'ch04p3_substitution_missing_factor',
  'problem_solving',
  ['substitution', 'missing factor', 'constant', 'adjust', 'manipulate']
)

add(
  'How do you use substitution for definite integrals?',
  'Substitution in definite integrals: Either (A) change the limits to u-values, or (B) integrate in u, then convert back to x and use original limits. Method A is faster. Example: ∫_0^1 2x·e^{x²}dx. Let u=x², du=2x dx. When x=0, u=0; when x=1, u=1. ∫_0^1 e^u du = [e^u]_0^1 = e − 1. ✓',
  'ch04p3_substitution_definite',
  'problem_solving',
  ['substitution', 'definite', 'change limits', 'u-values', 'integrate']
)

add(
  'How do you integrate using trigonometric substitution patterns?',
  'Recognizing trig substitutions in indefinite integrals: (1) ∫cos(g(x))·g\'(x)dx = sin(g(x))+C. (2) ∫sin(g(x))·g\'(x)dx = −cos(g(x))+C. (3) ∫sec²(g(x))·g\'(x)dx = tan(g(x))+C. (4) ∫1/(a²+x²)dx = (1/a)arctan(x/a)+C. (5) ∫1/√(a²−x²)dx = arcsin(x/a)+C. Example: ∫x/(1+x⁴)dx. Let u=x², du=2x dx. (1/2)∫1/(1+u²)du = (1/2)arctan(u)+C = (1/2)arctan(x²)+C. ✓',
  'ch04p3_trig_substitution_recognition',
  'formula_recall',
  ['trigonometric', 'substitution', 'arctan', 'arcsin', 'recognition']
)

// ============================================================
// SECTION 5 — INTEGRATION BY PARTS (6 items)
// ============================================================
add(
  'What is the integration by parts formula?',
  'Integration by parts: ∫u dv = uv − ∫v du. Derived from the product rule (d(uv)=u dv+v du, integrate both sides). Choose u and dv from the integrand; differentiate u to get du, integrate dv to get v. Useful for products of different types (polynomial×exponential, polynomial×trig, polynomial×log, etc.). Example: ∫x·eˣdx. Let u=x (du=dx), dv=eˣdx (v=eˣ). ∫x·eˣdx = x·eˣ − ∫eˣdx = x·eˣ − eˣ + C = eˣ(x−1) + C. ✓',
  'ch04p3_integration_by_parts',
  'formula_recall',
  ['integration by parts', 'product', 'LIATE', 'u dv', 'formula']
)

add(
  'What is the LIATE rule for choosing u in integration by parts?',
  'LIATE rule (priority for choosing u): L (Logarithm) > I (Inverse trig) > A (Algebraic/polynomial) > T (Trigonometric) > E (Exponential). Choose u from the category higher on the list; dv is the rest. Rationale: logs and inverse trig differentiate to simpler (algebraic) functions; exponentials and trig integrate to similar functions. Example: ∫x²·ln x dx. LIATE: ln x (L) before x² (A), so u=ln x (du=dx/x), dv=x²dx (v=x³/3). ∫x²·ln x dx = (x³/3)ln x − ∫(x³/3)(dx/x) = (x³/3)ln x − (1/3)∫x²dx = (x³/3)ln x − x³/9 + C. ✓',
  'ch04p3_liate_rule',
  'formula_recall',
  ['LIATE', 'choose u', 'priority', 'logarithm', 'inverse trig', 'algebraic', 'trig', 'exponential']
)

add(
  'How do you apply integration by parts multiple times?',
  'Repeated integration by parts: Apply the formula iteratively until the remaining integral is simpler or solvable. Each application reduces the polynomial degree (if u is polynomial) or transforms the integral. Example: ∫x²·eˣdx. First: u=x² (du=2x dx), dv=eˣdx (v=eˣ). = x²eˣ − ∫2x·eˣdx = x²eˣ − 2∫x·eˣdx. Second on ∫x·eˣdx: u=x (du=dx), dv=eˣdx (v=eˣ). = xeˣ − ∫eˣdx = xeˣ − eˣ. Combine: x²eˣ − 2(xeˣ − eˣ) + C = eˣ(x² − 2x + 2) + C. ✓',
  'ch04p3_repeated_integration_by_parts',
  'problem_solving',
  ['repeated', 'multiple times', 'integration by parts', 'iterative', 'polynomial']
)

add(
  'How do you use the tabular method (DI method) for integration by parts?',
  'Tabular (DI) method: For ∫(polynomial)·(exp or trig) dx. List derivatives of the polynomial (D column, differentiate until 0) and integrals of the other function (I column). Multiply diagonally with alternating signs (+, −, +, −, ...). Sum the products. Example: ∫x³·eˣdx. D: x³, 3x², 6x, 6, 0. I: eˣ, eˣ, eˣ, eˣ, eˣ. Products: x³eˣ − 3x²eˣ + 6xeˣ − 6eˣ + 0 = eˣ(x³ − 3x² + 6x − 6) + C. ✓',
  'ch04p3_tabular_method',
  'problem_solving',
  ['tabular', 'DI method', 'integration by parts', 'table', 'polynomial exponential']
)

add(
  'How do you integrate ln x and inverse trig functions using parts?',
  'Integration by parts for ln and inverse trig: Use u = ln or inverse trig (which differentiate to algebraic), and dv = dx (so v = x). Example: ∫ln x dx. u=ln x (du=dx/x), dv=dx (v=x). = x·ln x − ∫x·(dx/x) = x·ln x − ∫dx = x·ln x − x + C. Example 2: ∫arctan x dx. u=arctan x (du=dx/(1+x²)), dv=dx (v=x). = x·arctan x − ∫x/(1+x²)dx = x·arctan x − (1/2)ln(1+x²) + C. ✓',
  'ch04p3_integrate_ln_arctan',
  'problem_solving',
  ['ln x', 'inverse trig', 'arctan', 'integration by parts', 'u equals log']
)

add(
  'How do you solve a cyclic integration by parts problem?',
  'Cyclic integration by parts: For ∫eˣ·sin x dx or ∫eˣ·cos x dx (and similar), applying parts twice returns to the original integral. Solve algebraically. Example: ∫eˣ·sin x dx. u=sin x (du=cos x dx), dv=eˣdx (v=eˣ). I = eˣsin x − ∫eˣcos x dx. Apply parts to ∫eˣcos x dx: u=cos x (du=−sin x dx), dv=eˣdx (v=eˣ). = eˣcos x + ∫eˣsin x dx = eˣcos x + I. Substitute: I = eˣsin x − (eˣcos x + I). 2I = eˣ(sin x − cos x). I = (1/2)eˣ(sin x − cos x) + C. ✓',
  'ch04p3_cyclic_integration_parts',
  'problem_solving',
  ['cyclic', 'circular', 'integration by parts', 'exponential trig', 'solve algebraically']
)

// ============================================================
// SECTION 6 — TRIGONOMETRIC INTEGRALS (6 items)
// ============================================================
add(
  'How do you integrate powers of sine and cosine?',
  'Integrating powers of sin and cos: (1) Odd power of sin: peel off one sin, use sin²=1−cos², substitute u=cos. (2) Odd power of cos: peel off one cos, use cos²=1−sin², substitute u=sin. (3) Both even: use half-angle identities sin²=(1−cos2x)/2, cos²=(1+cos2x)/2. Example: ∫sin³x cos²x dx = ∫sin x·(1−cos²x)·cos²x dx. u=cos x, du=−sin x dx: −∫(1−u²)u² du = −∫(u²−u⁴)du = −u³/3 + u⁵/5 + C = −cos³x/3 + cos⁵x/5 + C. ✓',
  'ch04p3_powers_sin_cos',
  'problem_solving',
  ['powers', 'sine', 'cosine', 'odd even', 'half-angle', 'Pythagorean']
)

add(
  'How do you integrate powers of secant and tangent?',
  'Integrating powers of sec and tan: (1) Even power of sec: peel off sec², use sec²=1+tan², substitute u=tan. (2) Odd power of tan: peel off sec·tan (using tan²=sec²−1), substitute u=sec. (3) ∫secⁿx dx (odd n): reduction. ∫tanⁿx dx (any n): reduction. Example: ∫tan³x·sec³x dx = ∫tan²x·sec²x·(sec x tan x) dx = ∫(sec²x−1)·sec²x·(sec x tan x) dx. u=sec x, du=sec x tan x dx. ∫(u²−1)u² du = ∫(u⁴−u²)du = u⁵/5 − u³/3 + C = sec⁵x/5 − sec³x/3 + C. ✓',
  'ch04p3_powers_sec_tan',
  'problem_solving',
  ['powers', 'secant', 'tangent', 'reduction', 'Pythagorean']
)

add(
  'What are the reduction formulas for sine and cosine?',
  'Reduction formulas: ∫sinⁿx dx = −sinⁿ⁻¹x·cosx/n + (n−1)/n·∫sinⁿ⁻²x dx. ∫cosⁿx dx = sinⁿ⁻¹x·sinx/n + (n−1)/n·∫cosⁿ⁻²x dx. Reduces the power by 2 each use; eventually reaches ∫sin x dx = −cos x or ∫dx = x. Example: ∫sin⁴x dx. n=4: = −sin³x·cosx/4 + (3/4)∫sin²x dx. Then ∫sin²x dx: n=2: = −sin x·cosx/2 + (1/2)∫dx = −sin x·cosx/2 + x/2. Combine: −sin³x·cosx/4 + (3/4)(−sin x·cosx/2 + x/2) + C = −sin³x·cosx/4 − 3sin x·cosx/8 + 3x/8 + C. ✓',
  'ch04p3_reduction_sin_cos',
  'formula_recall',
  ['reduction', 'formula', 'sine', 'cosine', 'power', 'recursive']
)

add(
  'How do you integrate products of trig functions with different angles?',
  'Products of trig with different angles: Use product-to-sum identities. sin A cos B = (1/2)[sin(A+B) + sin(A−B)]. cos A cos B = (1/2)[cos(A+B) + cos(A−B)]. sin A sin B = (1/2)[cos(A−B) − cos(A+B)]. Example: ∫sin(3x)cos(2x)dx = (1/2)∫[sin(5x) + sin(x)]dx = (1/2)[−cos(5x)/5 − cos x] + C = −cos(5x)/10 − cos x/2 + C. ✓',
  'ch04p3_trig_products_angles',
  'problem_solving',
  ['product to sum', 'different angles', 'trig product', 'identity', 'integrate']
)

add(
  'How do you integrate using half-angle and double-angle identities?',
  'Integrating via half-angle/double-angle: Use sin²x=(1−cos2x)/2, cos²x=(1+cos2x)/2, sin x cos x = sin(2x)/2. Example: ∫cos⁴x dx. cos⁴x = (cos²x)² = ((1+cos2x)/2)² = (1/4)(1 + 2cos2x + cos²2x) = (1/4)(1 + 2cos2x + (1+cos4x)/2) = (1/4)(3/2 + 2cos2x + cos4x/2) = 3/8 + cos2x/2 + cos4x/8. ∫cos⁴x dx = 3x/8 + sin2x/4 + sin4x/32 + C. ✓',
  'ch04p3_half_angle_integration',
  'problem_solving',
  ['half-angle', 'double-angle', 'identity', 'even power', 'integrate']
)

add(
  'What are the integrals of secant, cosecant, and tangent?',
  'Standard trig integrals: ∫sec x dx = ln|sec x + tan x| + C. ∫csc x dx = −ln|csc x + cot x| + C = ln|csc x − cot x| + C. ∫tan x dx = −ln|cos x| + C = ln|sec x| + C. ∫cot x dx = ln|sin x| + C. Derivation of ∫sec x dx: multiply by (sec x + tan x)/(sec x + tan x). Example: ∫sec³x dx. By parts: u=sec x, dv=sec²x dx. = sec x tan x − ∫sec x tan²x dx = sec x tan x − ∫sec x(sec²x−1) dx = sec x tan x − ∫sec³x dx + ∫sec x dx. 2∫sec³x dx = sec x tan x + ln|sec x + tan x|. ∫sec³x dx = (1/2)(sec x tan x + ln|sec x + tan x|) + C. ✓',
  'ch04p3_sec_csc_tan_integrals',
  'formula_recall',
  ['secant', 'cosecant', 'tangent', 'integral', 'ln', 'standard']
)

// ============================================================
// SECTION 7 — TRIGONOMETRIC SUBSTITUTION (5 items)
// ============================================================
add(
  'When and how do you use sine substitution for integration?',
  'Sine substitution: Use x = a·sin θ when integrand contains √(a² − x²). Then √(a²−x²) = a·cos θ, dx = a·cos θ dθ, and the radical simplifies. Limits: if x∈[−a,a], θ∈[−π/2, π/2]. Example: ∫√(4−x²)dx. x=2sin θ, dx=2cos θ dθ. √(4−x²)=2cos θ. ∫2cos θ·2cos θ dθ = 4∫cos²θ dθ = 4·(θ/2 + sin2θ/4) + C = 2θ + sin2θ + C. Back-substitute: θ=arcsin(x/2), sin2θ=2sin θ cos θ=2(x/2)(√(4−x²)/2)=x√(4−x²)/2. Answer: 2arcsin(x/2) + (x/2)√(4−x²) + C. ✓',
  'ch04p3_sine_substitution',
  'problem_solving',
  ['sine substitution', 'trig substitution', 'square root', 'a squared minus x squared']
)

add(
  'When and how do you use tangent substitution for integration?',
  'Tangent substitution: Use x = a·tan θ when integrand contains √(a² + x²). Then √(a²+x²) = a·sec θ, dx = a·sec²θ dθ. θ∈(−π/2, π/2). Example: ∫1/(x²√(x²+1)) dx. x=tan θ, dx=sec²θ dθ, √(x²+1)=sec θ. ∫1/(tan²θ·sec θ)·sec²θ dθ = ∫sec θ/tan²θ dθ = ∫(1/cos θ)·(cos²θ/sin²θ) dθ = ∫cos θ/sin²θ dθ. u=sin θ, du=cos θ dθ: ∫du/u² = −1/u = −1/sin θ = −csc θ. Back: csc θ = √(x²+1)/x. Answer: −√(x²+1)/x + C. ✓',
  'ch04p3_tangent_substitution',
  'problem_solving',
  ['tangent substitution', 'trig substitution', 'square root', 'a squared plus x squared']
)

add(
  'When and how do you use secant substitution for integration?',
  'Secant substitution: Use x = a·sec θ when integrand contains √(x² − a²). Then √(x²−a²) = a·tan θ, dx = a·sec θ tan θ dθ. Use θ∈[0, π/2) for x>a, θ∈(π/2, π] for x<−a. Example: ∫√(x²−9)/x dx. x=3sec θ, dx=3sec θ tan θ dθ, √(x²−9)=3tan θ. ∫(3tan θ)/(3sec θ)·3sec θ tan θ dθ = 3∫tan²θ dθ = 3∫(sec²θ−1)dθ = 3tan θ − 3θ + C. Back: tan θ = √(x²−9)/3, θ = arcsec(x/3) = arccos(3/x). Answer: √(x²−9) − 3·arccos(3/x) + C. ✓',
  'ch04p3_secant_substitution',
  'problem_solving',
  ['secant substitution', 'trig substitution', 'square root', 'x squared minus a squared']
)

add(
  'How do you complete the square before trig substitution?',
  'Completing the square before trig substitution: When the quadratic under the radical is not in the form a²±x², complete the square first. Example: ∫dx/√(x²−4x+3). Complete: x²−4x+3 = (x−2)²−1. Let u=x−2. ∫du/√(u²−1). Now secant substitution: u=sec θ, du=sec θ tan θ dθ, √(u²−1)=tan θ. ∫sec θ dθ = ln|sec θ + tan θ| + C = ln|u + √(u²−1)| + C = ln|x−2 + √(x²−4x+3)| + C. ✓',
  'ch04p3_complete_square_trig_sub',
  'problem_solving',
  ['complete the square', 'trig substitution', 'quadratic', 'shift', 'radical']
)

add(
  'What is the summary table for trigonometric substitutions?',
  'Trig substitution summary: (1) Form √(a²−x²): use x=a sin θ, radical becomes a cos θ, dx=a cos θ dθ. (2) Form √(a²+x²): use x=a tan θ, radical becomes a sec θ, dx=a sec²θ dθ. (3) Form √(x²−a²): use x=a sec θ, radical becomes a tan θ, dx=a sec θ tan θ dθ. Mnemonic: "sin for minus (a²−x²), tan for plus (a²+x²), sec for x²−a²". Example: √(9−x²) → x=3sin θ. √(9+x²) → x=3tan θ. √(x²−9) → x=3sec θ. ✓',
  'ch04p3_trig_sub_summary',
  'formula_recall',
  ['summary', 'trig substitution', 'table', 'sin tan sec', 'mnemonic']
)

// ============================================================
// SECTION 8 — PARTIAL FRACTIONS (6 items)
// ============================================================
add(
  'What is partial fraction decomposition?',
  'Partial fraction decomposition: Splits a rational P(x)/Q(x) (with deg P < deg Q) into a sum of simpler fractions based on the factors of Q. Cases: (1) Linear factor (ax+b): A/(ax+b). (2) Repeated linear (ax+b)ⁿ: A₁/(ax+b) + A₂/(ax+b)² + ... + Aₙ/(ax+b)ⁿ. (3) Irreducible quadratic (ax²+bx+c): (Ax+B)/(ax²+bx+c). (4) Repeated irreducible quadratic: similar to repeated linear. If deg P ≥ deg Q, do long division first. Example: (2x+1)/(x²−1) = (2x+1)/((x−1)(x+1)) = A/(x−1) + B/(x+1). ✓',
  'ch04p3_partial_fractions',
  'formula_recall',
  ['partial fractions', 'decomposition', 'rational', 'linear quadratic factors']
)

add(
  'How do you integrate using partial fractions with distinct linear factors?',
  'Distinct linear factors: P(x)/[(x−r₁)(x−r₂)...(x−rₙ)] = A₁/(x−r₁) + A₂/(x−r₂) + ... + Aₙ/(x−rₙ). Solve for Aᵢ by covering up (x−rᵢ) and evaluating at x=rᵢ. Example: ∫(5x−4)/(x²−x−2) dx = ∫(5x−4)/((x−2)(x+1)) dx. A/(x−2) + B/(x+1). A = (5(2)−4)/(2+1) = 6/3 = 2. B = (5(−1)−4)/(−1−2) = (−9)/(−3) = 3. So ∫[2/(x−2) + 3/(x+1)]dx = 2ln|x−2| + 3ln|x+1| + C. ✓',
  'ch04p3_partial_fractions_linear',
  'problem_solving',
  ['partial fractions', 'distinct linear', 'cover up', 'evaluate', 'integrate']
)

add(
  'How do you integrate using partial fractions with repeated linear factors?',
  'Repeated linear factors: For (x−r)ᵏ in denominator, include A₁/(x−r) + A₂/(x−r)² + ... + Aₖ/(x−r)ᵏ. Example: ∫x²/(x−1)³ dx. = A/(x−1) + B/(x−1)² + C/(x−1)³. Multiply by (x−1)³: x² = A(x−1)² + B(x−1) + C. Expand: x² = A(x²−2x+1) + Bx − B + C = Ax² + (−2A+B)x + (A−B+C). Match: A=1, −2A+B=0 ⇒ B=2, A−B+C=0 ⇒ 1−2+C=0 ⇒ C=1. So ∫[1/(x−1) + 2/(x−1)² + 1/(x−1)³]dx = ln|x−1| − 2/(x−1) − 1/(2(x−1)²) + C. ✓',
  'ch04p3_partial_fractions_repeated',
  'problem_solving',
  ['partial fractions', 'repeated linear', 'powers', 'decompose', 'integrate']
)

add(
  'How do you integrate using partial fractions with irreducible quadratics?',
  'Irreducible quadratic factors: For (ax²+bx+c) in denominator (with b²−4ac<0), use (Ax+B)/(ax²+bx+c). Complete the square in denominator to integrate. Example: ∫(3x+2)/(x²+1) dx = ∫3x/(x²+1) dx + ∫2/(x²+1) dx = (3/2)ln(x²+1) + 2arctan x + C. (Here numerator already has linear form for irreducible quadratic x²+1.) ✓',
  'ch04p3_partial_fractions_quadratic',
  'problem_solving',
  ['partial fractions', 'irreducible quadratic', 'complete the square', 'arctan']
)

add(
  'How do you handle an improper rational function before partial fractions?',
  'Improper rational function (deg P ≥ deg Q): Perform polynomial long division first to get P(x)/Q(x) = (polynomial) + (proper rational). Then apply partial fractions to the proper part. Example: ∫x³/(x²−1) dx. Divide: x³ = (x²−1)·x + x. So x³/(x²−1) = x + x/(x²−1) = x + x/((x−1)(x+1)) = x + (1/2)[1/(x−1) + 1/(x+1)]. ∫ = x²/2 + (1/2)ln|x−1| + (1/2)ln|x+1| + C = x²/2 + (1/2)ln|x²−1| + C. ✓',
  'ch04p3_partial_fractions_long_division',
  'problem_solving',
  ['long division', 'improper rational', 'partial fractions', 'polynomial', 'divide']
)

add(
  'How do you integrate rational functions of sin and cos (Weierstrass substitution)?',
  'Weierstrass substitution (t = tan(x/2)): Converts ∫R(sin x, cos x)dx into a rational function integral. Use: sin x = 2t/(1+t²), cos x = (1−t²)/(1+t²), dx = 2dt/(1+t²). Example: ∫dx/(2+cos x). t=tan(x/2). = ∫[2dt/(1+t²)] / [2 + (1−t²)/(1+t²)] = ∫2dt / [2(1+t²) + (1−t²)] = ∫2dt/(3+t²) = (2/√3)arctan(t/√3) + C = (2/√3)arctan(tan(x/2)/√3) + C. ✓',
  'ch04p3_weierstrass_substitution',
  'problem_solving',
  ['Weierstrass', 'tan(x/2)', 'rational trig', 'universal', 'substitution']
)

// ============================================================
// SECTION 9 — IMPROPER INTEGRALS (5 items)
// ============================================================
add(
  'What are improper integrals and their types?',
  'Improper integrals: Integrals where either (a) at least one limit is infinite (∫_a^∞ or ∫_{−∞}^b or ∫_{−∞}^∞), or (b) the integrand has a vertical asymptote within the interval (∫_a^b f with f→±∞ at some c in [a,b]). Evaluate as limits. Example: ∫_1^∞ 1/x² dx = lim(b→∞) [−1/x]_1^b = lim(b→∞) (−1/b + 1) = 0 + 1 = 1. (Converges to 1.) ✓',
  'ch04p3_improper_integrals_types',
  'formula_recall',
  ['improper', 'infinite limit', 'vertical asymptote', 'types', 'converge diverge']
)

add(
  'How do you evaluate an improper integral with an infinite limit?',
  'Improper integral with infinite limit: ∫_a^∞ f(x)dx = lim(b→∞) ∫_a^b f(x)dx. If the limit exists (finite), the integral converges; otherwise diverges. For ∫_{−∞}^b: lim(a→−∞) ∫_a^b. For ∫_{−∞}^∞: split at any c: ∫_{−∞}^c + ∫_c^∞, both must converge. Example: ∫_0^∞ e^(−x) dx = lim(b→∞) [−e^(−x)]_0^b = lim(−e^(−b) + 1) = 0 + 1 = 1. (Converges.) ✓',
  'ch04p3_improper_infinite_limit',
  'problem_solving',
  ['improper', 'infinite limit', 'infinity', 'converge', 'evaluate as limit']
)

add(
  'How do you evaluate an improper integral with an unbounded integrand?',
  'Improper integral with unbounded integrand: If f has a vertical asymptote at c ∈ [a,b], split: ∫_a^b f(x)dx = lim(t→c⁻) ∫_a^t f + lim(s→c⁺) ∫_s^b f (both must converge). For asymptote at endpoint: ∫_a^b f(x)dx = lim(t→b⁻) ∫_a^t f (if asymptote at b). Example: ∫_0^1 1/√x dx = lim(t→0⁺) ∫_t^1 x^(−1/2)dx = lim[2√x]_t^1 = lim(2 − 2√t) = 2 − 0 = 2. (Converges.) ✓',
  'ch04p3_improper_unbounded_integrand',
  'problem_solving',
  ['improper', 'unbounded', 'vertical asymptote', 'singularity', 'limit']
)

add(
  'What is the p-test for improper integrals?',
  'p-test for ∫_a^∞ 1/xᵖ dx (a>0): Converges if p>1, diverges if p≤1. p-test for ∫_0^a 1/xᵖ dx (a>0): Converges if p<1, diverges if p≥1. Example: ∫_1^∞ 1/x² dx converges (p=2>1), equals 1. ∫_1^∞ 1/x dx diverges (p=1). ∫_0^1 1/√x dx converges (p=1/2<1), equals 2. ∫_0^1 1/x² dx diverges (p=2≥1). ✓',
  'ch04p3_p_test_improper',
  'formula_recall',
  ['p-test', 'improper', 'converge diverge', '1/x^p', 'comparison']
)

add(
  'What are the comparison tests for improper integrals?',
  'Comparison tests for improper integrals: (1) Direct comparison: If 0 ≤ f(x) ≤ g(x) on [a,∞) and ∫g converges, then ∫f converges. If 0 ≤ f(x) ≤ g(x) and ∫f diverges, then ∫g diverges. (2) Limit comparison: If lim(x→∞) f(x)/g(x) = L with 0<L<∞, then ∫f and ∫g converge or diverge together. Example: Does ∫_1^∞ 1/(x²+1) dx converge? Compare to 1/x²: lim(1/(x²+1))/(1/x²) = lim x²/(x²+1) = 1. Since ∫1/x² converges (p=2>1), ∫1/(x²+1) converges. ✓',
  'ch04p3_comparison_tests',
  'formula_recall',
  ['comparison test', 'limit comparison', 'improper', 'converge', 'bound']
)

// ============================================================
// SECTION 10 — APPLICATIONS: AREA BETWEEN CURVES (4 items)
// ============================================================
add(
  'How do you find the area between two curves?',
  'Area between curves: If f(x) ≥ g(x) on [a,b], A = ∫_a^b [f(x) − g(x)]dx. If curves cross, find intersection points and split the integral, using the upper minus lower on each subinterval. Example: Area between y=x² and y=x+2. Intersections: x²=x+2 ⇒ x²−x−2=0 ⇒ (x−2)(x+1)=0 ⇒ x=−1,2. On [−1,2], x+2 ≥ x². A = ∫_{−1}^2 [(x+2)−x²]dx = [x²/2+2x−x³/3]_{−1}^2 = (2+4−8/3) − (1/2−2+1/3) = (10/3) − (−7/6) = 10/3+7/6 = 20/6+7/6 = 27/6 = 9/2. ✓',
  'ch04p3_area_between_curves',
  'problem_solving',
  ['area', 'between curves', 'upper lower', 'intersection', 'integrate']
)

add(
  'How do you find area using horizontal strips (integrating with respect to y)?',
  'Area with horizontal strips: If curves are x=f(y) (right) and x=g(y) (left) with f(y) ≥ g(y) on [c,d], A = ∫_c^d [f(y) − g(y)]dy. Useful when the region is easier to describe with y as the independent variable. Example: Region bounded by x=y² and x=y+2. Solve y²=y+2 ⇒ y²−y−2=0 ⇒ y=−1,2. Right curve: y+2, left: y². A = ∫_{−1}^2 [(y+2)−y²]dy = [y²/2+2y−y³/3]_{−1}^2 = (2+4−8/3) − (1/2−2+1/3) = 10/3 − (−7/6) = 27/6 = 9/2. (Same as before — confirms.) ✓',
  'ch04p3_area_horizontal_strips',
  'problem_solving',
  ['area', 'horizontal strips', 'with respect to y', 'right left', 'integrate dy']
)

add(
  'How do you find the area enclosed by a polar curve?',
  'Area in polar coordinates: A = (1/2)∫_α^β r² dθ, where r=f(θ) and the region is traced from θ=α to θ=β. For area between two polar curves r₁(θ) (outer) and r₂(θ) (inner): A = (1/2)∫[r₁² − r₂²]dθ. Example: Area inside r=2cos θ (circle). θ from −π/2 to π/2 (full trace). A = (1/2)∫_{−π/2}^{π/2} 4cos²θ dθ = 2∫_{−π/2}^{π/2} (1+cos2θ)/2 dθ = ∫_{−π/2}^{π/2} (1+cos2θ)dθ = [θ + sin2θ/2]_{−π/2}^{π/2} = (π/2+0) − (−π/2+0) = π. (Circle of radius 1 has area π ✓.) ✓',
  'ch04p3_area_polar',
  'problem_solving',
  ['polar area', 'r squared', 'polar curve', 'sector', 'integrate d theta']
)

add(
  'How do you find the area between two polar curves?',
  'Area between polar curves: A = (1/2)∫_α^β [r_outer²(θ) − r_inner²(θ)]dθ, where r_outer ≥ r_inner on [α,β]. Find intersection angles by solving r₁(θ)=r₂(θ). Example: Area inside r=2 and outside r=1 (annulus). For full region, θ∈[0,2π]. A = (1/2)∫_0^{2π} [4−1]dθ = (1/2)(3)(2π) = 3π. (Annulus with R=2, r=1: π(R²−r²)=3π ✓.) ✓',
  'ch04p3_area_between_polar',
  'problem_solving',
  ['polar', 'area between', 'two curves', 'annulus', 'r squared difference']
)

// ============================================================
// SECTION 11 — APPLICATIONS: VOLUMES (6 items)
// ============================================================
add(
  'How do you find volume using the disk method?',
  'Disk method (rotation about x-axis): V = π∫_a^b [f(x)]² dx, where f(x) is the radius (distance from curve to axis). Used when the region is bounded by y=f(x), y=0, x=a, x=b and rotated about the x-axis. Example: Volume of solid from rotating y=√x on [0,4] about x-axis. V = π∫_0^4 x dx = π[x²/2]_0^4 = π(8) = 8π. ✓',
  'ch04p3_disk_method',
  'problem_solving',
  ['disk method', 'volume', 'revolution', 'solid of revolution', 'pi r squared']
)

add(
  'How do you find volume using the washer method?',
  'Washer method (region between two curves rotated): V = π∫_a^b ([R(x)]² − [r(x)]²)dx, where R(x) is the outer radius (distance from outer curve to axis) and r(x) is the inner radius. Example: Rotate region between y=x and y=x² about x-axis, x∈[0,1]. R=x (outer), r=x² (inner). V = π∫_0^1 (x² − x⁴)dx = π[x³/3 − x⁵/5]_0^1 = π(1/3 − 1/5) = π(5/15 − 3/15) = 2π/15. ✓',
  'ch04p3_washer_method',
  'problem_solving',
  ['washer method', 'volume', 'two curves', 'outer inner radius', 'revolution']
)

add(
  'How do you find volume using the shell method?',
  'Shell method (cylindrical shells): V = 2π∫_a^b (radius)(height)dx, where radius is the distance from the slice to the axis of rotation, and height is the length of the slice. Used especially for rotation about the y-axis with y=f(x): V = 2π∫_a^b x·f(x)dx. Example: Rotate region under y=x² on [0,2] about y-axis. V = 2π∫_0^2 x·x² dx = 2π∫_0^2 x³ dx = 2π[x⁴/4]_0^2 = 2π(4) = 8π. ✓',
  'ch04p3_shell_method',
  'problem_solving',
  ['shell method', 'cylindrical shells', 'volume', 'revolution', '2 pi r h']
)

add(
  'How do you choose between disk, washer, and shell methods?',
  'Choosing volume method: (1) Disk: one curve, axis is a boundary (no hole). (2) Washer: region between two curves rotated, or one curve not touching axis (hole in middle). (3) Shell: integrate perpendicular to axis (e.g., dx for rotation about y-axis). Shell often easier when integrating in x for y-axis rotation (or dy for x-axis rotation). Example: Rotate y=x²+1, y=0, x=0, x=2 about y-axis. Shell (in x): V=2π∫_0^2 x(x²+1)dx = 2π[x⁴/4+x²/2]_0^2 = 2π(4+2) = 12π. Washer (in y, harder due to inverse): split y∈[1,5] vs y∈[0,1]. Shell is simpler here. ✓',
  'ch04p3_choose_volume_method',
  'problem_solving',
  ['choose', 'disk washer shell', 'method', 'strategy', 'which is easier']
)

add(
  'How do you find the volume of a solid with known cross-sections?',
  'Volume from cross-sections: If cross-sections perpendicular to the x-axis have area A(x), then V = ∫_a^b A(x)dx. Common shapes: squares (A=s²), equilateral triangles (A=(√3/4)s²), semicircles (A=(π/8)s²), where s is the side/diameter length (often the distance between two curves). Example: Base is circle x²+y²=4; cross-sections perpendicular to x-axis are squares with side 2y=2√(4−x²). A(x) = (2√(4−x²))² = 4(4−x²) = 16−4x². V = ∫_{−2}^2 (16−4x²)dx = [16x − 4x³/3]_{−2}^2 = (32−32/3) − (−32+32/3) = 64 − 64/3 = 128/3. ✓',
  'ch04p3_cross_sections',
  'problem_solving',
  ['cross sections', 'volume', 'known area', 'perpendicular', 'squares triangles']
)

add(
  'How do you find the volume of a solid of revolution about a line other than the axes?',
  'Volume of revolution about a general line: Use the disk/washer/shell method with adjusted radii. For rotation about y=k (horizontal line): outer radius = (top curve) − k, inner = (bottom) − k (adjust signs). For rotation about x=h (vertical line): shell radius = x − h. Example: Rotate region under y=x² on [0,2] about y=−1. Outer radius = x² − (−1) = x²+1, inner = 0−(−1)=1 (distance from y=0 to y=−1). Washer: V = π∫_0^2 [(x²+1)² − 1²]dx = π∫_0^2 (x⁴+2x²)dx = π[x⁵/5 + 2x³/3]_0^2 = π(32/5+16/3) = π(96/15+80/15) = 176π/15. ✓',
  'ch04p3_revolution_general_line',
  'problem_solving',
  ['revolution', 'general line', 'y equals k', 'x equals h', 'shifted axis']
)

// ============================================================
// SECTION 12 — APPLICATIONS: ARC LENGTH & SURFACE AREA (4 items)
// ============================================================
add(
  'What is the formula for arc length of a curve?',
  'Arc length of y=f(x) from a to b: L = ∫_a^b √(1 + [f\'(x)]²)dx. For parametric curves x=x(t), y=y(t) from t=α to t=β: L = ∫_α^β √([dx/dt]² + [dy/dt]²)dt. For polar r=f(θ) from α to β: L = ∫_α^β √(r² + [dr/dθ]²)dθ. Example: Arc length of y=x^(3/2) on [0,4]. f\'(x)=(3/2)x^(1/2), [f\']²=(9/4)x. L = ∫_0^4 √(1+(9/4)x)dx. u=1+(9/4)x, du=(9/4)dx. (4/9)∫√u du = (4/9)(2/3)u^(3/2) = (8/27)(1+9x/4)^(3/2)|_0^4 = (8/27)(10^(3/2)−1) ≈ (8/27)(30.62) ≈ 9.07. ✓',
  'ch04p3_arc_length',
  'formula_recall',
  ['arc length', 'curve', 'sqrt 1 plus f prime squared', 'parametric', 'polar']
)

add(
  'What is the formula for the surface area of a solid of revolution?',
  'Surface area of revolution: Rotating y=f(x) about x-axis on [a,b]: S = 2π∫_a^b f(x)·√(1+[f\'(x)]²)dx (assuming f(x)≥0). About y-axis: S = 2π∫_a^b x·√(1+[f\'(x)]²)dx. Parametric about x-axis: S = 2π∫y(t)·√([x\']²+[y\']²)dt. Example: Surface area of sphere of radius r. Rotate y=√(r²−x²) about x-axis on [−r,r]. f\'=−x/√(r²−x²), 1+[f\']²=1+x²/(r²−x²)=r²/(r²−x²). √(...)=r/√(r²−x²). S=2π∫_{−r}^r √(r²−x²)·r/√(r²−x²)dx = 2πr∫_{−r}^r dx = 2πr·2r = 4πr². (Confirms sphere formula ✓.) ✓',
  'ch04p3_surface_area_revolution',
  'formula_recall',
  ['surface area', 'revolution', '2 pi f sqrt', 'sphere', 'rotate']
)

add(
  'How do you find arc length in polar coordinates?',
  'Arc length in polar: For r=f(θ) from θ=α to θ=β: L = ∫_α^β √(r² + [dr/dθ]²)dθ. Derived from x=r cos θ, y=r sin θ and parametric formula. Example: Arc length of cardioid r=1+cos θ. dr/dθ=−sin θ. r²+(dr/dθ)²=(1+cos θ)²+sin²θ = 1+2cos θ+cos²θ+sin²θ = 2+2cos θ = 4cos²(θ/2). √=2|cos(θ/2)|. L = ∫_0^{2π} 2cos(θ/2)dθ = 4sin(θ/2)|_0^{2π} = 4(sin π − sin 0) = 4(0−0) = 0? Wait — cos(θ/2) changes sign; use |cos(θ/2)|. By symmetry, L = 2∫_0^π 2cos(θ/2)dθ = 4[sin(θ/2)·2]_0^π = 8(sin(π/2)−0) = 8. ✓',
  'ch04p3_arc_length_polar',
  'problem_solving',
  ['arc length', 'polar', 'r squared plus dr squared', 'cardioid']
)

add(
  'How do you find the surface area of a parametric curve rotated?',
  'Surface area of parametric curve rotated: For x=x(t), y=y(t), α≤t≤β, rotated about x-axis: S = 2π∫_α^β y(t)·√([x\'(t)]² + [y\'(t)]²)dt (requires y(t)≥0). About y-axis: S = 2π∫_α^β x(t)·√([x\']²+[y\']²)dt. Example: Rotate the parametric curve x=3t², y=2t³, 0≤t≤1 about y-axis. x\'=6t, y\'=6t². √(36t²+36t⁴)=6t√(1+t²). S=2π∫_0^1 3t²·6t√(1+t²)dt = 36π∫_0^1 t³√(1+t²)dt. u=1+t², du=2t dt, t²=u−1. = 36π·(1/2)∫_1^2 (u−1)√u du = 18π∫_1^2 (u^(3/2)−u^(1/2))du = 18π[(2/5)u^(5/2)−(2/3)u^(3/2)]_1^2 = 18π[(2/5)(4√2)−(2/3)(2√2)−(2/5−2/3)] = 18π[(8√2/5)−(4√2/3)−(−4/15)] ≈ ... (compute numerically) ✓',
  'ch04p3_surface_area_parametric',
  'problem_solving',
  ['surface area', 'parametric', 'rotation', 'revolution', '2 pi x or y']
)

// ============================================================
// SECTION 13 — APPLICATIONS: WORK, FORCE, CENTER OF MASS (6 items)
// ============================================================
add(
  'How do you compute work done by a variable force?',
  'Work by variable force: If F(x) is the force applied over distance x, W = ∫_a^b F(x)dx. For a spring (Hooke\'s law): F=kx, W = ∫_0^x kx dx = (1/2)kx². Example: Spring with k=200 N/m. Work to stretch from x=0.1 to x=0.3 m: W = ∫_0.1^0.3 200x dx = 100x²|_0.1^0.3 = 100(0.09 − 0.01) = 100(0.08) = 8 J. ✓',
  'ch04p3_work_variable_force',
  'problem_solving',
  ['work', 'variable force', 'spring', 'Hooke', 'integrate F dx']
)

add(
  'How do you compute work to pump liquid out of a tank?',
  'Work to pump liquid: Slice the tank into horizontal layers. Each layer at height y has volume dV (often A(y)dy), weight density ρg (or just w), and must be lifted distance D(y) to the exit. W = ∫ ρg·A(y)·D(y)dy. Example: Cylindrical tank (radius 2 m, height 5 m) full of water (ρg=9800 N/m³), pump out the top. Slice at depth y from top: layer is at height (5−y) below top, must be lifted y up. A=π(2)²=4π. W = ∫_0^5 9800·4π·y dy = 39200π[y²/2]_0^5 = 39200π·12.5 = 490000π ≈ 1,539,380 J. ✓',
  'ch04p3_work_pump_liquid',
  'problem_solving',
  ['work', 'pump', 'tank', 'liquid', 'water', 'slice']
)

add(
  'How do you find the center of mass of a thin rod with variable density?',
  'Center of mass of a rod: For rod on [a,b] with density ρ(x), the center of mass x̄ = (∫_a^b x·ρ(x)dx)/(∫_a^b ρ(x)dx) = M/M_total, where M is the moment and M_total is the total mass. Example: Rod on [0,2] with density ρ(x)=x². M_total = ∫_0^2 x² dx = 8/3. M = ∫_0^2 x·x² dx = ∫_0^2 x³ dx = 4. x̄ = 4/(8/3) = 12/8 = 3/2 = 1.5. ✓',
  'ch04p3_center_of_mass_rod',
  'problem_solving',
  ['center of mass', 'rod', 'density', 'moment', 'centroid']
)

add(
  'How do you find the centroid of a planar region?',
  'Centroid of a region: For region bounded by y=f(x), y=0, x=a, x=b (with f≥0), the centroid (x̄, ȳ) is: x̄ = (1/A)∫_a^b x·f(x)dx, ȳ = (1/(2A))∫_a^b [f(x)]²dx, where A = ∫_a^b f(x)dx is the area. For symmetric regions, centroid lies on the axis of symmetry. Example: Triangle with vertices (0,0), (2,0), (0,4). Bounded by y=−2x+4 and axes. A = (1/2)(2)(4) = 4. x̄ = (1/4)∫_0^2 x(−2x+4)dx = (1/4)∫_0^2 (−2x²+4x)dx = (1/4)[−2x³/3+2x²]_0^2 = (1/4)(−16/3+8) = (1/4)(8/3) = 2/3. ȳ = (1/8)∫_0^2 (−2x+4)²dx = (1/8)∫_0^2 (4x²−16x+16)dx = (1/8)[4x³/3−8x²+16x]_0^2 = (1/8)(32/3−32+32) = (1/8)(32/3) = 4/3. Centroid: (2/3, 4/3). (Known: centroid of triangle = average of vertices = (2/3, 4/3) ✓.) ✓',
  'ch04p3_centroid_region',
  'problem_solving',
  ['centroid', 'planar region', 'center of mass', 'uniform density', 'lamina']
)

add(
  'How do you compute hydrostatic force on a vertical surface?',
  'Hydrostatic force: F = ∫ ρg·h(y)·L(y)dy, where h(y) is the depth of the slice from the surface, L(y) is the length of the horizontal slice at depth h, ρ is fluid density, g is gravity. Pressure at depth h is ρgh; force on a thin strip is pressure × area. Example: Vertical rectangular plate 2 m wide, 3 m tall, top at surface. Water (ρg=9800 N/m³). At depth y (from top), L=2 (constant width). F = ∫_0^3 9800·y·2 dy = 19600[y²/2]_0^3 = 19600·4.5 = 88,200 N. ✓',
  'ch04p3_hydrostatic_force',
  'problem_solving',
  ['hydrostatic force', 'fluid', 'pressure', 'depth', 'vertical plate']
)

add(
  'What are the Theorems of Pappus for volume and surface area?',
  'Pappus\'s Theorems: (1) Volume: If a plane region R is rotated about an external axis (not intersecting R), the volume of the solid = (Area of R) × (distance traveled by the centroid of R) = A·(2πd), where d is the distance from the centroid to the axis. (2) Surface area: If a plane curve C is rotated about an external axis, surface area = (length of C) × (2πd), where d is the distance from the centroid of C to the axis. Example: Torus from rotating circle of radius r (center at distance R from axis): V = πr²·2πR = 2π²Rr². S = 2πr·2πR = 4π²Rr. ✓',
  'ch04p3_pappus_theorems',
  'formula_recall',
  ['Pappus', 'theorem', 'volume', 'surface area', 'centroid', 'torus']
)

// ============================================================
// SECTION 14 — NUMERICAL INTEGRATION (4 items)
// ============================================================
add(
  'What is the Trapezoidal Rule for numerical integration?',
  'Trapezoidal Rule: Approximate ∫_a^b f(x)dx with n trapezoids of width h=(b−a)/n: T_n = (h/2)[f(x₀) + 2f(x₁) + 2f(x₂) + ... + 2f(x_{n−1}) + f(xₙ)], where xᵢ=a+ih. Error bound: |E_T| ≤ (b−a)³/(12n²)·max|f\'\'|. Example: Approximate ∫_0^2 eˣ dx with n=4. h=0.5. x: 0, 0.5, 1, 1.5, 2. f: 1, 1.6487, 2.7183, 4.4817, 7.3891. T₄ = (0.5/2)[1 + 2(1.6487) + 2(2.7183) + 2(4.4817) + 7.3891] = 0.25[1+3.2974+5.4366+8.9634+7.3891] = 0.25(26.0865) = 6.522. (Actual e²−1 ≈ 6.389.) ✓',
  'ch04p3_trapezoidal_rule',
  'formula_recall',
  ['trapezoidal rule', 'numerical', 'approximation', 'trapezoids', 'error bound']
)

add(
  'What is Simpson\'s Rule for numerical integration?',
  'Simpson\'s Rule (n even): Approximate ∫_a^b f(x)dx with n subintervals (n must be even), h=(b−a)/n: S_n = (h/3)[f(x₀) + 4f(x₁) + 2f(x₂) + 4f(x₃) + 2f(x₄) + ... + 4f(x_{n−1}) + f(xₙ)]. Pattern: 1, 4, 2, 4, 2, ..., 4, 1. Error: |E_S| ≤ (b−a)⁵/(180n⁴)·max|f⁽⁴⁾|. Much more accurate than Trapezoidal. Example: ∫_0^2 eˣ dx with n=4. h=0.5. S₄ = (0.5/3)[1 + 4(1.6487) + 2(2.7183) + 4(4.4817) + 7.3891] = (1/6)[1+6.5948+5.4366+17.9268+7.3891] = (1/6)(38.347) = 6.391. (Actual ≈ 6.389, very close!) ✓',
  'ch04p3_simpsons_rule',
  'formula_recall',
  ['Simpson', 'rule', 'numerical', 'parabolas', 'error bound', '1-4-2-4']
)

add(
  'How do you find the error bounds for Trapezoidal and Simpson\'s rules?',
  'Error bounds: Trapezoidal: |E_T| ≤ K₂(b−a)³/(12n²), where K₂ = max|f\'\'(x)| on [a,b]. Simpson\'s: |E_S| ≤ K₄(b−a)⁵/(180n⁴), where K₄ = max|f⁽⁴⁾(x)| on [a,b]. To find n for a desired accuracy ε: solve for n in the bound. Example: How large n for Simpson\'s rule on ∫_0^1 eˣ dx with error < 0.0001? f⁽⁴⁾=eˣ, max on [0,1] is e≈2.718. n⁴ > e·1/(180·0.0001) = 2.718/0.018 ≈ 150.9. n > 150.9^(1/4) ≈ 3.50. So n=4 (even) suffices. ✓',
  'ch04p3_numerical_error_bounds',
  'problem_solving',
  ['error bound', 'trapezoidal', 'Simpson', 'K2 K4', 'find n']
)

add(
  'What is the Midpoint Rule for numerical integration?',
  'Midpoint Rule: Approximate ∫_a^b f(x)dx with n rectangles of width h=(b−a)/n using midpoints: M_n = h·[f(x̄₁) + f(x̄₂) + ... + f(x̄ₙ)], where x̄ᵢ = a + (i−1/2)h is the midpoint of the i-th subinterval. Error: |E_M| ≤ (b−a)³/(24n²)·max|f\'\'| (half the Trapezoidal error bound). Example: ∫_0^2 x² dx with n=4. h=0.5. Midpoints: 0.25, 0.75, 1.25, 1.75. M₄ = 0.5·[0.0625+0.5625+1.5625+3.0625] = 0.5·5.25 = 2.625. (Actual = 8/3 ≈ 2.667.) ✓',
  'ch04p3_midpoint_rule',
  'formula_recall',
  ['midpoint rule', 'numerical', 'rectangles', 'midpoint', 'error bound']
)

// ============================================================
// SECTION 15 — HYPERBOLIC & INVERSE HYPERBOLIC INTEGRALS (4 items)
// ============================================================
add(
  'What are the integrals of hyperbolic functions?',
  'Hyperbolic integrals: ∫sinh x dx = cosh x + C. ∫cosh x dx = sinh x + C. ∫tanh x dx = ln(cosh x) + C. ∫coth x dx = ln|sinh x| + C. ∫sech x dx = 2arctan(tanh(x/2)) + C = arctan(sinh x) + C. ∫csch x dx = ln|tanh(x/2)| + C. Example: ∫x²·sinh(x³)dx. u=x³, du=3x²dx. (1/3)∫sinh u du = (1/3)cosh u + C = (1/3)cosh(x³) + C. ✓',
  'ch04p3_hyperbolic_integrals',
  'formula_recall',
  ['hyperbolic', 'integral', 'sinh cosh', 'tanh', 'sech csch']
)

add(
  'What are the integrals of inverse hyperbolic functions?',
  'Inverse hyperbolic integrals (from derivatives): ∫1/√(x²+1) dx = arsinh x + C = ln(x+√(x²+1)) + C. ∫1/√(x²−1) dx = arcosh x + C = ln(x+√(x²−1)) + C (x>1). ∫1/(1−x²) dx = artanh x + C (|x|<1) = (1/2)ln((1+x)/(1−x)) + C. ∫1/(x√(x²−1)) dx = −arsech x + C (or arcsec|x| form). ∫1/(x√(x²+1)) dx = −arcsch|x| + C. Example: ∫1/√(4x²+1) dx. u=2x, du=2dx. (1/2)∫du/√(u²+1) = (1/2)arsinh u + C = (1/2)ln(2x+√(4x²+1)) + C. ✓',
  'ch04p3_inverse_hyperbolic_integrals',
  'formula_recall',
  ['inverse hyperbolic', 'integral', 'arsinh arcosh artanh', 'logarithm form']
)

add(
  'How do you integrate using hyperbolic substitutions?',
  'Hyperbolic substitutions: (1) For √(x²+a²): use x=a·sinh t, √ becomes a·cosh t, dx=a·cosh t dt. (2) For √(x²−a²): use x=a·cosh t, √ becomes a·sinh t, dx=a·sinh t dt. (3) For √(a²−x²): use x=a·tanh t (less common). Analogous to trig substitutions but often cleaner. Example: ∫√(x²+4) dx. x=2sinh t, dx=2cosh t dt, √(x²+4)=2cosh t. ∫2cosh t·2cosh t dt = 4∫cosh²t dt = 4∫(1+cosh 2t)/2 dt = 2t + sinh 2t + C = 2t + 2sinh t cosh t + C. Back: sinh t = x/2, cosh t = √(x²+4)/2, t = arsinh(x/2) = ln(x/2 + √(x²+4)/2). = 2arsinh(x/2) + (x/2)√(x²+4) + C. ✓',
  'ch04p3_hyperbolic_substitution',
  'problem_solving',
  ['hyperbolic substitution', 'sinh cosh', 'integrate', 'radical', 'alternative']
)

add(
  'How do you integrate rational functions using inverse hyperbolic forms?',
  'Recognizing inverse hyperbolic integral forms: (1) ∫1/√(x²+a²) dx = arsinh(x/a) + C = ln(x+√(x²+a²)) + C. (2) ∫1/(a²−x²) dx = (1/a)artanh(x/a) + C (for |x|<a). (3) ∫1/√(x²−a²) dx = arcosh(x/a) + C (for x>a). These often appear after completing the square. Example: ∫dx/(4−x²). = (1/4)∫dx/(1−(x/2)²) · let u=x/2, du=dx/2: (1/2)∫du/(1−u²) = (1/2)artanh u + C = (1/2)artanh(x/2) + C. (Equivalent to (1/4)ln|(2+x)/(2−x)| + C.) ✓',
  'ch04p3_rational_inverse_hyperbolic',
  'problem_solving',
  ['rational', 'inverse hyperbolic', 'recognize', 'arsinh artanh', 'complete square']
)

// ============================================================
// WRITE OUTPUT
// ============================================================
const output = {
  generatedAt: new Date().toISOString(),
  totalItems: items.length,
  subject: 'mathematics_formulas_volume_9_chapter_04_part_03',
  volume:
    'Volume 9 — Comprehensive Formula Encyclopedia, Chapter 4 Part 3 (Integral Calculus: Riemann Sums, FTC Part 1 & 2, Indefinite Integrals & Basic Rules, Substitution, Integration by Parts, Trigonometric Integrals, Trigonometric Substitution, Partial Fractions, Improper Integrals, Applications [Area, Volume, Arc Length, Surface Area, Work, Center of Mass, Hydrostatic Force], Numerical Integration, Hyperbolic Integrals)',
  source: 'TRIZA Generated Formula Dataset',
  language: 'en',
  religionNeutral: true,
  items,
}

mkdirSync('data', { recursive: true })
writeFileSync('data/math-formulas-vol9-ch04p3.json', JSON.stringify(output, null, 2))
console.log(`Wrote ${items.length} items to data/math-formulas-vol9-ch04p3.json`)
