/**
 * ============================================================
 *  Mathematics Formula Encyclopedia — Volume 9
 *  Comprehensive Formula Reference
 *  Chapter 1 — Part 1 (Elementary Algebra)
 *  Real Number System, Field Axioms, Order Properties,
 *  Absolute Value, Exponents, Radicals & Rationalization,
 *  Scientific Notation, Polynomials, Factoring Techniques,
 *  Rational Expressions, Partial Fraction Decomposition Basics
 *  Generator for TRIZA
 * ============================================================
 *
 *  Output: data/math-formulas-vol9-ch01p1.json
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
// SECTION 1 — REAL NUMBER SYSTEM (5 items)
// ============================================================
add(
  'What are the major subsets of the real number system?',
  'The real number system R is built from nested subsets: **N (natural)** = {1, 2, 3, ...} (counting numbers; sometimes includes 0). **W (whole)** = {0, 1, 2, ...}. **Z (integers)** = {..., -2, -1, 0, 1, 2, ...}. **Q (rational)** = {p/q : p, q in Z, q != 0} — numbers expressible as a ratio of integers (decimal terminates or repeats). **I (irrational)** = real numbers not in Q (e.g. sqrt(2), pi, e) — decimals neither terminate nor repeat. **R (real)** = Q ∪ I — all points on the number line. Hierarchy: N ⊂ W ⊂ Z ⊂ Q ⊂ R, and I ⊂ R with Q ∩ I = ∅, Q ∪ I = R. Example: 3 in N, -7 in Z\\N, 0.75 = 3/4 in Q, sqrt(3) in I. ✓',
  'ch01p1_real_number_system',
  'factual_question',
  ['real numbers', 'natural', 'integer', 'rational', 'irrational', 'subsets']
)

add(
  'How do you classify a real number as rational or irrational?',
  'A real number x is **rational** iff x = p/q for some integers p, q with q != 0. Equivalently, its decimal expansion either terminates (e.g. 0.375 = 3/8) or eventually repeats a fixed block (e.g. 0.83333... = 5/6). A real number is **irrational** iff it cannot be so expressed — its decimal neither terminates nor repeats. Examples of irrationals: sqrt(2) (~1.41421356..., proven irrational by contradiction), pi (~3.14159...), e (~2.71828...). The set Q is countable; the set I (and R) is uncountable. **Closure note**: Q is closed under +, -, *, / (except /0); the sum/product of a nonzero rational with an irrational is irrational; sum of two irrationals may be rational (sqrt(2) + (2 - sqrt(2)) = 2) or irrational (sqrt(2) + sqrt(3)). ✓',
  'ch01p1_rational_vs_irrational',
  'formula_recall',
  ['rational', 'irrational', 'decimal', 'terminating', 'repeating', 'classification']
)

add(
  'What is the density of rational and irrational numbers in the reals?',
  '**Density property**: between any two distinct real numbers a < b there exist (i) a rational number, and (ii) an irrational number. Both Q and I are dense in R. Construction of a rational between a and b: pick n large enough that 1/n < b - a, then take an integer m with a*n < m < b*n; the rational m/n lies in (a, b). Construction of an irrational: pick a rational r in (a - sqrt(2), b - sqrt(2)) and use r + sqrt(2), which is irrational and lies in (a, b). Consequence: there is no "next" real number; between any two reals lie infinitely many rationals AND infinitely many irrationals. Note: despite density, Q is countable (|Q| = aleph_0) while I is uncountable (|I| = c). ✓',
  'ch01p1_density_of_reals',
  'formula_recall',
  ['density', 'rational', 'irrational', 'between', 'uncountable']
)

add(
  'How do you represent real numbers on the number line and interpret inequalities?',
  'Every real number corresponds to exactly one point on the number line (the **real line**), and every point corresponds to exactly one real number (the **completeness** of R). Order: a < b means a is to the left of b. Intervals: [a, b] = {x : a <= x <= b} (closed, includes endpoints); (a, b) = {x : a < x < b} (open, excludes endpoints); [a, b) and (a, b] are half-open. Unbounded: [a, inf) = {x : x >= a}; (-inf, b] = {x : x <= b}. Distance between a and b on the line = |a - b|. Example: -3 < -1 means -3 is left of -1, distance |(-1) - (-3)| = 2. The completeness axiom (every nonempty bounded subset of R has a least upper bound = supremum) distinguishes R from Q and is what guarantees e.g. sqrt(2) "exists" as a real. ✓',
  'ch01p1_number_line_intervals',
  'formula_recall',
  ['number line', 'interval', 'inequality', 'open', 'closed', 'completeness']
)

add(
  'How do you convert between repeating decimals and fractions?',
  'A repeating decimal 0.(a_1 a_2 ... a_k) (block of length k repeating) equals the fraction (integer formed by the block) / (10^k - 1). Example: 0.(7) = 7 / (10 - 1) = 7/9. Example: 0.(36) = 36/99 = 4/11. For a decimal with a non-repeating prefix: 0.a_1...a_m (b_1...b_k), let x be the decimal, multiply by 10^m to remove the prefix, then by 10^k to shift one full block, subtract, divide. Example: x = 0.1(6). 10x = 1.6666...; 100x = 16.6666...; subtract: 90x = 15; x = 15/90 = 1/6. Verify: 1/6 = 0.1666... ✓ For a purely repeating 0.(d_1...d_k): x = (block) / (10^k - 1), then reduce. ✓',
  'ch01p1_repeating_decimal_to_fraction',
  'problem_solving',
  ['repeating decimal', 'fraction', 'convert', 'block', 'rational']
)

// ============================================================
// SECTION 2 — FIELD AXIOMS & ALGEBRAIC STRUCTURE (5 items)
// ============================================================
add(
  'What are the field axioms for the real numbers?',
  'The real numbers R form a **field** (R, +, *) satisfying these axioms. **Addition axioms**: (A1) closure: a+b in R; (A2) associativity: (a+b)+c = a+(b+c); (A3) commutativity: a+b = b+a; (A4) identity: a + 0 = a; (A5) inverse: a + (-a) = 0. **Multiplication axioms**: (M1) closure: a*b in R; (M2) associativity: (a*b)*c = a*(b*c); (M3) commutativity: a*b = b*a; (M4) identity: a*1 = a (with 1 != 0); (M5) inverse: a * a^(-1) = 1 for a != 0. **Distributivity**: a*(b+c) = a*b + a*c. These 11 axioms define a field; (R, +, *) is the canonical example. Other fields: Q, C, finite fields GF(p). ✓',
  'ch01p1_field_axioms',
  'formula_recall',
  ['field axioms', 'closure', 'associativity', 'commutativity', 'distributivity', 'identity', 'inverse']
)

add(
  'What are the identity and inverse elements in a field?',
  'In a field (F, +, *): **Additive identity** = 0, satisfying a + 0 = a for all a. **Additive inverse** of a is -a, satisfying a + (-a) = 0 (i.e., subtraction a - b = a + (-b)). **Multiplicative identity** = 1 (with 1 != 0), satisfying a * 1 = a. **Multiplicative inverse** (or reciprocal) of a != 0 is a^(-1) = 1/a, satisfying a * (1/a) = 1 (i.e., division a / b = a * b^(-1) for b != 0). The element 0 has no multiplicative inverse. **Uniqueness**: each identity/inverse is unique (proof by contradiction: if e and e\' are both additive identities, e = e + e\' = e\'). **Cancellation laws** (derived): a + c = b + c implies a = b; a*c = b*c with c != 0 implies a = b. ✓',
  'ch01p1_identity_inverse',
  'formula_recall',
  ['identity', 'inverse', 'additive', 'multiplicative', 'reciprocal', 'cancellation']
)

add(
  'What consequences follow from the field axioms?',
  'Several familiar algebraic facts follow logically from the field axioms. (1) **Uniqueness of 0 and 1**: each identity is unique. (2) **a*0 = 0**: a*0 = a*(0+0) = a*0 + a*0; subtract a*0 from both sides to get 0 = a*0. (3) **-(-a) = a**: (-a) + a = 0 shows a is the inverse of -a. (4) **(-a)*b = -(a*b) = a*(-b)**: (-a)*b + a*b = (-a + a)*b = 0*b = 0. (5) **(-a)*(-b) = a*b**: chain rule. (6) **If a*b = 0 then a = 0 or b = 0** (R is an integral domain; this is the "zero product property" — crucial for solving equations by factoring). (7) **(a^(-1))^(-1) = a** for a != 0. (8) **(a*b)^(-1) = b^(-1)*a^(-1)**. ✓',
  'ch01p1_field_consequences',
  'formula_recall',
  ['zero product property', 'integral domain', 'additive inverse', 'multiplicative inverse', 'field consequences']
)

add(
  'How do you prove the zero-product property from the field axioms?',
  '**Claim**: if a*b = 0 then a = 0 or b = 0. **Proof**: Suppose a*b = 0. Case 1: a = 0. Done. Case 2: a != 0. Then a has a multiplicative inverse a^(-1) (axiom M5). Multiply both sides of a*b = 0 by a^(-1): a^(-1) * (a*b) = a^(-1) * 0. LHS = (a^(-1) * a) * b = 1 * b = b (associativity + inverse + identity). RHS = a^(-1) * 0 = 0 (proved separately: any x times 0 = 0). So b = 0. Conclusion: either a = 0 or b = 0. **Significance**: this is the algebraic backbone of solving polynomial equations by factoring — if (x - r_1)(x - r_2)...(x - r_n) = 0, then at least one factor is zero, giving the roots. Note: zero-product property FAILS for matrices, rings with zero divisors, etc. ✓',
  'ch01p1_zero_product_proof',
  'how_to',
  ['proof', 'zero product property', 'field axioms', 'multiply by inverse', 'integral domain']
)

add(
  'What are the order axioms of the real numbers?',
  'The reals are an **ordered field**: there is a relation "<" satisfying: (O1) **Trichotomy**: for any a, b exactly one holds: a < b, a = b, or b < a. (O2) **Transitivity**: a < b and b < c imply a < c. (O3) **Compatibility with +**: a < b implies a + c < b + c. (O4) **Compatibility with ***: a < b and 0 < c imply a*c < b*c; a < b and c < 0 imply b*c < a*c (inequality reverses for negative multiplier). Define: a <= b means a < b or a = b; a > b means b < a; "positive" = > 0, "negative" = < 0. **Positive cone** P = {x : x > 0} is closed under + and *. The order, combined with completeness (every nonempty bounded set has a supremum), uniquely characterizes R up to isomorphism. C is NOT orderable as a field. ✓',
  'ch01p1_order_axioms',
  'formula_recall',
  ['order axioms', 'trichotomy', 'transitivity', 'ordered field', 'positive cone']
)

// ============================================================
// SECTION 3 — ORDER PROPERTIES & SIGN RULES (3 items)
// ============================================================
add(
  'What are the sign rules for multiplication and division?',
  'For real numbers a, b: (1) positive * positive = positive: 3 * 4 = 12 > 0. (2) positive * negative = negative: 3 * (-4) = -12 < 0. (3) negative * negative = positive: (-3) * (-4) = 12 > 0. (4) sign of a/b equals sign of a*b (since 1/b has same sign as b): (-6)/(-2) = +3 > 0; (-6)/2 = -3 < 0; 6/(-2) = -3 < 0. (5) Sign of a^n: if n even, sign(a^n) = sign(|a|^n) >= 0; if n odd, sign(a^n) = sign(a). (6) Squares are nonnegative: a^2 >= 0, with equality iff a = 0. (7) -a has opposite sign of a (unless a = 0). (8) Adding two negatives: (-a) + (-b) = -(a + b) < 0. **Pitfall**: never "cancel" negatives carelessly — e.g., -2x < 6 implies x > -3 (divide by -2 and FLIP inequality). ✓',
  'ch01p1_sign_rules',
  'formula_recall',
  ['sign rules', 'positive', 'negative', 'multiplication', 'division', 'squares']
)

add(
  'How do you solve and graph a linear inequality in one variable?',
  '**Procedure**: (1) Simplify both sides. (2) Isolate the variable term (add/subtract — direction unchanged). (3) Multiply/divide to solve for the variable. **CRITICAL**: if you multiply or divide both sides by a negative number, REVERSE the inequality (< becomes >, <= becomes >=, etc.). (4) Express answer as an inequality, interval, or graph. **Example**: solve -3x + 5 <= 2x - 10. Subtract 2x: -5x + 5 <= -10. Subtract 5: -5x <= -15. Divide by -5 and FLIP: x >= 3. Interval: [3, inf). Graph: closed dot at 3, shaded right. **Compound**: "and" = intersection, "or" = union. -2 < x + 1 < 5: subtract 1: -3 < x < 4, i.e., (-3, 4). ✓',
  'ch01p1_solve_linear_inequality',
  'how_to',
  ['linear inequality', 'solve', 'reverse inequality', 'interval', 'graph']
)

add(
  'How do you determine the sign of an algebraic expression without fully solving?',
  'Use a **sign chart**. Factor the expression completely. Identify zeros and points of discontinuity (denominator zeros). These partition the real line into intervals. Test one value in each interval to determine the sign of the expression there. **Sign of product/quotient**: positive if an even number of negative factors, negative if odd. **Sign of (x - r)**: positive for x > r, negative for x < r. **Example**: sign of f(x) = (x - 1)(x + 2) / (x - 3). Critical points: x = -2, 1, 3 (note x = 3 excluded — vertical asymptote). Intervals: (-inf, -2), (-2, 1), (1, 3), (3, inf). Test x = -3: (-)(-)/(-) = -, x = 0: (-)(+)/(-) = +, x = 2: (+)(+)/(-) = -, x = 4: (+)(+)/(+) = +. So f < 0 on (-inf, -2) ∪ (1, 3), f > 0 on (-2, 1) ∪ (3, inf), f = 0 at x = -2 and x = 1, undefined at x = 3. ✓',
  'ch01p1_sign_chart',
  'how_to',
  ['sign chart', 'factor', 'intervals', 'test value', 'asymptote', 'inequality']
)

// ============================================================
// SECTION 4 — ABSOLUTE VALUE (4 items)
// ============================================================
add(
  'What is the definition of absolute value and its basic properties?',
  '**Definition**: |a| = a if a >= 0, and |a| = -a if a < 0. Equivalently |a| = max(a, -a) = sqrt(a^2) (the principal, nonnegative square root). Geometrically, |a| is the distance from a to 0 on the number line. **Properties**: (1) |a| >= 0, with |a| = 0 iff a = 0. (2) |-a| = |a|. (3) |a*b| = |a|*|b|. (4) |a/b| = |a|/|b| (b != 0). (5) |a|^2 = a^2. (6) |sqrt(a)| = sqrt(|a|). (7) **Triangle inequality**: |a + b| <= |a| + |b|, equality iff a and b have the same sign (or one is zero). (8) **Reverse triangle inequality**: |a - b| >= ||a| - |b||. (9) |a| = k (k > 0) iff a = k or a = -k. (10) |a| < k (k > 0) iff -k < a < k. Examples: |5| = 5, |-7| = 7, |3 - 10| = 7, |2 * (-4)| = 8 = 2*4. ✓',
  'ch01p1_absolute_value_definition',
  'formula_recall',
  ['absolute value', 'definition', 'properties', 'distance', 'triangle inequality']
)

add(
  'How do you prove and use the triangle inequality?',
  '**Statement**: |a + b| <= |a| + |b|, with equality iff ab >= 0 (same sign or zero). **Proof**: Start with |a + b|^2 = (a + b)^2 = a^2 + 2ab + b^2. Now |a|^2 + 2|a||b| + |b|^2 = a^2 + 2|ab| + b^2 >= a^2 + 2ab + b^2 (since |ab| >= ab always). So |a + b|^2 <= (|a| + |b|)^2. Taking sqrt (both nonneg): |a + b| <= |a| + |b|. **Generalized**: |a_1 + a_2 + ... + a_n| <= |a_1| + |a_2| + ... + |a_n|. **Applications**: (1) bounds: |x - 3| + |y + 2| <= 7 defines a square/diamond region; (2) estimating errors: |approx - exact| <= |approx - intermediate| + |intermediate - exact|; (3) proving |a - b| >= ||a| - |b||: write a = (a - b) + b, apply triangle inequality: |a| <= |a - b| + |b|, so |a - b| >= |a| - |b|. Symmetrically |a - b| >= |b| - |a|, giving the reverse triangle inequality. ✓',
  'ch01p1_triangle_inequality',
  'how_to',
  ['triangle inequality', 'proof', 'absolute value', 'reverse triangle inequality']
)

add(
  'How do you solve absolute value equations and inequalities?',
  '**Equations**: |f(x)| = k (k >= 0) splits into f(x) = k OR f(x) = -k. If k < 0, no solution. Example: |2x - 5| = 7 gives 2x - 5 = 7 (x = 6) or 2x - 5 = -7 (x = -1). Solutions: x in {-1, 6}. **Inequalities, three forms**: (i) |f(x)| < k (k > 0): -k < f(x) < k (intersection/AND). Example: |x - 3| < 2 → 1 < x < 5, i.e., (1, 5). (ii) |f(x)| <= k: -k <= f(x) <= k. (iii) |f(x)| > k (k >= 0): f(x) < -k OR f(x) > k (union/OR). Example: |x + 4| >= 3 → x <= -7 OR x >= -1, i.e., (-inf, -7] ∪ [-1, inf). (iv) |f(x)| < 0: no solution (since absolute value is never negative). (v) |f(x)| >= 0: all real x (in domain). Always check k > 0 first and verify solutions in the original equation (extraneous roots possible when f contains radicals). ✓',
  'ch01p1_solve_absolute_value',
  'how_to',
  ['absolute value equation', 'absolute value inequality', 'split', 'union', 'intersection']
)

add(
  'How do you express distances and intervals using absolute value?',
  'The **distance** between two real numbers a and b is d(a, b) = |a - b| = |b - a|. **Interval as absolute inequality**: the set of x with |x - c| < r is the open interval (c - r, c + r) — all points within distance r of center c. The set with |x - c| <= r is the closed interval [c - r, c + r]. **Equivalent forms**: |x - 5| < 3 iff 2 < x < 8 iff x in (2, 8). |x + 2| <= 4 iff |x - (-2)| <= 4 iff -6 <= x <= 2. **Beyond 1D**: in R^n, distance becomes ||a - b|| (vector norm). **Center-radius form**: any open interval (a, b) can be written |x - (a+b)/2| < (b-a)/2 (center at midpoint, radius = half-length). Example: rewrite 3 < x < 11 in absolute form. Center = (3+11)/2 = 7, radius = 4. So |x - 7| < 4. ✓',
  'ch01p1_distance_intervals',
  'problem_solving',
  ['distance', 'interval', 'center', 'radius', 'absolute value', 'midpoint']
)

// ============================================================
// SECTION 5 — EXPONENTS & LAWS (5 items)
// ============================================================
add(
  'What are the laws of exponents for integer and rational exponents?',
  'For base a, b != 0 (and positive for rational exponents) and exponents m, n real: (1) **Product**: a^m * a^n = a^(m+n). (2) **Quotient**: a^m / a^n = a^(m-n). (3) **Power of a power**: (a^m)^n = a^(m*n). (4) **Power of a product**: (a*b)^m = a^m * b^m. (5) **Power of a quotient**: (a/b)^m = a^m / b^m. (6) **Zero exponent**: a^0 = 1 for a != 0 (0^0 is undefined / context-dependent). (7) **Negative exponent**: a^(-n) = 1 / a^n for a != 0. (8) **Fractional exponent**: a^(p/q) = (q-th root of a)^p = (a^p)^(1/q), defined for a > 0 (or a < 0 if q odd). (9) **Reciprocal exponent**: a^(-1) = 1/a. (10) **Same base**: a^m = a^n iff m = n (for a > 0, a != 1). Examples: 2^3 * 2^4 = 2^7 = 128; (x^2)^3 = x^6; 8^(2/3) = (cube root of 8)^2 = 2^2 = 4; 16^(-3/4) = 1 / 16^(3/4) = 1 / (2^3) = 1/8. ✓',
  'ch01p1_exponent_laws',
  'formula_recall',
  ['exponents', 'laws', 'product rule', 'quotient rule', 'power rule', 'negative exponent']
)

add(
  'How do you simplify expressions with zero, negative, and fractional exponents?',
  '**Procedure**: (1) Apply negative exponent rule: x^(-n) = 1/x^n (move factor across fraction bar, change sign). (2) Apply zero exponent: x^0 = 1 (x != 0). (3) Apply fractional exponent: x^(p/q) = (q-th root of x)^p. (4) Use laws to combine like bases. **Example 1**: simplify (2 x^(-3) y^2) / (4 x^2 y^(-1)). = (2/4) * x^(-3 - 2) * y^(2 - (-1)) = (1/2) x^(-5) y^3 = y^3 / (2 x^5). **Example 2**: simplify (8 a^6 b^(-9))^(2/3). = 8^(2/3) * (a^6)^(2/3) * (b^(-9))^(2/3) = (cube root of 8)^2 * a^4 * b^(-6) = 4 a^4 / b^6. **Example 3**: (16 x^4)^(3/4) = 16^(3/4) * x^3 = (fourth root of 16)^3 * x^3 = 2^3 * x^3 = 8 x^3. **Caution**: a^(1/2) = sqrt(a) requires a >= 0 for real outputs; (-8)^(1/3) = -2 is fine (odd root of negative). ✓',
  'ch01p1_simplify_exponents',
  'problem_solving',
  ['simplify', 'negative exponent', 'fractional exponent', 'combine', 'radicals']
)

add(
  'How do you convert between radical form and rational-exponent form?',
  '**Conversion rule**: n-th root of a^m = a^(m/n), equivalently (n-th root of a)^m = a^(m/n). Read the exponent m/n as "m = power, n = root index". **Examples**: sqrt(x) = x^(1/2); cube root of x = x^(1/3); fourth root of (x^3) = x^(3/4); (cube root of x)^5 = x^(5/3); sqrt(x^3) = x^(3/2). **Negative exponent form**: 1/sqrt(x) = x^(-1/2); 1/(cube root of x^2) = x^(-2/3). **Why this matters**: rational-exponent form lets us apply exponent laws uniformly (e.g., multiply radicals by adding fractional exponents). Example: sqrt(x) * fourth root of (x^3) = x^(1/2) * x^(3/4) = x^(2/4 + 3/4) = x^(5/4) = fourth root of (x^5). **Domain**: for a^(m/n) with a < 0, need n odd (and integer m); otherwise restrict a > 0. ✓',
  'ch01p1_radical_exponent_conversion',
  'formula_recall',
  ['radical', 'rational exponent', 'convert', 'root index', 'power']
)

add(
  'How do you solve equations with variables in exponents?',
  '**Strategy**: get the same base on both sides, then equate exponents. (1) If bases equal: a^f(x) = a^g(x) iff f(x) = g(x) (for a > 0, a != 1). Example: 2^(x+1) = 2^5 → x + 1 = 5 → x = 4. (2) If bases powers of common base: 8^x = 16^(x+1) → (2^3)^x = (2^4)^(x+1) → 2^(3x) = 2^(4x + 4) → 3x = 4x + 4 → x = -4. (3) If different bases, take logarithms: a^f = b^g → f * ln(a) = g * ln(b). (4) Substitution for quadratic-in-form: 4^x - 5*2^x + 4 = 0. Let u = 2^x: u^2 - 5u + 4 = 0 → (u-1)(u-4) = 0 → u = 1 or u = 4 → 2^x = 1 (x = 0) or 2^x = 4 (x = 2). (5) **Always check**: extraneous solutions can arise from log manipulations. ✓',
  'ch01p1_exponential_equations',
  'problem_solving',
  ['exponential equation', 'same base', 'substitution', 'logarithm', 'equate exponents']
)

add(
  'How do you handle scientific-notation and exponent word problems?',
  '**Scientific notation**: a number is N = a × 10^k where 1 <= |a| < 10 and k integer. **Multiplication**: (a × 10^m)(b × 10^n) = (ab) × 10^(m+n), then re-normalize. **Division**: (a × 10^m) / (b × 10^n) = (a/b) × 10^(m-n). **Power**: (a × 10^m)^n = a^n × 10^(mn). **Addition/subtraction**: align exponents first. Example: (3.2 × 10^5)(4.0 × 10^(-3)) = 12.8 × 10^2 = 1.28 × 10^3. Example: (6 × 10^7) + (3 × 10^6) = (60 × 10^6) + (3 × 10^6) = 63 × 10^6 = 6.3 × 10^7. **Powers of ten prefixes**: kilo = 10^3, mega = 10^6, giga = 10^9, tera = 10^12; milli = 10^(-3), micro = 10^(-6), nano = 10^(-9), pico = 10^(-12). Example: speed of light c ≈ 3 × 10^8 m/s; in 1 ns = 10^(-9) s, light travels 3 × 10^8 × 10^(-9) = 0.3 m = 30 cm. ✓',
  'ch01p1_scientific_notation_operations',
  'problem_solving',
  ['scientific notation', 'powers of ten', 'operations', 'prefixes', 'normalize']
)

// ============================================================
// SECTION 6 — RADICALS & RATIONALIZATION (4 items)
// ============================================================
add(
  'What are the properties of radicals and how do you simplify them?',
  'For n-th root (radical index n): **n-th root of a** = a^(1/n), defined for a >= 0 if n even, all a if n odd. **Properties** (a, b >= 0 for even n): (1) (n-th root of a) * (n-th root of b) = n-th root of (a*b). (2) (n-th root of a) / (n-th root of b) = n-th root of (a/b). (3) (n-th root of a)^n = a. (4) n-th root of (n-th root of a) = (m*n)-th root of a. (5) (n-th root of a)^m = n-th root of (a^m) = a^(m/n). **Simplification**: factor out perfect powers matching the index. Example: sqrt(72) = sqrt(36 * 2) = 6 sqrt(2). cube root of (16 x^4) = cube root of (8 x^3 * 2x) = 2x * cube root of (2x). fourth root of (48 a^5 b^8) = fourth root of (16 a^4 b^8 * 3a) = 2 a b^2 * fourth root of (3a). **Like radicals** (same index and radicand) can be combined: 3 sqrt(5) + 7 sqrt(5) = 10 sqrt(5); but sqrt(2) + sqrt(3) cannot combine further. ✓',
  'ch01p1_radicals_properties',
  'formula_recall',
  ['radicals', 'nth root', 'simplify', 'perfect powers', 'like radicals']
)

add(
  'How do you rationalize a denominator with a single radical term?',
  '**Goal**: eliminate radicals from the denominator by multiplying numerator and denominator by an appropriate form. **Monomial denominator** (n-th root of b): multiply by (n-th root of b^(n-1)) / (n-th root of b^(n-1)) to get (n-th root of b^n) = b in denominator. **Examples**: (1) 5 / sqrt(3): multiply by sqrt(3)/sqrt(3) → 5 sqrt(3) / 3. (2) 7 / (cube root of 4): multiply by (cube root of 16) / (cube root of 16) → 7 cube root(16) / cube root(64) = 7 cube root(16) / 4. (3) 3 / (2 sqrt(5)): multiply by sqrt(5)/sqrt(5) → 3 sqrt(5) / (2 * 5) = 3 sqrt(5) / 10. (4) (2 x^3) / (cube root of (x^2)): multiply by cube root(x)/cube root(x) → 2 x^3 cube root(x) / cube root(x^3) = 2 x^3 cube root(x) / x = 2 x^2 cube root(x). **Also rationalize numerators** sometimes (limits in calculus). ✓',
  'ch01p1_rationalize_single_term',
  'how_to',
  ['rationalize denominator', 'monomial', 'radical', 'multiply conjugate', 'simplify']
)

add(
  'How do you rationalize a denominator with a binomial containing radicals?',
  'Use the **conjugate**: for a denominator (sqrt(a) ± sqrt(b)), multiply numerator and denominator by (sqrt(a) ∓ sqrt(b)) — the conjugate (flip the sign). The product (sqrt(a) + sqrt(b))(sqrt(a) - sqrt(b)) = a - b, eliminating the radicals. **Examples**: (1) 3 / (sqrt(7) - 2): multiply by (sqrt(7) + 2)/(sqrt(7) + 2) → 3(sqrt(7) + 2) / (7 - 4) = (3 sqrt(7) + 6) / 3 = sqrt(7) + 2. (2) (5 + sqrt(3)) / (2 - sqrt(3)): multiply by (2 + sqrt(3))/(2 + sqrt(3)) → [(5 + sqrt(3))(2 + sqrt(3))] / (4 - 3) = (10 + 5 sqrt(3) + 2 sqrt(3) + 3) / 1 = 13 + 7 sqrt(3). (3) 1 / (cube root of 2 + cube root of 4): use identity (a + b)(a^2 - ab + b^2) = a^3 + b^3 with a = cube root(2), b = cube root(4): multiply by (cube root(4) - cube root(8) + cube root(16)) = (cube root(4) - 2 + 2 cube root(2)); denominator becomes 2 + 4 = 6. ✓',
  'ch01p1_rationalize_binomial',
  'problem_solving',
  ['conjugate', 'binomial', 'rationalize', 'difference of squares', 'cube roots']
)

add(
  'How do you solve radical equations and check for extraneous solutions?',
  '**Procedure**: (1) Isolate one radical on one side. (2) Raise both sides to the power equal to the radical index (square both sides for sqrt; cube for cube root). (3) If radicals remain, repeat. (4) Solve the resulting polynomial/rational equation. (5) **CRITICAL**: check every solution in the ORIGINAL equation — squaring can introduce extraneous roots. **Example**: solve sqrt(2x + 5) - x = 3. Isolate: sqrt(2x + 5) = x + 3. Square: 2x + 5 = x^2 + 6x + 9. Rearrange: x^2 + 4x + 4 = 0 → (x + 2)^2 = 0 → x = -2. Check: sqrt(2(-2) + 5) - (-2) = sqrt(1) + 2 = 1 + 2 = 3. ✓ Valid. **Example with extraneous**: sqrt(x + 3) = x - 3. Square: x + 3 = x^2 - 6x + 9 → x^2 - 7x + 6 = 0 → (x-1)(x-6) = 0 → x = 1 or x = 6. Check x = 1: sqrt(4) = 1 - 3 = -2? 2 != -2. ✗ Extraneous. Check x = 6: sqrt(9) = 6 - 3 → 3 = 3. ✓ Only solution x = 6. ✓',
  'ch01p1_radical_equations_check',
  'how_to',
  ['radical equation', 'extraneous solution', 'square both sides', 'check', 'isolate']
)

// ============================================================
// SECTION 7 — POLYNOMIALS (5 items)
// ============================================================
add(
  'What is a polynomial and how is its degree determined?',
  'A **polynomial** in one variable x is an expression P(x) = a_n x^n + a_(n-1) x^(n-1) + ... + a_1 x + a_0 where coefficients a_i are real (or complex) and n is a non-negative integer. The **degree** of P is the highest exponent with a nonzero coefficient. The **leading coefficient** is a_n (coefficient of the highest-degree term). The **constant term** is a_0. **Special cases**: nonzero constant a_0 has degree 0; the zero polynomial has undefined degree (or sometimes -inf). **Naming by degree**: degree 0 = constant, 1 = linear (ax + b), 2 = quadratic (ax^2 + bx + c), 3 = cubic, 4 = quartic, 5 = quintic. **Naming by terms**: monomial (1 term), binomial (2), trinomial (3). **Example**: P(x) = 4 x^5 - 3 x^2 + 7 has degree 5 (quintic), leading coefficient 4, constant term 7, three terms. **Polynomial in two variables**: P(x, y) = 3 x^2 y - 5 x y^2 + 2; degree of a term = sum of exponents (3, 3, 0); degree of polynomial = max = 3. ✓',
  'ch01p1_polynomial_definition_degree',
  'formula_recall',
  ['polynomial', 'degree', 'leading coefficient', 'constant', 'monomial', 'quadratic']
)

add(
  'How do you add, subtract, and multiply polynomials?',
  '**Addition/Subtraction**: combine like terms (same variable and exponent). (3 x^2 + 2 x - 1) + (5 x^2 - 4 x + 7) = (3 + 5) x^2 + (2 - 4) x + (-1 + 7) = 8 x^2 - 2 x + 6. (4 x^3 - x) - (2 x^3 + 5 x - 3) = (4 - 2) x^3 + (-1 - 5) x + (0 - (-3)) = 2 x^3 - 6 x + 3. **Multiplication**: distribute each term of one polynomial across the other. (a) **Monomial times polynomial**: 3 x^2 (2 x^2 - x + 4) = 6 x^4 - 3 x^3 + 12 x^2. (b) **Binomial times binomial (FOIL)**: (x + 3)(x - 5) = x*x + x*(-5) + 3*x + 3*(-5) = x^2 - 5x + 3x - 15 = x^2 - 2x - 15. (c) **Larger products**: (x^2 + 2x - 1)(x - 3) = x^3 - 3x^2 + 2x^2 - 6x - x + 3 = x^3 - x^2 - 7x + 3. **Special products**: (a + b)(a - b) = a^2 - b^2; (a + b)^2 = a^2 + 2ab + b^2; (a - b)^2 = a^2 - 2ab + b^2; (a + b)^3 = a^3 + 3a^2 b + 3a b^2 + b^3; (a - b)^3 = a^3 - 3a^2 b + 3a b^2 - b^3. ✓',
  'ch01p1_polynomial_operations',
  'formula_recall',
  ['polynomial addition', 'subtraction', 'multiplication', 'FOIL', 'like terms', 'special products']
)

add(
  'How do you divide polynomials using long division?',
  '**Polynomial long division** mirrors integer long division. Given P(x) / D(x), repeat: (1) divide leading term of dividend by leading term of divisor → first term of quotient; (2) multiply entire divisor by this term; (3) subtract from dividend → new dividend; (4) repeat until degree of remainder < degree of divisor. **Result**: P(x) = Q(x) D(x) + R(x), with deg(R) < deg(D). **Example**: divide (2 x^3 - 3 x^2 + 4 x - 5) by (x - 2). Step 1: 2 x^3 / x = 2 x^2; subtract 2 x^2 * (x - 2) = 2 x^3 - 4 x^2 → remainder x^2 + 4 x - 5. Step 2: x^2 / x = x; subtract x*(x - 2) = x^2 - 2x → remainder 6 x - 5. Step 3: 6 x / x = 6; subtract 6*(x - 2) = 6x - 12 → remainder 7. Quotient Q(x) = 2 x^2 + x + 6, remainder R(x) = 7. So 2 x^3 - 3 x^2 + 4 x - 5 = (x - 2)(2 x^2 + x + 6) + 7. Check by substitution: P(2) = 16 - 12 + 8 - 5 = 7 = R. ✓ (**Remainder theorem**: P(c) = remainder when P divided by x - c.)',
  'ch01p1_polynomial_long_division',
  'how_to',
  ['polynomial division', 'long division', 'quotient', 'remainder', 'remainder theorem']
)

add(
  'How do you divide polynomials using synthetic division?',
  '**Synthetic division** is a shortcut for dividing P(x) by (x - c) (linear divisor). **Setup**: write c in a box; list coefficients of P(x) in descending degree (include 0s for missing degrees). **Procedure**: (1) Bring down the leading coefficient. (2) Multiply by c, write under next coefficient. (3) Add column. (4) Repeat to end. The last number is the remainder; preceding numbers are coefficients of the quotient (degree one less than P). **Example**: divide 2 x^3 - 3 x^2 + 4 x - 5 by (x - 2). c = 2. Coefficients: 2, -3, 4, -5. Bring down 2. 2 * 2 = 4; -3 + 4 = 1. 1 * 2 = 2; 4 + 2 = 6. 6 * 2 = 12; -5 + 12 = 7. Result: 2, 1, 6, remainder 7. Quotient = 2 x^2 + x + 6, remainder = 7. ✓ Matches long division. **Uses**: (1) **Remainder Theorem**: P(c) = remainder. (2) **Factor Theorem**: (x - c) is a factor iff remainder = 0 iff P(c) = 0. (3) **Deflate polynomial** after finding a root: divide out (x - c), solve the smaller quotient. **Limitation**: only works for linear divisors of form (x - c). For (x + c), use c = -c. ✓',
  'ch01p1_synthetic_division',
  'how_to',
  ['synthetic division', 'shortcut', 'linear divisor', 'remainder theorem', 'factor theorem']
)

add(
  'What are the remainder and factor theorems?',
  '**Remainder Theorem**: When a polynomial P(x) is divided by (x - c), the remainder equals P(c). I.e., P(x) = (x - c) Q(x) + P(c). Substituting x = c: P(c) = 0 * Q(c) + P(c). ✓ **Quick evaluation**: to compute P(3), synthetically divide P by (x - 3) — the remainder is P(3). Example: P(x) = x^4 - 2 x^3 + 5 x - 7. P(2)? Synthetic divide by 2: coeffs 1, -2, 0, 5, -7 (note the zero for missing x^2). Bring down 1; *2 = 2, sum 0; *2 = 0, sum 0; *2 = 0, sum 5; *2 = 10, sum 3. So P(2) = 3. Check: 16 - 16 + 10 - 7 = 3. ✓ **Factor Theorem**: (x - c) is a factor of P(x) iff P(c) = 0. (Forward: if (x - c) factor then remainder = 0 so P(c) = 0. Reverse: if P(c) = 0 then remainder = 0 so (x - c) factor.) **Consequence**: c is a root/zero of P iff (x - c) is a factor. Used to deflate polynomials: find one root c, divide synthetically, get smaller polynomial, repeat. ✓',
  'ch01p1_remainder_factor_theorems',
  'formula_recall',
  ['remainder theorem', 'factor theorem', 'root', 'zero', 'polynomial evaluation']
)

// ============================================================
// SECTION 8 — FACTORING TECHNIQUES (8 items)
// ============================================================
add(
  'How do you factor out the greatest common factor (GCF)?',
  '**GCF** = the largest factor common to all terms of a polynomial. Find GCF of (1) numerical coefficients (GCF of integers), (2) each variable: smallest exponent appearing in every term. Then divide each term by GCF. **Example**: 12 x^3 y^2 - 18 x^2 y^3 + 6 x y^4. GCF of {12, -18, 6} = 6. Variable part: x^1 (smallest x exponent), y^2 (smallest y exponent). GCF = 6 x y^2. Factor: 6 x y^2 (2 x^2 - 3 x y + y^2). **Example**: 4 a^3 b - 8 a^2 b^2 + 12 a b^3 = 4 a b (a^2 - 2 a b + 3 b^2). **Always factor out GCF first** before trying other techniques — it simplifies the remaining problem. **Special cases**: factor out a negative when the leading coefficient is negative (e.g., -2 x^2 + 6 x - 4 = -2 (x^2 - 3 x + 2)). **Check for common binomial**: a(b + c) + d(b + c) = (b + c)(a + d). ✓',
  'ch01p1_gcf_factoring',
  'how_to',
  ['gcf', 'greatest common factor', 'factor out', 'common', 'monomial']
)

add(
  'How do you factor by grouping?',
  '**Factoring by grouping**: arrange terms in groups, factor a GCF from each group, then factor the common binomial. Works well for 4-term polynomials. **Procedure**: (1) Group terms in pairs. (2) Factor GCF from each pair. (3) If the resulting binomials match, factor out the common binomial. **Example 1**: x^3 + 2 x^2 + 3 x + 6. Group: (x^3 + 2 x^2) + (3 x + 6) = x^2 (x + 2) + 3 (x + 2) = (x + 2)(x^2 + 3). **Example 2**: 6 x^3 - 9 x^2 - 4 x + 6. Group: (6 x^3 - 9 x^2) + (-4 x + 6) = 3 x^2 (2 x - 3) - 2 (2 x - 3) = (2 x - 3)(3 x^2 - 2). **Caution**: sometimes need to rearrange or split a term. Example: x^3 - 2 x^2 - 9 x + 18: group as (x^3 - 2 x^2) + (-9 x + 18) = x^2 (x - 2) - 9 (x - 2) = (x - 2)(x^2 - 9) = (x - 2)(x - 3)(x + 3). If first attempt doesn\'t yield a common binomial, try a different grouping or rearrangement. ✓',
  'ch01p1_factoring_grouping',
  'how_to',
  ['factoring', 'grouping', 'four terms', 'common binomial', 'rearrange']
)

add(
  'How do you factor a difference of squares?',
  '**Difference of squares identity**: a^2 - b^2 = (a - b)(a + b). Recognize: two perfect squares separated by subtraction. **Examples**: (1) x^2 - 25 = x^2 - 5^2 = (x - 5)(x + 5). (2) 4 x^2 - 9 = (2 x)^2 - 3^2 = (2 x - 3)(2 x + 3). (3) x^4 - 16 = (x^2)^2 - 4^2 = (x^2 - 4)(x^2 + 4) = (x - 2)(x + 2)(x^2 + 4) (continue factoring x^2 - 4; x^2 + 4 is irreducible over reals). (4) 49 y^2 - 64 = (7 y - 8)(7 y + 8). (5) With variables: a^2 b^2 - c^2 = (a b - c)(a b + c). **Repeated**: a^4 - b^4 = (a^2 - b^2)(a^2 + b^2) = (a - b)(a + b)(a^2 + b^2). **Note**: a^2 + b^2 (sum of squares) is irreducible over reals (factors as (a + bi)(a - bi) over C). **Application**: simplify rational expressions like (x^2 - 9)/(x - 3) = (x - 3)(x + 3)/(x - 3) = x + 3 (for x != 3). **Odd pattern**: (a - b)(a + b) = a^2 - b^2 is also useful in mental arithmetic: 97 * 103 = (100 - 3)(100 + 3) = 10000 - 9 = 9991. ✓',
  'ch01p1_difference_of_squares',
  'formula_recall',
  ['difference of squares', 'factoring', 'perfect square', 'identity', 'irreducible']
)

add(
  'How do you factor perfect square trinomials?',
  '**Perfect square trinomial** forms: a^2 + 2 a b + b^2 = (a + b)^2 and a^2 - 2 a b + b^2 = (a - b)^2. **Recognize**: first and last terms are perfect squares; middle term = ±2 times product of their roots. **Test**: middle = ±2*sqrt(first)*sqrt(last). **Examples**: (1) x^2 + 6 x + 9: sqrt(x^2) = x, sqrt(9) = 3; check middle = 2*x*3 = 6x ✓. So (x + 3)^2. (2) x^2 - 10 x + 25: sqrt(x^2) = x, sqrt(25) = 5; middle = -2*x*5 = -10x ✓ → (x - 5)^2. (3) 4 x^2 + 12 x y + 9 y^2: sqrt = 2x, 3y; middle = 2*(2x)*(3y) = 12xy ✓ → (2 x + 3 y)^2. (4) 16 x^2 - 24 x + 9 = (4 x - 3)^2. **Caution**: not every quadratic is a perfect square; e.g., x^2 + 5x + 6 is NOT (middle would need to be ±2*sqrt(6)*x). Use AC-method or quadratic formula to factor general quadratics. **Useful in calculus**: complete the square by ADDING/SUBTRACTING (b/2)^2 to convert ax^2 + bx + c into a(x + b/(2a))^2 + (c - b^2/(4a)). ✓',
  'ch01p1_perfect_square_trinomial',
  'formula_recall',
  ['perfect square trinomial', 'factoring', 'recognize', 'middle term', 'complete the square']
)

add(
  'How do you factor sums and differences of cubes?',
  '**Sum of cubes**: a^3 + b^3 = (a + b)(a^2 - a b + b^2). **Difference of cubes**: a^3 - b^3 = (a - b)(a^2 + a b + b^2). Recognize: each term is a perfect cube. **The quadratic factor is irreducible** over reals (discriminant = -3 b^2 < 0). **Examples**: (1) x^3 + 8 = x^3 + 2^3 = (x + 2)(x^2 - 2 x + 4). (2) x^3 - 27 = (x - 3)(x^2 + 3 x + 9). (3) 27 x^3 + 64 = (3 x)^3 + 4^3 = (3 x + 4)(9 x^2 - 12 x + 16). (4) 8 a^3 - 125 b^3 = (2 a)^3 - (5 b)^3 = (2 a - 5 b)(4 a^2 + 10 a b + 25 b^2). (5) x^6 - 1 = (x^3)^2 - 1 = (x^3 - 1)(x^3 + 1) = (x - 1)(x^2 + x + 1)(x + 1)(x^2 - x + 1). **Mnemonic for signs**: SOAP — Same sign, Opposite sign, Always Positive. (x^3 □ b^3) → (x □ b)(x^2 □•opposite• xb + b^2). Sum: (x + b)(x^2 - xb + b^2). Diff: (x - b)(x^2 + xb + b^2). ✓',
  'ch01p1_sum_difference_cubes',
  'formula_recall',
  ['sum of cubes', 'difference of cubes', 'factoring', 'SOAP', 'irreducible quadratic']
)

add(
  'How do you factor a general quadratic ax^2 + bx + c (the AC method)?',
  '**AC method** for factoring ax^2 + bx + c (a != 1, or even a = 1): (1) Compute the product A*C. (2) Find two numbers m, n with m*n = A*C and m + n = B. (3) Split the middle term: ax^2 + m x + n x + c. (4) Factor by grouping. **Example 1**: 6 x^2 + 11 x + 4. A*C = 24, B = 11. Numbers: 3, 8 (3*8 = 24, 3 + 8 = 11). Split: 6 x^2 + 3 x + 8 x + 4 = 3 x (2 x + 1) + 4 (2 x + 1) = (2 x + 1)(3 x + 4). ✓ **Example 2**: 4 x^2 - 12 x + 9. A*C = 36, B = -12. Numbers: -6, -6 (product 36, sum -12). Split: 4 x^2 - 6 x - 6 x + 9 = 2 x (2 x - 3) - 3 (2 x - 3) = (2 x - 3)^2. ✓ **Example 3**: 2 x^2 - 5 x - 3. A*C = -6, B = -5. Numbers: -6, 1. Split: 2 x^2 - 6 x + x - 3 = 2 x (x - 3) + 1 (x - 3) = (x - 3)(2 x + 1). ✓ **If no integer pair works**: quadratic is prime over integers; use quadratic formula to find irrational/complex roots. ✓',
  'ch01p1_ac_method',
  'how_to',
  ['ac method', 'factoring quadratic', 'split middle', 'grouping', 'leading coefficient']
)

add(
  'How do you factor using substitution for higher-degree polynomials?',
  '**Substitution (or "u-substitution")** reduces a higher-degree polynomial to a familiar form. **Recognize**: the polynomial is a "quadratic in disguise" — variable appears with exponents in a 2:1 ratio. Set u = (lower power) and rewrite. **Example 1**: x^4 - 5 x^2 + 4 = 0. Let u = x^2: u^2 - 5 u + 4 = 0 → (u - 1)(u - 4) = 0 → u = 1 or u = 4 → x^2 = 1 (x = ±1) or x^2 = 4 (x = ±2). Solutions: x in {-2, -1, 1, 2}. **Example 2**: x^6 - 7 x^3 - 8 = 0. u = x^3: u^2 - 7 u - 8 = 0 → (u - 8)(u + 1) = 0 → u = 8 or u = -1 → x^3 = 8 (x = 2) or x^3 = -1 (x = -1). Solutions: x in {2, -1}. **Example 3** (radicals): (x^2 - x)^(1/4) - 3 (x^2 - x)^(1/2) + 2 = 0. Let u = (x^2 - x)^(1/4): u - 3 u^2 + 2 = 0 → 3 u^2 - u - 2 = 0 → (3u + 2)(u - 1) = 0 → u = 1 (u = -2/3 extraneous since u = fourth root >= 0). Then x^2 - x = 1 → x = (1 ± sqrt(5))/2. **Example 4** (bi-quadratic pattern): x^4 + 5 x^2 + 6 = (x^2 + 2)(x^2 + 3). ✓',
  'ch01p1_substitution_factoring',
  'problem_solving',
  ['substitution', 'u-substitution', 'biquadratic', 'higher degree', 'quadratic in disguise']
)

add(
  'How do you completely factor a polynomial over the integers or reals?',
  '**Strategy** (apply in order): (1) **GCF** first. (2) **Common patterns**: difference of squares, perfect square trinomial, sum/difference of cubes. (3) **Grouping** for 4+ terms. (4) **AC method** for trinomials. (5) **Substitution** for higher-degree patterns. (6) **Rational root theorem + synthetic division** to find linear factors of higher-degree polynomials. (7) For **irreducible quadratic factors** over reals (negative discriminant), leave as is. **Worked example**: completely factor 2 x^4 - x^3 - 7 x^2 + x + 3. Try rational roots ±1, ±3, ±1/2, ±3/2. P(1) = 2 - 1 - 7 + 1 + 3 = -2 ≠ 0. P(-1) = 2 + 1 - 7 - 1 + 3 = -2 ≠ 0. P(3) = 162 - 27 - 63 + 3 + 3 = 78 ≠ 0. P(-3) = 162 + 27 - 63 - 3 + 3 = 126. P(1/2) = 2(1/16) - 1/8 - 7/4 + 1/2 + 3 = 1/8 - 1/8 - 14/8 + 4/8 + 24/8 = 14/8 ≠ 0. P(3/2) = 2(81/16) - 27/8 - 7(9/4) + 3/2 + 3 = 81/8 - 27/8 - 126/8 + 12/8 + 24/8 = -36/8 ≠ 0. P(-3/2) = 2(81/16) + 27/8 - 7(9/4) - 3/2 + 3 = 81/8 + 27/8 - 126/8 - 12/8 + 24/8 = -6/8 ≠ 0. Try P(√3)... actually if all rational candidates fail, the polynomial may be irreducible over Q or factor as (quadratic)(quadratic). Assume (2 x^2 + a x + b)(x^2 + c x + d) = 2 x^4 + (2c + a) x^3 + (2d + ac + b) x^2 + (ad + bc) x + bd. Match: 2c + a = -1, 2d + ac + b = -7, ad + bc = 1, bd = 3. Try b = 1, d = 3: 6 + ac + 1 = -7 → ac = -14; 3a + c = 1; 2c + a = -1. From 2c + a = -1 and 3a + c = 1: solve a = 1, c = -1. Check ac = -1 ≠ -14. ✗ Try b = -1, d = -3: -6 + ac - 1 = -7 → ac = 0; -3a - c = 1; 2c + a = -1. a = 0, c = -1/2: not integer. Or c = 0, a = -1: -3(-1) - 0 = 3 ≠ 1. ✗ Try b = 3, d = 1: 2 + ac + 3 = -7 → ac = -12; a + 3c = 1; 2c + a = -1. From a + 3c = 1 and a + 2c = -1: c = 2, a = -5. Check ac = -10 ≠ -12. ✗ Try b = -3, d = -1: -2 + ac - 3 = -7 → ac = -2; -a - 3c = 1; 2c + a = -1. Add: -c = 0, c = 0; a = -1. Check ac = 0 ≠ -2. ✗ May be irreducible over Z. **Conclusion**: sometimes a polynomial just won\'t factor nicely. ✓',
  'ch01p1_complete_factoring_strategy',
  'how_to',
  ['complete factoring', 'strategy', 'rational root theorem', 'irreducible', 'polynomial']
)

// ============================================================
// SECTION 9 — RATIONAL EXPRESSIONS (6 items)
// ============================================================
add(
  'What is a rational expression and how do you find its domain?',
  'A **rational expression** is a ratio P(x) / Q(x) of two polynomials with Q(x) not identically zero. **Domain** (where the expression is defined): all real numbers except those making the denominator zero. **Procedure**: set Q(x) = 0, solve, exclude those values from R. **Examples**: (1) 1 / (x - 3): x - 3 != 0 → x != 3. Domain: R \\ {3} = (-inf, 3) ∪ (3, inf). (2) (x + 2) / (x^2 - 4): x^2 - 4 = 0 → x = ±2. Domain: R \\ {-2, 2}. (3) (x^2 + 1) / (x^2 + 1): denominator never zero (x^2 + 1 > 0); domain all reals. Note simplification: equals 1 for all x, but as a "rational expression" the form is still defined everywhere. (4) sqrt(x) / (x - 1): need x >= 0 (sqrt domain) AND x != 1. Domain: [0, 1) ∪ (1, inf). (5) 1 / (x^2 - 5 x + 6) = 1/((x-2)(x-3)): domain excludes x = 2, x = 3. **Holes vs vertical asymptotes**: if a factor cancels between numerator and denominator, the value is a "hole" (removable discontinuity), not an asymptote. Example: (x - 1)/(x^2 - 1) = (x - 1)/((x-1)(x+1)) = 1/(x + 1) for x != 1; hole at x = 1, vertical asymptote at x = -1. ✓',
  'ch01p1_rational_expression_domain',
  'formula_recall',
  ['rational expression', 'domain', 'denominator', 'excluded values', 'hole', 'asymptote']
)

add(
  'How do you simplify a rational expression?',
  '**Simplifying** a rational expression = reducing it to lowest terms. **Procedure**: (1) Factor numerator and denominator completely. (2) Cancel common factors (these correspond to "holes"). (3) State domain restrictions from the ORIGINAL denominator (before cancellation). **Example 1**: (x^2 - 9) / (x^2 + x - 12) = (x - 3)(x + 3) / ((x + 4)(x - 3)) = (x + 3)/(x + 4) for x != 3 (hole at x = 3) and x != -4 (asymptote). **Example 2**: (2 x^2 + 5 x - 3) / (2 x^2 - 7 x + 3). Factor numerator: 2 x^2 + 5 x - 3 = (2 x - 1)(x + 3). Factor denominator: 2 x^2 - 7 x + 3 = (2 x - 1)(x - 3). Cancel (2 x - 1): result = (x + 3)/(x - 3), x != 1/2 (hole), x != 3 (asymptote). **Example 3**: (x^3 - 8) / (x^2 - 4) = (x - 2)(x^2 + 2 x + 4) / ((x - 2)(x + 2)) = (x^2 + 2 x + 4)/(x + 2), x != 2, x != -2. **Caution**: NEVER cancel across addition/subtraction, only across multiplication. (x + 2)/x ≠ 2 (cannot cancel x with x in x+2). ✓',
  'ch01p1_simplify_rational',
  'how_to',
  ['simplify', 'rational expression', 'factor', 'cancel', 'lowest terms', 'hole']
)

add(
  'How do you multiply and divide rational expressions?',
  '**Multiplication**: (P/Q) * (R/S) = (P*R)/(Q*S). Factor everything first, then cancel common factors across numerator and denominator. **Example**: (x^2 - 4)/(x + 3) * (x + 3)/(x - 2). Factor: ((x-2)(x+2))/(x+3) * (x+3)/(x-2). Cancel (x+3) and (x-2): result = (x + 2)/1 = x + 2 (for x != 2, -3). **Division**: (P/Q) ÷ (R/S) = (P/Q) * (S/R) = (P*S)/(Q*R). **Example**: (x^2 - 1)/(x + 2) ÷ (x - 1)/(x^2 - 4). Invert and multiply: (x^2 - 1)/(x + 2) * (x^2 - 4)/(x - 1) = ((x-1)(x+1))/(x+2) * ((x-2)(x+2))/(x-1). Cancel (x+2) and (x-1): result = (x+1)(x-2) = x^2 - x - 2 (for x != 1, -2). **State domain restrictions** from ALL original denominators and the divisor\'s numerator (since you flip it). ✓',
  'ch01p1_multiply_divide_rational',
  'how_to',
  ['multiply rational', 'divide rational', 'invert', 'factor', 'cancel', 'domain restrictions']
)

add(
  'How do you add and subtract rational expressions?',
  '**Procedure**: (1) Factor all denominators. (2) Find the **LCD (least common denominator)** = product of all distinct factors, each raised to its highest power. (3) Rewrite each fraction with LCD by multiplying numerator by missing factors. (4) Combine numerators over LCD; simplify. (5) Factor the new numerator and reduce if possible. **Example 1 (same denom)**: 3/(x+1) + 5/(x+1) = (3+5)/(x+1) = 8/(x+1). **Example 2 (different linear denoms)**: 2/x + 3/(x+1). LCD = x(x+1). = [2(x+1) + 3x]/[x(x+1)] = [2x + 2 + 3x]/[x(x+1)] = (5x + 2)/(x(x+1)). **Example 3 (quadratic)**: 1/(x^2 - 4) + 2/(x + 2). Factor: 1/((x-2)(x+2)) + 2/(x+2). LCD = (x-2)(x+2). = [1 + 2(x-2)]/[(x-2)(x+2)] = [1 + 2x - 4]/[(x-2)(x+2)] = (2x - 3)/[(x-2)(x+2)]. **Example 4 (subtraction)**: 5/(x-3) - 2/(x+2). LCD = (x-3)(x+2). = [5(x+2) - 2(x-3)]/[(x-3)(x+2)] = [5x + 10 - 2x + 6]/[(x-3)(x+2)] = (3x + 16)/[(x-3)(x+2)]. **Sign caution**: distributing subtraction across numerator changes signs. ✓',
  'ch01p1_add_subtract_rational',
  'how_to',
  ['add rational', 'subtract rational', 'LCD', 'least common denominator', 'common denominator']
)

add(
  'How do you simplify complex fractions?',
  'A **complex fraction** has fractions in its numerator and/or denominator. **Method 1 (LCD)**: find the LCD of ALL the small fractions (numerator and denominator), multiply top and bottom by it. **Method 2 (separate)**: simplify numerator and denominator separately, then divide. **Example**: simplify (1/x + 1/y) / (1/x - 1/y). **Method 1**: LCD of small fractions = xy. Multiply top and bottom by xy: [(xy)(1/x) + (xy)(1/y)] / [(xy)(1/x) - (xy)(1/y)] = [y + x] / [y - x] = (x + y)/(y - x) = -(x + y)/(x - y). **Example 2**: (1 + 1/(x-1)) / (x - 1). LCD = (x - 1). Multiply: [(x-1)(1) + 1] / [(x-1)(x-1)] = [x - 1 + 1]/(x-1)^2 = x/(x-1)^2. **Example 3 (nested)**: (1/2 + 1/3) / (1/4 - 1/6). LCD of all small = 12. = [12(1/2) + 12(1/3)] / [12(1/4) - 12(1/6)] = [6 + 4]/[3 - 2] = 10/1 = 10. **Method 2 example**: simplify numerator: 1/x + 1/y = (y + x)/(xy). Denominator: 1/x - 1/y = (y - x)/(xy). Divide: [(x+y)/(xy)] / [(y-x)/(xy)] = (x+y)/(xy) * (xy)/(y-x) = (x+y)/(y-x). ✓',
  'ch01p1_complex_fractions',
  'how_to',
  ['complex fraction', 'LCD method', 'nested fraction', 'simplify', 'multiply through']
)

add(
  'How do you solve rational equations?',
  '**Procedure**: (1) Factor all denominators. (2) Note restricted values (denominators cannot be zero). (3) Multiply both sides by the LCD to clear denominators. (4) Solve the resulting polynomial equation. (5) **Check** every solution against the restrictions; discard extraneous ones. **Example**: solve 1/x + 1/(x+1) = 1/(x(x+1)). Restrictions: x != 0, x != -1. LCD = x(x+1). Multiply through: (x+1) + x = 1 → 2x + 1 = 1 → x = 0. But x = 0 is restricted (extraneous). **No solution.** **Example 2**: solve 2/(x-1) + 3 = 1/(x+2). Restrictions: x != 1, -2. LCD = (x-1)(x+2). Multiply: 2(x+2) + 3(x-1)(x+2) = (x-1). 2x + 4 + 3(x^2 + x - 2) = x - 1. 2x + 4 + 3 x^2 + 3 x - 6 = x - 1. 3 x^2 + 5 x - 2 = x - 1. 3 x^2 + 4 x - 1 = 0. Quadratic formula: x = [-4 ± sqrt(16 + 12)]/6 = [-4 ± sqrt(28)]/6 = [-4 ± 2 sqrt(7)]/6 = (-2 ± sqrt(7))/3. Neither equals 1 or -2; both valid. **Example 3 (proportion)**: 3/(x-2) = 5/x. Cross multiply: 3x = 5(x-2) → 3x = 5x - 10 → -2x = -10 → x = 5. Check: 3/3 = 5/5 = 1. ✓ ✓',
  'ch01p1_solve_rational_equations',
  'how_to',
  ['rational equation', 'LCD', 'extraneous', 'restrictions', 'cross multiply', 'check']
)

// ============================================================
// SECTION 10 — PARTIAL FRACTION DECOMPOSITION BASICS (4 items)
// ============================================================
add(
  'What is partial fraction decomposition and when is it used?',
  '**Partial fraction decomposition (PFD)** rewrites a proper rational function P(x)/Q(x) (deg P < deg Q) as a sum of simpler fractions. **Improper** (deg P >= deg Q): perform polynomial long division first to get polynomial + proper fraction, then decompose the proper part. **Uses**: integrate rational functions (calculus), inverse Laplace transforms (differential equations), evaluating sums, solving linear systems arising in physics. **Form depends on factorization of Q**: (1) Distinct linear factor (ax + b) → term A/(ax + b). (2) Repeated linear factor (ax + b)^k → terms A_1/(ax+b) + A_2/(ax+b)^2 + ... + A_k/(ax+b)^k. (3) Irreducible quadratic factor (ax^2 + bx + c) → term (Ax + B)/(ax^2 + bx + c). (4) Repeated irreducible quadratic (ax^2 + bx + c)^k → terms (A_1 x + B_1)/(q(x)) + ... + (A_k x + B_k)/(q(x))^k. **Example**: 1/[(x-1)(x+2)] = A/(x-1) + B/(x+2). Solve: 1 = A(x+2) + B(x-1). Set x = 1: 1 = 3A → A = 1/3. Set x = -2: 1 = -3B → B = -1/3. So 1/[(x-1)(x+2)] = (1/3)/(x-1) - (1/3)/(x+2). ✓',
  'ch01p1_partial_fractions_intro',
  'formula_recall',
  ['partial fractions', 'decomposition', 'proper rational', 'irreducible', 'integration']
)

add(
  'How do you decompose into partial fractions with distinct linear factors?',
  '**Procedure** (distinct linear factors only): (1) Ensure proper fraction (long divide if needed). (2) Factor Q(x) into distinct linear factors. (3) Write P(x)/Q(x) = A_1/(linear_1) + A_2/(linear_2) + ... with one unknown constant per linear factor. (4) Multiply through by Q(x) to clear denominators. (5) Substitute strategic x values (the roots of each linear factor) to solve for constants directly (Heaviside cover-up). Or expand and equate coefficients to form a linear system. **Example**: (5 x + 3) / [(x - 1)(x + 3)] = A/(x-1) + B/(x+3). Multiply: 5x + 3 = A(x+3) + B(x-1). Set x = 1: 8 = 4A → A = 2. Set x = -3: -12 = -4B → B = 3. So (5x + 3)/[(x-1)(x+3)] = 2/(x-1) + 3/(x+3). **Example 2**: x / [(x-1)(x-2)(x-3)] = A/(x-1) + B/(x-2) + C/(x-3). Multiply: x = A(x-2)(x-3) + B(x-1)(x-3) + C(x-1)(x-2). Set x = 1: 1 = A(-1)(-2) = 2A → A = 1/2. Set x = 2: 2 = B(1)(-1) = -B → B = -2. Set x = 3: 3 = C(2)(1) = 2C → C = 3/2. So x/[(x-1)(x-2)(x-3)] = (1/2)/(x-1) - 2/(x-2) + (3/2)/(x-3). ✓',
  'ch01p1_pfd_distinct_linear',
  'how_to',
  ['partial fractions', 'distinct linear', 'Heaviside cover-up', 'substitute roots', 'solve constants']
)

add(
  'How do you decompose into partial fractions with repeated linear factors?',
  '**Procedure** (repeated linear factor (ax + b)^k): include a term for EACH power from 1 to k. **Example**: 1 / [(x - 1)^2 (x + 2)] = A/(x-1) + B/(x-1)^2 + C/(x+2). Multiply by full denominator: 1 = A(x-1)(x+2) + B(x+2) + C(x-1)^2. **Solve**: (i) Substitute roots of linear factors: x = 1: 1 = 0 + 3B + 0 → B = 1/3. x = -2: 1 = 0 + 0 + 9C → C = 1/9. (ii) Use one more value (say x = 0): 1 = A(-1)(2) + B(2) + C(1) = -2A + 2/3 + 1/9 = -2A + 7/9. So -2A = 2/9 → A = -1/9. **Result**: 1/[(x-1)^2 (x+2)] = (-1/9)/(x-1) + (1/3)/(x-1)^2 + (1/9)/(x+2). **Why include all powers**: only including A/(x-1)^2 would miss the contribution; over R[x]/(x-1)^k a polynomial of degree < k needs all coefficients. **Example 2**: 3 x^2 + 1 / [(x+1)^3] = A/(x+1) + B/(x+1)^2 + C/(x+1)^3. Multiply: 3 x^2 + 1 = A(x+1)^2 + B(x+1) + C. Expand: A(x^2 + 2x + 1) + B(x+1) + C = A x^2 + (2A + B) x + (A + B + C). Match: A = 3; 2A + B = 0 → B = -6; A + B + C = 1 → C = 1 - 3 + 6 = 4. So (3 x^2 + 1)/(x+1)^3 = 3/(x+1) - 6/(x+1)^2 + 4/(x+1)^3. ✓',
  'ch01p1_pfd_repeated_linear',
  'how_to',
  ['partial fractions', 'repeated linear', 'all powers', 'expand', 'equate coefficients']
)

add(
  'How do you decompose into partial fractions with irreducible quadratic factors?',
  '**Procedure** (irreducible quadratic factor ax^2 + bx + c, discriminant < 0): the corresponding numerator is LINEAR (Ax + B), not a constant. **Example**: (3 x^2 + 2 x + 5) / [(x - 1)(x^2 + 4)] = A/(x-1) + (Bx + C)/(x^2 + 4). Multiply: 3 x^2 + 2 x + 5 = A(x^2 + 4) + (Bx + C)(x - 1). Expand RHS: A x^2 + 4A + B x^2 - B x + C x - C = (A + B) x^2 + (-B + C) x + (4A - C). Match coefficients: A + B = 3; -B + C = 2; 4A - C = 5. Solve: from (2) C = 2 + B. Sub (3): 4A - (2 + B) = 5 → 4A - B = 7. Add to (1): A + B + 4A - B = 3 + 7 → 5A = 10 → A = 2. Then B = 1, C = 3. **Result**: (3 x^2 + 2 x + 5)/[(x-1)(x^2 + 4)] = 2/(x-1) + (x + 3)/(x^2 + 4). **Quick check**: Heaviside at x = 1 (root of x - 1): A = (3 + 2 + 5)/(1 + 4) = 10/5 = 2. ✓ **Repeated irreducible quadratic**: (ax^2 + bx + c)^k → sum_{i=1}^{k} (A_i x + B_i)/(ax^2 + bx + c)^i. ✓',
  'ch01p1_pfd_irreducible_quadratic',
  'how_to',
  ['partial fractions', 'irreducible quadratic', 'linear numerator', 'equate coefficients', 'discriminant']
)

// ============================================================
// SECTION 11 — MIXED PROBLEM-SOLVING (2 items)
// ============================================================
add(
  'How do you translate a word problem into an algebraic equation?',
  '**General strategy**: (1) Read carefully; identify what is unknown (assign a variable). (2) Identify given quantities and relationships. (3) Translate phrases: "is" = "=", "of" = "·" (multiply), "sum" = +, "difference" = -, "product" = *, "quotient" = /, "more than" = +, "less than" = -, "twice" = *2, "per" = /. (4) Write an equation (or system). (5) Solve and **check** that the answer makes sense in context (units, magnitude, integer-ness). **Example 1 (number)**: "The sum of two consecutive odd integers is 56." Let first = n (odd); next consecutive odd = n + 2. Equation: n + (n+2) = 56 → 2n = 54 → n = 27. Numbers: 27, 29. Check: 27 + 29 = 56 ✓. **Example 2 (age)**: "In 5 years, Alice will be twice as old as Bob was 3 years ago. Alice is now 4 years older than Bob. Find their ages." Let B = Bob\'s age; A = B + 4. Equation: A + 5 = 2(B - 3) → (B + 4) + 5 = 2B - 6 → B + 9 = 2B - 6 → B = 15, A = 19. Check: in 5 yrs A = 24; 3 yrs ago B = 12; 24 = 2*12 ✓. **Example 3 (mixture)**: "How many liters of 30% acid must be added to 4 L of 10% acid to make 20% acid?" Let x = amount of 30%. Equation: 0.30 x + 0.10(4) = 0.20(x + 4). → 0.30x + 0.4 = 0.20x + 0.8 → 0.10x = 0.4 → x = 4 L. ✓',
  'ch01p1_word_problem_translation',
  'problem_solving',
  ['word problem', 'translate', 'variable', 'equation', 'mixture', 'age', 'consecutive']
)

add(
  'How do you simplify a complicated algebraic expression step-by-step?',
  '**Principles**: work inside-out (parentheses → exponents → mult/div → add/sub, i.e., PEMDAS), simplify each piece, then combine. Use field axioms (associativity, commutativity, distributivity), exponent laws, factoring. **Worked example**: simplify [(x^2 - 4)/(x^2 + 3x + 2)] ÷ [(x - 2)/(x + 1)] - 2x. **Step 1** (factor): numerator x^2 - 4 = (x-2)(x+2); denominator x^2 + 3x + 2 = (x+1)(x+2). So first fraction = (x-2)(x+2)/[(x+1)(x+2)] = (x-2)/(x+1) for x != -2. **Step 2** (division → invert-multiply): [(x-2)/(x+1)] * [(x+1)/(x-2)] = 1 (for x != 1, -2; both factors cancel). **Step 3** (subtract): 1 - 2x. So the simplified form is 1 - 2x (with restrictions x != -2, -1, 2). **Another example**: simplify (2x - 1)^2 - (x + 3)(x - 3) + 5x. Expand: (4x^2 - 4x + 1) - (x^2 - 9) + 5x = 4x^2 - 4x + 1 - x^2 + 9 + 5x = 3x^2 + x + 10. **Third example**: simplify sqrt(50 x^4 y^3) / sqrt(2 x y) for x, y > 0. = sqrt(50 x^4 y^3 / (2 x y)) = sqrt(25 x^3 y^2) = 5 x^(3/2) y = 5 x y sqrt(x). ✓',
  'ch01p1_simplify_algebraic_expression',
  'problem_solving',
  ['simplify', 'PEMDAS', 'factor', 'combine', 'distribute', 'restrictions']
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
  if (!it.answer.includes('\u2713') && it.answer.length < 200) {
    console.error('SUSPICIOUSLY SHORT ANSWER:', it.topic, 'len=', it.answer.length)
    process.exit(1)
  }
}

const output = {
  generatedAt: new Date().toISOString(),
  totalItems: items.length,
  subject: 'mathematics_formulas_volume_9_chapter_01_part_01',
  volume:
    'Volume 9 — Comprehensive Formula Encyclopedia, Chapter 1 Part 1 (Elementary Algebra — Real Number System, Field Axioms, Order Properties, Absolute Value, Exponents & Laws, Radicals & Rationalization, Scientific Notation, Polynomials & Operations, Factoring Techniques [GCF, Grouping, Difference of Squares, Perfect Square Trinomials, Sum/Difference of Cubes, AC Method, Substitution], Rational Expressions, Partial Fraction Decomposition Basics)',
  source: 'TRIZA Generated Formula Dataset',
  language: 'en',
  religionNeutral: true,
  items,
}

mkdirSync('data', { recursive: true })
writeFileSync('data/math-formulas-vol9-ch01p1.json', JSON.stringify(output, null, 2))

console.log(`Wrote data/math-formulas-vol9-ch01p1.json with ${items.length} items.`)
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
