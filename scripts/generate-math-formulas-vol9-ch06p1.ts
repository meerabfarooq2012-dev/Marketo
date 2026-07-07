/**
 * ============================================================
 *  Mathematics Formula Encyclopedia — Volume 9
 *  Comprehensive Formula Reference
 *  Chapter 6 — Part 1 (First-Order Ordinary Differential
 *  Equations)
 *  Introduction & Classification, Separable, Linear,
 *  Exact, Bernoulli, Homogeneous, Substitutions, Modeling,
 *  Direction Fields, Existence & Uniqueness, Euler Method,
 *  Autonomous Equations, Worked Problems
 *  Generator for TRIZA
 * ============================================================
 *
 *  Output: data/math-formulas-vol9-ch06p1.json
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
// SECTION 1 — INTRODUCTION & CLASSIFICATION (6 items)
// ============================================================
add(
  'What is a differential equation?',
  'A differential equation (DE) is an equation containing one or more derivatives of an unknown function. General form: F(x, y, y\', y\', ..., y^(n)) = 0. Example: dy/dx = 2x has solution y = x^2 + C. Example: y\'\' + y = 0 has solution y = A cos x + B sin x. Two types: ordinary (ODE, one independent variable) and partial (PDE, multiple independent variables). Example PDE: partial u/partial t = k partial^2 u/partial x^2 (heat equation). DEs model rates of change: population growth, radioactive decay, motion, cooling, circuits. ✓',
  'ch06p1_de_definition',
  'formula_recall',
  ['differential equation', 'derivative', 'unknown function', 'ODE', 'PDE']
)

add(
  'How do you classify differential equations by order and degree?',
  'Order: highest derivative present. Degree: power of highest-order derivative (when equation is polynomial in derivatives). Example: y\'\'\' + 2y\' = x has order 3, degree 1. Example: (y\'\')^2 + y\' = 0 has order 2, degree 2. Example: y\'\' = sin(y\') has order 2, degree 1 (after solving for y\'\': y\'\' = sin(y\')). Example: (d^2y/dx^2)^(3/2) = x is degree 3/2 (not polynomial — degree undefined or fractional). Most textbook DEs are first-degree (linear in highest derivative). ✓',
  'ch06p1_order_degree',
  'formula_recall',
  ['order', 'degree', 'classification', 'highest derivative', 'power']
)

add(
  'What makes a differential equation linear or nonlinear?',
  'A DE is linear if (1) the dependent variable y and all its derivatives appear to the first power, (2) no products of y with derivatives (like y·y\' or y·y\'\'), (3) no nonlinear functions of y (like sin(y), e^y, y^2, sqrt(y)). Standard linear first-order: dy/dx + P(x) y = Q(x). Linear nth-order: a_n(x) y^(n) + ... + a_1(x) y\' + a_0(x) y = g(x). Example linear: y\'\' + 4y\' + 4y = e^x. Example nonlinear: y\' = y^2 (y squared), y\'\' = sin(y), y\' + y y\'\' = 0 (product), y\' = sqrt(y). Linear DEs have well-developed theory; superposition applies. ✓',
  'ch06p1_linear_nonlinear',
  'formula_recall',
  ['linear', 'nonlinear', 'first power', 'superposition', 'products']
)

add(
  'What is the difference between a general solution and a particular solution?',
  'General solution: family of all solutions, contains arbitrary constants (n constants for nth-order linear ODE). Example: y\'\' + y = 0 has general solution y = C_1 cos x + C_2 sin x. Particular solution: specific member of the family (no arbitrary constants), obtained by giving values to constants via initial/boundary conditions. Example: with y(0) = 1, y\'(0) = 0, get y = cos x. Singular solution: solution not obtainable from general solution (rare). Example: y = x dy/dx + 1/(dy/dx) has general solution y = Cx + 1/C and singular solution y^2 = 4x (envelope). ✓',
  'ch06p1_general_particular_solution',
  'formula_recall',
  ['general solution', 'particular solution', 'arbitrary constant', 'initial condition', 'singular']
)

add(
  'What is an initial value problem (IVP)?',
  'An IVP is a DE plus initial condition(s) specifying y and derivatives at a point. First-order IVP: dy/dx = f(x, y), y(x_0) = y_0. Second-order: y\'\' = f(x, y, y\'), y(x_0) = y_0, y\'(x_0) = y_1. Goal: find particular solution. Example: dy/dx = 2x, y(0) = 3. Integrate: y = x^2 + C. Use IC: 3 = 0 + C, so C = 3. Answer: y = x^2 + 3. Example: y\'\' = -g, y(0) = 0, y\'(0) = v_0 (projectile). Integrate twice: y = -g x^2/2 + v_0 x. ✓',
  'ch06p1_ivp_definition',
  'formula_recall',
  ['initial value problem', 'IVP', 'initial condition', 'particular', 'y(x_0) = y_0']
)

add(
  'How do you verify a function is a solution to a differential equation?',
  'Verification: substitute y (and derivatives) into DE, check both sides equal. Example: verify y = e^(2x) solves y\'\' - 4y = 0. y\' = 2e^(2x), y\'\' = 4e^(2x). LHS: 4e^(2x) - 4·e^(2x) = 0 = RHS. ✓. Example: verify y = C_1 e^x + C_2 e^(-x) solves y\'\' - y = 0. y\'\' = C_1 e^x + C_2 e^(-x) = y. So y\'\' - y = 0. ✓. Example: verify y = x^2 + 1 solves (dy/dx)^2 + y dy/dx = 0? y\' = 2x. LHS: 4x^2 + (x^2+1)(2x) = 4x^2 + 2x^3 + 2x. Not zero. ✗ Not a solution. ✓',
  'ch06p1_verify_solution',
  'problem_solving',
  ['verify', 'substitute', 'check', 'solution', 'differentiate']
)

// ============================================================
// SECTION 2 — SEPARABLE EQUATIONS (7 items)
// ============================================================
add(
  'What is a separable differential equation?',
  'A first-order ODE is separable if it can be written as dy/dx = g(x) h(y), i.e., the right side factors into a function of x times a function of y. Equivalent form: M(x) dx = N(y) dy (or f(y) dy = g(x) dx). Solution method: separate variables (divide by h(y), multiply by dx), then integrate both sides: integral dy/h(y) = integral g(x) dx + C. Example: dy/dx = x/y is separable: y dy = x dx. Integrate: y^2/2 = x^2/2 + C, so y^2 - x^2 = C. Example: dy/dx = y sin x: dy/y = sin x dx. Integrate: ln|y| = -cos x + C, so y = C\' e^(-cos x). ✓',
  'ch06p1_separable_definition',
  'formula_recall',
  ['separable', 'separate variables', 'g(x) h(y)', 'integrate', 'first-order']
)

add(
  'How do you solve a separable differential equation step by step?',
  'Steps: (1) Identify dy/dx = f(x, y). (2) Factor f(x, y) into g(x)·h(y) if possible. (3) Separate: dy/h(y) = g(x) dx. (4) Integrate both sides: integral dy/h(y) = integral g(x) dx + C. (5) Solve for y if possible (often leave implicit). (6) Apply initial condition to find C. Example: dy/dx = 2xy, y(0) = 3. Separate: dy/y = 2x dx. Integrate: ln|y| = x^2 + C. Solve: y = C\' e^(x^2). IC: 3 = C\' e^0 = C\'. So y = 3 e^(x^2). Example: dy/dx = (x+1)/(y^2+1). Separate: (y^2+1) dy = (x+1) dx. Integrate: y^3/3 + y = x^2/2 + x + C. Implicit solution. ✓',
  'ch06p1_separable_steps',
  'problem_solving',
  ['separable', 'steps', 'separate', 'integrate', 'solve']
)

add(
  'How do you solve dy/dx = ky (exponential growth/decay)?',
  'This is the exponential growth (k > 0) or decay (k < 0) equation. Separable: dy/y = k dx. Integrate: ln|y| = kx + C. Solve: y = y_0 e^(kx) where y_0 = y(0). If IC y(0) = y_0 given, this is the solution. Example: population grows at rate 5%/year, P(0) = 1000. dP/dt = 0.05 P. P = 1000 e^(0.05t). At t = 10: P = 1000 e^0.5 = 1649. Example: radioactive decay, half-life 1600 yr (radium). k = -ln(2)/1600 = -0.000433/yr. After 1000 yr: N = N_0 e^(-0.433) = 0.648 N_0 (65% remains). ✓',
  'ch06p1_exponential_growth_decay',
  'problem_solving',
  ['exponential', 'growth', 'decay', 'dy/dx = ky', 'half-life']
)

add(
  'How do you handle absolute values and lost solutions in separable equations?',
  'When separating dy/dx = g(x) h(y) by dividing by h(y), you may lose solutions where h(y) = 0 (equilibrium solutions). Always check these separately. Example: dy/dx = y^2. Separating: dy/y^2 = dx. Integrate: -1/y = x + C. So y = -1/(x + C). But also y = 0 is a solution (since 0\' = 0 = 0^2). This constant solution was lost when dividing by y^2. Example: dy/dx = y(1 - y) (logistic). Equilibria y = 0 and y = 1 are solutions, lost in separation. Absolute values: ln|y| = ... implies y = +/- e^C · (...). Combine sign into constant. ✓',
  'ch06p1_separable_lost_solutions',
  'problem_solving',
  ['lost solution', 'equilibrium', 'h(y) = 0', 'absolute value', 'separable']
)

add(
  'How do you solve separable equations with implicit solutions?',
  'Many separable DEs cannot be solved for y explicitly; leave the solution implicit. Example: dy/dx = x/(y^2 + 1). Separate: (y^2 + 1) dy = x dx. Integrate: y^3/3 + y = x^2/2 + C. Implicit. Example: dy/dx = (1 + y^2)/(1 + x^2). Separate: dy/(1 + y^2) = dx/(1 + x^2). Integrate: arctan(y) = arctan(x) + C. Solve: y = tan(arctan(x) + C). Using addition formula: y = (x + tan C)/(1 - x tan C). Let C\' = tan C: y = (x + C\')/(1 - C\' x). Example: dy/dx = e^(xy). Not separable (cannot factor x and y). Use other methods. ✓',
  'ch06p1_implicit_solution',
  'problem_solving',
  ['implicit', 'cannot solve for y', 'arctan', 'integrate', 'separable']
)

add(
  'How do you solve separable equations with initial conditions?',
  'Method: separate, integrate (use definite integrals with IC built-in, OR find general then plug IC). Definite-integral method: integral from y_0 to y of (du/h(u)) = integral from x_0 to x of g(t) dt. Example: dy/dx = x y, y(0) = 2. Definite: integral_2^y du/u = integral_0^x t dt. ln(y/2) = x^2/2. So y = 2 e^(x^2/2). Alternative general solution: ln|y| = x^2/2 + C, y = C\' e^(x^2/2). IC: 2 = C\' e^0 = C\'. So y = 2 e^(x^2/2). Same answer. ✓',
  'ch06p1_separable_with_ic',
  'problem_solving',
  ['separable', 'initial condition', 'definite integral', 'find C', 'IC']
)

add(
  'What are orthogonal trajectories and how do you find them?',
  'Orthogonal trajectories: family of curves that intersect a given family at right angles. Method: (1) Find ODE for given family (differentiate, eliminate constant). (2) Replace dy/dx with -dx/dy (negative reciprocal for perpendicular slope). (3) Solve new ODE. Example: family y = Cx^2 (parabolas). Differentiate: dy/dx = 2Cx = 2y/x (since C = y/x^2). Orthogonal ODE: dy/dx = -x/(2y). Separate: 2y dy = -x dx. Integrate: y^2 = -x^2/2 + C, so x^2/2 + y^2 = C. These are ellipses — orthogonal to the parabolas. Application: electric field lines orthogonal to equipotentials. ✓',
  'ch06p1_orthogonal_trajectories',
  'problem_solving',
  ['orthogonal', 'trajectories', 'perpendicular', 'negative reciprocal', 'family']
)

// ============================================================
// SECTION 3 — LINEAR FIRST-ORDER ODEs (6 items)
// ============================================================
add(
  'What is the standard form of a linear first-order ODE?',
  'Standard form: dy/dx + P(x) y = Q(x), where P and Q are functions of x only. If Q(x) = 0, the equation is homogeneous (linear); if Q(x) != 0, nonhomogeneous. Any first-order linear ODE can be put in this form by algebra. Example: x dy/dx + 2y = x^2. Divide by x: dy/dx + (2/x) y = x. So P(x) = 2/x, Q(x) = x. Example: dy/dx = y + e^x. Rewrite: dy/dx - y = e^x. P = -1, Q = e^x. Example: (x^2 + 1) y\' + x y = 1. Divide by x^2+1: y\' + (x/(x^2+1)) y = 1/(x^2+1). Linear first-order. ✓',
  'ch06p1_linear_standard_form',
  'formula_recall',
  ['linear', 'first-order', 'standard form', 'P(x)', 'Q(x)']
)

add(
  'What is an integrating factor and how do you compute it?',
  'For dy/dx + P(x) y = Q(x), the integrating factor mu(x) = e^(integral P(x) dx). Multiplying the ODE by mu makes the left side an exact derivative: d/dx [mu y] = mu Q. Then integrate: mu y = integral mu Q dx + C, so y = (1/mu) [integral mu Q dx + C]. Example: dy/dx + (2/x) y = x. P = 2/x. mu = e^(integral 2/x dx) = e^(2 ln|x|) = x^2. Multiply: x^2 y\' + 2x y = x^3, i.e., (x^2 y)\' = x^3. Integrate: x^2 y = x^4/4 + C, so y = x^2/4 + C/x^2. ✓',
  'ch06p1_integrating_factor',
  'formula_recall',
  ['integrating factor', 'mu', 'e^integral P', 'exact derivative', 'linear']
)

add(
  'How do you solve a linear first-order ODE using the integrating factor?',
  'Steps: (1) Put in standard form: y\' + P(x) y = Q(x). (2) Compute mu = e^(integral P dx). (3) Multiply both sides by mu. (4) Recognize LHS as (mu y)\'. (5) Integrate both sides: mu y = integral mu Q dx + C. (6) Solve for y. Example: y\' - 3y = e^(2x). P = -3, mu = e^(-3x). Multiply: e^(-3x) y\' - 3 e^(-3x) y = e^(-x). LHS = (e^(-3x) y)\'. Integrate: e^(-3x) y = -e^(-x) + C. So y = -e^(2x) + C e^(3x). Example: y\' + (1/x) y = x. P = 1/x, mu = x. (xy)\' = x^2. xy = x^3/3 + C, y = x^2/3 + C/x. ✓',
  'ch06p1_linear_method',
  'problem_solving',
  ['linear', 'integrating factor', 'solve', 'steps', 'multiply']
)

add(
  'How do you solve dy/dx + P(x) y = 0 (homogeneous linear ODE)?',
  'Homogeneous linear first-order: y\' + P(x) y = 0. Separable too. Method 1 (separating): dy/y = -P(x) dx. Integrate: ln|y| = -integral P dx + C. So y = C\' e^(-integral P dx). Method 2 (integrating factor): mu = e^(integral P dx). mu y = integral 0 dx + C = C. y = C/mu = C e^(-integral P dx). Same. Example: y\' + 2x y = 0. integral P dx = x^2. y = C e^(-x^2). Example: y\' + (1/x) y = 0. integral P dx = ln|x|. y = C e^(-ln|x|) = C/x. Check: y = C/x, y\' = -C/x^2, y\' + (1/x)(C/x) = -C/x^2 + C/x^2 = 0. ✓',
  'ch06p1_homogeneous_linear',
  'problem_solving',
  ['homogeneous', 'linear', 'Q = 0', 'exponential', 'integral P']
)

add(
  'How do you apply initial conditions to linear first-order ODEs?',
  'Method: find general solution y = (1/mu)[integral mu Q dx + C], then plug in (x_0, y_0) to solve for C. Example: y\' + 2y = 4, y(0) = 1. P = 2, mu = e^(2x). (e^(2x) y)\' = 4 e^(2x). e^(2x) y = 2 e^(2x) + C. y = 2 + C e^(-2x). IC: 1 = 2 + C, so C = -1. Solution: y = 2 - e^(-2x). Example: y\' - y = 2x e^x, y(0) = 1. P = -1, mu = e^(-x). (e^(-x) y)\' = 2x. e^(-x) y = x^2 + C. y = (x^2 + C) e^x. IC: 1 = C e^0 = C. So y = (x^2 + 1) e^x. Check: y\' = (2x) e^x + (x^2 + 1) e^x = (x^2 + 2x + 1) e^x. y\' - y = (x^2 + 2x + 1 - x^2 - 1) e^x = 2x e^x. ✓',
  'ch06p1_linear_with_ic',
  'problem_solving',
  ['linear', 'initial condition', 'find C', 'apply IC', 'first-order']
)

add(
  'What are common applications of linear first-order ODEs?',
  'Applications: (1) Newton\'s law of cooling: dT/dt = k(T - T_s), linear if T_s constant. Solution: T = T_s + (T_0 - T_s) e^(kt). (2) RC circuit: dQ/dt + Q/(RC) = E/R, Q(0) = 0. Solution: Q = EC(1 - e^(-t/(RC))). (3) Mixture problems: dA/dt = (rate in) - (rate out), e.g., dA/dt = (concentration_in)(flow_in) - (A/V)(flow_out). (4) Drug elimination: dA/dt = -kA + R (constant infusion). (5) Terminal velocity: m dv/dt = mg - kv. v(t) = (mg/k)(1 - e^(-kt/m)). Example: cooling from 100C in 20C room, k = -0.1/min. T = 20 + 80 e^(-0.1t). At t = 10: T = 20 + 80 e^(-1) = 49.4C. ✓',
  'ch06p1_linear_applications',
  'problem_solving',
  ['cooling', 'RC circuit', 'mixture', 'drug elimination', 'terminal velocity']
)

// ============================================================
// SECTION 4 — EXACT EQUATIONS (6 items)
// ============================================================
add(
  'What is an exact differential equation?',
  'A first-order ODE M(x, y) dx + N(x, y) dy = 0 is exact if there exists a function f(x, y) such that partial f/partial x = M and partial f/partial y = N. Then df = M dx + N dy = 0, so f(x, y) = C is the (implicit) solution. Test for exactness (in a simply connected region): partial M/partial y = partial N/partial x. Example: (2x + y) dx + (x + 2y) dy = 0. M = 2x+y, N = x+2y. partial M/partial y = 1, partial N/partial x = 1. Equal, so exact. Example: y dx + x dy = 0. partial M/partial y = 1 = partial N/partial x = 1. Exact. Solution: f = xy = C, so xy = C. ✓',
  'ch06p1_exact_definition',
  'formula_recall',
  ['exact', 'M dx + N dy', 'partial M/partial y', 'partial N/partial x', 'potential']
)

add(
  'How do you solve an exact differential equation?',
  'Steps: (1) Verify exactness: partial M/partial y = partial N/partial x. (2) Find f: integrate M w.r.t. x (treat y constant): f = integral M dx + g(y). (3) Differentiate f w.r.t. y: partial f/partial y = partial/partial y [integral M dx] + g\'(y). Set equal to N. (4) Solve for g\'(y), integrate to get g(y). (5) Solution: f(x, y) = C. Example: (3x^2 + 2xy) dx + (x^2 + 3y^2) dy = 0. M_y = 2x, N_x = 2x. Exact. f = integral (3x^2 + 2xy) dx = x^3 + x^2 y + g(y). f_y = x^2 + g\' = x^2 + 3y^2. g\' = 3y^2, g = y^3. f = x^3 + x^2 y + y^3 = C. ✓',
  'ch06p1_exact_method',
  'problem_solving',
  ['exact', 'solve', 'integrate M dx', 'find f', 'potential function']
)

add(
  'How do you find the potential function f for an exact equation?',
  'Two equivalent methods: Method A (integrate M dx first): f = integral M dx + g(y), then determine g(y) from N. Method B (integrate N dy first): f = integral N dy + h(x), then determine h(x) from M. Example: (e^x + y) dx + (x + e^y) dy = 0. M_y = 1, N_x = 1. Exact. Method A: f = integral (e^x + y) dx = e^x + xy + g(y). f_y = x + g\' = x + e^y. g\' = e^y, g = e^y. f = e^x + xy + e^y = C. Method B: f = integral (x + e^y) dy = xy + e^y + h(x). f_x = y + h\' = e^x + y. h\' = e^x, h = e^x. f = xy + e^y + e^x. Same. ✓',
  'ch06p1_potential_function_exact',
  'problem_solving',
  ['potential', 'f', 'integrate', 'g(y)', 'h(x)']
)

add(
  'How do you solve exact equations with initial conditions?',
  'After finding f(x, y) = C, plug in (x_0, y_0) to determine C. Example: (2xy + 3) dx + (x^2 - 4) dy = 0, y(1) = 2. M_y = 2x, N_x = 2x. Exact. f = integral (2xy + 3) dx = x^2 y + 3x + g(y). f_y = x^2 + g\' = x^2 - 4. g\' = -4, g = -4y. f = x^2 y + 3x - 4y. Solution: x^2 y + 3x - 4y = C. IC: 1·2 + 3 - 8 = -3 = C. So x^2 y + 3x - 4y = -3, or (x^2 - 4) y = -3x - 3. Solve: y = (-3x - 3)/(x^2 - 4). At x=1: y = -6/(-3) = 2. ✓',
  'ch06p1_exact_with_ic',
  'problem_solving',
  ['exact', 'initial condition', 'find C', 'implicit', 'apply IC']
)

add(
  'What is an integrating factor for a non-exact equation?',
  'If M dx + N dy = 0 is not exact, sometimes an integrating factor mu makes it exact: (mu M) dx + (mu N) dy = 0 with partial(mu M)/partial y = partial(mu N)/partial x. Common cases: (1) If (M_y - N_x)/N is a function of x only, mu(x) = e^(integral ((M_y - N_x)/N) dx). (2) If (N_x - M_y)/M is a function of y only, mu(y) = e^(integral ((N_x - M_y)/M) dy). Example: (3y^2 + 2x) dx + (2xy) dy = 0. M_y = 6y, N_x = 2y. M_y - N_x = 4y. (M_y - N_x)/N = 4y/(2xy) = 2/x. Function of x! mu = e^(integral 2/x dx) = x^2. Multiply: x^2(3y^2 + 2x) dx + 2x^3 y dy. Now check: partial(3x^2 y^2 + 2x^3)/partial y = 6x^2 y. partial(2x^3 y)/partial x = 6x^2 y. Exact. ✓',
  'ch06p1_integrating_factor_exact',
  'problem_solving',
  ['integrating factor', 'non-exact', 'mu(x)', 'mu(y)', 'make exact']
)

add(
  'How do you recognize and solve exact equations in different forms?',
  'Recognize: any equation M dx + N dy = 0 where partial M/partial y = partial N/partial x. Common forms: (1) (linear in x, y) dx + (linear in x, y) dy = 0. (2) Total differentials of products: d(xy) = y dx + x dy. d(x/y) = (y dx - x dy)/y^2. d(arctan(y/x)) = (x dy - y dx)/(x^2 + y^2). (3) Total differential of f(g(x, y)). Example: y dx - x dy = 0. Not exact (M_y = 1, N_x = -1). Multiply by 1/y^2: (y dx - x dy)/y^2 = 0. Now M = 1/y, N = -x/y^2. M_y = -1/y^2, N_x = -1/y^2. Exact. f = x/y. Solution: x/y = C, or y = x/C. ✓',
  'ch06p1_exact_recognition',
  'problem_solving',
  ['recognize', 'total differential', 'form', 'd(xy)', 'arctan']
)

// ============================================================
// SECTION 5 — BERNOULLI EQUATIONS (5 items)
// ============================================================
add(
  'What is a Bernoulli differential equation?',
  'Bernoulli equation: dy/dx + P(x) y = Q(x) y^n, where n is a real number (n != 0, n != 1 — those are linear). Standard form. Solution method: substitute v = y^(1-n), which transforms it into a linear ODE in v. Divide by y^n: y^(-n) y\' + P y^(1-n) = Q. Note y^(-n) y\' = (1/(1-n)) dv/dx (since v = y^(1-n), dv/dx = (1-n) y^(-n) y\'). So (1/(1-n)) dv/dx + P v = Q, or dv/dx + (1-n) P v = (1-n) Q. Linear in v. Example: y\' + y = y^2 (n=2). Substitute v = y^(-1) = 1/y. dv/dx - v = -1. Linear. ✓',
  'ch06p1_bernoulli_definition',
  'formula_recall',
  ['Bernoulli', 'y^n', 'substitute', 'v = y^(1-n)', 'transform']
)

add(
  'How do you solve a Bernoulli equation step by step?',
  'Steps: (1) Identify: y\' + P(x) y = Q(x) y^n. (2) Substitute v = y^(1-n). (3) Compute dv/dx = (1-n) y^(-n) y\'. (4) Multiply ODE by (1-n) y^(-n): (1-n) y^(-n) y\' + (1-n) P y^(1-n) = (1-n) Q. So dv/dx + (1-n) P v = (1-n) Q. (5) Solve linear ODE for v using integrating factor. (6) Back-substitute v = y^(1-n), solve for y. Example: y\' + (2/x) y = y^2 (n=2). v = y^(-1). dv/dx - (2/x) v = -1. P = -2/x, mu = e^(integral -2/x dx) = x^(-2). (x^(-2) v)\' = -x^(-2). x^(-2) v = 1/x + C, v = x + C x^2. So 1/y = x + C x^2, y = 1/(x + C x^2). ✓',
  'ch06p1_bernoulli_method',
  'problem_solving',
  ['Bernoulli', 'steps', 'substitute', 'linear in v', 'solve']
)

add(
  'How do you solve a Bernoulli equation with n = 2?',
  'For y\' + P(x) y = Q(x) y^2, substitute v = y^(-1) = 1/y. Then dv/dx = -y^(-2) y\'. Multiply ODE by -y^(-2): -y^(-2) y\' - P y^(-1) = -Q. So dv/dx - P v = -Q. Linear in v. Example: y\' - y = -y^2 (P = -1, Q = -1). v = 1/y. dv/dx + v = 1. mu = e^x. (e^x v)\' = e^x. e^x v = e^x + C. v = 1 + C e^(-x). So 1/y = 1 + C e^(-x), y = 1/(1 + C e^(-x)). This is the logistic equation! Check: as x -> inf, y -> 1 (carrying capacity). At x = 0: y(0) = 1/(1 + C). For y(0) = 1/2, C = 1, y = 1/(1 + e^(-x)). ✓',
  'ch06p1_bernoulli_n2',
  'problem_solving',
  ['Bernoulli', 'n = 2', 'v = 1/y', 'logistic', 'solve']
)

add(
  'How do you solve a Bernoulli equation with n = 1/2?',
  'For y\' + P(x) y = Q(x) y^(1/2), substitute v = y^(1 - 1/2) = y^(1/2) = sqrt(y). Then dv/dx = (1/2) y^(-1/2) y\'. Multiply ODE by (1/2) y^(-1/2): (1/2) y^(-1/2) y\' + (1/2) P y^(1/2) = (1/2) Q. So dv/dx + (P/2) v = Q/2. Linear in v. Example: y\' + (1/x) y = (3/2) y^(1/2). v = sqrt(y). dv/dx + (1/(2x)) v = 3/4. P = 1/(2x), mu = e^(integral 1/(2x) dx) = x^(1/2) = sqrt(x). (sqrt(x) v)\' = (3/4) sqrt(x). sqrt(x) v = (3/4)(2/3) x^(3/2) + C = x^(3/2)/2 + C. v = x/2 + C/sqrt(x). y = v^2 = (x/2 + C/sqrt(x))^2. ✓',
  'ch06p1_bernoulli_half',
  'problem_solving',
  ['Bernoulli', 'n = 1/2', 'v = sqrt(y)', 'linearize', 'solve']
)

add(
  'How do you recognize Bernoulli equations in disguised forms?',
  'Some equations need algebra first to put in Bernoulli form. Example: x dy/dx + y = x^3 y^3. Divide by x: y\' + (1/x) y = x^2 y^3 (n=3). Substitute v = y^(-2). dv/dx - (2/x) v = -2x^2. Linear. Example: dy/dx = y (xy^3 - 1). Expand: y\' = x y^4 - y. So y\' + y = x y^4 (n=4). v = y^(-3). dv/dx - 3 v = -3x. Linear. Example: (y^4 - 2xy) dx + x^2 dy = 0. Rewrite: x^2 y\' = 2xy - y^4. y\' - (2/x) y = -y^4/x^2 (n=4). v = y^(-3). dv/dx + (6/x) v = 3/x^2. ✓',
  'ch06p1_bernoulli_disguised',
  'problem_solving',
  ['Bernoulli', 'disguised', 'algebra', 'rewrite', 'identify n']
)

// ============================================================
// SECTION 6 — HOMOGENEOUS EQUATIONS (5 items)
// ============================================================
add(
  'What is a homogeneous first-order differential equation?',
  'A first-order ODE M(x, y) dx + N(x, y) dy = 0 is homogeneous (in the Euler sense) if M and N are homogeneous functions of the same degree, i.e., M(tx, ty) = t^k M(x, y) and N(tx, ty) = t^k N(x, y) for some k. Equivalently, dy/dx = F(y/x) (function of y/x only). Test: replace x with tx, y with ty; if t factors out completely, it\'s homogeneous. Example: (x^2 + y^2) dx - 2xy dy = 0. M(tx,ty) = t^2(x^2+y^2), N(tx,ty) = -2t^2 xy. Both degree 2. Homogeneous. Example: dy/dx = (x + y)/(x - y) = (1 + y/x)/(1 - y/x) = F(y/x). Homogeneous. Example: dy/dx = x + y. Not homogeneous (M = x+y is degree 1, but as dy/dx = (x+y)/1, F(y/x) = (1 + y/x), so homogeneous actually). ✓',
  'ch06p1_homogeneous_definition',
  'formula_recall',
  ['homogeneous', 'same degree', 'M(tx,ty)', 'F(y/x)', 'Euler']
)

add(
  'How do you solve a homogeneous differential equation?',
  'Method: substitute v = y/x (so y = vx, dy/dx = v + x dv/dx). The ODE becomes v + x dv/dx = F(v), i.e., x dv/dx = F(v) - v. This is separable: dv/(F(v) - v) = dx/x. Integrate, then back-substitute v = y/x. Example: dy/dx = (x + y)/x = 1 + y/x = 1 + v. So v + x dv/dx = 1 + v, x dv/dx = 1. Separable: dv = dx/x. Integrate: v = ln|x| + C. Back-sub: y/x = ln|x| + C, so y = x(ln|x| + C). Example: dy/dx = y^2/(xy - x^2). = (y/x)^2 / (y/x - 1) = v^2/(v-1). v + x dv/dx = v^2/(v-1). x dv/dx = v^2/(v-1) - v = v/(v-1). Separable: (v-1)/v dv = dx/x. (1 - 1/v) dv = dx/x. v - ln|v| = ln|x| + C. y/x - ln|y/x| = ln|x| + C. ✓',
  'ch06p1_homogeneous_method',
  'problem_solving',
  ['homogeneous', 'substitute v = y/x', 'separable', 'integrate', 'back-substitute']
)

add(
  'How do you solve homogeneous equations with initial conditions?',
  'Solve generally (implicit form), then plug IC to find C. Example: dy/dx = (x^2 + y^2)/(2xy), y(1) = 1. Homogeneous: F(y/x) = (1 + (y/x)^2)/(2(y/x)) = (1+v^2)/(2v). v + x dv/dx = (1+v^2)/(2v). x dv/dx = (1+v^2)/(2v) - v = (1 - v^2)/(2v). Separable: 2v/(1-v^2) dv = dx/x. Integrate: -ln|1-v^2| = ln|x| + C. So 1 - v^2 = C\'/x. v = y/x: 1 - y^2/x^2 = C\'/x. IC y(1)=1: 1 - 1 = C\'/1, so C\' = 0. Then y^2 = x^2, y = x (positive since y(1)=1>0). Check: y\' = 1, RHS = (1+1)/(2·1) = 1. ✓',
  'ch06p1_homogeneous_with_ic',
  'problem_solving',
  ['homogeneous', 'initial condition', 'find C', 'apply IC', 'substitute']
)

add(
  'How do you solve equations reducible to homogeneous form?',
  'Equations of form dy/dx = (a_1 x + b_1 y + c_1)/(a_2 x + b_2 y + c_2). Case 1: If a_1 b_2 - a_2 b_1 != 0 (lines intersect), substitute x = X + h, y = Y + k where (h, k) is the intersection of a_1 x + b_1 y + c_1 = 0 and a_2 x + b_2 y + c_2 = 0. This reduces to homogeneous dY/dX = (a_1 X + b_1 Y)/(a_2 X + b_2 Y). Case 2: If a_1 b_2 = a_2 b_1 (parallel lines), substitute u = a_1 x + b_1 y (the common linear combination), reducing to a separable equation. Example: dy/dx = (x + y - 1)/(x - y + 1). Solve x+y-1=0, x-y+1=0: 2x = 0, x=0, y=1. Substitute x = X, y = Y + 1. dY/dX = (X + Y)/(X - Y). Homogeneous. ✓',
  'ch06p1_reducible_homogeneous',
  'problem_solving',
  ['reducible', 'linear numerator', 'substitute', 'shift', 'parallel']
)

add(
  'What is the difference between linear-homogeneous and Euler-homogeneous ODEs?',
  'Two distinct concepts: (1) Linear homogeneous: dy/dx + P(x) y = 0 (Q = 0). Solution: y = C e^(-integral P dx). Example: y\' + (1/x) y = 0, y = C/x. (2) Euler-homogeneous (homogeneous in Euler sense): dy/dx = F(y/x). Solution via v = y/x substitution. Example: dy/dx = y/x, v + x v\' = v, x v\' = 0, v = C, y = Cx. Note: y\' = y/x is BOTH linear homogeneous (y = C e^(ln x) = Cx) AND Euler homogeneous. The two methods agree. But y\' = (x^2 + y^2)/(xy) is Euler-homogeneous only (not linear). And y\' + (1/x) y = e^x is linear non-homogeneous (not Euler). ✓',
  'ch06p1_homogeneous_types',
  'formula_recall',
  ['linear homogeneous', 'Euler homogeneous', 'Q = 0', 'F(y/x)', 'distinction']
)

// ============================================================
// SECTION 7 — SUBSTITUTION METHODS (5 items)
// ============================================================
add(
  'How do you solve dy/dx = f(ax + by + c) by substitution?',
  'For dy/dx = f(ax + by + c), substitute u = ax + by + c. Then du/dx = a + b dy/dx = a + b f(u). Separable: du/(a + b f(u)) = dx. Integrate, then back-substitute. Example: dy/dx = (x + y)^2. u = x + y. du/dx = 1 + u^2. Separable: du/(1+u^2) = dx. arctan(u) = x + C. u = tan(x + C). y = tan(x + C) - x. Example: dy/dx = sqrt(x + y - 1). u = x + y - 1. du/dx = 1 + sqrt(u). Separable: du/(1 + sqrt(u)) = dx. Substitute w = sqrt(u), u = w^2, du = 2w dw. integral 2w/(1+w) dw = 2 integral (1 - 1/(1+w)) dw = 2(w - ln|1+w|). = x + C. Back-sub: 2(sqrt(u) - ln|1 + sqrt(u)|) = x + C, u = x + y - 1. ✓',
  'ch06p1_substitution_linear',
  'problem_solving',
  ['substitution', 'u = ax + by + c', 'separable', 'back-substitute', 'method']
)

add(
  'How do you solve equations of the form dy/dx = f(x, y) using substitution v = y/x?',
  'When dy/dx = f(x, y) where f is homogeneous degree 0 (i.e., f(tx, ty) = f(x, y)), substitute v = y/x. Then y = vx, dy/dx = v + x dv/dx. ODE becomes v + x dv/dx = f(1, v) (since f(x, y) = f(1, y/x) = f(1, v)). Separable. Example: dy/dx = (y^2 - x^2)/(2xy). f(tx,ty) = (t^2 y^2 - t^2 x^2)/(2 t^2 xy) = f(x,y). Substitute v = y/x. f(1, v) = (v^2 - 1)/(2v). v + x dv/dx = (v^2 - 1)/(2v). x dv/dx = (v^2 - 1)/(2v) - v = -(v^2 + 1)/(2v). Separable: 2v/(v^2+1) dv = -dx/x. ln(v^2 + 1) = -ln|x| + C. v^2 + 1 = C/x. (y/x)^2 + 1 = C/x, so x^2 + y^2 = Cx (circle). ✓',
  'ch06p1_substitution_v_over_x',
  'problem_solving',
  ['substitution', 'v = y/x', 'homogeneous degree 0', 'separable', 'method']
)

add(
  'How do you use substitution to solve nonlinear first-order ODEs?',
  'General strategy: identify a substitution that simplifies the equation. Common: (1) u = y/x for Euler-homogeneous. (2) u = ax + by + c for f(ax+by+c). (3) u = y^n for Bernoulli. (4) u = y/x or u = x/y for equations with x^2, y^2, xy terms. Example: dy/dx = (y - x)/(y + x). v = y/x: v + x v\' = (v - 1)/(v + 1). x v\' = (v - 1)/(v + 1) - v = (-v^2 - 1)/(v + 1). Separable: (v+1)/(v^2+1) dv = -dx/x. Integral: (1/2) ln(v^2+1) + arctan(v) = -ln|x| + C. (1/2) ln(y^2/x^2 + 1) + arctan(y/x) = -ln|x| + C. ✓',
  'ch06p1_substitution_strategy',
  'problem_solving',
  ['substitution', 'nonlinear', 'strategy', 'recognize', 'simplify']
)

add(
  'How do you solve Riccati equations when one solution is known?',
  'Riccati equation: dy/dx = P(x) + Q(x) y + R(x) y^2. In general not solvable in closed form, but if one particular solution y_1 is known, substitute y = y_1 + 1/v. Then dy/dx = y_1\' - (1/v^2) dv/dx. Substituting: y_1\' - v^(-2) v\' = P + Q(y_1 + 1/v) + R(y_1 + 1/v)^2. Since y_1\' = P + Q y_1 + R y_1^2 (y_1 solves), terms cancel: -v^(-2) v\' = Q/v + R(y_1 · 2/v + 1/v^2). Multiply by -v^2: v\' = -Q v - 2 R y_1 v - R. Linear in v! Solve, then y = y_1 + 1/v. Example: y\' = 1 + x y - y^2. y_1 = x is a solution (check: y_1\' = 1, RHS = 1 + x·x - x^2 = 1). Substitute y = x + 1/v. ✓',
  'ch06p1_riccati',
  'problem_solving',
  ['Riccati', 'particular solution', 'substitute', 'y_1', 'linear in v']
)

add(
  'How do you solve Clairaut and Lagrange equations?',
  'Clairaut equation: y = x y\' + f(y\'). Different form: y = x p + f(p) where p = y\'. Solution method: differentiate: y\' = p + (x + f\'(p)) p\'. So p = p + (x + f\'(p)) p\', giving (x + f\'(p)) p\' = 0. Either p\' = 0 (p = C, general solution: y = Cx + f(C)) or x = -f\'(p) (singular solution — parametric). Example: y = x y\' + (y\')^2. General: y = Cx + C^2 (family of lines). Singular: x = -2p, y = -2p^2 + p^2 = -p^2. So y = -x^2/4 (envelope). Lagrange equation: y = x g(y\') + h(y\'). Differentiate, get linear ODE in x as function of p. ✓',
  'ch06p1_clairaut_lagrange',
  'problem_solving',
  ['Clairaut', 'Lagrange', 'singular solution', 'envelope', 'y = x p + f(p)']
)

// ============================================================
// SECTION 8 — MODELING WITH FIRST-ORDER ODEs (7 items)
// ============================================================
add(
  'How do you model population growth with first-order ODEs?',
  'Models: (1) Malthus (exponential): dP/dt = k P. Solution: P = P_0 e^(kt). Unrealistic (unbounded). (2) Logistic (Verhulst): dP/dt = k P (1 - P/K), where K = carrying capacity. Solution: P(t) = K / (1 + A e^(-kt)), A = (K - P_0)/P_0. Inflection at P = K/2. (3) Gompertz: dP/dt = k P ln(K/P). Solution: P = K e^(-e^(-kt)). Slower growth near K. Example: P_0 = 100, K = 1000, k = 0.1. Logistic: P = 1000/(1 + 9 e^(-0.1t)). At t = 10: P = 1000/(1 + 9 e^(-1)) = 1000/(1 + 3.31) = 232. At t = 50: P approx 1000 (saturated). ✓',
  'ch06p1_population_models',
  'problem_solving',
  ['population', 'Malthus', 'logistic', 'Verhulst', 'Gompertz', 'carrying capacity']
)

add(
  'How do you model radioactive decay?',
  'Radioactive decay: dN/dt = -lambda N (proportional to amount present). Solution: N(t) = N_0 e^(-lambda t). Half-life: T_(1/2) = ln(2)/lambda. Mean lifetime: tau = 1/lambda. Example: Carbon-14 half-life 5730 yr. lambda = ln(2)/5730 = 1.21e-4 /yr. If sample has 30% of original C-14: 0.3 = e^(-lambda t), t = -ln(0.3)/lambda = 1.204/1.21e-4 = 9950 yr. Example: Radium-226 half-life 1600 yr. After 800 yr: N/N_0 = e^(-ln2 · 800/1600) = e^(-0.347) = 0.707 (70.7% remains). ✓',
  'ch06p1_radioactive_decay',
  'problem_solving',
  ['radioactive', 'decay', 'half-life', 'exponential', 'carbon dating']
)

add(
  'How do you model Newton\'s law of cooling?',
  'Newton\'s law of cooling: dT/dt = k (T - T_s), where T_s is surrounding temperature (constant). Linear first-order. Solution: T(t) = T_s + (T_0 - T_s) e^(kt). If cooling, k < 0. Example: body at 37C found at 10am in 20C room, at 11am body is 30C. Find time of death. dT/dt = k(T - 20). T(t) = 20 + 17 e^(kt). At t=1 (11am): 30 = 20 + 17 e^k, e^k = 10/17, k = ln(10/17) = -0.531/hr. At death T = 37: 37 = 20 + 17 e^(kt_d), e^(kt_d) = 1, t_d = 0. So death was at t = -1.69 hr before 10am (i.e., 8:18am): solve 37 = 20 + 17 e^(-0.531 · t_back), e^(-0.531 t_back) = 1, t_back = 0... use T(t) - 37 = 0: actually use 37 = 20 + 17 e^(k · t_back) where t_back is hours before 10am. 1 = e^(k · t_back), t_back = 0 if we use T_0=37 — instead recompute: t_back such that 37 = 20 + 30 e^(-0.531 · t_back) where 30 = T(10am) - 20 = 10... Use ratio: (37-20)/(30-20) = e^(0.531 · t_back), 17/10 = 1.7 = e^(0.531 t_back), t_back = ln(1.7)/0.531 = 1.03 hr. So death at 8:58am. ✓',
  'ch06p1_newton_cooling',
  'problem_solving',
  ['Newton cooling', 'dT/dt = k(T - T_s)', 'linear', 'time of death', 'temperature']
)

add(
  'How do you model mixture problems with first-order ODEs?',
  'Tank/mixture problem: dA/dt = (rate in) - (rate out), where A = amount of substance. rate in = (concentration in)(flow in). rate out = (A/V)(flow out) (well-mixed assumption). If volume V constant: linear ODE. Example: 100 L tank has 10 g salt, pure water enters at 5 L/min, mixture leaves at 5 L/min. dA/dt = 0 - (A/100)(5) = -A/20. Solution: A = 10 e^(-t/20). After 20 min: A = 10/e = 3.68 g. Example: tank 1000 L pure water, brine 2 kg/L enters at 10 L/min, mixed leaves at 10 L/min. dA/dt = 2·10 - (A/1000)·10 = 20 - A/100. Solution: A = 2000(1 - e^(-t/100)). Steady state: A = 2000. ✓',
  'ch06p1_mixture_problems',
  'problem_solving',
  ['mixture', 'tank', 'brine', 'rate in', 'rate out', 'salt']
)

add(
  'How do you model falling bodies with air resistance?',
  'Falling body with linear drag: m dv/dt = mg - kv (downward positive). Linear first-order. Solution: v(t) = (mg/k)(1 - e^(-kt/m)). Terminal velocity: v_term = mg/k (as t -> inf). Example: 70 kg skydiver, k = 12 kg/s. v_term = 70·9.8/12 = 57.2 m/s. Time to reach 95% terminal: 0.95 = 1 - e^(-kt/m), e^(-kt/m) = 0.05, t = -(m/k) ln(0.05) = (70/12)·3 = 17.5 s. Position: integrate v. y(t) = (mg/k) t - (m^2 g/k^2)(1 - e^(-kt/m)). Quadratic drag: m dv/dt = mg - c v^2. Separable. v_term = sqrt(mg/c). ✓',
  'ch06p1_falling_body',
  'problem_solving',
  ['falling body', 'air resistance', 'drag', 'terminal velocity', 'skydiver']
)

add(
  'How do you model compound interest continuously?',
  'Continuous compounding: dS/dt = r S, where r = annual rate. Solution: S(t) = S_0 e^(rt). Example: $1000 at 5% compounded continuously. After 10 yr: S = 1000 e^(0.5) = $1648.72. Compare with annual compounding: 1000(1.05)^10 = $1628.89. Continuous is slightly higher. Differential savings: dS/dt = r S + D (constant deposits). Linear: S(t) = (S_0 + D/r) e^(rt) - D/r. Example: $1000 initial, $100/month deposited, r = 0.06/yr. After 10 yr (D = 1200/yr): S = (1000 + 20000) e^(0.6) - 20000 = 21000·1.822 - 20000 = $18,262. Loan payoff: dS/dt = r S - P (constant payment). S(t) = (S_0 - P/r) e^(rt) + P/r. ✓',
  'ch06p1_compound_interest',
  'problem_solving',
  ['compound interest', 'continuous', 'dS/dt = rS', 'savings', 'loan']
)

add(
  'How do you model RL and RC circuits with first-order ODEs?',
  'RC circuit (capacitor charging): R dQ/dt + Q/C = E (EMF). Linear: dQ/dt + Q/(RC) = E/R. Solution (Q(0) = 0): Q(t) = EC (1 - e^(-t/(RC))). Time constant tau = RC. Current I = dQ/dt = (E/R) e^(-t/(RC)). At t = tau: Q = EC(1 - 1/e) = 0.632 EC (63% charged). Example: R = 1000 ohm, C = 1 microF, E = 12V. tau = 1 ms. At t = 5 ms: Q = 12e-6 (1 - e^(-5)) = 11.92 microC. RL circuit: L dI/dt + R I = E. Solution I(t) = (E/R)(1 - e^(-Rt/L)). tau = L/R. Example: L = 0.5 H, R = 10 ohm, E = 6V. tau = 0.05 s. I_term = 0.6 A. ✓',
  'ch06p1_circuits',
  'problem_solving',
  ['RC circuit', 'RL circuit', 'capacitor', 'inductor', 'time constant']
)

// ============================================================
// SECTION 9 — DIRECTION FIELDS & PHASE LINES (5 items)
// ============================================================
add(
  'What is a direction field (slope field)?',
  'A direction field for dy/dx = f(x, y) is a plot of small line segments with slope f(x, y) at each grid point (x, y). Visualizes the ODE without solving. Solution curves are tangent to the field at every point. Construction: for each grid point (x, y), compute slope m = f(x, y), draw short segment of slope m through (x, y). Example: dy/dx = -y/x. At (1,1): slope -1. At (2,1): -1/2. At (1,2): -2. Curves tangent to these slopes are y = C/x (hyperbolas). Use: predict behavior, identify equilibrium, see stability. Software: Desmos, Mathematica, MATLAB odeplot. ✓',
  'ch06p1_direction_field',
  'formula_recall',
  ['direction field', 'slope field', 'plot', 'tangent', 'visualize']
)

add(
  'How do you sketch a direction field by hand?',
  'Method: (1) Choose grid (e.g., integer points in window). (2) At each (x, y), compute slope m = f(x, y). (3) Draw small segment of slope m. Tip: identify isoclines — curves where f(x, y) = m (constant). Sketch isoclines first, then draw segments of slope m along each. Example: dy/dx = x + y. Isocline x + y = m, i.e., y = -x + m (parallel lines). Along y = -x, slope 0 (horizontal segments). Along y = -x + 1, slope 1. Along y = -x - 1, slope -1. Along y = -x + 2, slope 2 (steep up). Sketch curves tangent to these. Solution: y = Ce^x - x - 1. ✓',
  'ch06p1_sketch_direction_field',
  'problem_solving',
  ['sketch', 'direction field', 'isocline', 'f(x,y) = m', 'grid']
)

add(
  'What is a phase line for autonomous equations?',
  'For autonomous dy/dt = f(y) (no t explicitly), the phase line is a vertical y-axis with arrows indicating y increasing (f(y) > 0, up arrow) or decreasing (f(y) < 0, down arrow). Equilibria where f(y) = 0 marked as points. Stable: arrows point toward (attracting). Unstable: arrows point away (repelling). Semi-stable: arrows point toward on one side, away on other. Example: dy/dt = y(1 - y) (logistic). f(y) = y(1-y). Zeros: y = 0, y = 1. For 0 < y < 1: f > 0 (up arrow, y increasing). For y < 0: f < 0 (down). For y > 1: f < 0 (down). So y = 0 unstable (arrows away), y = 1 stable (arrows toward). ✓',
  'ch06p1_phase_line',
  'formula_recall',
  ['phase line', 'autonomous', 'equilibrium', 'stable', 'unstable']
)

add(
  'How do you classify equilibrium points as stable, unstable, or semi-stable?',
  'For autonomous dy/dt = f(y), equilibrium at y* where f(y*) = 0. Classification: (1) Stable (attractor): f changes sign from + (below) to - (above). Solutions starting near y* approach y*. (2) Unstable (repeller): f changes from - (below) to + (above). Solutions move away. (3) Semi-stable (node): f same sign on both sides. If + on both: arrows up on both sides (attracts from below, repels from above). If - on both: attracts from above, repels from below. Test: f\'(y*) < 0 => stable. f\'(y*) > 0 => unstable. f\'(y*) = 0 => inconclusive (semi-stable possible). Example: dy/dt = y^2(2 - y). Equilibria y = 0, y = 2. f\' = 2y(2-y) - y^2 = 4y - 3y^2. f\'(0) = 0 (semi). f\'(2) = -4 (stable). y=0: f=y^2(2-y) > 0 both sides near 0 (since 2-y > 0). So semi-stable, attracts from below, repels from above. ✓',
  'ch06p1_equilibrium_classification',
  'problem_solving',
  ['equilibrium', 'stable', 'unstable', 'semi-stable', 'classify']
)

add(
  'How do you analyze bifurcations in autonomous equations?',
  'Bifurcation: qualitative change in equilibrium structure as a parameter changes. For dy/dt = f(y; r), find equilibria f(y*; r) = 0. Plot bifurcation diagram: y* vs r. Types: (1) Saddle-node: equilibria appear/disappear in pairs. Example: dy/dt = r + y^2. Equilibria y = ±sqrt(-r) for r < 0, none for r > 0. Bifurcation at r = 0. (2) Transcritical: equilibria exchange stability. dy/dt = r y - y^2. Equilibria y = 0 and y = r. For r < 0: y = 0 stable, y = r unstable. For r > 0: y = 0 unstable, y = r stable. (3) Pitchfork: dy/dt = r y - y^3. y = 0 always, y = ±sqrt(r) for r > 0. Stability exchanges at r = 0. ✓',
  'ch06p1_bifurcation',
  'problem_solving',
  ['bifurcation', 'saddle-node', 'transcritical', 'pitchfork', 'parameter']
)

// ============================================================
// SECTION 10 — EXISTENCE & UNIQUENESS (4 items)
// ============================================================
add(
  'What is the existence and uniqueness theorem for first-order ODEs?',
  'Picard-Lindelöf theorem: if f(x, y) and partial f/partial y are continuous on a rectangle R = {(x, y) : |x - x_0| <= a, |y - y_0| <= b} containing (x_0, y_0), then the IVP dy/dx = f(x, y), y(x_0) = y_0 has a unique solution on some interval |x - x_0| <= h where h = min(a, b/M) and M = max|f| on R. Practical: if f is "nice" (continuous, smooth), unique solution exists locally. Example: dy/dx = y^2, y(0) = 1. f = y^2, f_y = 2y, both continuous everywhere. Unique solution exists. Solve: y = 1/(1 - x). Solution blows up at x = 1, so solution exists on (-inf, 1) — local existence, but global can fail. ✓',
  'ch06p1_existence_uniqueness',
  'formula_recall',
  ['Picard-Lindelof', 'existence', 'uniqueness', 'continuous', 'rectangle']
)

add(
  'What happens when existence and uniqueness conditions fail?',
  'Failure of conditions: (1) f discontinuous: solution may not exist, or may exist on one side only. (2) partial f/partial y discontinuous: solution exists but may not be unique. Example: dy/dx = sqrt(y), y(0) = 0. f_y = 1/(2 sqrt(y)) is discontinuous at y = 0. So uniqueness may fail. Indeed: y = 0 is a solution. Also y = (x/2)^2 = x^2/4 (for x >= 0) is a solution (check: y\' = x/2, sqrt(y) = x/2 for x >= 0). And y = 0 for x < c, y = (x-c)^2/4 for x >= c, for any c >= 0. Infinite solutions! Example: dy/dx = 1/x, y(0) = 0. f discontinuous at x = 0. No solution through (0, 0). ✓',
  'ch06p1_uniqueness_failure',
  'problem_solving',
  ['failure', 'non-unique', 'infinite solutions', 'discontinuous', 'partial f/partial y']
)

add(
  'How do you determine the interval of existence for a solution?',
  'The interval of existence is the largest interval containing x_0 on which the solution is defined and finite. To find: (1) Check where f and f_y are continuous (gives local existence). (2) Solve and identify any blow-ups or singularities. Example: dy/dx = y^2, y(0) = 1. Solution y = 1/(1 - x). Blows up at x = 1. Interval of existence: (-inf, 1). Example: dy/dx = 1/(x-2) y, y(0) = 1. P(x) = 1/(x-2) discontinuous at x = 2. Solution: y = e^(integral_0^x dt/(t-2)) = e^(ln|x-2| - ln 2) = (x-2)/(-2) for x < 2, or (2-x)/2 for x < 2 (depends on sign). For x < 2: y = (2-x)/2 = 1 - x/2. Defined on (-inf, 2). At x = 2, would need to extend but P discontinuous. So interval is (-inf, 2). ✓',
  'ch06p1_interval_existence',
  'problem_solving',
  ['interval of existence', 'blow-up', 'singularity', 'discontinuity', 'domain']
)

add(
  'What is Picard iteration?',
  'Picard iteration: construct solution to IVP dy/dx = f(x, y), y(x_0) = y_0 as limit of sequence y_0, y_1, y_2, ... where y_(n+1)(x) = y_0 + integral_(x_0)^x f(t, y_n(t)) dt. Starting y_0(x) = y_0 (constant). Under existence/uniqueness conditions, y_n converges to true solution. Example: dy/dx = y, y(0) = 1. y_0 = 1. y_1 = 1 + integral_0^x 1 dt = 1 + x. y_2 = 1 + integral_0^x (1 + t) dt = 1 + x + x^2/2. y_3 = 1 + integral_0^x (1 + t + t^2/2) dt = 1 + x + x^2/2 + x^3/6. Pattern: y_n = sum_{k=0}^n x^k/k!. Limit: y = e^x. Theoretical foundation for existence proof; rarely used computationally (slow). ✓',
  'ch06p1_picard_iteration',
  'formula_recall',
  ['Picard', 'iteration', 'successive approximation', 'limit', 'construct']
)

// ============================================================
// SECTION 11 — EULER'S METHOD (5 items)
// ============================================================
add(
  'What is Euler\'s method for numerical solution of ODEs?',
  'Euler\'s method: numerical approximation to IVP dy/dx = f(x, y), y(x_0) = y_0. Step size h. Iterate: x_(n+1) = x_n + h, y_(n+1) = y_n + h f(x_n, y_n). Geometric: follow the tangent line at (x_n, y_n) for distance h. Error per step ~ O(h^2). Global error ~ O(h). Example: dy/dx = x + y, y(0) = 1, h = 0.1, find y(0.2). Step 1: f(0, 1) = 0 + 1 = 1. y_1 = 1 + 0.1·1 = 1.1, x_1 = 0.1. Step 2: f(0.1, 1.1) = 0.1 + 1.1 = 1.2. y_2 = 1.1 + 0.1·1.2 = 1.22, x_2 = 0.2. So y(0.2) approx 1.22. Exact: y = 2 e^x - x - 1 (linear IF). y(0.2) = 2 e^0.2 - 0.2 - 1 = 2.443 - 1.2 = 1.243. Error = 0.023. ✓',
  'ch06p1_euler_method',
  'formula_recall',
  ['Euler', 'numerical', 'step size', 'tangent line', 'iterate']
)

add(
  'How do you implement Euler\'s method with a table?',
  'Table columns: n, x_n, y_n, f(x_n, y_n), y_(n+1) = y_n + h·f. Example: dy/dx = y - x, y(0) = 0.5, h = 0.1, find y(0.3). Row 0: x=0, y=0.5, f = 0.5 - 0 = 0.5, y_1 = 0.5 + 0.1·0.5 = 0.55. Row 1: x=0.1, y=0.55, f = 0.55 - 0.1 = 0.45, y_2 = 0.55 + 0.045 = 0.595. Row 2: x=0.2, y=0.595, f = 0.595 - 0.2 = 0.395, y_3 = 0.595 + 0.0395 = 0.6345. Row 3: x=0.3, y=0.6345. So y(0.3) approx 0.635. Exact: y = x + 1 - 0.5 e^x. y(0.3) = 0.3 + 1 - 0.5 e^0.3 = 1.3 - 0.5·1.350 = 1.3 - 0.675 = 0.625. Error = 0.0095. ✓',
  'ch06p1_euler_table',
  'problem_solving',
  ['Euler', 'table', 'iterate', 'step', 'compute']
)

add(
  'What is the error in Euler\'s method?',
  'Two types: (1) Local truncation error (per step): ~ (h^2/2) y\'\'(xi), i.e., O(h^2). Comes from truncating Taylor series after linear term. (2) Global error (accumulated): ~ O(h). Halving h roughly halves global error. Example: from above, error at x=0.3 was 0.0095 with h=0.1. With h=0.05: about 0.0048. With h=0.025: about 0.0024. Confirms linear convergence. Improvements: (1) Heun\'s method (RK2): error O(h^2) global. (2) RK4: error O(h^4) global. (3) Adaptive step size. Trade-off: smaller h = more accurate but more computation. Euler is conceptually simple but rarely used in practice due to slow convergence. ✓',
  'ch06p1_euler_error',
  'formula_recall',
  ['error', 'local truncation', 'global', 'O(h^2)', 'O(h)']
)

add(
  'How does Heun\'s method (improved Euler) work?',
  'Heun\'s method (RK2 / modified Euler / predictor-corrector): (1) Predictor: y* = y_n + h f(x_n, y_n) (Euler step). (2) Corrector: y_(n+1) = y_n + (h/2) [f(x_n, y_n) + f(x_(n+1), y*)]. Averages slopes at start and end. Local error O(h^3), global O(h^2). Example: dy/dx = x + y, y(0) = 1, h = 0.1. Predictor: y* = 1 + 0.1(0+1) = 1.1. Corrector: y_1 = 1 + 0.05 [(0+1) + (0.1+1.1)] = 1 + 0.05[1 + 1.2] = 1 + 0.11 = 1.11. (Euler gave 1.1, exact 1.1103.) Heun much more accurate. General RK2: y_(n+1) = y_n + h f(x_n + h/2, y_n + (h/2) f(x_n, y_n)) (midpoint method). ✓',
  'ch06p1_heun_method',
  'formula_recall',
  ['Heun', 'RK2', 'predictor-corrector', 'improved Euler', 'average slope']
)

add(
  'How does the Runge-Kutta method (RK4) work?',
  'RK4: most popular numerical ODE method. Compute 4 slopes: k_1 = f(x_n, y_n). k_2 = f(x_n + h/2, y_n + (h/2) k_1). k_3 = f(x_n + h/2, y_n + (h/2) k_2). k_4 = f(x_n + h, y_n + h k_3). Then y_(n+1) = y_n + (h/6)(k_1 + 2k_2 + 2k_3 + k_4). Local error O(h^5), global O(h^4). Highly accurate. Example: dy/dx = y, y(0) = 1, h = 0.1, find y(0.1). k_1 = 1. k_2 = 1 + 0.05·1 = 1.05. k_3 = 1 + 0.05·1.05 = 1.0525. k_4 = 1 + 0.1·1.0525 = 1.10525. y_1 = 1 + (0.1/6)(1 + 2·1.05 + 2·1.0525 + 1.10525) = 1 + (0.01667)(6.31025) = 1 + 0.10517 = 1.10517. Exact: e^0.1 = 1.10517. RK4 essentially exact to 5 decimals. ✓',
  'ch06p1_rk4',
  'formula_recall',
  ['Runge-Kutta', 'RK4', 'four slopes', 'accurate', 'O(h^4)']
)

// ============================================================
// SECTION 12 — AUTONOMOUS EQUATIONS & LOGISTIC (5 items)
// ============================================================
add(
  'How do you solve the logistic equation dP/dt = kP(1 - P/K)?',
  'Logistic equation: dP/dt = k P (1 - P/K), where K = carrying capacity. Separable. Partial fractions: dP/[P(1 - P/K)] = k dt. 1/[P(1-P/K)] = (1/P) + (1/K)/(1 - P/K) (partial fraction decomp). Integrate: ln|P| - ln|1 - P/K| = kt + C. ln|P/(1 - P/K)| = kt + C. P/(1 - P/K) = A e^(kt) (A = P_0/(1 - P_0/K)). Solve for P: P = K A e^(kt) / (1 + A e^(kt)) = K / (1 + (1/A) e^(-kt)) = K / (1 + ((K - P_0)/P_0) e^(-kt)). At t = 0: P = P_0. As t -> inf: P -> K. Inflection at P = K/2 (max growth rate). Example: P_0 = 10, K = 100, k = 0.1. P(t) = 100/(1 + 9 e^(-0.1t)). At t = 30: P = 100/(1 + 9 e^(-3)) = 100/(1 + 0.448) = 69.1. ✓',
  'ch06p1_logistic_solution',
  'problem_solving',
  ['logistic', 'carrying capacity', 'partial fractions', 'inflection', 'K/2']
)

add(
  'How do you analyze the logistic equation with harvesting?',
  'Logistic with constant harvesting: dP/dt = k P (1 - P/K) - H, where H = harvest rate. Equilibria: k P (1 - P/K) = H, i.e., P^2 - K P + (KH/k) = 0. P = (K ± sqrt(K^2 - 4KH/k))/2. Two equilibria if H < kK/4 (sustainable). One (semi-stable) if H = kK/4 (critical). None if H > kK/4 (collapse — population dies). Maximum sustainable yield (MSY): H_max = kK/4, at P = K/2. Example: K = 1000, k = 0.5. MSY = 0.5·1000/4 = 125. If H = 100: equilibria at P = (1000 ± sqrt(1e6 - 800000))/2 = (1000 ± 447)/2 = 724 or 276. P = 724 stable, P = 276 unstable. If P_0 < 276, population crashes to 0. ✓',
  'ch06p1_logistic_harvesting',
  'problem_solving',
  ['logistic', 'harvesting', 'maximum sustainable yield', 'collapse', 'equilibria']
)

add(
  'How do you solve autonomous equations dy/dt = f(y) by separation?',
  'Autonomous: dy/dt = f(y) (no t). Always separable: dy/f(y) = dt. Integrate: integral dy/f(y) = t + C. Example: dy/dt = y^2 - 1. Separable: dy/(y^2 - 1) = dt. Partial fractions: 1/(y^2-1) = (1/2)[1/(y-1) - 1/(y+1)]. Integrate: (1/2) ln|(y-1)/(y+1)| = t + C. So (y-1)/(y+1) = A e^(2t). Solve: y = (1 + A e^(2t))/(1 - A e^(2t)). Equilibria y = ±1. y = 1 unstable (above y=1, y grows; below y=1 toward -1, y decreases). y = -1 stable. Example: dy/dt = sin(y). dy/sin(y) = dt. integral csc(y) dy = ln|tan(y/2)| = t + C. y = 2 arctan(A e^t). ✓',
  'ch06p1_autonomous_solve',
  'problem_solving',
  ['autonomous', 'separable', 'f(y)', 'no t', 'equilibria']
)

add(
  'How do you analyze autonomous equations qualitatively?',
  'For dy/dt = f(y): (1) Find equilibria f(y) = 0. (2) Determine sign of f(y) between equilibria (positive = y increasing, negative = y decreasing). (3) Draw phase line: arrows up where f > 0, down where f < 0. (4) Classify equilibria (stable if arrows point toward, unstable if away, semi if mixed). (5) Sketch solution curves: horizontal asymptotes at stable equilibria, vertical asymptotes (blow-up) at unstable if approached. Example: dy/dt = y(2 - y)(y + 1). Equilibria y = -1, 0, 2. For y < -1: f = (-)(+)(-) = + (up). For -1 < y < 0: f = (-)(+)(+) = - (down). For 0 < y < 2: f = (+)(+)(+) = + (up). For y > 2: f = (+)(-)(+) = - (down). So y = -1 stable (up then down), y = 0 unstable (down then up), y = 2 stable (up then down). ✓',
  'ch06p1_autonomous_qualitative',
  'problem_solving',
  ['autonomous', 'qualitative', 'phase line', 'sign of f', 'sketch']
)

add(
  'How do you model chemical reactions with autonomous ODEs?',
  'First-order reaction: dC/dt = -k C. Solution: C = C_0 e^(-kt). Half-life: t_(1/2) = ln(2)/k. Second-order (A + A -> product): dC/dt = -k C^2. Separable: dC/C^2 = -k dt. Integrate: -1/C = -kt + C\'. So 1/C = kt + 1/C_0, C(t) = C_0 / (1 + k C_0 t). Half-life: t_(1/2) = 1/(k C_0) (depends on initial concentration). Example: sucrose hydrolysis first-order, k = 0.005/min. Half-life = 139 min. After 1 hr: C = C_0 e^(-0.3) = 0.741 C_0 (74% remains). Michaelis-Menten enzyme kinetics: d[P]/dt = V_max [S]/(K_M + [S]). Autocatalytic: A + B -> 2B, dA/dt = -k A B, dB/dt = k A B. Logistic-like. ✓',
  'ch06p1_chemical_reactions',
  'problem_solving',
  ['chemical kinetics', 'first-order', 'second-order', 'half-life', 'Michaelis-Menten']
)

// ============================================================
// SECTION 13 — SPECIAL FORMS & WORKED PROBLEMS (6 items)
// ============================================================
add(
  'How do you solve dy/dx = (a x + b y + c)/(d x + e y + f)?',
  'Case 1: Lines a x + b y + c = 0 and d x + e y + f = 0 intersect at (h, k). Substitute x = X + h, y = Y + k. Then dx = dX, dy = dY, and constants vanish: dY/dX = (a X + b Y)/(d X + e Y). Homogeneous in (X, Y) — solve by V = Y/X. Case 2: Lines parallel (a/d = b/e). Substitute u = a x + b y. Then du/dx = a + b dy/dx = a + b(c - f)/(d - e·(b/a))... Easier: since a/d = b/e = m (say), let u = a x + b y. Then u\' = a + b y\' = a + b (u + c - 0)/(u/m + ...) — work algebraically. Example: dy/dx = (x + y + 1)/(x - y + 3). Intersection: x+y+1=0, x-y+3=0 => 2x = -4, x = -2, y = 1. Substitute x = X - 2, y = Y + 1. dY/dX = (X + Y)/(X - Y). Homogeneous. ✓',
  'ch06p1_linear_fractional',
  'problem_solving',
  ['linear fractional', 'shift', 'intersection', 'parallel', 'substitution']
)

add(
  'How do you solve equations of the form y dx + (x + y^n) dy = 0?',
  'Try treating x as a function of y. Equation becomes dx/dy + (1/y) x = -y^(n-1) (divide by y dy). Linear in x! Example: y dx + (x + y^2) dy = 0. dx/dy + (1/y) x = -y. P(y) = 1/y, mu = e^(integral 1/y dy) = y. (y x)\' = -y^2. y x = -y^3/3 + C. x = -y^2/3 + C/y. Example: (y^2 + x) dy - y dx = 0. Rewrite: y dx - (y^2 + x) dy = 0, or dx/dy - (1/y) x = y. Linear in x. mu = e^(integral -1/y dy) = 1/y. (x/y)\' = 1. x/y = y + C, x = y^2 + C y. ✓',
  'ch06p1_treat_x_as_function',
  'problem_solving',
  ['treat x as function of y', 'linear in x', 'switch roles', 'dx/dy', 'solve']
)

add(
  'How do you solve first-order ODEs using substitution u = x y?',
  'For ODEs containing xy as a unit (e.g., dy/dx = f(xy)), substitute u = x y. Then du/dx = y + x dy/dx. So dy/dx = (du/dx - y)/x = (du/dx - u/x)/x = (1/x) du/dx - u/x^2. Substitute into ODE. Example: dy/dx = (x y + 1)^2. Let u = x y. du/dx = y + x y\' = u/x + x (u+1)^2 /x^2... wait, substitute y\' directly: y = u/x, y\' = (x u\' - u)/x^2. ODE: (x u\' - u)/x^2 = (u + 1)^2. x u\' - u = x^2 (u+1)^2. u\' = u/x + x (u+1)^2. Bernoulli-like in u. Or simpler: let v = u + 1 = xy + 1. v\' = (v-1)/x + x v^2. Not trivial — sometimes other methods better. ✓',
  'ch06p1_substitution_xy',
  'problem_solving',
  ['substitution', 'u = xy', 'product', 'transform', 'first-order']
)

add(
  'How do you solve the IVP dy/dx = (y - 1)/(x + 2), y(-1) = 0?',
  'This is separable AND linear. Method 1 (separable): dy/(y-1) = dx/(x+2). Integrate: ln|y-1| = ln|x+2| + C. |y - 1| = A |x + 2|. So y - 1 = C\'(x + 2), y = 1 + C\'(x+2). IC y(-1) = 0: 0 = 1 + C\'(1), C\' = -1. So y = 1 - (x + 2) = -x - 1. Method 2 (linear): y\' - y/(x+2) = -1/(x+2). P = -1/(x+2), mu = e^(integral -1/(x+2) dx) = 1/(x+2). (y/(x+2))\' = -1/(x+2)^2. y/(x+2) = 1/(x+2) + C. y = 1 + C(x+2). IC: 0 = 1 + C, C = -1. y = 1 - (x+2) = -x - 1. Same. Check: y\' = -1. RHS = (-x-1-1)/(x+2) = -(x+2)/(x+2) = -1. ✓',
  'ch06p1_worked_separable_linear',
  'problem_solving',
  ['IVP', 'separable', 'linear', 'worked problem', 'both methods']
)

add(
  'How do you solve dy/dx + (2/x) y = x^2 y^3 (Bernoulli)?',
  'Bernoulli with n = 3, P = 2/x, Q = x^2. Substitute v = y^(1-3) = y^(-2) = 1/y^2. dv/dx = -2 y^(-3) y\'. Multiply ODE by -2 y^(-3): -2 y^(-3) y\' - (4/x) y^(-2) = -2 x^2. So dv/dx - (4/x) v = -2 x^2. Linear in v. P = -4/x, mu = e^(integral -4/x dx) = x^(-4) = 1/x^4. (v/x^4)\' = -2 x^2 / x^4 = -2/x^2. v/x^4 = 2/x + C. v = 2 x^3 + C x^4. Back-sub: 1/y^2 = 2 x^3 + C x^4. y^2 = 1/(2 x^3 + C x^4). y = ± 1/sqrt(2 x^3 + C x^4). Check: as x -> 0+, y -> infinity if C > 0; specific behavior depends on C. ✓',
  'ch06p1_worked_bernoulli',
  'problem_solving',
  ['worked', 'Bernoulli', 'n = 3', 'substitute v = y^(-2)', 'linear']
)

add(
  'How do you solve (3x^2 y + 2xy + y^3) dx + (x^2 + y^2) dy = 0?',
  'Check exactness: M = 3x^2 y + 2xy + y^3, N = x^2 + y^2. partial M/partial y = 3x^2 + 2x + 3y^2. partial N/partial x = 2x. Not exact (3x^2 + 3y^2 != 0). Try integrating factor. (M_y - N_x)/N = (3x^2 + 3y^2)/(x^2 + y^2) = 3. Function of x only? No (function of nothing — constant 3). So mu(x) = e^(integral 3 dx) = e^(3x). Multiply: e^(3x)(3x^2 y + 2xy + y^3) dx + e^(3x)(x^2 + y^2) dy = 0. Check exactness: new M_y = e^(3x)(3x^2 + 2x + 3y^2). new N_x = 3 e^(3x)(x^2 + y^2) + e^(3x)(2x) = e^(3x)(3x^2 + 3y^2 + 2x). Equal. Exact. Find f: f = integral e^(3x)(x^2 + y^2) dy = e^(3x)(x^2 y + y^3/3) + h(x). f_x = 3 e^(3x)(x^2 y + y^3/3) + e^(3x)(2xy) + h\' = e^(3x)(3x^2 y + y^3 + 2xy) + h\'. Set = M = e^(3x)(3x^2 y + 2xy + y^3). So h\' = 0, h = const. Solution: e^(3x)(x^2 y + y^3/3) = C. ✓',
  'ch06p1_worked_exact_if',
  'problem_solving',
  ['worked', 'exact', 'integrating factor', 'mu(x)', 'find f']
)

// ============================================================
// WRITE OUTPUT
// ============================================================
const output = {
  generatedAt: new Date().toISOString(),
  totalItems: items.length,
  subject: 'mathematics_formulas_volume_9_chapter_06_part_01',
  volume:
    'Volume 9 — Comprehensive Formula Encyclopedia, Chapter 6 Part 1 (First-Order Ordinary Differential Equations: Introduction & Classification, Separable Equations, Linear First-Order ODEs, Exact Equations, Bernoulli Equations, Homogeneous Equations, Substitution Methods, Modeling with First-Order ODEs, Direction Fields & Phase Lines, Existence and Uniqueness, Euler Method, Autonomous Equations & Logistic, Special Forms & Worked Problems)',
  source: 'TRIZA Generated Formula Dataset',
  language: 'en',
  religionNeutral: true,
  items,
}

mkdirSync('data', { recursive: true })
writeFileSync('data/math-formulas-vol9-ch06p1.json', JSON.stringify(output, null, 2))
console.log(`Wrote ${items.length} items to data/math-formulas-vol9-ch06p1.json`)
