/**
 * ============================================================
 *  Mathematics Formula Encyclopedia — Volume 9
 *  Comprehensive Formula Reference
 *  Chapter 4 — Part 1 (Differential Calculus Foundations)
 *  Limits (Intuitive & ε-δ Definition, One-Sided, Limit Laws,
 *           Limits at Infinity, Infinite Limits, Squeeze Theorem,
 *           Special Limits sin x/x and (1-1/x)^x),
 *  Continuity (Definition, Types of Discontinuities, IVT),
 *  The Derivative (Difference Quotient Definition, Tangent Lines,
 *           Differentiability vs Continuity),
 *  Differentiation Rules (Power, Sum, Product, Quotient, Chain),
 *  Derivatives of Common Functions (Polynomial, Exponential,
 *           Logarithmic, Trigonometric, Inverse Trig, Hyperbolic),
 *  Implicit Differentiation, Logarithmic Differentiation,
 *  Higher-Order Derivatives,
 *  Related Rates (Intro & Worked Problems),
 *  Linear Approximation & Differentials
 *  Generator for TRIZA
 * ============================================================
 *
 *  Output: data/math-formulas-vol9-ch04p1.json
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
// SECTION 1 — LIMITS: FOUNDATIONS (6 items)
// ============================================================
add(
  'What is the intuitive definition of a limit?',
  'Intuitive limit definition: We write lim_{x->a} f(x) = L if the values of f(x) get arbitrarily close to L as x gets close to a (from either side), but NOT necessarily equal to a. The function need not even be defined at a — only near a. Informally: "as x approaches a, f(x) approaches L." Example: lim_{x->2} (x^2 - 1)/(x - 1) — at x=1 it is 0/0 (undefined), but for x near 1 (not equal), the value is close to 2 (since (x^2-1)/(x-1) = x+1 for x ≠ 1, so limit = 2). Example 2: lim_{x->3} (2x+1) = 7 (just plug in since polynomials are continuous). ✓',
  'ch04p1_limit_intuitive',
  'formula_recall',
  ['limit', 'intuitive', 'approaches', 'arbitrarily close', 'informal']
)

add(
  'What is the formal (ε-δ) definition of a limit?',
  'Formal (ε-δ) definition: lim_{x->a} f(x) = L means: for every ε > 0, there exists a δ > 0 such that if 0 < |x - a| < δ, then |f(x) - L| < ε. Interpretation: no matter how tight a tolerance ε you demand on the output (distance from L), you can find an input tolerance δ (distance from a) that guarantees the output is within ε of L. The condition 0 < |x - a| (strict inequality) means we do NOT care about f(a) itself. Example: Prove lim_{x->3} (2x) = 6. Given ε > 0, choose δ = ε/2. If 0 < |x - 3| < δ, then |2x - 6| = 2|x - 3| < 2δ = 2(ε/2) = ε. ✓',
  'ch04p1_limit_epsilon_delta',
  'formula_recall',
  ['epsilon delta', 'formal definition', 'limit', 'proof', 'tolerance']
)

add(
  'What are one-sided limits and how do they relate to the (two-sided) limit?',
  'One-sided limits: The left-hand limit lim_{x->a^-} f(x) = L^- means f(x) -> L^- as x approaches a from values LESS than a. The right-hand limit lim_{x->a^+} f(x) = L^+ means f(x) -> L^+ as x approaches a from values GREATER than a. Fundamental theorem: lim_{x->a} f(x) = L exists (as a finite number) IF AND ONLY IF both one-sided limits exist AND are equal: lim_{x->a^-} f(x) = lim_{x->a^+} f(x) = L. If the one-sided limits differ, the two-sided limit DOES NOT EXIST (DNE). Example: f(x) = |x|/x. lim_{x->0^-} = -1, lim_{x->0^+} = +1. They differ, so lim_{x->0} |x|/x DNE. ✓',
  'ch04p1_one_sided_limits',
  'formula_recall',
  ['one-sided limit', 'left-hand', 'right-hand', 'two-sided', 'DNE']
)

add(
  'What are the limit laws (algebraic properties of limits)?',
  'Limit laws: If lim_{x->a} f(x) = L and lim_{x->a} g(x) = M (both finite), then: (1) Sum: lim [f(x) + g(x)] = L + M. (2) Difference: lim [f(x) - g(x)] = L - M. (3) Constant multiple: lim [c·f(x)] = c·L. (4) Product: lim [f(x)·g(x)] = L·M. (5) Quotient: lim [f(x)/g(x)] = L/M (provided M ≠ 0). (6) Power: lim [f(x)]^n = L^n (n integer). (7) Root: lim [f(x)]^(1/n) = L^(1/n) (if L > 0 for even n). (8) Composition: if g continuous at L, lim g(f(x)) = g(L). Example: lim_{x->2} (3x^2 + 5x - 1) = 3(4) + 5(2) - 1 = 12 + 10 - 1 = 21 (using sum, constant multiple, power laws). ✓',
  'ch04p1_limit_laws',
  'formula_recall',
  ['limit laws', 'sum', 'product', 'quotient', 'power', 'algebraic']
)

add(
  'What are limits at infinity and how do you compute them?',
  'Limits at infinity: lim_{x->∞} f(x) = L means f(x) -> L as x grows without bound. Geometrically, y = L is a horizontal asymptote. For rational functions f(x) = P(x)/Q(x) with deg P = p, deg Q = q: divide numerator and denominator by x^q (the highest power in the denominator). (1) p < q: limit = 0. (2) p = q: limit = (leading coeff of P)/(leading coeff of Q). (3) p > q: limit = ±∞ (no finite horizontal asymptote). Example: lim_{x->∞} (3x^2 + 1)/(2x^2 - 5). Divide by x^2: (3 + 1/x^2)/(2 - 5/x^2) -> 3/2. Example 2: lim_{x->∞} (5x + 2)/(x^3 - 1) = 0 (degree 1 < 3). For non-rational: lim_{x->∞} e^(-x) = 0, lim_{x->∞} ln(x) = ∞. ✓',
  'ch04p1_limits_at_infinity',
  'formula_recall',
  ['limits at infinity', 'horizontal asymptote', 'rational function', 'degree', 'end behavior']
)

add(
  'What are infinite limits and how do they differ from limits at infinity?',
  'Infinite limits: lim_{x->a} f(x) = ∞ means f(x) grows without bound as x -> a (the output explodes; the line x = a is a vertical asymptote). This is fundamentally different from limits AT infinity (where the INPUT grows). Notation: lim_{x->a^+} f(x) = +∞ or -∞ (one-sided). Example: lim_{x->0^+} (1/x) = +∞, lim_{x->0^-} (1/x) = -∞. So lim_{x->0} (1/x) DNE (one-sided limits are different infinities). Example 2: lim_{x->2} (1/(x-2)^2) = +∞ (both sides go to +∞ since the square is positive). Detecting vertical asymptotes: look for (a) zeros of denominators after simplification, (b) logs going to 0 argument, (c) tan at odd multiples of π/2. Note: ∞ is NOT a number — saying lim = ∞ really means the limit DNE in a specific way. ✓',
  'ch04p1_infinite_limits',
  'formula_recall',
  ['infinite limit', 'vertical asymptote', 'explodes', 'unbounded', 'one-sided infinity']
)

// ============================================================
// SECTION 2 — SPECIAL LIMITS & SQUEEZE THEOREM (5 items)
// ============================================================
add(
  'What is the Squeeze (Sandwich) Theorem and how is it used?',
  'Squeeze Theorem: If g(x) ≤ f(x) ≤ h(x) for all x near a (except possibly at a), AND lim_{x->a} g(x) = lim_{x->a} h(x) = L, then lim_{x->a} f(x) = L. The function f is "squeezed" between two functions that converge to the same value. Especially useful for limits involving oscillating functions (like sin or cos multiplied by something going to 0). Classic example: Prove lim_{x->0} x^2 sin(1/x) = 0. Since -1 ≤ sin(1/x) ≤ 1, we have -x^2 ≤ x^2 sin(1/x) ≤ x^2. Both -x^2 -> 0 and x^2 -> 0 as x -> 0, so by Squeeze, the limit is 0. (Note: f is not even continuous at 0 unless defined as 0 there.) ✓',
  'ch04p1_squeeze_theorem',
  'formula_recall',
  ['squeeze theorem', 'sandwich', 'bounding', 'oscillating', 'two bounds']
)

add(
  'How do you prove and use the special limit lim_{x->0} sin(x)/x = 1?',
  'Special limit: lim_{x->0} (sin x)/x = 1. Proof sketch (geometric, using Squeeze): Consider a unit circle, angle x (in radians) at the center. Compare areas: (area of triangle OAB) ≤ (area of sector OAB) ≤ (area of triangle OAC), giving (1/2)sin x ≤ (1/2)x ≤ (1/2)tan x for 0 < x < π/2. After manipulation: cos x ≤ sin x / x ≤ 1. Since cos x -> 1 as x -> 0, by Squeeze (sin x)/x -> 1. This foundational limit yields other trig limits: lim_{x->0} (1 - cos x)/x = 0 (multiply by (1+cos x)/(1+cos x): = sin^2 x / [x(1+cos x)] = (sin x / x)·sin x / (1+cos x) -> 1·0/2 = 0). And lim_{x->0} (1 - cos x)/x^2 = 1/2 (similar manipulation). And lim_{x->0} tan x / x = 1 (since tan x/x = (sin x/x)·(1/cos x) -> 1·1 = 1). ✓',
  'ch04p1_special_limit_sin_x_over_x',
  'problem_solving',
  ['special limit', 'sin x over x', 'squeeze', 'proof', 'trig limit']
)

add(
  'What is the special limit defining e: lim_{x->0} (1+x)^(1/x) = e and lim_{x->∞} (1+1/x)^x = e?',
  'Special limits defining e: (1) lim_{x->0} (1 + x)^(1/x) = e (≈ 2.71828). (2) lim_{x->∞} (1 + 1/x)^x = e. (3) lim_{n->∞} (1 + 1/n)^n = e (discrete version, compound interest). These are equivalent (substitution y = 1/x). The number e is defined as this limit. Connection to compound interest: $1 at 100% annual interest compounded n times per year yields (1 + 1/n)^n after one year; as n -> ∞ (continuous compounding), the amount approaches e ≈ $2.71828. Generalization: lim_{x->∞} (1 + a/x)^x = e^a (replace x by x/a). Example: lim_{x->∞} (1 + 3/x)^x = e^3. Example 2: lim_{x->0} (1 + 5x)^(1/x) = e^5. This is the bridge between discrete growth and continuous exponential growth, foundational for the derivative of e^x and the natural logarithm. ✓',
  'ch04p1_special_limit_e_definition',
  'formula_recall',
  ['e definition', 'special limit', 'compound interest', 'continuous compounding', 'exponential']
)

add(
  'How do you evaluate the limit lim_{x->∞} (1 - 1/x)^x and similar forms?',
  'Limit (1 - 1/x)^x as x -> ∞: Rewrite to match the e-limit pattern. (1 - 1/x)^x = (1 + (-1/x))^x. Let n = -x (so x = -n, and as x -> ∞, n -> -∞). Then (1 + 1/n)^(-n) = 1/(1 + 1/n)^n -> 1/e. So lim_{x->∞} (1 - 1/x)^x = e^(-1) = 1/e ≈ 0.3679. More generally: lim_{x->∞} (1 + a/x)^x = e^a, so (1 - 1/x)^x = (1 + (-1)/x)^x -> e^(-1). Worked example: lim_{x->∞} (1 - 2/x)^x. Identify a = -2: limit = e^(-2) ≈ 0.1353. Worked example 2: lim_{x->0} (1 - 3x)^(1/x). Substitute y = -3x: (1 + y)^(-1/y·(-3)) — wait, simpler: use lim_{x->0} (1 + ax)^(1/x) = e^a, so (1 - 3x)^(1/x) = (1 + (-3)x)^(1/x) -> e^(-3) ≈ 0.0498. These limits appear in probability (Poisson approximation to Binomial), decay problems, and physics. ✓',
  'ch04p1_special_limit_compound_interest',
  'problem_solving',
  ['special limit', 'one minus one over x', 'one over e', 'decay', 'compound']
)

add(
  'What are the most common trigonometric and exponential limits to memorize?',
  'Common limits to memorize (all use radians for trig): (1) lim_{x->0} (sin x)/x = 1. (2) lim_{x->0} (1 - cos x)/x = 0. (3) lim_{x->0} (1 - cos x)/x^2 = 1/2. (4) lim_{x->0} (tan x)/x = 1. (5) lim_{x->0} (arcsin x)/x = 1. (6) lim_{x->0} (arctan x)/x = 1. (7) lim_{x->0} (e^x - 1)/x = 1. (8) lim_{x->0} (ln(1 + x))/x = 1. (9) lim_{x->0} ((1 + x)^a - 1)/x = a (generalized). (10) lim_{x->∞} (1 + a/x)^x = e^a. These are all "0/0 forms" except the last. They are foundational because they are the derivatives of sin, cos, tan, arcsin, arctan, e^x, ln, and (1+x)^a at x = 0. Worked example: lim_{x->0} (sin 5x)/x. Rewrite: 5·(sin 5x)/(5x) -> 5·1 = 5 (using (1) with substitution 5x). Example: lim_{x->0} (e^(2x) - 1)/x = 2·(e^(2x) - 1)/(2x) -> 2·1 = 2. ✓',
  'ch04p1_common_trig_limits',
  'formula_recall',
  ['common limits', 'trigonometric', 'exponential', 'logarithmic', 'memorize']
)

// ============================================================
// SECTION 3 — CONTINUITY (5 items)
// ============================================================
add(
  'What is the definition of continuity at a point?',
  'Continuity at a point: f is continuous at x = a if THREE conditions hold: (1) f(a) is defined (a is in the domain), (2) lim_{x->a} f(x) exists (i.e., both one-sided limits exist and are equal), (3) lim_{x->a} f(x) = f(a) (the limit equals the function value). Equivalently: lim_{x->a} f(x) = f(a), which captures all three conditions when read carefully. Intuitively: you can draw the graph through (a, f(a)) without lifting your pen. The ε-δ version: for every ε > 0, there exists δ > 0 such that |x - a| < δ (note: ≤ here, including x = a) implies |f(x) - f(a)| < ε. Example: f(x) = x^2 is continuous at a = 3: f(3) = 9, lim_{x->3} x^2 = 9 = f(3). ✓ A function is continuous on an interval if it is continuous at every point in the interval.',
  'ch04p1_continuity_definition',
  'formula_recall',
  ['continuity', 'definition', 'three conditions', 'limit equals value', 'point']
)

add(
  'What is one-sided continuity and continuity on a closed interval?',
  'One-sided continuity: f is continuous from the RIGHT at a if lim_{x->a^+} f(x) = f(a). Continuous from the LEFT at a if lim_{x->a^-} f(x) = f(a). Continuity on a closed interval [a, b]: f is continuous on [a, b] if (1) f is continuous at every point in the OPEN interval (a, b), (2) f is continuous from the right at a (i.e., lim_{x->a^+} f(x) = f(a)), (3) f is continuous from the left at b (i.e., lim_{x->b^-} f(x) = f(b)). The endpoint conditions use one-sided continuity because we cannot approach a from the left (outside the interval) or b from the right. Example: f(x) = sqrt(4 - x^2) on [-2, 2]. Continuous on (-2, 2) (composition of continuous functions). At -2: lim_{x->-2^+} sqrt(4 - x^2) = 0 = f(-2) ✓. At 2: lim_{x->2^-} sqrt(4 - x^2) = 0 = f(2) ✓. So continuous on [-2, 2]. ✓',
  'ch04p1_one_sided_continuity',
  'formula_recall',
  ['one-sided continuity', 'closed interval', 'endpoint', 'left continuous', 'right continuous']
)

add(
  'What are the types of discontinuities?',
  'Types of discontinuities: (1) REMOVABLE (point/hole) discontinuity: lim_{x->a} f(x) exists (finite) but ≠ f(a) (or f(a) is undefined). The "hole" can be filled by redefining f(a) = lim. Example: f(x) = (x^2 - 1)/(x - 1) at x = 1: limit = 2, but f(1) undefined — removable. (2) JUMP discontinuity: both one-sided limits exist (finite) but are UNEQUAL. Example: f(x) = floor(x) at any integer; at x = 2: left limit = 1, right limit = 2. Common with piecewise functions. (3) INFINITE (essential) discontinuity: at least one one-sided limit is ±∞ (vertical asymptote). Example: f(x) = 1/x at x = 0: left limit = -∞, right limit = +∞. (4) OSCILLATING (essential) discontinuity: limit does not exist due to infinite oscillation. Example: f(x) = sin(1/x) at x = 0 (oscillates between -1 and 1 infinitely). Only removable discontinuities can be "fixed" by redefining f at one point. ✓',
  'ch04p1_types_of_discontinuities',
  'formula_recall',
  ['discontinuity', 'removable', 'jump', 'infinite', 'oscillating', 'types']
)

add(
  'What is the Intermediate Value Theorem (IVT)?',
  'Intermediate Value Theorem: If f is continuous on the closed interval [a, b], and k is any number strictly between f(a) and f(b) (i.e., f(a) < k < f(b) or f(b) < k < f(a)), then there exists at least one c in (a, b) such that f(c) = k. Intuitively: a continuous function on an interval takes on every value between its endpoint values — the graph cannot "jump over" any horizontal line between f(a) and f(b). Note: IVT guarantees EXISTENCE (at least one c), not uniqueness. Example: f(x) = x^3 - x - 1 on [1, 2]. f(1) = -1, f(2) = 5. Since 0 is between -1 and 5, there exists c in (1, 2) with f(c) = 0 — i.e., a root of x^3 - x - 1 = 0 in (1, 2). ✓ Used for: proving roots exist, locating roots for numerical methods (bisection), and proving inequalities.',
  'ch04p1_intermediate_value_theorem',
  'formula_recall',
  ['Intermediate Value Theorem', 'IVT', 'continuous', 'existence', 'root']
)

add(
  'How do you use the IVT to prove that an equation has a root in an interval?',
  'IVT for root existence: To show f(x) = 0 has a solution in (a, b): (1) Verify f is continuous on [a, b]. (2) Compute f(a) and f(b). (3) Check that f(a) and f(b) have OPPOSITE SIGNS (i.e., f(a)·f(b) < 0). (4) By IVT (with k = 0), there exists c in (a, b) with f(c) = 0. Worked example: Show x^5 - 3x + 1 = 0 has a root in (0, 1). f(x) = x^5 - 3x + 1 is continuous (polynomial). f(0) = 1 > 0, f(1) = 1 - 3 + 1 = -1 < 0. Since f(0)·f(1) = -1 < 0 (opposite signs), by IVT there is c in (0, 1) with f(c) = 0. Worked example 2: Show e^x = 3 - x has a solution. Define g(x) = e^x - (3 - x) = e^x + x - 3. g(0) = 1 - 3 = -2 < 0, g(2) = e^2 + 2 - 3 = e^2 - 1 ≈ 6.389 > 0. Continuous; opposite signs at endpoints; IVT guarantees a root in (0, 2). This is the basis of the bisection method for numerical root-finding. ✓',
  'ch04p1_ivt_root_finding',
  'problem_solving',
  ['IVT', 'root', 'existence', 'bisection', 'opposite signs']
)

// ============================================================
// SECTION 4 — THE DERIVATIVE: DEFINITION (6 items)
// ============================================================
add(
  'What is the definition of the derivative as a limit of a difference quotient?',
  'Derivative definition: The derivative of f at x = a is f\'(a) = lim_{h->0} [f(a + h) - f(a)] / h, provided this limit exists. Equivalently: f\'(a) = lim_{x->a} [f(x) - f(a)] / (x - a). The expression [f(a+h) - f(a)]/h is the difference quotient (or secant slope), measuring the average rate of change of f over [a, a+h]. The limit, if it exists, is the instantaneous rate of change at a. As a function: f\'(x) = lim_{h->0} [f(x+h) - f(x)] / h. Notation: f\'(x), dy/dx, df/dx, (d/dx)[f(x)], D_x f. Worked example: f(x) = x^2. f\'(x) = lim_{h->0} [(x+h)^2 - x^2]/h = lim_{h->0} [2xh + h^2]/h = lim_{h->0} (2x + h) = 2x. ✓',
  'ch04p1_derivative_definition',
  'formula_recall',
  ['derivative', 'definition', 'difference quotient', 'limit', 'instantaneous rate']
)

add(
  'What is the tangent line to a curve and how is its equation derived?',
  'Tangent line: The tangent line to the curve y = f(x) at the point (a, f(a)) is the line through (a, f(a)) with slope equal to f\'(a) (the derivative at a). It is the "best linear approximation" to the curve at that point. Equation (point-slope form): y - f(a) = f\'(a)·(x - a), or y = f(a) + f\'(a)(x - a). Geometrically: it is the limit of secant lines through (a, f(a)) and nearby points (a+h, f(a+h)) as h -> 0. The slope of each secant is [f(a+h) - f(a)]/h; the limit is f\'(a). Worked example: Find the tangent line to y = x^3 at x = 2. f(2) = 8, f\'(x) = 3x^2, f\'(2) = 12. Equation: y - 8 = 12(x - 2), i.e., y = 12x - 16. Worked example 2: Tangent to y = sqrt(x) at x = 9. f(9) = 3, f\'(x) = 1/(2 sqrt(x)), f\'(9) = 1/6. Equation: y - 3 = (1/6)(x - 9), i.e., y = (1/6)x + 3/2. ✓',
  'ch04p1_tangent_line_definition',
  'formula_recall',
  ['tangent line', 'point-slope', 'slope', 'derivative', 'secant limit']
)

add(
  'What is the relationship between differentiability and continuity?',
  'Relationship: If f is differentiable at a, then f is CONTINUOUS at a. (Differentiability implies continuity.) The CONVERSE IS FALSE: continuity does NOT imply differentiability. Proof (sketch): If f\'(a) = lim [f(a+h) - f(a)]/h exists (finite), then f(a+h) - f(a) = h·[f(a+h) - f(a)]/h -> 0·f\'(a) = 0, so lim f(a+h) = f(a) — continuity. Counterexample to converse: f(x) = |x| is continuous at 0 but NOT differentiable at 0 (left derivative -1, right derivative +1, so the limit DNE). Other counterexamples: f(x) = x^(1/3) (vertical tangent at 0, continuous but derivative is +∞, not finite); f(x) = x^(2/3) (cusp at 0, continuous, derivative DNE: left -∞, right +∞); the Weierstrass function (continuous everywhere, differentiable NOWHERE). Practical rule: to check differentiability, first verify continuity; if discontinuous, automatically not differentiable. ✓',
  'ch04p1_differentiability_vs_continuity',
  'formula_recall',
  ['differentiability', 'continuity', 'implies', 'converse false', 'absolute value']
)

add(
  'How is the derivative interpreted as an instantaneous rate of change?',
  'Derivative as rate of change: f\'(a) represents the instantaneous rate of change of f with respect to x at x = a. If y = f(x) is a physical quantity varying with x (time, distance, etc.), then dy/dx = f\'(x) is the rate at which y changes per unit change in x. Units: (units of y) / (units of x). Examples: (1) Position s(t): velocity v(t) = ds/dt; acceleration a(t) = dv/dt = d^2s/dt^2. (2) Population P(t): growth rate dP/dt (individuals per unit time). (3) Cost C(x): marginal cost C\'(x) (cost per additional unit). (4) Temperature T(x) along a rod: heat flux proportional to -dT/dx. Average vs instantaneous: average rate of change over [a, b] = [f(b) - f(a)]/(b - a); instantaneous rate at a = f\'(a) = lim of average as b -> a. Worked example: If s(t) = -16t^2 + 96t (height of a thrown ball, feet, seconds), then v(t) = s\'(t) = -32t + 96 ft/s. At t = 2: v = 32 ft/s (upward). At t = 3: v = 0 (top of trajectory). At t = 5: v = -64 ft/s (downward). ✓',
  'ch04p1_derivative_as_rate_of_change',
  'formula_recall',
  ['derivative', 'rate of change', 'instantaneous', 'velocity', 'physical interpretation']
)

add(
  'How do you compute a derivative directly from the limit definition (worked examples)?',
  'Computing derivative from definition: Use f\'(x) = lim_{h->0} [f(x+h) - f(x)]/h. Worked example 1: f(x) = 1/x. f(x+h) - f(x) = 1/(x+h) - 1/x = [x - (x+h)]/[x(x+h)] = -h/[x(x+h)]. Divide by h: -1/[x(x+h)]. Limit as h -> 0: -1/x^2. So d/dx[1/x] = -1/x^2. Worked example 2: f(x) = sqrt(x). f(x+h) - f(x) = sqrt(x+h) - sqrt(x). Rationalize: multiply by [sqrt(x+h) + sqrt(x)]/[sqrt(x+h) + sqrt(x)]. Numerator: (x+h) - x = h. So [f(x+h) - f(x)]/h = 1/[sqrt(x+h) + sqrt(x)]. Limit h -> 0: 1/[2 sqrt(x)]. So d/dx[sqrt(x)] = 1/(2 sqrt(x)). Worked example 3: f(x) = sin x. [sin(x+h) - sin x]/h. Use identity sin(x+h) = sin x cos h + cos x sin h. So = sin x (cos h - 1)/h + cos x (sin h)/h -> sin x·0 + cos x·1 = cos x. So d/dx[sin x] = cos x. ✓',
  'ch04p1_derivative_from_definition_worked',
  'problem_solving',
  ['derivative', 'limit definition', 'worked example', 'rationalize', 'difference quotient']
)

add(
  'What are vertical tangents and cusps, and how do they relate to differentiability?',
  'Vertical tangent and cusp: At a point a where f is continuous, the derivative may fail to exist in special ways beyond a "corner" (like |x| at 0). (1) VERTICAL TANGENT: lim_{h->0} [f(a+h) - f(a)]/h = +∞ or -∞ (the same sign from both sides). The tangent line is vertical (slope infinite). Example: f(x) = x^(1/3) at x = 0. Difference quotient: h^(1/3)/h = h^(-2/3) -> +∞. So f\'(0) = +∞ (vertical tangent). The graph goes through (0,0) smoothly with a vertical tangent. (2) CUSP: lim_{h->0^+} [f(a+h) - f(a)]/h = +∞ and lim_{h->0^-} [f(a+h) - f(a)]/h = -∞ (opposite infinities) — or vice versa. The graph comes in vertically from one side and leaves vertically on the other, forming a sharp point. Example: f(x) = x^(2/3) at x = 0. Right: h^(2/3)/h = h^(-1/3) -> +∞. Left: (-|h|)^(2/3)/h = |h|^(2/3)/h (negative h) = -|h|^(-1/3) -> -∞. So cusp at 0. Both cases: f is continuous but NOT differentiable (the derivative does not exist as a finite number). ✓',
  'ch04p1_vertical_tangent_cusp',
  'formula_recall',
  ['vertical tangent', 'cusp', 'infinite derivative', 'differentiability', 'sharp point']
)

// ============================================================
// SECTION 5 — DIFFERENTIATION RULES (5 items)
// ============================================================
add(
  'What is the Power Rule for derivatives?',
  'Power Rule: d/dx[x^n] = n·x^(n-1), for any real number n (integer, fraction, negative, irrational). Examples: (1) d/dx[x^5] = 5x^4. (2) d/dx[x^(1/2)] = (1/2)x^(-1/2) = 1/(2 sqrt(x)). (3) d/dx[x^(-3)] = -3x^(-4) = -3/x^4. (4) d/dx[1/x] = d/dx[x^(-1)] = -x^(-2) = -1/x^2. (5) d/dx[x^π] = π x^(π-1). Special cases: d/dx[x] = 1 (n=1); d/dx[1] = 0 (constant function, n=0). Generalized power: d/dx[(g(x))^n] = n·(g(x))^(n-1)·g\'(x) (combining with chain rule). Worked example: d/dx[(3x^2 + 1)^4] = 4(3x^2 + 1)^3 · 6x = 24x(3x^2 + 1)^3. The Power Rule is the most-used differentiation rule; memorize it cold. ✓',
  'ch04p1_power_rule',
  'formula_recall',
  ['power rule', 'derivative', 'x^n', 'exponent', 'generalized']
)

add(
  'What are the Constant Multiple Rule and the Sum/Difference Rule?',
  'Constant Multiple Rule: d/dx[c·f(x)] = c·f\'(x) (constants factor out of derivatives). Sum Rule: d/dx[f(x) + g(x)] = f\'(x) + g\'(x). Difference Rule: d/dx[f(x) - g(x)] = f\'(x) - g\'(x). Combined (Linearity): d/dx[a·f(x) + b·g(x)] = a·f\'(x) + b·g\'(x). Together with the Power Rule, these handle all polynomials: d/dx[a_n x^n + a_{n-1} x^{n-1} + ... + a_1 x + a_0] = n·a_n x^{n-1} + (n-1)·a_{n-1} x^{n-2} + ... + a_1. Worked example: d/dx[5x^4 - 3x^2 + 7x - 2] = 5·4x^3 - 3·2x + 7 - 0 = 20x^3 - 6x + 7. Worked example 2: d/dx[3 sqrt(x) + 4/x^2] = d/dx[3x^(1/2) + 4x^(-2)] = 3·(1/2)x^(-1/2) + 4·(-2)x^(-3) = (3/2)/sqrt(x) - 8/x^3. The constant rule d/dx[c] = 0 follows because a constant has zero rate of change (flat line). ✓',
  'ch04p1_sum_constant_rules',
  'formula_recall',
  ['constant multiple', 'sum rule', 'difference rule', 'linearity', 'polynomial']
)

add(
  'What is the Product Rule for derivatives?',
  'Product Rule: d/dx[f(x)·g(x)] = f\'(x)·g(x) + f(x)·g\'(x). (Read: "derivative of first times second, plus first times derivative of second.") WARNING: the derivative of a product is NOT the product of derivatives (a common error). Mnemonic: (fg)\' = f\'g + fg\'. For three functions: (fgh)\' = f\'gh + fg\'h + fgh\'. Generalizes to any number of factors. Worked example 1: d/dx[x^2 · sin x]. f = x^2, g = sin x. f\' = 2x, g\' = cos x. So = 2x·sin x + x^2·cos x. Worked example 2: d/dx[(3x + 1)(x^2 - 5)]. f = 3x+1, g = x^2 - 5. f\' = 3, g\' = 2x. So = 3(x^2 - 5) + (3x + 1)(2x) = 3x^2 - 15 + 6x^2 + 2x = 9x^2 + 2x - 15. (Check by expanding first: (3x+1)(x^2-5) = 3x^3 + x^2 - 15x - 5; derivative = 9x^2 + 2x - 15. ✓ matches.) Use Product Rule when you cannot easily expand or when factors are non-polynomial. ✓',
  'ch04p1_product_rule',
  'formula_recall',
  ['product rule', 'derivative', 'product', 'two functions', 'mnemonic']
)

add(
  'What is the Quotient Rule for derivatives?',
  'Quotient Rule: d/dx[f(x)/g(x)] = [f\'(x)·g(x) - f(x)·g\'(x)] / [g(x)]^2, provided g(x) ≠ 0. Mnemonic: "low D-high minus high D-low, over low squared" — i.e., (g·f\' - f·g\')/g^2 (where "low" = denominator g, "high" = numerator f). WARNING: order matters in the numerator (it is a subtraction); getting the order wrong gives the wrong sign. Worked example 1: d/dx[tan x] = d/dx[sin x / cos x]. f = sin x, g = cos x. f\' = cos x, g\' = -sin x. = [cos x · cos x - sin x · (-sin x)] / cos^2 x = [cos^2 x + sin^2 x]/cos^2 x = 1/cos^2 x = sec^2 x. ✓ Worked example 2: d/dx[(2x + 1)/(x - 3)]. f = 2x+1, g = x-3. f\' = 2, g\' = 1. = [2(x-3) - (2x+1)(1)]/(x-3)^2 = [2x - 6 - 2x - 1]/(x-3)^2 = -7/(x-3)^2. ✓',
  'ch04p1_quotient_rule',
  'formula_recall',
  ['quotient rule', 'derivative', 'ratio', 'low D high', 'mnemonic']
)

add(
  'What is the Chain Rule and how is it applied?',
  'Chain Rule: For composite function y = f(g(x)), the derivative is dy/dx = f\'(g(x))·g\'(x). Equivalently: (outer derivative evaluated at inner) × (inner derivative). In Leibniz notation: if y = f(u) and u = g(x), then dy/dx = (dy/du)·(du/dx). The chain rule is the most powerful and most-used differentiation rule; it handles ALL composite functions. Generalization: for f(g(h(x))), d/dx = f\'(g(h))·g\'(h)·h\'. Worked example 1: d/dx[(3x + 1)^5]. Outer: u^5, derivative 5u^4. Inner: 3x+1, derivative 3. Result: 5(3x+1)^4 · 3 = 15(3x+1)^4. Worked example 2: d/dx[sin(x^2)]. Outer: sin u, derivative cos u. Inner: x^2, derivative 2x. Result: cos(x^2) · 2x = 2x cos(x^2). Worked example 3: d/dx[e^(3x^2)]. Outer: e^u, derivative e^u. Inner: 3x^2, derivative 6x. Result: e^(3x^2) · 6x = 6x e^(3x^2). Worked example 4: d/dx[ln(cos x)]. Outer: ln u, derivative 1/u. Inner: cos x, derivative -sin x. Result: (1/cos x)·(-sin x) = -tan x. ✓',
  'ch04p1_chain_rule',
  'formula_recall',
  ['chain rule', 'composite', 'outer inner', 'derivative', 'Leibniz']
)

// ============================================================
// SECTION 6 — DERIVATIVES OF COMMON FUNCTIONS (7 items)
// ============================================================
add(
  'What are the derivatives of polynomial and power functions?',
  'Polynomial and power function derivatives: (1) Constant: d/dx[c] = 0. (2) Power Rule: d/dx[x^n] = n·x^(n-1) (any real n). (3) Linear: d/dx[mx + b] = m. (4) General polynomial: d/dx[a_n x^n + ... + a_1 x + a_0] = n a_n x^{n-1} + ... + a_1. Special power forms: (5) d/dx[1/x] = d/dx[x^{-1}] = -x^{-2} = -1/x^2. (6) d/dx[1/x^n] = d/dx[x^{-n}] = -n x^{-n-1} = -n/x^{n+1}. (7) d/dx[sqrt(x)] = d/dx[x^{1/2}] = (1/2) x^{-1/2} = 1/(2 sqrt(x)). (8) d/dx[1/sqrt(x)] = d/dx[x^{-1/2}] = (-1/2) x^{-3/2} = -1/(2 x sqrt(x)). Worked example: d/dx[4x^5 - 2x^3 + 7/x - 3 sqrt(x) + 8] = 20x^4 - 6x^2 + 7·(-1/x^2) - 3/(2 sqrt(x)) + 0 = 20x^4 - 6x^2 - 7/x^2 - 3/(2 sqrt(x)). The Power Rule is the single most important rule — combined with linearity, it handles all polynomials and rational functions. ✓',
  'ch04p1_polynomial_power_derivatives',
  'formula_recall',
  ['polynomial', 'power function', 'derivative', 'power rule', 'rational']
)

add(
  'What are the derivatives of exponential and logarithmic functions?',
  'Exponential and logarithmic derivatives: (1) Natural exponential: d/dx[e^x] = e^x (the unique function equal to its own derivative, with value 1 at 0). (2) General exponential: d/dx[a^x] = a^x · ln(a) (for a > 0, a ≠ 1). (3) Natural log: d/dx[ln x] = 1/x (for x > 0). (4) General log: d/dx[log_a x] = 1/(x ln a). (5) With chain rule: d/dx[e^{g(x)}] = e^{g(x)}·g\'(x). (6) d/dx[ln|g(x)|] = g\'(x)/g(x) (valid for g(x) ≠ 0; the absolute value extends domain to negatives). Worked examples: d/dx[e^{3x}] = e^{3x}·3 = 3e^{3x}. d/dx[2^x] = 2^x · ln 2. d/dx[ln(x^2 + 1)] = 2x/(x^2 + 1). d/dx[ln|cos x|] = -sin x/cos x = -tan x. d/dx[e^{x^2}] = 2x·e^{x^2}. Note: the natural exponential e^x is its own derivative — this is WHY e is the "natural" base (the constant is chosen to make the derivative of a^x equal a^x). ✓',
  'ch04p1_exponential_log_derivatives',
  'formula_recall',
  ['exponential', 'logarithm', 'derivative', 'natural log', 'e to the x']
)

add(
  'What are the derivatives of the basic trigonometric functions (sin, cos, tan)?',
  'Trigonometric derivatives (use radians): (1) d/dx[sin x] = cos x. (2) d/dx[cos x] = -sin x (note the negative sign!). (3) d/dx[tan x] = sec^2 x. Easy memorization: the derivatives of "co-" functions (cos, cot, csc) are NEGATIVE; the derivatives of sin, tan, sec are POSITIVE. Worked example 1: d/dx[sin(3x)] = cos(3x)·3 = 3 cos(3x) (chain rule). Worked example 2: d/dx[cos(x^2)] = -sin(x^2)·2x = -2x sin(x^2). Worked example 3: d/dx[tan(ln x)] = sec^2(ln x)·(1/x) = sec^2(ln x)/x. Worked example 4: d/dx[x^2 sin x] = 2x·sin x + x^2·cos x (product rule). The derivative of sin x = cos x is proved from the definition: lim_{h->0} [sin(x+h) - sin x]/h = lim [sin x cos h + cos x sin h - sin x]/h = sin x·lim[(cos h - 1)/h] + cos x·lim[sin h/h] = sin x·0 + cos x·1 = cos x. ✓',
  'ch04p1_trig_derivatives',
  'formula_recall',
  ['trigonometric', 'derivative', 'sin', 'cos', 'tan', 'sec squared']
)

add(
  'What are the derivatives of secant, cosecant, and cotangent?',
  'Other trig derivatives: (1) d/dx[sec x] = sec x · tan x. (2) d/dx[csc x] = -csc x · cot x (negative — "co-" rule). (3) d/dx[cot x] = -csc^2 x (negative — "co-" rule). Derivation (sec): d/dx[sec x] = d/dx[1/cos x]. Quotient rule: [0·cos x - 1·(-sin x)]/cos^2 x = sin x/cos^2 x = (1/cos x)·(sin x/cos x) = sec x · tan x. ✓ Derivation (cot): d/dx[cot x] = d/dx[cos x/sin x] = [(-sin x)(sin x) - (cos x)(cos x)]/sin^2 x = -(sin^2 x + cos^2 x)/sin^2 x = -1/sin^2 x = -csc^2 x. ✓ Worked examples: d/dx[sec(2x)] = sec(2x)·tan(2x)·2 = 2 sec(2x) tan(2x). d/dx[x csc x] = csc x + x·(-csc x cot x) = csc x - x csc x cot x. d/dx[cot(sqrt(x))] = -csc^2(sqrt(x))·(1/(2 sqrt(x))). Mnemonic: the three "co-" functions (cos, cot, csc) have NEGATIVE derivatives; the three non-co (sin, tan, sec) have POSITIVE derivatives. ✓',
  'ch04p1_other_trig_derivatives',
  'formula_recall',
  ['secant', 'cosecant', 'cotangent', 'derivative', 'co-function negative']
)

add(
  'What are the derivatives of the inverse trigonometric functions?',
  'Inverse trig derivatives (memorize): (1) d/dx[arcsin x] = 1/sqrt(1 - x^2), for |x| < 1. (2) d/dx[arccos x] = -1/sqrt(1 - x^2) (negative — "co-" rule). (3) d/dx[arctan x] = 1/(1 + x^2), for all x. (4) d/dx[arccot x] = -1/(1 + x^2) (negative). (5) d/dx[arcsec x] = 1/(|x| sqrt(x^2 - 1)), for |x| > 1. (6) d/dx[arccsc x] = -1/(|x| sqrt(x^2 - 1)) (negative). Derivation (arctan): Let y = arctan x, so tan y = x. Differentiate implicitly: sec^2 y · dy/dx = 1. So dy/dx = 1/sec^2 y = 1/(1 + tan^2 y) = 1/(1 + x^2). ✓ Worked examples: d/dx[arcsin(2x)] = (1/sqrt(1 - 4x^2))·2 = 2/sqrt(1 - 4x^2). d/dx[arctan(x^2)] = (1/(1 + x^4))·2x = 2x/(1 + x^4). d/dx[arctan(ln x)] = (1/(1 + (ln x)^2))·(1/x). The arctan derivative 1/(1+x^2) is foundational for integration (∫ dx/(1+x^2) = arctan x + C). ✓',
  'ch04p1_inverse_trig_derivatives',
  'formula_recall',
  ['inverse trig', 'arcsin', 'arccos', 'arctan', 'derivative', 'arcsec']
)

add(
  'What are the derivatives of the hyperbolic functions?',
  'Hyperbolic derivatives: (1) d/dx[sinh x] = cosh x. (2) d/dx[cosh x] = sinh x (note: POSITIVE, unlike cos which has a negative derivative). (3) d/dx[tanh x] = sech^2 x. (4) d/dx[coth x] = -csch^2 x. (5) d/dx[sech x] = -sech x · tanh x. (6) d/dx[csch x] = -csch x · coth x. Definitions: sinh x = (e^x - e^{-x})/2, cosh x = (e^x + e^{-x})/2, tanh x = sinh x / cosh x, sech x = 1/cosh x, csch x = 1/sinh x, coth x = cosh x / sinh x. Derivation (sinh): d/dx[(e^x - e^{-x})/2] = (e^x + e^{-x})/2 = cosh x. ✓ Derivation (cosh): d/dx[(e^x + e^{-x})/2] = (e^x - e^{-x})/2 = sinh x (positive because of the chain rule on e^{-x}: -e^{-x}, and the sign flips). Identity: cosh^2 x - sinh^2 x = 1 (analogue of cos^2 + sin^2 = 1, but with a minus). Hyperbolic functions model catenaries, hanging cables, and relativistic velocity addition. Worked: d/dx[sinh(3x)] = 3 cosh(3x). d/dx[cosh(x^2)] = 2x sinh(x^2). ✓',
  'ch04p1_hyperbolic_derivatives',
  'formula_recall',
  ['hyperbolic', 'sinh', 'cosh', 'tanh', 'derivative', 'sech']
)

add(
  'What are the derivatives of the inverse hyperbolic functions?',
  'Inverse hyperbolic derivatives: (1) d/dx[arcsinh x] = 1/sqrt(x^2 + 1), for all x. (2) d/dx[arccosh x] = 1/sqrt(x^2 - 1), for x > 1. (3) d/dx[arctanh x] = 1/(1 - x^2), for |x| < 1. (4) d/dx[arccoth x] = 1/(1 - x^2), for |x| > 1 (same formula as arctanh, different domain). (5) d/dx[arcsech x] = -1/(x sqrt(1 - x^2)), for 0 < x < 1. (6) d/dx[arccsch x] = -1/(|x| sqrt(x^2 + 1)), for x ≠ 0. Logarithmic forms (often more convenient): arcsinh x = ln(x + sqrt(x^2 + 1)). arccosh x = ln(x + sqrt(x^2 - 1)). arctanh x = (1/2) ln((1+x)/(1-x)). Derivation (arctanh via logs): d/dx[(1/2)(ln(1+x) - ln(1-x))] = (1/2)(1/(1+x) + 1/(1-x)) = (1/2)·((1-x + 1+x)/(1-x^2)) = 1/(1-x^2). ✓ Compare with inverse trig: arctan x has derivative 1/(1+x^2) (plus sign); arctanh x has 1/(1-x^2) (minus sign) — a beautiful parallel between trig and hyperbolic. Worked: d/dx[arcsinh(2x)] = 2/sqrt(4x^2 + 1). ✓',
  'ch04p1_inverse_hyperbolic_derivatives',
  'formula_recall',
  ['inverse hyperbolic', 'arcsinh', 'arccosh', 'arctanh', 'derivative', 'logarithmic form']
)

// ============================================================
// SECTION 7 — IMPLICIT DIFFERENTIATION & HIGHER-ORDER (6 items)
// ============================================================
add(
  'What is implicit differentiation and when is it used?',
  'Implicit differentiation: A technique for finding dy/dx when y is defined IMPLICITLY as a function of x (i.e., y is not solved explicitly as y = f(x)). Procedure: (1) Differentiate BOTH sides of the equation with respect to x, treating y as a function of x (use chain rule: d/dx[f(y)] = f\'(y)·dy/dx). (2) Collect terms containing dy/dx on one side. (3) Factor out dy/dx. (4) Solve for dy/dx algebraically. Used when: y cannot be solved for explicitly (e.g., x^2 + y^2 = 1, x^3 + y^3 = 6xy), or solving would be messy. Worked example: Find dy/dx for x^2 + y^2 = 25. Differentiate both sides: 2x + 2y·(dy/dx) = 0. Solve: dy/dx = -2x/(2y) = -x/y. At point (3, 4): dy/dx = -3/4. (Note: this matches the explicit derivative of y = sqrt(25 - x^2): dy/dx = -x/sqrt(25 - x^2) = -x/y.) The result often depends on BOTH x and y, evaluated at a specific point. ✓',
  'ch04p1_implicit_differentiation',
  'how_to',
  ['implicit differentiation', 'chain rule', 'dy/dx', 'implicit', 'technique']
)

add(
  'How do you find dy/dx and the tangent line for an implicitly defined curve (worked example)?',
  'Worked implicit differentiation example: For the curve x^2 y + sin y = 0, find dy/dx and the tangent line at (1, π). Step 1 — Differentiate both sides w.r.t. x (use product rule on x^2 y, chain rule on sin y): d/dx[x^2 y] = 2x·y + x^2·(dy/dx). d/dx[sin y] = cos y · (dy/dx). So: 2x·y + x^2·(dy/dx) + cos y · (dy/dx) = 0. Step 2 — Collect dy/dx terms: (x^2 + cos y)·(dy/dx) = -2xy. Step 3 — Solve: dy/dx = -2xy / (x^2 + cos y). Step 4 — Evaluate at (1, π): dy/dx = -2(1)(π) / (1 + cos π) = -2π / (1 - 1) = -2π/0 — undefined! So the tangent is VERTICAL at (1, π). Step 5 — Vertical tangent line: x = 1. Worked example 2 (non-vertical): x^3 + y^3 = 9 at (1, 2). dy/dx = -x^2/y^2 (from differentiating: 3x^2 + 3y^2 dy/dx = 0). At (1, 2): dy/dx = -1/4. Tangent: y - 2 = (-1/4)(x - 1). ✓',
  'ch04p1_implicit_worked',
  'problem_solving',
  ['implicit', 'worked example', 'tangent line', 'vertical tangent', 'evaluate']
)

add(
  'What is logarithmic differentiation and when should you use it?',
  'Logarithmic differentiation: Take the natural log of both sides of y = f(x), then differentiate implicitly. Used when: (1) the function is a PRODUCT/QUOTIENT of many factors (log turns products into sums, easier to differentiate), (2) the function has a VARIABLE in both the base AND the exponent (like x^x or (sin x)^x), (3) the function involves complicated powers. Procedure: (1) Take ln of both sides: ln y = ln f(x). (2) Simplify using log laws: ln(a·b) = ln a + ln b; ln(a/b) = ln a - ln b; ln(a^b) = b·ln a. (3) Differentiate both sides w.r.t. x: (1/y)·(dy/dx) = derivative of right side. (4) Solve for dy/dx: dy/dx = y · (derivative of right side). (5) Substitute back y = f(x). Worked example: y = x^x. ln y = x·ln x. (1/y)(dy/dx) = ln x + x·(1/x) = ln x + 1. So dy/dx = y·(ln x + 1) = x^x (ln x + 1). Worked example 2: y = (x^2 + 1)^5 / (x + 2)^3. ln y = 5 ln(x^2 + 1) - 3 ln(x + 2). (1/y)(dy/dx) = 5·2x/(x^2 + 1) - 3/(x + 2). dy/dx = y·[10x/(x^2+1) - 3/(x+2)]. ✓',
  'ch04p1_logarithmic_differentiation',
  'how_to',
  ['logarithmic differentiation', 'ln', 'variable exponent', 'product of factors', 'technique']
)

add(
  'What is the second derivative and what does it represent?',
  'Second derivative: f\'\'(x) = d/dx[f\'(x)] = d^2y/dx^2 — the derivative of the derivative. Computed by differentiating f\'(x). Notation: f\'\'(x), y\'\', d^2y/dx^2, D^2 f. Physical interpretation: If y = s(t) is position, then s\'(t) = v(t) is velocity, and s\'\'(t) = a(t) is acceleration (rate of change of velocity). Geometric interpretation: f\'\'(x) measures concavity — f\'\'>0 means concave up (∪ shape), f\'\'<0 means concave down (∩ shape), f\'\'=0 may indicate an inflection point (where concavity changes). Worked examples: f(x) = x^4: f\' = 4x^3, f\'\' = 12x^2 (always ≥ 0, concave up everywhere). f(x) = sin x: f\' = cos x, f\'\' = -sin x (concave down when sin x > 0, concave up when sin x < 0). f(x) = e^x: f\'\' = e^x (always positive, concave up). f(x) = ln x: f\' = 1/x, f\'\' = -1/x^2 (always negative, concave down). The second derivative also appears in the Second Derivative Test for classifying local extrema and in Taylor series (the x^2 coefficient is f\'\'(a)/2!). ✓',
  'ch04p1_second_derivative',
  'formula_recall',
  ['second derivative', 'concavity', 'acceleration', 'd^2y/dx^2', 'inflection']
)

add(
  'What are higher-order derivatives and how are they computed?',
  'Higher-order derivatives: The n-th derivative f^(n)(x) is obtained by differentiating f n times. Notation: f\'(x), f\'\'(x), f\'\'\'(x), f^(4)(x), ..., f^(n)(x); or y\', y\'\', y\'\'\', y^(4), ..., y^(n); or d^n y/dx^n. Compute by repeatedly applying differentiation rules. Worked example 1: f(x) = x^5. f\' = 5x^4, f\'\' = 20x^3, f\'\'\' = 60x^2, f^(4) = 120x, f^(5) = 120, f^(6) = 0 (and all higher derivatives are 0). Worked example 2: f(x) = sin x. f\' = cos x, f\'\' = -sin x, f\'\'\' = -cos x, f^(4) = sin x. CYCLE of period 4: sin x -> cos x -> -sin x -> -cos x -> sin x. General: f^(n)(x) = sin(x + nπ/2). Worked example 3: f(x) = e^(2x). f\' = 2e^(2x), f\'\' = 4e^(2x), f^(n) = 2^n · e^(2x). Worked example 4: f(x) = 1/x = x^{-1}. f\' = -x^{-2}, f\'\' = 2x^{-3}, f\'\'\' = -6x^{-4}, f^(n) = (-1)^n · n! · x^{-(n+1)}. Higher-order derivatives are essential for Taylor/Maclaurin series (coefficients are f^(n)(a)/n!) and for solving differential equations. ✓',
  'ch04p1_higher_order_derivatives',
  'formula_recall',
  ['higher order derivative', 'nth derivative', 'repeated differentiation', 'cycle', 'factorial']
)

add(
  'How do you compute higher-order derivatives of a complicated function (worked example)?',
  'Worked higher-order derivative example: Find f\'\'(x) for f(x) = x^2 · e^(3x). Use product rule repeatedly. Step 1 — First derivative (product rule): f\'(x) = (2x)·e^(3x) + x^2 · (3 e^(3x)) = e^(3x)(2x + 3x^2) = e^(3x)(3x^2 + 2x). Step 2 — Second derivative (product rule on f\' = e^(3x) · (3x^2 + 2x)): f\'\'(x) = (3 e^(3x))(3x^2 + 2x) + e^(3x)(6x + 2) = e^(3x)[3(3x^2 + 2x) + 6x + 2] = e^(3x)[9x^2 + 6x + 6x + 2] = e^(3x)(9x^2 + 12x + 2). Step 3 — Third derivative (for practice): f\'\'\'(x) = (3 e^(3x))(9x^2 + 12x + 2) + e^(3x)(18x + 12) = e^(3x)[27x^2 + 36x + 6 + 18x + 12] = e^(3x)(27x^2 + 54x + 18). Pattern: f^(n)(x) = e^(3x) · P_n(x), where P_n is a degree-n polynomial (since each derivative multiplies the polynomial by 3 and adds the derivative of the polynomial). For verification, the third Taylor coefficient of f at 0 is f\'\'\'(0)/3! = (1·18)/6 = 3, so T_3(x) = 0 + 0·x + (2/2)x^2 + 3x^3 = x^2 + x^3 (matches the expansion of x^2 e^(3x) ≈ x^2(1 + 3x + ...) up to degree 3). ✓',
  'ch04p1_higher_order_worked',
  'problem_solving',
  ['higher order', 'worked example', 'product rule', 'repeated', 'exponential']
)

// ============================================================
// SECTION 8 — RELATED RATES & LINEAR APPROXIMATION INTRO (6 items)
// ============================================================
add(
  'What is the related rates technique and what is the general procedure?',
  'Related rates: When two or more quantities vary with time and are related by an equation, differentiating the equation with respect to time t (using the chain rule) yields an equation relating their rates of change. General procedure: (1) Identify all variables and their rates of change (e.g., dy/dt, dx/dt). Identify which rate is the unknown to be solved for. (2) Write an equation relating the VARIABLES (not the rates). (3) Differentiate BOTH sides of the equation with respect to t, using the chain rule (treat each variable as a function of t: d/dt[f(x)] = f\'(x)·dx/dt). (4) Substitute the known values of variables AND known rates. (5) Solve for the unknown rate. IMPORTANT: substitute numerical values of variables AFTER differentiating, not before (differentiating an equation with constants substituted is generally wrong). Worked example: A circle\'s radius grows with dr/dt = 3 cm/s. Find dA/dt when r = 5. Relation: A = π r^2. Differentiate: dA/dt = 2π r · dr/dt. Substitute r = 5, dr/dt = 3: dA/dt = 2π(5)(3) = 30π ≈ 94.25 cm^2/s. ✓',
  'ch04p1_related_rates_intro',
  'how_to',
  ['related rates', 'chain rule', 'time derivative', 'procedure', 'technique']
)

add(
  'How do you solve a related rates problem involving an expanding sphere (worked example)?',
  'Worked related rates — expanding sphere: A spherical balloon is being inflated. Air is pumped in at dV/dt = 100 cm^3/s. Find dr/dt (rate of radius increase) when r = 5 cm. Step 1 — Variables: V (volume), r (radius), t (time). Known: dV/dt = 100. Unknown: dr/dt when r = 5. Step 2 — Relation: V = (4/3)π r^3. Step 3 — Differentiate w.r.t. t: dV/dt = (4/3)π · 3r^2 · dr/dt = 4π r^2 · dr/dt. Step 4 — Solve for dr/dt: dr/dt = (dV/dt) / (4π r^2). Step 5 — Substitute r = 5, dV/dt = 100: dr/dt = 100 / (4π · 25) = 100/(100π) = 1/π ≈ 0.318 cm/s. Sanity check: at r = 5, surface area = 4π(25) = 100π; the rate of volume increase divided by surface area gives the radial growth rate — makes physical sense (each cm^2 of surface gets 1/π cm^3/s of new volume). Worked extension: find dA/dt (rate of surface area growth) when r = 5. A = 4π r^2. dA/dt = 8π r · dr/dt = 8π(5)(1/π) = 40 cm^2/s. ✓',
  'ch04p1_related_rates_worked_sphere',
  'problem_solving',
  ['related rates', 'sphere', 'volume', 'radius', 'expanding balloon']
)

add(
  'How do you solve a related rates problem involving a filling cone (worked example)?',
  'Worked related rates — filling conical tank: Water pours into a conical tank (point down) at dV/dt = 2 m^3/min. The tank has height 8 m and top radius 4 m. How fast is the water level rising (dh/dt) when h = 5 m? Step 1 — Variables: V (water volume), h (water depth), r (water surface radius), t (time). Known: dV/dt = 2. Unknown: dh/dt when h = 5. Step 2 — Relation: V = (1/3)π r^2 h. BUT r changes with h (the water surface shrinks as it goes down). Need a SECOND relation between r and h. Step 2b — Use similar triangles (cross-section of cone): r/h = (top radius)/(total height) = 4/8 = 1/2. So r = h/2. Step 2c — Substitute: V = (1/3)π (h/2)^2 h = (1/3)π (h^2/4) h = (π/12) h^3. Step 3 — Differentiate w.r.t. t: dV/dt = (π/12) · 3h^2 · dh/dt = (π/4) h^2 · dh/dt. Step 4 — Solve for dh/dt: dh/dt = (4 · dV/dt) / (π h^2). Step 5 — Substitute h = 5, dV/dt = 2: dh/dt = (4·2)/(π·25) = 8/(25π) ≈ 0.102 m/min. (About 10 cm/min.) The key insight is to express V in terms of ONE variable (h) using similar triangles BEFORE differentiating. ✓',
  'ch04p1_related_rates_worked_cone',
  'problem_solving',
  ['related rates', 'cone', 'similar triangles', 'water filling', 'volume']
)

add(
  'What is linear approximation (linearization) and how do you use it?',
  'Linear approximation (linearization): For a function f differentiable at x = a, the linearization at a is L(x) = f(a) + f\'(a)·(x - a). For x close to a, f(x) ≈ L(x). The linearization is the equation of the tangent line at (a, f(a)), and it is the best linear (degree-1 polynomial) approximation to f near a. The approximation is good when: (1) |x - a| is small, (2) f\'\'(a) is not too large (small curvature). Worked example 1: Estimate sqrt(4.1) without a calculator. f(x) = sqrt(x), a = 4. f(4) = 2, f\'(x) = 1/(2 sqrt(x)), f\'(4) = 1/4. L(x) = 2 + (1/4)(x - 4). L(4.1) = 2 + (1/4)(0.1) = 2 + 0.025 = 2.025. (Actual sqrt(4.1) ≈ 2.024845... — error ≈ 0.00015.) Worked example 2: Estimate (1.98)^3. f(x) = x^3, a = 2. f(2) = 8, f\'(x) = 3x^2, f\'(2) = 12. L(x) = 8 + 12(x - 2). L(1.98) = 8 + 12(-0.02) = 8 - 0.24 = 7.76. (Actual 1.98^3 = 7.762392... — error ≈ 0.0024.) Common linearizations near 0: (1+x)^n ≈ 1 + nx, sqrt(1+x) ≈ 1 + x/2, e^x ≈ 1 + x, ln(1+x) ≈ x, sin x ≈ x, cos x ≈ 1. ✓',
  'ch04p1_linear_approximation_intro',
  'formula_recall',
  ['linear approximation', 'linearization', 'tangent line', 'estimate', 'near point']
)

add(
  'What are differentials and how are they used to estimate changes?',
  'Differentials: For y = f(x), the differential dy is defined as dy = f\'(x)·dx, where dx is an independent increment in x (taken as Δx, the actual change in x). For small dx, the actual change Δy = f(x + dx) - f(x) is APPROXIMATELY equal to dy: Δy ≈ dy = f\'(x)·dx. Geometrically: dy is the change along the TANGENT line, while Δy is the change along the CURVE. The difference (Δy - dy) is the error of the linear approximation, which is roughly (1/2)·f\'\'(x)·(dx)^2 for small dx. Worked example 1: Estimate the change in y = x^3 when x goes from 2 to 2.01. dy = 3x^2 · dx = 3·4·0.01 = 0.12. (Actual Δy = 2.01^3 - 2^3 = 8.120601 - 8 = 0.120601 — close to dy = 0.12.) Worked example 2: Use differentials to estimate (2.5)^4. Let f(x) = x^4, a = 2 (so f(a) = 16), dx = 0.5. df = f\'(a)·dx = 4·(2^3)·0.5 = 4·8·0.5 = 16. So f(2.5) ≈ f(2) + df = 16 + 16 = 32. (Actual 2.5^4 = 39.0625 — linear approximation is rough here because dx = 0.5 is not small.) For better accuracy, use Taylor polynomials (next part). Differentials formalize the "linear change" intuition and extend naturally to multivariable calculus (dz = f_x dx + f_y dy). ✓',
  'ch04p1_differentials_intro',
  'formula_recall',
  ['differentials', 'dy', 'dx', 'small change', 'tangent', 'estimate']
)

add(
  'How do you use differentials to estimate propagated measurement errors?',
  'Error propagation with differentials: If a quantity Q = f(x) and x has a measurement error dx (or Δx), the propagated error in Q is approximately dQ = f\'(x)·dx. The RELATIVE error is |dQ/Q| = |f\'(x)·dx / f(x)|, and the PERCENTAGE error is 100·|dQ/Q|%. For products/powers, relative errors add (use logarithmic differentiation). Worked example 1: The radius of a sphere is measured as r = 10 cm with a possible error dr = 0.1 cm. Estimate the propagated error in (a) surface area A = 4π r^2 and (b) volume V = (4/3)π r^3. (a) dA = 8π r·dr = 8π·10·0.1 = 8π ≈ 25.13 cm^2. Relative error: |dA/A| = 8π/(4π·100) = 8/400 = 0.02 = 2%. (b) dV = 4π r^2·dr = 4π·100·0.1 = 40π ≈ 125.66 cm^3. Relative error: |dV/V| = 40π/((4/3)π·1000) = 40/(4/3·1000) = 120/4000 = 0.03 = 3%. Worked example 2: For Q = x^a y^b, the relative error is approximately |a·dx/x| + |b·dy/y| (powers multiply relative errors by the exponent; products add relative errors). So if x has 2% error and y has 3% error, then Q = x^2 y has relative error ≈ 2·2% + 1·3% = 7%. ✓',
  'ch04p1_differential_error_estimation',
  'problem_solving',
  ['error propagation', 'differentials', 'relative error', 'percentage error', 'measurement']
)

// ============================================================
// SECTION 9 — WORKED PROBLEMS & TECHNIQUE (4 items)
// ============================================================
add(
  'How do you write a formal ε-δ proof of a limit (worked example)?',
  'Worked ε-δ proof: Prove lim_{x->5} (3x - 2) = 13. Goal: For any ε > 0, find δ > 0 such that 0 < |x - 5| < δ implies |(3x - 2) - 13| < ε. Step 1 — Simplify |f(x) - L|: |(3x - 2) - 13| = |3x - 15| = 3|x - 5|. Step 2 — Relate to |x - a|: We want 3|x - 5| < ε, i.e., |x - 5| < ε/3. Step 3 — Choose δ: Let δ = ε/3. Step 4 — Verify: If 0 < |x - 5| < δ = ε/3, then |f(x) - L| = 3|x - 5| < 3·(ε/3) = ε. ✓ QED. Worked example 2 (quadratic): Prove lim_{x->3} x^2 = 9. We want |x^2 - 9| = |x - 3|·|x + 3| < ε. To bound |x + 3|, first restrict δ ≤ 1: then |x - 3| < 1, so 2 < x < 4, so |x + 3| < 7. Now |x^2 - 9| < 7|x - 3|. Want 7|x - 3| < ε, i.e., |x - 3| < ε/7. Choose δ = min(1, ε/7). If |x - 3| < δ, then |x^2 - 9| = |x - 3|·|x + 3| < (ε/7)·7 = ε. ✓ QED. General strategy: restrict δ ≤ some constant to bound any "troublesome" factor, then choose δ as the minimum of that constant and ε divided by the bound. ✓',
  'ch04p1_epsilon_delta_worked',
  'problem_solving',
  ['epsilon delta', 'proof', 'worked example', 'formal', 'limit']
)

add(
  'How do you verify whether a piecewise function is continuous (worked example)?',
  'Worked continuity verification: Determine where f is continuous, where f(x) = { x^2 + 1, if x ≤ 2; 5 - x, if x > 2 }. Step 1 — Check continuity on each piece. (a) For x < 2: f(x) = x^2 + 1, a polynomial — continuous for all x < 2. (b) For x > 2: f(x) = 5 - x, a polynomial — continuous for all x > 2. Step 2 — Check the boundary x = 2 (where the formula changes). Use the three-part definition: (i) f(2) is defined: f(2) = 2^2 + 1 = 5 (using the x ≤ 2 branch). ✓ (ii) lim_{x->2} f(x) exists: need both one-sided limits to agree. Left: lim_{x->2^-} (x^2 + 1) = 5. Right: lim_{x->2^+} (5 - x) = 3. Since 5 ≠ 3, the two-sided limit DOES NOT EXIST. So f is NOT continuous at x = 2. The discontinuity is a JUMP (both one-sided limits exist as finite numbers but differ). Step 3 — Conclusion: f is continuous on (-∞, 2) ∪ (2, ∞), discontinuous at x = 2 (jump discontinuity of magnitude 5 - 3 = 2). Worked example 2: Find k so that g(x) = { x + 1, x ≤ 1; kx^2, x > 1 } is continuous everywhere. At x = 1: left limit = 1 + 1 = 2; right limit = k·1 = k. Need k = 2. ✓',
  'ch04p1_continuity_verification',
  'problem_solving',
  ['continuity', 'piecewise', 'verification', 'jump discontinuity', 'worked example']
)

add(
  'What algebraic techniques help evaluate limits that are initially 0/0 or ∞/∞?',
  'Algebraic techniques for indeterminate limits (without using L\'Hôpital\'s Rule): (1) FACTORING AND CANCELING: For rational functions giving 0/0, factor numerator and denominator, cancel common factor, then plug in. Example: lim_{x->2} (x^2 - 4)/(x - 2) = lim_{x->2} (x-2)(x+2)/(x-2) = lim (x+2) = 4. (2) RATIONALIZING (multiplying by conjugate): For limits involving square roots. Example: lim_{x->0} (sqrt(1+x) - 1)/x. Multiply by (sqrt(1+x)+1)/(sqrt(1+x)+1): numerator becomes (1+x) - 1 = x. So = x/[x(sqrt(1+x)+1)] = 1/(sqrt(1+x)+1) -> 1/2. (3) COMBINING FRACTIONS: For limits like (1/x - 1/a)/... common denominator. (4) SQUEEZE THEOREM: For oscillating terms like sin(1/x) multiplied by something going to 0. (5) CHANGE OF VARIABLE: Substitute to simplify. (6) DIVIDE BY HIGHEST POWER (for limits at infinity of rational functions). (7) USE KNOWN SPECIAL LIMITS: sin x/x -> 1, (e^x - 1)/x -> 1, ln(1+x)/x -> 1. Worked: lim_{x->0} (1 - cos x)/x^2. Multiply by (1 + cos x)/(1 + cos x): = (1 - cos^2 x)/(x^2(1 + cos x)) = sin^2 x / [x^2(1 + cos x)] = (sin x / x)^2 · 1/(1 + cos x) -> 1 · 1/2 = 1/2. ✓ These techniques should be tried before invoking L\'Hôpital\'s Rule, which is covered in the next part (ch04p2).',
  'ch04p1_limit_algebraic_techniques',
  'how_to',
  ['limit', 'algebraic', 'factoring', 'rationalizing', 'squeeze', '0/0']
)

add(
  'How do you find dy/dx for parametric equations x = f(t), y = g(t)?',
  'Parametric derivatives: For a curve defined parametrically by x = f(t), y = g(t) (with f, g differentiable), the derivative dy/dx is given by the chain rule: dy/dx = (dy/dt)/(dx/dt) = g\'(t)/f\'(t), provided f\'(t) ≠ 0. This gives dy/dx as a function of the PARAMETER t (not directly of x or y). To find the slope at a specific point (x(t_0), y(t_0)), evaluate at t = t_0. Second derivative: d^2y/dx^2 = d/dx[dy/dx] = (d/dt[dy/dx]) / (dx/dt). Be careful: do NOT just differentiate g\'(t)/f\'(t) w.r.t. t and call it d^2y/dx^2 — you must divide by dx/dt = f\'(t) again to convert from t-derivative to x-derivative. Worked example: x = t^2, y = t^3. (a) dy/dx = (dy/dt)/(dx/dt) = (3t^2)/(2t) = (3t)/2 (for t ≠ 0). (b) At t = 2: point (4, 8), slope dy/dx = (3·2)/2 = 3. Tangent line: y - 8 = 3(x - 4), i.e., y = 3x - 4. (c) Second derivative: d/dt[dy/dx] = d/dt[3t/2] = 3/2. Then d^2y/dx^2 = (3/2)/(dx/dt) = (3/2)/(2t) = 3/(4t). At t = 2: d^2y/dx^2 = 3/8 > 0 (concave up). ✓ Worked example 2: Cycloid x = t - sin t, y = 1 - cos t. dy/dx = sin t/(1 - cos t). At t = π: dy/dx = 0/2 = 0 (horizontal tangent at the top of the arch). ✓',
  'ch04p1_parametric_derivatives',
  'problem_solving',
  ['parametric', 'derivative', 'chain rule', 'second derivative', 'cycloid']
)

// ============================================================
// VALIDATION & WRITE
// ============================================================

const topicSet = new Set<string>()
const dupes: string[] = []
for (const it of items) {
  if (topicSet.has(it.topic)) dupes.push(it.topic)
  topicSet.add(it.topic)
}
if (dupes.length) {
  console.error('DUPLICATE TOPICS:', dupes)
  process.exit(1)
}

for (const it of items) {
  if (!it.question || !it.answer || !it.topic || !it.keywords.length) {
    console.error('INVALID ITEM:', it.topic)
    process.exit(1)
  }
  if (it.answer.length < 200) {
    console.error('SUSPICIOUSLY SHORT ANSWER:', it.topic, it.answer.length)
    process.exit(1)
  }
}

const out = {
  generatedAt: new Date().toISOString(),
  totalItems: items.length,
  subject: 'mathematics_formulas_volume_9_chapter_04_part_01',
  volume:
    'Volume 9 — Comprehensive Formula Encyclopedia, Chapter 4 Part 1 (Differential Calculus Foundations — Limits: Intuitive & ε-δ Definition, One-Sided Limits, Limit Laws, Limits at Infinity, Infinite Limits, Squeeze Theorem, Special Limits sin x/x and (1-1/x)^x; Continuity: Definition, Types of Discontinuities, Intermediate Value Theorem; The Derivative: Difference Quotient Definition, Tangent Lines, Differentiability vs Continuity; Differentiation Rules: Power, Sum, Product, Quotient, Chain; Derivatives of Common Functions: Polynomial, Exponential, Logarithmic, Trigonometric, Inverse Trig, Hyperbolic, Inverse Hyperbolic; Implicit Differentiation, Logarithmic Differentiation, Higher-Order Derivatives, Parametric Derivatives; Related Rates (Intro & Worked Problems); Linear Approximation & Differentials)',
  source: 'TRIZA Generated Formula Dataset',
  language: 'en',
  religionNeutral: true,
  items,
}

mkdirSync('data', { recursive: true })
writeFileSync('data/math-formulas-vol9-ch04p1.json', JSON.stringify(out, null, 2))

console.log(`Wrote data/math-formulas-vol9-ch04p1.json with ${items.length} items.`)
console.log('Topics:')
for (const it of items) console.log('  -', it.topic)
const intents = items.reduce<Record<string, number>>((a, it) => {
  a[it.intent] = (a[it.intent] || 0) + 1
  return a
}, {})
console.log('Intent counts:', intents)
const lengths = items.map((i) => i.answer.length)
console.log(
  'Answer lengths: min',
  Math.min(...lengths),
  'max',
  Math.max(...lengths),
  'avg',
  Math.round(lengths.reduce((a, b) => a + b, 0) / lengths.length)
)
