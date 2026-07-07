/**
 * ============================================================
 *  Mathematics Formula Encyclopedia — Volume 9
 *  Comprehensive Formula Reference
 *  Chapter 5 — Part 2 (Multivariable Calculus)
 *  Vectors in 2D & 3D, Dot Product, Cross Product, Lines &
 *  Planes in 3D, Quadric Surfaces, Vector-Valued Functions,
 *  Calculus of VVF, Arc Length & Curvature, Motion in Space,
 *  Functions of Several Variables, Limits & Continuity,
 *  Partial Derivatives, Chain Rule, Directional Derivatives &
 *  Gradient, Tangent Planes & Linear Approximation, Extrema,
 *  Lagrange Multipliers, Double Integrals, Triple Integrals
 *  Generator for TRIZA
 * ============================================================
 *
 *  Output: data/math-formulas-vol9-ch05p2.json
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
// SECTION 1 — VECTORS IN 2D AND 3D (5 items)
// ============================================================
add(
  'What is a vector and how is it represented?',
  'A vector is a quantity with both magnitude (length) and direction, denoted v or vec(v). Geometrically an arrow. Algebraically: v = <v1, v2> in 2D or <v1, v2, v3> in 3D. Components v1, v2, v3 are projections onto axes. The zero vector 0 = <0,0,0> has no direction. Example: Vector from point A(1,2,3) to B(4,6,8): AB = <4-1, 6-2, 8-3> = <3, 4, 5>. Example: v = <2, -3> represents 2 units right, 3 units down. Vectors are equal iff all components equal. ✓',
  'ch05p2_vector_definition',
  'formula_recall',
  ['vector', 'magnitude', 'direction', 'components', 'representation']
)

add(
  'How do you find the magnitude of a vector?',
  'Magnitude (length, norm) of vector v = <v1, v2, v3>: |v| = sqrt(v1^2 + v2^2 + v3^2). In 2D: |<v1,v2>| = sqrt(v1^2 + v2^2). Example: |<3, 4>| = sqrt(9+16) = 5 (3-4-5 triangle). Example: |<1, 2, 2>| = sqrt(1+4+4) = sqrt(9) = 3. Unit vector: u = v/|v| (magnitude 1). Example: unit vector along <3, 4> = <3/5, 4/5>. The standard basis vectors: i = <1,0,0>, j = <0,1,0>, k = <0,0,1>. ✓',
  'ch05p2_vector_magnitude',
  'formula_recall',
  ['magnitude', 'norm', 'length', 'unit vector', 'sqrt']
)

add(
  'What are the operations on vectors?',
  'Vector operations: (1) Addition: <a1,a2,a3> + <b1,b2,b3> = <a1+b1, a2+b2, a3+b3> (component-wise). Geometrically tip-to-tail or parallelogram. (2) Subtraction: u - v = u + (-v). (3) Scalar multiplication: c<u1,u2> = <cu1, cu2>. (4) Properties: u+v = v+u (commutative), (u+v)+w = u+(v+w) (associative), u + 0 = u, u + (-u) = 0, c(u+v) = cu + cv (distributive). Example: <1,2,3> + <4,0,-1> = <5, 2, 2>. 3·<2,-1> = <6,-3>. ✓',
  'ch05p2_vector_operations',
  'formula_recall',
  ['addition', 'subtraction', 'scalar multiplication', 'properties', 'vectors']
)

add(
  'What are the standard basis vectors?',
  'Standard basis vectors in 3D: i = <1,0,0>, j = <0,1,0>, k = <0,0,1>. Any vector v = <v1,v2,v3> = v1·i + v2·j + v3·k. These are unit vectors along x, y, z axes. In 2D only i, j. Example: <3, -4, 2> = 3i - 4j + 2k. Properties: |i| = |j| = |k| = 1, i·j = j·k = i·k = 0 (orthogonal). Useful for expressing forces, velocities. Example: Force F = 2i + 3j - k. ✓',
  'ch05p2_standard_basis',
  'formula_recall',
  ['standard basis', 'i j k', 'unit vectors', 'axes', 'components']
)

add(
  'How do you find a unit vector in a given direction?',
  'To find unit vector in direction of v (v != 0): u = v / |v|. Example: Find unit vector along <6, 8>. |v| = 10. u = <6/10, 8/10> = <3/5, 4/5>. Example: Find unit vector from A(1,1) to B(4,5). AB = <3,4>, |AB| = 5. u = <3/5, 4/5>. To find a vector of length L in direction of v: L·(v/|v|). Example: vector of length 7 along <3,4>: 7·<3/5,4/5> = <21/5, 28/5>. ✓',
  'ch05p2_unit_vector_direction',
  'problem_solving',
  ['unit vector', 'direction', 'normalize', 'length L', 'magnitude']
)

// ============================================================
// SECTION 2 — DOT PRODUCT (5 items)
// ============================================================
add(
  'What is the dot product of two vectors?',
  'Dot product (scalar product, inner product): For u = <u1,u2,u3>, v = <v1,v2,v3>: u·v = u1v1 + u2v2 + u3v3 (a scalar). Also u·v = |u||v|cos(theta) where theta is the angle between u and v (0 <= theta <= pi). Example: <1,2,3>·<4,-5,1> = 4 - 10 + 3 = -3. Properties: commutative (u·v = v·u), distributive (u·(v+w) = u·v + u·w), u·u = |u|^2, 0·u = 0. ✓',
  'ch05p2_dot_product',
  'formula_recall',
  ['dot product', 'scalar product', 'inner product', 'components', 'formula']
)

add(
  'How do you find the angle between two vectors using the dot product?',
  'Angle between vectors: cos(theta) = (u·v)/(|u||v|), so theta = arccos((u·v)/(|u||v|)). Example: angle between <1,1,0> and <0,1,1>. u·v = 0+1+0 = 1. |u| = sqrt(2), |v| = sqrt(2). cos(theta) = 1/2. theta = 60 deg = pi/3. Vectors are: perpendicular (orthogonal) if u·v = 0 (theta = pi/2). Parallel same direction if u·v = |u||v| (theta = 0). Opposite if u·v = -|u||v| (theta = pi). ✓',
  'ch05p2_angle_between_vectors',
  'problem_solving',
  ['angle', 'dot product', 'cos theta', 'arccos', 'orthogonal']
)

add(
  'What are scalar and vector projections?',
  'Scalar projection of u onto v (component of u along v): comp_v(u) = (u·v)/|v|. Vector projection of u onto v: proj_v(u) = ((u·v)/(v·v))·v = ((u·v)/|v|^2)·v. Example: u = <3,4>, v = <1,0>. comp = 3/1 = 3. proj = 3·<1,0> = <3,0> (projection of (3,4) onto x-axis). Example: u = <1,2,3>, v = <1,1,1>. u·v = 6, v·v = 3. proj_v(u) = (6/3)<1,1,1> = <2,2,2>. ✓',
  'ch05p2_projections',
  'formula_recall',
  ['scalar projection', 'vector projection', 'component', 'proj', 'onto']
)

add(
  'How do you decompose a vector into parallel and perpendicular components?',
  'Decomposition: u = u_parallel + u_perp where u_parallel = proj_v(u) = ((u·v)/(v·v))v (parallel to v), u_perp = u - u_parallel (perpendicular to v, so u_perp·v = 0). Example: u = <1,2,3>, v = <1,1,1>. u_parallel = (6/3)<1,1,1> = <2,2,2>. u_perp = <1,2,3> - <2,2,2> = <-1,0,1>. Check: u_perp·v = -1+0+1 = 0. ✓. Useful for physics (force into parallel/perpendicular to surface). ✓',
  'ch05p2_vector_decomposition',
  'problem_solving',
  ['decomposition', 'parallel', 'perpendicular', 'projection', 'orthogonal']
)

add(
  'What is the Cauchy-Schwarz inequality?',
  'Cauchy-Schwarz inequality: |u·v| <= |u|·|v|, with equality iff u and v are parallel (one is scalar multiple of other). Proof: from u·v = |u||v|cos(theta), |cos(theta)| <= 1. Example: |<1,2>·<3,4>| = |3+8| = 11 <= sqrt(5)·sqrt(25) = 5sqrt(5) ~ 11.18. Triangle inequality follows: |u+v| <= |u| + |v|. Proof: |u+v|^2 = (u+v)·(u+v) = |u|^2 + 2u·v + |v|^2 <= |u|^2 + 2|u||v| + |v|^2 = (|u|+|v|)^2. ✓',
  'ch05p2_cauchy_schwarz',
  'formula_recall',
  ['Cauchy-Schwarz', 'inequality', 'dot product', 'triangle inequality', 'parallel']
)

// ============================================================
// SECTION 3 — CROSS PRODUCT (5 items)
// ============================================================
add(
  'What is the cross product of two vectors?',
  'Cross product (vector product): u x v for u = <u1,u2,u3>, v = <v1,v2,v3> = determinant |i j k; u1 u2 u3; v1 v2 v3| = <u2v3 - u3v2, u3v1 - u1v3, u1v2 - u2v1>. Result is a vector perpendicular to both u and v (right-hand rule). Magnitude: |u x v| = |u||v|sin(theta). Example: <1,0,0> x <0,1,0> = <0,0,1> (i x j = k). Example: <2,1,0> x <1,3,0> = <0·0-0·3, 0·1-2·0, 2·3-1·1> = <0, 0, 5>. ✓',
  'ch05p2_cross_product',
  'formula_recall',
  ['cross product', 'vector product', 'determinant', 'perpendicular', 'right-hand rule']
)

add(
  'What are the properties of the cross product?',
  'Cross product properties: (1) u x v = -(v x u) (anti-commutative). (2) u x (v + w) = (u x v) + (u x w) (distributive). (3) (cu) x v = c(u x v). (4) u x 0 = 0. (5) u x u = 0 (parallel vectors cross to 0). (6) |u x v|^2 = |u|^2|v|^2 - (u·v)^2 (Lagrange identity). (7) u x v perpendicular to both u and v. (8) Right-hand rule: fingers curl u to v, thumb points u x v. Standard: i x j = k, j x k = i, k x i = j, and reverse gives negative. ✓',
  'ch05p2_cross_product_properties',
  'formula_recall',
  ['properties', 'cross product', 'anti-commutative', 'distributive', 'right-hand rule']
)

add(
  'How do you find the area of a parallelogram using the cross product?',
  'Area of parallelogram with sides u and v: A = |u x v| = |u||v|sin(theta). Area of triangle with vertices A, B, C: A = (1/2)|AB x AC|. Example: Triangle A(0,0,0), B(1,0,0), C(0,1,0). AB = <1,0,0>, AC = <0,1,0>. AB x AC = <0,0,1>. |AB x AC| = 1. Area = 1/2. Example: Parallelogram with sides <2,1,0>, <1,3,0>: cross = <0,0,5>, area = 5. ✓',
  'ch05p2_cross_product_area',
  'problem_solving',
  ['area', 'parallelogram', 'triangle', 'cross product', 'magnitude']
)

add(
  'How do you find the volume of a parallelepiped using the scalar triple product?',
  'Volume of parallelepiped with edges u, v, w: V = |u·(v x w)| (scalar triple product). This is the absolute value of the determinant of the 3x3 matrix with rows (or columns) u, v, w. Sign of u·(v x w) tells orientation: positive = right-handed, negative = left-handed. Volume of tetrahedron: V = (1/6)|u·(v x w)|. Example: u=<1,0,0>, v=<0,1,0>, w=<0,0,1>. v x w = <1,0,0>. u·(v x w) = 1. Volume of unit cube = 1. ✓',
  'ch05p2_scalar_triple_product',
  'formula_recall',
  ['scalar triple product', 'volume', 'parallelepiped', 'tetrahedron', 'determinant']
)

add(
  'How do you find the torque using the cross product?',
  'Torque (moment of force): tau = r x F, where r is the position vector from pivot to point of force application, F is the force. |tau| = |r||F|sin(theta) where theta is angle between r and F. Direction: perpendicular to r and F (right-hand rule). Example: Force F = <0, 0, -10> N applied at r = <2, 0, 0> m from pivot. tau = r x F = <2,0,0> x <0,0,-10> = <0·(-10) - 0·0, 0·0 - 2·(-10), 2·0 - 0·0> = <0, 20, 0> N·m. The torque is 20 N·m in +y direction. ✓',
  'ch05p2_torque_cross_product',
  'problem_solving',
  ['torque', 'moment', 'force', 'cross product', 'physics']
)

// ============================================================
// SECTION 4 — LINES AND PLANES IN 3D (6 items)
// ============================================================
add(
  'What is the vector equation of a line in 3D?',
  'Vector equation of a line through point P0(x0,y0,z0) with direction vector v = <a,b,c>: r(t) = r0 + t·v, i.e., <x,y,z> = <x0,y0,z0> + t<a,b,c>. Parametric equations: x = x0 + at, y = y0 + bt, z = z0 + ct. Symmetric equations (eliminating t): (x-x0)/a = (y-y0)/b = (z-z0)/c (if a,b,c all nonzero). Example: Line through (1,2,3) with direction <2,-1,4>: <x,y,z> = <1,2,3> + t<2,-1,4>. Parametric: x=1+2t, y=2-t, z=3+4t. Symmetric: (x-1)/2 = (y-2)/(-1) = (z-3)/4. ✓',
  'ch05p2_line_equation',
  'formula_recall',
  ['line', 'vector equation', 'parametric', 'symmetric', 'direction vector']
)

add(
  'How do you determine if two lines in 3D are parallel, intersecting, or skew?',
  'Two lines in 3D: (1) Parallel if direction vectors are scalar multiples. (2) Intersecting if system of parametric equations has a solution. (3) Skew if neither parallel nor intersecting (only in 3D+). Example: L1: <1,2,3> + t<2,1,1>, L2: <3,5,5> + s<-1,1,1>. Direction <2,1,1> and <-1,1,1> not parallel. Set equal: 1+2t = 3-s, 2+t = 5+s, 3+t = 5+s. From 2nd and 3rd: t-s=3 and t-s=2 — contradiction. So skew. If consistent system, intersecting (find t, s, then point). ✓',
  'ch05p2_lines_parallel_intersecting_skew',
  'problem_solving',
  ['lines', 'parallel', 'intersecting', 'skew', '3D']
)

add(
  'What is the equation of a plane in 3D?',
  'Plane with normal vector n = <a,b,c> through point P0(x0,y0,z0): a(x-x0) + b(y-y0) + c(z-z0) = 0. Expanded: ax + by + cz + d = 0 where d = -(ax0 + by0 + cz0). Normal vector is perpendicular to every vector in the plane. Example: Plane through (1,2,3) with normal <2,-1,4>: 2(x-1) - (y-2) + 4(z-3) = 0, i.e., 2x - y + 4z - 12 = 0. Plane through 3 points P1, P2, P3: normal n = (P2-P1) x (P3-P1), then use point-normal form. ✓',
  'ch05p2_plane_equation',
  'formula_recall',
  ['plane', 'normal vector', 'point-normal', 'equation', 'perpendicular']
)

add(
  'How do you find the distance from a point to a plane?',
  'Distance from point P1(x1,y1,z1) to plane ax + by + cz + d = 0: D = |ax1 + by1 + cz1 + d|/sqrt(a^2 + b^2 + c^2). Example: Distance from (1,2,3) to plane 2x - y + 2z - 4 = 0. D = |2(1) - 1(2) + 2(3) - 4|/sqrt(4+1+4) = |2-2+6-4|/3 = 2/3. Derivation: project (P1 - P0) onto normal unit vector n/|n|. ✓',
  'ch05p2_point_to_plane_distance',
  'problem_solving',
  ['distance', 'point', 'plane', 'normal', 'formula']
)

add(
  'How do you find the distance from a point to a line in 3D?',
  'Distance from point P to line L through Q with direction v: D = |PQ x v|/|v|. Derivation: |PQ x v| = |PQ||v|sin(theta), so D = |PQ|sin(theta) = perpendicular distance. Example: Point P(1,0,0), line through Q(0,0,0) with direction v = <1,1,1>. PQ = <1,0,0>. PQ x v = <0·1 - 0·1, 0·1 - 1·1, 1·1 - 0·1> = <0, -1, 1>. |PQ x v| = sqrt(2). |v| = sqrt(3). D = sqrt(2)/sqrt(3) = sqrt(6)/3 ~ 0.816. ✓',
  'ch05p2_point_to_line_distance',
  'problem_solving',
  ['distance', 'point', 'line', '3D', 'cross product']
)

add(
  'How do you find the angle between two planes?',
  'Angle between two planes = angle between their normal vectors (or supplement if obtuse chosen). For planes with normals n1, n2: cos(theta) = (n1·n2)/(|n1||n2|). The acute angle is taken. Planes are parallel if n1 || n2 (scalar multiples). Perpendicular if n1·n2 = 0. Example: Planes x + y + z = 1 and x - y + z = 2. Normals n1 = <1,1,1>, n2 = <1,-1,1>. cos(theta) = (1-1+1)/(sqrt(3)·sqrt(3)) = 1/3. theta = arccos(1/3) ~ 70.5 deg. ✓',
  'ch05p2_angle_between_planes',
  'problem_solving',
  ['angle', 'planes', 'normal vectors', 'cos theta', 'parallel perpendicular']
)

// ============================================================
// SECTION 5 — QUADRIC SURFACES (4 items)
// ============================================================
add(
  'What are the standard equations of quadric surfaces?',
  'Quadric surfaces (degree-2 in 3D): (1) Ellipsoid: x^2/a^2 + y^2/b^2 + z^2/c^2 = 1. (2) Hyperboloid of one sheet: x^2/a^2 + y^2/b^2 - z^2/c^2 = 1. (3) Hyperboloid of two sheets: x^2/a^2 + y^2/b^2 - z^2/c^2 = -1. (4) Elliptic cone: x^2/a^2 + y^2/b^2 = z^2/c^2. (5) Elliptic paraboloid: z = x^2/a^2 + y^2/b^2 (bowl). (6) Hyperbolic paraboloid: z = x^2/a^2 - y^2/b^2 (saddle). (7) Elliptic cylinder: x^2/a^2 + y^2/b^2 = 1. To identify: complete squares, match form, check signs. ✓',
  'ch05p2_quadric_surfaces',
  'formula_recall',
  ['quadric surfaces', 'ellipsoid', 'hyperboloid', 'paraboloid', 'cone', 'cylinder']
)

add(
  'How do you identify an ellipsoid and its properties?',
  'Ellipsoid: x^2/a^2 + y^2/b^2 + z^2/c^2 = 1. Semi-axes: a, b, c along x, y, z axes. Volume: V = (4/3)pi·abc. If a = b = c = r: sphere of radius r. Cross sections perpendicular to axes are ellipses (or circles). Example: x^2/4 + y^2/9 + z^2/16 = 1 has semi-axes 2, 3, 4. Volume = (4/3)pi(2)(3)(4) = 32pi. Trace in z=0 plane: x^2/4 + y^2/9 = 1 (ellipse). ✓',
  'ch05p2_ellipsoid',
  'formula_recall',
  ['ellipsoid', 'semi-axes', 'volume', 'sphere', 'cross section']
)

add(
  'How do you identify a paraboloid?',
  'Elliptic paraboloid: z = x^2/a^2 + y^2/b^2 (circular if a=b). Opens upward along z-axis. Cross sections: z=const gives ellipse; x=0 or y=0 gives parabola. Used for satellite dishes, headlights (parabolic reflectors). Hyperbolic paraboloid: z = x^2/a^2 - y^2/b^2 (saddle/pringle shape). Cross sections: x=const gives downward parabola, y=const gives upward parabola, z=const gives hyperbola. Example: z = x^2 + y^2 (circular paraboloid, bowl opening up). At z=4: x^2+y^2=4 (circle radius 2). ✓',
  'ch05p2_paraboloid',
  'formula_recall',
  ['paraboloid', 'elliptic', 'hyperbolic', 'saddle', 'bowl']
)

add(
  'How do you identify cylinders?',
  'Cylinder: surface generated by a line moving along a curve, parallel to a fixed direction. In 3D equations missing one variable, that variable is the direction. (1) Circular cylinder: x^2 + y^2 = r^2 (axis along z, radius r). (2) Elliptic cylinder: x^2/a^2 + y^2/b^2 = 1. (3) Parabolic cylinder: y = x^2 (extending along z). (4) Hyperbolic cylinder: x^2 - y^2 = 1. Example: y = z^2 is a parabolic cylinder extending along x-axis (missing x). All traces x = const give same parabola y = z^2. ✓',
  'ch05p2_cylinders',
  'formula_recall',
  ['cylinder', 'circular', 'elliptic', 'parabolic', 'hyperbolic', 'missing variable']
)

// ============================================================
// SECTION 6 — VECTOR-VALUED FUNCTIONS (5 items)
// ============================================================
add(
  'What is a vector-valued function?',
  'Vector-valued function: r(t) = <f(t), g(t), h(t)> = f(t)i + g(t)j + h(t)k. For each t in domain, r(t) is a vector. Often traces a space curve as t varies. Example: r(t) = <cos t, sin t, t> traces a helix (spiral going up z-axis). Example: r(t) = <t, t^2, t^3> traces a twisted cubic. Domain of r is intersection of domains of f, g, h. Limit: lim r(t) = <lim f, lim g, lim h> (if all exist). ✓',
  'ch05p2_vvf_definition',
  'formula_recall',
  ['vector-valued function', 'space curve', 'components', 'helix', 'limit']
)

add(
  'How do you find the limit and continuity of a vector-valued function?',
  'Limit: lim(t->a) r(t) = <lim f(t), lim g(t), lim h(t)> (component-wise, if all exist). Continuity: r is continuous at t=a if lim(t->a) r(t) = r(a) (i.e., each component continuous). Example: r(t) = <(t^2-1)/(t-1), sin(t), e^t>. At t=1: lim = <2, sin(1), e> but r(1) undefined (first comp 0/0). Domain: t != 1. If we redefine r(1) = <2, sin(1), e>, becomes continuous. ✓',
  'ch05p2_vvf_limit_continuity',
  'formula_recall',
  ['limit', 'continuity', 'vector-valued', 'component-wise', 'domain']
)

add(
  'How do you find the derivative of a vector-valued function?',
  'Derivative of r(t) = <f, g, h>: r\'(t) = <f\'(t), g\'(t), h\'(t)>. Geometrically: tangent vector to the curve at point r(t), pointing in direction of increasing t. r\'(t) exists iff each component differentiable. Unit tangent: T(t) = r\'(t)/|r\'(t)|. Example: r(t) = <cos t, sin t, t>. r\'(t) = <-sin t, cos t, 1>. At t=0: r\'(0) = <0, 1, 1>. |r\'(0)| = sqrt(2). T(0) = <0, 1/sqrt(2), 1/sqrt(2)>. ✓',
  'ch05p2_vvf_derivative',
  'formula_recall',
  ['derivative', 'vector-valued', 'tangent vector', 'unit tangent', 'differentiation']
)

add(
  'What are the differentiation rules for vector-valued functions?',
  'Differentiation rules for VVF: (1) (u + v)\' = u\' + v\'. (2) (c·u)\' = c·u\'. (3) (f·u)\' = f\'·u + f·u\' (scalar product). (4) (u·v)\' = u\'·v + u·v\' (dot product). (5) (u x v)\' = u\' x v + u x v\' (cross product, ORDER MATTERS). (6) (u(f(t)))\' = f\'(t)·u\'(f(t)) (chain rule). Example: r(t) = <t, t^2, t^3>, F(t) = r(t)·r(t) = t^2 + t^4 + t^6. F\' = 2t + 4t^3 + 6t^5 = r\'·r + r·r\' = 2r\'·r. r\' = <1,2t,3t^2>. r\'·r = t + 2t^3 + 3t^5. 2r\'·r = 2t + 4t^3 + 6t^5. ✓',
  'ch05p2_vvf_differentiation_rules',
  'formula_recall',
  ['differentiation rules', 'sum', 'product rule', 'cross product', 'chain rule', 'VVF']
)

add(
  'How do you find the integral of a vector-valued function?',
  'Integral of r(t) = <f, g, h>: integral r(t) dt = <integral f dt, integral g dt, integral h dt> = <F + C1, G + C2, H + C3> where F\'=f, etc. C is a constant vector <C1, C2, C3>. Definite integral: integral_a^b r(t) dt = <integral_a^b f, integral_a^b g, integral_a^b h>. Example: r(t) = <2t, 3t^2, 4>. integral r dt = <t^2 + C1, t^3 + C2, 4t + C3>. To find r given r\'(t) and r(t0): integrate and use initial condition. Example: r\'(t) = <1, 2t, 3t^2>, r(0) = <1,0,0>. r(t) = <t + 1, t^2, t^3>. ✓',
  'ch05p2_vvf_integral',
  'formula_recall',
  ['integral', 'vector-valued', 'antiderivative', 'constant vector', 'definite']
)

// ============================================================
// SECTION 7 — CALCULUS OF VECTOR-VALUED FUNCTIONS (5 items)
// ============================================================
add(
  'How do you find the arc length of a space curve?',
  'Arc length of space curve r(t) = <x(t), y(t), z(t)> from t=a to t=b: L = integral_a^b |r\'(t)| dt = integral_a^b sqrt(x\'^2 + y\'^2 + z\'^2) dt. Example: r(t) = <cos t, sin t, t>, t in [0, 2pi] (helix). r\' = <-sin, cos, 1>. |r\'| = sqrt(sin^2+cos^2+1) = sqrt(2). L = sqrt(2)·2pi = 2sqrt(2)pi. (One full turn of helix.) Arc length parametrization: s(t) = integral_0^t |r\'| du. ✓',
  'ch05p2_arc_length_space_curve',
  'formula_recall',
  ['arc length', 'space curve', 'magnitude', 'derivative', 'integral']
)

add(
  'What is the curvature of a curve?',
  'Curvature kappa = |dT/ds| where T is unit tangent and s is arc length. Formulas: kappa(t) = |T\'(t)|/|r\'(t)| = |r\'(t) x r\'\'(t)|/|r\'(t)|^3. For y = f(x) (plane curve): kappa = |f\'\'|/(1 + (f\')^2)^(3/2). Curvature is rate of change of tangent direction per unit arc length. Circle of radius r has constant curvature 1/r. Straight line has curvature 0. Example: r = <cos t, sin t> (unit circle). kappa = 1. r = <3cos t, 3sin t>: kappa = 1/3. ✓',
  'ch05p2_curvature',
  'formula_recall',
  ['curvature', 'kappa', 'unit tangent', 'arc length', 'circle radius']
)

add(
  'What are the principal unit normal and binormal vectors?',
  'Principal unit normal: N(t) = T\'(t)/|T\'(t)| (perpendicular to T, points toward concave side). Binormal: B(t) = T(t) x N(t) (perpendicular to both). These form the Frenet frame {T, N, B}, an orthonormal basis at each point. For 2D curve, B is constant (out of plane). Example: r = <cos t, sin t, 0>. T = <-sin, cos, 0>. T\' = <-cos, -sin, 0>, |T\'| = 1. N = <-cos, -sin, 0> (points inward to center). B = T x N = <0, 0, 1> (out of page). ✓',
  'ch05p2_normal_binormal',
  'formula_recall',
  ['principal normal', 'binormal', 'Frenet frame', 'orthonormal', 'TNB']
)

add(
  'What are the normal and osculating planes?',
  'Normal plane at point P on curve: plane perpendicular to T (tangent), so contains N and B. Equation: (r - r(t0))·T(t0) = 0. Osculating plane: plane containing T and N (perpendicular to B). Equation: (r - r(t0))·B(t0) = 0. Osculating circle (circle of curvature): circle in osculating plane with radius 1/kappa (radius of curvature), centered at r + (1/kappa)N. Example: For helix r = <cos t, sin t, t>, osculating circle has radius sqrt(2) at every point. ✓',
  'ch05p2_normal_osculating_plane',
  'formula_recall',
  ['normal plane', 'osculating plane', 'osculating circle', 'radius of curvature', 'TNB']
)

add(
  'What are tangential and normal components of acceleration?',
  'Acceleration decomposition: a = a_T·T + a_N·N where a_T = v\'(t) (rate of change of speed) = (v·a)/|v|, a_N = kappa·v^2 = |v x a|/|v|. a_T: tangential component (speeding up/slowing down). a_N: normal/centripetal component (direction change). Example: r = <cos t, sin t, 0> (unit circle, speed 1). v = <-sin, cos, 0>, a = <-cos, -sin, 0>. v·a = 0, so a_T = 0. |v x a| = 1, |v| = 1, so a_N = 1. So a = N (all centripetal). ✓',
  'ch05p2_tangential_normal_acceleration',
  'formula_recall',
  ['tangential', 'normal', 'centripetal', 'acceleration', 'decomposition']
)

// ============================================================
// SECTION 8 — MOTION IN SPACE (4 items)
// ============================================================
add(
  'How do you describe the motion of a particle in space?',
  'Position: r(t) = <x(t), y(t), z(t)>. Velocity: v(t) = r\'(t) = <x\', y\', z\'>. Speed: |v(t)|. Acceleration: a(t) = v\'(t) = r\'\'(t) = <x\'\', y\'\', z\'\'>. Given a(t) and initial position r(0) = r0 and velocity v(0) = v0: integrate twice. v(t) = v0 + integral_0^t a(u) du. r(t) = r0 + integral_0^t v(u) du. Example: Projectile motion. a = <0, 0, -g> (gravity in -z). v(t) = <v0x, v0y, v0z - gt>. r(t) = <v0x·t, v0y·t, v0z·t - (1/2)gt^2>. ✓',
  'ch05p2_motion_space',
  'problem_solving',
  ['motion', 'position', 'velocity', 'acceleration', 'particle', 'integrate']
)

add(
  'How do you analyze projectile motion?',
  'Projectile motion (no air resistance, gravity g): r(t) = <v0 cos(theta)·t, v0 sin(theta)·t - (1/2)gt^2> (in 2D, theta = launch angle from horizontal). Max height: t = v0 sin(theta)/g, H = (v0 sin(theta))^2/(2g). Time of flight: T = 2v0 sin(theta)/g. Range: R = v0^2 sin(2theta)/g. Max range at theta = 45 deg. Example: v0 = 20 m/s, theta = 30 deg, g = 9.8. R = 400·sin(60)/9.8 = 400·0.866/9.8 = 35.4 m. H = (20·0.5)^2/(2·9.8) = 100/19.6 = 5.1 m. ✓',
  'ch05p2_projectile_motion',
  'problem_solving',
  ['projectile', 'range', 'max height', 'flight time', 'launch angle']
)

add(
  'How do you find the speed and distance traveled by a particle?',
  'Speed: |v(t)| = |r\'(t)| = sqrt(x\'^2 + y\'^2 + z\'^2). Distance traveled from t=a to t=b: D = integral_a^b |v(t)| dt = integral_a^b |r\'(t)| dt. Displacement: r(b) - r(a) (vector, straight-line from start to end). Note: distance >= |displacement|. Example: r(t) = <cos t, sin t>, t in [0, 2pi]. Speed = 1 (constant). Distance = 2pi (circumference). Displacement = <1,0> - <1,0> = 0 (back to start). ✓',
  'ch05p2_speed_distance',
  'problem_solving',
  ['speed', 'distance', 'displacement', 'velocity magnitude', 'arc length']
)

add(
  'How do you solve initial value problems for vector functions?',
  'IVP for vector functions: given a(t), r(t0) = r0, v(t0) = v0. Find r(t). Steps: (1) v(t) = v0 + integral_t0^t a(u) du. (2) r(t) = r0 + integral_t0^t v(u) du. Example: a(t) = <0, -g, 0> (2D free fall), r(0) = <0, 0>, v(0) = <10, 20>. v(t) = <10, 20 - gt>. r(t) = <10t, 20t - (1/2)gt^2>. At t=2 (g=9.8): r(2) = <20, 40 - 19.6> = <20, 20.4>. ✓',
  'ch05p2_ivp_vector',
  'problem_solving',
  ['initial value', 'IVP', 'integrate', 'acceleration', 'vector function']
)

// ============================================================
// SECTION 9 — FUNCTIONS OF SEVERAL VARIABLES (4 items)
// ============================================================
add(
  'What is a function of several variables?',
  'Function of two variables: z = f(x, y) maps (x, y) in domain D (subset of R^2) to a real number z. Domain: set of (x, y) where f is defined. Graph: surface in 3D (set of points (x, y, f(x, y))). Level curves: f(x, y) = c (curves in xy-plane, like topographic map). Example: f(x, y) = sqrt(9 - x^2 - y^2). Domain: 9 - x^2 - y^2 >= 0, i.e., x^2 + y^2 <= 9 (disk radius 3). Graph: upper hemisphere. Level curve f = 2: sqrt(9 - x^2 - y^2) = 2, x^2 + y^2 = 5 (circle radius sqrt(5)). ✓',
  'ch05p2_function_several_variables',
  'formula_recall',
  ['function', 'two variables', 'domain', 'graph', 'level curves', 'surface']
)

add(
  'How do you find the domain and range of a function of two variables?',
  'Domain: set of (x, y) where f is defined (real-valued). Range: set of all output values. Example: f(x, y) = ln(x^2 + y^2). Domain: x^2 + y^2 > 0 (not origin) — actually x^2 + y^2 > 0 means (x, y) != (0, 0). Range: all real numbers (ln takes all real values). Example: f(x, y) = 1/sqrt(1 - x^2 - y^2). Domain: 1 - x^2 - y^2 > 0, x^2 + y^2 < 1 (inside unit circle). Range: [1, inf) (when x^2+y^2 in [0,1), 1/sqrt(...) in [1, inf)). ✓',
  'ch05p2_domain_range',
  'problem_solving',
  ['domain', 'range', 'two variables', 'square root', 'logarithm']
)

add(
  'What are level curves and how do you sketch them?',
  'Level curves: f(x, y) = c for various constants c. Plot in xy-plane. Spacing of c values indicates steepness (close = steep, far = flat). Example: f(x, y) = x^2 + y^2 (paraboloid). Level curves: x^2 + y^2 = c, circles of radius sqrt(c). c=1, 4, 9 give circles radius 1, 2, 3. Example: f(x, y) = x - y. Level: x - y = c, lines with slope 1, y-intercept -c. Used in weather maps (isobars, isotherms), elevation (contours). ✓',
  'ch05p2_level_curves',
  'formula_recall',
  ['level curves', 'contour', 'f(x,y) = c', 'topographic', 'sketch']
)

add(
  'What are limits and continuity for functions of two variables?',
  'Limit: lim_(x,y)->(a,b) f(x,y) = L means f(x,y) close to L whenever (x,y) close to (a,b) (any path). Continuity: f continuous at (a,b) if lim = f(a,b). Path test: if two different paths give different limits, limit doesn\'t exist. Example: f(x,y) = xy/(x^2+y^2) at (0,0). Path y=0: f = 0/x^2 = 0. Path x=y: f = x^2/(2x^2) = 1/2. Different limits => DNE. Polynomials, rational (where defined), trig, exp, log of continuous are continuous. ✓',
  'ch05p2_limits_continuity_2var',
  'formula_recall',
  ['limit', 'continuity', 'two variables', 'path test', 'different paths']
)

// ============================================================
// SECTION 10 — PARTIAL DERIVATIVES (5 items)
// ============================================================
add(
  'What is a partial derivative?',
  'Partial derivative of f(x, y) w.r.t. x: f_x = df/dx holding y constant. Definition: f_x(x0, y0) = lim(h->0) [f(x0+h, y0) - f(x0, y0)]/h. Similarly f_y = df/dy holding x constant. Notation: f_x, df/dx, partial f/partial x, D_x f. Example: f(x,y) = x^2 y + sin(xy). f_x = 2xy + y·cos(xy). f_y = x^2 + x·cos(xy). Geometrically: f_x is slope of curve where plane y = y0 cuts the surface z = f(x,y). ✓',
  'ch05p2_partial_derivative',
  'formula_recall',
  ['partial derivative', 'holding constant', 'f_x f_y', 'slope', 'definition']
)

add(
  'How do you compute second-order partial derivatives?',
  'Second-order partials: f_xx = d^2 f/dx^2, f_yy = d^2 f/dy^2, f_xy = d/dy(f_x), f_yx = d/dx(f_y). f_xy and f_yx are mixed partials. Clairaut\'s Theorem: if f_xy and f_yx are continuous on open disk, then f_xy = f_yx. Example: f = x^2 y^3. f_x = 2xy^3, f_xx = 2y^3, f_xy = 6xy^2. f_y = 3x^2 y^2, f_yy = 6x^2 y, f_yx = 6xy^2. Confirms f_xy = f_yx = 6xy^2. ✓',
  'ch05p2_second_partial',
  'formula_recall',
  ['second order', 'partial derivative', 'mixed partials', 'Clairaut', 'f_xx f_xy']
)

add(
  'How do you use the Chain Rule for partial derivatives?',
  'Chain Rule cases: (1) z = f(x, y), x = g(t), y = h(t): dz/dt = f_x·g\' + f_y·h\' = (partial f/partial x)(dx/dt) + (partial f/partial y)(dy/dt). (2) z = f(x, y), x = g(s, t), y = h(s, t): partial z/partial s = f_x·(partial x/partial s) + f_y·(partial y/partial s), similar for t. Example: z = x^2 y, x = sin t, y = e^t. dz/dt = 2xy·cos t + x^2·e^t = 2 sin(t) e^t cos(t) + sin^2(t) e^t. ✓',
  'ch05p2_chain_rule_partial',
  'formula_recall',
  ['chain rule', 'partial derivative', 'composite', 'multi-variable', 'tree diagram']
)

add(
  'How do you do implicit differentiation with partial derivatives?',
  'Implicit differentiation: If F(x, y, z) = 0 defines z = z(x, y), then partial z/partial x = -F_x/F_z, partial z/partial y = -F_y/F_z (provided F_z != 0). Example: F(x,y,z) = x^2 + y^2 + z^2 - 9 = 0 (sphere). F_x = 2x, F_y = 2y, F_z = 2z. partial z/partial x = -2x/(2z) = -x/z. partial z/partial y = -y/z. At (1, 2, 2) on sphere: partial z/partial x = -1/2, partial z/partial y = -1. ✓',
  'ch05p2_implicit_partial',
  'problem_solving',
  ['implicit differentiation', 'partial', 'F(x,y,z) = 0', 'F_x F_z', 'chain rule']
)

add(
  'What is the Laplacian and other higher partial derivative operators?',
  'Laplacian: Delta f = nabla^2 f = f_xx + f_yy (2D) or f_xx + f_yy + f_zz (3D). Used in heat equation, wave equation, Laplace\'s equation (Delta f = 0, harmonic functions). Other operators: (1) Gradient: nabla f = <f_x, f_y, f_z>. (2) Divergence of vector field F = <P, Q, R>: div F = P_x + Q_y + R_z. (3) Curl: curl F = nabla x F = <R_y - Q_z, P_z - R_x, Q_x - P_y>. Example: f = x^2 + y^2. Laplacian = 2 + 2 = 4. ✓',
  'ch05p2_laplacian_operators',
  'formula_recall',
  ['Laplacian', 'gradient', 'divergence', 'curl', 'nabla', 'operator']
)

// ============================================================
// SECTION 11 — DIRECTIONAL DERIVATIVES & GRADIENT (5 items)
// ============================================================
add(
  'What is the directional derivative?',
  'Directional derivative of f at (x0, y0) in direction of unit vector u = <a, b>: D_u f = f_x·a + f_y·b = grad(f)·u. Rate of change of f moving in direction u. Note: u must be unit vector. If direction given as v (not unit), use u = v/|v|. Example: f(x, y) = x^2 + y^2, find D_u f at (1, 2) in direction <3, 4>. |v| = 5, u = <3/5, 4/5>. grad f = <2x, 2y> = <2, 4> at (1,2). D_u = 2·(3/5) + 4·(4/5) = 6/5 + 16/5 = 22/5 = 4.4. ✓',
  'ch05p2_directional_derivative',
  'formula_recall',
  ['directional derivative', 'unit vector', 'gradient', 'rate of change', 'direction']
)

add(
  'What is the gradient of a function?',
  'Gradient of f(x, y, z): grad(f) = nabla f = <f_x, f_y, f_z>. Points in direction of maximum rate of increase of f. |grad f| = maximum rate of increase. Directional derivative: D_u f = grad(f)·u (so D_u f maximized when u = grad f/|grad f|, giving D_u f = |grad f|). At minimum when u = -grad f/|grad f|, giving -|grad f|. Example: f = x^2 + y^2. grad f = <2x, 2y>. At (1, 2): <2, 4>. Max rate of increase = sqrt(4+16) = sqrt(20) = 2sqrt(5), in direction <1/sqrt(5), 2/sqrt(5)>. ✓',
  'ch05p2_gradient',
  'formula_recall',
  ['gradient', 'nabla', 'max rate of increase', 'direction', 'magnitude']
)

add(
  'What are the properties of the gradient?',
  'Gradient properties: (1) grad(f + g) = grad f + grad g. (2) grad(cf) = c·grad f. (3) grad(fg) = f·grad g + g·grad f. (4) grad(f/g) = (g·grad f - f·grad g)/g^2. (5) Chain rule: grad(f(g)) = f\'(g)·grad g. (6) grad f points in direction of steepest ascent; -grad f steepest descent. (7) grad f is perpendicular to level curves (2D) or level surfaces (3D). Example: f = x^2 + y^2, level curve x^2 + y^2 = 4. grad f = <2x, 2y>. At (sqrt(2), sqrt(2)): <2sqrt(2), 2sqrt(2)>. Tangent to circle at (sqrt2, sqrt2) is perpendicular to radius, which is grad direction. ✓',
  'ch05p2_gradient_properties',
  'formula_recall',
  ['gradient', 'properties', 'perpendicular', 'level curves', 'steepest ascent']
)

add(
  'How do you find the tangent plane to a level surface?',
  'Tangent plane to surface F(x, y, z) = c at point P0(x0, y0, z0): F_x(x0)(x - x0) + F_y(y0)(y - y0) + F_z(z0)(z - z0) = 0. Normal vector is grad F at P0. For z = f(x, y): rewrite as F = z - f(x,y) = 0, so F_x = -f_x, F_y = -f_y, F_z = 1. Tangent plane: z - z0 = f_x(x0)(x - x0) + f_y(y0)(y - y0). Example: f(x,y) = 4 - x^2 - y^2 at (1, 1, 2). f_x = -2x = -2, f_y = -2y = -2. Tangent: z - 2 = -2(x - 1) - 2(y - 1), z = -2x - 2y + 6. ✓',
  'ch05p2_tangent_plane_level_surface',
  'problem_solving',
  ['tangent plane', 'level surface', 'gradient', 'normal', 'F(x,y,z) = c']
)

add(
  'How do you find the normal line to a surface?',
  'Normal line to surface F(x, y, z) = c at point P0(x0, y0, z0): line in direction of grad F(P0). Parametric: <x, y, z> = <x0, y0, z0> + t·grad F(P0). Symmetric: (x - x0)/F_x = (y - y0)/F_y = (z - z0)/F_z (if components nonzero). Example: F = x^2 + y^2 + z^2 - 9 = 0 (sphere), at (1, 2, 2). grad F = <2, 4, 4>. Normal line: <x, y, z> = <1, 2, 2> + t<2, 4, 4>. Symmetric: (x-1)/2 = (y-2)/4 = (z-2)/4. This line passes through center (0,0,0) (radius). ✓',
  'ch05p2_normal_line',
  'problem_solving',
  ['normal line', 'surface', 'gradient', 'parametric', 'symmetric']
)

// ============================================================
// SECTION 12 — TANGENT PLANES & LINEAR APPROXIMATION (4 items)
// ============================================================
add(
  'What is the linear approximation of a function of two variables?',
  'Linear approximation (linearization) of f(x, y) at (a, b): L(x, y) = f(a, b) + f_x(a, b)(x - a) + f_y(a, b)(y - b). Geometrically: tangent plane at (a, b, f(a, b)). Use to approximate f near (a, b). Example: Approximate f(1.1, 1.9) for f(x, y) = x^2 y. At (1, 2): f = 2, f_x = 2xy = 4, f_y = x^2 = 1. L(x, y) = 2 + 4(x - 1) + 1(y - 2). L(1.1, 1.9) = 2 + 4(0.1) + (-0.1) = 2 + 0.4 - 0.1 = 2.3. Actual: (1.1)^2(1.9) = 1.21·1.9 = 2.299. Excellent approximation. ✓',
  'ch05p2_linear_approximation',
  'formula_recall',
  ['linear approximation', 'linearization', 'tangent plane', 'two variables', 'estimate']
)

add(
  'What is the total differential of a function of two variables?',
  'Total differential: dz = f_x dx + f_y dy. Approximates change in z = f(x, y) when x and y change by small dx, dy: Delta z ~ dz. Example: f(x, y) = x^2 + 3xy. f_x = 2x + 3y, f_y = 3x. At (1, 2): f_x = 8, f_y = 3. dz = 8 dx + 3 dy. If x changes by 0.1 and y by -0.05: dz = 8(0.1) + 3(-0.05) = 0.8 - 0.15 = 0.65. Actual Delta z = f(1.1, 1.95) - f(1, 2) = (1.21 + 6.435) - (1 + 6) = 0.645. Very close to dz. ✓',
  'ch05p2_total_differential',
  'formula_recall',
  ['total differential', 'dz', 'f_x dx + f_y dy', 'approximation', 'change']
)

add(
  'How do you use differentials for error estimation?',
  'Error propagation: if x has error dx and y has error dy, error in f(x, y) is approx |dz| = |f_x dx + f_y dy|. Worst case: |Delta f| <= |f_x||dx| + |f_y||dy|. Example: Rectangle measured x = 10 ± 0.1 cm, y = 5 ± 0.05 cm. Area A = xy. dA = y dx + x dy = 5(0.1) + 10(0.05) = 0.5 + 0.5 = 1.0. So area = 50 ± 1 cm^2. Example: Cylinder volume V = pi r^2 h. dV = 2pi r h dr + pi r^2 dh. ✓',
  'ch05p2_error_estimation',
  'problem_solving',
  ['error', 'propagation', 'differential', 'measurement', 'approximation']
)

add(
  'What is the multivariable Taylor polynomial?',
  'Second-degree Taylor polynomial of f(x, y) about (a, b): T_2(x, y) = f(a,b) + f_x(a,b)(x-a) + f_y(a,b)(y-b) + (1/2)[f_xx(a,b)(x-a)^2 + 2 f_xy(a,b)(x-a)(y-b) + f_yy(a,b)(y-b)^2]. Higher degrees add cubic, quartic terms. Example: f(x,y) = e^x sin y about (0, 0). f(0,0)=0, f_x = e^x sin y, f_x(0,0)=0, f_y = e^x cos y, f_y(0,0)=1, f_xx = e^x sin y, 0, f_xy = e^x cos y, 1, f_yy = -e^x sin y, 0. T_2 = 0 + 0·x + 1·y + (1/2)[0 + 2·1·xy + 0] = y + xy. ✓',
  'ch05p2_taylor_multivariable',
  'problem_solving',
  ['Taylor polynomial', 'multivariable', 'second degree', 'approximation', 'expansion']
)

// ============================================================
// SECTION 13 — EXTREMA OF MULTIVARIABLE FUNCTIONS (5 items)
// ============================================================
add(
  'How do you find critical points of a function of two variables?',
  'Critical points of f(x, y): where grad f = 0 (i.e., f_x = 0 AND f_y = 0) or where partials don\'t exist. At critical point, tangent plane horizontal. Example: f(x, y) = x^2 + y^2. f_x = 2x = 0 => x = 0. f_y = 2y = 0 => y = 0. Critical: (0, 0). Example: f(x, y) = x^3 - 3x + y^2. f_x = 3x^2 - 3 = 0 => x = ±1. f_y = 2y = 0 => y = 0. Critical points: (1, 0) and (-1, 0). Critical points can be local max, local min, or saddle points. ✓',
  'ch05p2_critical_points',
  'problem_solving',
  ['critical points', 'gradient zero', 'partial derivatives', 'stationary', 'find']
)

add(
  'What is the Second Derivative Test for functions of two variables?',
  'Second Derivative Test: At critical point (a, b), compute D = f_xx·f_yy - (f_xy)^2 (Hessian determinant). (1) D > 0 and f_xx > 0: local min. (2) D > 0 and f_xx < 0: local max. (3) D < 0: saddle point. (4) D = 0: test inconclusive. Example: f = x^2 + y^2. f_x=2x, f_y=2y. Critical (0,0). f_xx=2, f_yy=2, f_xy=0. D = 2·2 - 0 = 4 > 0, f_xx=2 > 0. Local min at (0,0). ✓ (It is the global min, value 0.)',
  'ch05p2_second_derivative_test',
  'formula_recall',
  ['second derivative test', 'Hessian', 'discriminant', 'local max min', 'saddle']
)

add(
  'What is a saddle point?',
  'Saddle point: critical point where D = f_xx·f_yy - (f_xy)^2 < 0. Surface curves up in one direction, down in another (like a horse saddle or Pringle chip). Example: f(x, y) = x^2 - y^2 (hyperbolic paraboloid). f_x = 2x, f_y = -2y. Critical (0, 0). f_xx = 2, f_yy = -2, f_xy = 0. D = 2·(-2) - 0 = -4 < 0. Saddle at (0,0). Along y=0: f = x^2 (min at 0). Along x=0: f = -y^2 (max at 0). Hence saddle. ✓',
  'ch05p2_saddle_point',
  'formula_recall',
  ['saddle point', 'D < 0', 'hyperbolic paraboloid', 'critical point', 'maximum minimum']
)

add(
  'How do you find absolute extrema on a closed bounded region?',
  'Absolute extrema on closed bounded region R: (1) Find critical points of f inside R (where f_x = f_y = 0 or undefined), evaluate f at each. (2) Find extrema on boundary (parametrize boundary, often use substitution or Lagrange multipliers). (3) Largest value = absolute max, smallest = absolute min. Example: f(x, y) = x^2 + y^2 on square [0,1]x[0,1]. Critical inside: (0,0) (but on boundary). Inside: f_x = 2x = 0, f_y = 2y = 0 => (0,0) but corner. Boundary x=0: f = y^2, min 0 at (0,0), max 1 at (0,1). Similar other sides. Min 0 at (0,0), max 2 at (1,1). ✓',
  'ch05p2_absolute_extrema',
  'problem_solving',
  ['absolute extrema', 'closed bounded', 'boundary', 'critical points', 'max min']
)

add(
  'How do you find extrema on a boundary using substitution?',
  'To find extrema on boundary, parametrize or substitute the constraint into f. Example: f(x, y) = x^2 + y^2 on circle x^2 + y^2 = 4. Substitute: f = 4 (constant!). All points give same value. Example: f(x, y) = xy on circle x^2 + y^2 = 4. Parametrize: x = 2cos t, y = 2 sin t. f = 4 cos t sin t = 2 sin(2t). Max 2 at t = pi/4 (point (sqrt2, sqrt2)), min -2 at t = 3pi/4 (point (-sqrt2, sqrt2)). ✓',
  'ch05p2_boundary_extrema',
  'problem_solving',
  ['boundary', 'extrema', 'substitution', 'parametrize', 'constraint']
)

// ============================================================
// SECTION 14 — LAGRANGE MULTIPLIERS (4 items)
// ============================================================
add(
  'What is the method of Lagrange multipliers?',
  'Lagrange multipliers: to find extrema of f(x, y) subject to constraint g(x, y) = c, solve the system: grad f = lambda·grad g, g(x, y) = c. The lambda is the Lagrange multiplier. Geometric: at extremum, grad f parallel to grad g (level curves tangent). Example: Maximize f = xy subject to x + y = 10. grad f = <y, x>, grad g = <1, 1>. System: y = lambda, x = lambda, x + y = 10. So x = y = lambda = 5. Max f = 25 at (5, 5). ✓',
  'ch05p2_lagrange_multipliers',
  'formula_recall',
  ['Lagrange multipliers', 'constraint', 'grad f = lambda grad g', 'optimization', 'extrema']
)

add(
  'How do you use Lagrange multipliers with one constraint in 3 variables?',
  'For f(x, y, z) subject to g(x, y, z) = c: solve grad f = lambda·grad g (3 equations) plus g = c. System of 4 equations in x, y, z, lambda. Example: Find point on plane 2x + y - z = 5 closest to origin (minimize f = x^2 + y^2 + z^2). grad f = <2x, 2y, 2z>, grad g = <2, 1, -1>. System: 2x = 2lambda, 2y = lambda, 2z = -lambda, 2x + y - z = 5. From first three: x = lambda, y = lambda/2, z = -lambda/2. Sub: 2lambda + lambda/2 + lambda/2 = 5 => 3 lambda = 5 => lambda = 5/3. Point: (5/3, 5/6, -5/6). Distance = sqrt(25/9 + 25/36 + 25/36) = sqrt(25·(4+1+1)/36) = sqrt(150/36) = 5sqrt(6)/6. ✓',
  'ch05p2_lagrange_3d',
  'problem_solving',
  ['Lagrange', '3D', 'one constraint', 'closest point', 'plane']
)

add(
  'How do you use Lagrange multipliers with two constraints?',
  'Two constraints g(x, y, z) = c and h(x, y, z) = d: solve grad f = lambda·grad g + mu·grad h, g = c, h = d. System of 5 equations in x, y, z, lambda, mu. Geometric: at extremum, grad f is in span of grad g and grad h (level surfaces of f, g, h all tangent along a curve). Example: Find extrema of f = x + y + z on intersection of plane x + y + z = 1 and cylinder x^2 + y^2 = 1. Two constraints: g1 = x+y+z-1 = 0, g2 = x^2+y^2-1 = 0. Grad f = <1,1,1>, grad g1 = <1,1,1>, grad g2 = <2x, 2y, 0>. System: 1 = lambda·1 + mu·2x, 1 = lambda·1 + mu·2y, 1 = lambda·1 + mu·0. From third: lambda = 1. Then 1 = 1 + 2 mu x => mu x = 0, 1 = 1 + 2 mu y => mu y = 0. So mu = 0 (=> no info) or x = y = 0 (but x^2+y^2 = 1, contradiction). So mu = 0, lambda = 1, and check: works for all x,y,z on intersection (f is constant 1). ✓',
  'ch05p2_lagrange_two_constraints',
  'problem_solving',
  ['Lagrange', 'two constraints', 'intersection', 'lambda mu', 'optimization']
)

add(
  'What are applications of Lagrange multipliers?',
  'Applications of Lagrange multipliers: (1) Optimization with resource constraints (maximize profit subject to budget). (2) Geometric: closest/farthest point on curve/surface. (3) Statistics: maximum likelihood with constraints. (4) Thermodynamics: equilibria with energy/entropy constraints. (5) Economics: Cobb-Douglas production max subject to cost constraint. Example: Maximize utility U = x^a y^b subject to budget p_x·x + p_y·y = I. grad U = <a x^(a-1) y^b, b x^a y^(b-1)>, grad g = <p_x, p_y>. Conditions: a x^(a-1) y^b = lambda p_x, b x^a y^(b-1) = lambda p_y. Dividing: (a y)/(b x) = p_x/p_y => optimal y/x = (b/a)(p_x/p_y). ✓',
  'ch05p2_lagrange_applications',
  'problem_solving',
  ['applications', 'Lagrange', 'economics', 'optimization', 'resource constraint']
)

// ============================================================
// SECTION 15 — DOUBLE INTEGRALS (5 items)
// ============================================================
add(
  'What is a double integral and how do you compute it?',
  'Double integral of f(x, y) over region R: integral_integral_R f(x, y) dA. Geometric: volume under surface z = f(x, y) over R (signed). Computed via iterated integral. For rectangular R = [a, b] x [c, d]: integral_a^b integral_c^d f(x, y) dy dx (inner dy, outer dx) or integral_c^d integral_a^b f dx dy. Fubini\'s Theorem: if f continuous, order doesn\'t matter. Example: integral_0^1 integral_0^2 (x + y) dy dx. Inner: [xy + y^2/2]_0^2 = 2x + 2. Outer: integral_0^1 (2x + 2) dx = [x^2 + 2x]_0^1 = 3. ✓',
  'ch05p2_double_integral',
  'formula_recall',
  ['double integral', 'iterated', 'Fubini', 'rectangular', 'volume']
)

add(
  'What is Fubini\'s Theorem?',
  'Fubini\'s Theorem: If f is continuous on rectangle R = [a, b] x [c, d], then integral_integral_R f dA = integral_a^b [integral_c^d f(x,y) dy] dx = integral_c^d [integral_a^b f(x,y) dx] dy. Order of integration can be swapped. Choose order that\'s easier to evaluate. Example: integral_0^1 integral_0^1 x·e^(xy) dy dx. Inner (y): integral x e^(xy) dy = e^(xy)|_0^1 = e^x - 1. Outer: integral_0^1 (e^x - 1) dx = (e - 1) - 1 = e - 2. Alternatively, integrate x first: integral x e^(xy) dx (by parts) - harder. So pick first order. ✓',
  'ch05p2_fubini_theorem',
  'formula_recall',
  ['Fubini', 'theorem', 'order of integration', 'continuous', 'rectangle']
)

add(
  'How do you evaluate double integrals over general regions?',
  'Type I region (vertically simple): a <= x <= b, g1(x) <= y <= g2(x). Integral: integral_a^b integral_{g1(x)}^{g2(x)} f(x,y) dy dx. Type II (horizontally simple): c <= y <= d, h1(y) <= x <= h2(y). Integral: integral_c^d integral_{h1(y)}^{h2(y)} f(x,y) dx dy. Example: integral over triangle with vertices (0,0), (1,0), (1,1). Type I: 0 <= x <= 1, 0 <= y <= x. integral_0^1 integral_0^x f dy dx. Type II: 0 <= y <= 1, y <= x <= 1. integral_0^1 integral_y^1 f dx dy. ✓',
  'ch05p2_double_integral_regions',
  'problem_solving',
  ['double integral', 'general region', 'Type I', 'Type II', 'vertically horizontally simple']
)

add(
  'How do you switch the order of integration?',
  'Switching order: sketch region from limits, re-express with other variable outer. Example: integral_0^1 integral_y^1 e^(x^2) dx dy. Inner hard (e^(x^2) no elementary antiderivative). Region: 0 <= y <= 1, y <= x <= 1. Sketch: triangle below y = x, above y = 0, x in [0,1]. Switch: 0 <= x <= 1, 0 <= y <= x. New: integral_0^1 integral_0^x e^(x^2) dy dx = integral_0^1 x e^(x^2) dx = (1/2) e^(x^2)|_0^1 = (e - 1)/2. ✓',
  'ch05p2_switch_order',
  'problem_solving',
  ['switch order', 'integration', 'sketch region', 're-express', 'limits']
)

add(
  'How do you find area and volume using double integrals?',
  'Area of region R: A = integral_integral_R 1 dA. Volume under z = f(x, y) >= 0 over R: V = integral_integral_R f(x, y) dA. Volume between f (top) and g (bottom) over R: V = integral_integral_R [f - g] dA. Example: Volume under z = 4 - x^2 - y^2 over square [0,1]x[0,1]. V = integral_0^1 integral_0^1 (4 - x^2 - y^2) dy dx. Inner: [4y - x^2 y - y^3/3]_0^1 = 4 - x^2 - 1/3 = 11/3 - x^2. Outer: integral_0^1 (11/3 - x^2) dx = 11/3 - 1/3 = 10/3. ✓',
  'ch05p2_area_volume_double',
  'problem_solving',
  ['area', 'volume', 'double integral', 'region', 'between surfaces']
)

// ============================================================
// SECTION 16 — DOUBLE INTEGRALS IN POLAR (4 items)
// ============================================================
add(
  'How do you evaluate double integrals in polar coordinates?',
  'Polar coordinates: x = r cos theta, y = r sin theta, dA = r dr dtheta (extra r from Jacobian). For region R in polar: alpha <= theta <= beta, r1(theta) <= r <= r2(theta). Integral: integral_alpha^beta integral_{r1(theta)}^{r2(theta)} f(r cos theta, r sin theta)·r dr dtheta. Use when region or integrand has circular symmetry. Example: integral over disk x^2 + y^2 <= 4 of (x^2 + y^2) dA. Polar: 0 <= theta <= 2pi, 0 <= r <= 2. Integral_0^(2pi) integral_0^2 r^2 · r dr d theta = 2pi · [r^4/4]_0^2 = 2pi·4 = 8pi. ✓',
  'ch05p2_polar_double_integral',
  'formula_recall',
  ['polar', 'double integral', 'r dr dtheta', 'Jacobian', 'circular']
)

add(
  'When should you use polar coordinates for double integrals?',
  'Use polar when: (1) Region is a disk, annulus, sector, or has circular boundary. (2) Integrand has x^2 + y^2 (converts to r^2) or arctan(y/x) (becomes theta). (3) Boundary curves are circles centered at origin or rays from origin. Example: integral over disk x^2 + y^2 <= 9 of e^(-x^2-y^2) dA. Cartesian impossible (no elementary antiderivative of e^(-x^2)). Polar: integral_0^(2pi) integral_0^3 e^(-r^2)·r dr d theta. Inner: integral_0^3 r e^(-r^2) dr = [-e^(-r^2)/2]_0^3 = (1 - e^(-9))/2. Outer: 2pi·(1 - e^(-9))/2 = pi(1 - e^(-9)). ✓',
  'ch05p2_polar_when_to_use',
  'problem_solving',
  ['polar', 'when to use', 'circular', 'x^2+y^2', 'disk']
)

add(
  'How do you convert a region from Cartesian to polar?',
  'To convert region: (1) Identify curves in Cartesian. (2) Replace x^2 + y^2 with r^2, x = r cos theta, y = r sin theta. (3) Find r and theta ranges. Common conversions: Circle x^2 + y^2 = R^2 becomes r = R. Circle (x-a)^2 + y^2 = a^2 becomes r = 2a cos theta. Cardioid r = a(1+cos theta). Example: Region outside r = 1 and inside r = 2, first quadrant: 0 <= theta <= pi/2, 1 <= r <= 2. Area = integral_0^(pi/2) integral_1^2 r dr d theta = (pi/2)(4/2 - 1/2) = (pi/2)(3/2) = 3pi/4. ✓',
  'ch05p2_convert_region_polar',
  'problem_solving',
  ['convert', 'Cartesian to polar', 'circle', 'cardioid', 'region']
)

add(
  'How do you find the area and centroid using polar double integrals?',
  'Area in polar: A = integral_integral_R r dr d theta. Centroid (xbar, ybar): xbar = (1/A) integral_integral_R x·r dr d theta = (1/A) integral integral r cos theta · r dr d theta = (1/A) integral integral r^2 cos theta dr d theta. Similarly ybar with sin. Example: Half-disk r <= 1, 0 <= theta <= pi. A = integral_0^pi integral_0^1 r dr d theta = pi·(1/2) = pi/2. xbar = (2/pi) integral_0^pi integral_0^1 r^2 cos theta dr d theta = (2/pi)(1/3) integral_0^pi cos theta d theta = 0 (symmetric). ybar = (2/pi)(1/3) integral_0^pi sin theta d theta = (2/(3pi))·2 = 4/(3pi). ✓',
  'ch05p2_polar_area_centroid',
  'problem_solving',
  ['area', 'centroid', 'polar', 'double integral', 'half disk']
)

// ============================================================
// SECTION 17 — TRIPLE INTEGRALS (4 items)
// ============================================================
add(
  'What is a triple integral and how do you compute it?',
  'Triple integral of f(x, y, z) over solid E: integral_integral_integral_E f(x, y, z) dV. Geometric: 4D hypervolume, but if f=1 gives volume of E. Computed as iterated integral. For rectangular box [a,b]x[c,d]x[p,q]: integral_a^b integral_c^d integral_p^q f dz dy dx (or any order by Fubini). For general E: project onto xy-plane to get region D, then z from z1(x,y) to z2(x,y): integral_integral_D integral_{z1}^{z2} f dz dA. Example: integral_0^1 integral_0^x integral_0^1 xyz dz dy dx. Inner: xyz: [xyz^2/2]_0^1 = xy/2. Middle: integral_0^x xy/2 dy = x[y^2/4]_0^x = x^3/4. Outer: integral_0^1 x^3/4 dx = 1/16. ✓',
  'ch05p2_triple_integral',
  'formula_recall',
  ['triple integral', 'iterated', 'dV', 'volume', 'solid']
)

add(
  'How do you set up a triple integral over a general solid?',
  'Setting up triple integral: (1) Sketch solid E. (2) Choose order of integration (often dz dy dx or dy dx dz). (3) Find limits for each variable. For "dz first": project E onto xy-plane to get D, find z1(x,y) (bottom) and z2(x,y) (top). Then D is Type I/II in xy. Example: Tetrahedron with vertices (0,0,0), (1,0,0), (0,1,0), (0,0,1). Planes: x+y+z = 1. Bottom z=0, top z=1-x-y. Project to xy: triangle x>=0, y>=0, x+y<=1. So integral_0^1 integral_0^(1-x) integral_0^(1-x-y) f dz dy dx. With f=1: integral_0^1 integral_0^(1-x) (1-x-y) dy dx = integral_0^1 [(1-x)y - y^2/2]_0^(1-x) dx = integral_0^1 (1-x)^2/2 dx = 1/6 (volume of tetrahedron). ✓',
  'ch05p2_triple_general_solid',
  'problem_solving',
  ['triple integral', 'solid', 'limits', 'project', 'tetrahedron']
)

add(
  'How do you evaluate triple integrals in cylindrical coordinates?',
  'Cylindrical: (r, theta, z), x = r cos theta, y = r sin theta, z = z, dV = r dz dr d theta. Use when solid has cylindrical symmetry (axis along z). Limits: z from z1(r, theta) to z2, r from r1(theta) to r2, theta from alpha to beta. Example: Volume of cone z = sqrt(x^2+y^2), 0 <= z <= 2. In cylindrical: z = r, so r <= z <= 2, 0 <= r <= 2, 0 <= theta <= 2pi. V = integral_0^(2pi) integral_0^2 integral_r^2 r dz dr d theta = 2pi·integral_0^2 r(2-r) dr = 2pi·[r^2 - r^3/3]_0^2 = 2pi·(4 - 8/3) = 2pi·(4/3) = 8pi/3. ✓',
  'ch05p2_cylindrical_coordinates',
  'formula_recall',
  ['cylindrical', 'triple integral', 'r dz dr dtheta', 'cone', 'symmetry']
)

add(
  'How do you evaluate triple integrals in spherical coordinates?',
  'Spherical: (rho, theta, phi), x = rho sin phi cos theta, y = rho sin phi sin theta, z = rho cos phi. dV = rho^2 sin phi d rho d phi d theta. rho = distance from origin, phi = angle from +z axis (0 to pi), theta = azimuthal (0 to 2pi). Use for spherical symmetry. Example: Volume of sphere radius R. V = integral_0^(2pi) integral_0^pi integral_0^R rho^2 sin phi d rho d phi d theta = (2pi)(2)(R^3/3) = (4/3) pi R^3. ✓ Example: integral over sphere of (x^2+y^2+z^2) dV = integral rho^2·rho^2 sin phi = (4pi R^5/5). ✓',
  'ch05p2_spherical_coordinates',
  'formula_recall',
  ['spherical', 'triple integral', 'rho theta phi', 'sin phi', 'Jacobian']
)

// ============================================================
// SECTION 18 — APPLICATIONS OF MULTIPLE INTEGRALS (4 items)
// ============================================================
add(
  'How do you find the mass and center of mass using multiple integrals?',
  'Mass of lamina with density rho(x, y): m = integral_integral_R rho dA. Center of mass: xbar = (1/m) integral_integral_R x·rho dA, ybar = (1/m) integral integral_R y·rho dA. For 3D solid with density rho(x, y, z): m = integral_integral_integral_E rho dV, xbar = (1/m) integral·integral·integral x·rho dV, similarly ybar, zbar. Example: Triangle (0,0), (1,0), (0,1) with rho = x + y. m = integral_0^1 integral_0^(1-x) (x+y) dy dx = integral_0^1 [xy + y^2/2]_0^(1-x) dx = integral_0^1 (x(1-x) + (1-x)^2/2) dx = integral_0^1 (1/2 + x/2 - x^2/2) dx = 1/2 + 1/4 - 1/6 = 1/3. Wait recompute. Actually = integral_0^1 (x - x^2 + (1 - 2x + x^2)/2) dx = integral_0^1 (1/2 - x^2/2) dx = 1/2 - 1/6 = 1/3. ✓',
  'ch05p2_mass_center',
  'problem_solving',
  ['mass', 'center of mass', 'density', 'multiple integral', 'lamina']
)

add(
  'How do you find moments of inertia using multiple integrals?',
  'Moments of inertia (2D lamina, density rho): I_x = integral_integral_R y^2 rho dA (about x-axis), I_y = integral_integral_R x^2 rho dA (about y-axis), I_0 = integral_integral_R (x^2 + y^2) rho dA = I_x + I_y (about origin, polar moment). 3D: I_x = integral integral integral (y^2 + z^2) rho dV, etc. Example: Uniform disk radius R, mass M, about center perpendicular: I_0 = (1/2) M R^2. About diameter: I = (1/4) M R^2. Example: Solid sphere about diameter: I = (2/5) M R^2. ✓',
  'ch05p2_moments_inertia',
  'problem_solving',
  ['moments of inertia', 'disk', 'sphere', 'mass', 'rotation']
)

add(
  'How do you find the surface area using double integrals?',
  'Surface area of z = f(x, y) over region D: S = integral_integral_D sqrt(1 + (f_x)^2 + (f_y)^2) dA. For parametric surface r(u, v): S = integral integral |r_u x r_v| dA. Example: Surface area of paraboloid z = x^2 + y^2 below z = 4. f_x = 2x, f_y = 2y. sqrt(1 + 4x^2 + 4y^2) = sqrt(1 + 4r^2) in polar. Region: r <= 2. S = integral_0^(2pi) integral_0^2 sqrt(1 + 4r^2)·r dr d theta. Let u = 1 + 4r^2, du = 8r dr: integral_1^17 sqrt(u) du/8 = (1/8)·(2/3)(u^(3/2))|_1^17 = (1/12)(17^(3/2) - 1). S = 2pi·(17sqrt(17) - 1)/12 = pi(17sqrt(17) - 1)/6. ✓',
  'ch05p2_surface_area_double',
  'problem_solving',
  ['surface area', 'double integral', 'sqrt(1 + f_x^2 + f_y^2)', 'paraboloid', 'parametric']
)

add(
  'How do you find the probability using double integrals?',
  'Joint probability density f(x, y) (continuous): P((X,Y) in R) = integral_integral_R f(x, y) dA. Requires f >= 0 and integral_integral_(R^2) f = 1. Marginal: f_X(x) = integral f(x, y) dy (over all y). Expected value: E[g(X,Y)] = integral integral g(x, y) f(x, y) dA. Example: f(x, y) = 2e^(-x-2y) for x, y > 0 (joint density). Check normalization: integral_0^inf integral_0^inf 2 e^(-x-2y) dy dx = integral_0^inf 2 e^(-x)·(1/2) dx = integral_0^inf e^(-x) dx = 1. ✓. P(X < 1, Y < 1) = integral_0^1 integral_0^1 2 e^(-x-2y) dy dx = integral_0^1 2 e^(-x) (1 - e^(-2))/2 dx = (1 - e^(-2)) integral_0^1 e^(-x) dx = (1 - e^(-2))(1 - e^(-1)). ✓',
  'ch05p2_probability_double',
  'problem_solving',
  ['probability', 'joint density', 'expected value', 'marginal', 'double integral']
)

// ============================================================
// WRITE OUTPUT
// ============================================================
const output = {
  generatedAt: new Date().toISOString(),
  totalItems: items.length,
  subject: 'mathematics_formulas_volume_9_chapter_05_part_02',
  volume:
    'Volume 9 — Comprehensive Formula Encyclopedia, Chapter 5 Part 2 (Multivariable Calculus: Vectors in 2D and 3D, Dot Product, Cross Product, Lines and Planes in 3D, Quadric Surfaces, Vector-Valued Functions, Calculus of VVF, Arc Length and Curvature, Motion in Space, Functions of Several Variables, Limits and Continuity, Partial Derivatives, Chain Rule, Directional Derivatives and Gradient, Tangent Planes and Linear Approximation, Extrema, Lagrange Multipliers, Double Integrals, Double Integrals in Polar, Triple Integrals in Cylindrical and Spherical, Applications of Multiple Integrals)',
  source: 'TRIZA Generated Formula Dataset',
  language: 'en',
  religionNeutral: true,
  items,
}

mkdirSync('data', { recursive: true })
writeFileSync('data/math-formulas-vol9-ch05p2.json', JSON.stringify(output, null, 2))
console.log(`Wrote ${items.length} items to data/math-formulas-vol9-ch05p2.json`)
