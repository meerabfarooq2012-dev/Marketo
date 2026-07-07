/**
 * ============================================================
 *  Mathematics Formula Encyclopedia — Volume 9
 *  Comprehensive Formula Reference
 *  Chapter 5 — Part 1 (Sequences, Series, Convergence Tests,
 *  Power Series, Taylor & Maclaurin Series, Parametric &
 *  Polar Calculus)
 *  Generator for TRIZA
 * ============================================================
 *
 *  Output: data/math-formulas-vol9-ch05p1.json
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
// SECTION 1 — SEQUENCES (8 items)
// ============================================================
add(
  'What is a sequence and what does it mean for a sequence to converge?',
  'A sequence {a_n} is an ordered list of numbers indexed by n=1,2,3,... It converges to a limit L if for every epsilon>0 there exists N such that |a_n - L| < epsilon for all n > N. Written: lim(n->inf) a_n = L. If no such L exists, the sequence diverges. Divergence includes oscillation (e.g., (-1)^n) and divergence to infinity (e.g., n^2). Example: a_n = (2n+1)/(n+3). Divide by n: (2+1/n)/(1+3/n) -> 2/1 = 2. So lim a_n = 2. Convergent. ✓',
  'ch05p1_sequence_definition',
  'formula_recall',
  ['sequence', 'converge', 'diverge', 'limit', 'epsilon definition']
)

add(
  'What is the limit of a sequence defined by a function?',
  'If lim(x->inf) f(x) = L and a_n = f(n), then lim(n->inf) a_n = L. This lets us use L-Hopital and other function-limit techniques. Conversely, a sequence limit existing does not imply the function limit exists. Example: a_n = n·sin(1/n). Let f(x) = x·sin(1/x). lim(x->inf) x·sin(1/x) = lim(t->0) sin(t)/t (where t=1/x) = 1. So lim a_n = 1. ✓',
  'ch05p1_sequence_function_limit',
  'formula_recall',
  ['sequence', 'function', 'limit', 'continuous function', 'L-Hopital']
)

add(
  'What are the limit laws for sequences?',
  'Limit laws for sequences: If lim a_n = A and lim b_n = B, then (1) lim(a_n + b_n) = A + B, (2) lim(a_n - b_n) = A - B, (3) lim(a_n · b_n) = A·B, (4) lim(a_n / b_n) = A/B (if B != 0), (5) lim(c·a_n) = c·A, (6) lim(a_n^k) = A^k (for integer k, with conditions), (7) Squeeze Theorem: if a_n <= c_n <= b_n and lim a_n = lim b_n = L, then lim c_n = L. Example: |(cos n)/n| <= 1/n -> 0, so by squeeze (cos n)/n -> 0. ✓',
  'ch05p1_sequence_limit_laws',
  'formula_recall',
  ['limit laws', 'sum', 'product', 'quotient', 'squeeze theorem', 'sequence']
)

add(
  'What is the Monotonic Sequence Theorem?',
  'Monotonic Sequence Theorem: Every bounded, monotonic sequence is convergent. Monotonic means either always increasing (a_(n+1) >= a_n) or always decreasing (a_(n+1) <= a_n). Bounded means there exist m, M with m <= a_n <= M for all n. If increasing and bounded above, converges to least upper bound. If decreasing and bounded below, converges to greatest lower bound. Example: a_1 = 1, a_(n+1) = (1/2)(a_n + 2/a_n). This is bounded below by sqrt(2) and decreasing (after a_2), so converges to L = (1/2)(L + 2/L) => L^2 = 2 => L = sqrt(2). ✓',
  'ch05p1_monotonic_sequence_theorem',
  'formula_recall',
  ['monotonic', 'bounded', 'convergent', 'theorem', 'least upper bound']
)

add(
  'How do you find limits of recursively defined sequences?',
  'For a recursive sequence a_(n+1) = f(a_n) where f is continuous: if the sequence converges to L, then L = f(L). Steps: (1) Show sequence is monotonic (often by induction). (2) Show bounded. (3) By Monotonic Sequence Theorem, converges. (4) Solve L = f(L). Example: a_1 = 1, a_(n+1) = sqrt(2 + a_n). Show increasing and bounded above by 2 (induction). At limit L: L = sqrt(2 + L) => L^2 = 2 + L => L^2 - L - 2 = 0 => (L-2)(L+1) = 0 => L = 2 (positive). ✓',
  'ch05p1_recursive_sequence_limit',
  'problem_solving',
  ['recursive', 'recurrence', 'fixed point', 'monotonic', 'bounded']
)

add(
  'What are some important limits of sequences?',
  'Important sequence limits: (1) lim(n->inf) (1 + 1/n)^n = e. (2) lim(n->inf) n^(1/n) = 1. (3) lim(n->inf) x^(1/n) = 1 for x > 0. (4) lim(n->inf) x^n/n! = 0 for all x. (5) lim(n->inf) n!/n^n = 0. (6) lim(n->inf) (ln n)/n = 0. (7) lim(n->inf) (1/n^k) = 0 for k > 0. (8) lim(n->inf) (a^n) = 0 if |a| < 1, infinity if |a| > 1. Example: lim (3/n)^n. Since 3/n -> 0 < 1 for n > 3, and base -> 0, this -> 0. ✓',
  'ch05p1_important_limits',
  'formula_recall',
  ['important limits', 'e', 'factorial', 'exponential', 'logarithm', 'sequence']
)

add(
  'How do you determine if a sequence is monotonic?',
  'To check monotonicity of a_n: (1) Compute a_(n+1) - a_n. If >= 0 for all n, increasing; if <= 0, decreasing. (2) Or compute a_(n+1)/a_n. If >= 1, increasing (for positive terms); if <= 1, decreasing. (3) For a_n = f(n), check f\'(x) sign. Example: a_n = n/e^n. Ratio: a_(n+1)/a_n = ((n+1)/e^(n+1))·(e^n/n) = (n+1)/(en) = (1+1/n)/e. For n >= 1, (1+1/n) <= 2 < e, so ratio < 1, sequence decreasing. ✓',
  'ch05p1_monotonic_test',
  'problem_solving',
  ['monotonic', 'test', 'difference', 'ratio', 'derivative', 'increasing decreasing']
)

add(
  'What is the Squeeze Theorem for sequences?',
  'Squeeze Theorem for sequences: If a_n <= b_n <= c_n for all n > N (some N) and lim a_n = lim c_n = L, then lim b_n = L. Useful when b_n is hard to evaluate directly. Example: Find lim(n->inf) (n cos n)/(n^2 + 1). We have |(n cos n)/(n^2 + 1)| <= n/(n^2 + 1) <= n/n^2 = 1/n -> 0. So by squeeze, the limit is 0. ✓',
  'ch05p1_squeeze_theorem_sequences',
  'formula_recall',
  ['squeeze theorem', 'sandwich', 'bounds', 'absolute value', 'sequence limit']
)

// ============================================================
// SECTION 2 — SERIES BASICS (6 items)
// ============================================================
add(
  'What is an infinite series and what does it mean for it to converge?',
  'An infinite series is the sum of a sequence: sum(n=1 to inf) a_n = a_1 + a_2 + a_3 + .... The partial sums are s_n = a_1 + ... + a_n. The series converges if lim(n->inf) s_n = S exists (finite); the sum is S. Otherwise diverges. Example: sum(1/2^n) from n=1. s_n = (1/2)(1 - (1/2)^n)/(1 - 1/2) = 1 - (1/2)^n -> 1. Converges to 1. ✓',
  'ch05p1_series_definition',
  'formula_recall',
  ['series', 'partial sum', 'converge', 'diverge', 'infinite sum']
)

add(
  'What is the n-th Term Test for divergence?',
  'n-th Term Test: If lim(n->inf) a_n != 0 (or doesn\'t exist), then sum a_n diverges. Note: lim a_n = 0 does NOT imply convergence (e.g., harmonic series diverges). This is a one-way test for divergence only. Example: sum (n/(n+1)). lim n/(n+1) = 1 != 0, so series diverges. Example: sum n sin(1/n). lim n·sin(1/n) = 1 != 0, diverges. ✓',
  'ch05p1_nth_term_test',
  'formula_recall',
  ['nth term test', 'divergence test', 'limit', 'necessary condition', 'series']
)

add(
  'What is a geometric series and when does it converge?',
  'Geometric series: sum(n=0 to inf) ar^n = a + ar + ar^2 + .... Converges to a/(1-r) if |r| < 1; diverges if |r| >= 1. Partial sum: s_n = a(1 - r^n)/(1 - r) for r != 1. Example: sum(n=0 to inf) 3(2/5)^n = 3/(1 - 2/5) = 3/(3/5) = 5. Example: sum(n=1 to inf) (2/3)^n = (2/3)/(1 - 2/3) = 2. ✓',
  'ch05p1_geometric_series',
  'formula_recall',
  ['geometric series', 'common ratio', 'converge', 'sum formula', 'partial sum']
)

add(
  'How do you express a repeating decimal as a rational number using geometric series?',
  'Repeating decimal as fraction: write the decimal as a geometric series. Example: 0.7777... = 0.7 + 0.07 + 0.007 + ... = sum(7/10)(1/10)^(n-1) from n=1 = (7/10)/(1 - 1/10) = (7/10)/(9/10) = 7/9. Example: 0.2454545... = 0.2 + (0.045 + 0.00045 + ...) = 0.2 + 0.045/(1 - 0.01) = 0.2 + 0.045/0.99 = 1/5 + 5/110 = 22/110 + 5/110 = 27/110. ✓',
  'ch05p1_repeating_decimal',
  'problem_solving',
  ['repeating decimal', 'fraction', 'geometric series', 'rational number', 'conversion']
)

add(
  'What is a telescoping series and how do you evaluate it?',
  'Telescoping series: Most terms cancel when partial sums are written. Often arises from partial fractions. Example: sum(n=1 to inf) 1/(n(n+1)). Partial fractions: 1/(n(n+1)) = 1/n - 1/(n+1). s_N = (1 - 1/2) + (1/2 - 1/3) + ... + (1/N - 1/(N+1)) = 1 - 1/(N+1) -> 1. So sum = 1. Example: sum 1/(n(n+2)) = (1/2)sum(1/n - 1/(n+2)) -> (1/2)(1 + 1/2) = 3/4. ✓',
  'ch05p1_telescoping_series',
  'problem_solving',
  ['telescoping', 'partial fractions', 'cancel', 'partial sum', 'series']
)

add(
  'What are the properties of convergent series?',
  'Properties of convergent series: If sum a_n = A and sum b_n = B converge, then (1) sum(a_n + b_n) = A + B, (2) sum(a_n - b_n) = A - B, (3) sum(c·a_n) = c·A. (4) Adding/removing finitely many terms doesn\'t affect convergence (only the sum). (5) Multiplying/dividing every term by same nonzero constant preserves convergence. (6) Rearranging absolutely convergent series doesn\'t change the sum. Example: sum (1/2^n + 1/3^n) = 1 + (1/2) = 3/2. (Both geometric.) ✓',
  'ch05p1_series_properties',
  'formula_recall',
  ['properties', 'linearity', 'sum', 'convergent', 'series']
)

// ============================================================
// SECTION 3 — INTEGRAL TEST & p-SERIES (5 items)
// ============================================================
add(
  'What is the Integral Test for series convergence?',
  'Integral Test: If f is continuous, positive, and decreasing on [1, inf) and a_n = f(n), then sum a_n and integral_1^inf f(x) dx either both converge or both diverge. Note: convergence of one doesn\'t give the value of the other. Example: sum 1/n^2. f(x) = 1/x^2 decreasing. integral_1^inf 1/x^2 dx = [-1/x]_1^inf = 0 - (-1) = 1, converges. So sum 1/n^2 converges (to pi^2/6, but Integral Test doesn\'t give value). ✓',
  'ch05p1_integral_test',
  'formula_recall',
  ['integral test', 'continuous positive decreasing', 'convergence', 'improper integral']
)

add(
  'What is a p-series and when does it converge?',
  'p-series: sum(n=1 to inf) 1/n^p converges if p > 1, diverges if p <= 1. (p=1 is harmonic series.) Proof via Integral Test: integral_1^inf 1/x^p dx = [x^(1-p)/(1-p)]_1^inf converges iff 1-p < 0 i.e. p > 1. Example: sum 1/n^3 converges (p=3>1). sum 1/sqrt(n) = sum 1/n^(1/2) diverges (p=1/2<1). sum 1/n diverges (p=1, harmonic). ✓',
  'ch05p1_p_series',
  'formula_recall',
  ['p-series', '1/n^p', 'converge', 'harmonic', 'diverge']
)

add(
  'What is the harmonic series and why does it diverge?',
  'Harmonic series: sum(n=1 to inf) 1/n = 1 + 1/2 + 1/3 + 1/4 + .... Diverges (slowly). Proof by grouping: 1 + 1/2 + (1/3+1/4) + (1/5+1/6+1/7+1/8) + ... > 1 + 1/2 + 1/2 + 1/2 + ... diverges. Also by Integral Test: integral_1^inf 1/x dx = ln(x)|_1^inf = inf. Note lim 1/n = 0 but series still diverges (n-th term test fails to confirm convergence). Example: First 10^6 terms sum ~ 14.39 (very slow growth). ✓',
  'ch05p1_harmonic_series',
  'formula_recall',
  ['harmonic series', '1/n', 'diverge', 'integral test', 'grouping']
)

add(
  'How do you estimate the sum of a series using the Integral Test remainder?',
  'Integral Test remainder estimate: If sum a_n converges by Integral Test (s = sum, s_n = partial sum), then integral_(n+1)^inf f(x) dx <= R_n = s - s_n <= integral_n^inf f(x) dx. So s_n + integral_(n+1)^inf f <= s <= s_n + integral_n^inf f. Example: sum 1/n^2, estimate with n=10. s_10 = 1.549768. integral_11^inf 1/x^2 dx = 1/11 = 0.0909. integral_10^inf 1/x^2 dx = 1/10 = 0.1. So 1.5498 + 0.0909 <= s <= 1.5498 + 0.1, i.e., 1.6407 <= s <= 1.6498. (Actual = pi^2/6 = 1.6449.) ✓',
  'ch05p1_integral_test_remainder',
  'problem_solving',
  ['remainder', 'estimate', 'integral test', 'bounds', 'partial sum']
)

add(
  'How do you determine convergence of series with logarithms or roots using the Integral Test?',
  'For series with logs or roots, the Integral Test often works. Example: sum 1/(n ln n). f(x) = 1/(x ln x) positive decreasing. integral_2^inf dx/(x ln x) = [ln(ln x)]_2^inf = inf. Diverges. Example: sum 1/(n (ln n)^2). integral = [-1/ln x]_2^inf = 0 + 1/ln 2 = finite. Converges. General: sum 1/(n (ln n)^p) converges iff p > 1. ✓',
  'ch05p1_logarithmic_series_test',
  'problem_solving',
  ['logarithm', 'integral test', '1/(n ln n)', 'convergence', 'roots']
)

// ============================================================
// SECTION 4 — COMPARISON TESTS (5 items)
// ============================================================
add(
  'What is the Direct Comparison Test?',
  'Direct Comparison Test: Suppose 0 <= a_n <= b_n for all n >= N. (1) If sum b_n converges, then sum a_n converges. (2) If sum a_n diverges, then sum b_n diverges. Need to find a known series to compare to (often p-series or geometric). Example: sum 1/(n^2 + n). Compare to 1/n^2: 1/(n^2+n) < 1/n^2. sum 1/n^2 converges (p=2), so sum 1/(n^2+n) converges. Example: sum 1/(n + sqrt(n)) > sum 1/(2n) = (1/2)·(harmonic), diverges. ✓',
  'ch05p1_comparison_test',
  'formula_recall',
  ['direct comparison', 'test', 'converge', 'diverge', 'inequality', 'series']
)

add(
  'What is the Limit Comparison Test?',
  'Limit Comparison Test: If a_n > 0, b_n > 0, and lim(n->inf) a_n/b_n = c where 0 < c < inf (finite positive), then sum a_n and sum b_n either both converge or both diverge. If c = 0 and sum b_n converges, then sum a_n converges. If c = inf and sum b_n diverges, then sum a_n diverges. Choose b_n by looking at dominant term. Example: sum 1/(2n^2 - 1). Compare to b_n = 1/n^2. lim a_n/b_n = lim n^2/(2n^2 - 1) = 1/2. Since sum 1/n^2 converges, sum 1/(2n^2-1) converges. ✓',
  'ch05p1_limit_comparison_test',
  'formula_recall',
  ['limit comparison', 'test', 'ratio limit', 'dominant term', 'series']
)

add(
  'How do you choose an appropriate comparison series?',
  'Choosing comparison series: Look at dominant behavior as n -> inf. (1) Polynomials: leading term. (2) Polynomial / polynomial: ratio of leading terms. (3) Logs: grow slower than any positive power. (4) Exponentials grow faster than polynomials. Example: a_n = (3n^2 + n)/(n^4 - n + 2) ~ 3n^2/n^4 = 3/n^2. Compare to 1/n^2. Example: a_n = n/(n^2 + 1) ~ 1/n. Compare to 1/n (harmonic). Example: a_n = 1/(sqrt(n)·ln n) ~ ? sqrt(n) dominates ln(n) but both -> inf. Compare to 1/n^p: 1/(sqrt(n)·ln n) > 1/n^(1/2 + epsilon) for large n, so compare to 1/sqrt(n) (diverges). ✓',
  'ch05p1_choosing_comparison',
  'problem_solving',
  ['choose', 'comparison', 'dominant term', 'asymptotic', 'series']
)

add(
  'How do you estimate sums using the Comparison Test?',
  'Comparison remainder estimate: If a_n <= b_n and sum b_n converges, then sum a_n converges with R_n <= T_n (tail of b_n). For p-series comparison: if 0 < a_n < C/n^p (p > 1), then R_n = sum_(k=n+1)^inf a_k <= C·sum_(k=n+1)^inf 1/k^p <= C·integral_n^inf dx/x^p = C/(p-1)·n^(1-p). Example: a_n = 1/(n^3 + 1) < 1/n^3. Tail after 10 terms <= integral_10^inf dx/x^3 = 1/(2·100) = 0.005. ✓',
  'ch05p1_comparison_remainder',
  'problem_solving',
  ['estimate', 'remainder', 'comparison', 'bound', 'tail', 'p-series']
)

add(
  'How do you handle series with factorials and exponentials in comparison tests?',
  'For series with n! or a^n, compare to geometric series or use Ratio Test. But for comparison: n! grows faster than any exponential, so n!/n^n -> 0 (can compare to geometric with r < 1). Example: sum n!/(2·4·6·...·2n) = sum n!/(2^n · n!). Hmm, simplifies. Better: sum n^2/2^n. Compare to (1/2)^n: lim (n^2/2^n)/(1/2^n) = n^2 -> inf, so direct comparison fails. But n^2/2^n <= n^2/2^n -> use ratio test instead. Or note 2^n grows faster than n^2: eventually n^2/2^n < 1/n^2 (since 2^n/n^4 -> inf). So compare to 1/n^2, converges. ✓',
  'ch05p1_factorial_exponential_comparison',
  'problem_solving',
  ['factorial', 'exponential', 'comparison', 'growth rate', 'series']
)

// ============================================================
// SECTION 5 — ALTERNATING SERIES & ABSOLUTE CONVERGENCE (6 items)
// ============================================================
add(
  'What is an alternating series?',
  'An alternating series has terms that alternate in sign: sum(-1)^(n-1) b_n = b_1 - b_2 + b_3 - b_4 + ... with b_n > 0. Example: 1 - 1/2 + 1/3 - 1/4 + ... = sum(-1)^(n-1)/n = ln 2 (alternating harmonic). Example: 1 - 1/3 + 1/5 - 1/7 + ... = pi/4 (Leibniz). The sign pattern can also be (-1)^n starting with negative. ✓',
  'ch05p1_alternating_series',
  'formula_recall',
  ['alternating', 'sign change', 'series', '(-1)^n', 'definition']
)

add(
  'What is the Alternating Series Test (Leibniz Test)?',
  'Alternating Series Test: sum(-1)^(n-1) b_n (b_n > 0) converges if (1) b_(n+1) <= b_n for all n > N (eventually decreasing), AND (2) lim(n->inf) b_n = 0. Example: sum(-1)^(n-1)/n: 1/n is decreasing, lim 1/n = 0. Converges (to ln 2). Example: sum(-1)^n · n/(n+1): lim n/(n+1) = 1 != 0. AST fails, and by n-th term test, diverges. ✓',
  'ch05p1_alternating_series_test',
  'formula_recall',
  ['alternating series test', 'Leibniz', 'decreasing', 'limit zero', 'converge']
)

add(
  'How do you estimate the sum of an alternating series?',
  'Alternating Series Estimation Theorem: If s = sum(-1)^(n-1) b_n converges by AST (b_n decreasing to 0), then |R_n| = |s - s_n| <= b_(n+1). The error in using s_n as approximation is at most the first omitted term. Sign of R_n matches first omitted term. Example: sum(-1)^(n-1)/n = ln 2. How many terms for error < 0.001? Need b_(n+1) < 0.001, i.e., 1/(n+1) < 0.001, n > 999. So n = 1000 terms. ✓',
  'ch05p1_alternating_estimation',
  'problem_solving',
  ['estimate', 'alternating', 'error', 'remainder', 'first omitted term']
)

add(
  'What is the difference between absolute and conditional convergence?',
  'Absolute convergence: sum a_n converges absolutely if sum |a_n| converges. Conditional convergence: sum a_n converges but sum |a_n| diverges. Theorem: Absolute convergence implies convergence (but not vice versa). Example: sum(-1)^(n-1)/n^2 converges absolutely (sum 1/n^2 converges). sum(-1)^(n-1)/n converges conditionally (sum 1/n diverges but alternating converges). Absolutely convergent series can be rearranged without changing the sum; conditionally convergent can be rearranged to give any value (Riemann rearrangement theorem). ✓',
  'ch05p1_absolute_conditional',
  'formula_recall',
  ['absolute convergence', 'conditional convergence', 'rearrangement', 'Riemann', 'series']
)

add(
  'What is the Rearrangement Theorem for absolutely convergent series?',
  'Rearrangement Theorem: If sum a_n converges absolutely (sum |a_n| < inf), then any rearrangement sum a_(sigma(n)) converges to the same sum. For conditionally convergent series, Riemann Rearrangement Theorem: any real number can be obtained as the sum of some rearrangement (or +inf or -inf). Example: Alternating harmonic 1 - 1/2 + 1/3 - 1/4 + ... = ln 2. Rearranged as 1 + 1/3 - 1/2 + 1/5 + 1/7 - 1/4 + ... (two positives, one negative) converges to (3/2) ln 2. ✓',
  'ch05p1_rearrangement_theorem',
  'formula_recall',
  ['rearrangement', 'Riemann', 'absolutely convergent', 'conditionally convergent', 'series']
)

add(
  'How do you test for absolute convergence?',
  'To test absolute convergence: examine sum |a_n|. Apply Ratio/Root/Comparison/Integral Test to |a_n|. If sum |a_n| converges, original converges absolutely. If sum |a_n| diverges, original might still converge conditionally (check AST). Example: sum(-1)^n · n/(n^2 + 1). |a_n| = n/(n^2 + 1) ~ 1/n. sum 1/n diverges, so not absolute. Check AST: n/(n^2+1) decreasing for n >= 1 (derivative of x/(x^2+1) is (1-x^2)/(x^2+1)^2 < 0 for x > 1), lim = 0. So converges conditionally. ✓',
  'ch05p1_absolute_convergence_test',
  'problem_solving',
  ['absolute convergence', 'test', 'conditional', 'AST', 'series']
)

// ============================================================
// SECTION 6 — RATIO & ROOT TESTS (5 items)
// ============================================================
add(
  'What is the Ratio Test?',
  'Ratio Test: For sum a_n, compute L = lim(n->inf) |a_(n+1)/a_n|. (1) If L < 1, converges absolutely. (2) If L > 1 (or inf), diverges. (3) If L = 1, test inconclusive. Best for series with factorials, exponentials, or n-th powers. Example: sum n!/10^n. |a_(n+1)/a_n| = (n+1)!·10^n/(n!·10^(n+1)) = (n+1)/10 -> inf. Diverges. Example: sum n^2/2^n. Ratio = ((n+1)^2/2^(n+1))·(2^n/n^2) = ((n+1)/n)^2·(1/2) -> 1/2 < 1. Converges. ✓',
  'ch05p1_ratio_test',
  'formula_recall',
  ['ratio test', 'limit', 'a_(n+1)/a_n', 'converge', 'diverge', 'inconclusive']
)

add(
  'What is the Root Test?',
  'Root Test: For sum a_n, compute L = lim(n->inf) |a_n|^(1/n). (1) If L < 1, converges absolutely. (2) If L > 1 (or inf), diverges. (3) If L = 1, inconclusive. Often useful when terms have n-th powers. Example: sum (n/(2n+1))^n. |a_n|^(1/n) = n/(2n+1) -> 1/2 < 1. Converges. Example: sum (1 - 1/n)^n^2. (1 - 1/n)^(n^2/n) = (1 - 1/n)^n -> 1/e < 1. Converges. ✓',
  'ch05p1_root_test',
  'formula_recall',
  ['root test', 'n-th root', 'limit', 'converge', 'diverge']
)

add(
  'When should you use the Ratio Test vs Root Test?',
  'Ratio Test: better for factorials (n!, (2n)!) and terms like a^n·n^k. Root Test: better when terms are raised to n-th power like (something)^n. Both fail (L=1) for p-series and similar. Example: sum n!/(3^n): ratio = (n+1)/3 -> inf, diverges (Ratio Test). Example: sum (n^2 + 1)^(2n)/(3n+1)^n: messy ratio but root = (n^2+1)^2/(3n+1) -> inf, diverges (Root Test). For polynomial/rational terms, use Comparison or Limit Comparison instead. ✓',
  'ch05p1_ratio_vs_root',
  'problem_solving',
  ['ratio test', 'root test', 'when to use', 'factorial', 'nth power']
)

add(
  'How do you handle series with factorials in the Ratio Test?',
  'Factorials simplify nicely in ratios because (n+1)!/n! = n+1. Example: sum n!/(n^n). ratio = (n+1)!·n^n/(n!·(n+1)^(n+1)) = (n+1)·n^n/(n+1)^(n+1) = n^n/(n+1)^n = (n/(n+1))^n = (1 - 1/(n+1))^n -> 1/e < 1. Converges. Example: sum (2n)!/(n!·n!). ratio = (2n+2)!·n!·n!/((2n)!·(n+1)!·(n+1)!) = (2n+2)(2n+1)/(n+1)^2 -> 4. Diverges (L=4>1). ✓',
  'ch05p1_factorial_ratio_test',
  'problem_solving',
  ['factorial', 'ratio test', 'n!', 'simplify', 'series']
)

add(
  'How do you test series with mixed terms (powers and factorials)?',
  'For sum a_n · b_n where a_n is polynomial and b_n is factorial/exponential, Ratio Test is most reliable. Example: sum n^3 · 2^n / n!. ratio = ((n+1)^3 · 2^(n+1) / (n+1)!)·(n!/(n^3·2^n)) = 2·((n+1)/n)^3·(1/(n+1)) = 2(n+1)^2/n^3 -> 0 < 1. Converges. Example: sum (-1)^n · 3^n/n!. |ratio| = 3/(n+1) -> 0. Converges absolutely. ✓',
  'ch05p1_mixed_terms_ratio',
  'problem_solving',
  ['mixed', 'power', 'factorial', 'ratio test', 'series convergence']
)

// ============================================================
// SECTION 7 — STRATEGY FOR TESTING SERIES (3 items)
// ============================================================
add(
  'What is a strategy for choosing which convergence test to use?',
  'Strategy for series convergence tests: (1) Check lim a_n: if != 0, diverges (n-th term test). (2) If a_n is geometric (r^n), use |r|<1 test. (3) If a_n looks like p-series (1/n^p), use p-test. (4) If a_n has factorials or n-th powers, try Ratio Test. (5) If only n-th power, try Root Test. (6) Rational functions of n: Limit Comparison with p-series. (7) Has 1/x, ln x, etc.: Integral Test. (8) Alternating: Alternating Series Test. (9) Default: check absolute convergence. Example: sum n!/(n^n) -> Ratio Test -> (1/e) < 1 -> converges. ✓',
  'ch05p1_strategy',
  'problem_solving',
  ['strategy', 'choosing test', 'checklist', 'convergence', 'series']
)

add(
  'What is a summary table of all convergence tests?',
  'Convergence test summary: (1) n-th Term Test: lim a_n != 0 => diverges. (2) Geometric: |r|<1 converges. (3) p-series: p>1 converges. (4) Integral Test: positive, decreasing, continuous. (5) Direct Comparison: 0 < a_n < b_n. (6) Limit Comparison: lim a_n/b_n = c in (0, inf). (7) Alternating Series Test: decreasing to 0. (8) Ratio Test: lim |a_(n+1)/a_n|. (9) Root Test: lim |a_n|^(1/n). (10) Absolute convergence implies convergence. ✓',
  'ch05p1_test_summary',
  'formula_recall',
  ['summary', 'table', 'all tests', 'convergence', 'reference']
)

add(
  'How do you classify a series as absolutely convergent, conditionally convergent, or divergent?',
  'Classification procedure: (1) First test sum |a_n| for absolute convergence using Ratio/Root/Comparison/etc. (2) If sum |a_n| converges => absolutely convergent (and hence convergent). (3) If sum |a_n| diverges, test sum a_n for conditional convergence (try AST if alternating). (4) If sum a_n diverges => divergent. Example: sum(-1)^n/n. |a_n| = 1/n, harmonic, diverges. Not absolute. AST: 1/n decreasing to 0, converges. Conditionally convergent. Example: sum(-1)^n/n^2. |a_n| = 1/n^2 converges. Absolutely convergent. ✓',
  'ch05p1_classification',
  'problem_solving',
  ['classify', 'absolute', 'conditional', 'divergent', 'procedure']
)

// ============================================================
// SECTION 8 — POWER SERIES (6 items)
// ============================================================
add(
  'What is a power series?',
  'A power series about x = a is sum(n=0 to inf) c_n (x - a)^n = c_0 + c_1(x-a) + c_2(x-a)^2 + .... It always converges at x = a (to c_0). For other x, the series may converge or diverge. The set of x where it converges is the interval of convergence. The radius of convergence R is such that the series converges for |x - a| < R and diverges for |x - a| > R. R could be 0 (converges only at center), positive finite, or infinity (converges everywhere). Example: sum x^n has R = 1, interval (-1, 1). ✓',
  'ch05p1_power_series',
  'formula_recall',
  ['power series', 'center', 'radius', 'interval of convergence', 'coefficients']
)

add(
  'How do you find the radius and interval of convergence of a power series?',
  'To find radius/interval of convergence: Use Ratio or Root Test on the power series. Solve |x - a| < R for R. Then check endpoints x = a ± R individually (substitute and test). Example: sum x^n/n. Ratio: |x^(n+1)/(n+1)|·|n/x^n| = |x|·n/(n+1) -> |x|. Converges if |x| < 1, diverges if |x| > 1. R = 1. Endpoints: x=1: sum 1/n diverges (harmonic). x=-1: sum(-1)^n/n converges (AST). Interval: [-1, 1). ✓',
  'ch05p1_radius_interval',
  'problem_solving',
  ['radius', 'interval', 'convergence', 'ratio test', 'endpoints', 'power series']
)

add(
  'How do you find the radius of convergence using the Ratio Test formula?',
  'Ratio Test for power series sum c_n (x-a)^n: R = 1 / lim(n->inf) |c_(n+1)/c_n| (if limit exists and is nonzero). If limit = 0, R = inf. If limit = inf, R = 0. Example: sum n! x^n. |c_(n+1)/c_n| = (n+1)!/n! = n+1 -> inf. R = 0, converges only at x = 0. Example: sum x^n/n!. |c_(n+1)/c_n| = n!/(n+1)! = 1/(n+1) -> 0. R = inf, converges for all x. ✓',
  'ch05p1_radius_formula',
  'formula_recall',
  ['radius', 'formula', 'ratio test', 'coefficients', 'power series']
)

add(
  'How do you find the radius of convergence using the Root Test?',
  'Root Test for power series: R = 1 / lim(n->inf) |c_n|^(1/n) (if limit exists and is nonzero). Useful when c_n has n-th powers or when ratio is awkward. Example: sum (n/2)^n x^n. c_n = (n/2)^n. |c_n|^(1/n) = n/2 -> inf. R = 0. Example: sum c_n x^n where c_n = 1 if n even, 1/n if n odd. Ratio test gives limsup |c_(n+1)/c_n| doesn\'t exist cleanly. Use Root: limsup |c_n|^(1/n) = 1 (both subsequences have root -> 1). R = 1. ✓',
  'ch05p1_radius_root',
  'formula_recall',
  ['radius', 'root test', 'limsup', 'coefficients', 'power series']
)

add(
  'What are the operations on power series?',
  'Operations on power series (within radius of convergence): (1) Addition: sum(a_n + b_n)x^n = sum a_n x^n + sum b_n x^n. (2) Scalar multiplication: c·sum a_n x^n = sum (c·a_n) x^n. (3) Multiplication (Cauchy product): (sum a_n x^n)(sum b_n x^n) = sum c_n x^n where c_n = sum(k=0 to n) a_k b_(n-k). (4) Differentiation: d/dx sum c_n x^n = sum n c_n x^(n-1), same radius. (5) Integration: integral sum c_n x^n dx = sum c_n x^(n+1)/(n+1), same radius. ✓',
  'ch05p1_power_series_operations',
  'formula_recall',
  ['operations', 'addition', 'multiplication', 'Cauchy product', 'differentiation', 'integration']
)

add(
  'How do you represent a function as a power series?',
  'To represent f(x) as a power series, often use geometric series 1/(1-x) = sum x^n for |x| < 1, then substitute, differentiate, or integrate. Example: f(x) = 1/(1+x) = 1/(1-(-x)) = sum(-x)^n = sum(-1)^n x^n for |x| < 1. Example: f(x) = x/(1-x^2) = x·sum(x^2)^n = sum x^(2n+1) for |x| < 1. Example: f(x) = ln(1+x) = integral_0^x 1/(1+t) dt = integral sum(-1)^n t^n dt = sum(-1)^n x^(n+1)/(n+1) for |x| < 1 (also converges at x=1). ✓',
  'ch05p1_function_as_power_series',
  'problem_solving',
  ['represent function', 'power series', 'geometric', 'substitution', 'integrate differentiate']
)

// ============================================================
// SECTION 9 — TAYLOR & MACLAURIN SERIES (8 items)
// ============================================================
add(
  'What is a Taylor series and a Maclaurin series?',
  'Taylor series of f about x = a: sum(n=0 to inf) f^(n)(a)/n! · (x - a)^n. Maclaurin series is Taylor series about a = 0: sum f^(n)(0)/n! · x^n. If f equals its Taylor series on an interval, we say f is analytic there. Example: f(x) = e^x. f^(n)(x) = e^x, f^(n)(0) = 1. Maclaurin: sum x^n/n! = 1 + x + x^2/2 + x^3/6 + .... Converges for all x (R = inf). ✓',
  'ch05p1_taylor_maclaurin_definition',
  'formula_recall',
  ['Taylor series', 'Maclaurin', 'expansion', 'center', 'derivatives', 'factorial']
)

add(
  'What is the formula for the coefficients of a Taylor series?',
  'Taylor coefficients: c_n = f^(n)(a)/n!, where f^(n) is the n-th derivative evaluated at a. So c_0 = f(a), c_1 = f\'(a), c_2 = f\'\'(a)/2!, c_3 = f\'\'\'(a)/3!, etc. Example: Find first 4 terms of Taylor series of f(x) = sqrt(x) about x = 1. f(1)=1, f\'(x)=1/(2sqrt(x)), f\'(1)=1/2, f\'\'(x)=-1/(4x^(3/2)), f\'\'(1)=-1/4, f\'\'\'(x)=3/(8x^(5/2)), f\'\'\'(1)=3/8. Series: 1 + (1/2)(x-1) + (-1/4)/2!·(x-1)^2 + (3/8)/3!·(x-1)^3 = 1 + (x-1)/2 - (x-1)^2/8 + (x-1)^3/16. ✓',
  'ch05p1_taylor_coefficients',
  'formula_recall',
  ['coefficients', 'derivatives', 'factorial', 'Taylor', 'formula']
)

add(
  'What is Taylor\'s Inequality for the remainder?',
  'Taylor\'s Inequality: If |f^(n+1)(x)| <= M for |x - a| <= d, then the remainder R_n(x) = f(x) - T_n(x) of the n-th degree Taylor polynomial satisfies |R_n(x)| <= M/(n+1)! · |x - a|^(n+1) for |x - a| <= d. This bounds the error of Taylor polynomial approximation. Example: e^x about 0, use T_n to approximate e. |f^(n+1)(x)| = e^x <= e^1 = e for x in [0,1]. |R_n(1)| <= e/(n+1)!. For n=6: |R_6(1)| <= e/7! = e/5040 ~ 0.00054. ✓',
  'ch05p1_taylor_inequality',
  'formula_recall',
  ['Taylor inequality', 'remainder', 'error bound', 'M', 'approximation']
)

add(
  'How do you find the Taylor series of a function by differentiation?',
  'Direct method: compute f^(n)(a) for all n and substitute into Taylor formula. Works when derivatives follow a pattern. Example: f(x) = sin x about 0. f\'=cos, f\'\'=-sin, f\'\'\'=-cos, f^(4)=sin, cycle of 4. At 0: f(0)=0, f\'(0)=1, f\'\'(0)=0, f\'\'\'(0)=-1, f^(4)(0)=0, ... Pattern: nonzero at odd n, alternating 1, -1. sin x = x - x^3/3! + x^5/5! - x^7/7! + .... ✓',
  'ch05p1_taylor_differentiation',
  'problem_solving',
  ['Taylor series', 'differentiation', 'direct', 'derivatives', 'pattern']
)

add(
  'How do you find a Taylor series using substitution from a known series?',
  'Substitution method: start from a known series and substitute. Example: Find Maclaurin of e^(-x^2). Start with e^u = sum u^n/n!. Substitute u = -x^2: e^(-x^2) = sum (-x^2)^n/n! = sum(-1)^n x^(2n)/n! = 1 - x^2 + x^4/2 - x^6/6 + .... Example: sin(x^2) = substitute u = x^2 in sin u = sum(-1)^n u^(2n+1)/(2n+1)!: sin(x^2) = sum(-1)^n x^(4n+2)/(2n+1)!. ✓',
  'ch05p1_taylor_substitution',
  'problem_solving',
  ['Taylor series', 'substitution', 'known series', 'composition', 'Maclaurin']
)

add(
  'How do you find a Taylor series using multiplication of series?',
  'Multiplication: multiply two known power series term-by-term (Cauchy product). Example: Find first few terms of x e^x sin x. e^x = 1 + x + x^2/2 + x^3/6 + ..., sin x = x - x^3/6 + .... Product e^x·sin x: coefficient of x^0: 0; x^1: 1·1 = 1; x^2: 1·0 + 1·1 = 1; x^3: 1·0 + 1·0 + (1/2)·1 + 1·(-1/6) = 1/2 - 1/6 = 1/3. So e^x·sin x = x + x^2 + x^3/3 + .... Multiply by x: x e^x sin x = x^2 + x^3 + x^4/3 + .... ✓',
  'ch05p1_taylor_multiplication',
  'problem_solving',
  ['Taylor series', 'multiplication', 'Cauchy product', 'term by term', 'series']
)

add(
  'How do you use Taylor series to evaluate limits?',
  'Using Taylor series for limits: substitute Taylor expansions to remove indeterminate forms. Example: lim(x->0) (e^x - 1 - x)/x^2. Using e^x = 1 + x + x^2/2 + .... Numerator: (1 + x + x^2/2 + ...) - 1 - x = x^2/2 + .... So lim = (x^2/2)/x^2 = 1/2. Example: lim(x->0) (sin x - x)/x^3. sin x = x - x^3/6 + .... sin x - x = -x^3/6 + .... lim = -1/6. (Compare with L-Hopital: 3 applications needed.) ✓',
  'ch05p1_taylor_limits',
  'problem_solving',
  ['Taylor series', 'limits', 'indeterminate', 'L-Hopital alternative', 'series']
)

add(
  'How do you use Taylor series to approximate values of functions?',
  'Taylor approximation: use partial sums T_n(x) of Taylor series. Example: Approximate sqrt(1.1). sqrt(1+x) about 0: 1 + x/2 - x^2/8 + x^3/16 - .... With x = 0.1: T_3(0.1) = 1 + 0.05 - 0.00125 + 0.0000625 = 1.0488125. Actual sqrt(1.1) = 1.0488088... Error < 0.00001. Example: Approximate e^0.1. e^x = 1 + x + x^2/2 + x^3/6. T_3(0.1) = 1 + 0.1 + 0.005 + 0.000167 = 1.105167. Actual e^0.1 = 1.105171. ✓',
  'ch05p1_taylor_approximation',
  'problem_solving',
  ['Taylor polynomial', 'approximation', 'partial sum', 'numerical', 'error']
)

// ============================================================
// SECTION 10 — COMMON MACLAURIN SERIES (6 items)
// ============================================================
add(
  'What is the Maclaurin series for e^x?',
  'e^x = sum(n=0 to inf) x^n/n! = 1 + x + x^2/2! + x^3/3! + x^4/4! + .... Converges for all x (R = inf). Derivation: f(x) = e^x, all derivatives = e^x, evaluated at 0 give 1. Coefficients c_n = 1/n!. Useful for approximating e: e = 1 + 1 + 1/2 + 1/6 + 1/24 + 1/120 + ... ~ 2.71828. Example: e^0.5 = 1 + 0.5 + 0.125 + 0.0208 + 0.0026 + ... ~ 1.6487. ✓',
  'ch05p1_maclaurin_exp',
  'formula_recall',
  ['Maclaurin', 'e^x', 'exponential', 'series', 'all x']
)

add(
  'What are the Maclaurin series for sin x and cos x?',
  'sin x = sum(n=0 to inf) (-1)^n x^(2n+1)/(2n+1)! = x - x^3/3! + x^5/5! - x^7/7! + .... Converges for all x. cos x = sum(n=0 to inf) (-1)^n x^(2n)/(2n)! = 1 - x^2/2! + x^4/4! - x^6/6! + .... Converges for all x. Derivation: derivatives of sin cycle through sin, cos, -sin, -cos; evaluated at 0: 0, 1, 0, -1. Even terms vanish in sin, odd terms vanish in cos. Euler\'s identity e^(ix) = cos x + i sin x follows from these series. ✓',
  'ch05p1_maclaurin_sin_cos',
  'formula_recall',
  ['Maclaurin', 'sin x', 'cos x', 'trigonometric', 'series', 'all x']
)

add(
  'What are the Maclaurin series for ln(1+x) and arctan x?',
  'ln(1+x) = sum(n=1 to inf) (-1)^(n-1) x^n/n = x - x^2/2 + x^3/3 - x^4/4 + .... Converges for -1 < x <= 1 (endpoint x=1 gives alternating harmonic = ln 2; x=-1 diverges). arctan x = sum(n=0 to inf) (-1)^n x^(2n+1)/(2n+1) = x - x^3/3 + x^5/5 - x^7/7 + .... Converges for |x| <= 1. At x=1: pi/4 = 1 - 1/3 + 1/5 - 1/7 + .... Derivation: integrate 1/(1+x) = sum(-1)^n x^n for ln; integrate 1/(1+x^2) = sum(-1)^n x^(2n) for arctan. ✓',
  'ch05p1_maclaurin_ln_arctan',
  'formula_recall',
  ['Maclaurin', 'ln(1+x)', 'arctan x', 'logarithm', 'inverse trig', 'series']
)

add(
  'What is the binomial series?',
  'Binomial series: (1 + x)^k = sum(n=0 to inf) (k choose n) x^n = 1 + kx + k(k-1)/2! x^2 + k(k-1)(k-2)/3! x^3 + .... Converges for |x| < 1 (also at endpoints depending on k). Here (k choose n) = k(k-1)...(k-n+1)/n! generalized binomial coefficient. Works for any real k. Example: (1+x)^(1/2) = 1 + (1/2)x + (1/2)(-1/2)/2! x^2 + ... = 1 + x/2 - x^2/8 + x^3/16 - .... Example: (1-x)^(-1) = 1 + x + x^2 + ... (geometric). ✓',
  'ch05p1_binomial_series',
  'formula_recall',
  ['binomial series', '(1+x)^k', 'generalized binomial', 'Newton', 'power series']
)

add(
  'What are the Maclaurin series for hyperbolic functions?',
  'Hyperbolic Maclaurin series: sinh x = sum(n=0 to inf) x^(2n+1)/(2n+1)! = x + x^3/3! + x^5/5! + .... Converges for all x. cosh x = sum(n=0 to inf) x^(2n)/(2n)! = 1 + x^2/2! + x^4/4! + .... Converges for all x. Derived from e^x = cosh x + sinh x (and e^(-x) = cosh x - sinh x). Note: sinh x has same series as sin x but with all positive terms; cosh x same as cos x but positive. Example: sinh(0.1) = 0.1 + 0.001/6 + ... = 0.100167. ✓',
  'ch05p1_maclaurin_hyperbolic',
  'formula_recall',
  ['Maclaurin', 'sinh x', 'cosh x', 'hyperbolic', 'series']
)

add(
  'How do you derive a Maclaurin series using integration of a known series?',
  'Integration method: integrate a known power series term-by-term. Example: arcsin x. d/dx arcsin x = 1/sqrt(1-x^2) = (1-x^2)^(-1/2). Binomial series: 1 + (1/2)x^2 + (1·3)/(2·4)x^4 + (1·3·5)/(2·4·6)x^6 + .... Integrate: arcsin x = x + (1/2)x^3/3 + (3/8)x^5/5 + (5/16)x^7/7 + .... Or in closed form: arcsin x = sum(n=0 to inf) (2n choose n) x^(2n+1)/(4^n(2n+1)) for |x| < 1. ✓',
  'ch05p1_series_by_integration',
  'problem_solving',
  ['Maclaurin', 'integration', 'term by term', 'arcsin', 'derive']
)

// ============================================================
// SECTION 11 — APPLICATIONS OF TAYLOR SERIES (5 items)
// ============================================================
add(
  'How do you use Taylor series to evaluate indefinite integrals that have no elementary antiderivative?',
  'Taylor series for non-elementary integrals: expand integrand, integrate term-by-term. Example: integral e^(-x^2) dx (no elementary antiderivative). e^(-x^2) = sum(-1)^n x^(2n)/n!. Integrate: integral e^(-x^2) dx = sum(-1)^n x^(2n+1)/((2n+1)·n!) + C = x - x^3/3 + x^5/10 - x^7/42 + .... Similarly: integral sin(x^2) dx = sum(-1)^n x^(4n+3)/((4n+3)(2n+1)!) (Fresnel integral). ✓',
  'ch05p1_taylor_integrals',
  'problem_solving',
  ['Taylor series', 'integral', 'non-elementary', 'e^(-x^2)', 'Fresnel']
)

add(
  'How do you use Taylor series to approximate definite integrals?',
  'Approximate definite integrals using Taylor series: expand integrand, integrate term-by-term to desired accuracy. Example: integral_0^1 e^(-x^2) dx. e^(-x^2) = 1 - x^2 + x^4/2 - x^6/6 + .... Integrate [0,1]: 1 - 1/3 + 1/10 - 1/42 + 1/216 - .... Partial sums: 1; 0.6667; 0.7667; 0.7429; 0.7475. Converges to ~0.7468 (Erf-related). Faster than Simpson\'s rule for high precision. ✓',
  'ch05p1_taylor_definite_integrals',
  'problem_solving',
  ['Taylor series', 'definite integral', 'approximation', 'erf', 'numerical']
)

add(
  'How do you use Taylor series to evaluate limits involving indeterminate forms?',
  'Taylor series for limits: replace functions with their Taylor expansions to evaluate limits that L-Hopital would handle but messily. Example: lim(x->0) (cos x - 1 + x^2/2)/x^4. cos x = 1 - x^2/2 + x^4/24 - .... Numerator: (1 - x^2/2 + x^4/24 - ...) - 1 + x^2/2 = x^4/24 - .... lim = (x^4/24)/x^4 = 1/24. Example: lim(x->0) (tan x - x)/x^3. tan x = x + x^3/3 + .... tan x - x = x^3/3 + .... lim = 1/3. ✓',
  'ch05p1_taylor_indeterminate',
  'problem_solving',
  ['Taylor series', 'limits', 'indeterminate', '0/0', 'L-Hopital alternative']
)

add(
  'How do you use Taylor series in physics (small angle approximations)?',
  'Small angle approximations from Taylor: For small |x|, sin x ~ x - x^3/6 ~ x. cos x ~ 1 - x^2/2. tan x ~ x. e^x ~ 1 + x. ln(1+x) ~ x. Used in pendulum: T = 2pi·sqrt(L/g)·(1 + theta_0^2/16 + ...) where higher order terms correct for non-small-angle. Pendulum equation theta\'\' + (g/L)sin theta = 0; for small theta, sin theta ~ theta giving SHM. Refine: sin theta ~ theta - theta^3/6 gives Duffing-like correction. ✓',
  'ch05p1_taylor_physics',
  'problem_solving',
  ['Taylor series', 'physics', 'small angle', 'pendulum', 'approximation']
)

add(
  'How do you determine if a Taylor series equals its function?',
  'For a function to equal its Taylor series on an interval, the remainder must go to 0: lim(n->inf) R_n(x) = 0 for each x in the interval. Use Taylor\'s Inequality to verify. Example: e^x = sum x^n/n! for all x. |R_n(x)| <= e^|x|/(n+1)! · |x|^(n+1) -> 0 as n -> inf (factorial dominates). So e^x equals its Maclaurin series everywhere. Similar for sin x, cos x. Counter-example: f(x) = e^(-1/x^2) for x != 0, f(0) = 0. All derivatives at 0 are 0, so Taylor series is 0, but f(x) != 0 for x != 0. (Not analytic at 0.) ✓',
  'ch05p1_taylor_equals_function',
  'problem_solving',
  ['Taylor series', 'remainder', 'analytic', 'e^(-1/x^2)', 'convergence']
)

// ============================================================
// SECTION 12 — PARAMETRIC EQUATIONS (6 items)
// ============================================================
add(
  'What are parametric equations?',
  'Parametric equations express x and y as functions of a parameter t: x = f(t), y = g(t), t in [a, b]. As t varies, the point (x(t), y(t)) traces a curve. Useful for motion, curves that aren\'t functions of x (e.g., circles), and physics (t = time). Example: x = cos t, y = sin t, t in [0, 2pi] traces unit circle. Eliminating t: x^2 + y^2 = 1. Example: x = t^2, y = t^3, t in [-2, 2] traces y^2 = x^3 (semi-cubical parabola). ✓',
  'ch05p1_parametric_definition',
  'formula_recall',
  ['parametric', 'parameter', 'curve', 'eliminate parameter', 'motion']
)

add(
  'How do you eliminate the parameter to find a Cartesian equation?',
  'To eliminate parameter t: solve one equation for t and substitute into the other, or use trig identity. Example: x = 2t + 1, y = t - 3. From x: t = (x-1)/2. Sub: y = (x-1)/2 - 3 = (x-7)/2. So y = (x-7)/2 (line). Example: x = 3 cos t, y = 3 sin t. Use cos^2 + sin^2 = 1: (x/3)^2 + (y/3)^2 = 1, i.e., x^2 + y^2 = 9 (circle radius 3). Example: x = t, y = t^2 - 1: y = x^2 - 1 (parabola). ✓',
  'ch05p1_eliminate_parameter',
  'problem_solving',
  ['eliminate parameter', 'Cartesian', 'solve substitute', 'trig identity', 'parametric']
)

add(
  'How do you find the derivative dy/dx for a parametric curve?',
  'Derivative for parametric curve: dy/dx = (dy/dt)/(dx/dt) provided dx/dt != 0. Derived from chain rule: dy/dx = (dy/dt)·(dt/dx) = (dy/dt)/(dx/dt). Example: x = t^2, y = t^3. dy/dx = (3t^2)/(2t) = 3t/2 (for t != 0). At t=2: dy/dx = 3. To find where tangent horizontal: dy/dt = 0 (and dx/dt != 0): t = 0 here, but dx/dt = 0 too. Vertical: dx/dt = 0 (and dy/dt != 0). ✓',
  'ch05p1_parametric_derivative',
  'formula_recall',
  ['parametric', 'derivative', 'dy/dx', 'chain rule', 'dy/dt dx/dt']
)

add(
  'How do you find the second derivative d^2y/dx^2 for a parametric curve?',
  'Second derivative for parametric: d^2y/dx^2 = d/dx(dy/dx) = (d/dt(dy/dx))/(dx/dt). Note: divide by dx/dt, NOT dy/dt. Common mistake. Example: x = t^2, y = t^3. dy/dx = 3t/2. d^2y/dx^2 = (d/dt(3t/2))/(2t) = (3/2)/(2t) = 3/(4t). At t=1: d^2y/dx^2 = 3/4. Sign indicates concavity: positive = concave up. ✓',
  'ch05p1_parametric_second_derivative',
  'formula_recall',
  ['parametric', 'second derivative', 'd^2y/dx^2', 'chain rule', 'concavity']
)

add(
  'How do you find the arc length of a parametric curve?',
  'Arc length of parametric curve x = f(t), y = g(t) from t = a to t = b: L = integral_a^b sqrt((dx/dt)^2 + (dy/dt)^2) dt, provided dx/dt, dy/dt continuous. Example: x = cos t, y = sin t, t in [0, 2pi]. dx/dt = -sin t, dy/dt = cos t. L = integral_0^(2pi) sqrt(sin^2 + cos^2) dt = integral_0^(2pi) 1 dt = 2pi (circumference of unit circle). Example: x = t^2, y = t^3, t in [0, 1]. L = integral_0^1 sqrt(4t^2 + 9t^4) dt = integral_0^1 t·sqrt(4 + 9t^2) dt. ✓',
  'ch05p1_parametric_arc_length',
  'formula_recall',
  ['parametric', 'arc length', 'integral', 'sqrt', 'curve']
)

add(
  'How do you find the surface area of a solid of revolution for a parametric curve?',
  'Surface area of revolution (parametric): If x = f(t), y = g(t), t in [a, b], rotate about x-axis: S = integral_a^b 2pi·y·sqrt((dx/dt)^2 + (dy/dt)^2) dt (y >= 0). Rotate about y-axis: S = integral_a^b 2pi·x·sqrt((dx/dt)^2 + (dy/dt)^2) dt. Example: x = cos t, y = sin t, t in [0, pi] (upper semi-circle), rotate about x-axis. S = integral_0^pi 2pi·sin t·1 dt = 2pi·[-cos t]_0^pi = 2pi·(1+1) = 4pi (surface area of unit sphere). ✓',
  'ch05p1_parametric_surface_area',
  'formula_recall',
  ['parametric', 'surface area', 'revolution', 'sphere', 'integral']
)

// ============================================================
// SECTION 13 — CALCULUS WITH PARAMETRIC CURVES (5 items)
// ============================================================
add(
  'How do you find the area under a parametric curve?',
  'Area under parametric curve x = f(t), y = g(t), t in [a, b] (where x is increasing so f\'(t) > 0): A = integral_a^b y·(dx/dt) dt = integral_a^b g(t)·f\'(t) dt. Example: x = t^2, y = t^3, t in [0, 2]. A = integral_0^2 t^3·2t dt = integral_0^2 2t^4 dt = 2t^5/5 |_0^2 = 64/5 = 12.8. Example: x = a cos t, y = b sin t, t in [0, pi] (upper ellipse). A = integral_0^pi b sin t·(-a sin t) dt = -ab·integral_0^pi sin^2 t dt. Careful with sign! Need x increasing, so use [pi, 0] or take abs. A = pi·ab/2 (half ellipse). ✓',
  'ch05p1_parametric_area',
  'problem_solving',
  ['parametric', 'area', 'integral', 'y dx/dt', 'curve']
)

add(
  'How do you find the equation of a tangent line to a parametric curve?',
  'Tangent line to parametric curve x = f(t), y = g(t) at point t = t_0: slope m = dy/dx = g\'(t_0)/f\'(t_0). Point: (f(t_0), g(t_0)). Equation: y - g(t_0) = m·(x - f(t_0)). Example: x = t^2, y = t^3 at t = 1. Point (1, 1). dy/dx = 3t^2/(2t) = 3/2 at t=1. Tangent: y - 1 = (3/2)(x - 1), or y = (3/2)x - 1/2. Horizontal tangent: dy/dt = 0. Vertical: dx/dt = 0. ✓',
  'ch05p1_parametric_tangent',
  'problem_solving',
  ['parametric', 'tangent line', 'slope', 'point', 'equation']
)

add(
  'How do you analyze the motion of a particle along a parametric curve?',
  'Particle motion: position r(t) = (x(t), y(t)). Velocity v(t) = (x\'(t), y\'(t)). Speed = sqrt(x\'^2 + y\'^2). Acceleration a(t) = (x\'\'(t), y\'\'(t)). Distance traveled = integral_a^b sqrt(x\'^2 + y\'^2) dt (arc length). Displacement = (x(b)-x(a), y(b)-y(a)). Example: x = 3t, y = 4t - 5t^2. v = (3, 4-10t). At t=1: v=(3,-6), speed = sqrt(9+36) = 3sqrt(5). a = (0, -10). ✓',
  'ch05p1_parametric_motion',
  'problem_solving',
  ['parametric', 'motion', 'velocity', 'speed', 'acceleration', 'particle']
)

add(
  'How do you find horizontal and vertical tangents of a parametric curve?',
  'Horizontal tangent: dy/dt = 0 (with dx/dt != 0). Vertical tangent: dx/dt = 0 (with dy/dt != 0). If both 0 at same t, analyze further (cusp, etc.). Example: x = t^3 - 3t, y = t^2. dy/dt = 2t = 0 at t = 0. dx/dt = 3t^2 - 3 = -3 != 0 at t=0. So horizontal tangent at t=0 (point (0, 0)). Vertical: dx/dt = 0 => 3t^2 = 3 => t = ±1. dy/dt = 2t != 0 there. Vertical tangents at t=1 (point (-2, 1)) and t=-1 (point (2, 1)). ✓',
  'ch05p1_parametric_horizontal_vertical',
  'problem_solving',
  ['parametric', 'horizontal tangent', 'vertical tangent', 'dy/dt', 'dx/dt']
)

add(
  'How do you find the concavity of a parametric curve?',
  'Concavity of parametric curve: sign of d^2y/dx^2 = (d/dt(dy/dx))/(dx/dt). Positive: concave up. Negative: concave down. Example: x = t^2, y = t^3. dy/dx = 3t/2 (for t != 0). d^2y/dx^2 = (3/2)/(2t) = 3/(4t). For t > 0: concave up. For t < 0: concave down. At t = 0: dy/dx = 0/0 (indeterminate). Use limit or consider separately. ✓',
  'ch05p1_parametric_concavity',
  'problem_solving',
  ['parametric', 'concavity', 'second derivative', 'sign', 'curve']
)

// ============================================================
// SECTION 14 — POLAR COORDINATES (5 items)
// ============================================================
add(
  'What are polar coordinates?',
  'Polar coordinates: a point is (r, theta) where r is distance from origin and theta is angle from positive x-axis. Conversion: x = r cos theta, y = r sin theta. r = sqrt(x^2 + y^2), tan theta = y/x. To convert (3, 4) to polar: r = 5, theta = arctan(4/3) ~ 53.13 deg. Multiple representations: (r, theta) = (r, theta + 2pi) = (-r, theta + pi). Origin: r = 0, any theta. Example: convert (2, pi/3) to Cartesian: x = 2cos(pi/3) = 1, y = 2sin(pi/3) = sqrt(3). ✓',
  'ch05p1_polar_definition',
  'formula_recall',
  ['polar', 'coordinates', 'r theta', 'conversion', 'Cartesian']
)

add(
  'How do you convert between polar and Cartesian equations?',
  'Conversion: replace x with r cos theta, y with r sin theta, x^2 + y^2 with r^2. Cartesian to polar: x = r cos theta, y = r sin theta. Example: Cartesian x^2 + y^2 = 4 (circle) becomes r^2 = 4, r = 2 (simpler). Example: y = x becomes r sin theta = r cos theta, tan theta = 1, theta = pi/4 (line). Example: Polar r = 2 cos theta becomes r^2 = 2r cos theta, x^2 + y^2 = 2x, (x-1)^2 + y^2 = 1 (circle radius 1 centered (1,0)). ✓',
  'ch05p1_polar_conversion',
  'problem_solving',
  ['polar', 'Cartesian', 'conversion', 'x^2+y^2=r^2', 'equation']
)

add(
  'What are common polar curves?',
  'Common polar curves: (1) Circle: r = a (centered origin), r = 2a cos theta (centered (a,0)), r = 2a sin theta (centered (0,a)). (2) Cardioid: r = a(1 ± cos theta) or r = a(1 ± sin theta) (heart shape). (3) Limacon: r = a ± b cos theta (with inner loop if b > a, dimpled if a < b < 2a... actually: loop if b>a, dimpled if a<b<2a, convex if b<=a, wait - the standard: a>b convex, a=b cardioid, a<b dimpled or loop). (4) Rose: r = a sin(n theta) or a cos(n theta), n petals if n odd, 2n petals if n even. (5) Lemniscate: r^2 = a^2 cos(2 theta) (figure-eight). ✓',
  'ch05p1_polar_curves',
  'formula_recall',
  ['polar curves', 'cardioid', 'limacon', 'rose', 'lemniscate', 'circle']
)

add(
  'How do you find the slope of a tangent line to a polar curve?',
  'Slope of tangent to polar curve r = f(theta): dy/dx = (dr/dtheta · sin theta + r · cos theta)/(dr/dtheta · cos theta - r · sin theta). Derived from x = r cos theta, y = r sin theta, apply parametric formula. Example: r = 1 + cos theta (cardioid). dr/dtheta = -sin theta. At theta = pi/2: r = 1, dr/dtheta = -1. dy/dx = (-1·1 + 1·0)/(-1·0 - 1·1) = -1/-1 = 1. Tangent slope = 1 at (0, 1). Horizontal: numerator = 0. Vertical: denominator = 0. ✓',
  'ch05p1_polar_slope',
  'formula_recall',
  ['polar', 'tangent', 'slope', 'dy/dx', 'dr/dtheta']
)

add(
  'How do you sketch a polar curve?',
  'Sketching polar curves: (1) Find symmetry: about x-axis if f(-theta) = f(theta); y-axis if f(pi - theta) = f(theta) or f(-theta) = -f(theta); origin if f(theta + pi) = f(theta). (2) Find where r = 0 (curve passes through origin). (3) Find max r. (4) Plot key points (theta = 0, pi/4, pi/2, ...). (5) Identify type (rose, cardioid, etc.). Example: r = 2 cos(3 theta) (3-petal rose). r = 0 when cos(3 theta) = 0, i.e., theta = pi/6, pi/2, 5pi/6. Max r = 2 at theta = 0, 2pi/3, 4pi/3. Plot to see 3 petals. ✓',
  'ch05p1_polar_sketching',
  'problem_solving',
  ['polar', 'sketch', 'symmetry', 'zeros', 'max r', 'graph']
)

// ============================================================
// SECTION 15 — CALCULUS WITH POLAR CURVES (5 items)
// ============================================================
add(
  'How do you find the area enclosed by a polar curve?',
  'Area in polar coordinates: A = (1/2) integral_a^b r^2 d theta. This is the area swept out by the radius vector from theta = a to theta = b. For full curve (closed): use period. Example: Area inside r = 2 (circle radius 2): A = (1/2) integral_0^(2pi) 4 d theta = (1/2)(4)(2pi) = 4pi. Example: Area inside cardioid r = 1 + cos theta: A = (1/2) integral_0^(2pi) (1 + cos theta)^2 d theta = (1/2) integral (1 + 2cos + cos^2) d theta = (1/2)(2pi + 0 + pi) = 3pi/2. ✓',
  'ch05p1_polar_area',
  'formula_recall',
  ['polar', 'area', 'r^2', 'integral', 'cardioid', 'circle']
)

add(
  'How do you find the area between two polar curves?',
  'Area between polar curves r = f(theta) (outer) and r = g(theta) (inner), theta in [a, b]: A = (1/2) integral_a^b (r_outer^2 - r_inner^2) d theta = (1/2) integral_a^b (f(theta)^2 - g(theta)^2) d theta. Need to find intersection points and correct intervals. Example: Inside r = 3 cos theta and outside r = 1. Intersections: 3 cos theta = 1 => cos theta = 1/3 => theta = ±arccos(1/3). A = (1/2) integral_(-arccos(1/3))^(arccos(1/3)) (9 cos^2 theta - 1) d theta. ✓',
  'ch05p1_polar_area_between',
  'problem_solving',
  ['polar', 'area between', 'two curves', 'intersection', 'integral']
)

add(
  'How do you find the arc length of a polar curve?',
  'Arc length of polar curve r = f(theta), theta in [a, b]: L = integral_a^b sqrt(r^2 + (dr/dtheta)^2) d theta. Derived from parametric: x = r cos theta, y = r sin theta, dx/dtheta and dy/dtheta combine to give sqrt(r^2 + (dr/dtheta)^2). Example: r = 1 (unit circle). L = integral_0^(2pi) sqrt(1 + 0) d theta = 2pi (circumference). Example: r = e^theta, theta in [0, 2pi] (logarithmic spiral). dr/dtheta = e^theta. L = integral_0^(2pi) sqrt(e^(2theta) + e^(2theta)) d theta = integral_0^(2pi) e^theta sqrt(2) d theta = sqrt(2)(e^(2pi) - 1). ✓',
  'ch05p1_polar_arc_length',
  'formula_recall',
  ['polar', 'arc length', 'sqrt', 'r^2 + (dr/dtheta)^2', 'curve']
)

add(
  'How do you find the surface area of a solid of revolution for a polar curve?',
  'Surface area of revolution (polar): r = f(theta), theta in [a, b], rotate about x-axis. S = integral_a^b 2pi·y·sqrt(r^2 + (dr/dtheta)^2) d theta = integral_a^b 2pi·r sin theta·sqrt(r^2 + (dr/dtheta)^2) d theta. About polar axis (x-axis): use y = r sin theta. About y-axis (theta = pi/2 line): use x = r cos theta. Example: r = 1 + cos theta (cardioid), [0, pi] (upper half), rotate about x-axis. S = integral_0^pi 2pi·(1+cos theta) sin theta·sqrt((1+cos)^2 + sin^2) d theta. ✓',
  'ch05p1_polar_surface_area',
  'formula_recall',
  ['polar', 'surface area', 'revolution', '2pi y', 'solid']
)

add(
  'How do you find points of intersection of two polar curves?',
  'Intersection of polar curves r = f(theta) and r = g(theta): (1) Solve f(theta) = g(theta) for theta. (2) ALSO check if curves pass through origin (r = 0) for both, since origin can have any theta. (3) Check (-r, theta + pi) representation. Example: r = 1 + cos theta and r = 1 - cos theta. Solve 1 + cos theta = 1 - cos theta => cos theta = 0 => theta = pi/2, 3pi/2. Points: (1, pi/2) and (1, 3pi/2). But also origin? r = 0 when cos theta = -1 (first curve, theta = pi) and cos theta = 1 (second, theta = 0). Different theta, same point (origin). So origin is also intersection. ✓',
  'ch05p1_polar_intersections',
  'problem_solving',
  ['polar', 'intersection', 'two curves', 'origin', 'multiple representation']
)

// ============================================================
// WRITE OUTPUT
// ============================================================
const output = {
  generatedAt: new Date().toISOString(),
  totalItems: items.length,
  subject: 'mathematics_formulas_volume_9_chapter_05_part_01',
  volume:
    'Volume 9 — Comprehensive Formula Encyclopedia, Chapter 5 Part 1 (Sequences, Series, Convergence Tests [Integral, Comparison, Limit Comparison, Alternating Series, Ratio, Root], Power Series, Taylor & Maclaurin Series, Applications of Taylor Series, Parametric Equations & Calculus, Polar Coordinates & Calculus)',
  source: 'TRIZA Generated Formula Dataset',
  language: 'en',
  religionNeutral: true,
  items,
}

mkdirSync('data', { recursive: true })
writeFileSync('data/math-formulas-vol9-ch05p1.json', JSON.stringify(output, null, 2))
console.log(`Wrote ${items.length} items to data/math-formulas-vol9-ch05p1.json`)
