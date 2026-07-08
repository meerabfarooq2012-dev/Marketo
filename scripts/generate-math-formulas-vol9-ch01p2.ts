/**
 * ============================================================
 *  Mathematics Formula Encyclopedia — Volume 9
 *  Comprehensive Formula Reference
 *  Chapter 1 — Part 2 (Equations & Inequalities)
 *  Linear Equations (1 & 2 Variables), Quadratic Equations,
 *  Polynomial Equations (Rational Root, Synthetic Division,
 *  Descartes' Rule), Rational & Radical Equations,
 *  Absolute Value Equations, Systems of Linear Equations
 *  (Substitution, Elimination, Cramer's Rule, Matrix Method),
 *  Nonlinear Systems, Linear & Compound Inequalities,
 *  Quadratic / Rational / Absolute-Value Inequalities,
 *  Linear Programming, Word Problems
 *  Generator for TRIZA
 * ============================================================
 *
 *  Output: data/math-formulas-vol9-ch01p2.json
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
// SECTION 1 — LINEAR EQUATIONS IN ONE VARIABLE (3 items)
// ============================================================
add(
  'How do you solve a linear equation in one variable?',
  '**Procedure** for solving ax + b = 0 (or any form reducible to it): (1) Clear parentheses (distribute). (2) Clear fractions by multiplying both sides by the LCD. (3) Collect variable terms on one side (add/subtract). (4) Collect constant terms on the other. (5) Divide by the coefficient of x. (6) **Check** the solution in the original equation. **Example**: 3(x - 2) + 5 = 2x + 7. Distribute: 3x - 6 + 5 = 2x + 7. Combine: 3x - 1 = 2x + 7. Subtract 2x: x - 1 = 7. Add 1: x = 8. Check: 3(6) + 5 = 23; 2(8) + 7 = 23. ✓ **Fractional example**: x/2 - (x-3)/3 = 4. LCD = 6. Multiply: 3x - 2(x - 3) = 24 → 3x - 2x + 6 = 24 → x = 18. Check: 9 - 5 = 4. ✓ **Classifications**: identity (all x solve, e.g., 2x + 4 = 2(x + 2)), contradiction (no solution, e.g., x + 1 = x + 5), conditional (one solution). ✓',
  'ch01p2_solve_linear_one_variable',
  'how_to',
  ['linear equation', 'one variable', 'solve', 'distribute', 'LCD', 'check']
)

add(
  'How do you classify a linear equation as identity, conditional, or contradiction?',
  '**Identity**: an equation true for ALL values of the variable (in its domain). Solution set = all real numbers (or domain). Algebraically: simplification yields a true statement like 0 = 0. Example: 3(x + 2) - 3x = 6 → 3x + 6 - 3x = 6 → 6 = 6 ✓ (all x). Geometrically: both sides describe the same line. **Conditional**: true for SOME values of the variable (a finite or specific set). Has a definite solution. Example: 2x + 1 = 7 → x = 3 (only solution). **Contradiction**: true for NO values. Algebraically: simplification yields a false statement like 0 = 5. Example: 2x + 3 = 2x + 7 → 3 = 7 (impossible). Solution set = ∅. **Procedure**: simplify both sides, isolate variable. If you end with variable = number → conditional. If true statement (no variable) like 0 = 0 → identity. If false statement (no variable) like 0 = 4 → contradiction. ✓',
  'ch01p2_identity_conditional_contradiction',
  'formula_recall',
  ['identity', 'conditional', 'contradiction', 'solution set', 'classification']
)

add(
  'How do you solve a linear equation with fractions or decimals?',
  '**Two approaches**. **(A) Clear fractions**: multiply both sides by the LCD of all fractions, then solve normally. Example: (x/3) + (x/4) = 7. LCD = 12. Multiply: 12*(x/3) + 12*(x/4) = 12*7 → 4x + 3x = 84 → 7x = 84 → x = 12. Check: 4 + 3 = 7 ✓. **(B) Clear decimals**: multiply both sides by 10, 100, 1000, ... to shift all decimals to integers (use the power of 10 matching the most decimal places). Example: 0.05 x + 1.25 = 0.75 x - 0.25. Multiply by 100: 5 x + 125 = 75 x - 25. Subtract 5x: 125 = 70 x - 25. Add 25: 150 = 70 x. Divide: x = 15/7. Check: 0.05(15/7) + 1.25 = 0.75/7 + 8.75/7 = 9.5/7 ≈ 1.357; 0.75(15/7) - 0.25 = 11.25/7 - 1.75/7 = 9.5/7. ✓ **Mixed fractions/decimals**: convert all to fractions, then clear. **Tip**: avoid rounding intermediate decimals — keep exact until final answer. ✓',
  'ch01p2_solve_fractions_decimals',
  'how_to',
  ['fractions', 'decimals', 'LCD', 'clear', 'multiply', 'exact form']
)

// ============================================================
// SECTION 2 — LINEAR EQUATIONS IN TWO VARIABLES (4 items)
// ============================================================
add(
  'What is a linear equation in two variables and how do you graph it?',
  '**Form**: Ax + By = C (standard form, A, B not both 0), or y = mx + b (slope-intercept), or y - y_1 = m(x - x_1) (point-slope). **Solution**: any ordered pair (x, y) making the equation true. The solution set is a LINE in the plane (when graphed). **Graphing methods**: (1) **Intercepts**: set x = 0 to find y-intercept, set y = 0 to find x-intercept, plot both, draw line. (2) **Slope-intercept**: identify m (slope) and b (y-intercept) from y = mx + b; plot (0, b), then use rise/run from slope to plot a second point. (3) **Table of values**: pick a few x, compute y, plot, connect. **Example**: graph 2x + 3y = 6. x-intercept (y = 0): 2x = 6 → x = 3 → (3, 0). y-intercept (x = 0): 3y = 6 → y = 2 → (0, 2). Plot (3,0) and (0,2), draw line through both. ✓ **Slope**: m = (y_2 - y_1)/(x_2 - x_1) for any two points on the line. Horizontal line: y = b (slope 0). Vertical line: x = a (undefined slope). ✓',
  'ch01p2_linear_two_variables_graph',
  'formula_recall',
  ['linear equation', 'two variables', 'graph', 'intercepts', 'slope', 'standard form']
)

add(
  'How do you find the equation of a line given different information?',
  '**Slope-intercept form** y = mx + b: use when given slope m and y-intercept b. **Point-slope form** y - y_1 = m(x - x_1): use when given slope m and a point (x_1, y_1) on the line. **Standard form** Ax + By = C: integers, A >= 0 typically. **Cases**: (1) Given slope m and y-intercept b: write y = mx + b directly. Example: m = 3, b = -4 → y = 3x - 4. (2) Given slope m and point (x_1, y_1): y - y_1 = m(x - x_1). Example: m = -2, point (3, 5) → y - 5 = -2(x - 3) → y = -2x + 11. (3) Given two points (x_1, y_1) and (x_2, y_2): first find m = (y_2 - y_1)/(x_2 - x_1), then use point-slope. Example: (1, 2) and (4, 8): m = (8 - 2)/(4 - 1) = 2. y - 2 = 2(x - 1) → y = 2x. (4) Horizontal line through (a, b): y = b. (5) Vertical line through (a, b): x = a. ✓',
  'ch01p2_equation_of_line',
  'how_to',
  ['equation of line', 'slope-intercept', 'point-slope', 'two points', 'standard form']
)

add(
  'How do you determine if two lines are parallel, perpendicular, or intersecting?',
  'For two lines L_1: y = m_1 x + b_1 and L_2: y = m_2 x + b_2 (non-vertical): **Parallel** iff m_1 = m_2 AND b_1 != b_2 (same slope, different intercepts). If m_1 = m_2 AND b_1 = b_2, the lines are identical (coincident). **Perpendicular** iff m_1 * m_2 = -1, i.e., m_2 = -1/m_1 (slopes are negative reciprocals). Special: horizontal (m = 0) is perpendicular to vertical (undefined slope). **Intersecting** (non-parallel, non-perpendicular): m_1 != m_2 and m_1 * m_2 != -1. **Examples**: (1) y = 2x + 3 and y = 2x - 5: parallel (same slope 2, different b). (2) y = 3x + 1 and y = -x/3 + 4: perpendicular (3 * (-1/3) = -1). (3) y = 2x + 1 and y = -2x + 1: intersecting (slopes 2 and -2; product -4 ≠ -1). **For vertical/horizontal**: y = 3 || y = 5 (both horizontal); x = 2 || x = 7 (both vertical); y = 3 ⊥ x = 2 (horizontal ⊥ vertical). ✓',
  'ch01p2_parallel_perpendicular',
  'formula_recall',
  ['parallel', 'perpendicular', 'slope', 'negative reciprocal', 'intersecting']
)

add(
  'How do you find the intersection of two lines and classify the system?',
  '**System**: y = m_1 x + b_1, y = m_2 x + b_2. **Substitution**: set m_1 x + b_1 = m_2 x + b_2, solve for x, then back-substitute for y. **Classifications**: (1) **Consistent & independent** (one solution): m_1 ≠ m_2 — lines intersect at one point. (2) **Inconsistent** (no solution): m_1 = m_2, b_1 ≠ b_2 — parallel lines. (3) **Consistent & dependent** (infinitely many solutions): m_1 = m_2, b_1 = b_2 — same line. **Example 1**: y = 2x + 1, y = -x + 4. Set 2x + 1 = -x + 4 → 3x = 3 → x = 1; y = 3. Solution (1, 3) — consistent independent. **Example 2**: 2x + 3y = 6, 4x + 6y = 10. Divide second by 2: 2x + 3y = 5. But first says 2x + 3y = 6. Contradiction 6 = 5 — inconsistent (parallel lines). **Example 3**: x + y = 5, 2x + 2y = 10. Second is twice the first — same line, infinitely many solutions (dependent). Solutions form {(x, 5-x) : x ∈ R}. ✓',
  'ch01p2_system_consistent_inconsistent',
  'problem_solving',
  ['consistent', 'inconsistent', 'dependent', 'independent', 'parallel', 'intersection']
)

// ============================================================
// SECTION 3 — QUADRATIC EQUATIONS (8 items)
// ============================================================
add(
  'What is a quadratic equation and how do you solve it by factoring?',
  '**Quadratic equation**: ax^2 + bx + c = 0 with a != 0. **Solving by factoring** (when polynomial factors nicely): (1) Write in standard form (one side = 0). (2) Factor the quadratic. (3) Apply the **zero-product property**: if (px + q)(rx + s) = 0 then px + q = 0 OR rx + s = 0. (4) Solve each linear equation. **Example 1**: x^2 - 5x + 6 = 0. Factor: (x - 2)(x - 3) = 0. So x = 2 or x = 3. ✓ **Example 2**: 2 x^2 + 7x = 4. Rewrite: 2 x^2 + 7x - 4 = 0. Factor (AC method, A*C = -8, factors 8 and -1): (2x - 1)(x + 4) = 0. So x = 1/2 or x = -4. ✓ **Example 3**: x^2 = 9. Rewrite: x^2 - 9 = 0. Factor: (x - 3)(x + 3) = 0. So x = ±3. **When factoring fails** (irrational/complex roots): use completing the square or quadratic formula. ✓',
  'ch01p2_quadratic_factoring',
  'how_to',
  ['quadratic', 'factoring', 'zero product property', 'solve', 'standard form']
)

add(
  'How do you solve a quadratic equation by completing the square?',
  '**Procedure** for ax^2 + bx + c = 0: (1) If a != 1, divide everything by a. (2) Move the constant to the right side. (3) Add (b/2)^2 (the square of half the linear coefficient) to BOTH sides — this "completes the square" on the left. (4) Write the left side as (x + b/(2a))^2 (after dividing by a) and simplify the right side. (5) Take square root of both sides (introduce ±). (6) Solve for x. **Example**: x^2 + 6x - 7 = 0. Move constant: x^2 + 6x = 7. Add (6/2)^2 = 9: x^2 + 6x + 9 = 16. Write as square: (x + 3)^2 = 16. Square root: x + 3 = ±4. So x = -3 + 4 = 1 OR x = -3 - 4 = -7. ✓ **Example with a ≠ 1**: 2 x^2 - 8x + 6 = 0. Divide by 2: x^2 - 4x + 3 = 0. Move: x^2 - 4x = -3. Add (-4/2)^2 = 4: x^2 - 4x + 4 = 1. Write: (x - 2)^2 = 1. So x = 2 ± 1 → x = 3 or x = 1. ✓ **Use**: derives the quadratic formula; also converts quadratics to vertex form a(x - h)^2 + k for graphing parabolas. ✓',
  'ch01p2_completing_the_square',
  'how_to',
  ['completing the square', 'quadratic', 'vertex form', 'perfect square trinomial', 'solve']
)

add(
  'What is the quadratic formula and how do you use it?',
  '**Quadratic formula** (derived by completing the square on ax^2 + bx + c = 0): **x = [-b ± sqrt(b^2 - 4ac)] / (2a)**. The expression under the radical, D = b^2 - 4ac, is the **discriminant**. The formula gives all real (and complex) roots of any quadratic — even those that don\'t factor. **Procedure**: (1) Write equation in standard form ax^2 + bx + c = 0. (2) Identify a, b, c. (3) Compute discriminant D = b^2 - 4ac. (4) Substitute into formula. (5) Simplify. **Example 1**: 2 x^2 - 7x + 3 = 0. a = 2, b = -7, c = 3. D = 49 - 24 = 25. x = [7 ± sqrt(25)]/4 = [7 ± 5]/4. So x = 12/4 = 3 OR x = 2/4 = 1/2. ✓ **Example 2**: x^2 + 2x + 5 = 0. a = 1, b = 2, c = 5. D = 4 - 20 = -16. x = [-2 ± sqrt(-16)]/2 = [-2 ± 4i]/2 = -1 ± 2i. **Complex roots** (always occur in conjugate pairs when coefficients are real). ✓ **Example 3** (irrational): x^2 - 4x - 2 = 0. D = 16 + 8 = 24. x = [4 ± sqrt(24)]/2 = [4 ± 2 sqrt(6)]/2 = 2 ± sqrt(6). ✓',
  'ch01p2_quadratic_formula',
  'formula_recall',
  ['quadratic formula', 'discriminant', 'roots', 'complex', 'irrational', 'standard form']
)

add(
  'What does the discriminant tell you about the nature of the roots?',
  '**Discriminant** D = b^2 - 4ac of the quadratic ax^2 + bx + c = 0. **Cases** (for real coefficients): (1) **D > 0**: two distinct REAL roots. x = (-b ± sqrt(D))/(2a). If D is a perfect square, roots are RATIONAL; otherwise IRRATIONAL (conjugate surds: p ± sqrt(q)). (2) **D = 0**: ONE real root (a repeated/double root). x = -b/(2a). The quadratic is a perfect square: a(x - r)^2. Graphically: parabola touches x-axis at one point (vertex on x-axis). (3) **D < 0**: NO real roots; two COMPLEX CONJUGATE roots: x = (-b ± i*sqrt(-D))/(2a) = -b/(2a) ± i*sqrt(-D)/(2a). **Examples**: (a) x^2 - 5x + 6 = 0: D = 25 - 24 = 1 > 0, perfect square → two rational roots 2, 3. (b) x^2 - 4x + 4 = 0: D = 16 - 16 = 0 → one double root x = 2. (c) x^2 + x + 1 = 0: D = 1 - 4 = -3 < 0 → complex roots (-1 ± i*sqrt(3))/2. (d) x^2 - 2x - 1 = 0: D = 4 + 4 = 8 > 0, not perfect square → irrational roots 1 ± sqrt(2). ✓',
  'ch01p2_discriminant_nature_roots',
  'formula_recall',
  ['discriminant', 'nature of roots', 'real', 'complex', 'repeated', 'rational', 'irrational']
)

add(
  'What are Vieta\'s formulas (sum and product of roots)?',
  '**Vieta\'s formulas** relate the coefficients of a polynomial to sums and products of its roots. **Quadratic** ax^2 + bx + c = 0 with roots r_1, r_2: **sum** r_1 + r_2 = -b/a; **product** r_1 * r_2 = c/a. **Cubic** ax^3 + bx^2 + cx + d = 0 with roots r_1, r_2, r_3: r_1 + r_2 + r_3 = -b/a; r_1 r_2 + r_1 r_3 + r_2 r_3 = c/a; r_1 r_2 r_3 = -d/a. **General n-th degree** a_n x^n + ... + a_0 = 0: the k-th elementary symmetric polynomial e_k (sum of products of roots taken k at a time) = (-1)^k * a_(n-k) / a_n. **Example 1**: x^2 - 7x + 12 = 0. Sum = 7, product = 12. Roots: 3 and 4 (since 3 + 4 = 7, 3*4 = 12). **Example 2**: x^2 + 5x - 3 = 0. Sum = -5, product = -3. Roots: (-5 ± sqrt(37))/2 (irrational); check sum = -5, product = (25 - 37)/4 = -3. ✓ **Use**: find a quadratic with given roots r_1, r_2: (x - r_1)(x - r_2) = x^2 - (r_1 + r_2)x + r_1 r_2. ✓',
  'ch01p2_vieta_formulas',
  'formula_recall',
  ["Vieta's formulas", 'sum of roots', 'product of roots', 'symmetric polynomial', 'coefficients']
)

add(
  'How do you find a quadratic equation given its roots?',
  '**Method**: if roots are r_1 and r_2, the quadratic is (x - r_1)(x - r_2) = 0, which expands to x^2 - (r_1 + r_2) x + r_1 r_2 = 0. Multiply by any nonzero constant for variations with the same roots. **Example 1**: roots 3 and -5. Quadratic: (x - 3)(x + 5) = x^2 + 5x - 3x - 15 = x^2 + 2x - 15. Check: sum = -2 = -(coefficient of x); product = -15 = constant. ✓ **Example 2 (irrational roots)**: roots 2 + sqrt(3) and 2 - sqrt(3). Sum = 4. Product = (2)^2 - (sqrt(3))^2 = 4 - 3 = 1. Quadratic: x^2 - 4x + 1. ✓ **Example 3 (complex roots)**: roots 1 + 2i and 1 - 2i. Sum = 2. Product = 1 + 4 = 5. Quadratic: x^2 - 2x + 5. ✓ **Example 4 (with multiplicity)**: one root r = 4 (double). Quadratic: (x - 4)^2 = x^2 - 8x + 16. ✓ **Example 5 (with leading coefficient)**: roots 1/2 and -3, leading coefficient 4. Quadratic: 4(x - 1/2)(x + 3) = 4(x^2 + (5/2)x - 3/2) = 4 x^2 + 10x - 6. ✓ **Tip**: for a "nice" equation with integer coefficients, multiply through to clear fractions (use LCD). ✓',
  'ch01p2_quadratic_from_roots',
  'problem_solving',
  ['quadratic from roots', 'sum', 'product', 'complex', 'irrational', 'leading coefficient']
)

add(
  'How do you handle complex (non-real) roots of a quadratic?',
  'If discriminant D = b^2 - 4ac < 0, the quadratic ax^2 + bx + c = 0 has **complex conjugate roots**: x = (-b ± i*sqrt(-D))/(2a) = -b/(2a) ± i*sqrt(|D|)/(2a). Always come in conjugate pairs a + bi and a - bi when coefficients are real (consequence of complex conjugate root theorem). **Example**: x^2 + 4x + 13 = 0. a = 1, b = 4, c = 13. D = 16 - 52 = -36. x = (-4 ± sqrt(-36))/2 = (-4 ± 6i)/2 = -2 ± 3i. ✓ Roots: -2 + 3i and -2 - 3i. **Check** with Vieta: sum = -4 = -b/a; product = (-2)^2 + 3^2 = 4 + 9 = 13 = c/a. ✓ **Factoring over C**: x^2 + 4x + 13 = (x - (-2 + 3i))(x - (-2 - 3i)) = ((x + 2) - 3i)((x + 2) + 3i) = (x + 2)^2 + 9 = x^2 + 4x + 4 + 9 = x^2 + 4x + 13. ✓ **Implication for graphing**: parabola y = x^2 + 4x + 13 doesn\'t cross x-axis (entirely above; vertex at (-2, 9)). **Complex arithmetic**: handle as usual: (a + bi) + (c + di) = (a+c) + (b+d)i; (a+bi)(c+di) = (ac - bd) + (ad + bc)i; conjugate of a + bi is a - bi. ✓',
  'ch01p2_complex_roots',
  'problem_solving',
  ['complex roots', 'imaginary', 'conjugate', 'discriminant negative', 'complex conjugate theorem']
)

add(
  'How do you solve word problems that lead to quadratic equations?',
  '**Strategy**: (1) Define a variable for the unknown. (2) Translate the verbal relationships into a quadratic equation. (3) Solve (factor, formula, or square). (4) **Discard** non-physical solutions (negative lengths, times, etc.). (5) State the answer in context. **Example 1 (area)**: The length of a rectangle is 3 cm more than its width. Area = 70 cm^2. Find dimensions. Let w = width; length = w + 3. Equation: w(w + 3) = 70 → w^2 + 3w - 70 = 0 → (w + 10)(w - 7) = 0 → w = 7 (reject -10). Dimensions: 7 × 10. ✓ **Example 2 (projectile)**: h(t) = -16 t^2 + 32 t + 48 (height in feet). When does it hit ground? Set h = 0: -16 t^2 + 32 t + 48 = 0 → t^2 - 2t - 3 = 0 → (t - 3)(t + 1) = 0 → t = 3 (reject -1). Lands at t = 3 sec. ✓ **Example 3 (Pythagorean)**: One leg is 7 less than hypotenuse; other leg is 8 less. Find sides. Let h = hyp; legs h - 7 and h - 8. (h-7)^2 + (h-8)^2 = h^2 → h^2 - 14h + 49 + h^2 - 16h + 64 = h^2 → h^2 - 30h + 113 = 0. h = [30 ± sqrt(900 - 452)]/2 = [30 ± sqrt(448)]/2 = 15 ± 4 sqrt(7). Take positive larger: h ≈ 25.58; legs ≈ 18.58 and 17.58. ✓',
  'ch01p2_quadratic_word_problems',
  'problem_solving',
  ['quadratic word problem', 'area', 'projectile', 'Pythagorean', 'reject extraneous']
)

// ============================================================
// SECTION 4 — POLYNOMIAL EQUATIONS (6 items)
// ============================================================
add(
  'What is the Rational Root Theorem and how do you use it?',
  '**Rational Root Theorem**: if a polynomial P(x) = a_n x^n + ... + a_1 x + a_0 has integer coefficients, then any RATIONAL root p/q (in lowest terms) satisfies: **p divides a_0** (constant term) and **q divides a_n** (leading coefficient). **Procedure**: (1) List all factors p of a_0 (positive and negative). (2) List all factors q of a_n. (3) Form candidate ratios p/q. (4) Test each candidate using synthetic division (or direct substitution). (5) If P(c) = 0, c is a root and (x - c) is a factor; synthetically divide to deflate the polynomial. (6) Repeat on the deflated polynomial. **Example**: P(x) = 2 x^3 - 3 x^2 - 11x + 6. p ∈ {±1, ±2, ±3, ±6}, q ∈ {±1, ±2}. Candidates: ±1, ±2, ±3, ±6, ±1/2, ±3/2. Test x = 3: 2(27) - 3(9) - 11(3) + 6 = 54 - 27 - 33 + 6 = 0 ✓. So (x - 3) is a factor. Synthetic divide by 3: coeffs 2, -3, -11, 6 → bring 2; *3 = 6, sum 3; *3 = 9, sum -2; *3 = -6, sum 0. Quotient: 2 x^2 + 3 x - 2. Factor: (2x - 1)(x + 2). So P(x) = (x - 3)(2x - 1)(x + 2); roots: 3, 1/2, -2. ✓',
  'ch01p2_rational_root_theorem',
  'how_to',
  ['rational root theorem', 'candidates', 'factors', 'synthetic division', 'deflate']
)

add(
  'How do you use synthetic division to find all roots of a polynomial?',
  '**Procedure** (after finding one root via Rational Root Theorem or other means): (1) Synthetically divide P(x) by (x - c) to get a deflated quotient Q(x) of degree one less. (2) Repeat: find a root of Q(x), divide, etc., until the quotient is linear or quadratic. (3) Solve the final linear or quadratic directly (use quadratic formula if needed, may give complex roots). **Example**: P(x) = x^4 - 6 x^3 + 11 x^2 - 6x. First factor out x: x(x^3 - 6 x^2 + 11x - 6). Now factor x^3 - 6 x^2 + 11x - 6. Candidates ±1, ±2, ±3, ±6. Test x = 1: 1 - 6 + 11 - 6 = 0 ✓. Synthetic divide by 1: coeffs 1, -6, 11, -6 → 1; *1=1, sum -5; *1 = -5, sum 6; *1 = 6, sum 0. Quotient: x^2 - 5x + 6. Factor: (x - 2)(x - 3). So P(x) = x (x - 1)(x - 2)(x - 3); roots: 0, 1, 2, 3. ✓ **Note**: complex roots can be found if the deflated polynomial is quadratic with negative discriminant. **Repeated roots**: if P(c) = 0 AND the deflated polynomial also has c as root, c is a multiple root. ✓',
  'ch01p2_synthetic_division_roots',
  'how_to',
  ['synthetic division', 'deflate', 'find roots', 'factor', 'multiple roots']
)

add(
  'What is Descartes\' Rule of Signs?',
  "**Descartes' Rule of Signs** gives an upper bound on the number of positive and negative real roots of a polynomial, based on sign changes. **Positive roots**: count the number V_+ of sign changes in the coefficients of P(x) (read in order of descending powers, ignoring zero coefficients). The number of positive real roots (counting multiplicity) equals V_+ minus an even non-negative integer (i.e., V_+, V_+ - 2, V_+ - 4, ... down to 0). **Negative roots**: apply the same to P(-x); count V_- sign changes in P(-x). Number of negative real roots = V_- or V_- - 2, V_- - 4, etc. **Complex roots** come in conjugate pairs, so # complex = degree - (# real). **Example**: P(x) = x^4 - 3x^3 + x + 1. Coefficients: +, -, +, +. Sign changes: +→- (1), -→+ (2), +→+ (no). V_+ = 2. So 2 or 0 positive real roots. P(-x) = x^4 + 3x^3 - x + 1. Coefficients: +, +, -, +. Sign changes: +→+ (no), +→- (1), -→+ (2). V_- = 2. So 2 or 0 negative real roots. Degree 4. Possibilities: (pos, neg, complex) = (2, 2, 0), (2, 0, 2), (0, 2, 2), (0, 0, 4). Descartes narrows but does not pin down exactly. ✓",
  'ch01p2_descartes_rule_signs',
  'formula_recall',
  ["Descartes' rule of signs", 'positive roots', 'negative roots', 'sign changes', 'bound']
)

add(
  'What are the Factor Theorem and the Fundamental Theorem of Algebra?',
  '**Factor Theorem**: For polynomial P(x) and constant c, (x - c) is a factor of P(x) if and only if P(c) = 0. (Equivalent to the Remainder Theorem with remainder = 0.) Used to factor polynomials after finding a root. **Fundamental Theorem of Algebra** (Gauss): Every non-constant polynomial with complex coefficients has at least one complex root. Equivalently, a polynomial of degree n >= 1 has exactly n roots in C (counting multiplicity). **Consequences**: (1) Every polynomial of degree n over C factors completely into n linear factors over C: P(x) = a_n (x - r_1)(x - r_2)...(x - r_n), where r_i are roots (repeated per multiplicity). (2) **Complex conjugate root theorem**: if P has real coefficients and z = a + bi is a root, then so is z̄ = a - bi. So non-real roots of real polynomials come in conjugate pairs. (3) Over R, every polynomial factors into linear and irreducible quadratic factors. **Example**: P(x) = x^4 + 1. No real roots (x^4 = -1 impossible), but over C: x^4 + 1 = (x^2 + i)(x^2 - i) = (x - e^(iπ/4))(x - e^(-iπ/4))(x - e^(i3π/4))(x - e^(-i3π/4)). Over R: x^4 + 1 = (x^2 + sqrt(2) x + 1)(x^2 - sqrt(2) x + 1). ✓',
  'ch01p2_factor_fundamental_theorems',
  'formula_recall',
  ['factor theorem', 'fundamental theorem of algebra', 'Gauss', 'multiplicity', 'complex conjugate root']
)

add(
  'How do you solve polynomial equations of degree 3 or higher by factoring?',
  '**Strategy**: (1) Factor out the GCF (including powers of x). (2) Try special patterns: difference of squares, sum/difference of cubes, perfect square. (3) Group terms. (4) Use Rational Root Theorem to find a linear factor, then deflate. (5) Repeat on the deflated polynomial until quotient is linear or quadratic. **Example 1 (GCF + grouping)**: x^3 - 2x^2 - 9x + 18 = 0. Group: (x^3 - 2x^2) - (9x - 18) = x^2 (x - 2) - 9(x - 2) = (x - 2)(x^2 - 9) = (x - 2)(x - 3)(x + 3). Roots: 2, 3, -3. ✓ **Example 2 (sum of cubes + deflation)**: x^3 + 3 x^2 - 4 = 0. Notice x = 1: 1 + 3 - 4 = 0 ✓. Deflate: synthetic divide by 1 → x^2 + 4x + 4 = (x + 2)^2. So (x - 1)(x + 2)^2 = 0. Roots: 1 (simple), -2 (double). ✓ **Example 3 (u-substitution, bi-quadratic)**: x^4 - 13 x^2 + 36 = 0. Let u = x^2: u^2 - 13u + 36 = 0 → (u - 4)(u - 9) = 0 → u = 4 or u = 9 → x = ±2 or x = ±3. Four real roots. ✓',
  'ch01p2_solve_higher_degree',
  'how_to',
  ['higher degree', 'cubic', 'quartic', 'factor', 'grouping', 'deflate', 'substitution']
)

add(
  'How do you find all roots (including complex) of a polynomial?',
  '**Combining techniques**: (1) Find all rational roots via Rational Root Theorem + synthetic division; deflate. (2) Solve the remaining quadratic (or use numerical methods for higher). (3) Use **complex conjugate root theorem**: if coefficients real and z is a root, so is z̄. (4) Sum of multiplicities = degree. **Example**: P(x) = x^4 - 2 x^3 + 5 x^2 - 8x + 4. Try rational roots ±1, ±2, ±4. P(1) = 1 - 2 + 5 - 8 + 4 = 0 ✓. Synthetic divide by 1: 1, -2, 5, -8, 4 → 1; -1; 4; -4; 0. Quotient: x^3 - x^2 + 4x - 4. Try x = 1 again: 1 - 1 + 4 - 4 = 0 ✓ (double root). Divide: 1, -1, 4, -4 → 1; 0; 4; 0. Quotient: x^2 + 4. Roots: x^2 = -4 → x = ±2i. So roots of P: 1 (double), 2i, -2i. P(x) = (x - 1)^2 (x^2 + 4) = (x - 1)^2 (x - 2i)(x + 2i). Check degree 4 ✓. ✓ **Application**: knowing one complex root z = a + bi of a real polynomial gives z̄ = a - bi for free, deflating by both at once (multiply (x - z)(x - z̄) = x^2 - 2 Re(z) x + |z|^2). ✓',
  'ch01p2_find_all_roots',
  'problem_solving',
  ['all roots', 'complex', 'deflate', 'conjugate root', 'multiplicity', 'rational root']
)

// ============================================================
// SECTION 5 — RATIONAL, RADICAL & ABSOLUTE VALUE EQUATIONS (5 items)
// ============================================================
add(
  'How do you solve rational equations and check for extraneous solutions?',
  '**Procedure**: (1) Factor all denominators; identify restricted values (denominators ≠ 0). (2) Find LCD. (3) Multiply both sides by LCD to clear denominators. (4) Solve the resulting equation. (5) **Reject** any solution that equals a restricted value (extraneous). (6) Check remaining solutions. **Example 1**: 1/(x - 1) + 2/x = x/(x(x-1)). Restrictions: x ≠ 0, 1. LCD = x(x-1). Multiply: x + 2(x - 1) = x → 3x - 2 = x → 2x = 2 → x = 1. But x = 1 is restricted → **no solution**. **Example 2**: 6/(x + 2) + 1 = 5/(x + 2). Subtract 5/(x+2): 1/(x+2) + 1 = 0 → 1/(x+2) = -1 → 1 = -x - 2 → x = -3. Check restrictions (x ≠ -2): x = -3 valid. Verify: 6/(-1) + 1 = -6 + 1 = -5; 5/(-1) = -5. ✓ **Cross-multiply shortcut** for proportion a/b = c/d → ad = bc (if b, d ≠ 0). Example: 3/(x - 2) = 4/(x + 1) → 3(x + 1) = 4(x - 2) → 3x + 3 = 4x - 8 → x = 11. ✓',
  'ch01p2_rational_equations',
  'how_to',
  ['rational equation', 'LCD', 'restricted values', 'extraneous', 'cross multiply']
)

add(
  'How do you solve equations with radical expressions?',
  '**Procedure**: (1) Isolate one radical on one side. (2) Square both sides (or cube for cube roots). (3) If radicals remain, isolate and square again. (4) Solve the resulting polynomial equation. (5) **Check** all candidates — squaring introduces extraneous solutions. **Example 1**: sqrt(2x + 5) = x + 1. Square: 2x + 5 = x^2 + 2x + 1 → x^2 = 4 → x = ±2. Check x = 2: sqrt(9) = 3 = 2 + 1 ✓. Check x = -2: sqrt(1) = 1; -2 + 1 = -1. 1 ≠ -1 ✗ (extraneous). **Only x = 2**. **Example 2 (two radicals)**: sqrt(x + 8) - sqrt(x) = 2. Isolate: sqrt(x + 8) = 2 + sqrt(x). Square: x + 8 = 4 + 4 sqrt(x) + x → 4 = 4 sqrt(x) → sqrt(x) = 1 → x = 1. Check: sqrt(9) - sqrt(1) = 3 - 1 = 2 ✓. **Example 3 (cube root)**: cube_root(x + 1) = 2. Cube both sides: x + 1 = 8 → x = 7. Cube root is one-to-one, no extraneous: cube_root(8) = 2 ✓. ✓ **Note**: for nth root with n even, the radicand must be ≥ 0 (real domain).',
  'ch01p2_radical_equations',
  'how_to',
  ['radical equation', 'square both sides', 'extraneous', 'check', 'isolate radical']
)

add(
  'How do you solve absolute value equations?',
  '**Procedure**: (1) Isolate the absolute value expression. (2) Split into cases: |f(x)| = k (k >= 0) → f(x) = k OR f(x) = -k. If k < 0: no solution (since |·| ≥ 0). (3) Solve each branch. (4) **Check** all candidates in the original equation. **Example 1**: |2x - 5| = 7. 2x - 5 = 7 → x = 6. 2x - 5 = -7 → x = -1. Both valid: |7| = 7 ✓, |-7| = 7 ✓. Solutions: {-1, 6}. **Example 2**: |x + 3| = -2. No solution (RHS negative). **Example 3 (nested)**: |x - 2| = |2x + 1|. Square both sides or split: (x - 2) = (2x + 1) → x = -3; (x - 2) = -(2x + 1) → 3x = 1 → x = 1/3. Check x = -3: |-5| = 5; |-5| = 5 ✓. Check x = 1/3: |-5/3| = 5/3; |5/3| = 5/3 ✓. **Example 4 (multi-step)**: |x/2 - 1| + 3 = 6. Isolate: |x/2 - 1| = 3. x/2 - 1 = 3 → x = 8; x/2 - 1 = -3 → x = -4. Check: |3| + 3 = 6 ✓; |-3| + 3 = 6 ✓. ✓',
  'ch01p2_absolute_value_equations',
  'how_to',
  ['absolute value equation', 'split cases', 'isolate', 'check', 'nested absolute value']
)

add(
  'How do you solve equations with two absolute value expressions?',
  '**Method** for |f(x)| = |g(x)|: square both sides (|a| = |b| ⟺ a^2 = b^2 ⟺ a = ±b) OR split into two cases: f(x) = g(x) OR f(x) = -g(x). Solve each, then check. **Example 1**: |3x - 2| = |x + 4|. Case 1: 3x - 2 = x + 4 → 2x = 6 → x = 3. Case 2: 3x - 2 = -(x + 4) → 3x - 2 = -x - 4 → 4x = -2 → x = -1/2. Check x = 3: |7| = 7, |7| = 7 ✓. Check x = -1/2: |-3.5| = 3.5, |3.5| = 3.5 ✓. Solutions: {3, -1/2}. **Alternative**: square: (3x-2)^2 = (x+4)^2 → 9x^2 - 12x + 4 = x^2 + 8x + 16 → 8x^2 - 20x - 12 = 0 → 2x^2 - 5x - 3 = 0 → (2x + 1)(x - 3) = 0 → x = -1/2, x = 3. ✓ Same. **Example 2 (with extra terms)**: |x - 1| + |x + 2| = 5. Solve by intervals based on critical points x = -2, 1. Interval x < -2: -(x-1) - (x+2) = 5 → -2x - 1 = 5 → x = -3 (in interval ✓). Interval -2 ≤ x < 1: -(x-1) + (x+2) = 5 → 3 = 5 (impossible). Interval x ≥ 1: (x-1) + (x+2) = 5 → 2x + 1 = 5 → x = 2 (in interval ✓). Solutions: {-3, 2}. ✓',
  'ch01p2_two_absolute_values',
  'problem_solving',
  ['two absolute values', 'split cases', 'square', 'intervals', 'piecewise']
)

add(
  'How do you solve equations with variables under multiple operations (mixed types)?',
  '**Mixed-type equations** combine polynomials, radicals, rationals, absolute values. **Strategy**: clear them one at a time, isolate, then square/multiply. **Always check** final candidates. **Example 1**: sqrt(x + 3) = 1/(x - 1). Domain: x ≥ -3, x ≠ 1. Square: x + 3 = 1/(x-1)^2. Multiply: (x + 3)(x - 1)^2 = 1. Expand: (x + 3)(x^2 - 2x + 1) = x^3 - 2x^2 + x + 3x^2 - 6x + 3 = x^3 + x^2 - 5x + 3 = 1 → x^3 + x^2 - 5x + 2 = 0. Try rational roots ±1, ±2. x = 1: 1 + 1 - 5 + 2 = -1 ≠ 0. x = 2: 8 + 4 - 10 + 2 = 4 ≠ 0. x = -1: -1 + 1 + 5 + 2 = 7 ≠ 0. Try fractional... actually let\'s instead substitute y = sqrt(x + 3): y^2 = x + 3, x = y^2 - 3. Original: y = 1/(y^2 - 4) → y(y^2 - 4) = 1 → y^3 - 4y - 1 = 0. Try y = -1: -1 + 4 - 1 = 2 ≠ 0. This cubic has 3 real roots (irrational); use Cardano or numerical. **Example 2**: |x - 2| = sqrt(2x + 5). Domain x ≥ -5/2. Case 1: x ≥ 2: x - 2 = sqrt(2x + 5). Square: x^2 - 4x + 4 = 2x + 5 → x^2 - 6x - 1 = 0 → x = (6 ± sqrt(40))/2 = 3 ± sqrt(10). Take x ≥ 2: x = 3 + sqrt(10) ≈ 6.16. Check: |4.16| ≈ 4.16; sqrt(17.32) ≈ 4.16 ✓. Case 2: x < 2: 2 - x = sqrt(2x + 5). Square: 4 - 4x + x^2 = 2x + 5 → x^2 - 6x - 1 = 0 (same!) → x = 3 - sqrt(10) ≈ -0.16. Check: |−0.16 - 2| = 2.16; sqrt(4.68) ≈ 2.16 ✓. Solutions: {3 + sqrt(10), 3 - sqrt(10)}. ✓',
  'ch01p2_mixed_equations',
  'problem_solving',
  ['mixed equation', 'radical', 'absolute value', 'rational', 'multiple operations', 'check']
)

// ============================================================
// SECTION 6 — SYSTEMS OF LINEAR EQUATIONS (6 items)
// ============================================================
add(
  'How do you solve a 2x2 linear system by substitution?',
  '**Substitution method**: (1) Solve one equation for one variable (e.g., y = ...). (2) Substitute this expression into the OTHER equation. (3) Solve the resulting equation in one variable. (4) Back-substitute to find the other variable. (5) Check. **Example**: solve {x + y = 10; 2x - y = 5}. From first: y = 10 - x. Substitute into second: 2x - (10 - x) = 5 → 3x = 15 → x = 5. Back-substitute: y = 10 - 5 = 5. Solution (5, 5). Check: 5 + 5 = 10 ✓; 2(5) - 5 = 5 ✓. **Example 2**: {3x + 2y = 12; x - y = 1}. From second: x = y + 1. Substitute: 3(y + 1) + 2y = 12 → 5y + 3 = 12 → y = 9/5. x = 9/5 + 1 = 14/5. Solution (14/5, 9/5). ✓ **When to use**: when one variable has a coefficient of ±1 in some equation (easy to isolate). If both have coefficients > 1, prefer elimination. **For 3x3 systems**: substitute repeatedly or use elimination/matrix methods. ✓',
  'ch01p2_system_substitution',
  'how_to',
  ['system of equations', 'substitution', '2x2', 'back-substitute', 'solve']
)

add(
  'How do you solve a 2x2 linear system by elimination?',
  '**Elimination (addition) method**: (1) Write both equations in standard form Ax + By = C. (2) Multiply one or both equations by constants so that one variable\'s coefficients are opposites (sum to 0). (3) Add the equations to eliminate that variable. (4) Solve for the remaining variable. (5) Back-substitute to find the other. (6) Check. **Example**: {2x + 3y = 8; 3x - 2y = -1}. To eliminate x, multiply first by 3 and second by -2: {6x + 9y = 24; -6x + 4y = 2}. Add: 13y = 26 → y = 2. Substitute into first: 2x + 6 = 8 → x = 1. Solution (1, 2). Check: 2 + 6 = 8 ✓; 3 - 4 = -1 ✓. **Example 2**: {x + 2y = 5; 3x + 6y = 15}. Multiply first by 3: 3x + 6y = 15 — same as second. Dependent system: infinitely many solutions {(x, (5-x)/2) : x ∈ R}. **Example 3 (inconsistent)**: {x + y = 3; x + y = 5}. Subtract: 0 = -2. Contradiction → no solution (parallel lines). ✓',
  'ch01p2_system_elimination',
  'how_to',
  ['elimination method', 'addition', '2x2', 'eliminate variable', 'parallel', 'dependent']
)

add(
  'What is Cramer\'s Rule and how do you apply it?',
  "**Cramer's Rule** for the 2x2 system {a_11 x + a_12 y = b_1; a_21 x + a_22 y = b_2}: x = D_x/D, y = D_y/D, where D = det(A) = a_11 a_22 - a_12 a_21 (coefficient determinant), D_x = det with first column replaced by b's = b_1 a_22 - a_12 b_2, D_y = a_11 b_2 - b_1 a_21. **Requires D ≠ 0** (unique solution). If D = 0 and D_x or D_y ≠ 0, system is inconsistent (no solution). If D = D_x = D_y = 0, system is dependent (infinitely many). **3x3**: x = D_x/D, y = D_y/D, z = D_z/D where D = det(3x3 coefficient matrix) and D_x, D_y, D_z are obtained by replacing the respective column with the constant column. Compute 3x3 determinant by cofactor expansion: det = a_11(a_22 a_33 - a_23 a_32) - a_12(a_21 a_33 - a_23 a_31) + a_13(a_21 a_32 - a_22 a_31). **Example**: {2x + 3y = 8; 3x - 2y = -1}. D = (2)(-2) - (3)(3) = -4 - 9 = -13. D_x = (8)(-2) - (3)(-1) = -16 + 3 = -13. D_y = (2)(-1) - (8)(3) = -2 - 24 = -26. So x = -13/-13 = 1, y = -26/-13 = 2. Solution (1, 2). ✓",
  'ch01p2_cramers_rule',
  'formula_recall',
  ["Cramer's rule", 'determinant', 'coefficient matrix', '2x2', '3x3', 'solve system']
)

add(
  'How do you solve a linear system using matrices (Gaussian elimination)?',
  '**Matrix method**: write the augmented matrix [A | b] for the system Ax = b. Use elementary row operations (EROs) to reduce to row-echelon form (REF) or reduced row-echelon form (RREF), then back-substitute (REF) or read solutions (RREF). **EROs**: (1) Swap two rows. (2) Multiply a row by nonzero scalar. (3) Add a multiple of one row to another. **Example**: {x + 2y + z = 8; 2x - y + 3z = 13; 3x + y - z = 2}. Augmented: [[1 2 1 | 8], [2 -1 3 | 13], [3 1 -1 | 2]]. R2 → R2 - 2R1: [[1 2 1 | 8], [0 -5 1 | -3], [3 1 -1 | 2]]. R3 → R3 - 3R1: [[1 2 1 | 8], [0 -5 1 | -3], [0 -5 -4 | -22]]. R3 → R3 - R2: [[1 2 1 | 8], [0 -5 1 | -3], [0 0 -5 | -19]]. Back-substitute: -5z = -19 → z = 19/5. -5y + 19/5 = -3 → -5y = -34/5 → y = 34/25. x + 2(34/25) + 19/5 = 8 → x = 8 - 68/25 - 95/25 = 200/25 - 163/25 = 37/25. Solution (37/25, 34/25, 19/5). ✓ Check: 37/25 + 68/25 + 95/25 = 200/25 = 8 ✓. **Alternative**: A^(-1) b (if A invertible).',
  'ch01p2_matrix_method',
  'how_to',
  ['matrix method', 'Gaussian elimination', 'augmented matrix', 'row operations', 'REF', 'RREF']
)

add(
  'How do you solve a 3x3 linear system step-by-step?',
  '**Three strategies**: (1) **Elimination + substitution**: pick two pairs, eliminate the same variable to get a 2x2 system, solve, back-substitute. (2) **Gaussian elimination** on augmented matrix. (3) **Cramer\'s rule** (if determinants nonzero). **Worked example**: {x + y + z = 6; 2x - y + z = 3; x + 2y - z = 2}. **Elimination approach**: Add equations (1) and (3): 2x + 3y = 8. Add (1) and (2): 3x + 2z = 9. Add (2) and (3): 3x + y = 5. From these, pick two: 3x + y = 5 → y = 5 - 3x. Sub into 2x + 3y = 8: 2x + 3(5 - 3x) = 8 → 2x + 15 - 9x = 8 → -7x = -7 → x = 1. Then y = 5 - 3 = 2. From (1): 1 + 2 + z = 6 → z = 3. Solution (1, 2, 3). **Check**: (1) 1 + 2 + 3 = 6 ✓; (2) 2 - 2 + 3 = 3 ✓; (3) 1 + 4 - 3 = 2 ✓. **Inconsistent case**: if elimination yields 0 = nonzero → no solution. **Dependent case**: yields 0 = 0 → parametrize free variables. ✓',
  'ch01p2_system_three_variables',
  'problem_solving',
  ['3x3 system', 'elimination', 'substitution', 'three equations', 'three unknowns']
)

add(
  'How do you solve a system with a parameter (determine for which k solutions exist)?',
  '**Parameterized systems**: the system\'s solution depends on a parameter k. **Goal**: find values of k for which the system has (a) a unique solution, (b) no solution, (c) infinitely many solutions. **Method**: compute the determinant D(k) of the coefficient matrix. (1) If D(k) ≠ 0: unique solution (use Cramer or Gaussian). (2) If D(k) = 0: substitute k and check consistency of the augmented matrix — possibly no solution OR infinitely many. **Example**: {x + 2y = 3; 2x + ky = 6}. D = k - 4. If k ≠ 4: unique solution (from first: x = 3 - 2y; sub: 6 - 4y + ky = 6 → y(k - 4) = 0 → y = 0; x = 3). If k = 4: equations are x + 2y = 3 (twice 2x + 4y = 6 → x + 2y = 3) — same line — infinitely many solutions {(x, (3-x)/2) : x ∈ R}. ✓ **Example 2**: {x + y + z = 1; x + 2y + 3z = k; x + 4y + 9z = k^2}. The augmented matrix van Hoeff... actually compute. Subtract (1) from (2): y + 2z = k - 1. Subtract (2) from (3): 2y + 6z = k^2 - k → y + 3z = (k^2 - k)/2. Subtract these: z = (k^2 - k)/2 - (k - 1) = (k^2 - k - 2k + 2)/2 = (k^2 - 3k + 2)/2 = (k-1)(k-2)/2. y = (k - 1) - 2z = (k - 1)(1 - (k - 2)) = (k - 1)(3 - k). x = 1 - y - z. For all k real, solution exists (unique). ✓',
  'ch01p2_parameter_system',
  'problem_solving',
  ['parameter', 'determinant', 'unique solution', 'no solution', 'infinitely many', 'k']
)

// ============================================================
// SECTION 7 — NONLINEAR SYSTEMS (3 items)
// ============================================================
add(
  'How do you solve a nonlinear system by substitution?',
  '**Nonlinear system**: at least one equation is nonlinear (quadratic, circle, etc.). **Substitution**: solve a linear equation for one variable, substitute into the nonlinear equation, solve, back-substitute. **Example**: {x + y = 5; x^2 + y^2 = 13}. From first: y = 5 - x. Substitute: x^2 + (5 - x)^2 = 13 → x^2 + 25 - 10x + x^2 = 13 → 2x^2 - 10x + 12 = 0 → x^2 - 5x + 6 = 0 → (x - 2)(x - 3) = 0. So x = 2 (y = 3) or x = 3 (y = 2). Solutions: (2, 3), (3, 2). Check: 4 + 9 = 13 ✓; 9 + 4 = 13 ✓. **Example 2**: {y = x^2 - 1; y = x + 1}. Set equal: x^2 - 1 = x + 1 → x^2 - x - 2 = 0 → (x - 2)(x + 1) = 0 → x = 2 (y = 3) or x = -1 (y = 0). Solutions: (2, 3), (-1, 0). **Example 3 (line + circle)**: {x^2 + y^2 = 25; y = x + 1}. Substitute: x^2 + (x+1)^2 = 25 → 2x^2 + 2x + 1 = 25 → 2x^2 + 2x - 24 = 0 → x^2 + x - 12 = 0 → (x + 4)(x - 3) = 0. So x = -4 (y = -3) or x = 3 (y = 4). Solutions: (-4, -3), (3, 4). ✓',
  'ch01p2_nonlinear_substitution',
  'how_to',
  ['nonlinear system', 'substitution', 'line and circle', 'parabola', 'solve']
)

add(
  'How do you solve a nonlinear system by elimination?',
  '**Elimination** works when both equations are in a form allowing you to cancel a variable by addition/subtraction (especially useful for two conics). **Example 1**: {x^2 + y^2 = 25; x^2 - y^2 = 7}. Add: 2x^2 = 32 → x^2 = 16 → x = ±4. Subtract: 2y^2 = 18 → y^2 = 9 → y = ±3. Four solutions: (4, 3), (4, -3), (-4, 3), (-4, -3). **Example 2 (parabola + line via elimination)**: {x^2 + y^2 = 20; x + y = 6}. Use y = 6 - x: x^2 + (6-x)^2 = 20 → 2x^2 - 12x + 16 = 0 → x^2 - 6x + 8 = 0 → (x - 2)(x - 4) = 0. Solutions (2, 4), (4, 2). **Example 3 (two parabolas)**: {y = x^2; x = y^2}. Substitute y = x^2 into second: x = (x^2)^2 = x^4 → x^4 - x = 0 → x(x^3 - 1) = 0 → x = 0 (y = 0) or x = 1 (y = 1). Solutions: (0, 0), (1, 1). **Example 4 (with cross terms)**: {x^2 + y^2 = 5; xy = 2}. Use (x+y)^2 = x^2 + y^2 + 2xy = 5 + 4 = 9 → x + y = ±3. Combined with xy = 2: roots of t^2 ∓ 3t + 2 = 0 → (t - 1)(t - 2) = 0. Solutions: (1, 2), (2, 1), (-1, -2), (-2, -1). ✓',
  'ch01p2_nonlinear_elimination',
  'how_to',
  ['nonlinear system', 'elimination', 'two conics', 'add subtract', 'circle']
)

add(
  'How do you interpret the geometry of nonlinear systems (number of intersection points)?',
  '**Geometric interpretation**: solutions of a system = intersection points of the curves. **Line + circle**: 0 (miss), 1 (tangent), or 2 (secant) intersections. **Line + parabola**: 0, 1 (tangent), or 2. **Two circles**: 0 (separate or one inside other), 1 (tangent), 2 (intersect). **Parabola + parabola**: up to 4 intersections (since degrees multiply: 2*2 = 4, by Bezout\'s theorem). **Line + line**: 0, 1, or infinite. **Example 1**: line y = 2x + 5 and circle x^2 + y^2 = 25. Substitute: x^2 + (2x+5)^2 = 25 → 5x^2 + 20x + 25 = 25 → 5x^2 + 20x = 0 → 5x(x + 4) = 0 → x = 0 or x = -4. Two intersections (0, 5) and (-4, -3). Secant. ✓ **Example 2 (tangent)**: line y = 3 and circle x^2 + y^2 = 9. Substitute: x^2 + 9 = 9 → x = 0. One intersection (0, 3) — tangent at top. ✓ **Example 3 (no intersection)**: line y = 4 and circle x^2 + y^2 = 9. Substitute: x^2 + 16 = 9 → x^2 = -7 (no real solution). Line misses the circle. ✓ **Bezout\'s theorem** (algebraic geometry): two algebraic curves of degrees m and n have at most mn intersections (counting multiplicity and complex intersections). ✓',
  'ch01p2_nonlinear_geometry',
  'problem_solving',
  ['nonlinear geometry', 'intersection', 'tangent', 'secant', 'Bezout', 'curves']
)

// ============================================================
// SECTION 8 — INEQUALITIES (5 items)
// ============================================================
add(
  'How do you solve and graph linear inequalities in one variable?',
  '**Procedure**: identical to solving equations, EXCEPT when multiplying or dividing by a NEGATIVE number — the inequality direction REVERSES. **Example 1**: 3x - 7 < 2x + 5. Subtract 2x: x - 7 < 5. Add 7: x < 12. Solution: (-inf, 12). Graph: open dot at 12, shaded left. **Example 2**: -2x + 3 >= 7. Subtract 3: -2x >= 4. Divide by -2 (FLIP): x <= -2. Solution: (-inf, -2]. **Example 3 (with fractions)**: (x - 1)/3 > (x + 2)/4. LCD = 12. Multiply: 4(x - 1) > 3(x + 2) → 4x - 4 > 3x + 6 → x > 10. Solution (10, inf). **Compound inequalities** (joined by AND = intersection or OR = union): "AND" both must hold; "OR" at least one holds. -3 <= 2x + 1 < 7: subtract 1: -4 <= 2x < 6; divide by 2: -2 <= x < 3. Solution [-2, 3). ✓',
  'ch01p2_linear_inequality',
  'how_to',
  ['linear inequality', 'reverse', 'negative', 'interval', 'graph', 'compound']
)

add(
  'How do you solve quadratic inequalities using the sign-chart method?',
  '**Procedure**: (1) Move everything to one side (one side = 0). (2) Factor the quadratic (or find roots via quadratic formula). (3) Plot the roots on a number line; these divide it into intervals. (4) Test a value in each interval to determine the sign of the quadratic. (5) Select intervals matching the inequality (>0, ≥0, <0, ≤0). **Example 1**: x^2 - x - 6 > 0. Factor: (x - 3)(x + 2) > 0. Roots: -2, 3. Intervals: (-inf, -2), (-2, 3), (3, inf). Test x = -3: (-)(-) = + (true). Test x = 0: (-)(+) = - (false). Test x = 4: (+)(+) = + (true). Solution: (-inf, -2) ∪ (3, inf). **Example 2**: x^2 - 4x + 4 <= 0. (x - 2)^2 <= 0. Square is always ≥ 0; equals 0 only at x = 2. Solution: {2}. **Example 3 (no real roots)**: x^2 + 1 > 0. Always true. Solution: all reals. **Example 4 (negative leading)**: -x^2 + 4 >= 0 → x^2 <= 4 → -2 <= x <= 2. Solution [-2, 2]. ✓ **Strict inequality** (> or <): exclude roots (open intervals). **Non-strict** (≥ or ≤): include roots (closed).',
  'ch01p2_quadratic_inequality',
  'how_to',
  ['quadratic inequality', 'sign chart', 'factor', 'roots', 'intervals', 'test value']
)

add(
  'How do you solve rational inequalities?',
  '**Procedure**: (1) Move everything to one side (one side = 0). (2) Combine into a single rational expression. (3) Find the zeros (numerator = 0) and the undefined points (denominator = 0). (4) Plot on number line — these divide it into intervals. (5) Test each interval. (6) **For ≤ or ≥, include the zeros (numerator), but NEVER include the undefined points** (denominator ≠ 0). **Example 1**: (x - 1)/(x + 2) > 0. Numerator zero: x = 1. Denominator zero: x = -2 (excluded). Intervals: (-inf, -2), (-2, 1), (1, inf). Test x = -3: (-)/(-) = + (true). Test x = 0: (-)/(+) = - (false). Test x = 2: (+)/(+) = + (true). Solution: (-inf, -2) ∪ (1, inf). **Example 2**: (x^2 - 4)/(x - 1) <= 0. Factor: (x - 2)(x + 2)/(x - 1) <= 0. Critical: x = -2, 2 (zeros), x = 1 (excluded). Intervals: (-inf, -2], [-2, 1), (1, 2], [2, inf)... actually intervals are (-inf, -2), (-2, 1), (1, 2), (2, inf). Test: x = -3: (-)(-)/(-) = -. x = 0: (-)(+)/(-) = +. x = 1.5: (+)(+)/(-) = -. x = 3: (+)(+)/(+) = +. Take ≤ 0: (-inf, -2] ∪ (1, 2]. Note: x = -2 and x = 2 included (numerator zero, denom nonzero); x = 1 excluded (denom zero). ✓',
  'ch01p2_rational_inequality',
  'how_to',
  ['rational inequality', 'sign chart', 'numerator zero', 'denominator zero', 'excluded']
)

add(
  'How do you solve absolute value inequalities?',
  '**Three forms** (assume k > 0): (1) |f(x)| < k ⟺ -k < f(x) < k (intersection/AND). (2) |f(x)| <= k ⟺ -k <= f(x) <= k. (3) |f(x)| > k ⟺ f(x) < -k OR f(x) > k (union/OR). (4) |f(x)| >= k ⟺ f(x) <= -k OR f(x) >= k. (5) |f(x)| < 0: no solution. (6) |f(x)| >= 0: all reals (in domain). **Example 1**: |x - 3| < 5 → -5 < x - 3 < 5 → -2 < x < 8. Solution (-2, 8). **Example 2**: |2x + 1| >= 7 → 2x + 1 <= -7 OR 2x + 1 >= 7 → 2x <= -8 OR 2x >= 6 → x <= -4 OR x >= 3. Solution (-inf, -4] ∪ [3, inf). **Example 3 (multi-step)**: |x/2 - 1| - 3 < 2. Isolate: |x/2 - 1| < 5 → -5 < x/2 - 1 < 5 → -4 < x/2 < 6 → -8 < x < 12. Solution (-8, 12). **Example 4 (no solution)**: |x + 2| < -1. No solution (|·| ≥ 0). **Example 5 (all reals)**: |x - 5| >= -1. Always true (|·| ≥ 0 > -1). **Geometric meaning**: |x - c| < k = points within distance k of c. ✓',
  'ch01p2_absolute_value_inequality',
  'how_to',
  ['absolute value inequality', 'split', 'intersection', 'union', 'isolate', 'distance']
)

add(
  'How do you solve compound inequalities with "and" and "or"?',
  '**Compound inequality**: two inequalities joined by "AND" or "OR". **"AND"** (conjunction): BOTH must hold. Solution = INTERSECTION of the two solution sets. **"OR"** (disjunction): AT LEAST ONE holds. Solution = UNION. **Example 1 (AND)**: x > -2 AND x < 5. Solution: (-2, 5) (intersection of (-2, inf) and (-inf, 5)). **Example 2 (OR)**: x <= -1 OR x >= 3. Solution: (-inf, -1] ∪ [3, inf) (union). **Example 3 (three-part)**: -3 <= 2x + 1 < 7. This is shorthand for (-3 <= 2x + 1) AND (2x + 1 < 7). Solve simultaneously: subtract 1: -4 <= 2x < 6; divide by 2: -2 <= x < 3. Solution [-2, 3). **Example 4 (mixed)**: x + 1 > 4 AND x - 2 < 8. → x > 3 AND x < 10 → (3, 10). **Example 5**: |x| > 2 OR x < 0. |x| > 2 ⟺ x < -2 OR x > 2. UNION with x < 0: x < -2 (covered) ∪ -2 <= x < 0 ∪ x > 2. Result: (-inf, 0) ∪ (2, inf). ✓ **Tip**: draw number lines for each piece, then combine visually. ✓',
  'ch01p2_compound_inequality',
  'how_to',
  ['compound inequality', 'AND', 'OR', 'intersection', 'union', 'three-part']
)

// ============================================================
// SECTION 9 — LINEAR PROGRAMMING (2 items)
// ============================================================
add(
  'What is linear programming and how do you set up a problem?',
  '**Linear programming (LP)**: optimize (maximize or minimize) a linear **objective function** subject to linear **constraints** (inequalities). **Standard form**: maximize (or minimize) z = c_1 x_1 + c_2 x_2 + ... + c_n x_n subject to a system of linear inequalities (≤, ≥, =) and non-negativity x_i ≥ 0. **Steps to set up**: (1) Identify decision variables (x, y, ...). (2) Write objective function. (3) Write constraints as inequalities. (4) Add non-negativity constraints. **Example**: A bakery makes cakes (x) and pies (y). Profit: $5/cake, $3/pie. Flour constraint: 2 cups/cake, 1 cup/pie, total 100 cups. Eggs: 3/cake, 1/pie, total 120 eggs. Setup: maximize P = 5x + 3y subject to 2x + y <= 100, 3x + y <= 120, x ≥ 0, y ≥ 0. **Feasible region**: intersection of all constraint half-planes (a convex polygon). **Fundamental theorem of LP**: if an optimum exists, it occurs at a VERTEX (corner point) of the feasible region. ✓',
  'ch01p2_linear_programming_setup',
  'formula_recall',
  ['linear programming', 'objective function', 'constraints', 'feasible region', 'decision variables']
)

add(
  'How do you solve a 2-variable linear programming problem graphically?',
  '**Graphical method** (2 decision variables): (1) Graph each constraint as a line, shade the half-plane satisfying it. (2) The feasible region is the intersection (overlap) of all shaded regions — a convex polygon. (3) Find the **vertices** (corner points) of the feasible region by solving the relevant pairs of equations. (4) Evaluate the objective function z at each vertex. (5) The maximum and minimum values of z occur at vertices (corner point theorem). **Example**: maximize P = 5x + 3y subject to 2x + y <= 100, 3x + y <= 120, x ≥ 0, y ≥ 0. Vertices: (0, 0); (0, 100) — wait, check both constraints: at (0, 100): 2(0) + 100 = 100 ≤ 100 ✓; 3(0) + 100 = 100 ≤ 120 ✓. Yes. (40, 0) — from 3x = 120: x = 40, y = 0. Check 2x + y = 80 ≤ 100 ✓. (20, 60) — intersection of 2x + y = 100 and 3x + y = 120: subtract: x = 20, y = 60. Check: 2(20) + 60 = 100 ✓, 3(20) + 60 = 120 ✓. Evaluate: P(0,0) = 0; P(0,100) = 300; P(40,0) = 200; P(20,60) = 100 + 180 = 280. **Maximum P = 300 at (0, 100)** (make 100 pies, no cakes). **Unbounded region**: if max/min and region unbounded in direction of growth, no finite optimum. **Infeasible**: no feasible region (no solution). ✓',
  'ch01p2_linear_programming_graphical',
  'problem_solving',
  ['linear programming', 'graphical', 'vertices', 'corner point', 'feasible region', 'maximize']
)

// ============================================================
// SECTION 10 — WORD PROBLEMS (6 items)
// ============================================================
add(
  'How do you solve distance/rate/time word problems?',
  '**Fundamental formula**: d = r * t (distance = rate × time). Variations: r = d/t, t = d/r. **Setup**: identify the two trips (or two vehicles); write d, r, t for each; use the relationship to form an equation. Common patterns: (a) same distance, different rates → times differ; (b) same time, different distances; (c) total distance = sum; (d) total time = sum; (e) one catches up to other (same distance, different start times). **Example 1 (opposite directions)**: Two cars leave the same point in opposite directions. One at 60 mph, other at 50 mph. When are they 330 miles apart? Combined rate = 110 mph. t = 330/110 = 3 hours. **Example 2 (catch-up)**: Car A leaves at 9 AM at 40 mph. Car B leaves at 10 AM at 60 mph. When does B catch A? Let t = hours after 10 AM. Distance A: 40(t + 1); Distance B: 60 t. Equal: 40 t + 40 = 60 t → t = 2 hours. Catches at 12 PM, distance 120 miles. **Example 3 (current)**: Boat goes 30 mi downstream in 2 hr, 30 mi upstream in 3 hr. Boat speed in still water? Current? Downstream rate = 15 mph = b + c; upstream = 10 mph = b - c. Solve: b = 12.5 mph, c = 2.5 mph. ✓',
  'ch01p2_distance_rate_time',
  'problem_solving',
  ['distance', 'rate', 'time', 'word problem', 'current', 'catch up']
)

add(
  'How do you solve mixture word problems?',
  '**Mixture problems**: combine substances of different concentrations/values to get a target. **Key principle**: amount of substance = concentration × volume (or value × quantity). Sum of input amounts = output amount. **Example 1 (concentration)**: How many liters of 30% acid must be added to 4 L of 10% acid to make 20% acid? Let x = L of 30%. Acid: 0.30x + 0.40 = 0.20(x + 4) → 0.30x + 0.40 = 0.20x + 0.80 → 0.10x = 0.40 → x = 4 L. Total 8 L of 20% acid. **Example 2 (cost)**: Mix $4/lb coffee with $7/lb coffee to get 20 lb of $5/lb blend. Let x = lb of $4, y = lb of $7. System: x + y = 20; 4x + 7y = 100. From first: y = 20 - x. Sub: 4x + 7(20 - x) = 100 → 4x + 140 - 7x = 100 → -3x = -40 → x = 40/3 ≈ 13.33 lb, y = 20/3 ≈ 6.67 lb. **Example 3 (pure substance)**: How much pure acid must be added to 5 L of 20% acid to make 50% acid? Let x = L of pure (100%) acid. 0.20(5) + 1.00 x = 0.50(x + 5) → 1 + x = 0.5x + 2.5 → 0.5x = 1.5 → x = 3 L. ✓ **General**: track amount of "active ingredient" — never the volume alone.',
  'ch01p2_mixture_problems',
  'problem_solving',
  ['mixture', 'concentration', 'percent', 'acid', 'cost', 'blend']
)

add(
  'How do you solve work/rate word problems?',
  '**Work principle**: if person A completes a job in time t_A, A\'s rate is 1/t_A (jobs per unit time). Combined rate of A and B = 1/t_A + 1/t_B. Time together T satisfies 1/T = 1/t_A + 1/t_B → **T = (t_A t_B)/(t_A + t_B)** (harmonic mean / 2). **Example 1**: Alice paints a house in 4 hours; Bob in 6 hours. Together: 1/T = 1/4 + 1/6 = 5/12 → T = 12/5 = 2.4 hours (2 hr 24 min). **Example 2 (with one helping part-time)**: A fills a pool in 6 hr; B drains it in 9 hr. If both open, time to fill? Net rate = 1/6 - 1/9 = 1/18. T = 18 hours. **Example 3 (with partial work)**: Pipe A fills in 8 hr; pipe B in 12 hr. A runs alone for 2 hr, then both. Time after B starts to finish? After 2 hr of A: 2/8 = 1/4 done, 3/4 remains. Combined rate: 1/8 + 1/12 = 5/24 per hr. Time to do 3/4: (3/4)/(5/24) = (3/4)(24/5) = 18/5 = 3.6 hr. **Example 4 (three workers)**: A: 4 hr, B: 6 hr, C: 12 hr. Together: 1/T = 1/4 + 1/6 + 1/12 = 6/12 = 1/2 → T = 2 hr. **General formula**: for n workers with individual times t_i: 1/T = sum(1/t_i). ✓',
  'ch01p2_work_problems',
  'problem_solving',
  ['work', 'rate', 'combined', 'painting', 'pipes', 'harmonic mean']
)

add(
  'How do you solve interest and investment word problems?',
  '**Simple interest**: I = P r t (Principal × rate × time). **Compound interest** (annual): A = P (1 + r)^t. **Continuous compounding**: A = P e^(rt). **Investment mix**: total interest = sum of (principal × rate) for each investment. **Example 1 (simple)**: $5000 at 6% simple interest for 3 years. I = 5000(0.06)(3) = $900. Total $5900. **Example 2 (two investments)**: $10,000 split: part at 5%, part at 7%. Total interest after 1 year = $640. How much at each rate? Let x = amount at 5%; 10000 - x at 7%. 0.05x + 0.07(10000 - x) = 640 → 0.05x + 700 - 0.07x = 640 → -0.02x = -60 → x = $3000 at 5%, $7000 at 7%. Check: 150 + 490 = 640 ✓. **Example 3 (compound)**: $2000 at 8% compounded annually for 5 years. A = 2000(1.08)^5 = 2000 × 1.4693 ≈ $2938.66. **Example 4 (continuous)**: $1000 at 5% compounded continuously for 10 years. A = 1000 e^(0.05*10) = 1000 e^0.5 ≈ $1648.72. **Example 5 (doubling time)**: rule of 72: doubling time ≈ 72/rate%. At 6%, doubling ≈ 12 years. Exact (continuous): t = ln(2)/r. ✓',
  'ch01p2_interest_investment',
  'problem_solving',
  ['interest', 'investment', 'simple', 'compound', 'continuous', 'rate']
)

add(
  'How do you solve age word problems?',
  '**Setup**: assign variables for current ages; express past/future ages in terms of variables. **Example 1**: Alice is 4 years older than Bob. In 5 years, Alice will be twice Bob\'s age 3 years ago. Find their current ages. Let B = Bob now; A = B + 4. In 5 years, Alice = B + 9; 3 years ago Bob = B - 3. Equation: B + 9 = 2(B - 3) → B + 9 = 2B - 6 → B = 15. A = 19. Check: in 5 yrs A = 24; 3 yrs ago B = 12; 24 = 2(12) ✓. **Example 2**: Tom is twice as old as Jerry. Ten years ago, Tom was three times as old as Jerry. Current ages? Let J = Jerry; T = 2J. 10 years ago: T - 10 = 3(J - 10) → 2J - 10 = 3J - 30 → J = 20; T = 40. Check: 10 yrs ago Tom 30, Jerry 10; 30 = 3(10) ✓. **Example 3 (sum of ages)**: The sum of a father\'s and son\'s ages is 60. In 6 years, the father will be twice as old as the son. Let F = father, S = son. F + S = 60; F + 6 = 2(S + 6) → F = 2S + 6. Substitute: 2S + 6 + S = 60 → 3S = 54 → S = 18; F = 42. Check: in 6 yrs F = 48, S = 24; 48 = 2(24) ✓. **General**: write current ages; express past/future by adding/subtracting; relate via given equation. ✓',
  'ch01p2_age_problems',
  'problem_solving',
  ['age problem', 'current age', 'past', 'future', 'twice', 'set up']
)

add(
  'How do you solve geometry word problems (perimeter, area, Pythagorean)?',
  '**Geometry setups**: rectangles (P = 2L + 2W, A = LW), triangles (A = (1/2)bh), circles (C = 2πr, A = πr²), Pythagorean (a² + b² = c² for right triangles). **Example 1 (perimeter-area)**: A rectangle has length 5 more than width, perimeter 38. Find dimensions. Let w = width, l = w + 5. P = 2(w + w + 5) = 4w + 10 = 38 → w = 7, l = 12. Area = 84. ✓ **Example 2 (Pythagorean)**: A ladder 13 ft leans against a wall; base is 5 ft from wall. How high does it reach? c = 13, a = 5, b = ?. a² + b² = c² → 25 + b² = 169 → b = 12 ft. **Example 3 (combined)**: The diagonal of a rectangle is 10. Length is 2 more than width. Find dimensions. Let w = width; l = w + 2. w² + (w + 2)² = 100 → 2w² + 4w + 4 = 100 → w² + 2w - 48 = 0 → (w + 8)(w - 6) = 0 → w = 6 (reject -8), l = 8. **Example 4 (area of triangle)**: A triangle has base = (2/3) height, area = 12. Find dimensions. A = (1/2)bh = 12. b = (2/3)h. (1/2)(2/3)h² = 12 → h²/3 = 12 → h² = 36 → h = 6, b = 4. ✓ **Example 5 (circle)**: A circular garden has circumference 31.4 ft. Find area. C = 2πr → r ≈ 5; A = π(25) ≈ 78.5 ft². ✓',
  'ch01p2_geometry_problems',
  'problem_solving',
  ['geometry', 'perimeter', 'area', 'Pythagorean', 'rectangle', 'circle', 'word problem']
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
  subject: 'mathematics_formulas_volume_9_chapter_01_part_02',
  volume:
    'Volume 9 — Comprehensive Formula Encyclopedia, Chapter 1 Part 2 (Equations & Inequalities — Linear Equations in One & Two Variables, Quadratic Equations [Factoring, Completing the Square, Quadratic Formula, Discriminant, Vieta\'s, Complex Roots], Polynomial Equations [Rational Root Theorem, Synthetic Division, Descartes\' Rule, Factor & Fundamental Theorems], Rational/Radical/Absolute-Value Equations, Systems of Linear Equations [Substitution, Elimination, Cramer\'s Rule, Matrix Method, 3-Variable], Nonlinear Systems, Linear/Compound/Quadratic/Rational/Absolute-Value Inequalities, Linear Programming, Word Problems)',
  source: 'TRIZA Generated Formula Dataset',
  language: 'en',
  religionNeutral: true,
  items,
}

mkdirSync('data', { recursive: true })
writeFileSync('data/math-formulas-vol9-ch01p2.json', JSON.stringify(output, null, 2))

console.log(`Wrote data/math-formulas-vol9-ch01p2.json with ${items.length} items.`)
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
