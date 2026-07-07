/**
 * ============================================================
 *  Mathematics Formula Encyclopedia — Volume 9
 *  Comprehensive Formula Reference
 *  Chapter 8 — Part 3 (Continuous Random Variables)
 *  Continuous RV Basics: PDF, CDF, Expectation, Variance,
 *  Uniform & Exponential Distributions,
 *  Normal (Gaussian) Distribution,
 *  Gamma, Beta & Chi-Square Distributions,
 *  Weibull, Cauchy, Lognormal & Other Continuous Distributions,
 *  Functions of RVs & Transformations,
 *  Worked Problems
 *  Generator for TRIZA
 * ============================================================
 *
 *  Output: data/math-formulas-vol9-ch08p3.json
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
// SECTION 1 — CONTINUOUS RV BASICS: PDF, CDF, EXPECTATION, VARIANCE (8 items)
// ============================================================
add(
  'What is a continuous random variable and its probability density function (PDF)?',
  'A continuous random variable X has an uncountable support (an interval or union of intervals in R). The probability density function (PDF) f_X: R -> [0, inf) satisfies: (1) f_X(x) >= 0; (2) integral_{-inf}^{inf} f_X(x) dx = 1. Probabilities come from integrating the PDF: P(a <= X <= b) = integral_a^b f_X(x) dx. For a single point, P(X = c) = 0 (integral over a point is 0). The CDF is F_X(x) = P(X <= x) = integral_{-inf}^x f_X(t) dt; if F is differentiable, f_X(x) = F_X\'(x). Properties of CDF: non-decreasing, right-continuous (continuous for continuous RV), lim_{x->-inf} F = 0, lim_{x->+inf} F = 1. P(a < X <= b) = F(b) - F(a). Density can exceed 1 (it is a density, not a probability); only its integral is bounded by 1. Example: Uniform(0, 0.5) has f = 2 on [0, 0.5] (f > 1 but integral = 1).',
  'ch08p3_continuous_rv_pdf',
  'formula_recall',
  ['continuous random variable', 'PDF', 'probability density function', 'density']
)
add(
  'What is the expected value of a continuous random variable?',
  'Expected value of continuous RV X with PDF f_X: E[X] = integral_{-inf}^{inf} x f_X(x) dx, provided integral |x| f_X(x) dx < infinity (absolute convergence). If the integral of |x| f diverges, E[X] is undefined (e.g., Cauchy distribution has no mean). Interpretation: the "center of mass" of the density. Properties: E[c] = c; E[cX] = cE[X]; E[X + Y] = E[X] + E[Y] (linearity); E[g(X)] = integral g(x) f_X(x) dx (LOTUS). Examples: Uniform(a,b): E = (a+b)/2. Exponential(lambda): E = 1/lambda. Normal(mu, sigma^2): E = mu. Gamma(alpha, beta) [rate]: E = alpha/beta. Cauchy: E undefined (no mean). Median: value m with F(m) = 0.5; mode: argmax f. Mean and median coincide for symmetric distributions (Normal, Uniform, Cauchy-formally). For skewed (Exponential, Gamma), mean > median > mode typically.',
  'ch08p3_continuous_expected_value',
  'formula_recall',
  ['continuous expected value', 'mean', 'center of mass', 'LOTUS continuous']
)
add(
  'What is the variance and standard deviation of a continuous random variable?',
  'Variance of continuous RV X: Var(X) = E[(X - mu)^2] = integral (x - mu)^2 f_X(x) dx. Computational formula: Var(X) = E[X^2] - (E[X])^2 = integral x^2 f_X(x) dx - mu^2. Standard deviation sigma = sqrt(Var). Properties: Var(c) = 0; Var(cX) = c^2 Var(X); Var(X + c) = Var(X); Var(X + Y) = Var(X) + Var(Y) + 2 Cov(X,Y); independence gives Var(X+Y) = Var(X) + Var(Y). Examples: Uniform(a,b): Var = (b-a)^2/12. Exponential(lambda): Var = 1/lambda^2. Normal(mu,sigma^2): Var = sigma^2. Gamma(alpha, beta) [rate]: Var = alpha/beta^2. Cauchy: Var undefined (no mean). Chebyshev: P(|X - mu| >= k sigma) <= 1/k^2. For symmetric unimodal densities, Chebyshev is loose; the Gauss inequality gives tighter bounds for symmetric unimodal: P(|X - mu| >= k sigma) <= 4/(9k^2).',
  'ch08p3_continuous_variance',
  'formula_recall',
  ['continuous variance', 'standard deviation', 'computational formula', 'Chebyshev continuous']
)
add(
  'What is the cumulative distribution function (CDF) for a continuous RV and how is it used?',
  'CDF of continuous RV X: F_X(x) = P(X <= x) = integral_{-inf}^x f_X(t) dt. Properties: (1) non-decreasing (monotone); (2) lim_{x->-inf} F = 0; (3) lim_{x->+inf} F = 1; (4) continuous (for continuous RV — no jumps, unlike discrete); (5) differentiable a.e. with F\' = f. Computations: P(a < X < b) = F(b) - F(a); P(X > x) = 1 - F(x); P(X < x) = F(x) (since P(X=x)=0 for continuous); median m: F(m) = 0.5; quantile q_p: F(q_p) = p (inverse CDF / percentile function). The CDF uniquely determines the distribution. For monotone transformations Y = g(X), F_Y(y) = P(g(X) <= y); if g increasing, F_Y(y) = F_X(g^{-1}(y)). The CDF approach is often easier than the change-of-variables formula for monotone g. Example: Y = X^2 with X ~ Uniform(-1, 1), F_Y(y) = P(X^2 <= y) = P(-sqrt(y) <= X <= sqrt(y)) = sqrt(y) for y in [0, 1]; f_Y(y) = 1/(2 sqrt(y)).',
  'ch08p3_continuous_cdf',
  'formula_recall',
  ['continuous CDF', 'quantile', 'percentile', 'inverse CDF']
)
add(
  'What is the median, mode, and quantiles of a continuous random variable?',
  'For continuous RV X with PDF f and CDF F: (1) Median m: F(m) = 0.5, i.e., P(X <= m) = P(X >= m) = 0.5. The median is robust to outliers (unlike mean) and exists for any continuous RV (even Cauchy, which has no mean). For symmetric distributions, median = mean. (2) Mode: value x* where f_X(x*) = max f_X (the peak of the density). A distribution can be unimodal (one peak), bimodal (two), multimodal. Normal: mode = mu. Exponential: mode = 0. Uniform: every point in [a,b] is a mode. (3) Quantile q_p (p-th percentile, 0 < p < 1): F(q_p) = p, i.e., q_p = F^{-1}(p) (inverse CDF). Common: q_0.25 = first quartile (Q1), q_0.5 = median, q_0.75 = third quartile (Q3). Interquartile range IQR = Q3 - Q1 (robust spread measure). Quantiles are used in box plots, confidence intervals (e.g., z_{0.025} = -1.96 for 95% CI), and Q-Q plots for normality checks. For Normal(0,1), q_p = Phi^{-1}(p); standard z-table gives these.',
  'ch08p3_median_mode_quantiles',
  'formula_recall',
  ['median', 'mode', 'quantile', 'percentile', 'IQR']
)
add(
  'What is the law of the unconscious statistician (LOTUS) for continuous RVs?',
  'LOTUS for continuous RVs: E[g(X)] = integral_{-inf}^{inf} g(x) f_X(x) dx, where f_X is the PDF of X. You do NOT need to find the distribution of Y = g(X) first — just integrate g(X) against the density of X. Examples: E[X^2] = integral x^2 f_X(x) dx (used for variance). E[e^{tX}] = integral e^{tx} f_X(x) dx (MGF). E[X^k] = integral x^k f_X(x) dx (k-th moment). E[(X - mu)^k] = integral (x-mu)^k f_X(x) dx (k-th central moment). For g monotone, an alternative is the change-of-variables / CDF method to find f_Y then integrate, but LOTUS is usually simpler. Generalization: E[g(X, Y)] = double integral g(x, y) f_{X,Y}(x, y) dx dy. Jensen (convex g): E[g(X)] >= g(E[X]) (e.g., (E[X])^2 <= E[X^2]). Application: compute E[1/X], E[log X], E[e^X] directly without deriving the transformed distribution.',
  'ch08p3_continuous_lotus',
  'formula_recall',
  ['LOTUS continuous', 'E[g(X)]', 'Jensen continuous', 'moment integral']
)
add(
  'What are moments and the moment generating function of a continuous RV?',
  'k-th moment of continuous RV X: mu_k = E[X^k] = integral x^k f_X(x) dx. k-th central moment: E[(X - mu)^k]. Mean = mu_1, variance = mu_2 - mu_1^2 (or second central moment). Moment generating function (MGF): M_X(t) = E[e^{tX}] = integral e^{tx} f_X(x) dx. If M_X exists in a neighborhood of 0, it uniquely determines the distribution and M_X^{(k)}(0) = E[X^k] (k-th moment). Properties: M_{aX+b}(t) = e^{bt} M_X(at); independence => M_{X+Y}(t) = M_X(t) M_Y(t). Common continuous MGFs: Uniform(a,b) = (e^{bt} - e^{at})/((b-a)t). Exponential(lambda) = lambda/(lambda - t), t < lambda. Normal(mu, sigma^2) = exp(mu t + sigma^2 t^2/2). Gamma(alpha, beta) [rate beta] = (beta/(beta - t))^alpha, t < beta. Chi-square(k) = (1 - 2t)^{-k/2}, t < 1/2 (special case of Gamma). Cauchy: MGF does not exist (no integral converges except t=0). Characteristic function phi_X(u) = E[e^{iuX}] always exists and also uniquely determines distribution.',
  'ch08p3_continuous_moments_mgf',
  'formula_recall',
  ['continuous moments', 'MGF continuous', 'characteristic function', 'common MGFs']
)
add(
  'What is the survival function and hazard rate of a continuous RV?',
  'Survival function: S_X(x) = P(X > x) = 1 - F_X(x). For a nonneg RV (lifetime), S(0) = 1 and S decreases to 0. Hazard rate (instantaneous failure rate): h_X(x) = f_X(x) / S_X(x) = -d/dx log S_X(x) = f_X(x) / (1 - F_X(x)). Interpretation: h(x) dx ~ P(X in (x, x+dx) | X > x) (conditional probability of failing in next instant given survival to age x). Relations: S(x) = exp(-integral_0^x h(t) dt); f(x) = h(x) exp(-integral_0^x h(t) dt) = h(x) S(x). Examples: Exponential(lambda): h(x) = lambda (constant — memoryless, no aging). Weibull(k, lambda): h(x) = (k/lambda) (x/lambda)^{k-1}; k=1 gives Exp, k>1 increasing (aging), k<1 decreasing (infant mortality). Gamma: non-monotone hazard for some shapes. Lognormal: hump-shaped hazard. Human lifetimes: bathtub curve (high infant mortality, low constant middle, increasing old age). Mean residual life: m(x) = E[X - x | X > x] = integral_x^inf S(t) dt / S(x); for Exp(lambda), m(x) = 1/lambda (constant, memoryless).',
  'ch08p3_survival_hazard',
  'formula_recall',
  ['survival function', 'hazard rate', 'failure rate', 'mean residual life']
)

// ============================================================
// SECTION 2 — UNIFORM & EXPONENTIAL DISTRIBUTIONS (7 items)
// ============================================================
add(
  'What is the continuous Uniform distribution?',
  'Continuous Uniform distribution: X ~ Uniform(a, b), a < b. PDF: f(x) = 1/(b-a) for a <= x <= b, 0 otherwise (constant density on [a,b]). CDF: F(x) = 0 for x < a; (x-a)/(b-a) for a <= x <= b; 1 for x > b. Mean: E[X] = (a+b)/2. Variance: Var(X) = (b-a)^2/12. MGF: M(t) = (e^{bt} - e^{at})/((b-a)t). Standard Uniform: Uniform(0, 1), E = 1/2, Var = 1/12, fundamental in simulation (inverse-CDF method: if U ~ Uniform(0,1), then X = F^{-1}(U) has CDF F). Properties: max entropy among continuous distributions on [a,b] with no constraint. Linear transform: if X ~ Uniform(a,b), then (X-a)/(b-a) ~ Uniform(0,1); conversely a + (b-a) U ~ Uniform(a,b) for U ~ Uniform(0,1). Order statistics: for n iid Uniform(0,1), the k-th order statistic U_{(k)} ~ Beta(k, n-k+1). Mean of order stats: E[U_{(k)}] = k/(n+1). Range R = max - min: E[R] = (n-1)/(n+1) for Uniform(0,1).',
  'ch08p3_uniform_continuous',
  'formula_recall',
  ['continuous uniform', 'Uniform(a,b)', 'inverse CDF method', 'maximum entropy']
)
add(
  'What is the Exponential distribution?',
  'Exponential distribution: X ~ Exp(lambda), lambda > 0 (rate parameter). PDF: f(x) = lambda e^{-lambda x} for x >= 0. CDF: F(x) = 1 - e^{-lambda x} for x >= 0 (0 for x < 0). Survival: S(x) = e^{-lambda x}. Mean: E[X] = 1/lambda. Variance: Var(X) = 1/lambda^2 (mean = SD — signature). MGF: M(t) = lambda/(lambda - t), t < lambda. Memoryless property: P(X > s + t | X > s) = P(X > t) for all s, t >= 0 — the ONLY continuous distribution with this property. Hazard: h(x) = lambda (constant). Median: ln(2)/lambda. Mode: 0. Skewness: 2. Excess kurtosis: 6. Application: inter-arrival times in Poisson process, waiting times, lifetimes of non-aging components, decay times. Sum of n iid Exp(lambda) = Gamma(n, lambda) (Erlang). Min of n iid Exp(lambda_i) ~ Exp(sum lambda_i) (parallel system failure). Properties: if X, Y iid Exp(lambda), then min(X,Y) ~ Exp(2 lambda); X/(X+Y) ~ Uniform(0,1) independent of X+Y. Alternative parametrization: scale theta = 1/lambda (mean).',
  'ch08p3_exponential',
  'formula_recall',
  ['exponential distribution', 'memoryless', 'rate lambda', 'Poisson inter-arrival']
)
add(
  'What is the memoryless property of the Exponential distribution?',
  'Memoryless property: X ~ Exp(lambda) satisfies P(X > s + t | X > s) = P(X > t) for all s, t >= 0. Proof: P(X > s + t | X > s) = P(X > s+t, X > s)/P(X > s) = P(X > s+t)/P(X > s) = e^{-lambda(s+t)}/e^{-lambda s} = e^{-lambda t} = P(X > t). Interpretation: a component whose lifetime is Exp does not age — the remaining lifetime distribution is the same regardless of how long it has already survived. The Exponential is the ONLY continuous distribution with this property (Geometric is the discrete analog). Consequence: Exp is the inter-arrival time of a Poisson process (independent stationary increments <=> memoryless inter-arrivals). Counter-examples: human lifetimes (aging), Weibull with k != 1 (non-constant hazard), Gamma with shape != 1. Mean residual life: E[X - s | X > s] = 1/lambda = E[X] (constant, equals mean). The memoryless property is both a strength (analytic simplicity) and a limitation (unrealistic for aging systems). In reliability, the "lack of memory" assumption is often violated for mechanical components.',
  'ch08p3_exponential_memoryless',
  'formula_recall',
  ['memoryless exponential', 'Poisson process', 'no aging', 'mean residual life']
)
add(
  'How is the Exponential distribution used to model lifetimes and waiting times?',
  'Exponential(lambda) applications: (1) Inter-arrival times in a Poisson process with rate lambda — T_i iid Exp(lambda); time of k-th arrival S_k = sum T_i ~ Gamma(k, lambda). (2) Lifetimes of non-aging components (radioactive decay: each atom has constant hazard lambda; bulb in ideal model). (3) Waiting times until next event (customer arrival, phone call, earthquake). (4) Service times in M/M/1 queue (exponentially distributed). Reliability: a system of n independent components with Exp(lambda_i) lifetimes. Series system (any failure kills system): T = min(T_i) ~ Exp(sum lambda_i), MTTF = 1/(sum lambda_i). Parallel system (all must fail): T = max(T_i), harder; for n identical Exp(lambda), E[max] = H_n / lambda (harmonic number). Parameter estimation: MLE lambda_hat = 1/X_bar (inverse of sample mean). Testing exponentiality: use memoryless property or Kolmogorov-Smirnov test. Alternative lifetimes: Weibull (aging), Gamma (more flexible), lognormal.',
  'ch08p3_exponential_lifetimes',
  'formula_recall',
  ['exponential lifetime', 'reliability', 'series system', 'parallel system']
)
add(
  'How do you find the distribution of the minimum of independent Exponential RVs?',
  'Minimum of independent Exponentials: if X_1 ~ Exp(lambda_1), ..., X_n ~ Exp(lambda_n) are independent, then M = min(X_1, ..., X_n) ~ Exp(lambda_1 + lambda_2 + ... + lambda_n). Proof: P(M > t) = P(X_1 > t, ..., X_n > t) = prod P(X_i > t) (independence) = prod e^{-lambda_i t} = exp(-(sum lambda_i) t), so M ~ Exp(sum lambda_i). Mean: E[M] = 1/(sum lambda_i). Interpretation: parallel/competing risks — the first event among n independent Poisson processes occurs at rate sum lambda_i. Which one wins? P(X_i = M) = lambda_i / (sum lambda_j) (probability that the i-th process fires first). Application: a system with n independent components in parallel (system fails only when all fail) — wait, min fails first means SERIES system (any single failure breaks system). MTTF (series) = 1/(sum lambda_i). For parallel (system survives until all fail), T = max(X_i); for n=2 iid Exp(lambda), E[max] = E[X_1 + X_2 - min] = 2/lambda - 1/(2 lambda) = 3/(2 lambda). General iid: E[max] = H_n / lambda (harmonic).',
  'ch08p3_exponential_minimum',
  'problem_solving',
  ['minimum exponential', 'competing risks', 'series system', 'parallel Poisson']
)
add(
  'How do you simulate from any distribution using Uniform(0,1) (inverse CDF method)?',
  'Inverse CDF (probability integral transform) method: to simulate X with CDF F (continuous, strictly increasing), (1) draw U ~ Uniform(0,1); (2) set X = F^{-1}(U) where F^{-1} is the inverse CDF (quantile function). Why it works: P(X <= x) = P(F^{-1}(U) <= x) = P(U <= F(x)) = F(x) (since U is uniform). So X has CDF F. Examples: (1) Exponential(lambda): F(x) = 1 - e^{-lambda x}; F^{-1}(u) = -ln(1-u)/lambda; X = -ln(U)/lambda (since 1-U also uniform). (2) Uniform(a,b): X = a + (b-a) U. (3) Weibull(k, lambda): F(x) = 1 - e^{-(x/lambda)^k}; X = lambda (-ln U)^{1/k}. (4) Cauchy(0, 1): F(x) = 1/2 + arctan(x)/pi; X = tan(pi (U - 1/2)). (5) Normal: F^{-1} has no closed form — use Box-Muller instead. Limitations: requires closed-form invertible F. For discrete RV, use a lookup: X = smallest x with F(x) >= U. The inverse-CDF method is the simplest simulation technique and underlies most random variate generators.',
  'ch08p3_inverse_cdf_simulation',
  'problem_solving',
  ['inverse CDF method', 'simulation', 'probability integral transform', 'Uniform(0,1)']
)
add(
  'How do you compute the mean and variance of a continuous Uniform distribution?',
  'Continuous Uniform(a, b), f(x) = 1/(b-a) on [a, b]. Mean: E[X] = integral_a^b x/(b-a) dx = 1/(b-a) * [x^2/2]_a^b = (b^2 - a^2)/(2(b-a)) = (b+a)/2. Midpoint of [a, b]. Variance: Var(X) = E[X^2] - (E[X])^2. E[X^2] = integral_a^b x^2/(b-a) dx = 1/(b-a) * [x^3/3]_a^b = (b^3 - a^3)/(3(b-a)) = (b^2 + ab + a^2)/3. Var = (b^2 + ab + a^2)/3 - ((a+b)/2)^2 = [4(b^2 + ab + a^2) - 3(a+b)^2]/12 = [4b^2 + 4ab + 4a^2 - 3a^2 - 6ab - 3b^2]/12 = (a^2 - 2ab + b^2)/12 = (b - a)^2/12. So Var = (b-a)^2/12, SD = (b-a)/sqrt(12) ~ (b-a)/3.464. For Uniform(0,1): E = 1/2, Var = 1/12. For Uniform(0, 2pi): E = pi, Var = pi^2/3. The uniform is the maximum-entropy distribution on [a,b] (no info beyond bounds).',
  'ch08p3_uniform_mean_var',
  'formula_recall',
  ['uniform mean variance', '(b-a)^2/12', 'midpoint', 'derivation']
)

// ============================================================
// SECTION 3 — NORMAL (GAUSSIAN) DISTRIBUTION (7 items)
// ============================================================
add(
  'What is the Normal (Gaussian) distribution?',
  'Normal distribution: X ~ N(mu, sigma^2), mu real, sigma > 0. PDF: f(x) = 1/(sigma sqrt(2 pi)) * exp(-(x - mu)^2 / (2 sigma^2)). CDF: F(x) = Phi((x - mu)/sigma) where Phi is the standard normal CDF (no closed form, tabulated). Mean = mu, Variance = sigma^2, SD = sigma. MGF: M(t) = exp(mu t + sigma^2 t^2/2). Standard normal Z = (X - mu)/sigma ~ N(0, 1) with PDF phi(z) = 1/sqrt(2 pi) e^{-z^2/2}. Symmetric about mu (skewness = 0). Excess kurtosis = 0 (mesokurtic; defines the baseline). Empirical rule (68-95-99.7): ~68% within 1 sigma, ~95% within 2 sigma, ~99.7% within 3 sigma of mean. Quantiles: z_{0.025} = -1.96, z_{0.05} = -1.645, z_{0.01} = -2.326. Median = mode = mean = mu. Linear combinations of independent normals are normal: aX + bY ~ N(a mu_X + b mu_Y, a^2 sigma_X^2 + b^2 sigma_Y^2) (independent) or with +2ab Cov term (dependent). CLT: sums/means of iid RVs converge to Normal. Max entropy among continuous distributions with fixed mean and variance.',
  'ch08p3_normal',
  'formula_recall',
  ['normal distribution', 'Gaussian', 'PDF', 'standard normal']
)
add(
  'What is the standard normal distribution and the z-table?',
  'Standard normal: Z ~ N(0, 1), PDF phi(z) = 1/sqrt(2 pi) * e^{-z^2/2}, CDF Phi(z) = integral_{-inf}^z phi(t) dt (no closed form, tabulated). Symmetry: Phi(-z) = 1 - Phi(z); phi(-z) = phi(z) (even function). Common values: Phi(0) = 0.5; Phi(1) ~ 0.8413; Phi(1.645) ~ 0.95; Phi(1.96) ~ 0.975; Phi(2) ~ 0.9772; Phi(2.576) ~ 0.995; Phi(3) ~ 0.9987. Conversion: if X ~ N(mu, sigma^2), then Z = (X - mu)/sigma ~ N(0, 1); P(X <= x) = Phi((x - mu)/sigma). z-table usage: P(Z <= z) = Phi(z). For two-sided: P(|Z| <= z) = 2 Phi(z) - 1; P(|Z| > z) = 2(1 - Phi(z)). Inverse: z_alpha = Phi^{-1}(1 - alpha) (upper alpha critical value). z_{0.025} = 1.96 (95% two-sided); z_{0.05} = 1.645 (90% two-sided or 95% one-sided); z_{0.01} = 2.326 (98% two-sided). Q-Q plot: plot sample quantiles vs. theoretical normal quantiles to check normality (straight line = normal). Error function: Phi(z) = 0.5 [1 + erf(z/sqrt(2))].',
  'ch08p3_standard_normal',
  'formula_recall',
  ['standard normal', 'z-table', 'Phi', 'critical values']
)
add(
  'What is the 68-95-99.7 empirical rule for the Normal distribution?',
  'Empirical rule (68-95-99.7) for X ~ N(mu, sigma^2): P(|X - mu| < 1 sigma) ~ 0.6827 (68.27%). P(|X - mu| < 2 sigma) ~ 0.9545 (95.45%). P(|X - mu| < 3 sigma) ~ 0.9973 (99.73%). Derivation: standardize Z = (X - mu)/sigma; P(|Z| < 1) = 2 Phi(1) - 1 ~ 2(0.8413) - 1 = 0.6827. P(|Z| < 2) = 2 Phi(2) - 1 ~ 2(0.9772) - 1 = 0.9545. P(|Z| < 3) = 2 Phi(3) - 1 ~ 2(0.99865) - 1 = 0.9973. Other useful: P(|Z| < 1.645) ~ 0.90 (90%); P(|Z| < 1.96) ~ 0.95 (95%); P(|Z| < 2.576) ~ 0.99 (99%); P(|Z| < 3.29) ~ 0.999 (99.9%). Six Sigma quality control: process within 6 sigma of mean (3.4 defects per million with 1.5 sigma shift assumption). Application: quick probability estimates without tables; outlier detection (|z| > 2 or 3 flagged). Note: rule is exact only for Normal; for other distributions, Chebyshev gives weaker bounds (P(|X - mu| < k sigma) >= 1 - 1/k^2 — 75% within 2 sigma, 89% within 3 sigma for any distribution).',
  'ch08p3_normal_empirical_rule',
  'formula_recall',
  ['empirical rule', '68-95-99.7', 'normal probabilities', 'six sigma']
)
add(
  'How do you compute probabilities for a Normal random variable using standardization?',
  'Standardization to compute Normal probabilities: for X ~ N(mu, sigma^2), P(a <= X <= b) = P((a - mu)/sigma <= Z <= (b - mu)/sigma) = Phi((b - mu)/sigma) - Phi((a - mu)/sigma), where Z ~ N(0,1) and Phi is the standard normal CDF. Steps: (1) standardize bounds; (2) look up Phi values from z-table; (3) subtract. Example: X ~ N(100, 25) (mu=100, sigma=5). P(90 <= X <= 110): z_lower = (90-100)/5 = -2; z_upper = (110-100)/5 = 2. P = Phi(2) - Phi(-2) = 2 Phi(2) - 1 ~ 2(0.9772) - 1 = 0.9544 (95.44%). P(X > 105): z = (105-100)/5 = 1; P = 1 - Phi(1) ~ 1 - 0.8413 = 0.1587 (15.87%). P(X < 92): z = (92-100)/5 = -1.6; P = Phi(-1.6) = 1 - Phi(1.6) ~ 1 - 0.9452 = 0.0548 (5.48%). Inverse: find b such that P(X <= b) = 0.95. b = mu + sigma * z_{0.95} = 100 + 5 * 1.645 = 108.225 (95th percentile). Continuity correction when approximating discrete by normal: P(X = k) ~ Phi((k+0.5-mu)/sigma) - Phi((k-0.5-mu)/sigma).',
  'ch08p3_normal_probabilities',
  'problem_solving',
  ['normal probabilities', 'standardization', 'z-table lookup', 'Phi']
)
add(
  'What is the distribution of a linear combination of independent Normal RVs?',
  'Linear combinations of independent Normals are Normal: if X_1, ..., X_n are independent with X_i ~ N(mu_i, sigma_i^2), then for constants a_1, ..., a_n, Y = sum a_i X_i ~ N(sum a_i mu_i, sum a_i^2 sigma_i^2). Proof via MGF: M_Y(t) = prod M_{X_i}(a_i t) = prod exp(mu_i a_i t + sigma_i^2 a_i^2 t^2/2) = exp((sum a_i mu_i) t + (sum a_i^2 sigma_i^2) t^2/2). Mean: E[Y] = sum a_i mu_i (linearity). Variance: Var(Y) = sum a_i^2 sigma_i^2 (independence). If X, Y dependent (jointly normal with Cov = rho sigma_X sigma_Y): Var(aX + bY) = a^2 sigma_X^2 + b^2 sigma_Y^2 + 2ab Cov(X,Y). Difference: X - Y ~ N(mu_X - mu_Y, sigma_X^2 + sigma_Y^2) (independent). Sum: X + Y ~ N(mu_X + mu_Y, sigma_X^2 + sigma_Y^2). Sample mean of n iid N(mu, sigma^2): X_bar ~ N(mu, sigma^2/n). Sum: sum X_i ~ N(n mu, n sigma^2). This "normality is preserved under linear combination" property is UNIQUE to Normal among distributions with finite variance (characterization). Crucial for hypothesis testing (t, z tests) and regression (OLS with normal errors).',
  'ch08p3_normal_linear_combination',
  'formula_recall',
  ['linear combination normal', 'sum of normals', 'sample mean', 'jointly normal']
)
add(
  'What is the Central Limit Theorem (CLT) and why is the Normal so important?',
  'Central Limit Theorem (CLT): if X_1, X_2, ... are iid with mean mu and finite variance sigma^2, then the standardized sample mean converges in distribution to standard normal: sqrt(n) (X_bar - mu)/sigma -> N(0, 1) as n -> inf. Equivalently, X_bar ~ N(mu, sigma^2/n) approximately for large n. Equivalently, sum S_n = sum X_i ~ N(n mu, n sigma^2) approximately. Berry-Esseen bound: sup |F_n(x) - Phi(x)| <= C E|X_1 - mu|^3 / (sigma^3 sqrt(n)) (gives rate). Rule of thumb: n >= 30 usually enough (for non-heavy-tailed). Why important: (1) explains ubiquity of Normal in nature (sum of many small independent effects); (2) enables inference for means (z, t tests, confidence intervals) without knowing the underlying distribution; (3) justifies Normal approximation to Binomial (De Moivre-Laplace), Poisson (for large lambda), Gamma, etc.; (4) underlies regression theory, ANOVA, t-distribution (small samples from normal). Counter-examples: heavy-tailed (Cauchy has no CLT — sample mean has same distribution as a single observation, since Cauchy is stable); infinite variance (Pareto with alpha <= 2 uses stable-law generalization). Lindeberg-Levy is the iid version; Lindeberg-Feller gives non-identical version.',
  'ch08p3_clt',
  'formula_recall',
  ['Central Limit Theorem', 'CLT', 'sample mean', 'Berry-Esseen']
)
add(
  'What is the maximum entropy property of the Normal distribution?',
  'Maximum entropy (Jaynes): among all continuous distributions on R with a specified mean mu and variance sigma^2, the Normal N(mu, sigma^2) has the maximum Shannon differential entropy h(X) = -integral f(x) ln f(x) dx. Normal entropy: h = 0.5 ln(2 pi e sigma^2) = 0.5 ln(2 pi e) + ln sigma (nats). Proof (Lagrange multipliers): maximize h(f) = -integral f ln f subject to integral f = 1, integral x f = mu, integral x^2 f = mu^2 + sigma^2. L = -f ln f - lambda_0 f - lambda_1 x f - lambda_2 x^2 f; dL/df = -ln f - 1 - lambda_0 - lambda_1 x - lambda_2 x^2 = 0 => f(x) = exp(-1 - lambda_0 - lambda_1 x - lambda_2 x^2), a Gaussian form. Interpretation: given only mean and variance, the Normal is the least-informative (maximally uncertain) distribution. If we know more (e.g., bounded support => Uniform; positive support + mean => Exponential), the max-entropy distribution changes. Other max-entropy correspondences: support [a,b] => Uniform; positive support + fixed mean => Exponential; positive support + fixed mean of log X => Pareto; nonneg integers + fixed mean => Geometric. The Normal arises when we know only mean and variance — its ubiquity is justified by max entropy + CLT.',
  'ch08p3_normal_max_entropy',
  'formula_recall',
  ['maximum entropy', 'normal entropy', 'Jaynes', 'differential entropy']
)

// ============================================================
// SECTION 4 — GAMMA, BETA & CHI-SQUARE DISTRIBUTIONS (7 items)
// ============================================================
add(
  'What is the Gamma distribution?',
  'Gamma distribution: X ~ Gamma(alpha, beta) [shape alpha > 0, rate beta > 0]. PDF: f(x) = beta^alpha / Gamma(alpha) * x^{alpha-1} e^{-beta x}, x >= 0. Here Gamma(alpha) = integral_0^inf t^{alpha-1} e^{-t} dt (gamma function). Mean: E[X] = alpha/beta. Variance: Var(X) = alpha/beta^2. MGF: M(t) = (beta/(beta - t))^alpha, t < beta. Mode (alpha >= 1): (alpha - 1)/beta. Skewness: 2/sqrt(alpha) (right-skewed, -> 0 as alpha grows). Special cases: Gamma(1, beta) = Exp(beta); Gamma(n/2, 1/2) = Chi-square(n) (n integer). Sum: independent Gamma(alpha_i, beta) [same rate] => Gamma(sum alpha_i, beta). Scale parametrization (theta = 1/beta): f(x) = x^{alpha-1} e^{-x/theta} / (Gamma(alpha) theta^alpha); mean = alpha theta, var = alpha theta^2. Application: waiting time for alpha events in Poisson process (rate beta); Bayesian prior for Poisson rate (conjugate); modeling positive continuous data (insurance claim sizes, rainfall). For integer alpha = n, Gamma(n, beta) is the Erlang distribution (sum of n iid Exp(beta)).',
  'ch08p3_gamma',
  'formula_recall',
  ['gamma distribution', 'shape rate', 'Erlang', 'gamma function']
)
add(
  'What is the Beta distribution?',
  'Beta distribution: X ~ Beta(alpha, beta), alpha, beta > 0, support [0, 1]. PDF: f(x) = x^{alpha-1} (1-x)^{beta-1} / B(alpha, beta), 0 <= x <= 1, where B(alpha, beta) = Gamma(alpha) Gamma(beta) / Gamma(alpha + beta) (beta function). Mean: E[X] = alpha / (alpha + beta). Variance: Var(X) = alpha beta / [(alpha + beta)^2 (alpha + beta + 1)]. Mode (alpha, beta > 1): (alpha - 1)/(alpha + beta - 2). MGF: 1F1(a; a+b; t) (confluent hypergeometric). Special cases: Beta(1, 1) = Uniform(0, 1). Beta(1, beta) = power function distribution. Beta(alpha, 1): reverse power. Symmetric when alpha = beta. U-shaped when alpha, beta < 1 (bimodal at 0 and 1). J-shaped when one < 1, other >= 1. Application: Bayesian conjugate prior for Binomial/Bernoulli probability p (prior Beta(a, b) + data Bernoulli likelihood => posterior Beta(a + successes, b + failures)). Order statistics: k-th order statistic of n iid Uniform(0,1) ~ Beta(k, n-k+1). Mean = k/(n+1). Beta-Binomial hierarchical model: overdispersed binomial. Relation: if X ~ Gamma(a, theta), Y ~ Gamma(b, theta) independent, then X/(X+Y) ~ Beta(a, b) independent of X+Y ~ Gamma(a+b, theta).',
  'ch08p3_beta',
  'formula_recall',
  ['beta distribution', 'conjugate prior', 'beta function', 'order statistic']
)
add(
  'What is the Chi-square distribution?',
  'Chi-square distribution: X ~ chi^2(k), k = degrees of freedom (positive integer usually). PDF: f(x) = x^{k/2 - 1} e^{-x/2} / (2^{k/2} Gamma(k/2)), x >= 0. This is Gamma(k/2, 1/2) (shape k/2, rate 1/2). Mean: E[X] = k. Variance: Var(X) = 2k. MGF: M(t) = (1 - 2t)^{-k/2}, t < 1/2. Mode (k >= 2): k - 2. Skewness: sqrt(8/k) (-> 0 as k grows). Additivity: independent chi^2(k_1) + chi^2(k_2) = chi^2(k_1 + k_2). Origin: sum of k independent squared standard normals: X = sum_{i=1}^k Z_i^2 where Z_i ~ N(0,1) iid => X ~ chi^2(k). Application: (1) goodness-of-fit test (Pearson chi-square statistic sum (O-E)^2/E ~ chi^2(k - 1 - #estimated params) under null); (2) test of independence in contingency tables; (3) confidence interval for variance (sample variance: (n-1) S^2 / sigma^2 ~ chi^2(n-1)); (4) likelihood ratio test (2 log LR ~ chi^2 under Wilks theorem). As k -> inf, chi^2(k) -> N(k, 2k) (by CLT). Median ~ k(1 - 2/(9k))^3 (Wilson-Hilferty approximation). Relation to F and t: if X ~ chi^2(d_1), Y ~ chi^2(d_2) independent, (X/d_1)/(Y/d_2) ~ F(d_1, d_2); Z/sqrt(X/k) ~ t_k for Z ~ N(0,1) independent.',
  'ch08p3_chi_square',
  'formula_recall',
  ['chi-square', 'degrees of freedom', 'sum of squared normals', 'goodness of fit']
)
add(
  'How is the Chi-square distribution derived from the Normal?',
  'Derivation: if Z ~ N(0, 1), then Z^2 ~ chi^2(1). Proof: let Y = Z^2. CDF: F_Y(y) = P(Z^2 <= y) = P(-sqrt(y) <= Z <= sqrt(y)) = 2 Phi(sqrt(y)) - 1 for y >= 0. PDF: f_Y(y) = d/dy [2 Phi(sqrt(y)) - 1] = 2 phi(sqrt(y)) * 1/(2 sqrt(y)) = (1/sqrt(2 pi)) e^{-y/2} * 1/sqrt(y) = 1/(sqrt(2) sqrt(pi)) y^{-1/2} e^{-y/2} = 1/(2^{1/2} Gamma(1/2)) y^{-1/2} e^{-y/2} (using Gamma(1/2) = sqrt(pi)). This matches Gamma(1/2, 1/2) = chi^2(1). Sum: if Z_1, ..., Z_k iid N(0,1), then sum Z_i^2 ~ chi^2(k) by additivity of Gamma (chi^2 is Gamma(k/2, 1/2), and independent Gammas with same rate add shapes). More generally: if X_i ~ N(mu_i, sigma^2), then sum (X_i - mu_i)^2/sigma^2 ~ chi^2(n). If sample mean X_bar is used (one constraint), sum (X_i - X_bar)^2/sigma^2 ~ chi^2(n-1) (one df lost to estimated mean). Mean of chi^2(k) = k (sum of k unit-variance squared normals, each mean 1). Variance = 2k (each Z^2 has Var = E[Z^4] - 1 = 3 - 1 = 2, sum = 2k).',
  'ch08p3_chi_square_derivation',
  'formula_recall',
  ['chi-square derivation', 'squared normal', 'Z squared', 'degrees of freedom']
)
add(
  'What is the Student t distribution?',
  'Student t distribution: T ~ t_nu (nu degrees of freedom). Definition: T = Z / sqrt(V/nu) where Z ~ N(0,1), V ~ chi^2(nu) independent. PDF: f(t) = Gamma((nu+1)/2) / (sqrt(nu pi) Gamma(nu/2)) * (1 + t^2/nu)^{-(nu+1)/2}, t real. Symmetric, bell-shaped, mean = 0 (nu > 1), variance = nu/(nu - 2) (nu > 2; infinite for 1 < nu <= 2; undefined for nu <= 1). As nu -> inf, t_nu -> N(0, 1) (heavier tails for finite nu; t_30 ~ close to Normal). Common: t_1 = Cauchy (no mean); t_2 has infinite variance. Critical values (two-sided 0.05): t_{0.025, 10} = 2.228, t_{0.025, 30} = 2.042, t_{0.025, inf} = 1.96. Application: (1) one-sample t-test for mean with unknown variance: T = (X_bar - mu_0)/(S/sqrt(n)) ~ t_{n-1} under H_0, where S^2 = sample variance; (2) two-sample t-tests (Welch, pooled); (3) confidence intervals for the mean (small samples from normal). Derivation: if X_i ~ N(mu, sigma^2), then X_bar ~ N(mu, sigma^2/n) independent of (n-1) S^2/sigma^2 ~ chi^2(n-1), so (X_bar - mu)/(S/sqrt(n)) = Z/sqrt(V/(n-1)) ~ t_{n-1}. The t accounts for the extra uncertainty from estimating sigma.',
  'ch08p3_student_t',
  'formula_recall',
  ['Student t', 't-distribution', 'degrees of freedom', 'heavier tails']
)
add(
  'What is the F distribution?',
  'F distribution: F ~ F(d_1, d_2). Definition: F = (V_1/d_1) / (V_2/d_2) where V_1 ~ chi^2(d_1), V_2 ~ chi^2(d_2) independent. Ratio of two independent chi-squares each divided by their degrees of freedom. PDF: f(x) = (d_1/d_2)^{d_1/2} x^{d_1/2 - 1} / [B(d_1/2, d_2/2) (1 + d_1 x/d_2)^{(d_1 + d_2)/2}] for x >= 0. Mean: E[F] = d_2/(d_2 - 2) (d_2 > 2). Variance: 2 d_2^2 (d_1 + d_2 - 2) / [d_1 (d_2 - 2)^2 (d_2 - 4)] (d_2 > 4). Mode: ((d_1 - 2)/d_1) (d_2/(d_2 + 2)) (d_1 > 2). Critical values: F_{0.05, 5, 10} ~ 3.33; F_{0.05, 10, 10} ~ 2.98; F_{0.025, 10, 20} ~ 2.77. Property: F_{1-alpha, d_1, d_2} = 1/F_{alpha, d_2, d_1} (reciprocal symmetry). Special: F(1, d_2) = t_{d_2}^2 (square of t). Application: (1) ANOVA F-test for equality of k means: F = MSB/MSW = (between-group variance)/(within-group variance) ~ F(k-1, N-k) under null; (2) F-test for comparing two variances: F = S_1^2/S_2^2 ~ F(n_1-1, n_2-1); (3) likelihood ratio tests (many reduce to F under null); (4) regression overall F-test (joint significance of all predictors). As d_2 -> inf, d_1 F -> chi^2(d_1).',
  'ch08p3_f_distribution',
  'formula_recall',
  ['F distribution', 'ratio of chi-squares', 'ANOVA', 'variance ratio test']
)
add(
  'How do Gamma, Exponential, and Chi-square distributions relate?',
  'Relations among Gamma family: (1) Exponential is Gamma with shape 1: Exp(beta) = Gamma(1, beta). (2) Chi-square is Gamma with shape = nu/2, rate = 1/2: chi^2(nu) = Gamma(nu/2, 1/2). (3) Erlang is Gamma with integer shape: Gamma(n, beta) (n integer) = sum of n iid Exp(beta) (waiting time for n-th event in Poisson process rate beta). (4) Additivity: independent Gamma(alpha_i, beta) [same rate beta] => Gamma(sum alpha_i, beta). Hence: independent chi^2(k_i) => chi^2(sum k_i); independent Exp(beta) => Gamma(n, beta) (Erlang). (5) Scaling: c X ~ Gamma(alpha, beta/c) if X ~ Gamma(alpha, beta) (c > 0). So 2 beta X ~ chi^2(2 alpha) if X ~ Gamma(alpha, beta) (rescaling rate to 1/2). (6) Beta relation: if X ~ Gamma(a, beta), Y ~ Gamma(b, beta) independent (same rate), then X/(X+Y) ~ Beta(a, b) independent of X+Y ~ Gamma(a+b, beta). (7) Poisson-Gamma duality: if N ~ Poisson(lambda t) and T_n = time of n-th event, then P(N(t) >= n) = P(T_n <= t) (relation between Poisson count and Gamma/Erlang arrival time). All these distributions share the exponential-family form and arise as sums or ratios of exponentials, making them the core of continuous positive RVs.',
  'ch08p3_gamma_relations',
  'formula_recall',
  ['gamma exponential chi-square relations', 'Erlang', 'additivity', 'beta from gamma']
)

// ============================================================
// SECTION 5 — WEIBULL, CAUCHY, LOGNORMAL & OTHER (7 items)
// ============================================================
add(
  'What is the Weibull distribution?',
  'Weibull distribution: X ~ Weibull(k, lambda), k > 0 shape, lambda > 0 scale. PDF: f(x) = (k/lambda) (x/lambda)^{k-1} exp(-(x/lambda)^k) for x >= 0. CDF: F(x) = 1 - exp(-(x/lambda)^k). Survival: S(x) = exp(-(x/lambda)^k). Hazard: h(x) = (k/lambda) (x/lambda)^{k-1} (power function of x). Mean: E[X] = lambda Gamma(1 + 1/k). Variance: lambda^2 [Gamma(1 + 2/k) - (Gamma(1 + 1/k))^2]. Mode (k >= 1): lambda ((k-1)/k)^{1/k}. Median: lambda (ln 2)^{1/k}. Special cases: k = 1 => Exponential(lambda) (constant hazard). k = 2 => Rayleigh distribution (linear hazard). k > 1 => increasing hazard (aging components, wear-out). k < 1 => decreasing hazard (infant mortality, manufacturing defects). Application: reliability engineering, lifetime modeling, wind speed, material strength. Flexibility: Weibull can model increasing, constant, or decreasing hazard rates by varying k — making it the workhorse of reliability. MLE: solve simultaneously for k_hat, lambda_hat (no closed form; use Newton-Raphson). The Weibull is a transformation of Exponential: if Y ~ Exp(1), then X = lambda Y^{1/k} ~ Weibull(k, lambda).',
  'ch08p3_weibull',
  'formula_recall',
  ['Weibull', 'reliability', 'hazard function', 'shape parameter']
)
add(
  'What is the Cauchy distribution?',
  'Cauchy distribution: X ~ Cauchy(x_0, gamma), x_0 location, gamma > 0 scale. PDF: f(x) = 1 / [pi gamma (1 + ((x - x_0)/gamma)^2)]. CDF: F(x) = 1/pi arctan((x - x_0)/gamma) + 1/2. Standard Cauchy: Cauchy(0, 1) = t_1 (Student t with 1 df). Properties: NO mean (E[X] undefined — integral of |x| f diverges). NO variance. NO MGF (M(t) = infinity for t != 0). Heavy tails: P(|X| > x) ~ 2 gamma/(pi x) as x -> inf (polynomial, not exponential, decay). Median = mode = x_0 (symmetric). IQR = 2 gamma (since F(x_0 + gamma) = 3/4, F(x_0 - gamma) = 1/4). Skewness undefined. Characteristic function: phi(t) = exp(i x_0 t - gamma |t|) (exists, unlike MGF). Stable distribution: sum of n iid Cauchy(0, gamma) ~ Cauchy(0, n gamma) — NOT normal (violates CLT because infinite variance; this is a "stable law" with alpha = 1). Sample mean of n Cauchy(0,1) has same distribution as a single observation (no concentration). Application: ratio of two independent N(0,1): X/Y ~ Cauchy(0,1). Resonance widths in spectroscopy. Robust statistics: Cauchy is used as a heavy-tailed alternative to Normal. Quantile: x_p = x_0 + gamma tan(pi (p - 1/2)). Simulation: X = x_0 + gamma tan(pi (U - 1/2)) for U ~ Uniform(0,1).',
  'ch08p3_cauchy',
  'formula_recall',
  ['Cauchy distribution', 'heavy tails', 'no mean', 'stable distribution']
)
add(
  'What is the Lognormal distribution?',
  'Lognormal distribution: X ~ LogNormal(mu, sigma^2), with Y = ln X ~ N(mu, sigma^2). Support: X > 0. PDF: f(x) = 1/(x sigma sqrt(2 pi)) exp(-(ln x - mu)^2 / (2 sigma^2)), x > 0. CDF: F(x) = Phi((ln x - mu)/sigma) (uses standard normal CDF). Mean: E[X] = exp(mu + sigma^2/2). Variance: Var(X) = (exp(sigma^2) - 1) exp(2 mu + sigma^2). Median: exp(mu). Mode: exp(mu - sigma^2). Skewness: (exp(sigma^2) + 2) sqrt(exp(sigma^2) - 1) (right-skewed, always positive). Multiplicative property: if X_i iid LogNormal(mu, sigma^2), product prod X_i ~ LogNormal(n mu, n sigma^2) (since sum of logs is normal). Application: income/wealth distribution (Pareto-like tail), stock prices (geometric Brownian motion: S_t = S_0 exp((mu - sigma^2/2) t + sigma W_t) is lognormal), particle sizes, biology (cell sizes, reaction times), survival analysis. Heavy right tail: but lighter than Pareto (lognormal has finite all moments, Pareto has finite only up to its shape). If sigma is small, lognormal is close to Normal with mean exp(mu) and small variance. The lognormal arises from the multiplicative CLT: product of many independent positive RVs tends to lognormal (analogous to additive CLT giving normal for sums).',
  'ch08p3_lognormal',
  'formula_recall',
  ['lognormal', 'log of normal', 'multiplicative CLT', 'stock prices']
)
add(
  'What is the Pareto distribution?',
  'Pareto distribution (Type I): X ~ Pareto(x_m, alpha), x_m > 0 scale (minimum), alpha > 0 shape. PDF: f(x) = alpha x_m^alpha / x^{alpha + 1}, x >= x_m. CDF: F(x) = 1 - (x_m/x)^alpha, x >= x_m. Survival: S(x) = (x_m/x)^alpha (power-law tail). Mean: E[X] = alpha x_m / (alpha - 1) for alpha > 1 (undefined for alpha <= 1). Variance: alpha x_m^2 / [(alpha - 1)^2 (alpha - 2)] for alpha > 2 (undefined for alpha <= 2). Median: x_m 2^{1/alpha}. Mode: x_m. Hazard: h(x) = alpha/x (decreasing). Tail index = alpha. Application: wealth/income distribution ("80-20 rule" — Pareto principle), file sizes on the internet, city populations, word frequencies, insurance claim sizes. Heavy tail: P(X > x) ~ (x_m/x)^alpha — polynomial decay, much heavier than exponential. Moments: E[X^k] finite only for k < alpha (only the first alpha moments exist; all higher moments infinite). Generalized Pareto (Pickands-Balkema-de Haan): excess over threshold u, X - u | X > u converges to Generalized Pareto as u -> inf (key in extreme value theory). Pareto is the max-entropy distribution on [x_m, inf) with fixed E[ln X]. Relation: log(X/x_m) ~ Exp(alpha) (Pareto is exponentiated Exponential).',
  'ch08p3_pareto',
  'formula_recall',
  ['Pareto', 'power law', 'heavy tail', '80-20 rule']
)
add(
  'What is the Laplace (double exponential) distribution?',
  'Laplace distribution: X ~ Laplace(mu, b), mu location, b > 0 scale. PDF: f(x) = 1/(2b) exp(-|x - mu|/b). Symmetric about mu, peaked at mu with cusp (non-differentiable at mu). CDF: F(x) = 0.5 exp((x - mu)/b) for x < mu; 1 - 0.5 exp(-(x - mu)/b) for x >= mu. Mean: E[X] = mu. Variance: Var(X) = 2 b^2. Median = mode = mu. MGF: M(t) = exp(mu t) / (1 - b^2 t^2), |t| < 1/b. Skewness: 0. Excess kurtosis: 3 (heavier tails than Normal, which has 0). Difference of two iid Exp(lambda) ~ Laplace(0, 1/lambda). Application: (1) Bayesian prior for robust regression (heavier tails than Normal — L1 loss corresponds to Laplace errors, giving median regression / LAD). (2) Speech recognition (LPC residual). (3) Image processing (gradient priors). (4) Double-exponential priors (Bayesian LASSO). The Laplace distribution is the maximum-entropy distribution on R with fixed mean and fixed E[|X - mu|] (mean absolute deviation). It is also the distribution of X_1 - X_2 for iid Exp. Quantile: x_p = mu - b sign(p - 0.5) ln(1 - 2|p - 0.5|).',
  'ch08p3_laplace',
  'formula_recall',
  ['Laplace', 'double exponential', 'L1 loss', 'median regression']
)
add(
  'What is the Rayleigh distribution?',
  'Rayleigh distribution: X ~ Rayleigh(sigma), sigma > 0 scale. PDF: f(x) = (x/sigma^2) exp(-x^2/(2 sigma^2)), x >= 0. CDF: F(x) = 1 - exp(-x^2/(2 sigma^2)). Survival: S(x) = exp(-x^2/(2 sigma^2)). Mean: E[X] = sigma sqrt(pi/2). Variance: Var(X) = (2 - pi/2) sigma^2 = (4 - pi) sigma^2/2. Median: sigma sqrt(2 ln 2). Mode: sigma. Hazard: h(x) = x/sigma^2 (linear increasing — aging). Special case of Weibull with k = 2: Rayleigh(sigma) = Weibull(2, sigma sqrt(2)). Origin: if X, Y iid N(0, sigma^2), then R = sqrt(X^2 + Y^2) ~ Rayleigh(sigma) (distance from origin of a 2D isotropic Gaussian). Higher-d generalization: chi distribution (R = sqrt(sum X_i^2) for X_i iid N(0, sigma^2), R ~ chi distribution with n df scaled by sigma). Application: (1) wind speed distribution (if components are Gaussian); (2) wave heights; (3) distance of received signal from target in 2D; (4) magnetic resonance imaging; (5) communication channel fading (Rayleigh fading when no line of sight). MLE: sigma_hat^2 = (1/(2n)) sum X_i^2. The Rayleigh is the distribution of the magnitude of a 2D standard normal vector, so it underlies 2D Gaussian geometry.',
  'ch08p3_rayleigh',
  'formula_recall',
  ['Rayleigh', '2D Gaussian magnitude', 'Weibull k=2', 'wind speed']
)
add(
  'What are extreme value distributions (Gumbel, Frechet, Weibull min)?',
  'Extreme value theory: the maximum M_n = max(X_1, ..., X_n) of iid RVs, properly normalized, converges (Fisher-Tippett-Gnedenko theorem) to one of three types: (1) Gumbel (Type I): CDF G(x) = exp(-exp(-(x - mu)/beta)). Arises from light-tailed (exponential, Normal, Gamma) parent distributions. PDF: (1/beta) exp(-(x-mu)/beta - exp(-(x-mu)/beta)). Mean = mu + beta gamma (gamma = Euler-Mascheroni ~ 0.5772). Variance = pi^2 beta^2 / 6. (2) Frechet (Type II): CDF G(x) = exp(-(x/sigma)^{-alpha}) for x > 0 (sigma scale, alpha shape). Arises from heavy-tailed (Pareto, Cauchy, t) parent distributions. (3) Weibull (Type III, for minima): CDF G(x) = 1 - exp(-((x - mu)/beta)^k) for x < mu (reversed Weibull for maxima). Arises from bounded-above (Uniform, Beta) parent distributions. United as Generalized Extreme Value (GEV): G(x) = exp(-(1 + xi (x - mu)/beta)^{-1/xi}) for xi != 0 (xi > 0 Frechet, xi < 0 Weibull, xi = 0 Gumbel limit). Application: maximum rainfall, floods, extreme temperatures, financial risk (VaR), insurance. Block-maxima method: fit GEV to annual/monthly maxima. Peaks-over-threshold: exceedances over high threshold converge to Generalized Pareto (Pickands-Balkema-de Haan). Return level: x_T = mu + beta/xi [(T lambda)^{xi} - 1] for T-year event (lambda events/year).',
  'ch08p3_extreme_value',
  'formula_recall',
  ['extreme value', 'Gumbel', 'Frechet', 'GEV', 'block maxima']
)

// ============================================================
// SECTION 6 — FUNCTIONS OF RVs & TRANSFORMATIONS (7 items)
// ============================================================
add(
  'What is the CDF method for finding the distribution of Y = g(X)?',
  'CDF method for transformation Y = g(X): (1) Find F_Y(y) = P(Y <= y) = P(g(X) <= y). (2) Express this in terms of X: identify the set A_y = {x : g(x) <= y}. (3) Compute F_Y(y) = P(X in A_y) = integral_{A_y} f_X(x) dx (or sum for discrete). (4) Differentiate to get PDF: f_Y(y) = d/dy F_Y(y). Example: Y = X^2, X ~ N(0,1). F_Y(y) = P(X^2 <= y) = P(-sqrt(y) <= X <= sqrt(y)) = 2 Phi(sqrt(y)) - 1 (y >= 0). f_Y(y) = d/dy [2 Phi(sqrt(y)) - 1] = 2 phi(sqrt(y)) * (1/(2 sqrt(y))) = (1/sqrt(2 pi y)) e^{-y/2}, y > 0 = chi^2(1) PDF. Example: Y = e^X, X ~ N(mu, sigma^2). F_Y(y) = P(e^X <= y) = P(X <= ln y) = Phi((ln y - mu)/sigma), y > 0; Y ~ LogNormal. Example: Y = -ln X, X ~ Uniform(0,1). F_Y(y) = P(-ln X <= y) = P(X >= e^{-y}) = 1 - e^{-y}, y >= 0; Y ~ Exp(1). The CDF method works for any g (monotone or not), unlike the change-of-variables formula which requires monotonicity.',
  'ch08p3_cdf_method',
  'formula_recall',
  ['CDF method', 'transformation', 'Y = g(X)', 'distribution of function']
)
add(
  'What is the change-of-variables formula for monotone transformations?',
  'Change-of-variables formula: if X has PDF f_X and Y = g(X) where g is strictly monotone and differentiable, then f_Y(y) = f_X(g^{-1}(y)) * |d/dy g^{-1}(y)| = f_X(x) * |dx/dy| where x = g^{-1}(y). For g increasing: f_Y(y) = f_X(g^{-1}(y)) * (g^{-1})\'(y). For g decreasing: f_Y(y) = f_X(g^{-1}(y)) * |-(g^{-1})\'(y)| = f_X(g^{-1}(y)) * |(g^{-1})\'(y)| (absolute value). Proof: F_Y(y) = P(g(X) <= y) = P(X <= g^{-1}(y)) = F_X(g^{-1}(y)) for g increasing; differentiate: f_Y(y) = f_X(g^{-1}(y)) (g^{-1})\'(y). Example: Y = a X + b (linear, a > 0). g^{-1}(y) = (y-b)/a; (g^{-1})\' = 1/a; f_Y(y) = f_X((y-b)/a)/a. Example: Y = X^2, X ~ N(0,1) — NOT monotone on R, but monotone on (0, inf) and (-inf, 0). Split: f_Y(y) = f_X(sqrt y)/(2 sqrt y) + f_X(-sqrt y)/(2 sqrt y) = (1/sqrt(2 pi y)) e^{-y/2} (matches chi^2(1)). Example: Y = ln X, X ~ LogNormal -> Normal. For g not one-to-one, partition the support into pieces where g is monotone and sum contributions.',
  'ch08p3_change_of_variables',
  'formula_recall',
  ['change of variables', 'monotone transformation', 'Jacobian', 'density transformation']
)
add(
  'How do you find the distribution of a sum of independent continuous RVs?',
  'Distribution of S = X + Y, X, Y independent continuous: convolution of PDFs: f_S(s) = integral_{-inf}^{inf} f_X(x) f_Y(s - x) dx. Derivation: F_S(s) = P(X + Y <= s) = double integral over {x + y <= s} f_X(x) f_Y(y) dx dy = integral f_X(x) [integral_{-inf}^{s - x} f_Y(y) dy] dx = integral f_X(x) F_Y(s - x) dx; differentiate: f_S(s) = integral f_X(x) f_Y(s - x) dx. Alternative: MGF method — M_S(t) = M_X(t) M_Y(t) (product of MGFs for independent), then identify distribution by matching MGF. Examples: (1) X ~ Normal(mu_X, sigma_X^2), Y ~ Normal(mu_Y, sigma_Y^2) independent => S ~ Normal(mu_X + mu_Y, sigma_X^2 + sigma_Y^2). (2) X ~ Exp(lambda), Y ~ Exp(lambda) iid => S = Gamma(2, lambda) (Erlang). (3) X ~ Gamma(a, beta), Y ~ Gamma(b, beta) independent [same rate] => S ~ Gamma(a+b, beta). (4) X ~ Cauchy(0, gamma_1), Y ~ Cauchy(0, gamma_2) => S ~ Cauchy(0, gamma_1 + gamma_2) (stable). For non-iid or non-standard, use the convolution integral directly or characteristic functions: phi_S(u) = phi_X(u) phi_Y(u), then invert.',
  'ch08p3_sum_continuous',
  'formula_recall',
  ['sum of continuous RVs', 'convolution PDF', 'MGF product', 'independent sum']
)
add(
  'How do you find the distribution of the minimum and maximum of independent RVs?',
  'Min and Max of independent RVs: (1) Maximum M = max(X_1, ..., X_n). CDF: F_M(x) = P(M <= x) = P(X_1 <= x, ..., X_n <= x) = prod F_{X_i}(x) (independence). PDF: f_M(x) = d/dx prod F_{X_i}(x) = sum_i f_{X_i}(x) prod_{j != i} F_{X_j}(x). For iid: F_M(x) = F_X(x)^n; f_M(x) = n F_X(x)^{n-1} f_X(x). (2) Minimum m = min(X_1, ..., X_n). CDF: F_m(x) = 1 - P(m > x) = 1 - P(all X_i > x) = 1 - prod (1 - F_{X_i}(x)). PDF: f_m(x) = sum_i f_{X_i}(x) prod_{j != i} (1 - F_{X_j}(x)). For iid: F_m(x) = 1 - (1 - F_X(x))^n; f_m(x) = n (1 - F_X(x))^{n-1} f_X(x). Examples: iid Exp(lambda), min ~ Exp(n lambda) (since S_min(t) = (e^{-lambda t})^n = e^{-n lambda t}). iid Uniform(0,1), max has Beta(n, 1) PDF n x^{n-1}; min has Beta(1, n) PDF n (1-x)^{n-1}. Reliability: series system (any failure) lifetime = min; parallel (all must fail) = max. E[max of n iid Uniform(0,1)] = n/(n+1); E[min] = 1/(n+1). Order statistics generalization: X_{(k)} has PDF n!/(k-1)!(n-k)! F^{k-1} (1-F)^{n-k} f.',
  'ch08p3_min_max',
  'formula_recall',
  ['minimum maximum', 'order statistics', 'reliability', 'extreme value']
)
add(
  'What is the distribution of a ratio of two random variables?',
  'Ratio Z = X / Y: for X, Y independent continuous with joint density f_{X,Y} = f_X f_Y. PDF of Z: f_Z(z) = integral_{-inf}^{inf} |y| f_X(zy) f_Y(y) dy (Jacobian |y| from change of variables). Derivation: transform (x, y) -> (z = x/y, w = y); inverse x = zw, y = w; Jacobian = |w|; joint f_{Z,W}(z, w) = f_X(zw) f_Y(w) |w|; marginal f_Z(z) = integral f_X(zw) f_Y(w) |w| dw. Examples: (1) X, Y iid N(0,1) => X/Y ~ Cauchy(0,1). (2) X ~ N(0,1), Y = sqrt(V/k) where V ~ chi^2(k) independent => X/Y ~ t_k (Student t). (3) X ~ chi^2(d_1), Y ~ chi^2(d_2) independent => (X/d_1)/(Y/d_2) ~ F(d_1, d_2). (4) X, Y iid Gamma(a, b) [same rate] => X/(X+Y) ~ Beta(a, a); also X/Y has a Beta prime distribution. (5) X, Y iid Exp(lambda) => X/(X+Y) ~ Uniform(0,1). The ratio distribution is a fundamental transformation underlying t, F, Cauchy, and Beta prime distributions. For dependent X, Y, use joint density f_{X,Y} in the integral. Heavy tails arise often in ratios (e.g., Cauchy from Normal ratio, due to division by near-zero).',
  'ch08p3_ratio_distribution',
  'formula_recall',
  ['ratio distribution', 'X/Y', 'Cauchy from normal ratio', 'Jacobian']
)
add(
  'How do you find the distribution of a product of random variables?',
  'Product Z = X * Y: for independent X, Y. PDF: f_Z(z) = integral_{-inf}^{inf} f_X(x) f_Y(z/x) (1/|x|) dx. Derivation: transform (x, y) -> (z = xy, w = x); inverse x = w, y = z/w; Jacobian = |1/w|; joint f_{Z,W}(z, w) = f_X(w) f_Y(z/w) / |w|; marginal f_Z(z) = integral f_X(w) f_Y(z/w) (1/|w|) dw. Alternative via logarithm: if X, Y > 0, then ln Z = ln X + ln Y; compute distribution of ln Z by convolution, then exponentiate. Examples: (1) X, Y iid LogNormal(mu, sigma^2) => Z = XY ~ LogNormal(2 mu, 2 sigma^2) (logs add, product of lognormals is lognormal with added log-parameters). (2) X ~ Uniform(0,1), Y ~ Uniform(0,1) independent => f_Z(z) = -ln z for z in (0,1). (3) X, Y iid Exp(1) => Z = XY has PDF f_Z(z) = 2 K_0(2 sqrt(z)) (modified Bessel function of the second kind, order 0) for z > 0. (4) Multiplicative CLT: product of n iid positive RVs converges (after log + normalization) to LogNormal. Products appear in: stock price dynamics (geometric Brownian motion), scaling laws, fractal processes. The logarithm trick is often easiest when X, Y > 0.',
  'ch08p3_product_distribution',
  'formula_recall',
  ['product distribution', 'XY', 'log transform', 'multiplicative CLT']
)
add(
  'What are order statistics and their distributions?',
  'Order statistics: for a sample X_1, ..., X_n (iid with PDF f, CDF F), the order statistics are X_{(1)} <= X_{(2)} <= ... <= X_{(n)} (sorted values). X_{(1)} = min, X_{(n)} = max. PDF of k-th order statistic: f_{X_{(k)}}(x) = n! / [(k-1)! (n-k)!] * [F(x)]^{k-1} [1 - F(x)]^{n-k} f(x). Derivation: exactly k-1 of X_i below x, one at x (density f(x)), n-k above x; multinomial count n!/(k-1)!1!(n-k)! times probabilities. CDF: F_{X_{(k)}}(x) = sum_{j=k}^{n} C(n, j) F(x)^j [1 - F(x)]^{n-j} (Binomial tail in F(x)). Joint PDF of (X_{(i)}, X_{(j)}), i < j: n! / [(i-1)! (j-i-1)! (n-j)!] F(x_i)^{i-1} [F(x_j) - F(x_i)]^{j-i-1} [1 - F(x_j)]^{n-j} f(x_i) f(x_j) for x_i < x_j. Special: min X_{(1)} has CDF 1 - (1-F)^n; max X_{(n)} has CDF F^n. For Uniform(0,1): X_{(k)} ~ Beta(k, n-k+1), mean k/(n+1). Range R = X_{(n)} - X_{(1)}; for Uniform(0,1), R ~ Beta(n-1, 2). Spacings X_{(k+1)} - X_{(k)} for Uniform are iid scaled Beta(1, n) (Dirichlet). Application: nonparametric statistics (median = X_{((n+1)/2)} for odd n), robust estimation, tolerance intervals, confidence intervals for quantiles.',
  'ch08p3_order_statistics',
  'formula_recall',
  ['order statistics', 'k-th order', 'min max', 'Beta order statistic']
)

// ============================================================
// SECTION 7 — WORKED PROBLEMS (7 items)
// ============================================================
add(
  'Buses arrive at a stop as a Poisson process with rate 2 per hour. What is the expected wait for the next bus?',
  'Poisson process problem. Inter-arrival times T_i ~ Exp(lambda = 2) per hour. E[T] = 1/lambda = 1/2 hour = 30 minutes. So expected wait for the next bus = 30 minutes (memoryless: even if you arrive at a random time, the wait is still Exp(2)). Var(T) = 1/lambda^2 = 1/4 hour^2; SD = 1/2 hour = 30 min. P(wait < 15 min) = P(T < 0.25 hr) = 1 - e^{-2 * 0.25} = 1 - e^{-0.5} ~ 1 - 0.6065 = 0.3935 (39.35%). P(wait > 30 min) = e^{-1} ~ 0.368 (36.8%). P(wait between 15 and 45 min) = F(0.75) - F(0.25) = (1 - e^{-1.5}) - (1 - e^{-0.5}) = e^{-0.5} - e^{-1.5} ~ 0.6065 - 0.2231 = 0.3834 (38.34%). Time until 3rd bus: S_3 = T_1 + T_2 + T_3 ~ Gamma(3, 2) (Erlang), E[S_3] = 3/2 = 1.5 hours. Median wait: ln(2)/lambda = ln(2)/2 ~ 0.347 hr ~ 20.8 min. The memoryless property means the wait is the same whenever you arrive — counterintuitive but a key feature of Poisson processes.',
  'ch08p3_worked_bus_wait',
  'problem_solving',
  ['exponential worked', 'bus wait', 'Poisson process', 'memoryless']
)
add(
  'Scores on a test are normally distributed with mean 70 and SD 10. What score is needed to be in the top 5%?',
  'Normal distribution problem. X ~ N(mu = 70, sigma^2 = 100), so sigma = 10. "Top 5%" means P(X >= c) = 0.05, equivalently P(X <= c) = 0.95. Standardize: P(Z <= (c - 70)/10) = 0.95. The 95th percentile of standard normal: z_{0.95} = Phi^{-1}(0.95) ~ 1.645. So (c - 70)/10 = 1.645 => c = 70 + 10 * 1.645 = 70 + 16.45 = 86.45. A score of about 86.45 (or 87, depending on rounding) is needed to be in the top 5%. Other useful percentiles: top 10% (90th percentile): z = 1.282, c = 70 + 12.82 = 82.82. Top 1%: z = 2.326, c = 70 + 23.26 = 93.26. Top 0.1%: z = 3.09, c = 70 + 30.9 = 100.9. P(score >= 80) = P(Z >= (80-70)/10) = P(Z >= 1) = 1 - Phi(1) ~ 1 - 0.8413 = 0.1587 (15.87% score 80 or higher). P(score between 60 and 80) = Phi(1) - Phi(-1) = 2 Phi(1) - 1 ~ 0.6827 (68.27% within 1 SD). P(score < 50) = Phi(-2) ~ 0.0228 (2.28% score below 50).',
  'ch08p3_worked_test_scores',
  'problem_solving',
  ['normal worked', 'test scores', 'top 5 percent', 'percentile']
)
add(
  'The lifetime of a bulb is Exponential with mean 1000 hours. What is P(lifetime > 1500 hours)?',
  'Exponential problem. X ~ Exp(lambda), mean = 1/lambda = 1000 hours, so lambda = 1/1000 = 0.001 per hour. P(X > 1500) = e^{-lambda * 1500} = e^{-0.001 * 1500} = e^{-1.5} ~ 0.2231. So ~22.31% of bulbs last more than 1500 hours. P(X <= 1500) = 1 - e^{-1.5} ~ 0.7769 (77.69% fail by 1500 hours). P(500 < X < 1500) = F(1500) - F(500) = (1 - e^{-1.5}) - (1 - e^{-0.5}) = e^{-0.5} - e^{-1.5} ~ 0.6065 - 0.2231 = 0.3834 (38.34%). Median lifetime: ln(2)/lambda = 1000 ln(2) ~ 693 hours. Memoryless: given bulb has lasted 1000 hours already, P(X > 2500 | X > 1000) = P(X > 1500) = e^{-1.5} ~ 0.2231 (same as a new bulb lasting > 1500). For a system of 5 such bulbs in series (system fails when any bulb fails): T_system = min(X_1, ..., X_5) ~ Exp(5 lambda) = Exp(0.005), mean = 200 hours. For parallel (all must fail): T_system = max, E[max] = H_5 / lambda = (1 + 1/2 + 1/3 + 1/4 + 1/5) * 1000 = (137/60) * 1000 ~ 2283 hours.',
  'ch08p3_worked_bulb_lifetime',
  'problem_solving',
  ['exponential worked', 'bulb lifetime', 'mean 1000', 'survival probability']
)
add(
  'If X ~ Uniform(0, 2), find the PDF of Y = X^2.',
  'Transformation problem. X ~ Uniform(0, 2) with f_X(x) = 1/2 for 0 < x < 2 (0 elsewhere). Y = X^2 takes values in (0, 4) since X in (0, 2). Use CDF method: F_Y(y) = P(Y <= y) = P(X^2 <= y) = P(X <= sqrt(y)) (since X > 0, X^2 <= y iff X <= sqrt(y)). For 0 < y < 4: F_Y(y) = F_X(sqrt(y)) = sqrt(y)/2 (since F_X(x) = x/2 for x in [0, 2]). For y <= 0: F_Y = 0. For y >= 4: F_Y = 1. PDF: f_Y(y) = d/dy F_Y(y) = d/dy [sqrt(y)/2] = 1/(4 sqrt(y)) for 0 < y < 4 (0 elsewhere). Check normalization: integral_0^4 1/(4 sqrt(y)) dy = (1/4) * 2 sqrt(y) |_0^4 = (1/4)(4 - 0) = 1. ✓ Verification via change of variables: g(x) = x^2 monotone on (0, 2); g^{-1}(y) = sqrt(y); (g^{-1})\'(y) = 1/(2 sqrt(y)); f_Y(y) = f_X(sqrt(y)) * 1/(2 sqrt(y)) = (1/2) * 1/(2 sqrt(y)) = 1/(4 sqrt(y)). ✓ Mean: E[Y] = E[X^2] = Var(X) + (E[X])^2 = (4/12) + 1 = 1/3 + 1 = 4/3 (using Uniform(0,2) mean=1, var=1/3). Alternatively: integral_0^4 y * 1/(4 sqrt y) dy = (1/4) integral_0^4 sqrt(y) dy = (1/4)(2/3) y^{3/2} |_0^4 = (1/4)(2/3)(8) = 4/3. ✓',
  'ch08p3_worked_uniform_square',
  'problem_solving',
  ['transformation worked', 'Y = X^2', 'Uniform(0,2)', 'CDF method']
)
add(
  'X has PDF f(x) = 2x for 0 < x < 1. Find E[X] and Var(X).',
  'Continuous RV problem. Given f_X(x) = 2x for 0 < x < 1, 0 elsewhere. Verify normalization: integral_0^1 2x dx = x^2 |_0^1 = 1. ✓ E[X] = integral_0^1 x * 2x dx = integral_0^1 2x^2 dx = (2/3) x^3 |_0^1 = 2/3. E[X^2] = integral_0^1 x^2 * 2x dx = integral_0^1 2x^3 dx = (2/4) x^4 |_0^1 = 1/2. Var(X) = E[X^2] - (E[X])^2 = 1/2 - (2/3)^2 = 1/2 - 4/9 = 9/18 - 8/18 = 1/18. SD = sqrt(1/18) ~ 0.236. Recognize: f_X(x) = 2x on (0,1) is the Beta(2, 1) distribution. Using Beta(alpha=2, beta=1) formulas: E[X] = alpha/(alpha+beta) = 2/3 ✓. Var = alpha beta / [(alpha+beta)^2 (alpha+beta+1)] = 2*1 / [9 * 4] = 2/36 = 1/18 ✓. CDF: F(x) = integral_0^x 2t dt = x^2 for 0 < x < 1. Median m: m^2 = 0.5 => m = 1/sqrt(2) ~ 0.707. Mode = 1 (boundary, since f increasing). P(X > 0.5) = 1 - F(0.5) = 1 - 0.25 = 0.75. P(0.3 < X < 0.7) = F(0.7) - F(0.3) = 0.49 - 0.09 = 0.40.',
  'ch08p3_worked_pdf_2x',
  'problem_solving',
  ['continuous worked', 'E[X] Var(X)', 'Beta(2,1)', 'PDF 2x']
)
add(
  'The time to complete a task is Normal with mean 50 min and SD 8 min. What is P(the task takes between 40 and 60 minutes)?',
  'Normal distribution problem. X ~ N(mu = 50, sigma^2 = 64), sigma = 8. P(40 <= X <= 60): standardize. z_lower = (40 - 50)/8 = -10/8 = -1.25. z_upper = (60 - 50)/8 = 10/8 = 1.25. P(40 <= X <= 60) = Phi(1.25) - Phi(-1.25) = 2 Phi(1.25) - 1. From z-table: Phi(1.25) ~ 0.8944. So P = 2 * 0.8944 - 1 = 1.7888 - 1 = 0.7888. About 78.88% chance the task takes between 40 and 60 minutes. Other useful: P(X < 30) = Phi((30-50)/8) = Phi(-2.5) ~ 0.0062 (0.62% take less than 30 min). P(X > 70) = 1 - Phi((70-50)/8) = 1 - Phi(2.5) ~ 1 - 0.9938 = 0.0062 (0.62% take more than 70 min — symmetric). 90th percentile (10% take longer): mu + z_{0.90} sigma = 50 + 1.282 * 8 = 50 + 10.26 = 60.26 min. 95th percentile: 50 + 1.645 * 8 = 50 + 13.16 = 63.16 min. P(within 1 SD, i.e., 42 to 58) ~ 68.27% (empirical rule). P(within 2 SD, i.e., 34 to 66) ~ 95.45%. For a sequence of 4 iid tasks, total time T ~ N(200, 256) (sum of normals), sigma_T = 16; P(T > 220) = 1 - Phi((220-200)/16) = 1 - Phi(1.25) ~ 0.1056.',
  'ch08p3_worked_task_time',
  'problem_solving',
  ['normal worked', 'task time', 'mean 50 SD 8', 'between 40 60']
)
add(
  'A machine part has lifetime Weibull with shape 2 and scale 100 hours. Find P(lifetime > 50 hours).',
  'Weibull problem. X ~ Weibull(k = 2, lambda = 100). Survival: S(x) = exp(-(x/lambda)^k) = exp(-(x/100)^2). P(X > 50) = S(50) = exp(-(50/100)^2) = exp(-0.25) ~ 0.7788. So ~77.88% of parts last more than 50 hours. CDF: F(x) = 1 - exp(-(x/100)^2). P(X <= 50) = 1 - e^{-0.25} ~ 0.2212 (22.12% fail by 50 hours). Mean: E[X] = lambda Gamma(1 + 1/k) = 100 * Gamma(1.5) = 100 * (sqrt(pi)/2) ~ 100 * 0.8862 = 88.62 hours. Variance: lambda^2 [Gamma(1 + 2/k) - (Gamma(1+1/k))^2] = 10000 [Gamma(2) - (Gamma(1.5))^2] = 10000 [1 - pi/4] ~ 10000 * 0.2146 = 2146; SD ~ 46.33 hours. Median: lambda (ln 2)^{1/k} = 100 * sqrt(ln 2) ~ 100 * 0.8326 = 83.26 hours. Mode: lambda ((k-1)/k)^{1/k} = 100 * (1/2)^{1/2} = 100/sqrt(2) ~ 70.71 hours. Hazard h(x) = (k/lambda)(x/lambda)^{k-1} = (2/100)(x/100) = x/5000 (linear increasing — parts age/wear out). Compare to Exp (k=1, constant hazard): Weibull k=2 has higher hazard as parts age, more realistic for wear-out failure.',
  'ch08p3_worked_weibull_part',
  'problem_solving',
  ['Weibull worked', 'machine part', 'shape 2', 'lifetime > 50']
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
  subject: 'mathematics_formulas_volume_9_chapter_08_part_03',
  volume:
    'Volume 9 — Comprehensive Formula Encyclopedia, Chapter 8 Part 3 (Continuous Random Variables — Continuous RV Basics PDF CDF Expectation Variance, Uniform & Exponential Distributions, Normal (Gaussian) Distribution, Gamma Beta & Chi-Square Distributions, Weibull Cauchy Lognormal & Other Continuous Distributions, Functions of RVs & Transformations, Worked Problems)',
  source: 'TRIZA Generated Formula Dataset',
  language: 'en',
  religionNeutral: true,
  items,
}

mkdirSync('data', { recursive: true })
writeFileSync('data/math-formulas-vol9-ch08p3.json', JSON.stringify(out, null, 2))

console.log(`Wrote data/math-formulas-vol9-ch08p3.json with ${items.length} items.`)
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
