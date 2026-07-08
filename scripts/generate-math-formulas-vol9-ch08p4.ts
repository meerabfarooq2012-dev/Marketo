/**
 * ============================================================
 *  Mathematics Formula Encyclopedia — Volume 9
 *  Comprehensive Formula Reference
 *  Chapter 8 — Part 4 (Joint Distributions & Multivariate)
 *  Joint/Marginal/Conditional Distributions,
 *  Covariance, Correlation & Independence,
 *  Bivariate Normal Distribution,
 *  Conditional Expectation & Variance,
 *  Transformations of Joint RVs,
 *  Order Statistics & Multivariate Distributions,
 *  Worked Problems
 *  Generator for TRIZA
 * ============================================================
 *
 *  Output: data/math-formulas-vol9-ch08p4.json
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
// SECTION 1 — JOINT, MARGINAL, CONDITIONAL DISTRIBUTIONS (8 items)
// ============================================================
add(
  'What is the joint probability mass function (PMF) of two discrete random variables?',
  'For two discrete random variables X and Y, the joint PMF is p_{X,Y}(x, y) = P(X = x, Y = y). Properties: (1) p_{X,Y}(x, y) >= 0 for all (x, y); (2) sum_x sum_y p_{X,Y}(x, y) = 1 (total probability). The joint PMF completely describes the probabilistic behavior of the pair (X, Y). Example: roll two fair dice. X = result of die 1, Y = result of die 2. p_{X,Y}(x, y) = 1/36 for x, y in {1,...,6}. For a joint table with finite support, the PMF is a matrix of nonneg entries summing to 1. Extension to n discrete RVs: p_{X1,...,Xn}(x1,...,xn) = P(X1=x1,...,Xn=xn), summing to 1 over all tuples. Joint CDF for discrete: F_{X,Y}(x, y) = sum_{x\'<=x} sum_{y\'<=y} p_{X,Y}(x\', y\'). Independence iff p_{X,Y}(x,y) = p_X(x) p_Y(y) for all (x, y).',
  'ch08p4_joint_pmf_discrete',
  'formula_recall',
  ['joint PMF', 'discrete', 'two random variables', 'joint distribution']
)
add(
  'What is the joint probability density function (PDF) of two continuous random variables?',
  'For two continuous random variables X and Y, the joint PDF f_{X,Y}(x, y) satisfies: (1) f_{X,Y}(x, y) >= 0; (2) integral_{-inf}^{inf} integral_{-inf}^{inf} f_{X,Y}(x, y) dx dy = 1. Probabilities over a region A: P((X,Y) in A) = double integral_A f_{X,Y}(x, y) dx dy. Joint CDF: F_{X,Y}(x, y) = P(X <= x, Y <= y) = integral_{-inf}^x integral_{-inf}^y f_{X,Y}(s, t) ds dt. If F is sufficiently smooth: f_{X,Y}(x, y) = d^2/dx dy F_{X,Y}(x, y) = mixed partial derivative. P(X = a, Y = b) = 0 for any point (density, not mass). The density can exceed 1 in a region (only its double integral is bounded by 1). Example: uniform on unit square [0,1]^2 has f = 1; uniform on triangle 0 < y < x < 1 has f = 2. Extension to n continuous RVs: f_{X1,...,Xn} with n-fold integral = 1.',
  'ch08p4_joint_pdf_continuous',
  'formula_recall',
  ['joint PDF', 'continuous', 'joint density', 'double integral']
)
add(
  'How do you find the marginal distribution from a joint distribution?',
  'Marginalization sums/integrates out the other variable(s). Discrete: marginal PMF of X is p_X(x) = sum_y p_{X,Y}(x, y); marginal PMF of Y is p_Y(y) = sum_x p_{X,Y}(x, y). Continuous: marginal PDF of X is f_X(x) = integral_{-inf}^{inf} f_{X,Y}(x, y) dy; marginal PDF of Y is f_Y(y) = integral_{-inf}^{inf} f_{X,Y}(x, y) dx. The marginal gives the distribution of one RV ignoring the other. Example: f_{X,Y}(x,y) = 2 for 0 < y < x < 1 (triangle). f_X(x) = integral_0^x 2 dy = 2x for 0 < x < 1 (Beta(2,1)). f_Y(y) = integral_y^1 2 dx = 2(1-y) for 0 < y < 1 (Beta(1,2)). Check: integral f_X = integral_0^1 2x dx = 1 ✓. Marginal CDF: F_X(x) = lim_{y->inf} F_{X,Y}(x, y). For n RVs, marginal of a subset = integrate/sum over all other RVs. Note: knowing all marginals does NOT determine the joint (copulas matter).',
  'ch08p4_marginal_pmf_pdf',
  'formula_recall',
  ['marginal distribution', 'marginalization', 'sum out', 'integrate out']
)
add(
  'What is the conditional distribution of Y given X = x?',
  'Conditional distribution gives the distribution of one RV given a specific value of the other. Discrete: conditional PMF p_{Y|X}(y|x) = p_{X,Y}(x, y) / p_X(x), provided p_X(x) > 0. This satisfies sum_y p_{Y|X}(y|x) = 1 for each fixed x. Continuous: conditional PDF f_{Y|X}(y|x) = f_{X,Y}(x, y) / f_X(x), provided f_X(x) > 0. This satisfies integral f_{Y|X}(y|x) dy = 1 for each fixed x. Chain rule (product rule): p_{X,Y}(x,y) = p_X(x) p_{Y|X}(y|x) = p_Y(y) p_{X|Y}(x|y). Bayes rule for RVs: p_{X|Y}(x|y) = p_{Y|X}(y|x) p_X(x) / p_Y(y). Example: f_{X,Y} = 2 on 0 < y < x < 1. f_X(x) = 2x. f_{Y|X}(y|x) = 2/(2x) = 1/x for 0 < y < x. So given X = x, Y is Uniform(0, x). Conditional CDF: F_{Y|X}(y|x) = integral_{-inf}^y f_{Y|X}(t|x) dt. Conditional distributions are fundamental for prediction, filtering, and Bayesian inference.',
  'ch08p4_conditional_pmf_pdf',
  'formula_recall',
  ['conditional distribution', 'conditional PMF', 'conditional PDF', 'given X']
)
add(
  'What is the joint cumulative distribution function (CDF) of two random variables?',
  'The joint CDF of (X, Y) is F_{X,Y}(x, y) = P(X <= x, Y <= y). Properties: (1) non-decreasing in each argument: if x1 <= x2 then F(x1, y) <= F(x2, y), similarly for y; (2) right-continuous in each argument; (3) lim_{x->-inf} F(x, y) = 0, lim_{y->-inf} F(x, y) = 0, lim_{x,y->+inf} F(x, y) = 1; (4) rectangle inequality: for a < b, c < d: P(a < X <= b, c < Y <= d) = F(b,d) - F(a,d) - F(b,c) + F(a,c) >= 0 (this 2-increasing property is essential; a function monotone in each variable separately need not be a valid joint CDF). Discrete: F(x,y) = sum_{x\'<=x} sum_{y\'<=y} p(x\', y\'). Continuous: F(x,y) = integral_{-inf}^x integral_{-inf}^y f(s,t) ds dt, and f = d^2 F/dx dy (mixed partial). Marginal CDFs: F_X(x) = F_{X,Y}(x, +inf), F_Y(y) = F_{X,Y}(+inf, y). Independence iff F_{X,Y}(x,y) = F_X(x) F_Y(y) for all (x,y). Extension: F_{X1,...,Xn}(x1,...,xn) = P(X1<=x1,...,Xn<=xn).',
  'ch08p4_joint_cdf',
  'formula_recall',
  ['joint CDF', 'cumulative distribution function', 'two variables', 'rectangle inequality']
)
add(
  'What is the normalization condition for joint distributions?',
  'Normalization requires total probability = 1. Discrete joint PMF: sum over all (x, y) in support: sum_x sum_y p_{X,Y}(x, y) = 1. Continuous joint PDF: double integral over entire plane: integral_{-inf}^{+inf} integral_{-inf}^{+inf} f_{X,Y}(x, y) dx dy = 1. For n RVs: n-fold sum or integral = 1. When constructing a joint density with an unknown constant c (e.g., f = c on a region R), normalization determines c: c = 1 / (area or volume of R). Example: f(x, y) = c on the triangle 0 < y < x < 1. Area = integral_0^1 integral_0^x dy dx = integral_0^1 x dx = 1/2. So c = 1/(1/2) = 2, giving f = 2. Example 2: f = c(x + y) on unit square [0,1]^2. integral_0^1 integral_0^1 c(x+y) dx dy = c [integral x dx dy + integral y dx dy] = c [1/2 + 1/2] = c. So c = 1. Normalization is the first check when validating any candidate joint density; without it, probabilities are meaningless. Conditional densities also normalize: integral f_{Y|X}(y|x) dy = 1 for each x.',
  'ch08p4_joint_normalization',
  'formula_recall',
  ['normalization', 'total probability', 'joint density constant', 'integrate to 1']
)
add(
  'What is the support of a joint distribution?',
  'The support of a joint distribution is the set of (x, y) values where the PMF/PDF is nonzero. Discrete: support S = {(x, y) : p_{X,Y}(x, y) > 0}, typically a finite or countable set of points. Continuous: support S = {(x, y) : f_{X,Y}(x, y) > 0}, typically a region in R^2 (rectangle, triangle, disk, etc.). Common support shapes: (1) rectangular [a,b] x [c,d] (independent uniforms); (2) triangular 0 < y < x < 1 (order-constrained); (3) disk x^2 + y^2 < R^2; (4) first quadrant x > 0, y > 0. The support determines integration limits for marginals, conditionals, and probabilities. Example: f = 2 on triangle 0 < y < x < 1. Marginal f_X(x) = integral_0^x 2 dy (limits 0 to x, not 0 to 1). Marginal f_Y(y) = integral_y^1 2 dx (limits y to 1). Misidentifying support is a common error. For independent RVs, support is typically a product set S_X x S_Y. For dependent RVs, support may be non-rectangular (e.g., triangle), which immediately implies dependence (since independent RVs with non-degenerate marginals have product support).',
  'ch08p4_joint_support',
  'formula_recall',
  ['support', 'joint distribution region', 'nonzero density', 'integration limits']
)
add(
  'When are two random variables independent?',
  'X and Y are independent iff their joint distribution factors into the product of marginals. Discrete: p_{X,Y}(x, y) = p_X(x) p_Y(y) for all (x, y). Continuous: f_{X,Y}(x, y) = f_X(x) f_Y(y) for all (x, y). Equivalently, F_{X,Y}(x, y) = F_X(x) F_Y(y) for all (x, y). Equivalently, P(X in A, Y in B) = P(X in A) P(Y in B) for all measurable A, B. If independent, conditional = marginal: p_{Y|X}(y|x) = p_Y(y), f_{Y|X}(y|x) = f_Y(y) (knowing X gives no info about Y). Independence of events generated by X and Y: for independent X, Y, events {X in A} and {Y in B} are independent. Independence of n RVs: joint = product of all marginals f_{X1,...,Xn} = f_{X1} ... f_{Xn}; pairwise independence does NOT imply mutual independence. Independence implies Cov(X, Y) = 0 (uncorrelated), but uncorrelated does NOT imply independent (except for jointly normal). Test: if support is non-rectangular (e.g., triangle), X and Y are dependent. Example: f = 2 on 0 < y < x < 1: f_X(x) = 2x, f_Y(y) = 2(1-y), product = 4x(1-y) != 2 = f_{X,Y}, so dependent. Independence is preserved under transformations: if X, Y independent, then g(X), h(Y) are independent for measurable g, h.',
  'ch08p4_independence_definition',
  'formula_recall',
  ['independence', 'product of marginals', 'independent random variables', 'factorization']
)

// ============================================================
// SECTION 2 — COVARIANCE, CORRELATION & INDEPENDENCE (7 items)
// ============================================================
add(
  'What is the covariance of two random variables?',
  'Covariance measures how two RVs vary together. Definition: Cov(X, Y) = E[(X - E[X])(Y - E[Y])] = E[XY] - E[X]E[Y]. Computational formula: Cov(X, Y) = E[XY] - mu_X mu_Y (often easier: compute E[XY], E[X], E[Y] separately). Discrete: Cov = sum_x sum_y (x - mu_X)(y - mu_Y) p_{X,Y}(x, y). Continuous: Cov = integral integral (x - mu_X)(y - mu_Y) f_{X,Y}(x, y) dx dy. Properties: (1) Cov(X, X) = Var(X); (2) Symmetric: Cov(X, Y) = Cov(Y, X); (3) Bilinear: Cov(aX + bY, cW + dZ) = ac Cov(X,W) + ad Cov(X,Z) + bc Cov(Y,W) + bd Cov(Y,Z); (4) Cov(X, c) = 0 (constant uncorrelated with everything); (5) Cov(X + c, Y) = Cov(X, Y) (shift-invariant); (6) Cov(aX, bY) = ab Cov(X, Y). Sign: Cov > 0 means X, Y tend to move together (above-mean X associated with above-mean Y); Cov < 0 means opposite; Cov = 0 means uncorrelated. Units: [X][Y] (product of units). Independence => Cov = 0, but Cov = 0 does NOT imply independence. Range: |Cov(X,Y)| <= sqrt(Var(X) Var(Y)) (Cauchy-Schwarz).',
  'ch08p4_covariance_definition',
  'formula_recall',
  ['covariance', 'Cov', 'E[XY]', 'bilinear']
)
add(
  'What is the correlation coefficient (Pearson rho)?',
  'The Pearson correlation coefficient standardizes covariance to [-1, 1]: rho_{X,Y} = Cov(X, Y) / (sigma_X sigma_Y) = Cov(X, Y) / sqrt(Var(X) Var(Y)). Properties: (1) -1 <= rho <= 1 (from Cauchy-Schwarz); (2) Dimensionless (unitless) — divides out units; (3) Shift and scale invariant: rho(aX + b, cY + d) = sign(ac) rho(X, Y); (4) rho = +1 iff Y = aX + b with a > 0 (perfect positive linear); (5) rho = -1 iff Y = aX + b with a < 0 (perfect negative linear); (6) rho = 0 means uncorrelated (no linear relationship, but may have nonlinear dependence). Independence => rho = 0, but rho = 0 does NOT imply independence (except jointly normal). Sample correlation: r = sum (x_i - x_bar)(y_i - y_bar) / sqrt(sum (x_i - x_bar)^2 sum (y_i - y_bar)^2). Interpretation: |rho| < 0.3 weak, 0.3-0.7 moderate, > 0.7 strong (rough guidelines, context-dependent). rho^2 is the fraction of variance explained by linear regression (R-squared). Spearman rank correlation captures monotone (not just linear) relationships. Correlation does not imply causation.',
  'ch08p4_correlation_coefficient',
  'formula_recall',
  ['correlation coefficient', 'Pearson', 'rho', 'dimensionless']
)
add(
  'What are the key properties of covariance?',
  'Key properties of covariance: (1) Cov(X, X) = Var(X) (self-covariance is variance); (2) Symmetry: Cov(X, Y) = Cov(Y, X); (3) Bilinearity: Cov(aX + bY, Z) = a Cov(X, Z) + b Cov(Y, Z) and Cov(Z, aX + bY) = a Cov(Z, X) + b Cov(Z, Y); (4) Cov(X, c) = 0 for constant c; (5) Cov(X + c, Y + d) = Cov(X, Y) (translation invariant); (6) Cov(aX, bY) = ab Cov(X, Y) (scaling); (7) Cov(X, X) = Var(X) >= 0. Variance of sum: Var(sum_{i=1}^n X_i) = sum_i Var(X_i) + 2 sum_{i<j} Cov(X_i, X_j). If all pairs independent: Var(sum X_i) = sum Var(X_i). If X, Y independent: Cov(X, Y) = 0 (converse false). Cov(X, Y) = E[XY] - E[X]E[Y], so Cov = 0 iff E[XY] = E[X]E[Y] (uncorrelated). Covariance matrix for (X1,...,Xn): Sigma_{ij} = Cov(X_i, X_j), diagonal entries = variances, off-diagonal = covariances; symmetric and positive semidefinite. Adding constants does not change covariance, but scaling does (proportional to product of scales).',
  'ch08p4_covariance_properties',
  'formula_recall',
  ['covariance properties', 'bilinearity', 'symmetry', 'variance of sum']
)
add(
  'What is the Cauchy-Schwarz inequality for covariance?',
  'The Cauchy-Schwarz inequality for random variables states: |Cov(X, Y)| <= sqrt(Var(X) * Var(Y)) = sigma_X * sigma_Y. Equivalently: [E[(X - mu_X)(Y - mu_Y)]]^2 <= E[(X - mu_X)^2] E[(Y - mu_Y)^2]. Proof: apply Cauchy-Schwarz to U = X - mu_X, V = Y - mu_Y: (E[UV])^2 <= E[U^2] E[V^2]. Equality holds iff U and V are proportional: V = aU a.s. for some constant a, i.e., Y - mu_Y = a(X - mu_X), i.e., Y = aX + b (perfect linear relationship). If a > 0: rho = +1; if a < 0: rho = -1. This gives |rho| <= 1 with equality iff perfect linear. General Cauchy-Schwarz: (E[UV])^2 <= E[U^2] E[V^2] for any RVs U, V with finite second moments. Applications: (1) bounds on covariance; (2) proves |rho| <= 1; (3) triangle inequality for L2: (E[(U+V)^2])^{1/2} <= (E[U^2])^{1/2} + (E[V^2])^{1/2}; (4) underlies the projection interpretation of conditional expectation. For vectors: |u . v| <= ||u|| ||v||. The inequality is tight exactly when one variable is an affine function of the other.',
  'ch08p4_cauchy_schwarz_covariance',
  'formula_recall',
  ['Cauchy-Schwarz', 'covariance bound', '|Cov| <= sqrt', 'correlation bound']
)
add(
  'What is the difference between uncorrelated and independent random variables?',
  'Uncorrelated: Cov(X, Y) = 0, equivalently E[XY] = E[X]E[Y], equivalently rho = 0. This means no LINEAR relationship. Independent: f_{X,Y} = f_X f_Y (joint factors). Independence => uncorrelated (always, if second moments exist). But uncorrelated does NOT imply independent in general. Classic counterexample: X uniform on {-1, 0, 1}, Y = X^2. Then E[X] = 0, E[XY] = E[X^3] = 0 (odd function, symmetric), so Cov(X, Y) = 0 - 0*E[Y] = 0 (uncorrelated). But Y is determined by X (Y = X^2), so clearly dependent. Another: X ~ N(0,1), Y = X^2. Cov(X, Y) = E[X^3] - 0 = 0 (symmetric), uncorrelated, but Y = X^2 is determined by X. EXCEPTION: for jointly normal (X, Y), uncorrelated <=> independent. This is a special property of the bivariate/multivariate normal. For Bernoulli, Poisson, and other non-normal families, uncorrelated may or may not imply independence (need case-by-case). Independence also implies that all functions g(X), h(Y) are uncorrelated (when E|g(X)h(Y)| < inf), which is stronger than just E[XY] = E[X]E[Y]. Test for independence: check f_{X,Y} = f_X f_Y; test for uncorrelated: check E[XY] = E[X]E[Y].',
  'ch08p4_uncorrelated_vs_independent',
  'formula_recall',
  ['uncorrelated vs independent', 'Cov = 0', 'uncorrelated does not imply independent', 'jointly normal exception']
)
add(
  'What is the covariance matrix of a random vector?',
  'For a random vector X = (X1, X2, ..., Xn)^T with finite second moments, the covariance matrix Sigma is the n x n matrix with entries Sigma_{ij} = Cov(X_i, X_j). Diagonal: Sigma_{ii} = Var(X_i). Off-diagonal: Sigma_{ij} = Cov(X_i, X_j) for i != j. Properties: (1) Symmetric: Sigma_{ij} = Sigma_{ji}; (2) Positive semidefinite: for any vector a, a^T Sigma a = Var(a^T X) >= 0; (3) Sigma = E[(X - mu)(X - mu)^T] where mu = E[X]; (4) For linear transform Y = AX + b: Cov(Y) = A Sigma A^T; (5) Diagonal entries are variances, off-diagonal are covariances; (6) If components independent: Sigma is diagonal with Var(X_i) on diagonal; (7) Correlation matrix R has R_{ij} = rho_{ij} = Sigma_{ij}/(sigma_i sigma_j), diagonal = 1, off-diagonal in [-1,1]; (8) Positive definite (not just semidefinite) iff no linear combination a^T X is a.s. constant (full rank). The covariance matrix generalizes variance to multiple dimensions and is central to multivariate normal, PCA, portfolio theory, Mahalanobis distance: d^2 = (x - mu)^T Sigma^{-1} (x - mu). Determinant det(Sigma) = product of eigenvalues; trace = sum of variances.',
  'ch08p4_covariance_matrix',
  'formula_recall',
  ['covariance matrix', 'Sigma', 'positive semidefinite', 'random vector']
)
add(
  'What is the variance of a sum of random variables?',
  'Variance of sum: Var(sum_{i=1}^n X_i) = sum_{i=1}^n Var(X_i) + 2 sum_{1 <= i < j <= n} Cov(X_i, X_j). For two: Var(X + Y) = Var(X) + Var(Y) + 2 Cov(X, Y); Var(X - Y) = Var(X) + Var(Y) - 2 Cov(X, Y). If all pairs independent (hence Cov = 0): Var(sum X_i) = sum Var(X_i) — variances add for independent RVs. If all pairs perfectly correlated (rho = 1): Var(sum) = (sum sigma_i)^2. For weighted sum: Var(sum a_i X_i) = sum_i a_i^2 Var(X_i) + 2 sum_{i<j} a_i a_j Cov(X_i, X_j) = a^T Sigma a. Portfolio variance (finance): Var(w^T X) = w^T Sigma w. Diversification: if independent with equal variance sigma^2, Var(mean) = sigma^2/n -> 0 (variance reduction by averaging). For n = 2, Var((X+Y)/2) = (Var(X) + Var(Y) + 2Cov)/4; if independent equal var: = sigma^2/2. If X, Y iid with Var = sigma^2: Var(X - Y) = 2 sigma^2 (independent). Key insight: variance of sum depends on covariances; positive covariance increases, negative decreases. Sample mean variance: Var(X_bar) = sigma^2/n (iid case). This underlies LLN and CLT scaling.',
  'ch08p4_variance_of_sum',
  'formula_recall',
  ['variance of sum', 'Var(X+Y)', 'weighted sum', 'portfolio variance']
)

// ============================================================
// SECTION 3 — BIVARIATE NORMAL DISTRIBUTION (7 items)
// ============================================================
add(
  'What is the probability density function of the bivariate normal distribution?',
  'The bivariate normal distribution N_2(mu, Sigma) with mean vector mu = (mu_X, mu_Y)^T and covariance matrix Sigma = [[sigma_X^2, rho sigma_X sigma_Y], [rho sigma_X sigma_Y, sigma_Y^2]] has PDF: f_{X,Y}(x, y) = 1/(2 pi sigma_X sigma_Y sqrt(1 - rho^2)) * exp{-1/(2(1-rho^2)) [(x-mu_X)^2/sigma_X^2 - 2 rho (x-mu_X)(y-mu_Y)/(sigma_X sigma_Y) + (y-mu_Y)^2/sigma_Y^2]}. Parameters: mu_X, mu_X, sigma_X > 0, sigma_Y > 0, rho in (-1, 1). When rho = 0: f = f_X(x) f_Y(y) (product of independent normals). When |rho| -> 1: distribution degenerates to a line (Y = mu_Y + rho (sigma_Y/sigma_X)(x - mu_X)). Level curves of f are ellipses centered at (mu_X, mu_Y); axes tilted by correlation rho; for rho = 0, axes aligned with coordinate axes. The quadratic form in the exponent is the Mahalanobis distance squared. Standardized: if X, Y ~ N(0,1) jointly with correlation rho, f = 1/(2pi sqrt(1-rho^2)) exp{-1/(2(1-rho^2)) [x^2 - 2rho xy + y^2]}. This is the canonical 5-parameter family (mu_X, mu_Y, sigma_X, sigma_Y, rho) central to multivariate statistics.',
  'ch08p4_bivariate_normal_pdf',
  'formula_recall',
  ['bivariate normal', 'PDF', 'correlation rho', 'ellipse']
)
add(
  'What are the marginal distributions of a bivariate normal?',
  'If (X, Y) ~ N_2(mu, Sigma), the marginals are normal: X ~ N(mu_X, sigma_X^2) and Y ~ N(mu_Y, sigma_Y^2). This is a key property: marginals of a multivariate normal are univariate normal. Marginal PDF: f_X(x) = integral f_{X,Y}(x, y) dy = 1/(sigma_X sqrt(2pi)) exp(-(x - mu_X)^2/(2 sigma_X^2)). Similarly for Y. The marginal does not depend on rho (correlation) — only on the corresponding mean and variance. This means two bivariate normals with the same mu_X, mu_Y, sigma_X, sigma_Y but different rho have the SAME marginals but different joint distributions (different dependence structure). For n-dimensional multivariate normal N_n(mu, Sigma), any subvector (X_{i1}, ..., X_{ik}) is k-variate normal with mean mu_sub and covariance Sigma_sub (the corresponding submatrix). In particular, each X_i ~ N(mu_i, Sigma_{ii}). This marginalization property is special to the normal family — for most distributions, marginals of a joint distribution do not have the same parametric form. Converse is FALSE: if X and Y are each (marginally) normal, (X, Y) need not be jointly normal (copula can be non-Gaussian).',
  'ch08p4_bivariate_normal_marginals',
  'formula_recall',
  ['bivariate normal marginals', 'marginal normal', 'marginalization', 'N(mu, sigma^2)']
)
add(
  'What are the conditional distributions of a bivariate normal?',
  'If (X, Y) ~ N_2(mu, Sigma), the conditional distribution Y | X = x is normal: Y | X = x ~ N(mu_{Y|X}, sigma_{Y|X}^2) where mu_{Y|X} = mu_Y + rho (sigma_Y / sigma_X) (x - mu_X) (linear regression on x) and sigma_{Y|X}^2 = sigma_Y^2 (1 - rho^2) (constant, independent of x). Similarly: X | Y = y ~ N(mu_X + rho (sigma_X/sigma_Y)(y - mu_Y), sigma_X^2 (1 - rho^2)). Key features: (1) Conditional mean is LINEAR in the conditioning variable (regression line); (2) Conditional variance is CONSTANT (homoscedastic) — does not depend on x; (3) When rho = 0: conditional = marginal (independence); (4) When |rho| -> 1: conditional variance -> 0 (Y determined by X); (5) The regression coefficient rho sigma_Y/sigma_X is the slope of E[Y|X=x] on x. This is the foundation of linear regression: for bivariate normal, the conditional expectation (best predictor) is exactly linear. Residuals Y - E[Y|X] are normal with variance sigma_Y^2(1 - rho^2), independent of X. The fraction of variance explained: rho^2 (R-squared = rho^2). For multivariate normal: Y | X = x ~ N(mu_Y + Sigma_{YX} Sigma_{XX}^{-1} (x - mu_X), Sigma_{YY} - Sigma_{YX} Sigma_{XX}^{-1} Sigma_{XY}).',
  'ch08p4_bivariate_normal_conditionals',
  'formula_recall',
  ['bivariate normal conditional', 'conditional normal', 'linear regression', 'homoscedastic']
)
add(
  'What is the moment generating function of the bivariate normal distribution?',
  'The MGF of (X, Y) ~ N_2(mu, Sigma) is M_{X,Y}(t1, t2) = E[exp(t1 X + t2 Y)] = exp(t1 mu_X + t2 mu_Y + (1/2)(t1^2 sigma_X^2 + 2 t1 t2 rho sigma_X sigma_Y + t2^2 sigma_Y^2)). In vector form: M(t) = exp(t^T mu + (1/2) t^T Sigma t) for t = (t1, t2)^T. Properties: (1) Joint MGF factors iff independent: M_{X,Y}(t1, t2) = M_X(t1) M_Y(t2) iff rho = 0; (2) Marginal MGF: M_X(t) = M(t, 0) = exp(t mu_X + (1/2) t^2 sigma_X^2); (3) MGF of linear combination aX + bY: M_{aX+bY}(t) = M(a t, b t) = exp(t (a mu_X + b mu_Y) + (1/2) t^2 (a^2 sigma_X^2 + 2ab rho sigma_X sigma_Y + b^2 sigma_Y^2)), confirming aX + bY ~ N(a mu_X + b mu_Y, a^2 sigma_X^2 + 2ab Cov + b^2 sigma_Y^2); (4) Characteristic function: phi(t) = exp(i t^T mu - (1/2) t^T Sigma t). The MGF uniquely determines the distribution; for multivariate normal, the quadratic form in the exponent encodes all dependence via Sigma. For n-dimensional: M(t) = exp(t^T mu + (1/2) t^T Sigma t).',
  'ch08p4_bivariate_normal_mgf',
  'formula_recall',
  ['bivariate normal MGF', 'moment generating function', 'joint MGF', 'multivariate normal']
)
add(
  'What is the distribution of a linear combination of bivariate normal random variables?',
  'If (X, Y) ~ N_2(mu, Sigma), any linear combination aX + bY is normal: aX + bY ~ N(a mu_X + b mu_Y, a^2 sigma_X^2 + 2ab rho sigma_X sigma_Y + b^2 sigma_Y^2). More generally, for multivariate normal X ~ N_n(mu, Sigma) and constant vector a: a^T X ~ N(a^T mu, a^T Sigma a). For matrix A (m x n): AX ~ N_m(A mu, A Sigma A^T). This is the "linear transform" property: affine transformations of multivariate normals are multivariate normal. Examples: (1) Sum X + Y ~ N(mu_X + mu_Y, sigma_X^2 + 2 rho sigma_X sigma_Y + sigma_Y^2); (2) Difference X - Y ~ N(mu_X - mu_Y, sigma_X^2 - 2 rho sigma_X sigma_Y + sigma_Y^2); (3) Mean (X+Y)/2 ~ N((mu_X+mu_Y)/2, (sigma_X^2 + 2Cov + sigma_Y^2)/4). Two linear combinations a^T X and b^T X are jointly normal with Cov(a^T X, b^T X) = a^T Sigma b. Independence of a^T X and b^T X iff a^T Sigma b = 0 (uncorrelated <=> independent for jointly normal). This property makes the normal family closed under linear operations, central to regression, ANOVA, and the CLT. Nonlinear transforms (e.g., X^2) are not normal (chi-square if standard normal).',
  'ch08p4_bivariate_normal_linear',
  'formula_recall',
  ['linear combination normal', 'affine transform', 'aX + bY normal', 'multivariate normal closure']
)
add(
  'For a bivariate normal distribution, does uncorrelated imply independent?',
  'YES. For the bivariate (and multivariate) normal, uncorrelated (rho = 0, Cov = 0) is EQUIVALENT to independent. Proof: if rho = 0, the joint PDF f_{X,Y} factors: the cross term -2 rho (x-mu_X)(y-mu_Y)/(sigma_X sigma_Y) vanishes, leaving f = [1/(sigma_X sqrt(2pi)) exp(-(x-mu_X)^2/(2 sigma_X^2))] [1/(sigma_Y sqrt(2pi)) exp(-(y-mu_Y)^2/(2 sigma_Y^2))] = f_X(x) f_Y(y). So rho = 0 => f_{X,Y} = f_X f_Y => independence. Equivalently, MGF factors: M(t1, t2) = M_X(t1) M_Y(t2) when rho = 0. This is a SPECIAL property of the normal family — for most distributions, uncorrelated does NOT imply independent. Consequence: to test independence of jointly normal RVs, it suffices to test Cov = 0 (a single number) rather than checking the full joint = product condition. Counterexample showing the converse fails in general: X uniform on {-1,0,1}, Y = X^2 — uncorrelated but dependent. But if (X, Y) is jointly normal and uncorrelated, they are independent. Important caveat: if X and Y are each marginally normal (but not jointly normal), uncorrelated does NOT imply independent — joint normality (not just marginal) is required. This property extends to n dimensions: for multivariate normal, pairwise uncorrelated <=> mutually independent.',
  'ch08p4_bivariate_normal_uncorrelated',
  'formula_recall',
  ['bivariate normal uncorrelated independent', 'rho = 0 implies independence', 'jointly normal', 'normal exception']
)
add(
  'What is the multivariate normal distribution in n dimensions?',
  'The n-dimensional multivariate normal N_n(mu, Sigma) has PDF (when Sigma is positive definite): f_X(x) = 1/((2pi)^{n/2} |Sigma|^{1/2}) exp(-1/2 (x - mu)^T Sigma^{-1} (x - mu)) for x in R^n. Parameters: mu in R^n (mean vector), Sigma (n x n positive definite symmetric covariance matrix). |Sigma| = determinant. Mahalanobis distance: d^2 = (x - mu)^T Sigma^{-1} (x - mu) — the quadratic form in the exponent. Level sets: ellipsoids centered at mu with axes determined by eigenvectors of Sigma, lengths proportional to sqrt(eigenvalues). Properties: (1) Marginals are normal (any subvector); (2) Conditionals are normal; (3) Linear transforms AX + b ~ N(A mu + b, A Sigma A^T); (4) MGF: M(t) = exp(t^T mu + 1/2 t^T Sigma t); (5) Characteristic function: phi(t) = exp(i t^T mu - 1/2 t^T Sigma t); (6) Independence <=> Cov = 0 for subvectors; (7) If Sigma diagonal: components independent. Degenerate case (Sigma semidefinite, not positive definite): no PDF, supported on lower-dimensional affine subspace. Standard multivariate normal: mu = 0, Sigma = I (identity) — components iid N(0,1). Diagonalization: write Sigma = Q Lambda Q^T, then X = mu + Q Lambda^{1/2} Z where Z ~ N(0, I) (eigendecomposition / principal components). Central to PCA, Gaussian processes, Bayesian inference, and the multivariate CLT.',
  'ch08p4_multivariate_normal',
  'formula_recall',
  ['multivariate normal', 'N_n(mu, Sigma)', 'Mahalanobis distance', 'ellipsoid']
)

// ============================================================
// SECTION 4 — CONDITIONAL EXPECTATION & VARIANCE (7 items)
// ============================================================
add(
  'What is the conditional expectation E[Y | X]?',
  'The conditional expectation E[Y | X] is a random variable (function of X) giving the expected value of Y given the observed value of X. Discrete: E[Y | X = x] = sum_y y p_{Y|X}(y | x); the random variable E[Y | X] takes value E[Y | X = x] when X = x. Continuous: E[Y | X = x] = integral y f_{Y|X}(y | x) dy; E[Y | X] is the function g(X) where g(x) = integral y f_{Y|X}(y|x) dy. Key properties: (1) E[Y | X] is a function of X alone — it "integrates out" Y; (2) E[Y | X] is the best predictor of Y given X (minimizes E[(Y - g(X))^2] over all g); (3) Linearity: E[aY1 + bY2 | X] = a E[Y1|X] + b E[Y2|X]; (4) If Y independent of X: E[Y | X] = E[Y] (constant); (5) Taking out what is known: E[g(X) Y | X] = g(X) E[Y | X] (g(X) treated as constant given X); (6) E[c | X] = c for constant c; (7) Monotonicity: Y1 <= Y2 => E[Y1|X] <= E[Y2|X]. General conditional expectation E[Y | G] for sigma-algebra G is the G-measurable RV with integral over any G-set = integral of Y. Conditional expectation is the foundation of prediction, filtering (Kalman), martingales, and Bayesian inference.',
  'ch08p4_conditional_expectation',
  'formula_recall',
  ['conditional expectation', 'E[Y|X]', 'best predictor', 'function of X']
)
add(
  'What is the law of total expectation (tower property)?',
  'The law of total expectation (also called tower property, iterated expectation, or law of iterated expectations) states: E[Y] = E[E[Y | X]]. Discrete: E[Y] = sum_x E[Y | X = x] p_X(x). Continuous: E[Y] = integral E[Y | X = x] f_X(x) dx. Interpretation: to get E[Y], average the conditional expectations over the distribution of X. More general tower property: if G1 subset G2 are sigma-algebras, E[E[Y | G2] | G1] = E[Y | G1] (smaller information wins). In RV form: E[E[Y | X, Z] | X] = E[Y | X] (conditioning on less information). Applications: (1) Computing E[Y] when direct calculation hard but E[Y|X] easy (e.g., compound distributions: E[sum] = E[E[sum|N]] = E[N mu]); (2) Bayesian: posterior mean E[theta | data] averaged over data gives prior mean E[theta]; (3) Martingale theory: E[M_n | F_m] = M_m for m < n. Example: Y = number of successes in N trials, N ~ Poisson(lambda), each trial success prob p. E[Y | N] = Np. E[Y] = E[Np] = p E[N] = p lambda. Proof sketch: E[E[Y|X]] = E[g(X)] = integral g(x) f_X(x) dx = integral [integral y f_{Y|X}(y|x) dy] f_X(x) dx = integral y [integral f_{X,Y}(x,y) dx] dy = integral y f_Y(y) dy = E[Y]. The tower property is one of the most powerful tools in probability.',
  'ch08p4_tower_property',
  'formula_recall',
  ['law of total expectation', 'tower property', 'iterated expectation', 'E[E[Y|X]]']
)
add(
  'What is the conditional variance Var(Y | X)?',
  'Conditional variance Var(Y | X) measures the spread of Y given X. Definition: Var(Y | X) = E[(Y - E[Y|X])^2 | X] = E[Y^2 | X] - (E[Y | X])^2. Discrete: Var(Y | X = x) = sum_y (y - E[Y|X=x])^2 p_{Y|X}(y|x). Continuous: Var(Y | X = x) = integral (y - E[Y|X=x])^2 f_{Y|X}(y|x) dy. Key properties: (1) Var(Y | X) is a random variable (function of X); (2) If Y independent of X: Var(Y | X) = Var(Y) (constant); (3) For bivariate normal: Var(Y | X) = sigma_Y^2 (1 - rho^2) (constant, homoscedastic); (4) Var(Y | X) <= Var(Y) on average (conditioning reduces uncertainty, in expectation); (5) Nonneg: Var(Y | X) >= 0. Conditional variance quantifies residual uncertainty after observing X. When Var(Y|X) is constant (does not depend on x), the model is homoscedastic; when it varies with x, heteroscedastic. In regression, Var(Y | X) = sigma^2 (constant) is the homoscedasticity assumption. The conditional standard deviation sqrt(Var(Y|X)) gives prediction intervals: Y | X = x lies in E[Y|X=x] +/- z * sqrt(Var(Y|X=x)) with probability from normal (if conditional normal). Conditional variance generalizes to Var(Y | G) for sigma-algebras, central to martingale theory (quadratic variation).',
  'ch08p4_conditional_variance',
  'formula_recall',
  ['conditional variance', 'Var(Y|X)', 'residual uncertainty', 'homoscedastic']
)
add(
  'What is the law of total variance (variance decomposition formula)?',
  'The law of total variance (variance decomposition, conditional variance formula) states: Var(Y) = E[Var(Y | X)] + Var(E[Y | X]). Interpretation: total variance = expected conditional variance (within-group) + variance of conditional mean (between-group). Proof: Var(Y) = E[Y^2] - (E[Y])^2. E[Y^2] = E[E[Y^2|X]] = E[Var(Y|X) + (E[Y|X])^2] (since E[Y^2|X] = Var(Y|X) + (E[Y|X])^2). (E[Y])^2 = (E[E[Y|X]])^2. So Var(Y) = E[Var(Y|X)] + E[(E[Y|X])^2] - (E[E[Y|X]])^2 = E[Var(Y|X)] + Var(E[Y|X]). Applications: (1) ANOVA: total SS = within SS + between SS; (2) Bivariate normal: Var(Y) = E[sigma_Y^2(1-rho^2)] + Var(mu_Y + rho sigma_Y/sigma_X (X - mu_X)) = sigma_Y^2(1-rho^2) + rho^2 sigma_Y^2 = sigma_Y^2 ✓; (3) Explained variance: Var(E[Y|X])/Var(Y) = rho^2 (fraction explained by X, R-squared); (4) Compound distributions: Var(sum_{i=1}^N X_i) = E[N] Var(X) + Var(N) (E[X])^2 (mean of N items with random N). The decomposition shows conditioning reduces variance: Var(Y) >= E[Var(Y|X)], with equality iff E[Y|X] constant (= E[Y], i.e., X carries no info about Y).',
  'ch08p4_law_total_variance',
  'formula_recall',
  ['law of total variance', 'variance decomposition', 'E[Var(Y|X)] + Var(E[Y|X])', 'ANOVA decomposition']
)
add(
  'How is conditional expectation interpreted as an L2 projection?',
  'In the Hilbert space L2(Omega, F, P) of random variables with finite second moment (inner product <U, V> = E[UV]), the conditional expectation E[Y | G] (for sub-sigma-algebra G subset F) is the ORTHOGONAL PROJECTION of Y onto the subspace L2(Omega, G, P) of G-measurable RVs. Properties: (1) E[Y | G] is G-measurable (in the subspace); (2) Orthogonality: Y - E[Y|G] is orthogonal to every G-measurable Z: E[(Y - E[Y|G]) Z] = 0 for all Z in L2(G); equivalently, E[(Y - E[Y|G]) | G] = 0; (3) Best approximation: E[Y|G] minimizes E[(Y - Z)^2] over all G-measurable Z (minimum mean squared error, MMSE); (4) Projection theorem: ||Y - E[Y|G]||^2 = ||Y||^2 - ||E[Y|G]||^2, i.e., E[(Y - E[Y|G])^2] = E[Y^2] - E[(E[Y|G])^2] = E[Var(Y|G)] (consistent with law of total variance). For E[Y | X], the subspace is all (measurable) functions of X: E[Y|X] minimizes E[(Y - g(X))^2] over all g. For bivariate normal, E[Y|X] = mu_Y + rho sigma_Y/sigma_X (X - mu_X) is linear — the best predictor among ALL functions is linear. Pythagorean: Var(Y) = Var(E[Y|G]) + E[Var(Y|G)] (variance = between + within). This geometric view unifies conditional expectation, regression, and MMSE estimation.',
  'ch08p4_projection_l2',
  'formula_recall',
  ['conditional expectation projection', 'L2 projection', 'orthogonal projection', 'Hilbert space']
)
add(
  'What is the minimum mean squared error (MMSE) predictor of Y given X?',
  'The MMSE predictor of Y given X is the function g*(X) minimizing E[(Y - g(X))^2] over all measurable g. Solution: g*(X) = E[Y | X] (the conditional expectation). Proof: E[(Y - g(X))^2] = E[(Y - E[Y|X] + E[Y|X] - g(X))^2] = E[(Y - E[Y|X])^2] + E[(E[Y|X] - g(X))^2] + 2 E[(Y - E[Y|X])(E[Y|X] - g(X))]. Cross term: E[(Y - E[Y|X])(E[Y|X] - g(X))] = E[E[(Y - E[Y|X]) | X] (E[Y|X] - g(X))] = E[0 * ...] = 0 (since E[Y - E[Y|X] | X] = 0). So E[(Y - g)^2] = E[(Y - E[Y|X])^2] + E[(E[Y|X] - g)^2] >= E[(Y - E[Y|X])^2], with equality iff g = E[Y|X]. The minimum MSE = E[Var(Y|X)] (expected conditional variance). For bivariate normal: g*(X) = mu_Y + rho sigma_Y/sigma_X (X - mu_X) (linear, since E[Y|X] is linear for bivariate normal). If restricted to LINEAR predictors g(X) = a + bX, the best linear predictor (BLP) is a* = mu_Y - rho sigma_Y/sigma_X mu_X, b* = rho sigma_Y/sigma_X (same as MMSE for bivariate normal, but different in general). R-squared = rho^2 = Var(E[Y|X])/Var(Y) (fraction of variance explained). MMSE is optimal under squared loss; under other losses, optimal predictors differ (median for L1, mode for L0).',
  'ch08p4_mmse_predictor',
  'formula_recall',
  ['MMSE predictor', 'minimum mean squared error', 'best predictor', 'E[Y|X] optimal']
)
add(
  'How does Jensen\'s inequality apply to conditional expectation?',
  'Jensen\'s inequality for conditional expectation: if phi is a convex function and E|phi(Y)| < infinity, then phi(E[Y | X]) <= E[phi(Y) | X]. For concave phi, the inequality reverses. Proof: same as ordinary Jensen, applied to the conditional measure P(. | X = x). Key special cases: (1) (E[Y|X])^2 <= E[Y^2 | X] (phi(t) = t^2 convex); (2) |E[Y|X]| <= E[|Y| | X] (phi(t) = |t| convex); (3) exp(E[Y|X]) <= E[exp(Y) | X] (phi = exp convex); (4) log E[Y|X] >= E[log Y | X] (phi = log concave, assuming Y > 0). Application to conditional variance: Var(Y | X) = E[Y^2 | X] - (E[Y | X])^2 >= 0 (directly from Jensen with phi = t^2). Conditional Jensen underlies: (a) Submartingale property: if Y_n is martingale and phi convex, phi(Y_n) is submartingale (E[phi(Y_{n+1}) | F_n] >= phi(Y_n)); (b) Risk-sensitive control; (c) Utility theory: E[phi(Y|X)] >= phi(E[Y]) (iterated). The inequality is strict unless Y is a.s. constant given X (or phi linear on the range of Y). For bivariate normal, equality in (E[Y|X])^2 <= E[Y^2|X] corresponds to Var(Y|X) = 0 (Y determined by X, rho = +/-1).',
  'ch08p4_conditional_jensen',
  'formula_recall',
  ['conditional Jensen', 'Jensen conditional expectation', 'convex conditional', 'submartingale']
)

// ============================================================
// SECTION 5 — TRANSFORMATIONS OF JOINT RVs (7 items)
// ============================================================
add(
  'How do you find the joint PDF of transformed random variables using the Jacobian?',
  'If (X, Y) has joint PDF f_{X,Y} and (U, V) = (g1(X,Y), g2(X,Y)) is a one-to-one differentiable transformation with inverse (X, Y) = (h1(U,V), h2(U,V)), then the joint PDF of (U, V) is f_{U,V}(u, v) = f_{X,Y}(h1(u,v), h2(u,v)) * |J(u,v)| where J = determinant of the Jacobian matrix of the inverse transformation: J = det [[dh1/du, dh1/dv], [dh2/du, dh2/dv]] = (dh1/du)(dh2/dv) - (dh1/dv)(dh2/du). The absolute value |J| accounts for orientation. Equivalently, |J| = 1 / |J_forward| where J_forward = det [[dg1/dx, dg1/dy], [dg2/dx, dg2/dy]]. Procedure: (1) Find inverse x = h1(u,v), y = h2(u,v); (2) Compute J = det of partial derivatives of (h1, h2) w.r.t. (u, v); (3) Substitute and multiply by |J|; (4) Determine new support. Example: U = X + Y, V = X - Y. Inverse: X = (U+V)/2, Y = (U-V)/2. J = det [[1/2, 1/2], [1/2, -1/2]] = -1/4 - 1/4 = -1/2. |J| = 1/2. f_{U,V}(u,v) = f_{X,Y}((u+v)/2, (u-v)/2) * (1/2). If not one-to-one: partition domain into one-to-one pieces, sum contributions (like Box-Muller polar). This generalizes to n dimensions with n x n Jacobian determinant.',
  'ch08p4_jacobian_transformation',
  'formula_recall',
  ['Jacobian transformation', 'joint PDF transform', 'change of variables', 'determinant']
)
add(
  'What is the convolution formula for the sum of independent random variables?',
  'If X and Y are independent continuous RVs with PDFs f_X and f_Y, the PDF of Z = X + Y is the convolution f_Z(z) = integral_{-inf}^{inf} f_X(x) f_Y(z - x) dx = integral_{-inf}^{inf} f_X(z - y) f_Y(y) dy. For discrete independent: p_Z(z) = sum_x p_X(x) p_Y(z - x). Derivation (Jacobian / CDF): F_Z(z) = P(X + Y <= z) = integral integral_{x+y<=z} f_X(x) f_Y(y) dx dy = integral f_X(x) [integral_{-inf}^{z-x} f_Y(y) dy] dx = integral f_X(x) F_Y(z-x) dx. Differentiate: f_Z(z) = integral f_X(x) f_Y(z-x) dx. Properties: (1) Convolution is commutative: f_X * f_Y = f_Y * f_X; (2) Associative: (f_X * f_Y) * f_W = f_X * (f_Y * f_W); (3) MGF factors: M_Z(t) = M_X(t) M_Y(t); (4) Characteristic function: phi_Z = phi_X phi_Y. Examples: (a) Sum of iid Uniform(0,1): triangular on [0,2]; (b) Sum of independent Normals: N(mu_X+mu_Y, sigma_X^2+sigma_Y^2); (c) Sum of independent Exponentials(lambda): Gamma(n, lambda); (d) Sum of independent Poissons: Poisson(lambda1+lambda2). For n independent RVs, f_{sum} = f_1 * f_2 * ... * f_n (n-fold convolution). FFT can compute convolutions efficiently.',
  'ch08p4_convolution_sum',
  'formula_recall',
  ['convolution', 'sum of independent', 'f_X * f_Y', 'f_Z(z) = integral f_X f_Y']
)
add(
  'What is the distribution of the sum of independent normal random variables?',
  'If X1 ~ N(mu1, sigma1^2), X2 ~ N(mu2, sigma2^2), ..., Xn ~ N(mun, sigman^2) are INDEPENDENT, then the sum Z = X1 + X2 + ... + Xn ~ N(mu1 + mu2 + ... + mun, sigma1^2 + sigma2^2 + ... + sigman^2). Means add, variances add (since independent, covariances zero). For weighted sum: a1 X1 + ... + an Xn ~ N(sum ai mui, sum ai^2 sigmai^2). MGF proof: M_{Xi}(t) = exp(t mui + (1/2) t^2 sigmai^2). M_Z(t) = product M_{Xi}(t) = exp(t sum mui + (1/2) t^2 sum sigmai^2). This is the MGF of N(sum mui, sum sigmai^2). Examples: (1) X ~ N(3, 4), Y ~ N(-1, 9) independent: X + Y ~ N(2, 13), X - Y ~ N(4, 13); (2) Sample mean of n iid N(mu, sigma^2): X_bar = (1/n) sum Xi ~ N(mu, sigma^2/n); (3) Sum of 100 iid N(50, 16): ~ N(5000, 1600), SD = 40. Even without independence, if JOINTLY normal: sum ~ N(sum mui, sum sigmai^2 + 2 sum_{i<j} Cov(Xi, Xj)). The normal family is CLOSED under sums of independent (or jointly normal) members — this is central to the CLT and statistical inference. For non-independent normals (not jointly normal), the sum need not be normal.',
  'ch08p4_sum_normals',
  'formula_recall',
  ['sum of normals', 'independent normal sum', 'means add variances add', 'normal closure']
)
add(
  'What is the distribution of the sum of independent exponential random variables?',
  'If X1, X2, ..., Xn are iid Exponential(lambda) [rate lambda, mean 1/lambda], then the sum S = X1 + ... + Xn ~ Gamma(n, lambda) (shape n, rate lambda) — also called the Erlang distribution when n is integer. PDF of S: f_S(s) = lambda^n s^{n-1} e^{-lambda s} / (n-1)! for s > 0. Mean: E[S] = n/lambda. Variance: Var(S) = n/lambda^2. MGF: M_S(t) = (lambda / (lambda - t))^n for t < lambda. CDF for integer n (Erlang): F_S(s) = 1 - e^{-lambda s} sum_{k=0}^{n-1} (lambda s)^k / k! (Poisson tail connection). Connection to Poisson process: if events occur at rate lambda, the time until the n-th event is Gamma(n, lambda) = sum of n iid Exp(lambda) (inter-arrival times). Example: customers arrive at rate 3/hour (Poisson). Time until 5th customer: Gamma(5, 3), mean 5/3 hours ~ 1.67 h. P(time < 1 hour) = 1 - e^{-3} sum_{k=0}^{4} 3^k/k! = 1 - e^{-3}(1 + 3 + 4.5 + 4.5 + 3.375) ~ 1 - 0.0498 * 16.375 ~ 1 - 0.815 = 0.185. If exponentials have DIFFERENT rates (non-identical), the sum is hypoexponential (generalized Erlang), not a simple Gamma. Memoryless property of each exponential does not carry to the sum (Gamma is not memoryless for n > 1).',
  'ch08p4_sum_exponentials_gamma',
  'formula_recall',
  ['sum of exponentials', 'Gamma distribution', 'Erlang', 'Poisson process n-th arrival']
)
add(
  'What is the distribution of the ratio of two random variables?',
  'If X and Y are independent continuous RVs with joint PDF f_{X,Y} = f_X f_Y, the PDF of Z = X / Y (for Y != 0) is f_Z(z) = integral_{-inf}^{inf} |y| f_X(zy) f_Y(y) dy. Derivation (Jacobian): let Z = X/Y, W = Y. Then X = ZW, Y = W. Jacobian J = det [[d(ZW)/dZ, d(ZW)/dW], [dW/dZ, dW/dW]] = det [[W, Z], [0, 1]] = W. |J| = |W|. f_{Z,W}(z, w) = f_X(zw) f_Y(w) |w|. Marginalize: f_Z(z) = integral f_{Z,W}(z, w) dw = integral |w| f_X(zw) f_Y(w) dw. Classic example: if X, Y iid N(0, 1) standard normal, then Z = X/Y has the STANDARD CAUCHY distribution: f_Z(z) = 1/(pi (1 + z^2)) for z in R. Proof: f_Z(z) = integral |y| (1/sqrt(2pi)) e^{-(zy)^2/2} (1/sqrt(2pi)) e^{-y^2/2} dy = (1/(2pi)) integral |y| e^{-y^2 (1+z^2)/2} dy = (1/(2pi)) * 2 * integral_0^{inf} y e^{-y^2(1+z^2)/2} dy = (1/pi) * [1/(1+z^2)] = 1/(pi(1+z^2)). Cauchy has no mean, no variance (heavy tails). Ratio of chi-squares gives F-distribution; ratio of normals with nonzero means gives noncentral distributions. Product distribution: Z = XY has f_Z(z) = integral f_X(x) f_Y(z/x) (1/|x|) dx.',
  'ch08p4_ratio_distribution',
  'formula_recall',
  ['ratio distribution', 'X/Y distribution', 'Cauchy from normals', 'ratio PDF']
)
add(
  'What is the distribution of the product of two random variables?',
  'If X and Y are independent continuous RVs, the PDF of Z = XY is f_Z(z) = integral_{-inf}^{inf} (1/|x|) f_X(x) f_Y(z/x) dx. Derivation (Jacobian): let Z = XY, W = X. Then X = W, Y = Z/W. Jacobian J = det [[dW/dZ, dW/dW], [d(Z/W)/dZ, d(Z/W)/dW]] = det [[0, 1], [1/W, -Z/W^2]] = -1/W. |J| = 1/|W| = 1/|x|. f_{Z,W}(z, w) = f_X(w) f_Y(z/w) * (1/|w|). Marginalize: f_Z(z) = integral (1/|w|) f_X(w) f_Y(z/w) dw. Symmetrically, f_Z(z) = integral (1/|y|) f_X(z/y) f_Y(y) dy. Special cases: (1) If Y = c (constant), Z = cX: f_Z(z) = (1/|c|) f_X(z/c) (scaling); (2) If X, Y ~ N(0,1) independent: product XY has PDF f_Z(z) = (1/pi) K_0(|z|) where K_0 is modified Bessel function of the second kind; (3) Lognormal: if X, Y lognormal, log Z = log X + log Y is sum of normals, so Z is lognormal (product of lognormals is lognormal). Product of uniforms: Z = XY with X, Y iid U(0,1) has f_Z(z) = -ln(z) for 0 < z < 1 (since f_Z(z) = integral_z^1 (1/x) f_Y(z/x) dx = integral_z^1 (1/x) dx = -ln z). MGF of product generally not tractable; use Mellin transform for products (analog of Fourier for sums). Products arise in: financial returns (compounding), signal processing (modulation), Bayesian priors.',
  'ch08p4_product_distribution',
  'formula_recall',
  ['product distribution', 'XY distribution', 'product PDF', 'Jacobian product']
)
add(
  'What is the Box-Muller transform for generating normal random variables?',
  'The Box-Muller transform generates independent standard normal RVs from independent uniform RVs. If U1, U2 ~ Uniform(0, 1) independent, define: Z1 = sqrt(-2 ln U1) cos(2 pi U2), Z2 = sqrt(-2 ln U1) sin(2 pi U2). Then Z1, Z2 are iid N(0, 1). Derivation: let R^2 = -2 ln U1 (so R^2 ~ Exp(1/2) = Chi-square(1)) and Theta = 2 pi U2 (Uniform(0, 2pi)), independent. Then (Z1, Z2) = (R cos Theta, R sin Theta) is the Cartesian form of polar (R, Theta). Since standard bivariate normal in polar: f(r, theta) = (1/(2pi)) e^{-r^2/2} r, with R, Theta independent, Theta uniform, R^2 ~ Exp(1/2). So Box-Muller inverts: from U1 uniform, R^2 = -2 ln U1 gives correct radial; from U2 uniform, Theta = 2pi U2 gives correct angle. Polar (Marsaglia) variant avoids trig: let V1, V2 ~ Uniform(-1,1) until S = V1^2 + V2^2 < 1; then Z1 = V1 sqrt(-2 ln S / S), Z2 = V2 sqrt(-2 ln S / S). Box-Muller is the foundation of pseudo-random normal generation in statistics and simulation. Generalizations: (1) Generate correlated normals: (X, Y) = (mu_X + sigma_X Z1, mu_Y + sigma_Y (rho Z1 + sqrt(1-rho^2) Z2)) gives bivariate normal with correlation rho; (2) Multivariate normal via Cholesky: X = mu + L Z where Sigma = L L^T.',
  'ch08p4_box_muller',
  'formula_recall',
  ['Box-Muller', 'normal generation', 'uniform to normal', 'polar method']
)

// ============================================================
// SECTION 6 — ORDER STATISTICS & MULTIVARIATE (7 items)
// ============================================================
add(
  'What are order statistics of a random sample?',
  'Given a random sample X1, X2, ..., Xn (iid), the order statistics are the sorted values: X_(1) <= X_(2) <= ... <= X_(n), where X_(1) = min(X1,...,Xn) (smallest), X_(n) = max(X1,...,Xn) (largest), X_(k) = k-th smallest. The order statistics are NOT independent (they are ordered) even though the original Xi are iid. Key order statistics: X_(1) = minimum, X_(n) = maximum, X_((n+1)/2) = median (n odd), X_(n) - X_(1) = range. Applications: (1) Median (robust center); (2) Quartiles, percentiles; (3) Range (spread); (4) Tolerance intervals; (5) Nonparametric statistics (Wilcoxon, Kolmogorov-Smirnov); (6) Reliability (weakest link: min of strengths). The joint PDF of all order statistics (for iid continuous with PDF f and CDF F): f_{X_(1),...,X_(n)}(x1,...,xn) = n! product_{i=1}^n f(x_i) for x1 <= x2 <= ... <= xn, 0 otherwise. The n! accounts for n! permutations of the original sample leading to the same ordered sequence. Order statistics are fundamental in nonparametric inference, robust statistics, and extreme value theory.',
  'ch08p4_order_statistics_definition',
  'formula_recall',
  ['order statistics', 'X_(k)', 'sorted sample', 'minimum maximum']
)
add(
  'What are the distributions of the minimum and maximum of n iid random variables?',
  'For X1, ..., Xn iid with CDF F and PDF f: MAXIMUM M = X_(n) = max(X1,...,Xn). CDF: F_M(m) = P(M <= m) = P(all Xi <= m) = [F(m)]^n (independence). PDF: f_M(m) = n [F(m)]^{n-1} f(m) (derivative). MINIMUM L = X_(1) = min(X1,...,Xn). CDF: F_L(l) = 1 - P(all Xi > l) = 1 - [1 - F(l)]^n. PDF: f_L(l) = n [1 - F(l)]^{n-1} f(l). Examples: (1) Uniform(0,1), n samples: M has CDF m^n, PDF n m^{n-1} on [0,1] (Beta(n,1)); L has CDF 1-(1-l)^n, PDF n(1-l)^{n-1} (Beta(1,n)); E[M] = n/(n+1), E[L] = 1/(n+1), E[range] = (n-1)/(n+1). (2) Exponential(lambda): L = min ~ Exp(n lambda) (minimum of n iid exponentials is exponential with rate n*lambda); E[L] = 1/(n lambda); M has CDF [1 - e^{-lambda m}]^n, no simple closed form but E[M] = H_n / lambda (harmonic number sum_{k=1}^n 1/k). Extreme value theory: as n -> inf, properly normalized M converges to Gumbel, Frechet, or Weibull depending on tail of F. Applications: (a) Reliability: series system (weakest link) lifetime = min; parallel system = max; (b) Record values; (c) Flood/earthquake maximum over years.',
  'ch08p4_min_max_distribution',
  'formula_recall',
  ['minimum maximum distribution', 'X_(1) X_(n)', 'min of iid', 'max of iid']
)
add(
  'What is the PDF of the k-th order statistic?',
  'For X1, ..., Xn iid continuous with CDF F and PDF f, the k-th order statistic X_(k) has PDF: f_{X_(k)}(x) = n! / [(k-1)! (n-k)!] [F(x)]^{k-1} [1 - F(x)]^{n-k} f(x). Derivation: for X_(k) in (x, x+dx), exactly k-1 observations below x, one in (x, x+dx), n-k above x. Multinomial count: n! / [(k-1)! 1! (n-k)!] * [F(x)]^{k-1} * f(x)dx * [1-F(x)]^{n-k}. CDF: F_{X_(k)}(x) = P(X_(k) <= x) = P(at least k of n <= x) = sum_{j=k}^{n} C(n,j) [F(x)]^j [1-F(x)]^{n-j}. For Uniform(0,1): X_(k) ~ Beta(k, n-k+1) with PDF n! / [(k-1)!(n-k)!] x^{k-1} (1-x)^{n-k}. Mean (uniform): E[X_(k)] = k/(n+1). Variance: k(n-k+1)/[(n+1)^2 (n+2)]. Median: X_((n+1)/2) for n odd ~ Beta((n+1)/2, (n+1)/2). Applications: (1) Sample median = X_((n+1)/2) (n odd) or average of X_(n/2), X_(n/2 + 1) (n even); (2) Quartiles: X_(n/4), X_(3n/4); (3) Percentiles: X_(pn/100); (4) Confidence intervals for quantiles (nonparametric, distribution-free). The k-th order statistic is central to nonparametric statistics and robust estimation.',
  'ch08p4_kth_order_statistic',
  'formula_recall',
  ['k-th order statistic', 'X_(k) PDF', 'Beta distribution', 'order statistic density']
)
add(
  'What is the joint PDF of two order statistics?',
  'For X1, ..., Xn iid continuous with PDF f and CDF F, the joint PDF of the j-th and k-th order statistics (1 <= j < k <= n) is: f_{X_(j), X_(k)}(u, v) = n! / [(j-1)! (k-j-1)! (n-k)!] [F(u)]^{j-1} [F(v) - F(u)]^{k-j-1} [1 - F(v)]^{n-k} f(u) f(v) for u < v. Derivation: j-1 below u, one at u (in du), k-j-1 between u and v, one at v (in dv), n-k above v. Multinomial coefficient. Special case — joint of min and max (j=1, k=n): f_{X_(1), X_(n)}(u, v) = n(n-1) [F(v) - F(u)]^{n-2} f(u) f(v) for u < v. For Uniform(0,1): f_{X_(1), X_(n)}(u, v) = n(n-1) (v - u)^{n-2} for 0 < u < v < 1. Range R = X_(n) - X_(1): for Uniform(0,1), R ~ Beta(n-1, 2) with PDF n(n-1) r^{n-2} (1-r). E[R] = (n-1)/(n+1). Joint of all n order statistics: f_{X_(1),...,X_(n)}(x1,...,xn) = n! product f(x_i) for x1 < x2 < ... < xn. The joint distributions of order statistics underlie nonparametric tests (Wilcoxon rank-sum uses ranks = positions of order statistics; Kolmogorov-Smirnov uses max deviation of empirical CDF). Spacings (differences X_(k) - X_(k-1)) for Uniform(0,1) have Dirichlet distribution.',
  'ch08p4_joint_order_statistics',
  'formula_recall',
  ['joint order statistics', 'X_(j) X_(k) joint', 'order statistic joint PDF', 'range distribution']
)
add(
  'What is the distribution of the range of a random sample?',
  'The range R = X_(n) - X_(1) = max - min of a random sample. Joint PDF of min and max (iid continuous with CDF F, PDF f): f_{X_(1), X_(n)}(u, v) = n(n-1) [F(v) - F(u)]^{n-2} f(u) f(v) for u < v. To get PDF of R, substitute v = u + r and integrate over u: f_R(r) = integral_{-inf}^{inf} n(n-1) [F(u+r) - F(u)]^{n-2} f(u) f(u+r) du for r > 0. For Uniform(0, 1): F(u) = u, f(u) = 1 on [0,1]. f_R(r) = n(n-1) integral_0^{1-r} (u + r - u)^{n-2} du = n(n-1) r^{n-2} (1 - r) for 0 < r < 1. This is Beta(n-1, 2). E[R] = (n-1)/(n+1), Var(R) = 2(n-1)/[(n+1)^2 (n+2)]. For n = 2: R ~ Beta(1, 2) = triangular, E[R] = 1/3. For large n: E[R] -> 1 (range fills the interval). For exponential: spacings are independent exponentials (Renyi representation); range distribution more complex. For normal: no closed form, uses tables. Applications: (1) Quality control (R-chart monitors process spread); (2) Quick estimate of sigma: R/d2 factor (d2 from tables, e.g., d2 = 2.326 for n=5); (3) Nonparametric tolerance intervals; (4) Tests for uniformity (range too small suggests clustering).',
  'ch08p4_range_distribution',
  'formula_recall',
  ['range distribution', 'max minus min', 'R = X_(n) - X_(1)', 'Beta(n-1, 2) uniform']
)
add(
  'What is the multinomial distribution?',
  'The multinomial distribution generalizes the binomial to k categories. If n independent trials each land in one of k categories with probabilities p1, p2, ..., pk (sum p_i = 1), then the count vector (X1, ..., Xk) ~ Multinomial(n, p1, ..., pk) has PMF: P(X1 = x1, ..., Xk = xk) = n! / (x1! x2! ... xk!) p1^{x1} p2^{x2} ... pk^{xk} for nonneg integers x_i summing to n. Mean: E[X_i] = n p_i. Variance: Var(X_i) = n p_i (1 - p_i). Covariance: Cov(X_i, X_j) = -n p_i p_j for i != j (negative, since counts compete). Correlation: rho_{ij} = -sqrt(p_i p_j / ((1-p_i)(1-p_j))). Marginal: X_i ~ Binomial(n, p_i) (each category is "success" vs "rest"). Conditional: (X1, ..., Xk) | X_i = m ~ Multinomial(n - m, p_j/(1-p_i) for j != i). MGF: M(t) = (sum p_i e^{t_i})^n. Special case k=2: Binomial(n, p1). Example: roll fair die 10 times, counts of 1-6 ~ Multinomial(10, 1/6, ..., 1/6). P(exactly two 1s, three 2s, one 3, zero 4s, two 5s, two 6s) = 10!/(2!3!1!0!2!2!) (1/6)^10. Chi-square goodness-of-fit: sum (O_i - E_i)^2 / E_i ~ chi-square(k-1) asymptotically, where E_i = n p_i. The multinomial underlies categorical data analysis, text classification (bag of words), and genetics (Hardy-Weinberg).',
  'ch08p4_multinomial',
  'formula_recall',
  ['multinomial distribution', 'multinomial PMF', 'k categories', 'generalized binomial']
)
add(
  'What is the multivariate hypergeometric distribution?',
  'The multivariate hypergeometric generalizes the hypergeometric to k categories. Population has N items in k categories with counts a1, a2, ..., ak (sum a_i = N). Draw n items WITHOUT replacement. The count vector (X1, ..., Xk) has PMF: P(X1=x1, ..., Xk=xk) = product_{i=1}^k C(a_i, x_i) / C(N, n) for nonneg integers x_i summing to n and x_i <= a_i. Mean: E[X_i] = n a_i / N. Variance: Var(X_i) = n (a_i/N) (1 - a_i/N) ((N-n)/(N-1)) — note the finite population correction (FPC) (N-n)/(N-1). Covariance: Cov(X_i, X_j) = -n a_i a_j (N-n) / [N^2 (N-1)] for i != j (negative, since drawing one category reduces others). Marginal: X_i ~ Hypergeometric(N, a_i, n). Special case k=2: Hypergeometric(N, a1, n). Relation to multinomial: as N -> inf with a_i/N -> p_i fixed, multivariate hypergeometric -> Multinomial(n, p) (sampling without replacement approximates with replacement for large N). Example: deck of 52 cards (4 suits of 13). Draw 5 cards. Counts of spades, hearts, diamonds, clubs ~ MultivariateHypergeometric(N=52, a1=a2=a3=a4=13, n=5). P(exactly 2 spades, 2 hearts, 1 diamond, 0 clubs) = C(13,2) C(13,2) C(13,1) C(13,0) / C(52,5) = 78 * 78 * 13 / 2598960 ~ 0.0305. Used in: survey sampling (stratified), ecology (capture-recapture), quality inspection.',
  'ch08p4_multivariate_hypergeometric',
  'formula_recall',
  ['multivariate hypergeometric', 'without replacement k categories', 'FPC', 'deck of cards']
)

// ============================================================
// SECTION 7 — WORKED PROBLEMS (7 items)
// ============================================================
add(
  'The joint PDF of X and Y is f(x,y) = 2 for 0 < y < x < 1. Find P(X + Y <= 1).',
  'Joint PDF problem. Support: triangle 0 < y < x < 1, f = 2. Verify normalization: integral_0^1 integral_0^x 2 dy dx = integral_0^1 2x dx = 1 ✓. Find P(X + Y <= 1). Region: 0 < y < x < 1 AND x + y <= 1. Since y < x, the line x + y = 1 intersects y = x at x = 1/2. For 0 < x < 1/2: y ranges 0 to x (all satisfy x + y <= 2x < 1). For 1/2 < x < 1: y ranges 0 to 1 - x (upper bound from x + y <= 1, less than x). P = integral_0^{1/2} integral_0^x 2 dy dx + integral_{1/2}^1 integral_0^{1-x} 2 dy dx. First: integral_0^{1/2} 2x dx = x^2 |_0^{1/2} = 1/4. Second: integral_{1/2}^1 2(1-x) dx = 2 [x - x^2/2]_{1/2}^1 = 2 [(1 - 1/2) - (1/2 - 1/8)] = 2 [1/2 - 3/8] = 2 * 1/8 = 1/4. Total: 1/4 + 1/4 = 1/2. So P(X + Y <= 1) = 1/2. Check: by symmetry of the triangle about x = 1/2 (after rotation), half the probability is below x + y = 1.',
  'ch08p4_worked_joint_pdf_integrate',
  'problem_solving',
  ['joint PDF worked', 'f = 2 triangle', 'P(X+Y<=1)', 'integration region']
)
add(
  'X and Y have joint PDF f(x,y) = 1 on the unit square [0,1] x [0,1]. Find the marginal and conditional distributions.',
  'Uniform on unit square problem. f_{X,Y}(x, y) = 1 for 0 < x < 1, 0 < y < 1. Marginal of X: f_X(x) = integral_0^1 1 dy = 1 for 0 < x < 1. So X ~ Uniform(0, 1). Marginal of Y: f_Y(y) = integral_0^1 1 dx = 1 for 0 < y < 1. So Y ~ Uniform(0, 1). Conditional f_{Y|X}(y|x) = f_{X,Y}/f_X = 1/1 = 1 for 0 < y < 1. So Y | X = x ~ Uniform(0, 1) for any x — conditional = marginal, confirming independence. Indeed f_{X,Y} = f_X * f_Y = 1*1 = 1 ✓, so X and Y are independent. E[X] = 1/2, Var(X) = 1/12. E[Y] = 1/2, Var(Y) = 1/12. Cov(X, Y) = E[XY] - E[X]E[Y] = integral_0^1 integral_0^1 xy dx dy - 1/4 = (1/2)(1/2) - 1/4 = 0. So rho = 0 (uncorrelated), consistent with independence. E[X + Y] = 1, Var(X + Y) = 1/12 + 1/12 = 1/6 (independence, variances add). P(X + Y < 1) = 1/2 (triangle half of square). P(X > Y) = 1/2 (symmetry). P(max(X,Y) < 1/2) = P(X<1/2) P(Y<1/2) = 1/4. P(min(X,Y) < 1/2) = 1 - P(X>1/2) P(Y>1/2) = 1 - 1/4 = 3/4.',
  'ch08p4_worked_marginal_from_joint',
  'problem_solving',
  ['uniform square worked', 'marginal conditional', 'independent uniform', 'unit square']
)
add(
  'The joint PDF is f(x,y) = x + y for 0 < x < 1, 0 < y < 1. Find E[Y | X = x] and Var(Y | X = x).',
  'Conditional expectation problem. f_{X,Y}(x, y) = x + y on unit square [0,1]^2. Verify normalization: integral_0^1 integral_0^1 (x + y) dx dy = integral_0^1 [x^2/2 + xy]_0^1 dy = integral_0^1 (1/2 + y) dy = [y/2 + y^2/2]_0^1 = 1/2 + 1/2 = 1 ✓. Marginal of X: f_X(x) = integral_0^1 (x + y) dy = [xy + y^2/2]_0^1 = x + 1/2. Conditional f_{Y|X}(y|x) = (x + y) / (x + 1/2) for 0 < y < 1. E[Y | X = x] = integral_0^1 y * (x + y)/(x + 1/2) dy = (1/(x + 1/2)) integral_0^1 (xy + y^2) dy = (1/(x + 1/2)) [xy^2/2 + y^3/3]_0^1 = (1/(x + 1/2)) (x/2 + 1/3) = (x/2 + 1/3)/(x + 1/2) = (3x + 2)/(6x + 3) = (3x + 2)/(3(2x + 1)). At x = 0: E[Y|X=0] = 2/3. At x = 1: E[Y|X=1] = 5/9 ~ 0.556. E[Y^2 | X = x] = (1/(x+1/2)) integral_0^1 (x y^2 + y^3) dy = (1/(x+1/2)) [x/3 + 1/4] = (4x + 3)/(12x + 6). Var(Y|X=x) = E[Y^2|X=x] - (E[Y|X=x])^2. At x = 0: E[Y^2|0] = 3/6 = 1/2, Var = 1/2 - 4/9 = 1/18 ~ 0.056.',
  'ch08p4_worked_conditional_expectation',
  'problem_solving',
  ['conditional expectation worked', 'f = x + y', 'E[Y|X]', 'conditional variance']
)
add(
  'For bivariate normal with mu_X = mu_Y = 0, sigma_X = sigma_Y = 1, rho = 0.5, find P(X > 0, Y > 0).',
  'Bivariate normal probability problem. (X, Y) ~ N_2(0, 0, 1, 1, rho = 0.5). Both marginals standard normal. P(X > 0) = P(Y > 0) = 1/2 (symmetric about 0). The joint probability P(X > 0, Y > 0) depends on rho. Formula: for bivariate standard normal with correlation rho, P(X > 0, Y > 0) = 1/4 + (1/(2pi)) arcsin(rho). Derivation: transform to polar; the region {X > 0, Y > 0} is the first quadrant; the angular measure depends on rho through the elliptical level sets. Substituting rho = 0.5: arcsin(0.5) = pi/6. P = 1/4 + (1/(2pi)) * (pi/6) = 1/4 + 1/12 = 3/12 + 1/12 = 4/12 = 1/3. So P(X > 0, Y > 0) = 1/3 ~ 0.333. Checks: (1) rho = 0 (independent): P = 1/4 + 0 = 1/4 = (1/2)(1/2) ✓; (2) rho = 1 (perfect): P = 1/4 + (1/(2pi))(pi/2) = 1/4 + 1/4 = 1/2 ✓; (3) rho = -1: P = 1/4 + (1/(2pi))(-pi/2) = 1/4 - 1/4 = 0 ✓. Also P(X > 0, Y < 0) = P(X>0) - P(X>0, Y>0) = 1/2 - 1/3 = 1/6. The arcsin formula is a beautiful closed form for quadrant probabilities of bivariate normal.',
  'ch08p4_worked_bivariate_normal_prob',
  'problem_solving',
  ['bivariate normal worked', 'P(X>0, Y>0)', 'arcsin rho', 'quadrant probability']
)
add(
  'Given the joint PMF table P(X=0,Y=0)=0.1, P(0,1)=0.2, P(1,0)=0.3, P(1,1)=0.4, find Cov(X, Y).',
  'Covariance calculation from joint table. Joint PMF: p(0,0) = 0.1, p(0,1) = 0.2, p(1,0) = 0.3, p(1,1) = 0.4. Check normalization: 0.1 + 0.2 + 0.3 + 0.4 = 1 ✓. Marginal of X: P(X=0) = 0.1 + 0.2 = 0.3, P(X=1) = 0.3 + 0.4 = 0.7. E[X] = 0 * 0.3 + 1 * 0.7 = 0.7. E[X^2] = 0.7. Var(X) = 0.7 - 0.49 = 0.21. Marginal of Y: P(Y=0) = 0.1 + 0.3 = 0.4, P(Y=1) = 0.2 + 0.4 = 0.6. E[Y] = 0.6. E[Y^2] = 0.6. Var(Y) = 0.6 - 0.36 = 0.24. E[XY] = sum xy p(x,y) = 0*0*0.1 + 0*1*0.2 + 1*0*0.3 + 1*1*0.4 = 0.4. Cov(X, Y) = E[XY] - E[X]E[Y] = 0.4 - 0.7*0.6 = 0.4 - 0.42 = -0.02. So Cov = -0.02 (slightly negative). Correlation: rho = Cov / (sigma_X sigma_Y) = -0.02 / sqrt(0.21 * 0.24) = -0.02 / sqrt(0.0504) = -0.02 / 0.2249 ~ -0.089. Weak negative correlation. Check independence: p(0,0) = 0.1 vs p_X(0) p_Y(0) = 0.3 * 0.4 = 0.12. Not equal, so X, Y are DEPENDENT (even though weakly correlated). Note: for 2x2 Bernoulli table, Cov = p(1,1) - p_X(1) p_Y(1) = 0.4 - 0.42 = -0.02 ✓.',
  'ch08p4_worked_covariance_calc',
  'problem_solving',
  ['covariance worked', 'joint PMF table', 'Cov calculation', '2x2 table']
)
add(
  'If X and Y are independent Uniform(0, 1), find the PDF of Z = X + Y.',
  'Sum of uniforms (convolution) problem. X, Y iid Uniform(0, 1), independent. Z = X + Y. Convolution: f_Z(z) = integral f_X(x) f_Y(z - x) dx = integral_{max(0, z-1)}^{min(1, z)} 1 dx (where both f_X and f_Y nonzero). Case 1: 0 < z < 1. Bounds: x from 0 to z (since z - x < 1 always, and x < 1 always). f_Z(z) = integral_0^z 1 dx = z. Case 2: 1 <= z < 2. Bounds: x from z-1 to 1 (since z - x > 0 requires x < z, and z - x < 1 requires x > z - 1). f_Z(z) = integral_{z-1}^1 1 dx = 1 - (z-1) = 2 - z. Case 3: z < 0 or z >= 2: f_Z(z) = 0. So f_Z(z) = z for 0 < z < 1, 2 - z for 1 <= z < 2, 0 otherwise — the TRIANGULAR distribution on [0, 2] with peak 1 at z = 1. Verify: integral_0^1 z dz + integral_1^2 (2-z) dz = 1/2 + 1/2 = 1 ✓. E[Z] = E[X] + E[Y] = 1/2 + 1/2 = 1. Var(Z) = Var(X) + Var(Y) = 1/12 + 1/12 = 1/6 (independence). Check: integral z^2 f_Z dz = integral_0^1 z^3 dz + integral_1^2 z^2 (2-z) dz = 1/4 + (2*7/3 - 15/4) = 1/4 + 1/12 = 1/3... let me just confirm Var = E[Z^2] - 1 = 7/6 - 1 = 1/6 ✓. Median = 1 (symmetric). P(Z > 1) = 1/2. P(Z < 0.5) = integral_0^{0.5} z dz = 0.125.',
  'ch08p4_worked_sum_uniforms',
  'problem_solving',
  ['sum of uniforms worked', 'triangular distribution', 'convolution', 'Z = X + Y']
)
add(
  'Three independent light bulbs have Exponential lifetimes with mean 1000 hours. Find the PDF and mean of the time until the FIRST bulb fails.',
  'Order statistic (minimum) problem. X1, X2, X3 iid Exponential(lambda = 1/1000) (rate = 1/mean = 0.001 per hour). Time until first failure: T = min(X1, X2, X3) = X_(1). For n iid exponentials with rate lambda, the minimum is Exponential(n * lambda). So T ~ Exponential(3 * 0.001) = Exponential(0.003). PDF: f_T(t) = 0.003 e^{-0.003 t} for t > 0. CDF: F_T(t) = 1 - e^{-0.003 t}. Mean: E[T] = 1/0.003 = 1000/3 ~ 333.33 hours. Variance: 1/(0.003)^2 = 1/9e-6 ~ 111111; SD ~ 333.33 hours (same as mean for exponential). Median: ln(2)/0.003 ~ 231 hours. P(T > 500) = e^{-0.003 * 500} = e^{-1.5} ~ 0.2231 (22.3% chance all 3 survive past 500h). P(T < 200) = 1 - e^{-0.6} ~ 1 - 0.5488 = 0.4512 (45.1% chance at least one fails by 200h). Interpretation: the weakest of 3 bulbs fails on average at 333h, much sooner than a single bulb (1000h) — redundancy in PARALLEL would use max, but "first failure" is SERIES (system fails when any bulb fails). Memoryless: P(T > 500 + 200 | T > 500) = P(T > 200) = 1 - 0.4512 = 0.5488. Contrast with maximum: M = max(X1, X2, X3) has E[M] = 1000 * (1 + 1/2 + 1/3) = 1000 * 11/6 ~ 1833h (harmonic sum).',
  'ch08p4_worked_order_statistic',
  'problem_solving',
  ['order statistic worked', 'min of exponentials', 'first failure', 'n*lambda rate']
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
  subject: 'mathematics_formulas_volume_9_chapter_08_part_04',
  volume:
    'Volume 9 — Comprehensive Formula Encyclopedia, Chapter 8 Part 4 (Joint Distributions & Multivariate — Joint/Marginal/Conditional Distributions, Covariance Correlation & Independence, Bivariate Normal Distribution, Conditional Expectation & Variance, Transformations of Joint RVs, Order Statistics & Multivariate Distributions, Worked Problems)',
  source: 'TRIZA Generated Formula Dataset',
  language: 'en',
  religionNeutral: true,
  items,
}

mkdirSync('data', { recursive: true })
writeFileSync('data/math-formulas-vol9-ch08p4.json', JSON.stringify(out, null, 2))

console.log(`Wrote data/math-formulas-vol9-ch08p4.json with ${items.length} items.`)
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
