/**
 * ============================================================
 *  Mathematics Formula Encyclopedia — Volume 9
 *  Comprehensive Formula Reference
 *  Chapter 2 — Part 3 (Solid / 3D Geometry)
 *  Polyhedra & Euler's Formula;
 *  Platonic Solids (Tetrahedron, Cube, Octahedron,
 *    Dodecahedron, Icosahedron);
 *  Prisms & Cylinders (Volume, Lateral & Total Surface Area);
 *  Pyramids & Cones (Volume, Slant Height, Lateral & Total
 *    Surface Area, Frustum Volume & Area);
 *  Spheres (Volume, Surface Area, Spherical Cap/Zone/Segment,
 *    Great Circle);
 *  3D Coordinate Geometry (Distance, Midpoint, Direction
 *    Cosines/Ratios, Equation of Line, Equation of Plane,
 *    Angle Between Lines/Planes, Distance from Point to Plane);
 *  Vector Geometry Basics (Position Vector, Dot/Cross Product,
 *    Scalar Triple Product, Volume of Parallelepiped/Tetrahedron)
 *  Generator for TRIZA
 * ============================================================
 *
 *  Output: data/math-formulas-vol9-ch02p3.json
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
// SECTION 1 — POLYHEDRA & EULER'S FORMULA (3 items)
// ============================================================
add(
  'What is a polyhedron and what is Euler\'s formula?',
  'A **polyhedron** is a 3D solid bounded by flat polygonal faces. **Regular polyhedron**: all faces are congruent regular polygons and the same number meet at each vertex. **Euler\'s formula** (for any **convex** polyhedron, or any polyhedron homeomorphic to a sphere): **V − E + F = 2**, where V = number of vertices, E = number of edges, F = number of faces. **Example (cube)**: V = 8, E = 12, F = 6 ⇒ 8 − 12 + 6 = 2 ✓. **Example (tetrahedron)**: V = 4, E = 6, F = 4 ⇒ 4 − 6 + 4 = 2 ✓. **Example (octahedron)**: V = 6, E = 12, F = 8 ⇒ 6 − 12 + 8 = 2 ✓. **Generalization**: For a polyhedron with genus g (g holes, like a torus has g = 1), V − E + F = 2 − 2g. **Limitations**: applies to closed polyhedra without holes; not to non-convex self-intersecting ones without modification. ✓',
  'ch02p3_euler_formula',
  'formula_recall',
  ['polyhedron', 'Euler', 'V E F', 'vertices edges faces', 'convex', 'genus']
)

add(
  'How do you verify Euler\'s formula on a prism and a pyramid?',
  'A **prism** with n-gon bases: 2 n-gon faces (top + bottom) + n rectangular side faces = F = n + 2. Edges: n on top, n on bottom, n vertical = E = 3n. Vertices: 2n. Check: 2n − 3n + (n + 2) = 2 ✓. **Example (hexagonal prism, n = 6)**: V = 12, E = 18, F = 8 ⇒ 12 − 18 + 8 = 2 ✓. A **pyramid** with n-gon base: 1 n-gon base + n triangular faces = F = n + 1. Edges: n on base + n from apex = E = 2n. Vertices: n + 1 (n base + 1 apex). Check: (n + 1) − 2n + (n + 1) = 2 ✓. **Example (square pyramid, n = 4)**: V = 5, E = 8, F = 5 ⇒ 5 − 8 + 5 = 2 ✓. **Example (pentagonal pyramid, n = 5)**: V = 6, E = 10, F = 6 ⇒ 6 − 10 + 6 = 2 ✓. ✓',
  'ch02p3_euler_prism_pyramid',
  'problem_solving',
  ['Euler', 'prism', 'pyramid', 'verify', 'V E F', 'n-gon']
)

add(
  'What is the generalization of Euler\'s formula and what are polyhedral graphs?',
  '**Generalized Euler characteristic**: For a surface of genus g (a sphere with g handles attached; g = 0 for sphere, g = 1 for torus, g = 2 for double torus, etc.), the Euler characteristic χ = 2 − 2g, and for any polyhedral decomposition: **V − E + F = χ = 2 − 2g**. **Torus**: V − E + F = 0 (g = 1). **Double torus**: V − E + F = −2 (g = 2). **Projective plane** (non-orientable): χ = 1. **Klein bottle** (non-orientable, genus 2): χ = 0. **Polyhedral graph** (Steinitz\'s theorem): a graph is the skeleton (1-skeleton) of a convex polyhedron if and only if it is **3-connected planar**. **Application**: count regions in a planar graph: V − E + F = 2 (where F includes the unbounded outer face). **Example (planar graph with V = 4, E = 6, K_4)**: F = 2 − 4 + 6 = 4 (3 triangular regions + 1 outer triangle ✓). ✓',
  'ch02p3_euler_generalization',
  'factual_question',
  ['Euler characteristic', 'genus', 'torus', 'polyhedral graph', 'Steinitz', 'planar graph']
)

// ============================================================
// SECTION 2 — PLATONIC SOLIDS (5 items)
// ============================================================
add(
  'What are the five Platonic solids and their properties?',
  'A **Platonic solid** is a regular convex polyhedron: all faces congruent regular polygons, same number meeting at each vertex. **There are exactly five** (proved by Euclid): (1) **Tetrahedron**: 4 triangular faces, 4 vertices, 6 edges; 3 triangles at each vertex. (2) **Cube (Hexahedron)**: 6 square faces, 8 vertices, 12 edges; 3 squares at each vertex. (3) **Octahedron**: 8 triangular faces, 6 vertices, 12 edges; 4 triangles at each vertex. (4) **Dodecahedron**: 12 pentagonal faces, 20 vertices, 30 edges; 3 pentagons at each vertex. (5) **Icosahedron**: 20 triangular faces, 12 vertices, 30 edges; 5 triangles at each vertex. **Duality**: cube ↔ octahedron (swap faces/vertices); dodecahedron ↔ icosahedron; tetrahedron is self-dual. All satisfy Euler: V − E + F = 2. **Proof of only five**: at each vertex, k regular n-gons meet; need (k)(interior angle) < 360° and angle = (n−2)·180°/n. Pairs (n, k): (3, 3), (3, 4), (3, 5), (4, 3), (5, 3) — only 5 solutions. ✓',
  'ch02p3_platonic_solids',
  'factual_question',
  ['Platonic solid', 'regular polyhedron', 'tetrahedron', 'cube', 'octahedron', 'dodecahedron', 'icosahedron', 'duality']
)

add(
  'What are the volume and surface area of a regular tetrahedron?',
  'A **regular tetrahedron** with edge length a. **Surface area** (4 equilateral triangles): **A = sqrt(3)·a²** (each face has area sqrt(3)·a²/4; times 4 = sqrt(3)·a²). **Volume**: **V = a³/(6·sqrt(2)) = (sqrt(2)/12)·a³**. Derivation: place vertices at (0,0,0), (a,0,0), (a/2, sqrt(3)·a/2, 0), and apex at (a/2, sqrt(3)·a/6, sqrt(6)·a/3); height h = sqrt(6)·a/3; V = (1/3)·(base area)·h = (1/3)·(sqrt(3)·a²/4)·(sqrt(6)·a/3) = sqrt(2)·a³/12. **Height** (from a vertex to opposite face): h = sqrt(6)·a/3 ≈ 0.8165·a. **Inradius** (center to face): r = a/(2·sqrt(6)) = a·sqrt(6)/12. **Circumradius** (center to vertex): R = a·sqrt(6)/4. **R/r = 3** for tetrahedron (smallest ratio among Platonic solids). **Example**: a = 6. A = sqrt(3)·36 ≈ 62.35. V = sqrt(2)·216/12 = 18·sqrt(2) ≈ 25.46. ✓',
  'ch02p3_regular_tetrahedron',
  'formula_recall',
  ['tetrahedron', 'regular', 'volume', 'surface area', 'height', 'inradius', 'circumradius']
)

add(
  'What are the volume and surface area of a cube?',
  'A **cube** (regular hexahedron) with edge length a. **Surface area**: 6·a² (six square faces). **Volume**: a³. **Space diagonal** (corner to opposite corner through interior): d = sqrt(a² + a² + a²) = **a·sqrt(3)**. **Face diagonal**: a·sqrt(2). **Inradius** (center to face, inscribed sphere radius): r = a/2. **Midsphere radius** (center to edge midpoint): a·sqrt(2)/2. **Circumradius** (center to vertex, circumscribed sphere): R = a·sqrt(3)/2. **Example**: a = 4. A = 6·16 = 96. V = 64. Space diagonal = 4·sqrt(3) ≈ 6.928. Face diagonal = 4·sqrt(2) ≈ 5.657. Inradius 2, circumradius 2·sqrt(3) ≈ 3.464. **Volume of inscribed sphere** = (4/3)·π·r³ = (4/3)·π·8 = 32π/3 ≈ 33.51; ratio to cube volume = π/6 ≈ 0.5236. ✓',
  'ch02p3_cube',
  'formula_recall',
  ['cube', 'hexahedron', 'volume', 'surface area', 'space diagonal', 'inradius', 'circumradius']
)

add(
  'What are the volume and surface area of a regular octahedron?',
  'A **regular octahedron** with edge length a. **Surface area** (8 equilateral triangles): **A = 2·sqrt(3)·a²** (twice the tetrahedron\'s area). **Volume**: **V = (sqrt(2)/3)·a³**. Derivation: an octahedron can be split into two square pyramids with common square base (face diagonal = a ⇒ square side = a/sqrt(2), area = a²/2) and height h = a/sqrt(2). Total V = 2·(1/3)·(a²/2)·(a/sqrt(2)) = (1/3)·a³/sqrt(2) = sqrt(2)·a³/6 — wait, let me redo. Place vertices at (±a/sqrt(2), 0, 0), (0, ±a/sqrt(2), 0), (0, 0, ±a/sqrt(2)). Edge length: distance from (a/sqrt(2),0,0) to (0,a/sqrt(2),0) = sqrt(a²/2 + a²/2) = a ✓. Volume = enclosed region: V = (4/3)·(a/sqrt(2))³ = (4/3)·a³/(2·sqrt(2)) = (sqrt(2)/3)·a³ ✓. **Height** (between opposite vertices): 2·a/sqrt(2) = a·sqrt(2). **Inradius**: a·sqrt(6)/6. **Circumradius**: a·sqrt(2)/2. **Dual of cube** (swap V and F). **Example**: a = 4. A = 2·sqrt(3)·16 ≈ 55.43. V = sqrt(2)·64/3 ≈ 30.17. ✓',
  'ch02p3_octahedron',
  'formula_recall',
  ['octahedron', 'regular', 'volume', 'surface area', 'dual of cube', 'eight triangular faces']
)

add(
  'What are the volume and surface area of regular dodecahedron and icosahedron?',
  '**Regular dodecahedron** (12 regular pentagon faces) with edge a: **A = 3·sqrt(25 + 10·sqrt(5))·a² ≈ 20.6457·a²**. **V = (15 + 7·sqrt(5))/4·a³ ≈ 7.6631·a³**. Inradius r = (a/2)·sqrt((25 + 11·sqrt(5))/10) ≈ 1.1135·a. Circumradius R = (a/4)·sqrt(3)·(1 + sqrt(5)) ≈ 1.4013·a. **Regular icosahedron** (20 equilateral triangle faces) with edge a: **A = 5·sqrt(3)·a² ≈ 8.6603·a²**. **V = (5/12)·(3 + sqrt(5))·a³ ≈ 2.1817·a³**. Inradius r = (a/12)·sqrt(3)·(3 + sqrt(5)) ≈ 0.7558·a. Circumradius R = (a/4)·sqrt(10 + 2·sqrt(5)) ≈ 0.9511·a. **Golden ratio** φ = (1 + sqrt(5))/2 appears throughout (e.g., icosahedron\'s 12 vertices can be given as cyclic permutations of (0, ±1, ±φ); dodecahedron vertices involve φ). **Example (dodecahedron, a = 2)**: A ≈ 82.58; V ≈ 61.30. **Example (icosahedron, a = 2)**: A ≈ 34.64; V ≈ 17.45. ✓',
  'ch02p3_dodecahedron_icosahedron',
  'formula_recall',
  ['dodecahedron', 'icosahedron', 'volume', 'surface area', 'golden ratio', 'Platonic']
)

// ============================================================
// SECTION 3 — PRISMS & CYLINDERS (4 items)
// ============================================================
add(
  'What is a prism and how do you compute its volume and surface area?',
  'A **prism** is a 3D solid with two congruent parallel polygonal **bases** and rectangular **lateral faces** connecting corresponding sides. **Right prism**: lateral edges perpendicular to bases (lateral faces are rectangles). **Oblique prism**: lateral edges not perpendicular. **Volume** (any prism): **V = B·h**, where B is the area of a base and h is the perpendicular height (distance between bases). **Lateral surface area** (right prism): L = P·h, where P is the perimeter of the base. **Total surface area**: A = 2B + L = 2B + P·h. **Example (rectangular box)**: l×w×h. V = l·w·h. L = 2(l+w)·h. A = 2(lw + lh + wh). **Example (triangular prism, base = right triangle 3-4-5, height = 10)**: B = 6, P = 12, V = 60, L = 120, A = 2·6 + 120 = 132. **Example (hexagonal prism, base regular hexagon side 4, height 12)**: B = (3·sqrt(3)/2)·16 = 24·sqrt(3) ≈ 41.57. P = 24. V = 24·sqrt(3)·12 = 288·sqrt(3) ≈ 498.83. L = 24·12 = 288. A = 2·24·sqrt(3) + 288 ≈ 371.14. ✓',
  'ch02p3_prism',
  'formula_recall',
  ['prism', 'volume', 'lateral area', 'total area', 'base area', 'right prism']
)

add(
  'What is a cylinder and how do you compute its volume and surface area?',
  'A (right circular) **cylinder** of radius r and height h. **Volume**: **V = π·r²·h** (base area π·r² times height). **Lateral surface area**: **L = 2π·r·h** (the lateral surface "unrolls" into a rectangle of dimensions 2π·r × h). **Total surface area**: **A = 2π·r·h + 2·π·r² = 2π·r·(h + r)** (lateral + two circular bases). **Oblique cylinder** (axes tilted, but bases still parallel circles): same volume V = π·r²·h (Cavalieri\'s principle); lateral area more complex. **Example (r = 5, h = 12)**: V = 25π·12 = 300π ≈ 942.48. L = 2π·5·12 = 120π ≈ 376.99. A = 2π·5·(12 + 5) = 170π ≈ 534.07. **Open cylinder** (no top, e.g., a cup): A = 2π·r·h + π·r² = π·r·(2h + r). ✓',
  'ch02p3_cylinder',
  'formula_recall',
  ['cylinder', 'volume', 'lateral area', 'total area', 'unroll', 'Cavalieri']
)

add(
  'How do you find the volume and surface area of an oblique or truncated prism/cylinder?',
  '**Oblique cylinder** (bases parallel circles, axis tilted): volume V = π·r²·h (h = perpendicular distance between bases), by **Cavalieri\'s principle**. Lateral area is harder; for the formula, integrate or use the average of the slant heights: for a circular cylinder, L = 2π·r·(average slant height). If the top is tilted at angle α to the base, slant heights vary from h − r·tan(α) to h + r·tan(α), so average = h; L = 2π·r·h still. **Truncated prism** (cut by an oblique plane): if cross-sections perpendicular to the axis are similar, V = base area × average height = B·(sum of vertex heights)/n for a triangular prism (n = 3 corners). **Truncated cylinder** (cut by a plane not parallel to base): V = π·r²·(average height) = π·r²·(h_1 + h_2)/2 where h_1, h_2 are the shortest and tallest heights. Lateral area: L = π·r·(h_1 + h_2). **Example**: Cylinder r = 4, cut so heights range from 6 to 14. V = π·16·10 = 160π. L = π·4·20 = 80π. ✓',
  'ch02p3_oblique_truncated_prism',
  'problem_solving',
  ['oblique cylinder', 'truncated prism', 'Cavalieri', 'average height', 'tilted']
)

add(
  'How do you solve applied prism and cylinder problems (tanks, pipes, cost)?',
  'Common setups: (1) Volume = capacity (with unit conversion: 1 m³ = 1000 L). (2) Material cost = surface area × cost per unit area. (3) Pipe flow = volume/time. **Example (water tank)**: Cylindrical tank r = 2 m, h = 5 m. Capacity V = π·4·5 = 20π m³ ≈ 62,832 L. **Example (paint a silo)**: Closed cylinder r = 3 m, h = 10 m. Surface area = 2π·3·(10 + 3) = 78π m². Paint covers 5 m²/L ⇒ need 78π/5 ≈ 49 L. **Example (open-top box with square base, volume 32)**: side x, height h. V = x²·h = 32 ⇒ h = 32/x². Minimize surface A = x² + 4·x·h = x² + 128/x. dA/dx = 2x − 128/x² = 0 ⇒ 2x³ = 128 ⇒ x = 4; h = 2. Minimum A = 16 + 32 = 48. **Example (pipe flow)**: Pipe radius 5 cm, water flows at 4 m/s. Flow rate = π·(0.05)²·4 = 0.01π m³/s ≈ 31.4 L/s. ✓',
  'ch02p3_prism_cylinder_applications',
  'problem_solving',
  ['applied', 'tank', 'cost', 'pipe flow', 'optimization', 'capacity']
)

// ============================================================
// SECTION 4 — PYRAMIDS & CONES (4 items)
// ============================================================
add(
  'What is a pyramid and how do you compute its volume and surface area?',
  'A **pyramid** has a polygonal **base** and triangular **lateral faces** meeting at a common **apex**. **Volume** (any pyramid): **V = (1/3)·B·h**, where B is base area and h is the perpendicular height from apex to base plane. **Right pyramid**: apex directly above the base center. **Slant height** ℓ (right pyramid): from apex to midpoint of a base edge along the lateral face. For a regular n-gon base with side s and pyramid height h, the slant height satisfies ℓ² = h² + (s/(2·tan(π/n)))² (Pythagoras on the right triangle of height, apothem of base, and slant). **Lateral surface area** (regular pyramid): L = (1/2)·P·ℓ, where P is base perimeter. **Total surface area**: A = B + L = B + (1/2)·P·ℓ. **Example (square pyramid, base 6×6, height 4)**: B = 36, V = (1/3)(36)(4) = 48. Slant ℓ = sqrt(4² + 3²) = 5 (apothem = 3). L = (1/2)(24)(5) = 60. A = 36 + 60 = 96. ✓',
  'ch02p3_pyramid',
  'formula_recall',
  ['pyramid', 'volume', 'slant height', 'lateral area', 'apex', 'base area']
)

add(
  'What is a cone and how do you compute its volume and surface area?',
  'A (right circular) **cone** of base radius r, height h, and slant height ℓ. **Pythagorean relation**: **ℓ² = r² + h²** (so ℓ = sqrt(r² + h²)). **Volume**: **V = (1/3)·π·r²·h** (one-third of the cylinder with same base and height). **Lateral surface area**: **L = π·r·ℓ** (the lateral surface unrolls into a sector of radius ℓ and arc length 2π·r; sector area = (1/2)·ℓ·(2π·r) = π·r·ℓ). **Total surface area**: **A = π·r·ℓ + π·r² = π·r·(ℓ + r)** (lateral + circular base). **Sector angle** of unrolled lateral surface: θ = 2π·r/ℓ (in radians); sector fraction of full circle = r/ℓ. **Example (r = 3, h = 4)**: ℓ = 5. V = (1/3)·π·9·4 = 12π ≈ 37.70. L = π·3·5 = 15π ≈ 47.12. A = 15π + 9π = 24π ≈ 75.40. Sector angle: 2π·3/5 = 6π/5 (216°). ✓',
  'ch02p3_cone',
  'formula_recall',
  ['cone', 'volume', 'slant height', 'lateral area', 'unroll sector', 'Pythagorean']
)

add(
  'How do you find the volume of a cone/pyramid via integration or Cavalieri\'s principle?',
  '**By Cavalieri\'s principle**: A cone and a pyramid with the same base area B and height h have the same volume V = (1/3)·B·h, because at any height y from the apex, the cross-section is similar to the base scaled by (y/h), so area = B·(y/h)² — same for cone and pyramid with matching B and h. **By integration**: Slice the cone (apex at origin, axis along z) at height z. Cross-section is a circle of radius r·z/h, area π·r²·z²/h². Integrate from 0 to h: V = ∫_0^h π·r²·z²/h² dz = π·r²/h² · [z³/3]_0^h = π·r²·h/3 = (1/3)·π·r²·h ✓. **Generalization**: Any solid whose cross-sectional area at height z is A(z) = A_0·(z/h)² has V = A_0·h/3. **Compare**: A pyramid\'s cross-section at height z (from apex) is a similar polygon scaled by z/h, area scales by (z/h)². ✓',
  'ch02p3_cone_volume_derivation',
  'how_to',
  ['cone volume', 'Cavalieri', 'integration', 'cross-section', 'derivation', 'similar']
)

add(
  'What is the frustum of a pyramid or cone, and how do you compute its volume and surface area?',
  'A **frustum** is the portion of a pyramid or cone between two parallel planes cutting it — i.e., a "truncated pyramid/cone" with two parallel similar bases. For a frustum with lower base area B_1, upper base area B_2, and perpendicular height h: **Volume: V = (h/3)·(B_1 + B_2 + sqrt(B_1·B_2))**. (Derived by subtracting the small removed pyramid from the full pyramid.) **For a conical frustum** with radii R (lower) and r (upper), height h: V = (π·h/3)·(R² + r² + R·r). **Slant height**: ℓ = sqrt(h² + (R − r)²). **Lateral surface area** (conical frustum): L = π·(R + r)·ℓ. **Total area**: A = π·(R² + r² + (R + r)·ℓ). **Example (conical frustum, R = 5, r = 3, h = 4)**: V = (π·4/3)·(25 + 9 + 15) = (4π/3)·49 = 196π/3 ≈ 205.25. ℓ = sqrt(16 + 4) = sqrt(20) = 2·sqrt(5) ≈ 4.472. L = π·8·2·sqrt(5) = 16π·sqrt(5) ≈ 112.4. A = π·(25 + 9 + 8·2·sqrt(5)) = π·(34 + 16·sqrt(5)) ≈ 204.0. ✓',
  'ch02p3_frustum',
  'formula_recall',
  ['frustum', 'truncated cone', 'truncated pyramid', 'volume', 'slant height', 'lateral area']
)

add(
  'What is Cavalieri\'s principle and how is it applied to compute volumes?',
  '**Cavalieri\'s principle**: If two solids lie between parallel planes, and every plane parallel to these planes cuts cross-sections of equal area in both solids, then the two solids have **equal volume**. **Applications**: (1) An oblique cylinder/prism has the same volume as a right one with the same base and height (cross-sections perpendicular to the axis are congruent). (2) Hemisphere of radius r has the same volume as a cylinder of radius r and height r with an inverted cone removed (Archimedes\'s "tombstone" result): V_hemisphere = π·r³ − (1/3)·π·r³ = (2/3)·π·r³, giving sphere V = (4/3)·π·r³. (3) Pyramids with the same base and height have equal volumes regardless of apex position (horizontal cross-sections shrink by the same factor). **Modern statement**: V = ∫ A(x) dx from a to b, where A(x) is the cross-sectional area. **Example**: Two solids — a cylinder (r = 3, h = 5) and an oblique cylinder with the same r and h — both have V = π·9·5 = 45π by Cavalieri. ✓',
  'ch02p3_cavalieri_principle',
  'formula_recall',
  ['Cavalieri principle', 'cross-section', 'equal volume', 'oblique', 'Archimedes', 'hemisphere']
)

// ============================================================
// SECTION 5 — SPHERES (3 items)
// ============================================================
add(
  'What is a sphere and what are its volume and surface area?',
  'A **sphere** is the 3D locus of points at a fixed distance **r** (radius) from a center O. **Volume**: **V = (4/3)·π·r³**. **Surface area**: **A = 4·π·r²** (Archimedes\' result; also equals the lateral area of the circumscribed cylinder, i.e., 2π·r · 2r = 4π·r²). **Diameter**: d = 2r. **Great circle**: any circle on the sphere whose plane passes through the center (radius = r, the largest possible circle on the sphere). **Circumference of great circle** = 2π·r. **Derivations**: V = ∫_{−r}^{r} π·(r² − x²) dx = π·[r²x − x³/3]_{−r}^{r} = π·(2r³ − 2r³/3) = (4/3)·π·r³. A = dV/dr = 4π·r² (surface area is derivative of volume w.r.t. radius). **Example (r = 6)**: V = (4/3)·π·216 = 288π ≈ 904.78. A = 4π·36 = 144π ≈ 452.39. ✓',
  'ch02p3_sphere',
  'formula_recall',
  ['sphere', 'volume', 'surface area', 'great circle', 'Archimedes', '4/3 pi r^3']
)

add(
  'How do you find the surface area and volume of a spherical cap (and zone/segment)?',
  '**Spherical cap**: portion of a sphere cut off by a plane; defined by cap height h and sphere radius r (or base radius a, with a² + (r − h)² = r² ⇒ a² = h(2r − h)). **Surface area of cap**: **A_cap = 2π·r·h** (NOT π·a²; that\'s the area of the flat base). **Volume of cap**: **V_cap = (π·h²/3)·(3r − h)**. **Spherical zone**: the curved surface between two parallel planes (heights h_1, h_2 from one end); area = 2π·r·(h_2 − h_1) (depends only on separation h = h_2 − h_1, not positions). **Spherical segment (or spherical frustum)**: the solid between two parallel planes; volume = (π·h/6)·(3a² + 3b² + h²), where a, b are the two base radii and h the height between them. **Example (cap)**: Sphere r = 10, cap h = 4. A = 2π·10·4 = 80π ≈ 251.33. V = (π·16/3)·(30 − 4) = (16π/3)·26 = 416π/3 ≈ 435.69. Base radius a = sqrt(4·16) = 8. ✓',
  'ch02p3_spherical_cap',
  'formula_recall',
  ['spherical cap', 'zone', 'segment', 'volume', 'surface area', '2 pi r h', 'sphere']
)

add(
  'How do you find the volume of intersection or union of spheres and other solids?',
  '**Sphere–sphere intersection (lens volume)**: Two spheres of radii R, r with centers distance d apart (|R − r| < d < R + r). The intersection is a "lens" (two spherical caps glued base-to-base). Volume formula: V = (π/(12d))·(R + r − d)²·(d² + 2d(R + r) − 3(R − r)²). **Sphere–cylinder intersection** (Steinmetz solid, when cylinder axis passes through sphere center, cylinder radius = a, sphere radius = R ≥ a): V = (16/3)·a²·sqrt(R² − a²)... actually for two perpendicular cylinders (bicylinder) of radius r: V = 16r³/3, surface area = 16r². **Sphere–cone intersection**: compute by integration in spherical or cylindrical coordinates. **Hemisphere**: half a sphere cut by a plane through the center; V = (2/3)·π·r³; A (curved) = 2π·r²; with flat circular base added: A = 3π·r². **Example (hemisphere, r = 5)**: V = (2/3)·π·125 = 250π/3 ≈ 261.80. Curved A = 50π ≈ 157.08; total A = 75π ≈ 235.62. ✓',
  'ch02p3_sphere_intersection',
  'problem_solving',
  ['sphere intersection', 'lens', 'Steinmetz', 'bicylinder', 'hemisphere', 'union volume']
)

add(
  'What is the great-circle distance between two points on a sphere?',
  'A **great circle** on a sphere of radius r is the intersection of the sphere with a plane through the center; it is the largest possible circle on the sphere and the **shortest path** between two points on the sphere\'s surface (geodesic). **Great-circle distance** (arc length) between two points on the sphere separated by central angle θ (angle at center between the two radius vectors): **d = r · θ** (θ in radians). If points have latitudes φ_1, φ_2 and longitudes λ_1, λ_2 (geographic), use the **spherical law of cosines** or **Haversine formula**: cos(θ) = sin(φ_1)·sin(φ_2) + cos(φ_1)·cos(φ_2)·cos(Δλ). **Haversine** (numerically stable for small distances): hav(θ) = hav(φ_2 − φ_1) + cos(φ_1)·cos(φ_2)·hav(Δλ), where hav(x) = sin²(x/2). **Example (Earth r ≈ 6371 km)**: Two points with central angle θ = π/4 (45°). Distance = 6371·π/4 ≈ 5004 km. **Example 2**: Same latitude φ_1 = φ_2 = 0 (equator), longitudes 0 and 90°. cos(θ) = 0 + 1·1·cos(90°) = 0 ⇒ θ = π/2. Distance = 6371·π/2 ≈ 10,008 km (one-quarter of circumference ≈ 40,030 km ✓). ✓',
  'ch02p3_great_circle_distance',
  'formula_recall',
  ['great circle', 'geodesic', 'sphere', 'Haversine', 'spherical law of cosines', 'latitude longitude']
)

// ============================================================
// SECTION 6 — 3D COORDINATE GEOMETRY: DISTANCE, MIDPOINT (2 items)
// ============================================================
add(
  'How do you compute distance and midpoint in 3D Cartesian coordinates?',
  '**Distance** between P_1 = (x_1, y_1, z_1) and P_2 = (x_2, y_2, z_2): **d = sqrt((x_2−x_1)² + (y_2−y_1)² + (z_2−z_1)²)** — 3D Pythagorean Theorem. **Midpoint**: **M = ((x_1+x_2)/2, (y_1+y_2)/2, (z_1+z_2)/2)**. **Section formula (internal ratio m:n)**: P = ((m·x_2+n·x_1)/(m+n), (m·y_2+n·y_1)/(m+n), (m·z_2+n·z_1)/(m+n)). **Centroid of a tetrahedron** (4 vertices): G = ((x_1+x_2+x_3+x_4)/4, ...). **Example (distance)**: (1, 2, 3) to (4, 6, 3) ⇒ d = sqrt(9 + 16 + 0) = 5. **Example (midpoint)**: (1, 2, 3) and (7, 8, 9) ⇒ M = (4, 5, 6). **Example (section 2:1, point closer to P_2)**: P = (2·7 + 1·1)/3 = 5; (2·8+1·2)/3 = 6; (2·9+1·3)/3 = 7 ⇒ (5, 6, 7). ✓',
  'ch02p3_distance_midpoint_3d',
  'formula_recall',
  ['3D distance', 'midpoint 3D', 'section formula', 'centroid tetrahedron', 'coordinates']
)

add(
  'How do you classify 3D figures using coordinate distances?',
  'Use distances between vertices. **Triangle types**: compute the three side lengths using 3D distance; classify as equilateral / isosceles / scalene / right (check a² + b² = c²). **Parallelogram**: check that opposite sides are equal AND diagonals bisect each other (midpoints coincide). **Rectangle**: parallelogram with equal diagonals. **Rhombus**: parallelogram with all four sides equal. **Square**: rectangle with all sides equal. **Tetrahedron**: 6 edge lengths; regular iff all 6 equal. **Right tetrahedron**: three edges at one vertex mutually perpendicular (so a² + b² + c² = d² where d is the space diagonal opposite, e.g., for vertices O=(0,0,0), A=(a,0,0), B=(0,b,0), C=(0,0,c), the opposite edge lengths satisfy AB² = a²+b², AC² = a²+c², BC² = b²+c², and OA²+OB²+OC²+...). **Example**: O=(0,0,0), A=(3,0,0), B=(0,4,0), C=(0,0,12). All three edges at O mutually perpendicular. OA = 3, OB = 4, OC = 12. Volume = (1/3)·(1/2·3·4)·12 = (1/3)·6·12 = 24. (Tri-rectangular tetrahedron.) ✓',
  'ch02p3_classify_3d_figures',
  'problem_solving',
  ['classify 3D', 'distance', 'tetrahedron', 'parallelogram', 'right tetrahedron', 'tri-rectangular']
)

add(
  'How do you test whether four points are coplanar in 3D?',
  'Four points A, B, C, D are **coplanar** iff the volume of the tetrahedron they form is zero, i.e., the scalar triple product of AB, AC, AD is zero: **AB · (AC × AD) = 0**, or equivalently **det|B−A; C−A; D−A| = 0** (3×3 determinant with each row a difference vector). **Geometric interpretation**: the three vectors AB, AC, AD are linearly dependent (one is in the plane of the other two). **Alternative test**: find the plane through A, B, C (using normal AB × AC), then check if D lies on it (substitute into plane equation). **Example**: A(1, 0, 0), B(0, 1, 0), C(0, 0, 1), D(1, 1, 1). AB = (−1, 1, 0), AC = (−1, 0, 1), AD = (0, 1, 1). AC × AD = (0·1 − 1·1, 1·0 − (−1)·1, (−1)·1 − 0·0) = (−1, 1, −1). AB · (AC × AD) = (−1)(−1) + 1·1 + 0·(−1) = 1 + 1 + 0 = 2 ≠ 0 ⇒ NOT coplanar (they form a proper tetrahedron with V = 2/6 = 1/3). **Example 2 (coplanar)**: A(0,0,0), B(1,0,0), C(0,1,0), D(1,1,0) (all z = 0). AB=(1,0,0), AC=(0,1,0), AD=(1,1,0). AC × AD = (0, 0, 1). AB · (AC × AD) = 0 ⇒ coplanar ✓.',
  'ch02p3_coplanarity_test',
  'problem_solving',
  ['coplanar', 'four points', 'scalar triple product', 'determinant', 'linearly dependent']
)

// ============================================================
// SECTION 7 — DIRECTION COSINES & RATIOS (3 items)
// ============================================================
add(
  'What are direction cosines and direction ratios of a line in 3D?',
  'For a directed line in 3D, the **direction cosines** (l, m, n) are the cosines of the angles α, β, γ the line makes with the positive x, y, z axes: l = cos α, m = cos β, n = cos γ. **Key identity**: **l² + m² + n² = 1** (since the line direction is a unit vector). **Direction ratios** (a, b, c): any three numbers proportional to (l, m, n) — i.e., a = k·l, b = k·m, c = k·n for some k ≠ 0. To get direction cosines from ratios: l = a/sqrt(a²+b²+c²), m = b/sqrt(...), n = c/sqrt(...) (sign chosen to match direction). **For a line through P_1(x_1,y_1,z_1) and P_2(x_2,y_2,z_2)**: direction ratios = (x_2−x_1, y_2−y_1, z_2−z_1); direction cosines = (x_2−x_1, y_2−y_1, z_2−z_1)/d, where d is the distance P_1P_2. **Example**: Line through (1, 2, 3) and (4, 6, 3): direction ratios (3, 4, 0); d = 5; direction cosines (3/5, 4/5, 0). Check: 9/25 + 16/25 + 0 = 1 ✓. Note: a line has two sets of direction cosines (opposite signs) — one per direction. ✓',
  'ch02p3_direction_cosines',
  'formula_recall',
  ['direction cosines', 'direction ratios', 'angles', 'unit vector', 'l^2 + m^2 + n^2 = 1']
)

add(
  'How do you find the angle between two lines using direction cosines/ratios?',
  'For two lines with direction cosines (l_1, m_1, n_1) and (l_2, m_2, n_2), the angle θ between them: **cos θ = |l_1·l_2 + m_1·m_2 + n_1·n_2|** (absolute value gives the acute angle). If direction ratios are (a_1, b_1, c_1) and (a_2, b_2, c_2), then **cos θ = |a_1·a_2 + b_1·b_2 + c_1·c_2| / (sqrt(a_1² + b_1² + c_1²) · sqrt(a_2² + b_2² + c_2²))**. **Perpendicular lines**: a_1·a_2 + b_1·b_2 + c_1·c_2 = 0 (dot product of direction vectors = 0). **Parallel lines**: a_1/a_2 = b_1/b_2 = c_1/c_2 (direction vectors proportional). **Example**: Lines with ratios (1, 2, 2) and (2, 1, −2). cos θ = |1·2 + 2·1 + 2·(−2)| / (sqrt(9)·sqrt(9)) = |2 + 2 − 4|/9 = 0 ⇒ θ = 90° (perpendicular ✓). **Example 2**: Ratios (1, 1, 1) and (2, 2, 2) ⇒ proportional ⇒ parallel. cos θ = |1·2 + 1·2 + 1·2|/(sqrt(3)·sqrt(12)) = 6/6 = 1 ⇒ θ = 0° ✓.',
  'ch02p3_angle_lines_3d',
  'problem_solving',
  ['angle between lines', 'direction cosines', 'dot product', 'perpendicular', 'parallel', '3D']
)

add(
  'How do you find the projection of a line segment on another line?',
  'The **projection** of segment P_1P_2 onto a line with direction cosines (l, m, n) is: **projection = (x_2 − x_1)·l + (y_2 − y_1)·m + (z_2 − z_1)·n** — the scalar projection (signed length along the line). Equivalently, projection of vector **v** onto unit direction **û** is **v · û**. **Projection of one segment on another**: if segment AB has direction ratios (a_1, b_1, c_1) and CD has (a_2, b_2, c_2), the projection of AB on the line of CD is |AB|·cos θ = |AB|·(a_1·a_2 + b_1·b_2 + c_1·c_2)/(|AB-direction|·|CD-direction|)·... Simplified: proj = (AB·CD)/|CD| where AB and CD are direction vectors. **Example**: Project segment from (1, 2, 3) to (4, 6, 3) (vector (3, 4, 0), length 5) onto the x-axis (direction (1, 0, 0)): proj = 3·1 + 4·0 + 0·0 = 3. So the projection of length 5 along x-axis is 3 (consistent: the x-component is 3). **Example 2**: Project same segment onto direction (3, 4, 0)/5 (itself): proj = (3·3 + 4·4 + 0)/5 = 25/5 = 5 (full length ✓). ✓',
  'ch02p3_projection_segment',
  'problem_solving',
  ['projection', 'line segment', 'dot product', 'direction cosines', 'scalar projection']
)

// ============================================================
// SECTION 8 — EQUATION OF LINE IN 3D (3 items)
// ============================================================
add(
  'What are the vector, parametric, and symmetric (Cartesian) forms of a line in 3D?',
  'A line in 3D requires a point and a direction. Let A = (x_0, y_0, z_0) be on the line, with direction vector **d** = (a, b, c) (or direction ratios a, b, c). **Vector form**: **r = r_0 + t·d**, where r = (x, y, z), r_0 = (x_0, y_0, z_0), t ∈ R. **Parametric form**: **x = x_0 + a·t, y = y_0 + b·t, z = z_0 + c·t** (t parameter). **Symmetric (Cartesian) form** (assuming a, b, c all nonzero): **(x − x_0)/a = (y − y_0)/b = (z − z_0)/c = t**. (If any of a, b, c is zero, that variable is constant; e.g., if c = 0 then z = z_0 and (x − x_0)/a = (y − y_0)/b.) **Two-point form**: Line through (x_1, y_1, z_1) and (x_2, y_2, z_2): (x − x_1)/(x_2 − x_1) = (y − y_1)/(y_2 − y_1) = (z − z_1)/(z_2 − z_1). **Example**: Through (2, −1, 3) with direction (1, 2, −1). Parametric: x = 2 + t, y = −1 + 2t, z = 3 − t. Symmetric: (x − 2)/1 = (y + 1)/2 = (z − 3)/(−1). ✓',
  'ch02p3_line_3d_forms',
  'formula_recall',
  ['line 3D', 'vector form', 'parametric', 'symmetric', 'Cartesian', 'two-point']
)

add(
  'How do you find the angle and shortest distance between two lines in 3D?',
  '**Angle** between lines with direction vectors d_1, d_2: cos θ = |d_1 · d_2| / (|d_1|·|d_2|). **Shortest distance between two skew lines** (or parallel lines): for skew lines r = r_1 + t·d_1 and r = r_2 + s·d_2, distance = **|((r_2 − r_1) · (d_1 × d_2))| / |d_1 × d_2|**. (Numerator: scalar triple product; denominator: magnitude of cross product.) **For parallel lines** (d_1 ∥ d_2): distance = |(r_2 − r_1) × d_1| / |d_1|. **For intersecting lines**: distance = 0. **Example (skew lines)**: L_1: through (1, 0, 0) dir (1, 0, 0); L_2: through (0, 1, 1) dir (0, 1, 0). d_1 × d_2 = (0, 0, 1). r_2 − r_1 = (−1, 1, 1). Triple product = (−1, 1, 1) · (0, 0, 1) = 1. Distance = 1/1 = 1. **Example (parallel)**: L_1 through (0,0,0) dir (1,0,0); L_2 through (0, 3, 4) dir (1, 0, 0). Distance = |(0,3,4) × (1,0,0)| / |(1,0,0)| = |(0, 4, −3)|/1 = 5. ✓',
  'ch02p3_skew_lines_distance',
  'problem_solving',
  ['skew lines', 'angle between lines', 'shortest distance', 'triple product', 'parallel']
)

add(
  'How do you find where a line intersects a plane or another line in 3D?',
  '**Line–plane intersection**: substitute the parametric line equations into the plane equation, solve for t, then substitute back. **Line–line intersection**: solve the system of three parametric equations; if a consistent (t, s) exists, lines intersect; otherwise they are skew (or parallel). **Example (line–plane)**: Line x = 1 + t, y = 2 − t, z = 3 + 2t. Plane 2x + y − z = 5. Substitute: 2(1+t) + (2−t) − (3+2t) = 5 ⇒ 2 + 2t + 2 − t − 3 − 2t = 5 ⇒ 1 − t = 5 ⇒ t = −4. Intersection point: (1−4, 2+4, 3−8) = (−3, 6, −5). Check: 2(−3) + 6 − (−5) = −6 + 6 + 5 = 5 ✓. **Example (line–line)**: L_1: x = 1 + t, y = 2 − t, z = 3 + t. L_2: x = 4 + s, y = 1 + 2s, z = 5 + 2s. System: 1+t = 4+s; 2−t = 1+2s; 3+t = 5+2s. From (1) t = 3+s. Sub (2): 2 − (3+s) = 1+2s ⇒ −1 − s = 1+2s ⇒ s = −2/3, t = 7/3. Check (3): 3 + 7/3 = 5 + 2·(−2/3) = 5 − 4/3 = 11/3? LHS: 3 + 7/3 = 16/3; RHS: 11/3. Not equal ⇒ skew (no intersection). ✓',
  'ch02p3_line_plane_intersection',
  'problem_solving',
  ['line plane intersection', 'line line intersection', 'parametric', 'solve', 'skew']
)

// ============================================================
// SECTION 9 — EQUATION OF PLANE IN 3D (3 items)
// ============================================================
add(
  'What are the standard, general, and intercept forms of a plane in 3D?',
  'A plane in 3D requires a point and a normal vector, or three non-collinear points. **Standard (point-normal) form**: A plane through (x_0, y_0, z_0) with normal **n** = (A, B, C) has equation **A(x − x_0) + B(y − y_0) + C(z − z_0) = 0**. **General form**: **Ax + By + Cz + D = 0**, where (A, B, C) is the normal vector (D = −A·x_0 − B·y_0 − C·z_0). **Intercept form**: **x/a + y/b + z/c = 1**, where a, b, c are the x-, y-, z-intercepts respectively (all nonzero). **Three-point form**: Plane through (x_1,y_1,z_1), (x_2,y_2,z_2), (x_3,y_3,z_3): det|x−x_1 y−y_1 z−z_1; x_2−x_1 y_2−y_1 z_2−z_1; x_3−x_1 y_3−y_1 z_3−z_1| = 0 (or compute normal = (P_2−P_1) × (P_3−P_1)). **Example**: Through (1, 2, 3) with normal (2, −1, 4): 2(x−1) − 1(y−2) + 4(z−3) = 0 ⇒ 2x − y + 4z − 12 = 0. **Example (intercept)**: Intercepts 3, −2, 6 ⇒ x/3 − y/2 + z/6 = 1 ⇒ 2x − 3y + z = 6. ✓',
  'ch02p3_plane_forms',
  'formula_recall',
  ['plane 3D', 'point normal', 'general form', 'intercept form', 'three point', 'normal vector']
)

add(
  'How do you find the angle between two planes and between a line and a plane?',
  '**Angle between two planes**: equals the angle between their normal vectors. For planes with normals n_1, n_2: **cos θ = |n_1 · n_2| / (|n_1|·|n_2|)** (acute angle, hence absolute value). **Perpendicular planes**: n_1 · n_2 = 0. **Parallel planes**: n_1 ∥ n_2 (proportional components). **Angle between a line and a plane**: 90° minus the angle between the line\'s direction d and the plane\'s normal n. **sin θ = |d · n| / (|d|·|n|)**, where θ is the angle between the line and the plane (0 ≤ θ ≤ 90°). **Line parallel to plane**: d · n = 0 (direction perpendicular to normal). **Line perpendicular to plane**: d ∥ n. **Example (planes)**: Planes x + 2y + 2z = 5 and 2x − y + 2z = 3. Normals (1, 2, 2), (2, −1, 2). cos θ = |1·2 + 2·(−1) + 2·2| / (sqrt(9)·sqrt(9)) = |2 − 2 + 4|/9 = 4/9 ⇒ θ ≈ 63.6°. **Example (line-plane)**: Line dir (1, 2, 2), plane normal (2, −1, 2). sin θ = |2 − 2 + 4|/(3·3) = 4/9 ⇒ θ ≈ 26.4°. ✓',
  'ch02p3_angle_planes',
  'formula_recall',
  ['angle between planes', 'angle between line and plane', 'normal vectors', 'perpendicular', 'parallel']
)

add(
  'How do you find the distance from a point to a plane in 3D?',
  '**Distance from point (x_0, y_0, z_0) to plane Ax + By + Cz + D = 0**: **d = |A·x_0 + B·y_0 + C·z_0 + D| / sqrt(A² + B² + C²)**. (3D analog of the 2D point-line distance; derived by projecting the vector from a point on the plane to (x_0, y_0, z_0) onto the unit normal.) **Distance between two parallel planes** Ax + By + Cz + D_1 = 0 and Ax + By + Cz + D_2 = 0: **d = |D_2 − D_1| / sqrt(A² + B² + C²)** (or pick a point on one plane and apply the point-to-plane formula). **Example**: Point (1, 2, 3), plane 2x − 3y + 6z + 5 = 0. d = |2·1 − 3·2 + 6·3 + 5|/sqrt(4 + 9 + 36) = |2 − 6 + 18 + 5|/7 = 19/7 ≈ 2.714. **Example (parallel planes)**: 3x + 4y + 12z = 5 and 3x + 4y + 12z = 26. d = |26 − 5|/13 = 21/13 ≈ 1.615. ✓',
  'ch02p3_point_plane_distance',
  'formula_recall',
  ['distance point to plane', '3D', 'normal', 'parallel planes distance', 'projection']
)

add(
  'How do you find the line of intersection of two planes?',
  'Two non-parallel planes (normals not proportional) intersect in a line. **Procedure**: (1) Solve the two plane equations simultaneously to express two variables in terms of the third (the parameter). (2) Read off a point (set parameter = 0, solve for the other two) and a direction vector. **Direction vector**: cross product of the two normal vectors: **d = n_1 × n_2** (this is perpendicular to both normals, hence lies in both planes). **Example**: Planes x + y + z = 6 and 2x − y + 3z = 9. Normals n_1 = (1, 1, 1), n_2 = (2, −1, 3). Direction = n_1 × n_2 = (1·3 − 1·(−1), 1·2 − 1·3, 1·(−1) − 1·2) = (4, −1, −3). To find a point: subtract 2×(eqn 1) from eqn 2: (2x − y + 3z) − 2(x + y + z) = 9 − 12 ⇒ −3y + z = −3 ⇒ z = 3y − 3. Substitute into eqn 1: x + y + (3y − 3) = 6 ⇒ x = 9 − 4y. Let y = 0 (free): x = 9, z = −3. Point (9, 0, −3). Line: r = (9, 0, −3) + t·(4, −1, −3). Parametric: x = 9 + 4t, y = −t, z = −3 − 3t. Check both planes: Plane 1: (9+4t) + (−t) + (−3−3t) = 6 ✓. Plane 2: 2(9+4t) − (−t) + 3(−3−3t) = 18 + 8t + t − 9 − 9t = 9 ✓. ✓',
  'ch02p3_intersection_two_planes',
  'problem_solving',
  ['intersection two planes', 'line of intersection', 'cross product normals', 'solve system', 'direction vector']
)

// ============================================================
// SECTION 10 — VECTOR GEOMETRY BASICS (4 items)
// ============================================================
add(
  'What is a position vector and how do you perform vector arithmetic geometrically?',
  'A **position vector** of a point P(x, y, z) is the vector **OP** = (x, y, z) from the origin O to P. **Vector AB** = position vector of B minus position vector of A = (x_B − x_A, y_B − y_A, z_B − z_A). **Addition** (parallelogram or triangle law): a + b is the diagonal of the parallelogram formed by a and b. **Subtraction**: a − b = a + (−b) (geometrically, the vector from tip of b to tip of a when both tails coincide). **Scalar multiplication**: k·a has length |k|·|a|, same direction if k > 0, opposite if k < 0. **Magnitude (length)**: |a| = sqrt(a_x² + a_y² + a_z²). **Unit vector** in direction of a: â = a/|a|. **Standard basis**: **i** = (1, 0, 0), **j** = (0, 1, 0), **k** = (0, 0, 1); any vector a = a_x·i + a_y·j + a_z·k. **Example**: a = (3, 4, 0). |a| = 5. Unit vector: (3/5, 4/5, 0). b = (1, 0, 2). a + b = (4, 4, 2). a − b = (2, 4, −2). ✓',
  'ch02p3_position_vector',
  'formula_recall',
  ['position vector', 'vector arithmetic', 'magnitude', 'unit vector', 'i j k basis', 'addition']
)

add(
  'What is the dot (scalar) product and its geometric meaning?',
  '**Dot product** of a = (a_1, a_2, a_3) and b = (b_1, b_2, b_3): **a · b = a_1·b_1 + a_2·b_2 + a_3·b_3** (a scalar). **Geometric**: **a · b = |a|·|b|·cos θ**, where θ is the angle between a and b (0 ≤ θ ≤ π). **Properties**: commutative (a · b = b · a); distributive (a · (b + c) = a·b + a·c); a · a = |a|²; **a ⊥ b iff a · b = 0**. **Angle formula**: cos θ = (a · b) / (|a|·|b|). **Projection** of a onto b: proj_b(a) = (a · b / |b|²)·b (vector); scalar projection = (a · b)/|b|. **Work** (physics): W = F · d. **Example**: a = (1, 2, 2), b = (2, 1, −2). a · b = 2 + 2 − 4 = 0 ⇒ perpendicular ✓. **Example 2**: a = (1, 2, 3), b = (4, 0, 0). a · b = 4. |a| = sqrt(14), |b| = 4. cos θ = 4/(4·sqrt(14)) = 1/sqrt(14) ≈ 0.267 ⇒ θ ≈ 74.5°. Projection of a on b: (4/16)·(4, 0, 0) = (1, 0, 0). ✓',
  'ch02p3_dot_product',
  'formula_recall',
  ['dot product', 'scalar product', 'cos theta', 'projection', 'perpendicular', 'work']
)

add(
  'What is the cross (vector) product and its geometric meaning?',
  '**Cross product** of a = (a_1, a_2, a_3) and b = (b_1, b_2, b_3): **a × b = (a_2·b_3 − a_3·b_2, a_3·b_1 − a_1·b_3, a_1·b_2 − a_2·b_1)** — the formal determinant |i j k; a_1 a_2 a_3; b_1 b_2 b_3|. **Geometric**: a × b is **perpendicular to both a and b** (direction by right-hand rule), with **magnitude |a × b| = |a|·|b|·sin θ**, where θ is the angle between a and b. **Area interpretation**: |a × b| = area of parallelogram with sides a, b. **Area of triangle** with sides a, b: (1/2)·|a × b|. **Properties**: anti-commutative (a × b = −(b × a)); a × a = 0; **a ∥ b iff a × b = 0**; NOT associative but distributive (a × (b + c) = a×b + a×c). **Standard cross products**: i × j = k, j × k = i, k × i = j (cyclic); reverse gives negative. **Example**: a = (1, 2, 3), b = (4, 5, 6). a × b = (12−15, 12−6, 5−8) = (−3, 6, −3). |a × b| = sqrt(9 + 36 + 9) = sqrt(54) = 3·sqrt(6) ≈ 7.348. Area of parallelogram = 3·sqrt(6); triangle = 3·sqrt(6)/2 ≈ 3.674. ✓',
  'ch02p3_cross_product',
  'formula_recall',
  ['cross product', 'vector product', 'sin theta', 'perpendicular', 'area parallelogram', 'right hand rule']
)

add(
  'How are dot and cross products used to compute angles, areas, and projections?',
  'Combine dot and cross to extract full geometric information. **Angle θ between vectors a, b**: cos θ = (a · b)/(|a||b|); sin θ = |a × b|/(|a||b|); tan θ = |a × b|/(a · b). **Area of triangle ABC**: (1/2)·|(B − A) × (C − A)|. **Volume of parallelepiped** with edges a, b, c: |a · (b × c)| (scalar triple product). **Volume of tetrahedron** ABCD: (1/6)·|(B − A) · ((C − A) × (D − A))|. **Projection of a on b**: vector = (a · b/|b|²)·b; scalar = a · b/|b|. **Perpendicular component** of a relative to b: a − proj_b(a) = a − (a · b/|b|²)·b. **Example**: Triangle A(1,1,1), B(2,0,1), C(1,2,0). AB = (1, −1, 0); AC = (0, 1, −1). AB × AC = ((−1)(−1) − 0·1, 0·0 − 1·(−1), 1·1 − (−1)·0) = (1, 1, 1). Area = (1/2)·sqrt(3) ≈ 0.866. **Example**: Tetrahedron A(0,0,0), B(1,0,0), C(0,1,0), D(0,0,1). AB = (1,0,0), AC = (0,1,0), AD = (0,0,1). (AC × AD) = (1, 0, 0). AB · (AC × AD) = 1. Volume = 1/6 ≈ 0.167. ✓',
  'ch02p3_vector_applications',
  'problem_solving',
  ['dot cross product', 'angle', 'area triangle', 'projection', 'perpendicular component']
)

// ============================================================
// SECTION 11 — SCALAR TRIPLE PRODUCT & VOLUMES (3 items)
// ============================================================
add(
  'What is the scalar triple product and how is it used to compute volumes?',
  '**Scalar triple product** of vectors a, b, c: **[a, b, c] = a · (b × c)** (a scalar). **Geometric meaning**: |[a, b, c]| = volume of the parallelepiped formed by a, b, c as adjacent edges. **Volume of tetrahedron** with vertices at origin, a, b, c: V = (1/6)·|[a, b, c]|. **In determinant form**: [a, b, c] = det|a_1 a_2 a_3; b_1 b_2 b_3; c_1 c_2 c_3|. **Properties**: (1) Cyclic permutation: a·(b×c) = b·(c×a) = c·(a×b). (2) Swapping two vectors changes sign: a·(b×c) = −b·(a×c). (3) **Coplanarity test**: a, b, c coplanar iff [a, b, c] = 0. (4) [a, b, c] = 0 also iff a, b, c linearly dependent. **Example**: a = (1, 0, 0), b = (0, 1, 0), c = (0, 0, 1). b × c = (1, 0, 0). a · (b × c) = 1. Volume of unit cube = 1 ✓. Tetrahedron volume = 1/6. **Example (coplanar)**: a = (1, 2, 3), b = (2, 4, 6) = 2a, c = (1, 1, 1). Triple product = 0 (b is a scalar multiple of a, so all three are linearly dependent and coplanar). ✓',
  'ch02p3_scalar_triple_product',
  'formula_recall',
  ['scalar triple product', 'parallelepiped', 'volume', 'tetrahedron', 'coplanarity', 'determinant']
)

add(
  'How do you compute the volume of a parallelepiped and tetrahedron given vertex coordinates?',
  '**Parallelepiped** with one vertex at A and adjacent vertices B, C, D (edges AB, AC, AD): Volume = |(AB) · ((AC) × (AD))|. **Tetrahedron** with vertices A, B, C, D: Volume = (1/6)·|(AB) · ((AC) × (AD))| = (1/6)·|det[B−A; C−A; D−A]| (where each row is the coordinate triple). **Equivalent formula** (any vertex as origin): V_tet = (1/6)·|det|x_B−x_A y_B−y_A z_B−z_A; x_C−x_A y_C−y_A z_C−z_A; x_D−x_A y_D−y_A z_D−z_A|. **Example**: Tetrahedron A(1, 1, 1), B(3, 1, 1), C(1, 3, 1), D(1, 1, 3). AB = (2, 0, 0), AC = (0, 2, 0), AD = (0, 0, 2). AC × AD = (4, 0, 0). AB · (AC × AD) = 8. Volume = 8/6 = 4/3 ≈ 1.333. (This is a regular tetrahedron scaled... actually with edges AB=2, AC=2, AD=2, BC = 2·sqrt(2), BD = 2·sqrt(2), CD = 2·sqrt(2) — not regular. It\'s a "right tetrahedron" with 3 mutually perpendicular edges of length 2. Volume = (1/3)·base·height = (1/3)·(1/2·2·2)·2 = 4/3 ✓.) **Example 2**: A(0,0,0), B(2,0,0), C(0,3,0), D(0,0,5). AB=(2,0,0), AC=(0,3,0), AD=(0,0,5). AC × AD = (15, 0, 0). AB · (...) = 30. V_tet = 30/6 = 5. ✓',
  'ch02p3_volume_tetrahedron',
  'problem_solving',
  ['tetrahedron volume', 'parallelepiped volume', 'vertices', 'determinant', 'scalar triple']
)

add(
  'What is the vector triple product and its identity?',
  '**Vector triple product**: a × (b × c) — a vector. **Jacobi identity (BAC-CAB rule)**: **a × (b × c) = b·(a · c) − c·(a · b)**. (Memory aid: "BAC − CAB".) **Note**: (a × b) × c = −c × (a × b) = −[a·(b·c) − b·(a·c)] = b·(a·c) − a·(b·c). (Generally NOT equal to a × (b × c) — cross product is not associative.) **Application**: Decompose a vector into components parallel and perpendicular to another. If e is a unit vector along some direction, then for any a: a = (a·e)e + (e × a) × e (parallel + perpendicular parts). **Proof of BAC-CAB**: by direct component computation. **Example**: a = (1, 0, 0), b = (0, 1, 0), c = (0, 0, 1). b × c = (1, 0, 0). a × (b × c) = (1, 0, 0) × (1, 0, 0) = (0, 0, 0). Check RHS: b·(a · c) − c·(a · b) = (0,1,0)·0 − (0,0,1)·0 = 0 ✓. **Example 2**: a = (1, 2, 3), b = (1, 0, 0), c = (0, 1, 0). b × c = (0, 0, 1). a × (b × c) = (1, 2, 3) × (0, 0, 1) = (2·1 − 3·0, 3·0 − 1·1, 1·0 − 2·0) = (2, −1, 0). RHS: b·(a · c) − c·(a · b) = (1,0,0)·2 − (0,1,0)·1 = (2, 0, 0) − (0, 1, 0) = (2, −1, 0) ✓.',
  'ch02p3_vector_triple_product',
  'formula_recall',
  ['vector triple product', 'BAC CAB', 'Jacobi identity', 'decompose', 'non associative']
)

// ============================================================
// SECTION 12 — MIXED PROBLEM SOLVING (3 items)
// ============================================================
add(
  'How do you find the foot of perpendicular from a point to a line in 3D?',
  'Given point P and line L: r = r_0 + t·d. The foot Q of perpendicular from P to L is the point on L closest to P. **Method 1 (parametric)**: Q = r_0 + t·d, where t is chosen so that (P − Q) ⊥ d, i.e., (P − r_0 − t·d)·d = 0 ⇒ t = ((P − r_0) · d) / (d · d). Then Q = r_0 + t·d. **Method 2 (projection)**: project P − r_0 onto d: t = (P − r_0) · d/|d|². **Distance** from P to L: |P − Q| = |(P − r_0) × d| / |d|. **Example**: P = (1, 1, 1). Line through (0, 0, 0) with direction (1, 2, 2). t = ((1,1,1)·(1,2,2))/(1+4+4) = (1 + 2 + 2)/9 = 5/9. Q = (5/9, 10/9, 10/9). Distance = |(1,1,1) × (1,2,2)|/|(1,2,2)| = |(2·1 − 1·2, 1·1 − 1·2, 1·2 − 1·1)|/3 = |(0, −1, 1)|/3 = sqrt(2)/3 ≈ 0.471. Check: |P − Q| = |(1 − 5/9, 1 − 10/9, 1 − 10/9)| = |(4/9, −1/9, −1/9)| = sqrt(16 + 1 + 1)/9 = sqrt(18)/9 = 3·sqrt(2)/9 = sqrt(2)/3 ✓.',
  'ch02p3_point_line_perpendicular',
  'problem_solving',
  ['point to line', 'foot of perpendicular', '3D', 'projection', 'closest point']
)

add(
  'How do you find the equation of a plane containing a line and a point, or two parallel lines?',
  '**Plane containing a line L (r = r_0 + t·d) and a point P (not on L)**: The plane contains the direction d and the vector (P − r_0). Normal = d × (P − r_0). Plane: ((r − r_0) · (d × (P − r_0)) = 0, or via the three-point form using r_0, r_0 + d, P. **Plane containing two parallel lines** (L_1 through r_1 dir d, L_2 through r_2 dir d): direction d and vector (r_2 − r_1) span the plane; normal = d × (r_2 − r_1). **Plane containing two intersecting lines** (L_1 dir d_1, L_2 dir d_2, intersecting): normal = d_1 × d_2; plane through the intersection point. **Example**: Plane containing line x = 1 + t, y = 2 − t, z = 3 + t (r_0 = (1,2,3), d = (1, −1, 1)) and point P = (4, 0, 0). Vector P − r_0 = (3, −2, −3). Normal = d × (P − r_0) = ((−1)(−3) − 1·(−2), 1·3 − 1·(−3), 1·(−2) − (−1)·3) = (3 + 2, 3 + 3, −2 + 3) = (5, 6, 1). Plane: 5(x − 1) + 6(y − 2) + 1(z − 3) = 0 ⇒ 5x + 6y + z − 20 = 0. Check P: 5·4 + 6·0 + 0 − 20 = 0 ✓. Check r_0: 5 + 12 + 3 − 20 = 0 ✓. Check r_0 + d = (2, 1, 4): 10 + 6 + 4 − 20 = 0 ✓.',
  'ch02p3_plane_line_point',
  'problem_solving',
  ['plane containing line', 'plane containing point', 'two parallel lines', 'normal vector', 'cross product']
)

add(
  'How do you find the image (reflection) of a point across a plane in 3D?',
  'To reflect point P = (x_0, y_0, z_0) across plane Ax + By + Cz + D = 0: (1) Find the foot of perpendicular Q from P to the plane. (2) The image P\' = 2Q − P (Q is midpoint of P and P\'). **Closed formula**: P\' = P − 2·(A·x_0 + B·y_0 + C·z_0 + D)/(A² + B² + C²) · (A, B, C). **Example**: Reflect P = (1, 1, 1) across plane x + y + z = 6 (i.e., x + y + z − 6 = 0). Signed distance factor: (1 + 1 + 1 − 6)/(1 + 1 + 1) = −3/3 = −1. P\' = (1, 1, 1) − 2·(−1)·(1, 1, 1) = (1, 1, 1) + (2, 2, 2) = (3, 3, 3). Check: midpoint of P and P\' = (2, 2, 2) is on plane (2+2+2 = 6 ✓); PP\' direction (1,1,1) is normal to plane ✓. **Example 2**: Reflect P = (2, 0, 0) across plane 2x + 3y + 6z = 7. Factor: (2·2 + 0 + 0 − 7)/(4 + 9 + 36) = (4 − 7)/49 = −3/49. P\' = (2, 0, 0) − 2·(−3/49)·(2, 3, 6) = (2 + 12/49, 18/49, 36/49) = (110/49, 18/49, 36/49). ✓',
  'ch02p3_reflection_plane',
  'problem_solving',
  ['reflection', 'image point', 'across plane', 'mirror', 'normal', 'foot of perpendicular']
)

add(
  'How do you find the orthogonal projection of a point onto a plane and onto a line?',
  '**Projection of point P onto plane π (Ax + By + Cz + D = 0)** — the foot Q of the perpendicular from P to π: **Q = P − ((A·x_0 + B·y_0 + C·z_0 + D)/(A² + B² + C²)) · (A, B, C)**. (Move P along the normal direction by the signed distance.) **Projection of point P onto line L (r = r_0 + t·d)**: Q = r_0 + ((P − r_0) · d / (d · d)) · d. **Vector projection of a onto b** (general): proj_b(a) = (a · b / |b|²) · b. **Component (scalar) projection**: a · b/|b|. **Application**: decompose a vector into parallel and perpendicular parts relative to a direction; find closest point on a curve/surface to a given point. **Example (point to plane)**: P = (3, 4, 5), plane x + y + z = 6 (i.e., x + y + z − 6 = 0). Factor = (3 + 4 + 5 − 6)/(1 + 1 + 1) = 6/3 = 2. Q = (3, 4, 5) − 2·(1, 1, 1) = (1, 2, 3). Check: Q on plane? 1 + 2 + 3 = 6 ✓. P − Q = (2, 2, 2) is parallel to normal (1,1,1) ✓. **Example (point to line)**: P = (1, 1, 1), line through (0, 0, 0) with direction (3, 4, 0). t = ((1,1,1)·(3,4,0))/(9+16+0) = 7/25. Q = (0,0,0) + (7/25)·(3,4,0) = (21/25, 28/25, 0). Distance = sqrt((1−21/25)² + (1−28/25)² + 1) = sqrt((4/25)² + (−3/25)² + 1) = sqrt(16/625 + 9/625 + 625/625) = sqrt(650/625) = sqrt(26)/5 ≈ 1.02. ✓',
  'ch02p3_orthogonal_projection',
  'problem_solving',
  ['orthogonal projection', 'point onto plane', 'point onto line', 'vector projection', 'closest point']
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
    console.error('SUSPICIOUSLY SHORT ANSWER:', it.topic)
    process.exit(1)
  }
}

const output = {
  generatedAt: new Date().toISOString(),
  totalItems: items.length,
  subject: 'mathematics_formulas_volume_9_chapter_02_part_03',
  volume:
    'Volume 9 — Comprehensive Formula Encyclopedia, Chapter 2 Part 3 (Solid / 3D Geometry — Polyhedra & Euler\'s Formula; Platonic Solids: Tetrahedron, Cube, Octahedron, Dodecahedron, Icosahedron; Prisms & Cylinders: Volume, Lateral & Total Surface Area, Oblique & Truncated Forms; Pyramids & Cones: Volume, Slant Height, Lateral & Total Surface Area; Frustum Volume & Area; Spheres: Volume, Surface Area, Spherical Cap/Zone/Segment, Great Circle, Sphere Intersections; 3D Coordinate Geometry: Distance, Midpoint, Direction Cosines/Ratios, Equation of Line (Vector/Parametric/Symmetric), Equation of Plane (Point-Normal/General/Intercept), Angle Between Lines/Planes, Distance from Point to Plane, Reflection Across Plane; Vector Geometry: Position Vector, Dot Product, Cross Product, Scalar Triple Product, Volume of Parallelepiped & Tetrahedron, Vector Triple Product & BAC-CAB)',
  source: 'TRIZA Generated Formula Dataset',
  language: 'en',
  religionNeutral: true,
  items,
}

mkdirSync('data', { recursive: true })
writeFileSync('data/math-formulas-vol9-ch02p3.json', JSON.stringify(output, null, 2))

console.log(`Wrote data/math-formulas-vol9-ch02p3.json with ${items.length} items.`)
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
