/**
 * ============================================================
 *  Mathematics Formula Encyclopedia — Volume 9
 *  Comprehensive Formula Reference
 *  Chapter 5 — Part 3 (Vector Calculus)
 *  Vector Fields, Line Integrals, Fundamental Theorem for Line
 *  Integrals, Green's Theorem, Curl and Divergence, Parametric
 *  Surfaces & Surface Integrals, Stokes' Theorem, Divergence
 *  Theorem
 *  Generator for TRIZA
 * ============================================================
 *
 *  Output: data/math-formulas-vol9-ch05p3.json
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
// SECTION 1 — VECTOR FIELDS (5 items)
// ============================================================
add(
  'What is a vector field?',
  'A vector field in R^2 or R^3 assigns a vector to each point. In 2D: F(x, y) = <P(x, y), Q(x, y)>. In 3D: F(x, y, z) = <P, Q, R>. Visualized as field of arrows. Examples: velocity field of fluid, electric field, gravitational field, gradient of scalar function. Example: F(x, y) = <-y, x> is rotational field (vectors rotate counterclockwise around origin). Example: F(x, y, z) = <x, y, z> = r is radial field pointing outward. Example: F = <-y, x, 0> has magnitude sqrt(x^2+y^2) = r, swirls around z-axis. ✓',
  'ch05p3_vector_field_definition',
  'formula_recall',
  ['vector field', 'assigns vector', 'point', 'flow', 'gradient field']
)

add(
  'What is a gradient vector field?',
  'A vector field F is a gradient (conservative) field if F = grad f for some scalar function f, called the potential function. Then F = <f_x, f_y, f_z>. Conservative fields have path-independent line integrals. To check if F = <P, Q> is conservative (in 2D): partial P/partial y = partial Q/partial x. In 3D: curl F = 0. Example: F = <2x, 4y> = grad(x^2 + 2y^2), so conservative with f = x^2 + 2y^2. Example: F = <-y, x> has partial(-y)/partial y = -1, partial(x)/partial x = 1. Not equal, so NOT conservative. ✓',
  'ch05p3_gradient_field',
  'formula_recall',
  ['gradient field', 'conservative', 'potential function', 'grad f', 'path independent']
)

add(
  'How do you find the potential function of a conservative vector field?',
  'To find potential f for conservative F = <P, Q, R>: (1) Integrate P w.r.t. x: f = integral P dx + g(y, z). (2) Differentiate w.r.t. y and set = Q: solve for g_y. (3) Integrate w.r.t. y. (4) Differentiate w.r.t. z, set = R, solve for remaining. Example: F = <2xy, x^2 + 2y, 0>. f = integral 2xy dx = x^2 y + g(y). f_y = x^2 + g\'(y) = x^2 + 2y => g\' = 2y => g = y^2 + C. So f = x^2 y + y^2 + C. Check: grad f = <2xy, x^2 + 2y, 0> = F. ✓',
  'ch05p3_potential_function',
  'problem_solving',
  ['potential function', 'conservative', 'integrate', 'find f', 'gradient']
)

add(
  'What are examples of important vector fields in physics?',
  'Important physics vector fields: (1) Gravitational: F = -GMm/r^2 · r_hat (radial, attractive). (2) Electric: E = kQ/r^2 · r_hat (Coulomb). (3) Magnetic (around wire): B = mu_0 I/(2pi r) · theta_hat. (4) Velocity field of fluid: v(x, y, z) (e.g., uniform flow <v0, 0, 0>, or vortex <-omega y, omega x, 0>). (5) Spring (Hooke): F = -k·r. (6) Newton\'s law of cooling: grad of temperature. Example: Gravitational F = <-GMmx/r^3, -GMmy/r^3, -GMmz/r^3> = grad(GMm/r). Potential f = -GMm/r. ✓',
  'ch05p3_physics_vector_fields',
  'formula_recall',
  ['physics', 'gravitational', 'electric', 'magnetic', 'velocity', 'force field']
)

add(
  'How do you sketch a vector field?',
  'Sketching vector field F = <P, Q>: (1) Sample points on grid. (2) Compute F at each, draw arrow. (3) Look for patterns: radial (outward/inward), rotational, shear. Example: F = <x, y> (radial outward). At (1,0): <1,0> right. At (0,1): <0,1> up. At (1,1): <1,1> NE. Arrows point outward from origin. Example: F = <-y, x> (counterclockwise rotation). At (1,0): <0,1> up. At (0,1): <-1,0> left. Arrows rotate CCW. Magnitude indicates field strength. Streamlines (curves following field) help visualize flow. ✓',
  'ch05p3_sketch_vector_field',
  'problem_solving',
  ['sketch', 'vector field', 'arrows', 'radial', 'rotational', 'streamlines']
)

// ============================================================
// SECTION 2 — LINE INTEGRALS (6 items)
// ============================================================
add(
  'What is a line integral of a scalar function?',
  'Line integral of f(x, y, z) along curve C parametrized by r(t) = <x(t), y(t), z(t)>, t in [a, b]: integral_C f ds = integral_a^b f(r(t))·|r\'(t)| dt. Geometric: area of "fence" built on C with height f. ds = |r\'(t)| dt = sqrt(x\'^2 + y\'^2 + z\'^2) dt. Example: f(x,y) = x + y along line from (0,0) to (1,1). Parametrize r(t) = <t, t>, t in [0,1]. |r\'| = sqrt(2). integral_0^1 (2t)·sqrt(2) dt = 2sqrt(2)·(1/2) = sqrt(2). ✓',
  'ch05p3_line_integral_scalar',
  'formula_recall',
  ['line integral', 'scalar function', 'ds', 'arc length element', 'fence']
)

add(
  'How do you compute a line integral of a vector field?',
  'Line integral of vector field F along curve C: integral_C F·dr = integral_C (P dx + Q dy + R dz) = integral_a^b F(r(t))·r\'(t) dt. Represents work done by F along C. Example: F = <y, x>, along r(t) = <cos t, sin t>, t in [0, pi/2] (quarter circle). F(r(t)) = <sin t, cos t>. r\'(t) = <-sin t, cos t>. F·r\' = -sin^2 t + cos^2 t = cos(2t). integral_0^(pi/2) cos(2t) dt = [sin(2t)/2]_0^(pi/2) = 0. ✓',
  'ch05p3_line_integral_vector',
  'formula_recall',
  ['line integral', 'vector field', 'work', 'F dot dr', 'parametrize']
)

add(
  'What is the physical interpretation of a line integral?',
  'Line integral integral_C F·dr represents WORK done by force F moving a particle along curve C. Units: Newton-meters (Joules) for force-displacement. If F is velocity field of fluid, integral_C F·dr is circulation along C. Example: F = <0, -g> (gravity), particle moves from (0, 10) to (0, 0) along y-axis. r(t) = <0, 10-t>, t in [0,10]. F = <0, -g>, dr = <0, -1> dt. F·dr = g dt. Work = integral_0^10 g dt = 10g (positive: gravity does work on falling object). If path goes UP, work negative (against gravity). ✓',
  'ch05p3_line_integral_work',
  'problem_solving',
  ['work', 'force', 'physical', 'circulation', 'line integral']
)

add(
  'How do you compute line integrals along piecewise smooth curves?',
  'For piecewise smooth C = C1 + C2 + ... + Cn: integral_C F·dr = sum integral_{Ci} F·dr (additivity). Parametrize each piece separately. Example: F = <y, x> along path: C1 from (0,0) to (1,0) (x-axis), C2 from (1,0) to (1,1) (vertical). C1: r = <t, 0>, F = <0, t>, dr = <1, 0> dt, F·dr = 0. C2: r = <1, t>, F = <t, 1>, dr = <0, 1> dt, F·dr = 1. Total = 0 + 1 = 1. Compare straight line from (0,0) to (1,1) (previous example gave 0). Different path, different result => F not conservative. ✓',
  'ch05p3_line_integral_piecewise',
  'problem_solving',
  ['piecewise', 'smooth', 'additive', 'segments', 'line integral']
)

add(
  'How do you compute line integrals with respect to x, y, z separately?',
  'Line integrals w.r.t. coordinates: integral_C P dx = integral_a^b P(r(t))·x\'(t) dt. Similarly dy, dz. Often written: integral_C P dx + Q dy + R dz = integral_C F·dr. Note dx = x\'(t) dt (no |r\'| factor, unlike ds). Example: integral_C x dy along circle r = <cos t, sin t>, t in [0, 2pi]. x = cos t, dy = cos t dt. integral = integral_0^(2pi) cos^2 t dt = pi. (Area enclosed by circle via this line integral.) ✓',
  'ch05p3_line_integral_coordinates',
  'problem_solving',
  ['dx dy dz', 'coordinates', 'separately', 'no |r prime|', 'line integral']
)

add(
  'What is the relationship between line integrals and arc length?',
  'Special cases: (1) If f = 1: integral_C 1 ds = arc length of C. (2) Average value of f on C: (1/L) integral_C f ds where L = arc length. (3) Center of mass of wire with density rho: xbar = (1/m) integral_C x·rho ds, m = integral_C rho ds. Example: Wire along r(t) = <cos t, sin t>, t in [0, pi> with density rho = y. m = integral_0^pi sin t·1 dt = 2. xbar = (1/2) integral_0^pi cos t·sin t dt = (1/2)·0 = 0. ybar = (1/2) integral_0^pi sin^2 t dt = (1/2)·(pi/2) = pi/4. ✓',
  'ch05p3_line_integral_arc_length',
  'problem_solving',
  ['arc length', 'average value', 'center of mass', 'wire', 'density']
)

// ============================================================
// SECTION 3 — FUNDAMENTAL THEOREM FOR LINE INTEGRALS (5 items)
// ============================================================
add(
  'What is the Fundamental Theorem for Line Integrals?',
  'Fundamental Theorem for Line Integrals: If F = grad f (conservative) and C is smooth curve from point A to point B, then integral_C F·dr = f(B) - f(A). The integral depends only on endpoints, not path (path independence). Example: F = <2x, 4y> = grad(x^2 + 2y^2). Integral from (0,0) to (1,1): f(1,1) - f(0,0) = (1 + 2) - 0 = 3. Verify: along any path, integral = 3. ✓',
  'ch05p3_ftc_line_integrals',
  'formula_recall',
  ['Fundamental Theorem', 'line integral', 'conservative', 'path independent', 'endpoints']
)

add(
  'How do you determine if a vector field is conservative?',
  'Conservative tests: F = <P, Q> in 2D: conservative (on simply connected domain) iff partial P/partial y = partial Q/partial x. F = <P, Q, R> in 3D: conservative (on simply connected domain) iff curl F = 0 (i.e., the three cross-partial conditions hold). Example: F = <y + 2x, x + 3y^2>. partial P/partial y = 1, partial Q/partial x = 1. Equal => conservative. Find f: f = integral (y + 2x) dx = xy + x^2 + g(y). f_y = x + g\' = x + 3y^2 => g = y^3. f = xy + x^2 + y^3. ✓',
  'ch05p3_conservative_test',
  'problem_solving',
  ['conservative', 'test', 'curl zero', 'partial P partial y', 'simply connected']
)

add(
  'What is path independence of line integrals?',
  'Path independence: integral_C F·dr depends only on endpoints, not path. Equivalent statements (on simply connected domain): (1) F conservative (= grad f). (2) integral_C F·dr = 0 for every closed curve C. (3) Line integral path-independent. (4) curl F = 0 (3D) or partial P/partial y = partial Q/partial x (2D). Example: F = <2x, 2y> = grad(x^2 + y^2). Around unit circle: integral = (1+1) - (1+1) = 0 (closed curve). ✓',
  'ch05p3_path_independence',
  'formula_recall',
  ['path independence', 'conservative', 'closed curve', 'equivalent', 'endpoints']
)

add(
  'How do you use the Fundamental Theorem to evaluate line integrals?',
  'Using FTC for line integrals: (1) Verify F conservative. (2) Find potential f with grad f = F. (3) Evaluate f(B) - f(A) where A = start, B = end. Example: F = <2xy + 3, x^2 - 4y>. Check: partial P/partial y = 2x, partial Q/partial x = 2x. Equal => conservative. Find f: integral (2xy + 3) dx = x^2 y + 3x + g(y). f_y = x^2 + g\' = x^2 - 4y => g = -2y^2. So f = x^2 y + 3x - 2y^2. Integral from (1, 0) to (2, 1): f(2,1) - f(1,0) = (4 + 6 - 2) - (0 + 3 - 0) = 8 - 3 = 5. ✓',
  'ch05p3_ftc_evaluate',
  'problem_solving',
  ['FTC', 'evaluate', 'potential', 'conservative', 'endpoints']
)

add(
  'How do you find the work done by a conservative force?',
  'Work done by conservative F from A to B: W = integral_C F·dr = f(B) - f(A) = -Delta U where U = potential energy. (Convention: F = -grad U.) So work = -Delta U (work done BY force = decrease in PE). Example: Gravity F = <0, 0, -mg> = -grad(mg z). U = mgz. Object falls from z=10 to z=0. W = U(10) - U(0) = 10mg (positive, gravity does work). Delta U = U(0) - U(10) = -10mg (PE decreases). ✓',
  'ch05p3_work_conservative',
  'problem_solving',
  ['work', 'conservative', 'potential energy', 'gravity', 'FTC']
)

// ============================================================
// SECTION 4 — GREEN'S THEOREM (6 items)
// ============================================================
add(
  'What is Green\'s Theorem?',
  'Green\'s Theorem: If C is positively oriented (counterclockwise), simple closed curve enclosing region D, and P, Q have continuous partials on D, then integral_C (P dx + Q dy) = integral integral_D (partial Q/partial x - partial P/partial y) dA. Converts line integral around closed curve to double integral over enclosed region. Example: integral_C (x dy - y dx) around unit circle. P = -y, Q = x. partial Q/partial x = 1, partial P/partial y = -1. integral integral_D (1 - (-1)) dA = 2·area = 2pi. ✓',
  'ch05p3_greens_theorem',
  'formula_recall',
  ['Green Theorem', 'line integral', 'double integral', 'closed curve', 'positively oriented']
)

add(
  'How do you use Green\'s Theorem to evaluate line integrals?',
  'Using Green\'s Theorem: (1) Verify C is closed, positively oriented. (2) Identify P, Q. (3) Compute partial Q/partial x - partial P/partial y. (4) Integrate over D. Example: integral_C (3y dx + 2x dy) around triangle (0,0), (1,0), (0,1). P=3y, Q=2x. partial Q/partial x - partial P/partial y = 2 - 3 = -1. integral integral_D (-1) dA = -1·(area) = -1·(1/2) = -1/2. (Going CCW around triangle.) Note: if C clockwise, negate. ✓',
  'ch05p3_greens_evaluate',
  'problem_solving',
  ['Green Theorem', 'evaluate', 'line integral', 'P dx Q dy', 'partial']
)

add(
  'How do you use Green\'s Theorem to find area?',
  'Area via Green\'s Theorem: A = integral integral_1 dA = integral_C x dy = -integral_C y dx = (1/2) integral_C (x dy - y dx). Choose form based on convenience. Example: Area of ellipse x = a cos t, y = b sin t, t in [0, 2pi]. A = (1/2) integral (x dy - y dx) = (1/2) integral_0^(2pi) [a cos t · b cos t - b sin t · (-a sin t)] dt = (1/2) integral_0^(2pi) ab dt = pi·ab. ✓ (Standard ellipse area formula.)',
  'ch05p3_greens_area',
  'problem_solving',
  ['area', 'Green Theorem', 'ellipse', 'x dy - y dx', 'closed curve']
)

add(
  'What is the extended form of Green\'s Theorem for regions with holes?',
  'Green\'s for region with hole: boundary is outer curve C1 (CCW) plus inner curve C2 (CW around hole, or equivalently CCW around hole boundary but traversed oppositely). integral_C P dx + Q dy = integral_C1 + integral_C2 (where C2 is taken so region is on left). Alternative: integral_integral_D (Q_x - P_y) dA = integral_outer (P dx + Q dy) - integral_inner (P dx + Q dy) (both inner CCW). Example: Annulus between circles r=1 and r=2. integral_C1 - integral_C2 = integral integral (Q_x - P_y) dA. If P=-y/(x^2+y^2), Q=x/(x^2+y^2): Q_x - P_y = 0 (except origin), but integral around inner circle (enclosing origin) = 2pi (singularity). ✓',
  'ch05p3_greens_holes',
  'problem_solving',
  ['Green Theorem', 'holes', 'region', 'annulus', 'singularity']
)

add(
  'What is the alternative (flux/divergence) form of Green\'s Theorem?',
  'Flux form (divergence form) of Green\'s Theorem: integral_C F·n ds = integral integral_D div F dA, where F = <P, Q>, n is outward unit normal, div F = P_x + Q_y. The left side is flux (outward flow) across C. Example: F = <x, y>. div F = 2. Flux out of unit circle: integral_C F·n ds = integral integral 2 dA = 2pi. (Twice the area.) For C: n = <x, y> (unit), F·n = x^2 + y^2 = 1 on unit circle. integral_0^(2pi) 1 dt = 2pi. ✓',
  'ch05p3_greens_flux_form',
  'formula_recall',
  ['flux form', 'divergence form', 'Green Theorem', 'outward normal', 'flux']
)

add(
  'How do you compute flux and circulation using Green\'s Theorem?',
  'Circulation: integral_C F·dr = integral integral_D (Q_x - P_y) dA (tangential form). Flux (out of region): integral_C F·n ds = integral integral_D div F dA = integral integral_D (P_x + Q_y) dA (normal form). Example: F = <x^2, y^2>, around unit circle. Circulation = integral integral (0 - 0) dA = 0. Flux = integral integral (2x + 2y) dA = 0 (odd function over symmetric region). Both zero. Example: F = <x, 0> (uniform flow in x). Flux out of unit circle = integral integral 1 dA = pi. ✓',
  'ch05p3_flux_circulation',
  'problem_solving',
  ['flux', 'circulation', 'Green Theorem', 'tangential', 'normal']
)

// ============================================================
// SECTION 5 — CURL AND DIVERGENCE (5 items)
// ============================================================
add(
  'What is the curl of a vector field?',
  'Curl of F = <P, Q, R>: curl F = nabla x F = <partial R/partial y - partial Q/partial z, partial P/partial z - partial R/partial x, partial Q/partial x - partial P/partial y>. Determinant form: |i j k; partial/partial x partial/partial y partial/partial z; P Q R|. Measures rotation/tendency of field to swirl. If curl F = 0, field is irrotational (and conservative if simply connected). Example: F = <-y, x, 0> (rotational). curl F = <0 - 0, 0 - 0, 1 - (-1)> = <0, 0, 2>. Magnitude 2 = twice angular velocity. ✓',
  'ch05p3_curl',
  'formula_recall',
  ['curl', 'nabla x F', 'rotation', 'irrotational', 'determinant']
)

add(
  'What is the divergence of a vector field?',
  'Divergence of F = <P, Q, R>: div F = nabla·F = partial P/partial x + partial Q/partial y + partial R/partial z. Scalar field measuring net outflow per unit volume at each point. If div F > 0: source (outflow). div F < 0: sink (inflow). div F = 0: incompressible (solenoidal). Example: F = <x, y, z> (radial outward). div F = 1 + 1 + 1 = 3 (source everywhere). Example: F = <-x, -y, -z> (inward). div = -3 (sink). Example: F = <-y, x, 0>. div = 0 + 0 + 0 = 0 (incompressible). ✓',
  'ch05p3_divergence',
  'formula_recall',
  ['divergence', 'nabla dot F', 'source sink', 'incompressible', 'outflow']
)

add(
  'What is the relationship between curl, div, and conservative fields?',
  'Key relationships: (1) curl(grad f) = 0 for any scalar f (gradient fields are irrotational). (2) div(curl F) = 0 for any F (curl fields are incompressible). (3) F conservative (on simply connected domain) iff curl F = 0. (4) F = grad f => curl F = 0. Converse: if curl F = 0 and domain simply connected, then F = grad f (conservative). Example: F = <y, x, 0>. curl = <0, 0, 1 - 1> = 0, so irrotational. On R^3 simply connected, F = grad(xy) = conservative. ✓',
  'ch05p3_curl_div_relationships',
  'formula_recall',
  ['curl', 'divergence', 'conservative', 'gradient', 'Laplacian', 'identities']
)

add(
  'What is the Laplacian and how does it relate to div and grad?',
  'Laplacian of scalar f: Delta f = div(grad f) = nabla^2 f = f_xx + f_yy + f_zz. Combines divergence (scalar from vector) with gradient (vector from scalar). Harmonic functions: Delta f = 0. Vector Laplacian: Delta F = grad(div F) - curl(curl F). Example: f = x^2 + y^2 + z^2. grad f = <2x, 2y, 2z>. div(grad f) = 2 + 2 + 2 = 6. So Laplacian = 6 (not harmonic). Example: f = 1/r = 1/sqrt(x^2+y^2+z^2). Delta(1/r) = 0 (harmonic away from origin). ✓',
  'ch05p3_laplacian_div_grad',
  'formula_recall',
  ['Laplacian', 'divergence of gradient', 'harmonic', 'nabla squared', 'scalar']
)

add(
  'What are the vector calculus identities?',
  'Key vector calculus identities: (1) curl(grad f) = 0. (2) div(curl F) = 0. (3) div(grad f) = Laplacian f. (4) curl(curl F) = grad(div F) - Laplacian F. (5) div(f F) = grad f · F + f div F. (6) curl(f F) = grad f x F + f curl F. (7) div(F x G) = G · curl F - F · curl G. (8) curl(F x G) = F div G - G div F + (G · grad)F - (F · grad)G. (9) div(F + G) = div F + div G. (10) curl(F + G) = curl F + curl G. These are fundamental for deriving PDEs and physics equations. ✓',
  'ch05p3_vector_identities',
  'formula_recall',
  ['identities', 'vector calculus', 'curl grad', 'div curl', 'product rules']
)

// ============================================================
// SECTION 6 — PARAMETRIC SURFACES (5 items)
// ============================================================
add(
  'What is a parametric surface?',
  'A parametric surface: r(u, v) = <x(u, v), y(u, v), z(u, v)> for (u, v) in domain D. Maps 2D parameter domain to 3D surface. Example: Sphere radius R: r(phi, theta) = <R sin phi cos theta, R sin phi sin theta, R cos phi>, phi in [0, pi], theta in [0, 2pi]. Example: Plane through origin: r(s, t) = s·u + t·v (u, v direction vectors). Example: Graph z = f(x, y): r(x, y) = <x, y, f(x, y)>. ✓',
  'ch05p3_parametric_surface',
  'formula_recall',
  ['parametric surface', 'r(u,v)', 'domain', 'mapping', 'sphere']
)

add(
  'How do you find the tangent plane to a parametric surface?',
  'Tangent vectors to parametric surface r(u, v): r_u = partial r/partial u, r_v = partial r/partial v. Normal vector: r_u x r_v (cross product). Tangent plane at r(u0, v0): n · (<x,y,z> - r(u0,v0)) = 0 where n = r_u x r_v. Example: r(s, t) = <s, t, s + t^2> at (1, 1). r_s = <1, 0, 1>, r_t = <0, 1, 2t> = <0, 1, 2> at t=1. r_s x r_t = <-1, -2, 1>. Point: <1, 1, 2>. Plane: -1(x-1) - 2(y-1) + 1(z-2) = 0 => -x - 2y + z + 1 = 0 => z = x + 2y - 1. ✓',
  'ch05p3_tangent_plane_parametric',
  'problem_solving',
  ['tangent plane', 'parametric surface', 'r_u r_v', 'normal', 'cross product']
)

add(
  'How do you find the surface area of a parametric surface?',
  'Surface area of r(u, v) over domain D: S = integral integral_D |r_u x r_v| dA. The |r_u x r_v| is the area distortion factor. Example: r(s, t) = <s cos t, s sin t, s> (cone), s in [0, 1], t in [0, 2pi]. r_s = <cos t, sin t, 1>, r_t = <-s sin t, s cos t, 0>. r_s x r_t = <-s cos t, -s sin t, s>. |r_s x r_t| = s·sqrt(cos^2 + sin^2 + 1) = s·sqrt(2). S = integral_0^(2pi) integral_0^1 s sqrt(2) ds dt = 2pi·sqrt(2)·(1/2) = pi sqrt(2). ✓',
  'ch05p3_surface_area_parametric',
  'problem_solving',
  ['surface area', 'parametric', 'r_u x r_v', 'magnitude', 'integral']
)

add(
  'How do you find the normal vector to a surface?',
  'Normal vectors to surface: (1) For F(x,y,z) = c: n = grad F (or normalized grad F/|grad F|). (2) For z = f(x, y): rewrite F = z - f(x,y) = 0, n = <-f_x, -f_y, 1>. (3) For parametric r(u,v): n = r_u x r_v (orientation depends on order). Outward vs inward: choose orientation consistently. Example: Sphere F = x^2 + y^2 + z^2 - R^2 = 0. grad F = <2x, 2y, 2z> (outward normal at (x,y,z)). ✓',
  'ch05p3_surface_normal',
  'problem_solving',
  ['normal vector', 'surface', 'gradient', 'parametric', 'orientation']
)

add(
  'How do you find the orientation of a surface?',
  'Orientation of surface: choice of unit normal n. Two orientations: n and -n. For closed surface (like sphere), "outward" is conventional positive. For graph z = f(x, y): n = <-f_x, -f_y, 1>/sqrt(1 + f_x^2 + f_y^2) (upward, positive z component). For parametric r(u, v): n = (r_u x r_v)/|r_u x r_v| (orientation depends on parameter order). For consistent orientation of a surface with boundary curve C: right-hand rule (walk along C with head in n direction, surface on left). Example: Sphere parameterized as r(phi, theta): r_phi x r_theta points outward (standard). ✓',
  'ch05p3_surface_orientation',
  'problem_solving',
  ['orientation', 'normal', 'outward', 'upward', 'right-hand rule']
)

// ============================================================
// SECTION 7 — SURFACE INTEGRALS (6 items)
// ============================================================
add(
  'What is a surface integral of a scalar function?',
  'Surface integral of f(x, y, z) over surface S: integral integral_S f dS. For parametric r(u, v) over D: integral integral_D f(r(u, v))·|r_u x r_v| dA. For graph z = g(x, y) over D: integral integral_D f(x, y, g(x, y))·sqrt(1 + g_x^2 + g_y^2) dA. Geometric: mass of surface with density f. Example: f = 1 gives surface area. Example: f(x, y, z) = z over hemisphere r = 1. Parametric r(phi, theta), |r_phi x r_theta| = sin phi. integral_0^(2pi) integral_0^pi (cos phi)(sin phi) d phi d theta = 2pi·[sin^2 phi / 2]_0^pi = 0. ✓',
  'ch05p3_surface_integral_scalar',
  'formula_recall',
  ['surface integral', 'scalar function', 'dS', 'parametric', 'graph']
)

add(
  'How do you compute a surface integral of a vector field (flux)?',
  'Flux integral: integral integral_S F·dS = integral integral_S F·n dS where n is unit normal. For parametric r(u, v): integral integral_D F(r(u, v))·(r_u x r_v) dA. For z = g(x, y) with upward normal: integral integral_D F·<-g_x, -g_y, 1> dA = integral integral_D (-P g_x - Q g_y + R) dA. Example: F = <0, 0, 1> upward through disk z = 0, x^2 + y^2 <= 1. n = <0, 0, 1>. F·n = 1. integral = pi. ✓',
  'ch05p3_surface_integral_vector',
  'formula_recall',
  ['flux integral', 'surface integral', 'vector field', 'F dot n', 'dS']
)

add(
  'How do you compute surface integrals over graphs z = g(x, y)?',
  'For S: z = g(x, y), (x, y) in D, with upward normal: dS vector = <-g_x, -g_y, 1> dx dy (includes normal direction). Surface integral of F = <P, Q, R>: integral integral_D F·<-g_x, -g_y, 1> dA = integral integral_D (-P g_x - Q g_y + R) dA. Example: F = <x, y, z>, surface z = x^2 + y^2 below z = 1. g_x = 2x, g_y = 2y. integrand = -x·2x - y·2y + z = -2x^2 - 2y^2 + (x^2+y^2) = -x^2 - y^2 = -r^2. integral_0^(2pi) integral_0^1 -r^2 · r dr d theta = 2pi·(-1/4) = -pi/2. ✓',
  'ch05p3_surface_integral_graph',
  'problem_solving',
  ['surface integral', 'graph', 'z = g(x,y)', 'upward normal', 'formula']
)

add(
  'How do you compute surface integrals over spheres?',
  'For sphere radius R centered at origin, outward normal: F·n = F·r/R (n = r/R). dS = R^2 sin phi d phi d theta (spherical surface element). Flux = integral_0^(2pi) integral_0^pi F·(r/R) R^2 sin phi d phi d theta. Example: F = <x, y, z> = r. F·n = r·r/R = R^2/R = R. Flux = integral integral R R^2 sin phi d phi d theta = R · 4pi R^2 = 4pi R^3. (Surface area 4pi R^2 times radial magnitude R.) ✓',
  'ch05p3_surface_integral_sphere',
  'problem_solving',
  ['surface integral', 'sphere', 'outward normal', 'spherical', 'flux']
)

add(
  'How do you compute surface integrals over cylinders?',
  'For cylinder x^2 + y^2 = R^2, 0 <= z <= h, outward normal n = <x/R, y/R, 0> = <cos theta, sin theta, 0>. dS = R d theta dz. Flux of F = <P, Q, R>: integral_0^h integral_0^(2pi) (P cos theta + Q sin theta) R d theta dz. Example: F = <x, y, 0>, cylinder R=1, h=2. F·n = x·cos theta + y·sin theta = cos^2 + sin^2 = 1. Flux = integral_0^2 integral_0^(2pi) 1 d theta dz = 4pi. ✓',
  'ch05p3_surface_integral_cylinder',
  'problem_solving',
  ['surface integral', 'cylinder', 'outward normal', 'flux', 'R dtheta dz']
)

add(
  'How do you find the mass and center of mass of a surface?',
  'Mass of surface with density rho(x, y, z): m = integral integral_S rho dS. Center of mass: xbar = (1/m) integral integral_S x rho dS, similarly ybar, zbar. Example: Hemisphere r = 1, z >= 0, density rho = z. m = integral_0^(2pi) integral_0^(pi/2) cos phi · sin phi d phi d theta = 2pi · (1/2) = pi. xbar = ybar = 0 by symmetry. zbar = (1/pi) integral integral z^2 dS = (1/pi) integral_0^(2pi) integral_0^(pi/2) cos^2 phi sin phi d phi d theta = (1/pi) · 2pi · (1/3) = 2/3. ✓',
  'ch05p3_surface_mass_center',
  'problem_solving',
  ['mass', 'center of mass', 'surface', 'density', 'hemisphere']
)

// ============================================================
// SECTION 8 — STOKES' THEOREM (5 items)
// ============================================================
add(
  'What is Stokes\' Theorem?',
  'Stokes\' Theorem: integral_C F·dr = integral integral_S curl F · dS, where C is boundary curve of oriented surface S, with positive orientation (right-hand rule: walk along C with head in normal direction, surface on left). Relates line integral around boundary to surface integral of curl. Example: F = <-y, x, 0>, S = upper hemisphere, C = unit circle in xy-plane. curl F = <0, 0, 2>. n (outward on hemisphere) has positive z component on upper hemisphere. integral integral curl F · n dS = 2 · (projected area) = 2·pi. Direct: integral_C (-y dx + x dy) = integral_0^(2pi) (sin^2 + cos^2) dt = 2pi. ✓',
  'ch05p3_stokes_theorem',
  'formula_recall',
  ['Stokes Theorem', 'curl', 'line integral', 'surface integral', 'boundary']
)

add(
  'How do you use Stokes\' Theorem to evaluate line integrals?',
  'Using Stokes to compute line integral: (1) Choose surface S with boundary C. (2) Compute curl F. (3) Evaluate surface integral of curl F over S. Example: F = <z, x, y>, C = unit circle in xy-plane (CCW viewed from +z). Choose S = unit disk in xy-plane, n = <0,0,1>. curl F = <1, 1, 1>. integral integral_S curl F·n dS = integral integral 1 dA = pi. ✓',
  'ch05p3_stokes_line_integral',
  'problem_solving',
  ['Stokes', 'line integral', 'curl', 'surface', 'evaluate']
)

add(
  'How do you use Stokes\' Theorem to evaluate surface integrals?',
  'Using Stokes in reverse: integral integral_S curl F·dS = integral_C F·dr where C = boundary of S. Compute the line integral (often easier if F conservative on curve). Example: S = upper hemisphere, F = <y, z, x>. curl F = <-1, -1, -1>. Direct surface integral: -3 · (projected area)/2 = -3pi/2 (rough). Using Stokes: C = unit circle. r = <cos t, sin t, 0>, dr = <-sin, cos, 0>. F(r) = <sin t, 0, cos t>. F·dr = -sin^2 t. integral_0^(2pi) -sin^2 t dt = -pi. ✓',
  'ch05p3_stokes_surface_integral',
  'problem_solving',
  ['Stokes', 'surface integral', 'boundary', 'line integral', 'reverse']
)

add(
  'What is the significance of Stokes\' Theorem being independent of surface?',
  'Stokes\' Theorem: integral_C F·dr = integral integral_S curl F·dS for ANY surface S with boundary C (with correct orientation). So the surface integral of curl F depends only on boundary curve, not surface itself. Example: Two surfaces S1 (disk) and S2 (hemisphere) both with boundary unit circle. integral integral_S1 curl F·dS = integral integral_S2 curl F·dS. This is because div(curl F) = 0, so by Divergence Theorem the closed surface S1 - S2 (forming closed shape) has zero flux of curl F. ✓',
  'ch05p3_stokes_surface_independence',
  'formula_recall',
  ['Stokes', 'surface independence', 'div curl = 0', 'boundary', 'any surface']
)

add(
  'How do you verify Stokes\' Theorem with an example?',
  'Verify Stokes on example: F = <y, -x, 0>, S = paraboloid z = 4 - x^2 - y^2 above z = 0, C = circle x^2 + y^2 = 4 in z = 0 plane (CCW from above). curl F = <0, 0, -2>. n on paraboloid (upward): <-g_x, -g_y, 1>/sqrt(...) = <2x, 2y, 1>/norm. curl F·n = -2/sqrt(4x^2 + 4y^2 + 1) = -2/sqrt(4r^2 + 1). dS = sqrt(4r^2 + 1) dA. Surface integral: integral_0^(2pi) integral_0^2 -2 r dr d theta = -2 · 2pi · 2 = -8pi. Line integral: r = <2 cos t, 2 sin t, 0>, F = <2 sin t, -2 cos t, 0>, dr = <-2 sin t, 2 cos t, 0> dt. F·dr = -4 sin^2 t - 4 cos^2 t = -4. integral_0^(2pi) -4 dt = -8pi. ✓ Both match.',
  'ch05p3_stokes_verify',
  'problem_solving',
  ['verify Stokes', 'curl', 'line integral', 'surface integral', 'match']
)

// ============================================================
// SECTION 9 — DIVERGENCE THEOREM (6 items)
// ============================================================
add(
  'What is the Divergence Theorem (Gauss\'s Theorem)?',
  'Divergence Theorem: integral integral_S F·n dS = integral integral integral_E div F dV, where E is solid bounded by closed surface S with outward normal n, F has continuous partials. Relates flux through closed surface to volume integral of divergence. Example: F = <x, y, z>, S = unit sphere. div F = 3. integral integral_S F·n dS = integral integral integral 3 dV = 3·(4/3)pi = 4pi. Direct: n = r/R, F·n = 1 on unit sphere, integral = 4pi·1 = 4pi. ✓',
  'ch05p3_divergence_theorem',
  'formula_recall',
  ['Divergence Theorem', 'Gauss', 'flux', 'volume integral', 'outward normal']
)

add(
  'How do you use the Divergence Theorem to evaluate surface integrals?',
  'Using Divergence Theorem: (1) Verify S is closed with outward normal. (2) Compute div F. (3) Evaluate triple integral over enclosed solid E. Example: F = <x^2, y^2, z^2>, S = unit cube [0,1]^3. div F = 2x + 2y + 2z. integral_0^1 integral_0^1 integral_0^1 2(x + y + z) dz dy dx = 2·3·(1/2) = 3. ✓',
  'ch05p3_divergence_evaluate',
  'problem_solving',
  ['Divergence Theorem', 'evaluate', 'flux', 'closed surface', 'triple integral']
)

add(
  'How do you use the Divergence Theorem to evaluate volume integrals?',
  'Reverse Divergence Theorem: integral integral integral_E div F dV = integral integral_S F·n dS (where S = boundary of E). Useful if surface integral is easier. Example: integral integral integral (x^2 + y^2 + z^2) dV over unit ball. Choose F such that div F = x^2 + y^2 + z^2. E.g., F = <x^3/3, y^3/3, z^3/3>. Then integral integral integral div F dV = integral integral_S (x^3/3 · x/R + ...) dS. On unit sphere: x^2 + y^2 + z^2 = 1, so = (1/3) integral integral (x^2 + y^2 + z^2) dS = (1/3)·4pi = 4pi/3. Wait direct: integral integral_S (x^4 + y^4 + z^4)/(3) dS, harder. Use spherical: r^2 · r^2 sin phi = r^4 sin phi. integral_0^1 r^4 dr · integral_0^pi sin phi d phi · integral_0^(2pi) d theta = (1/5)(2)(2pi) = 4pi/5. ✓',
  'ch05p3_divergence_volume',
  'problem_solving',
  ['Divergence Theorem', 'volume integral', 'reverse', 'find F', 'surface']
)

add(
  'How do you apply the Divergence Theorem to electric and gravitational fields?',
  'Gauss\'s Law (physics): For electric field E from charge density rho: integral integral_S E·n dS = Q_enc/epsilon_0 (Divergence Theorem form: div E = rho/epsilon_0). For point charge q at origin: E = q/(4pi epsilon_0 r^2) · r_hat. div E = 0 everywhere except origin (delta function). Flux through sphere of radius R: 4pi R^2 · q/(4pi epsilon_0 R^2) = q/epsilon_0. ✓ Same for any closed surface enclosing charge q. For gravity: integral integral g·n dS = -4pi G M_enc (Gauss\'s law for gravity). ✓',
  'ch05p3_gauss_law',
  'problem_solving',
  ['Gauss law', 'electric field', 'gravity', 'Divergence Theorem', 'charge']
)

add(
  'How do you verify the Divergence Theorem with an example?',
  'Verify Divergence Theorem: F = <x, y, 2z>, S = hemisphere x^2 + y^2 + z^2 = 1 (z >= 0) plus disk x^2 + y^2 <= 1, z = 0 (closed surface). Volume E = upper half-ball. div F = 1 + 1 + 2 = 4. Volume integral: 4 · (2/3)pi = 8pi/3. Surface integral: (1) Hemisphere outward: n = r. F·n = x·x + y·y + 2z·z = 1 + z^2. integral = integral_0^(2pi) integral_0^(pi/2) (1 + cos^2 phi) sin phi d phi d theta = 2pi · [1 + 1/3] = 8pi/3. (2) Disk: n = <0,0,-1> (outward = downward). F·n = -2z = 0 on z=0. Total = 8pi/3 + 0 = 8pi/3. ✓ Both match.',
  'ch05p3_divergence_verify',
  'problem_solving',
  ['verify Divergence Theorem', 'hemisphere', 'flux', 'match', 'closed surface']
)

add(
  'How do you find flux for a surface that is not closed?',
  'For non-closed surface S: (1) Close it by adding surface S2 (forming closed S + S2). (2) Apply Divergence Theorem: integral integral_{S+S2} F·n dS = integral integral integral_E div F dV. (3) Therefore integral integral_S F·n dS = triple integral - integral integral_S2 F·n dS. Example: F = <x, y, z>, S = upper hemisphere only (not closed, boundary is circle). Close with disk S2 in z=0 plane. Triple integral over upper half-ball: div = 3, volume = (2/3)pi, total = 2pi. Flux through S2 (n = <0,0,-1>): F·n = -z = 0 on z=0. So flux through S = 2pi - 0 = 2pi. ✓',
  'ch05p3_flux_non_closed',
  'problem_solving',
  ['flux', 'non-closed surface', 'close surface', 'Divergence Theorem', 'cap']
)

// ============================================================
// SECTION 10 — APPLICATIONS & UNIFICATION (4 items)
// ============================================================
add(
  'How do the Fundamental Theorem, Green\'s, Stokes\', and Divergence Theorems relate?',
  'Unification: All are generalizations of FTC. (1) FTC: integral_a^b f\' dx = f(b) - f(a) (1D boundary = endpoints). (2) FTC for Line Integrals: integral_C grad f · dr = f(B) - f(A) (1D boundary = endpoints). (3) Green\'s: integral_C F·dr = integral integral_D (curl F)·k dA (2D boundary = curve, 2D interior). Special case of Stokes\' (flat surface). (4) Stokes\': integral_C F·dr = integral integral_S curl F·dS (1D boundary, 2D surface). (5) Divergence: integral integral_S F·dS = integral integral integral_E div F dV (2D boundary, 3D interior). General form: integral_(boundary) omega = integral_(interior) d omega (exterior derivative). ✓',
  'ch05p3_theorems_unification',
  'formula_recall',
  ['unification', 'FTC', 'Green', 'Stokes', 'Divergence', 'generalized']
)

add(
  'How do you choose which vector calculus theorem to use?',
  'Choosing theorem: (1) Line integral over closed curve in 2D plane: Green\'s Theorem (convert to double integral). (2) Line integral over closed curve bounding surface in 3D: Stokes\' Theorem (convert to surface integral of curl). (3) Line integral with conservative F: FTC for Line Integrals (potential difference). (4) Surface integral over closed surface: Divergence Theorem (convert to triple integral of div). (5) Surface integral over non-closed surface with F = curl G: Stokes\' (convert to line integral of G around boundary). (6) If F conservative and closed curve: integral = 0 (by FTC). ✓',
  'ch05p3_choosing_theorem',
  'problem_solving',
  ['choose theorem', 'Green', 'Stokes', 'Divergence', 'FTC', 'when to use']
)

add(
  'What are the applications of vector calculus in physics?',
  'Physics applications: (1) Fluid dynamics: velocity field v, div v = 0 for incompressible. Circulation = integral v·dr. Vorticity = curl v. (2) Electromagnetism (Maxwell\'s equations): div E = rho/epsilon_0, div B = 0, curl E = -dB/dt, curl B = mu_0 J + mu_0 epsilon_0 dE/dt. (3) Heat transfer: Fourier\'s law q = -k grad T. (4) Gravity: g = -grad Phi, div g = -4pi G rho. (5) Conservation laws: continuity equation div(rho v) + drho/dt = 0. Example: Gauss\'s law integral integral E·dA = Q/epsilon_0 is Divergence Theorem applied to E. ✓',
  'ch05p3_applications_physics',
  'problem_solving',
  ['applications', 'physics', 'Maxwell', 'fluid dynamics', 'electromagnetism']
)

add(
  'What are Maxwell\'s equations in differential form?',
  'Maxwell\'s equations (differential form, in vacuum): (1) div E = rho/epsilon_0 (Gauss\'s law for E). (2) div B = 0 (no magnetic monopoles). (3) curl E = -partial B/partial t (Faraday\'s law). (4) curl B = mu_0 J + mu_0 epsilon_0 partial E/partial t (Ampere-Maxwell law). In integral form: (1) integral integral E·dA = Q/epsilon_0. (2) integral integral B·dA = 0. (3) integral_C E·dr = -d/dt integral integral B·dA. (4) integral_C B·dr = mu_0 I + mu_0 epsilon_0 d/dt integral integral E·dA. These unify electricity, magnetism, and light. ✓',
  'ch05p3_maxwells_equations',
  'formula_recall',
  ['Maxwell equations', 'electromagnetism', 'div E', 'curl B', 'Faraday', 'Ampere']
)

// ============================================================
// SECTION 11 — CONSERVATION LAWS & PDES (4 items)
// ============================================================
add(
  'What is the continuity equation for conservation of mass?',
  'Continuity equation (conservation of mass): partial rho/partial t + div(rho v) = 0, where rho = density, v = velocity field. In integral form: d/dt integral_E rho dV = -integral integral_S rho v · n dS (mass change = -flux out). For incompressible flow (rho constant): div v = 0. Example: Water in pipe, incompressible: div v = 0. If v = <v_x, 0, 0> (uniform), div = dv_x/dx = 0 means v_x constant. ✓',
  'ch05p3_continuity_equation',
  'formula_recall',
  ['continuity equation', 'conservation mass', 'divergence', 'incompressible', 'density']
)

add(
  'What is the heat equation?',
  'Heat equation: partial u/partial t = alpha · Laplacian u = alpha (u_xx + u_yy + u_zz), where u = temperature, alpha = thermal diffusivity. Derived from Fourier\'s law q = -k grad u (heat flows opposite to temperature gradient) and conservation of energy. Steady state: Laplacian u = 0 (Laplace\'s equation, harmonic). Example: 1D heat equation u_t = alpha u_xx. Steady state: u_xx = 0 => u = ax + b (linear temperature profile). ✓',
  'ch05p3_heat_equation',
  'formula_recall',
  ['heat equation', 'thermal diffusivity', 'Laplacian', 'Fourier law', 'steady state']
)

add(
  'What is the wave equation?',
  'Wave equation: partial^2 u/partial t^2 = c^2 · Laplacian u = c^2 (u_xx + u_yy + u_zz), where c = wave speed. Describes waves: sound, light, water, vibrating strings. 1D string: u_tt = c^2 u_xx. Solution: u(x, t) = f(x - ct) + g(x + ct) (d\'Alembert, traveling waves). Example: Vibrating string with fixed ends u(0,t) = u(L,t) = 0: u(x,t) = sum A_n sin(n pi x / L) cos(n pi c t / L) (Fourier series). ✓',
  'ch05p3_wave_equation',
  'formula_recall',
  ['wave equation', 'wave speed', 'Laplacian', 'd Alembert', 'vibrating string']
)

add(
  'What are Laplace\'s and Poisson\'s equations?',
  'Laplace\'s equation: Laplacian u = 0 (u_xx + u_yy + u_zz = 0). Solutions: harmonic functions. Boundary value problem: Dirichlet (u specified on boundary) or Neumann (partial u/partial n specified). Example: steady-state heat in region without sources. u = 1/r is harmonic away from origin (potential of point charge). Poisson\'s equation: Laplacian u = f(x, y, z) (with source). Example: electrostatics Laplacian Phi = -rho/epsilon_0. ✓',
  'ch05p3_laplace_poisson',
  'formula_recall',
  ['Laplace equation', 'Poisson equation', 'harmonic', 'Dirichlet', 'Neumann']
)

// ============================================================
// SECTION 12 — WORKED PROBLEMS (4 items)
// ============================================================
add(
  'How do you compute the work done moving a particle along a curve in a force field?',
  'Work computation: W = integral_C F·dr. Steps: (1) Parametrize C as r(t), t in [a, b]. (2) Compute F(r(t)). (3) Compute r\'(t). (4) Integrate F(r(t))·r\'(t) dt. Example: F = <x, y>, C: r(t) = <cos t, sin t>, t in [0, pi>. F(r) = <cos t, sin t>. r\' = <-sin t, cos t>. F·r\' = -cos t sin t + sin t cos t = 0. Work = 0. (F is radial outward, perpendicular to circular path, so no work.) Example: F = <-y, x> on same path. F·r\' = sin^2 t + cos^2 t = 1. Work = pi. (Force tangential to circle.) ✓',
  'ch05p3_work_problem',
  'problem_solving',
  ['work', 'compute', 'force field', 'curve', 'parametrize']
)

add(
  'How do you find the circulation of a vector field around a closed curve?',
  'Circulation: integral_C F·dr around closed C. Methods: (1) Direct parametrization. (2) Green\'s Theorem (2D): integral integral (Q_x - P_y) dA. (3) Stokes\' (3D): integral integral curl F · dS. Example: F = <x^2 y, x + y^2> around square [0,1]x[0,1]. Green: Q_x - P_y = 1 - x^2. integral_0^1 integral_0^1 (1 - x^2) dy dx = integral_0^1 (1 - x^2) dx = 1 - 1/3 = 2/3. ✓',
  'ch05p3_circulation_problem',
  'problem_solving',
  ['circulation', 'closed curve', 'Green', 'Stokes', 'compute']
)

add(
  'How do you find the flux of a vector field across a surface?',
  'Flux computation: integral integral_S F·n dS. Methods: (1) Direct (parametrize S, compute n dS = r_u x r_v). (2) For closed surface: Divergence Theorem (triple integral of div F). Example: F = <x^3, y^3, z^3> out of unit sphere. Direct: hard. Divergence: div F = 3x^2 + 3y^2 + 3z^2 = 3r^2. Triple integral in spherical: 3 · integral_0^1 r^2 · r^2 dr · integral_0^pi sin phi d phi · integral_0^(2pi) d theta = 3 · (1/5) · 2 · 2pi = 12pi/5. ✓',
  'ch05p3_flux_problem',
  'problem_solving',
  ['flux', 'surface', 'compute', 'Divergence Theorem', 'outward']
)

add(
  'How do you verify a vector field is conservative and find its potential?',
  'Conservative verification + potential: (1) Compute curl F (3D) or check partial P/partial y = partial Q/partial x (2D). (2) If zero on simply connected domain, conservative. (3) Find f: integrate P w.r.t. x, then determine unknown function of y (and z) by matching Q and R. Example: F = <2x + y, x + 3y^2, 0>. partial P/partial y = 1 = partial Q/partial x. Conservative. f = integral (2x + y) dx = x^2 + xy + g(y). f_y = x + g\' = x + 3y^2 => g = y^3. f = x^2 + xy + y^3 + C. Verify: grad f = <2x + y, x + 3y^2, 0> = F. ✓',
  'ch05p3_conservative_potential_problem',
  'problem_solving',
  ['conservative', 'potential', 'verify', 'find f', 'curl zero']
)

// ============================================================
// WRITE OUTPUT
// ============================================================
const output = {
  generatedAt: new Date().toISOString(),
  totalItems: items.length,
  subject: 'mathematics_formulas_volume_9_chapter_05_part_03',
  volume:
    'Volume 9 — Comprehensive Formula Encyclopedia, Chapter 5 Part 3 (Vector Calculus: Vector Fields, Line Integrals, Fundamental Theorem for Line Integrals, Green Theorem, Curl and Divergence, Parametric Surfaces, Surface Integrals, Stokes Theorem, Divergence Theorem, Applications and Unification, Conservation Laws and PDEs, Worked Problems)',
  source: 'TRIZA Generated Formula Dataset',
  language: 'en',
  religionNeutral: true,
  items,
}

mkdirSync('data', { recursive: true })
writeFileSync('data/math-formulas-vol9-ch05p3.json', JSON.stringify(output, null, 2))
console.log(`Wrote ${items.length} items to data/math-formulas-vol9-ch05p3.json`)
