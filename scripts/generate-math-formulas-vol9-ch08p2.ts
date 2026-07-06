/**
 * ============================================================
 *  Mathematics Formula Encyclopedia — Volume 9
 *  Comprehensive Formula Reference
 *  Chapter 8 — Part 2 (Discrete Random Variables)
 *  Discrete RV Basics: PMF, CDF, Expectation, Variance,
 *  Bernoulli & Binomial Distributions,
 *  Poisson Distribution & Poisson Process,
 *  Geometric & Negative Binomial Distributions,
 *  Hypergeometric & Discrete Uniform Distributions,
 *  Moment Generating & Probability Generating Functions,
 *  Worked Problems
 *  Generator for TRIZA
 * ============================================================
 *
 *  Output: data/math-formulas-vol9-ch08p2.json
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
// SECTION 1 — DISCRETE RV BASICS: PMF, CDF, EXPECTATION, VARIANCE (8 items)
// ============================================================
add(
  'What is a discrete random variable and its probability mass function (PMF)?',
  'A discrete random variable (RV) X is a function X: Omega -> S where S is a finite or countable subset of R (e.g., {0,1,2,...}). The probability mass function (PMF) p_X(x) = P(X = x) satisfies: (1) p_X(x) >= 0 for all x; (2) sum_{x in S} p_X(x) = 1. The cumulative distribution function (CDF) is F_X(x) = P(X <= x) = sum_{t <= x} p_X(t), a right-continuous step function with jumps of size p_X(x) at each x in S. From CDF: p_X(x) = F_X(x) - F_X(x^-) (jump at x). P(a < X <= b) = F_X(b) - F_X(a). Support S = {x : p_X(x) > 0}. Example: fair die, X = outcome, p_X(k) = 1/6 for k=1..6, F_X(k) = k/6.',
  'ch08p2_discrete_rv_pmf',
  'formula_recall',
  ['discrete random variable', 'PMF', 'probability mass function', 'support']
)
add(
  'What is the expected value (mean) of a discrete random variable?',
  'Expected value (mean) of discrete RV X with PMF p_X: E[X] = sum_{x in S} x * p_X(x), provided sum |x| p_X(x) < infinity (absolute convergence; otherwise E[X] undefined). Interpretation: long-run average of X over many trials (justified by LLN). Properties: E[c] = c; E[cX] = cE[X]; E[X + Y] = E[X] + E[Y] (linearity, no independence needed); E[g(X)] = sum g(x) p_X(x) (law of the unconscious statistician). Example: fair die E[X] = (1+2+3+4+5+6)/6 = 3.5. Bernoulli(p): E[X] = p. Binomial(n,p): E[X] = np. Poisson(lambda): E[X] = lambda. If X is integer-valued nonneg, E[X] = sum_{k=1}^{inf} P(X >= k) (tail-sum formula). Variance measures spread; E[X] locates the center.',
  'ch08p2_expected_value',
  'formula_recall',
  ['expected value', 'mean', 'expectation', 'law of unconscious statistician']
)
add(
  'What is the variance and standard deviation of a random variable?',
  'Variance: Var(X) = E[(X - mu)^2] where mu = E[X]. Computational formula: Var(X) = E[X^2] - (E[X])^2. Units: squared units of X. Standard deviation sigma = sqrt(Var(X)), same units as X. Properties: Var(c) = 0; Var(cX) = c^2 Var(X); Var(X + c) = Var(X); Var(X + Y) = Var(X) + Var(Y) + 2 Cov(X,Y); if X, Y independent, Var(X + Y) = Var(X) + Var(Y). Var(X) >= 0, equals 0 iff X is constant a.s. Examples: Bernoulli(p): Var = p(1-p). Binomial(n,p): Var = np(1-p). Poisson(lambda): Var = lambda. Geometric(p): Var = (1-p)/p^2. Chebyshev: P(|X - mu| >= k sigma) <= 1/k^2. Variance is the second central moment; standardized skewness = E[(X-mu)^3]/sigma^3.',
  'ch08p2_variance',
  'formula_recall',
  ['variance', 'standard deviation', 'spread', 'Chebyshev']
)
add(
  'What is the cumulative distribution function (CDF) of a random variable?',
  'Cumulative distribution function (CDF): F_X(x) = P(X <= x) for any RV (discrete or continuous). Properties: (1) F_X is non-decreasing (monotone); (2) lim_{x -> -inf} F_X(x) = 0; (3) lim_{x -> +inf} F_X(x) = 1; (4) F_X is right-continuous: F_X(x^+) = F_X(x). For discrete RV, F_X is a step function with jumps p_X(x) at each mass point. For continuous RV, F_X(x) = integral_{-inf}^x f_X(t) dt is continuous and differentiable a.e., with f_X = F_X\'. Useful computations: P(a < X <= b) = F_X(b) - F_X(a); P(X > x) = 1 - F_X(x); P(X < x) = F_X(x^-) (left limit); P(X = x) = F_X(x) - F_X(x^-) (jump). The CDF uniquely determines the distribution; two RVs with the same CDF have the same distribution.',
  'ch08p2_cdf',
  'formula_recall',
  ['CDF', 'cumulative distribution function', 'right-continuous', 'step function']
)
add(
  'What is the law of the unconscious statistician (LOTUS)?',
  'Law of the unconscious statistician (LOTUS): for any RV X and measurable function g, E[g(X)] = sum_x g(x) p_X(x) for discrete, or = integral g(x) f_X(x) dx for continuous. Crucially, you do NOT need to first compute the distribution of Y = g(X); just average g(X) against the distribution of X directly. Examples: E[X^2] = sum x^2 p_X(x) (used for variance). E[(X-mu)^2] = sum (x-mu)^2 p_X(x). E[e^{tX}] (MGF). For g monotone, can also use the CDF method to find distribution of g(X) then take expectation, but LOTUS is usually simpler. Generalizes: E[g(X,Y)] = double sum/integral g(x,y) p_{X,Y}(x,y). Pitfall: E[g(X)] != g(E[X]) in general (Jensen: for convex g, E[g(X)] >= g(E[X])).',
  'ch08p2_lotus',
  'formula_recall',
  ['LOTUS', 'law of unconscious statistician', 'E[g(X)]', 'Jensen']
)
add(
  'What are the properties of expectation (linearity, monotonicity, Jensen)?',
  'Properties of expectation: (1) Linearity: E[aX + bY] = aE[X] + bE[Y] for constants a, b (no independence needed). (2) Constants: E[c] = c. (3) Monotonicity: X <= Y a.s. => E[X] <= E[Y]. (4) Bounds: |E[X]| <= E[|X|]; E[X] in [inf(support), sup(support)]. (5) Jensen: for convex phi, phi(E[X]) <= E[phi(X)] (e.g., (E[X])^2 <= E[X^2] => Var >= 0); for concave, reverse (e.g., E[log X] <= log E[X], AM-GM). (6) E[X^k] = k-th moment; central moment E[(X-mu)^k]. (7) Tail-sum (nonneg integer X): E[X] = sum_{k>=1} P(X >= k). (8) E[1_A] = P(A) (indicator trick). (9) For independent X, Y: E[XY] = E[X]E[Y] (reverse holds if non-degenerate jointly normal). Linearity is the most-used property — e.g., E[sum a_i X_i] = sum a_i E[X_i] regardless of dependence.',
  'ch08p2_expectation_properties',
  'formula_recall',
  ['linearity of expectation', 'Jensen inequality', 'monotonicity', 'moments']
)
add(
  'What are moments and moment generating functions of a random variable?',
  'k-th moment of X: mu_k = E[X^k]. k-th central moment: E[(X - mu)^k] (mu = E[X]); second central moment = variance. Moment generating function (MGF): M_X(t) = E[e^{tX}]. If M_X exists in a neighborhood of t=0, it uniquely determines the distribution and M_X^{(k)}(0) = E[X^k] (k-th derivative at 0 = k-th moment). Properties: M_{aX+b}(t) = e^{bt} M_X(at). If X, Y independent: M_{X+Y}(t) = M_X(t) M_Y(t) (factorizes). Common MGFs: Bernoulli(p) = 1-p + p e^t. Binomial(n,p) = (1-p + p e^t)^n. Poisson(lambda) = exp(lambda(e^t - 1)). Geometric(p) = p e^t / (1 - (1-p) e^t), t < -ln(1-p). Exponential(lambda) = lambda/(lambda - t), t < lambda. Standard normal = exp(t^2/2). Normal(mu,sigma^2) = exp(mu t + sigma^2 t^2/2). MGFs simplify sums of independent RVs and prove CLT.',
  'ch08p2_moments_mgf',
  'formula_recall',
  ['moment generating function', 'MGF', 'moments', 'uniqueness']
)
add(
  'What is the probability generating function (PGF) for a nonnegative integer-valued RV?',
  'Probability generating function (PGF) of a nonneg integer-valued RV X: G_X(s) = E[s^X] = sum_{k=0}^{inf} p_X(k) s^k. Converges at least for |s| <= 1. Properties: G_X(1) = 1 (normalization); G_X\'(1) = E[X]; G_X\'\'(1) = E[X(X-1)], so Var(X) = G\'\'(1) + G\'(1) - (G\'(1))^2. If X, Y independent, PGF of X+Y is G_X(s) G_Y(s). Common PGFs: Bernoulli(p) = 1-p + ps. Binomial(n,p) = (1-p + ps)^n. Poisson(lambda) = exp(lambda(s-1)). Geometric(p) = ps / (1 - (1-p)s). NegBinom(r,p) = [ps/(1-(1-p)s)]^r. PGF relation to MGF: M_X(t) = G_X(e^t). PGFs are natural for branching processes (Galton-Watson extinction via G(s)=s fixed point) and sums of independent counts. Unlike MGF, PGF always exists for |s|<=1.',
  'ch08p2_pgf',
  'formula_recall',
  ['probability generating function', 'PGF', 'branching process', 'nonneg integer']
)

// ============================================================
// SECTION 2 — BERNOULLI & BINOMIAL DISTRIBUTIONS (7 items)
// ============================================================
add(
  'What is the Bernoulli distribution?',
  'Bernoulli distribution: X ~ Bernoulli(p), p in [0,1], models a single trial with success probability p. PMF: P(X=1) = p (success), P(X=0) = 1-p = q (failure). Indicator RV: X = 1_A for event A with P(A) = p. Mean: E[X] = p. Variance: Var(X) = p(1-p) = pq (maximized at p=1/2). MGF: M(t) = 1-p + p e^t. PGF: G(s) = 1-p + ps. Skewness: (1-2p)/sqrt(p(1-p)). Entropy: -p log p - (1-p) log(1-p). Sum of n independent Bernoulli(p) = Binomial(n,p). Bernoulli is the building block of all binomial-family distributions. Relation: Bernoulli(p) = Binomial(1, p). Application: any yes/no outcome — coin flip (p=1/2), click/no-click, defective/non-defective item. E[X] = p, E[X^2] = p, so Var = p - p^2 = p(1-p).',
  'ch08p2_bernoulli',
  'formula_recall',
  ['Bernoulli distribution', 'indicator', 'single trial', 'binary outcome']
)
add(
  'What is the Binomial distribution and its properties?',
  'Binomial distribution: X ~ Binomial(n, p) = sum of n independent Bernoulli(p) trials. PMF: P(X = k) = C(n,k) p^k (1-p)^{n-k}, k = 0, 1, ..., n. Mean: E[X] = np. Variance: Var(X) = np(1-p) = npq. MGF: M(t) = (1-p + p e^t)^n. PGF: G(s) = (1-p + ps)^n. Mode: floor((n+1)p). Skewness: (1-2p)/sqrt(np(1-p)). Additivity: if X ~ Bin(n_1, p), Y ~ Bin(n_2, p) independent, then X+Y ~ Bin(n_1+n_2, p) (same p). Recursion: P(X=k+1)/P(X=k) = [(n-k)/(k+1)] [p/(1-p)]. Normal approximation: for large n with np and n(1-p) both >= 5, X ~ N(np, np(1-p)) approximately (De Moivre-Laplace). Poisson approximation: for n large, p small, np = lambda moderate, Bin(n,p) ~ Poisson(lambda). Application: number of successes in n Bernoulli trials — defects in batch, heads in n flips.',
  'ch08p2_binomial',
  'formula_recall',
  ['binomial distribution', 'n trials', 'PMF', 'normal approximation']
)
add(
  'When is the normal approximation to the binomial valid (De Moivre-Laplace)?',
  'De Moivre-Laplace theorem: for X ~ Binomial(n, p), as n -> inf, (X - np)/sqrt(np(1-p)) converges in distribution to N(0,1). Equivalently, X ~ N(np, np(1-p)) approximately for large n. Rule of thumb: approximation good when np >= 5 and n(1-p) >= 5 (some use 10). Continuity correction: for integer X, P(a <= X <= b) ~ P(a - 0.5 <= Y <= b + 0.5) where Y ~ N(np, npq). Example: n=100, p=0.5, P(X <= 55) ~ P(Y <= 55.5) for Y ~ N(50, 25) = P(Z <= (55.5-50)/5) = P(Z <= 1.1) ~ 0.864. Exact = 0.8644. Without correction P(Z <= 1.0) ~ 0.841 (worse). When p near 0 or 1, use Poisson or exact. The CLT generalizes De Moivre-Laplace to sums of any i.i.d. RVs. The Berry-Esseen theorem bounds the error: sup_x |F_n(x) - Phi(x)| <= C E|X_1|^3 / (sigma^3 sqrt(n)).',
  'ch08p2_binomial_normal_approx',
  'formula_recall',
  ['De Moivre-Laplace', 'normal approximation', 'continuity correction', 'CLT']
)
add(
  'When is the Poisson approximation to the binomial valid?',
  'Poisson approximation (law of rare events): for X ~ Binomial(n, p) with n large, p small, and lambda = np moderate (fixed), X ~ Poisson(lambda) approximately. PMF: C(n,k) p^k (1-p)^{n-k} ~ e^{-lambda} lambda^k / k! as n -> inf, p -> 0, np = lambda. Rule of thumb: good when n >= 20 and p <= 0.05, or n >= 100 and np <= 10. Mean and variance both ~ lambda (binomial Var = np(1-p) ~ np = lambda since p small). Le Cam theorem: total variation distance between Bin(n,p) and Poisson(np) <= 2 n p^2 = 2 lambda p (small when p small). Application: number of defects in a large batch with low defect rate, number of phone calls in a minute, radioactive decays, typos per page. Example: n=1000 items, p=0.002 defects, lambda=2; P(0 defects) = (0.998)^1000 ~ 0.135 vs Poisson e^{-2} ~ 0.135. The Poisson is the limiting form of Binomial for rare events.',
  'ch08p2_binomial_poisson_approx',
  'formula_recall',
  ['Poisson approximation', 'law of rare events', 'Le Cam', 'binomial limit']
)
add(
  'How do you compute binomial probabilities recursively?',
  'Binomial recursion: for X ~ Binomial(n, p), the PMF ratios simplify: P(X = k+1) / P(X = k) = [C(n,k+1) p^{k+1} q^{n-k-1}] / [C(n,k) p^k q^{n-k}] = [(n-k)/(k+1)] * (p/q), where q = 1-p. Starting from P(X=0) = q^n, compute P(X=1), P(X=2), ... iteratively: P(X=k+1) = P(X=k) * (n-k)/(k+1) * (p/q). This avoids recomputing factorials/binomial coefficients for each k, and is numerically stable for moderate n. Mode: the ratio equals 1 at k* = floor((n+1)p) - 1 ... more precisely, P(X=k) increases while (n-k)p > (k+1)(1-p), i.e., k < (n+1)p - 1; so mode = floor((n+1)p). Tail via recursion: P(X >= k) = 1 - sum_{j<k} P(X=j). For very large n, use log-recursion or Stirling. The recursion also derives the PMF shape (unimodal) and is the basis of the qbinom/pbinom implementations.',
  'ch08p2_binomial_recursion',
  'formula_recall',
  ['binomial recursion', 'PMF ratio', 'mode', 'iterative']
)
add(
  'What is the multinomial distribution?',
  'Multinomial distribution: generalization of Binomial to k categories. n independent trials, each landing in category i with probability p_i (sum p_i = 1). X = (X_1, ..., X_k) counts in each category, sum X_i = n. PMF: P(X_1=x_1,...,X_k=x_k) = n!/(x_1! ... x_k!) * p_1^{x_1} ... p_k^{x_k}, for x_i >= 0, sum x_i = n. Marginals: X_i ~ Binomial(n, p_i). Means: E[X_i] = n p_i. Variances: Var(X_i) = n p_i (1-p_i). Covariances: Cov(X_i, X_j) = -n p_i p_j (negative since sum fixed). Correlation: rho_{ij} = -sqrt(p_i p_j / ((1-p_i)(1-p_j))). MGF: M(t_1,...,t_k) = (sum p_i e^{t_i})^n. Additivity: independent Mult(n_1, p) + Mult(n_2, p) = Mult(n_1+n_2, p). Application: polling (vote counts across parties), genotype frequencies, word counts in text. Binomial = Multinomial with k=2.',
  'ch08p2_multinomial_dist',
  'formula_recall',
  ['multinomial', 'k categories', 'covariance', 'generalization of binomial']
)
add(
  'How do you find the mode of a Binomial distribution?',
  'Mode of Binomial(n, p): the most probable value. The PMF P(X=k) = C(n,k) p^k q^{n-k} is unimodal. Ratio: P(X=k)/P(X=k-1) = [(n-k+1)/k] (p/q). PMF increases while P(X=k) > P(X=k-1), i.e., (n-k+1) p > k q, i.e., k < (n+1) p. So the mode m = floor((n+1) p). Cases: (1) If (n+1)p is not an integer, unique mode = floor((n+1)p). (2) If (n+1)p is an integer, two adjacent modes = (n+1)p - 1 and (n+1)p (PMF equal at both). Example: Bin(10, 0.5): (n+1)p = 5.5, mode = 5. Bin(10, 0.3): (n+1)p = 3.3, mode = 3. Bin(4, 0.5): (n+1)p = 2.5, mode = 2. Bin(5, 0.4): (n+1)p = 2.4, mode = 2. The mode is near the mean np but not always equal; e.g., Bin(2, 0.5): mean=1, (n+1)p=1.5, modes = 0,1,2 all equal (0.25, 0.5, 0.25) — wait that gives mode=1 only. Recheck: Bin(2,0.5) PMF: 0.25, 0.5, 0.25, mode=1=floor(1.5).',
  'ch08p2_binomial_mode',
  'formula_recall',
  ['binomial mode', 'most probable value', 'unimodal', 'floor']
)

// ============================================================
// SECTION 3 — POISSON DISTRIBUTION & POISSON PROCESS (7 items)
// ============================================================
add(
  'What is the Poisson distribution?',
  'Poisson distribution: X ~ Poisson(lambda), lambda > 0, counts events in a fixed interval. PMF: P(X = k) = e^{-lambda} lambda^k / k!, k = 0, 1, 2, .... Mean: E[X] = lambda. Variance: Var(X) = lambda (mean = variance = lambda, the signature property). MGF: M(t) = exp(lambda(e^t - 1)). PGF: G(s) = exp(lambda(s-1)). Mode: floor(lambda) (two adjacent modes if lambda is an integer: lambda-1 and lambda). Additivity: independent Poisson(lambda_1) + Poisson(lambda_2) = Poisson(lambda_1 + lambda_2). Skewness: 1/sqrt(lambda). Excess kurtosis: 1/lambda. Tail: P(X >= k) = 1 - e^{-lambda} sum_{j=0}^{k-1} lambda^j/j!. Application: rare events in fixed time/space — calls to a call center per minute, radioactive decays, typos per page, customer arrivals. Derivation: limit of Binomial(n, p) as n->inf, p->0, np=lambda. The Poisson is the "law of rare events."',
  'ch08p2_poisson',
  'formula_recall',
  ['Poisson distribution', 'lambda', 'rare events', 'mean equals variance']
)
add(
  'What are the postulates of a Poisson process?',
  'Poisson process (homogeneous, rate lambda): a counting process {N(t), t >= 0} with N(0) = 0 and: (1) Independent increments: for 0 <= t_1 < t_2 < ... < t_n, the increments N(t_i) - N(t_{i-1}) are independent. (2) Stationary increments: distribution of N(t+s) - N(t) depends only on s, not t. (3) Small-probability / orderly: P(N(h) >= 2) = o(h) (no simultaneous events), P(N(h) = 1) = lambda h + o(h). Consequences: N(t) ~ Poisson(lambda t); inter-arrival times T_i ~ iid Exponential(lambda); time of k-th event S_k = T_1 + ... + T_k ~ Gamma(k, 1/lambda) (Erlang). Superposition: independent Poisson processes with rates lambda_1, lambda_2 combine to Poisson(rate lambda_1 + lambda_2). Thinning: each event kept with prob p independently => Poisson(lambda p). Non-homogeneous generalization: rate lambda(t), N(t) ~ Poisson(integral_0^t lambda(s) ds).',
  'ch08p2_poisson_process',
  'formula_recall',
  ['Poisson process', 'independent increments', 'stationary', 'rate lambda']
)
add(
  'How are inter-arrival times distributed in a Poisson process?',
  'In a Poisson process with rate lambda, the inter-arrival times T_1, T_2, ... are iid Exponential(lambda). Derivation: P(T_1 > t) = P(no event in (0,t]) = P(N(t) = 0) = e^{-lambda t}, so T_1 ~ Exp(lambda) with CDF F_T(t) = 1 - e^{-lambda t}, pdf lambda e^{-lambda t}, mean 1/lambda, variance 1/lambda^2. Memoryless property of Exp: P(T > s + t | T > s) = P(T > t) (consistent with stationary independent increments). Time of k-th arrival: S_k = T_1 + ... + T_k ~ Gamma(k, rate=lambda) (Erlang), with pdf lambda^k t^{k-1} e^{-lambda t} / (k-1)!, mean k/lambda. P(S_k <= t) = P(N(t) >= k) (duality). The equivalence Poisson counts <-> Exponential inter-arrivals <-> Gamma arrival times is fundamental. Higher moments of T: E[T^n] = n! / lambda^n. Coefficient of variation = 1 (exponential signature).',
  'ch08p2_poisson_interarrival',
  'formula_recall',
  ['inter-arrival time', 'exponential', 'Gamma arrival', 'memoryless']
)
add(
  'How do you add independent Poisson random variables (superposition)?',
  'Superposition of independent Poisson RVs: if X_1 ~ Poisson(lambda_1), X_2 ~ Poisson(lambda_2), ..., X_n ~ Poisson(lambda_n) are independent, then S = X_1 + ... + X_n ~ Poisson(lambda_1 + ... + lambda_n). Proof via MGF: M_S(t) = prod M_{X_i}(t) = prod exp(lambda_i(e^t - 1)) = exp((sum lambda_i)(e^t - 1)), which is the Poisson(sum lambda_i) MGF. Conditional distribution: given S = X_1 + X_2 = m, X_1 | S=m ~ Binomial(m, lambda_1/(lambda_1+lambda_2)). This is the basis of Poisson process superposition: combining two independent Poisson processes (rates lambda_1, lambda_2) gives a Poisson process with rate lambda_1 + lambda_2; each event came from process 1 with probability lambda_1/(lambda_1+lambda_2). Application: total calls to a call center = sum of calls from independent customer segments. Reverse (splitting/thinning): a Poisson(lambda) process split by independent Bernoulli(p) labeling gives Poisson(lambda p) and Poisson(lambda(1-p)) independent.',
  'ch08p2_poisson_superposition',
  'formula_recall',
  ['Poisson superposition', 'sum of Poisson', 'splitting', 'conditional Binomial']
)
add(
  'What is the Poisson approximation to the Binomial (law of rare events)?',
  'Law of rare events / Poisson limit: if X_n ~ Binomial(n, p_n) with n p_n -> lambda (constant) as n -> inf (so p_n -> 0), then X_n converges in distribution to Poisson(lambda). I.e., for fixed k: C(n,k) p_n^k (1-p_n)^{n-k} -> e^{-lambda} lambda^k / k!. Reasoning: C(n,k) -> n^k/k!, p_n^k -> (lambda/n)^k, (1-p_n)^n -> e^{-lambda}, (1-p_n)^{-k} -> 1. Practical use: approximate Binomial(n, p) by Poisson(np) when n large (>= 20), p small (<= 0.05), and np moderate (<= 10 or so). Example: 1000 lightbulbs, each 0.002 defect rate. Exact Bin(1000, 0.002): P(3 defects) = C(1000,3) (0.002)^3 (0.998)^997 ~ 0.181. Poisson(2): e^{-2} 2^3/6 = 0.180. Excellent agreement. Le Cam bound: TV distance <= 2 sum p_i^2 (for sum of independent Bernoullis, generalizing). The Poisson is the canonical model when counting rare independent events.',
  'ch08p2_poisson_limit',
  'formula_recall',
  ['law of rare events', 'Poisson limit', 'Le Cam', 'binomial to Poisson']
)
add(
  'How do you compute Poisson tail probabilities?',
  'Poisson tail: for X ~ Poisson(lambda), P(X >= k) = 1 - e^{-lambda} sum_{j=0}^{k-1} lambda^j / j! (upper tail). Lower tail: P(X <= k) = e^{-lambda} sum_{j=0}^{k} lambda^j / j!. Incomplete gamma function relation: P(X <= k) = Q(k+1, lambda) = Gamma(k+1, lambda)/k! (regularized upper incomplete gamma), and P(X >= k) = P(k, lambda) (regularized lower). Recursion for cumulative: define f_0 = e^{-lambda}; f_{j+1} = f_j * lambda / (j+1); then P(X <= k) = sum_{j=0}^{k} f_j. Numerical stability: for large lambda, use the incomplete gamma function or saddlepoint/normal approximation with continuity correction: P(X <= k) ~ Phi((k + 0.5 - lambda)/sqrt(lambda)) for lambda large (CLT, since Poisson(lambda) -> N(lambda, lambda)). Chernoff bound: P(X >= k) <= (e lambda / k)^k e^{-lambda} for k > lambda. Application: hypothesis testing for counts; e.g., if observed k events vs expected lambda, p-value = P(X >= k).',
  'ch08p2_poisson_tail',
  'formula_recall',
  ['Poisson tail', 'incomplete gamma', 'cumulative', 'Chernoff bound']
)
add(
  'What is the compound Poisson distribution?',
  'Compound Poisson: S = sum_{i=1}^{N} X_i, where N ~ Poisson(lambda) independent of iid jump sizes X_i (with common distribution F_X). S counts total magnitude (e.g., total claim amount in insurance, where N = number of claims, X_i = size of each claim). Mean: E[S] = E[N] E[X] = lambda mu_X. Variance: Var(S) = E[N] Var(X) + Var(N) (E[X])^2 = lambda (sigma_X^2 + mu_X^2) = lambda E[X^2] (by law of total variance). MGF: M_S(t) = exp(lambda(M_X(t) - 1)). PGF: G_S(s) = exp(lambda(G_X(s) - 1)). Special case: if X_i = 1 (constant), S = N ~ Poisson(lambda). If X_i ~ Bernoulli(p), S ~ Poisson(lambda p) (thinning). If X_i ~ Gamma(alpha, beta), S is a compound Poisson-Gamma. Compound Poisson is infinitely divisible (a Poisson sum of any distribution). Application: risk theory (Cramer-Lundberg), aggregate loss, shot noise. The distribution is determined by lambda and F_X; computing it requires Panjer recursion (for X discrete) or Fourier inversion.',
  'ch08p2_compound_poisson',
  'formula_recall',
  ['compound Poisson', 'random sum', 'aggregate loss', 'infinite divisibility']
)

// ============================================================
// SECTION 4 — GEOMETRIC & NEGATIVE BINOMIAL DISTRIBUTIONS (7 items)
// ============================================================
add(
  'What is the Geometric distribution?',
  'Geometric distribution: X ~ Geometric(p) = number of trials until first success in iid Bernoulli(p) trials. Convention A (support k = 1, 2, 3, ...): PMF P(X = k) = (1-p)^{k-1} p. CDF: F(k) = 1 - (1-p)^k. Mean: E[X] = 1/p. Variance: Var(X) = (1-p)/p^2 = q/p^2. Memoryless property: P(X > m + n | X > m) = P(X > n) — the only discrete RV with this property (along with Exponential in continuous case). Convention B (support k = 0, 1, 2, ... = number of failures before first success): PMF P(Y = k) = (1-p)^k p; E[Y] = (1-p)/p = q/p; Var(Y) = q/p^2. MGF (conv A): M(t) = p e^t / (1 - (1-p) e^t), t < -ln(1-p). Mode: 1 (conv A) or 0 (conv B). Skewness: (2-p)/sqrt(1-p). Application: number of coin flips until first head, retries until success. The memorylessness makes Geometric the discrete analog of Exponential.',
  'ch08p2_geometric',
  'formula_recall',
  ['Geometric distribution', 'first success', 'memoryless', 'trials until success']
)
add(
  'What is the memoryless property and which distributions satisfy it?',
  'Memoryless property: a RV X (nonneg) is memoryless if P(X > s + t | X > s) = P(X > t) for all s, t >= 0. Equivalently, the survival function satisfies S(s+t) = S(s) S(t), so S(t) = e^{-lambda t} for some lambda (continuous) or S(t) = q^t (discrete). The ONLY memoryless distributions are: (1) Exponential(lambda) in continuous case (survival e^{-lambda t}); (2) Geometric(p) in discrete case (survival (1-p)^t on integers). Interpretation: the future waiting time distribution is the same regardless of how long you have already waited — "the process forgets its past." Application: Exponential models lifetimes of non-aging components (radioactive decay, lightbulb in ideal model); Geometric models retries with no learning. Counter-example: human lifetimes are NOT memoryless (an 80-year-old has different remaining-life distribution than a 20-year-old). Consequence: if inter-arrival times are iid Exp, then the counting process is Poisson (memoryless + independent increments). The property uniquely pins down these two distribution families.',
  'ch08p2_memoryless',
  'formula_recall',
  ['memoryless', 'exponential', 'geometric', 'survival function']
)
add(
  'What is the Negative Binomial distribution?',
  'Negative Binomial distribution: X ~ NegBinom(r, p) = number of trials until the r-th success in iid Bernoulli(p) trials (r positive integer; generalizes to r > 0 via Gamma-Poisson mixture). PMF: P(X = k) = C(k-1, r-1) p^r (1-p)^{k-r}, k = r, r+1, .... Alternative parametrization (number of FAILURES before r-th success, Y = X - r): P(Y = k) = C(k+r-1, r-1) p^r (1-p)^k = C(k+r-1, k) p^r q^k, k = 0, 1, .... Mean: E[X] = r/p (conv A) or E[Y] = r(1-p)/p = rq/p (conv B). Variance: Var = r(1-p)/p^2 = rq/p^2 (both). MGF: M(t) = [p e^t / (1 - q e^t)]^r. Additivity: independent NegBinom(r_1, p) + NegBinom(r_2, p) = NegBinom(r_1 + r_2, p) (same p). Sum of r independent Geometric(p) (conv A) = NegBinom(r, p). For non-integer r, NegBinom is the Gamma-Poisson mixture: if lambda ~ Gamma(r, p/(1-p)) and X | lambda ~ Poisson(lambda), then X ~ NegBinom(r, p). Application: number of trials for r successes; overdispersed count data (Var > Mean, unlike Poisson).',
  'ch08p2_negative_binomial',
  'formula_recall',
  ['negative binomial', 'r-th success', 'overdispersion', 'Gamma-Poisson mixture']
)
add(
  'How does the Negative Binomial relate to the Geometric and Poisson?',
  'Relations: (1) Geometric is NegBinom with r=1: NegBinom(1, p) = Geometric(p). (2) Sum of r iid Geometric(p) (conv A, trials until first success) = NegBinom(r, p) (trials until r-th success). (3) NegBinom(r, p) -> Poisson(lambda) as r -> inf, p -> 1, with r(1-p)/p = lambda held fixed (i.e., mean held fixed and variance -> mean). (4) Gamma-Poisson mixture: if Lambda ~ Gamma(shape=r, rate=r(1-p)/p) [or scale=p/(1-p)] and X | Lambda ~ Poisson(Lambda), then marginally X ~ NegBinom(r, p). This gives NegBinom as a Poisson with a random rate, hence overdispersed (Var = mean + mean^2/r > mean). (5) For integer r, NegBinom(r, p) = sum of r independent Geometric(p). (6) NegBinom(r, p) is the Pascal distribution when r is integer; the Polya distribution for r real. The NegBinom interpolates between Geometric (r=1, max overdispersion) and Poisson (r=inf, equidispersion).',
  'ch08p2_negbinom_relations',
  'formula_recall',
  ['negative binomial relations', 'sum of geometric', 'Gamma-Poisson mixture', 'overdispersion']
)
add(
  'How do you compute the mean and variance of a Geometric distribution?',
  'Geometric(p), convention A (support k=1,2,..., PMF p q^{k-1}, q=1-p). Mean E[X] = 1/p. Derivation: E[X] = sum_{k>=1} k p q^{k-1} = p d/dq (sum q^k) = p d/dq (q/(1-q)) = p / (1-q)^2 = p/p^2 = 1/p. Intuitively: success probability p per trial, so expected trials = 1/p. Variance Var(X) = E[X^2] - (E[X])^2. E[X^2] = E[X(X-1)] + E[X]. E[X(X-1)] = sum k(k-1) p q^{k-1} = p q d^2/dq^2 (q/(1-q)) ... = 2q/p^2. So E[X^2] = 2q/p^2 + 1/p = (2q + p)/p^2 = (2-p)/p^2. Var = (2-p)/p^2 - 1/p^2 = (1-p)/p^2 = q/p^2. Standard deviation = sqrt(q)/p. For convention B (Y = X - 1, failures before first success): E[Y] = q/p, Var(Y) = q/p^2. Coefficient of variation = sqrt(q) (always < 1, decreasing as p->1). For p=1/2, E[X]=2, Var=2.',
  'ch08p2_geometric_mean_var',
  'formula_recall',
  ['geometric mean', 'geometric variance', '1/p', 'derivation']
)
add(
  'How do you find the probability that the r-th success occurs on the k-th trial?',
  'Negative Binomial probability: the r-th success occurs on the k-th trial (k >= r) means: among the first k-1 trials there are exactly r-1 successes (and k-r failures), AND the k-th trial is a success. P(X = k) = C(k-1, r-1) p^r (1-p)^{k-r}. Reasoning: choose which r-1 of the first k-1 trials are successes (C(k-1, r-1) ways); those contribute p^{r-1} q^{k-r}; the k-th trial must be a success (p). Total: C(k-1, r-1) p^{r-1} q^{k-r} * p = C(k-1, r-1) p^r q^{k-r}. Example: 3rd head on 5th coin flip (fair coin, p=1/2): C(4,2) (1/2)^3 (1/2)^2 = 6/32 = 3/16. Example: 2nd success on 4th trial with p=0.7: C(3,1) (0.7)^2 (0.3)^2 = 3 * 0.49 * 0.09 = 0.1323. Sum over k from r to inf equals 1 (negative binomial series). Alternative form (failures before r-th success, Y = k - r): P(Y = j) = C(j+r-1, j) p^r q^j, j = 0, 1, ....',
  'ch08p2_negbinom_pmf',
  'problem_solving',
  ['negative binomial PMF', 'r-th success', 'k-th trial', 'combinations']
)
add(
  'What is the relationship between Binomial and Negative Binomial (dual problems)?',
  'Binomial vs Negative Binomial duality: (1) Binomial(n, p): FIXED number of trials n, RANDOM number of successes X. (2) Negative Binomial(r, p): FIXED number of successes r, RANDOM number of trials X needed. They solve inverse problems. Key identity: P(Binomial(n, p) >= r) = P(NegBinom(r, p) <= n). Reasoning: the event "r or more successes in n trials" is the same as "the r-th success occurs on or before the n-th trial." Both express the same underlying experiment. This duality lets you compute one from the other: P(NegBinom(r,p) <= n) = sum_{k=r}^{n} C(k-1,r-1) p^r q^{k-r} = sum_{j=r}^{n} C(n, j) p^j q^{n-j} = P(Bin(n,p) >= r). Example: P(3rd head by 5th flip) = P(Bin(5, 0.5) >= 3) = (10+5+1)/32 = 16/32 = 0.5. Check via NegBinom: sum_{k=3}^{5} C(k-1,2) (0.5)^k = C(2,2)/8 + C(3,2)/16 + C(4,2)/32 = 1/8 + 3/16 + 6/32 = 4/32 + 6/32 + 6/32 = 16/32 = 0.5. ✓',
  'ch08p2_binomial_negbinom_duality',
  'problem_solving',
  ['binomial negative binomial duality', 'inverse problem', 'fixed trials vs fixed successes']
)

// ============================================================
// SECTION 5 — HYPERGEOMETRIC & DISCRETE UNIFORM (6 items)
// ============================================================
add(
  'What is the Hypergeometric distribution?',
  'Hypergeometric distribution: X ~ Hypergeom(N, K, n) = number of successes in n draws WITHOUT replacement from a population of N items, K of which are successes. PMF: P(X = k) = C(K, k) C(N-K, n-k) / C(N, n), for max(0, n-(N-K)) <= k <= min(n, K). Mean: E[X] = n K / N. Variance: Var(X) = n (K/N) (1 - K/N) ((N-n)/(N-1)) = n p (1-p) ((N-n)/(N-1)) where p = K/N. The factor (N-n)/(N-1) is the finite population correction (FPC); Var < Binomial(n, p) because sampling without replacement reduces uncertainty. When N >> n (sampling fraction small), Hypergeom ~ Binomial(n, K/N) (with-replacement limit). Application: quality control (defectives in a sample from a lot), card games (number of aces in a 5-card hand: Hypergeom(52, 4, 5)), ecology (mark-recapture). Symmetry: Hypergeom(N, K, n) = Hypergeom(N, n, K) (exchanging roles of successes and draws).',
  'ch08p2_hypergeometric',
  'formula_recall',
  ['hypergeometric', 'without replacement', 'finite population', 'FPC']
)
add(
  'When does the Hypergeometric approach the Binomial distribution?',
  'Hypergeometric -> Binomial limit: when the population N is large relative to the sample n (sampling fraction n/N -> 0), the Hypergeometric(N, K, n) with K/N = p approaches Binomial(n, p). Reasoning: without-replacement vs with-replacement differ negligibly when the population is huge — removing a few items barely changes the success probability for the next draw. Formally, C(K, k) C(N-K, n-k) / C(N, n) -> C(n, k) p^k (1-p)^{n-k} as N -> inf with K/N = p fixed. Rule of thumb: Binomial approximation good when n/N <= 0.05 (sample <= 5% of population). The finite population correction (N-n)/(N-1) -> 1 as N/n -> inf, so Var(Hypergeom) -> n p (1-p) = Var(Binomial). Example: 10 defectives in 1000 items, sample 20: Hypergeom(1000, 10, 20) mean = 20*10/1000 = 0.2; Binomial(20, 0.01) mean = 0.2; variances: Hypergeom = 20(0.01)(0.99)(980/999) ~ 0.194, Binomial = 20(0.01)(0.99) = 0.198 (close). For n/N = 20/1000 = 0.02 < 0.05, Binomial approx excellent.',
  'ch08p2_hypergeometric_binomial',
  'formula_recall',
  ['hypergeometric to binomial', 'large population', 'sampling fraction', 'FPC to 1']
)
add(
  'What is the mean and variance of the Hypergeometric distribution?',
  'Hypergeometric(N, K, n), with p = K/N. Mean: E[X] = n p = n K/N (same as Binomial). Variance: Var(X) = n p (1-p) * (N-n)/(N-1). The factor (N-n)/(N-1) is the Finite Population Correction (FPC); always <= 1 (for n >= 1), equals 1 only when n=1 (trivial) or in the limit N->inf. FPC reduces variance because without-replacement sampling is more informative (each draw reveals info about remaining). Derivation: X = sum_{i=1}^n I_i where I_i = indicator of success on draw i. E[I_i] = K/N = p. Var(I_i) = p(1-p). Cov(I_i, I_j) = -p(1-p)/(N-1) (negative: drawing a success lowers chance next is success). Var(X) = sum Var(I_i) + 2 sum_{i<j} Cov = n p(1-p) + n(n-1) * (-p(1-p)/(N-1)) = n p(1-p) [1 - (n-1)/(N-1)] = n p(1-p) (N-n)/(N-1). For N=52, K=4, n=5 (aces in 5-card hand): mean = 5*4/52 ~ 0.385; var = 5*(4/52)*(48/52)*(47/51) ~ 0.322.',
  'ch08p2_hypergeometric_mean_var',
  'formula_recall',
  ['hypergeometric mean variance', 'finite population correction', 'FPC', 'covariance indicator']
)
add(
  'What is the discrete uniform distribution?',
  'Discrete uniform distribution: X ~ Uniform{1, 2, ..., N} (or sometimes {a, a+1, ..., b}). PMF: P(X = k) = 1/N for k = 1, ..., N (equal probability). CDF: F(k) = k/N for k in {1, ..., N} (floor(x)/N for general x). Mean: E[X] = (N+1)/2. Variance: Var(X) = (N^2 - 1)/12. Standard deviation: sqrt((N^2-1)/12). MGF: M(t) = (e^t (e^{Nt} - 1)) / (N (e^t - 1)) = (1/N) sum_{k=1}^N e^{k t}. PGF: G(s) = (s (s^N - 1))/(N (s - 1)) = (1/N) sum s^k. Skewness: 0 (symmetric). Excess kurtosis: -(6(N^2+1))/(5(N^2-1)) (negative, platykurtic). Special: fair die = Uniform{1,...,6}, E=3.5, Var=35/12 ~ 2.917. Generalization to {a,...,b} (b-a+1 values): E = (a+b)/2, Var = ((b-a+1)^2 - 1)/12. Application: fair die, roulette wheel, random selection from a finite set, encryption salts. Maximum entropy distribution on a finite set (no info beyond support).',
  'ch08p2_discrete_uniform',
  'formula_recall',
  ['discrete uniform', 'equal probability', 'fair die', 'maximum entropy']
)
add(
  'How do you compute the mean and variance of a discrete uniform distribution?',
  'Discrete Uniform{1, ..., N}. Mean: E[X] = (1/N) sum_{k=1}^N k = (1/N) * N(N+1)/2 = (N+1)/2. Variance: Var(X) = E[X^2] - (E[X])^2. E[X^2] = (1/N) sum k^2 = (1/N) * N(N+1)(2N+1)/6 = (N+1)(2N+1)/6. Var = (N+1)(2N+1)/6 - ((N+1)/2)^2 = (N+1)/12 * [2(2N+1) - 3(N+1)] = (N+1)/12 * [4N + 2 - 3N - 3] = (N+1)(N-1)/12 = (N^2 - 1)/12. For N=6 (die): E = 7/2 = 3.5, Var = 35/12 ~ 2.917, SD ~ 1.708. For N=2 (fair coin coded 1,2): E = 1.5, Var = 3/12 = 0.25. Generalization to {a, ..., b}: let m = b - a + 1 = number of values. E = a + (m-1)/2 = (a+b)/2. Var = (m^2 - 1)/12 = ((b-a+1)^2 - 1)/12. Continuous limit: as N->inf with appropriate scaling, discrete uniform -> continuous uniform on the interval.',
  'ch08p2_uniform_mean_var',
  'formula_recall',
  ['discrete uniform mean', 'discrete uniform variance', 'N+1 over 2', 'N^2-1 over 12']
)
add(
  'What is the maximum entropy property of the discrete uniform distribution?',
  'Maximum entropy: among all discrete distributions on a finite set {1, 2, ..., N}, the discrete uniform P(X=k) = 1/N maximizes the Shannon entropy H(X) = -sum p_k log p_k. Proof (Lagrange multipliers): maximize H subject to sum p_k = 1; L = -sum p_k log p_k - lambda (sum p_k - 1); dL/dp_k = -log p_k - 1 - lambda = 0 => p_k = e^{-1-lambda} (same for all k); normalization gives p_k = 1/N. Max entropy = log N (nats) or log_2 N (bits). Interpretation: uniform represents maximum ignorance — no outcome favored. If any constraint is added (e.g., fixed mean), the max-entropy distribution changes (e.g., fixed mean on {0,1,...} => Geometric; fixed mean and variance on R => Normal). Connection: continuous uniform on [a, b] is max entropy among continuous distributions on [a, b] with no other constraint. The principle of maximum entropy (Jaynes) selects uniform as the least-informative prior on a finite set, justifying the classical (Laplace) definition of probability.',
  'ch08p2_uniform_max_entropy',
  'formula_recall',
  ['maximum entropy', 'discrete uniform', 'Shannon entropy', 'Jaynes']
)

// ============================================================
// SECTION 6 — MGF, PGF, SUMS & CONVOLUTIONS (8 items)
// ============================================================
add(
  'How do you compute the moment generating function of a discrete RV?',
  'Moment generating function (MGF) of discrete RV X: M_X(t) = E[e^{tX}] = sum_x e^{tx} p_X(x), for t where the sum converges. Properties: M(0) = 1; M^{(k)}(0) = E[X^k] (k-th moment, if exists); uniquely determines distribution if M exists in open interval around 0; M_{aX+b}(t) = e^{bt} M_X(at); for independent X, Y: M_{X+Y}(t) = M_X(t) M_Y(t). Common discrete MGFs: Bernoulli(p): 1-p + p e^t. Binomial(n,p): (1-p + p e^t)^n. Poisson(lambda): exp(lambda(e^t - 1)). Geometric(p) [conv A]: p e^t / (1 - q e^t), t < -ln q. NegBinom(r,p): [p e^t / (1 - q e^t)]^r. Discrete Uniform{1..N}: (e^t (e^{Nt}-1))/(N(e^t - 1)). Hypergeom: involves a hypergeometric function (hence the name). MGFs are the easiest way to find moments and to identify distributions of sums of independent RVs. The log-MGF cumulant generating function K(t) = log M(t) has derivatives giving cumulants (mean, variance, ...).',
  'ch08p2_discrete_mgf_computation',
  'formula_recall',
  ['MGF discrete', 'moment generating function', 'common MGFs', 'uniqueness']
)
add(
  'What is the probability generating function and how does it relate to the MGF?',
  'Probability generating function (PGF) of nonneg integer-valued RV X: G_X(s) = E[s^X] = sum_{k=0}^inf p_X(k) s^k. Converges for |s| <= 1 always. Properties: G(1) = 1; G\'(1) = E[X]; G\'\'(1) = E[X(X-1)]; in general G^{(k)}(1) = E[X(X-1)...(X-k+1)] (factorial moments). Var(X) = G\'\'(1) + G\'(1) - (G\'(1))^2. For independent X, Y (nonneg integer): G_{X+Y}(s) = G_X(s) G_Y(s) (PGF of sum = product). Common PGFs: Bernoulli(p): 1-p + ps. Binomial(n,p): (1-p + ps)^n. Poisson(lambda): exp(lambda(s-1)). Geometric(p) [conv B, failures before 1st success]: p / (1 - q s). NegBinom(r, p): [p / (1 - q s)]^r. Relation to MGF: M_X(t) = G_X(e^t) (substitute s = e^t). Relation to characteristic function: phi_X(u) = G_X(e^{iu}). PGFs are more natural than MGFs for discrete RVs (always exist, easy products for sums) and are central to branching processes and queueing theory.',
  'ch08p2_pgf_relation_mgf',
  'formula_recall',
  ['PGF', 'probability generating function', 'factorial moments', 'relation to MGF']
)
add(
  'How do you find the distribution of a sum of independent discrete RVs?',
  'Distribution of a sum S = X_1 + ... + X_n of independent discrete RVs: (1) Convolution of PMFs: P(S = k) = sum_{x_1+...+x_n = k} prod p_{X_i}(x_i); for two: P(X+Y = k) = sum_j p_X(j) p_Y(k - j) (convolution). (2) MGF method: M_S(t) = prod M_{X_i}(t); identify S by matching to known MGF. (3) PGF method (nonneg integer): G_S(s) = prod G_{X_i}(s); expand or match. Examples: Binomial: Bin(n_1, p) + Bin(n_2, p) = Bin(n_1+n_2, p) (same p required). Poisson: Pois(lambda_1) + Pois(lambda_2) = Pois(lambda_1 + lambda_2) (always). NegBinom: NegBin(r_1, p) + NegBin(r_2, p) = NegBin(r_1+r_2, p) (same p). Geometric: sum of r iid Geom(p) = NegBin(r, p). Different distributions: e.g., Bin(n, p) + Pois(lambda) has MGF (1-p+pe^t)^n * exp(lambda(e^t-1)) — a convolutional sum, not a standard named distribution. The MGF/PGF approach is usually cleanest.',
  'ch08p2_sum_independent',
  'formula_recall',
  ['sum of independent RVs', 'convolution', 'MGF product', 'PGF product']
)
add(
  'What are factorial moments and how are they computed from the PGF?',
  'Factorial moments of a nonneg integer-valued RV X: the k-th factorial moment is mu_{(k)} = E[X(X-1)(X-2)...(X-k+1)] = E[(X)_k] (falling factorial). From the PGF: G_X^{(k)}(1) = mu_{(k)} (k-th derivative of PGF evaluated at s=1). Relation to ordinary moments: E[X] = mu_{(1)}. E[X^2] = mu_{(2)} + mu_{(1)} (since X^2 = X(X-1) + X). E[X^3] = mu_{(3)} + 3 mu_{(2)} + mu_{(1)} (Stirling numbers of the second kind convert between ordinary and factorial moments: X^n = sum S(n,k) (X)_k). Variance: Var(X) = mu_{(2)} + mu_{(1)} - mu_{(1)}^2. Advantages: for many discrete distributions (Poisson, Binomial, NegBinom), factorial moments have simpler closed forms than ordinary moments. Examples: Poisson(lambda): mu_{(k)} = lambda^k (all factorial moments = lambda^k). Binomial(n,p): mu_{(k)} = (n)_k p^k = n(n-1)...(n-k+1) p^k. NegBinom(r,p): mu_{(k)} = (r)_k (q/p)^k * (something) — generally (r)^{overline{k}} (q/p)^k (rising factorial).',
  'ch08p2_factorial_moments',
  'formula_recall',
  ['factorial moments', 'PGF derivative', 'falling factorial', 'Stirling numbers']
)
add(
  'What is the convolution formula for the PMF of X + Y?',
  'Convolution of PMFs: for X, Y independent discrete RVs, the PMF of S = X + Y is p_S(s) = sum_x p_X(x) p_Y(s - x) (sum over all x in support of X such that s - x in support of Y). Equivalently p_S(s) = sum_y p_X(s - y) p_Y(y). For nonneg integer RVs: p_S(k) = sum_{j=0}^{k} p_X(j) p_Y(k - j). The operation is commutative and associative; for n iid RVs, n-fold convolution. Example: two fair dice (Uniform{1..6}): P(sum=7) = sum_{j=1}^{6} P(X=j) P(Y=7-j) = 6 * (1/6)(1/6) = 6/36 = 1/6. Generating function shortcut: G_S(s) = G_X(s) G_Y(s); expanding the product recovers the convolution. FFT-based convolution: for large supports, compute p_S in O(n log n) via FFT of p_X and p_Y. Continuous analog: f_S(s) = integral f_X(x) f_Y(s-x) dx. The convolution formula underlies all "sum of independent RVs" computations.',
  'ch08p2_convolution_pmf',
  'formula_recall',
  ['convolution', 'PMF of sum', 'independent sum', 'two dice']
)
add(
  'What are cumulants and the cumulant generating function?',
  'Cumulant generating function (CGF): K_X(t) = log M_X(t) = log E[e^{tX}]. The k-th cumulant kappa_k = K^{(k)}(0). Properties: (1) kappa_1 = E[X] (mean). (2) kappa_2 = Var(X). (3) kappa_3 = E[(X-mu)^3] (third central moment = skewness * sigma^3). (4) kappa_4 = E[(X-mu)^4] - 3 Var(X)^2 (excess kurtosis * sigma^4). (5) For independent X, Y: K_{X+Y}(t) = K_X(t) + K_Y(t) (cumulants ADD for independent RVs — the key advantage over moments). (6) For aX: kappa_k(aX) = a^k kappa_k(X). Common cumulants: Poisson(lambda) — ALL cumulants = lambda (kappa_k = lambda for all k >= 1). Normal(mu, sigma^2) — kappa_1 = mu, kappa_2 = sigma^2, kappa_k = 0 for k >= 3 (only first two cumulants nonzero). Bernoulli(p): kappa_1 = p, kappa_k = derivative-related (involve Bernoulli numbers). Cumulants measure deviation from normality (higher cumulants -> non-Gaussian). Edgeworth expansion uses cumulants to approximate distributions near normal.',
  'ch08p2_cumulants',
  'formula_recall',
  ['cumulants', 'cumulant generating function', 'log MGF', 'additivity']
)
add(
  'What is the standardization (z-score) of a random variable?',
  'Standardization (z-score): for a RV X with mean mu and standard deviation sigma > 0, the standardized RV is Z = (X - mu) / sigma. Properties: E[Z] = 0, Var(Z) = 1, SD(Z) = 1. Z is dimensionless (units removed), enabling comparison across different scales. For X ~ Normal(mu, sigma^2), Z ~ Normal(0, 1) (standard normal). For any RV with finite variance, by Chebyshev: P(|Z| >= k) <= 1/k^2. Z-scores are used in: (1) hypothesis testing (compare observed X to null distribution via z = (x - mu_0)/sigma_0); (2) grading (relative performance); (3) outlier detection (|Z| > 2 or 3 flagged); (4) CLT (sum standardized -> N(0,1)). Caution: standardization does NOT make a non-normal RV normal; it only rescales. The standardized Binomial (X - np)/sqrt(npq) -> N(0,1) by De Moivre-Laplace. Standardized Poisson: (X - lambda)/sqrt(lambda) -> N(0,1) as lambda -> inf.',
  'ch08p2_standardization',
  'formula_recall',
  ['standardization', 'z-score', 'mean 0 variance 1', 'dimensionless']
)
add(
  'How do you compute E[X^2] from the variance, and vice versa?',
  'Relation: Var(X) = E[X^2] - (E[X])^2, so E[X^2] = Var(X) + (E[X])^2. Equivalently, E[X^2] = Var(X) + mu^2 where mu = E[X]. This is the standard way to compute E[X^2] when variance and mean are known (often easier than direct computation). Examples: Bernoulli(p): E[X] = p, Var = p(1-p), so E[X^2] = p(1-p) + p^2 = p. (Check: X^2 = X for Bernoulli, so E[X^2] = E[X] = p. ✓). Binomial(n,p): E[X^2] = np(1-p) + (np)^2 = np + n(n-1)p^2. Poisson(lambda): E[X^2] = lambda + lambda^2. Geometric(p) [conv A]: E[X^2] = q/p^2 + 1/p^2 = (1 + q)/p^2 = (2-p)/p^2. Reverse: given E[X^2] and E[X], Var = E[X^2] - (E[X])^2. The identity underlies the computational formula for variance and is central to moment calculations. Higher moments: E[X^3], E[X^4] require more info (skewness, kurtosis) or direct computation.',
  'ch08p2_ex2_from_var',
  'problem_solving',
  ['E[X^2]', 'variance identity', 'computational formula', 'second moment']
)

// ============================================================
// SECTION 7 — WORKED PROBLEMS (7 items)
// ============================================================
add(
  'A fair coin is flipped 10 times. What is the probability of exactly 7 heads?',
  'Binomial problem. X ~ Binomial(n=10, p=0.5). P(X = 7) = C(10, 7) p^7 (1-p)^3 = C(10, 7) (0.5)^7 (0.5)^3 = C(10,7) (0.5)^10 = 120 / 1024 = 15/128 ~ 0.1172. So ~11.72% chance of exactly 7 heads in 10 flips of a fair coin. Also: P(X >= 7) = P(X=7) + P(X=8) + P(X=9) + P(X=10) = [C(10,7) + C(10,8) + C(10,9) + C(10,10)] / 1024 = [120 + 45 + 10 + 1]/1024 = 176/1024 ~ 0.1719. Mean = np = 5, Var = np(1-p) = 2.5, SD ~ 1.58. z-score for 7: (7 - 5)/1.58 ~ 1.26. By normal approx with continuity correction: P(6.5 <= X <= 7.5) ~ P(0.95 <= Z <= 1.58) ~ 0.943 - 0.829 = 0.114 (close to exact 0.117).',
  'ch08p2_worked_binomial_heads',
  'problem_solving',
  ['binomial worked', '10 flips', 'exactly 7 heads', 'C(10,7)']
)
add(
  'A call center receives 3 calls per minute on average. What is P(exactly 5 calls in a minute)?',
  'Poisson problem. X ~ Poisson(lambda = 3) calls per minute. P(X = 5) = e^{-lambda} lambda^5 / 5! = e^{-3} * 3^5 / 120 = e^{-3} * 243 / 120 = e^{-3} * 2.025. e^{-3} ~ 0.0498. So P(X=5) ~ 0.0498 * 2.025 ~ 0.1008. About 10.08% chance. Other useful quantities: P(X = 0) = e^{-3} ~ 0.0498 (no calls); P(X <= 2) = e^{-3}(1 + 3 + 9/2) = e^{-3} * 8.5 ~ 0.423 (at most 2 calls); P(X >= 5) = 1 - P(X <= 4) = 1 - e^{-3}(1 + 3 + 4.5 + 4.5 + 3.375) = 1 - e^{-3} * 16.375 ~ 1 - 0.815 = 0.185. Mean = 3, Var = 3, SD ~ 1.73. The Poisson assumption (stationary, independent increments, rate 3/min) is reasonable for a call center in steady state. Over 10 minutes: Poisson(30), P(X=30) ~ 1/sqrt(2 pi * 30) ~ 0.073 (normal approx).',
  'ch08p2_worked_poisson_calls',
  'problem_solving',
  ['Poisson worked', 'call center', 'exactly 5 calls', 'lambda 3']
)
add(
  'You roll a fair die repeatedly. What is the expected number of rolls until the first 6?',
  'Geometric problem. X ~ Geometric(p = 1/6) = number of rolls until first 6. E[X] = 1/p = 6 rolls. Variance: Var(X) = (1-p)/p^2 = (5/6)/(1/36) = (5/6)*36 = 30; SD ~ 5.48. P(X = k) = (5/6)^{k-1} (1/6). P(X = 1) = 1/6 ~ 0.167 (first roll is a 6). P(X <= 6) = 1 - (5/6)^6 ~ 1 - 0.335 = 0.665 (get a 6 within 6 rolls). P(X > 6) = (5/6)^6 ~ 0.335 (no 6 in first 6 rolls). Median: smallest m with P(X <= m) >= 0.5 => 1 - (5/6)^m >= 0.5 => (5/6)^m <= 0.5 => m >= log(0.5)/log(5/6) ~ 3.80 => median = 4. Memoryless: given no 6 in first 10 rolls, expected additional rolls = 6 still. By contrast, expected rolls until all 6 faces appear (coupon collector) = 6 * H_6 = 6 * (1 + 1/2 + 1/3 + 1/4 + 1/5 + 1/6) = 6 * 2.45 = 14.7.',
  'ch08p2_worked_geometric_die',
  'problem_solving',
  ['geometric worked', 'first 6', 'expected rolls', 'die']
)
add(
  'In a 5-card poker hand from a standard 52-card deck, what is the probability of exactly 2 aces?',
  'Hypergeometric problem. Population N = 52 cards, K = 4 aces (successes), sample n = 5 cards without replacement. X ~ Hypergeom(52, 4, 5) = number of aces. P(X = 2) = C(K, 2) C(N-K, n-2) / C(N, n) = C(4, 2) C(48, 3) / C(52, 5). Compute: C(4, 2) = 6; C(48, 3) = 48*47*46/6 = 17296; C(52, 5) = 2598960. So P(X = 2) = 6 * 17296 / 2598960 = 103776 / 2598960 ~ 0.03993. About 3.99% chance of exactly 2 aces. Mean: E[X] = n K/N = 5*4/52 ~ 0.385. Variance: n (K/N)(1-K/N)(N-n)/(N-1) = 5*(4/52)*(48/52)*(47/51) ~ 0.322. P(X = 0) = C(48,5)/C(52,5) ~ 0.659 (most common — no aces). P(X = 1) ~ 0.299. P(X = 2) ~ 0.040. P(X = 3) ~ 0.0017. P(X = 4) ~ 1.8e-5. P(at least 1 ace) = 1 - 0.659 ~ 0.341. For comparison, Binomial approx with p = 4/52 ~ 0.077: P(X=2) = C(5,2)(0.077)^2(0.923)^3 ~ 0.039 (close, since n/N = 5/52 ~ 0.096, borderline).',
  'ch08p2_worked_hypergeom_aces',
  'problem_solving',
  ['hypergeometric worked', 'poker hand', 'exactly 2 aces', '5 cards']
)
add(
  'A basketball player makes 80% of free throws. What is the probability the 3rd make occurs on the 5th attempt?',
  'Negative Binomial problem. X ~ NegBinom(r = 3, p = 0.8) = number of attempts until the 3rd successful free throw. P(X = 5) = C(5-1, 3-1) p^3 (1-p)^{5-3} = C(4, 2) (0.8)^3 (0.2)^2 = 6 * 0.512 * 0.04 = 6 * 0.02048 = 0.12288. So ~12.29% chance that the 3rd make occurs exactly on the 5th attempt. Reasoning: among the first 4 attempts, exactly 2 are makes (C(4,2) = 6 orderings), and the 5th attempt must be a make (probability 0.8). Mean: E[X] = r/p = 3/0.8 = 3.75 attempts. Var = r(1-p)/p^2 = 3 * 0.2 / 0.64 = 0.9375; SD ~ 0.968. Mode = floor((r-1)(1-p)/p + 1) ... for r=3, p=0.8: mode of failures = floor((r-1)(1-p)/p) = floor(2*0.25) = 0 failures (i.e., X=3, three makes in a row, prob 0.512). P(X=3) = C(2,2)(0.8)^3 = 0.512. P(X=4) = C(3,2)(0.8)^3(0.2) = 3*0.512*0.2 = 0.3072. P(X=5) = 0.1229 (computed).',
  'ch08p2_worked_negbinom_freethrow',
  'problem_solving',
  ['negative binomial worked', 'free throw', '3rd make on 5th', 'basketball']
)
add(
  'A factory produces 2% defective items. In a sample of 100, what is P(at most 3 defectives)?',
  'Binomial/Poisson problem. X ~ Binomial(n=100, p=0.02). Exact: P(X <= 3) = sum_{k=0}^3 C(100,k) (0.02)^k (0.98)^{100-k}. Compute: P(X=0) = (0.98)^100 ~ 0.1326. P(X=1) = 100 * 0.02 * (0.98)^99 ~ 0.2707. P(X=2) = C(100,2)(0.02)^2(0.98)^98 ~ 0.2734. P(X=3) = C(100,3)(0.02)^3(0.98)^97 ~ 0.1823. Sum: P(X <= 3) ~ 0.1326 + 0.2707 + 0.2734 + 0.1823 = 0.859. So ~85.9% chance of at most 3 defectives. Poisson approximation (lambda = np = 2): P(X <= 3) = e^{-2}(1 + 2 + 2 + 8/6) = e^{-2} * 7.333 ~ 0.1353 * 7.333 ~ 0.993 (hmm, let me recompute: e^{-2} * (1 + 2 + 2^2/2 + 2^3/6) = e^{-2}*(1+2+2+1.333) = e^{-2}*6.333 ~ 0.1353*6.333 ~ 0.857). So Poisson gives ~85.7%, very close to exact 85.9% (lambda=2 small, n=100 large, p=0.02 small — Poisson approx valid). Mean = 2, Var = 1.96 (Bin) or 2 (Pois).',
  'ch08p2_worked_defectives',
  'problem_solving',
  ['binomial worked', 'defectives', 'Poisson approximation', 'sample 100']
)
add(
  'A die is rolled. Let X be the outcome. Compute E[X], Var(X), and E[X^2].',
  'Discrete uniform problem. X ~ Uniform{1, 2, 3, 4, 5, 6} (fair die). PMF: P(X=k) = 1/6 for k=1..6. E[X] = (1/6) sum_{k=1}^6 k = (1/6) * 21 = 3.5. Formula: E[X] = (N+1)/2 = 7/2 = 3.5. E[X^2] = (1/6) sum k^2 = (1/6) * (1 + 4 + 9 + 16 + 25 + 36) = (1/6)*91 = 91/6 ~ 15.167. Formula: E[X^2] = (N+1)(2N+1)/6 = 7*13/6 = 91/6. Var(X) = E[X^2] - (E[X])^2 = 91/6 - (7/2)^2 = 91/6 - 49/4 = (182 - 147)/12 = 35/12 ~ 2.917. Formula: Var = (N^2-1)/12 = 35/12. SD = sqrt(35/12) ~ 1.708. Other moments: E[X^3] = (1/6) sum k^3 = (1/6)*441 = 73.5 (formula [N(N+1)/2]^2 / N = 441/6 = 73.5). E[X^4] = (1/6) sum k^4 = 2275/6 ~ 379.17. Skewness = 0 (symmetric). Excess kurtosis = -(6(N^2+1))/(5(N^2-1)) = -(6*37)/(5*35) = -222/175 ~ -1.269 (platykurtic, flatter than normal).',
  'ch08p2_worked_die_moments',
  'problem_solving',
  ['discrete uniform worked', 'die moments', 'E[X] 3.5', 'Var 35/12']
)

// ============================================================
// VALIDATION & WRITE
// ============================================================

// De-dup check on topics
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

// Validate fields
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
  subject: 'mathematics_formulas_volume_9_chapter_08_part_02',
  volume:
    'Volume 9 — Comprehensive Formula Encyclopedia, Chapter 8 Part 2 (Discrete Random Variables — Discrete RV Basics PMF CDF Expectation Variance, Bernoulli & Binomial Distributions, Poisson Distribution & Poisson Process, Geometric & Negative Binomial Distributions, Hypergeometric & Discrete Uniform Distributions, MGF PGF Sums & Convolutions, Worked Problems)',
  source: 'TRIZA Generated Formula Dataset',
  language: 'en',
  religionNeutral: true,
  items,
}

mkdirSync('data', { recursive: true })
writeFileSync('data/math-formulas-vol9-ch08p2.json', JSON.stringify(out, null, 2))

console.log(`Wrote data/math-formulas-vol9-ch08p2.json with ${items.length} items.`)
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
