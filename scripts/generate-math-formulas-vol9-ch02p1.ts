/**
 * ============================================================
 *  Mathematics Formula Encyclopedia — Volume 9
 *  Comprehensive Formula Reference
 *  Chapter 2 — Part 1 (Plane / Euclidean Geometry)
 *  Points, Lines, Planes, Segments, Rays;
 *  Angles & Angle Pairs; Parallel & Perpendicular Lines;
 *  Triangles (Classification, Congruence SSS/SAS/ASA/AAS/HL,
 *    Similarity AA/SAS/SSS, Pythagorean Theorem & Converse,
 *    Special Right Triangles, Triangle Inequality, Cevians,
 *    Centers, Heron's Formula);
 *  Quadrilaterals (Parallelogram, Rectangle, Rhombus, Square,
 *    Trapezoid, Kite);
 *  Polygons (Interior/Exterior Angles, Regular Polygon, Apothem);
 *  Circles (Parts, Arcs, Central/Inscribed Angles, Arc Length,
 *    Sector & Segment Area, Power of a Point);
 *  Transformations (Translation, Rotation, Reflection,
 *    Glide Reflection, Dilation, Symmetry)
 *  Generator for TRIZA
 * ============================================================
 *
 *  Output: data/math-formulas-vol9-ch02p1.json
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
// SECTION 1 — POINTS, LINES, PLANES, SEGMENTS, RAYS (5 items)
// ============================================================
add(
  'What are the undefined terms of Euclidean geometry: point, line, and plane?',
  'In Euclidean (Hilbert-style) geometry, **point**, **line**, and **plane** are primitive/undefined terms — they are described only by their properties (axioms) rather than defined in terms of simpler concepts. A **point** has location but no size (zero-dimensional). A **line** is a one-dimensional straight extent that extends infinitely in two directions; through any two distinct points there is exactly one line. A **plane** is a two-dimensional flat surface extending infinitely; through any three non-collinear points there is exactly one plane. **Postulates** (e.g., Euclid\'s five) govern incidence, order, congruence, parallels. **Example**: Given points A and B, the unique line is denoted AB (or ↔AB); given non-collinear A, B, C the unique plane is denoted ABC. ✓',
  'ch02p1_undefined_terms',
  'formula_recall',
  ['point', 'line', 'plane', 'undefined terms', 'Euclidean geometry', 'axioms']
)

add(
  'What is the difference between a line segment, a ray, and a line?',
  '**Line segment** AB (denoted AB with a bar or simply |AB| for length): the part of a line between two endpoints A and B; it has finite length |AB| but no direction. **Ray** AB (denoted →AB): the part of a line starting at A and extending through B forever in one direction; it has one endpoint (the initial point) and is named with the endpoint first. **Line** ↔AB: extends infinitely in both directions, no endpoints. **Notation**: segment AB, ray AB (A is endpoint), line AB. **Example**: For A=(0,0), B=(3,0): segment AB has length 3; ray AB is {(x,0): x >= 0}; line AB is the entire x-axis {(x,0): x in R}. ✓',
  'ch02p1_segment_ray_line',
  'formula_recall',
  ['segment', 'ray', 'line', 'endpoint', 'notation', 'finite', 'infinite']
)

add(
  'What are collinear and coplanar points, and how are they tested in coordinates?',
  '**Collinear**: three or more points lie on the same line. **Coplanar**: four or more points lie in the same plane. **Test for collinearity** (3 points): vectors AB and AC are parallel — i.e., the slope of AB equals the slope of AC, or equivalently the determinant |x_B−x_A, y_B−y_A; x_C−x_A, y_C−y_A| = 0 (i.e., (x_B−x_A)(y_C−y_A) − (y_B−y_A)(x_C−x_A) = 0). **Example**: A=(1,2), B=(3,5), C=(5,8). Slope AB = (5−2)/(3−1) = 3/2; slope AC = (8−2)/(5−1) = 6/4 = 3/2. Equal ⇒ collinear. (Indeed C = A + 2(B−A).) ✓',
  'ch02p1_collinear_coplanar',
  'problem_solving',
  ['collinear', 'coplanar', 'slope test', 'determinant', 'parallel vectors']
)

add(
  'What are intersecting, parallel, and skew lines, and how do they differ?',
  'Two lines in 3D space relate in one of three ways. **Intersecting**: share exactly one point (coplanar). **Parallel**: coplanar and never meet (same direction vector). **Skew**: not coplanar, not parallel, do not intersect (only possible in 3D+). In 2D, every pair of distinct lines is either intersecting or parallel (no skew). **Example (2D)**: y = 2x+1 and y = 2x+5 are parallel (same slope, different intercepts); y = 2x+1 and y = −x+3 intersect at the solution of 2x+1 = −x+3 ⇒ x = 2/3, y = 7/3. **Example (3D skew)**: L_1: (t, 0, 0) and L_2: (0, s, 1) — different directions, never meet, not parallel. ✓',
  'ch02p1_intersecting_parallel_skew',
  'factual_question',
  ['intersecting', 'parallel', 'skew', 'coplanar', '2D', '3D']
)

add(
  'What are the segment addition and midpoint postulates?',
  '**Segment Addition Postulate**: If B lies between A and C on a line, then **AB + BC = AC**. **Midpoint**: M is the midpoint of AB iff AM = MB = (1/2)AB. In coordinates, midpoint of A=(x_1,y_1) and B=(x_2,y_2) is **M = ((x_1+x_2)/2, (y_1+y_2)/2)**. **Example**: A=(−2, 1), B=(4, 9). Midpoint M = ((−2+4)/2, (1+9)/2) = (1, 5). Check: AM = sqrt((1+2)^2 + (5−1)^2) = sqrt(9+16) = 5; MB = sqrt((4−1)^2 + (9−5)^2) = sqrt(9+16) = 5. ✓ Equal ⇒ M is midpoint, and AB = 2·5 = 10.',
  'ch02p1_segment_addition_midpoint',
  'formula_recall',
  ['segment addition', 'midpoint', 'between', 'postulate', 'coordinate midpoint']
)

// ============================================================
// SECTION 2 — ANGLES & ANGLE PAIRS (6 items)
// ============================================================
add(
  'How are angles classified by measure (acute, right, obtuse, straight, reflex)?',
  '**Classification by measure** (in degrees): **Acute**: 0° < θ < 90°. **Right**: θ = 90° (perpendicular sides). **Obtuse**: 90° < θ < 180°. **Straight**: θ = 180° (sides form a line). **Reflex**: 180° < θ < 360°. **Full**: θ = 360°. **Example**: In triangle with angles 35°, 55°, 90° — one acute, one acute, one right ⇒ right triangle. Reflex angle example: 270° (three-quarters turn). Note: angle measure can also be in radians (180° = π rad, 90° = π/2, etc.). Conversion: radians = degrees · π/180. ✓',
  'ch02p1_angle_classification',
  'formula_recall',
  ['acute', 'right', 'obtuse', 'straight', 'reflex', 'full', 'classification', 'degrees']
)

add(
  'What are complementary and supplementary angles?',
  '**Complementary**: two angles whose sum is **90°**. Each is the complement of the other: complement(θ) = 90° − θ. **Supplementary**: two angles whose sum is **180°**. Each is the supplement: supplement(θ) = 180° − θ. **Example (complementary)**: 35° and 55° (sum 90°). **Example (supplementary)**: 110° and 70° (sum 180°). **Adjacent complementary** angles form a right angle; **adjacent supplementary** angles form a linear pair (a straight line). **Problem**: An angle is 4° less than three times its complement. Find it. Let θ be the angle; complement = 90° − θ. θ = 3(90° − θ) − 4° ⇒ θ = 270° − 3θ − 4° ⇒ 4θ = 266° ⇒ θ = 66.5°. Check: complement = 23.5°, 3·23.5° − 4° = 70.5° − 4° = 66.5° ✓.',
  'ch02p1_complementary_supplementary',
  'problem_solving',
  ['complementary', 'supplementary', '90 degrees', '180 degrees', 'linear pair']
)

add(
  'What are vertical angles and the vertical angle theorem?',
  '**Vertical angles** are the pair of non-adjacent angles formed when two lines intersect. (Each pair of opposite angles is a vertical pair.) **Vertical Angle Theorem**: vertical angles are **congruent** (equal measure). **Proof**: Lines l and m intersect at O, forming angles ∠1, ∠2, ∠3, ∠4 (in cyclic order). ∠1 + ∠2 = 180° (linear pair) and ∠2 + ∠3 = 180° (linear pair). Subtract: ∠1 = ∠3. Similarly ∠2 = ∠4. ✓ **Example**: Two lines intersect; one angle is 70°. The vertical opposite is also 70°; the two adjacent (supplementary) angles are each 180° − 70° = 110°.',
  'ch02p1_vertical_angles',
  'formula_recall',
  ['vertical angles', 'intersecting lines', 'congruent', 'linear pair', 'theorem']
)

add(
  'What are corresponding, alternate interior, and alternate exterior angles?',
  'When a **transversal** t crosses two lines (l and m), eight angles form. **Corresponding**: same side of t, same position relative to l and m (e.g., top-left with top-left) — angles 1 & 5, 2 & 6, 3 & 7, 4 & 8. **Alternate interior**: between l and m, opposite sides of t — angles 3 & 6, 4 & 5. **Alternate exterior**: outside l and m, opposite sides of t — angles 1 & 8, 2 & 7. **Consecutive interior** (same-side interior): between l and m, same side of t — angles 3 & 5, 4 & 6 (supplementary if lines parallel). **Theorem**: If l ∥ m, then corresponding angles are congruent, alternate interior are congruent, alternate exterior are congruent, and consecutive interior are supplementary. **Converse** is also true. ✓',
  'ch02p1_transversal_angle_pairs',
  'formula_recall',
  ['transversal', 'corresponding', 'alternate interior', 'alternate exterior', 'parallel', 'consecutive interior']
)

add(
  'How do you use angle pair relationships to find unknown angles?',
  'Use angle pair theorems to set up equations. **Strategy**: (1) Identify the pair (vertical, linear, corresponding, alternate, etc.). (2) Apply the relevant relation (equal or sum-to-180°). (3) Solve. **Example**: Two parallel lines cut by a transversal; one interior angle is (3x+10)°, its alternate interior is (5x−20)°. By Alternate Interior Angles Theorem: 3x+10 = 5x−20 ⇒ 30 = 2x ⇒ x = 15. Angles are 3(15)+10 = 55° each. **Example 2**: One of a linear pair is (2x+30)° and the other is (x+20)°. Sum 180°: 3x+50 = 180 ⇒ x = 43.33°. Angles ≈ 116.67° and 63.33°. ✓',
  'ch02p1_angle_pair_solving',
  'problem_solving',
  ['angle pairs', 'parallel', 'transversal', 'equation', 'solve', 'linear pair']
)

add(
  'What is the angle addition postulate?',
  '**Angle Addition Postulate**: If point D lies in the interior of ∠ABC, then **m∠ABD + m∠DBC = m∠ABC**. The whole equals the sum of its parts. **Angle bisector**: a ray that splits an angle into two congruent angles — if BD bisects ∠ABC, then m∠ABD = m∠DBC = (1/2)·m∠ABC. **Example**: m∠ABC = 80°. Ray BD bisects ⇒ m∠ABD = m∠DBC = 40°. **Problem**: ∠ABC = 110°. Ray BD inside makes ∠ABD = (2x+5)° and ∠DBC = (3x−10)°. Sum: 2x+5 + 3x−10 = 110 ⇒ 5x − 5 = 110 ⇒ x = 23. ∠ABD = 51°, ∠DBC = 59°. ✓',
  'ch02p1_angle_addition',
  'formula_recall',
  ['angle addition', 'postulate', 'angle bisector', 'interior', 'whole parts']
)

// ============================================================
// SECTION 3 — PARALLEL & PERPENDICULAR LINES (3 items)
// ============================================================
add(
  'What is Euclid\'s parallel postulate and the parallel line theorems?',
  '**Parallel Postulate (Euclid\'s 5th)**: Through a point not on a given line, exactly one line can be drawn parallel to the given line (Playfair\'s form). **Consequences**: (1) If two parallel lines are cut by a transversal, corresponding angles are congruent, alternate interior/exterior angles are congruent, and consecutive interior angles are supplementary. (2) Conversely, if any of these conditions holds, the lines are parallel. **Three parallel lines theorem**: If three or more parallel lines cut off congruent segments on one transversal, they cut off congruent segments on every transversal. **Example**: l ∥ m, transversal t makes a corresponding angle 72° ⇒ all four corresponding pairs are 72°, alternate pairs are 72°, consecutive interior pairs are 180°−72° = 108°. ✓',
  'ch02p1_parallel_postulate',
  'formula_recall',
  ['parallel postulate', 'Playfair', 'transversal', 'corresponding', 'Euclid fifth']
)

add(
  'How do you prove two lines are parallel using angle criteria?',
  'To prove l ∥ m given a transversal, show ONE of: (1) a pair of **corresponding angles** are congruent; (2) a pair of **alternate interior** angles are congruent; (3) a pair of **alternate exterior** angles are congruent; (4) **consecutive interior** angles are supplementary; (5) the lines are both perpendicular to the same line (or both parallel to a third line). **Example**: Transversal t cuts l and m. m∠1 = (4x+10)° (top-left on l), m∠5 = (6x−20)° (top-left on m, corresponding to ∠1). Set equal: 4x+10 = 6x−20 ⇒ 30 = 2x ⇒ x = 15. Both angles = 70°. Since corresponding angles are congruent, l ∥ m. ✓',
  'ch02p1_prove_parallel',
  'problem_solving',
  ['prove parallel', 'corresponding angles', 'alternate interior', 'criterion', 'transversal']
)

add(
  'What are perpendicular lines and the perpendicular bisector?',
  '**Perpendicular lines**: two lines that intersect at a 90° (right) angle; denoted l ⊥ m. **Slopes relation (coordinate plane)**: if line 1 has slope m_1 and line 2 has slope m_2, then l_1 ⊥ l_2 iff **m_1 · m_2 = −1** (i.e., slopes are negative reciprocals). **Perpendicular bisector** of segment AB: the line through the midpoint M of AB, perpendicular to AB. **Property**: every point on the perpendicular bisector is equidistant from A and B. **Example**: A=(−1,3), B=(5,−1). Midpoint M = (2,1). Slope AB = (−1−3)/(5−(−1)) = −4/6 = −2/3. Perp slope = 3/2. Perp bisector: y − 1 = (3/2)(x − 2), i.e., y = (3/2)x − 2. ✓',
  'ch02p1_perpendicular_lines',
  'formula_recall',
  ['perpendicular', 'right angle', 'slope negative reciprocal', 'perpendicular bisector', 'midpoint']
)

// ============================================================
// SECTION 4 — TRIANGLES: CLASSIFICATION, ANGLE SUM, EXTERIOR ANGLE (5 items)
// ============================================================
add(
  'How are triangles classified by sides and by angles?',
  '**By sides**: **Equilateral** — all 3 sides equal (also equiangular ⇒ all angles 60°). **Isosceles** — at least 2 sides equal (base angles opposite equal sides are equal). **Scalene** — no equal sides. **By angles**: **Acute** — all 3 angles < 90°. **Right** — one angle = 90° (side opposite the right angle is the **hypotenuse**). **Obtuse** — one angle > 90°. **Equiangular** — all 3 angles = 60° (same as equilateral). **Example**: sides 5, 5, 8 ⇒ isosceles (and acute, since 5²+5² = 50 > 64? no, 50 < 64 ⇒ angle opposite 8 is obtuse ⇒ obtuse isosceles). Sides 3,4,5 ⇒ right scalene (3²+4² = 5²). ✓',
  'ch02p1_triangle_classification',
  'formula_recall',
  ['equilateral', 'isosceles', 'scalene', 'acute', 'right', 'obtuse', 'classification']
)

add(
  'What is the Triangle Angle Sum Theorem?',
  '**Triangle Angle Sum Theorem**: The sum of the interior angles of any (Euclidean) triangle is **180°**. That is, **α + β + γ = 180°**. **Proof sketch**: Through the vertex parallel to the opposite side; alternate interior angles plus the vertex angle form a straight angle (180°). **Example**: Triangle has angles (2x+10)°, (3x−5)°, (x+15)°. Sum = 6x + 20 = 180 ⇒ 6x = 160 ⇒ x = 80/3 ≈ 26.67. Angles ≈ 63.33°, 75°, 41.67°. **Note**: In non-Euclidean geometry, angle sum differs: hyperbolic triangles have sum < 180°, spherical (elliptic) > 180°. ✓',
  'ch02p1_triangle_angle_sum',
  'formula_recall',
  ['angle sum', '180 degrees', 'triangle', 'theorem', 'interior angles']
)

add(
  'What is the Exterior Angle Theorem for triangles?',
  '**Exterior Angle Theorem**: An exterior angle of a triangle equals the **sum of the two remote (non-adjacent) interior angles**. If triangle has interior angles α, β, γ and an exterior angle at the vertex of γ is δ (formed by extending one side), then **δ = α + β**, and equivalently **δ = 180° − γ**. **Corollary**: An exterior angle is greater than either remote interior angle (δ > α and δ > β). **Example**: Interior angles 50°, 60°, 70°. Exterior at the 70° vertex: δ = 50° + 60° = 110° (and 180° − 70° = 110° ✓). **Problem**: Find x given exterior angle = (5x)° and remote interior angles (2x+10)° and (3x−5)°. 5x = (2x+10) + (3x−5) = 5x + 5 ⇒ 0 = 5 (impossible — angles inconsistent, redo problem). Better: 5x = 5x+5 has no solution; the given data are inconsistent. ✓',
  'ch02p1_exterior_angle_theorem',
  'formula_recall',
  ['exterior angle', 'remote interior', 'theorem', 'sum', 'triangle']
)

add(
  'What are the properties of isosceles triangles?',
  '**Isosceles Triangle Theorem**: If two sides of a triangle are congruent, then the angles opposite them are congruent (the **base angles**). **Converse**: If two angles are congruent, the opposite sides are congruent. **Corollaries**: (1) A triangle is equilateral iff it is equiangular (each angle = 60°). (2) The bisector of the vertex angle of an isosceles triangle is the perpendicular bisector of the base (it is also the median and altitude — they all coincide). **Example**: Isosceles triangle with vertex angle 40°. Each base angle = (180° − 40°)/2 = 70°. **Problem**: Sides (3x−1), (2x+5), and vertex angle 50°. Set sides equal: 3x−1 = 2x+5 ⇒ x = 6. Sides = 17, 17; base unknown. Base angles = (180° − 50°)/2 = 65°. ✓',
  'ch02p1_isosceles_theorem',
  'formula_recall',
  ['isosceles', 'base angles', 'congruent', 'vertex angle', 'converse', 'equilateral']
)

add(
  'How do you find unknown angles and sides in a triangle using all angle theorems?',
  'Combine angle sum + exterior angle + isosceles/equilateral properties. **Strategy**: (1) Write angle sum equation α+β+γ = 180°. (2) Use isosceles (equal sides ⇒ equal opposite angles) or exterior angle (δ = sum of remote). (3) Solve system. **Example**: Triangle ABC with AB = AC (isosceles at A), ∠A = (x+20)°, exterior at B = (4x)°. Since AB=AC, base angles ∠B = ∠C. Exterior at B: 4x = ∠A + ∠C = (x+20) + ∠B. Also ∠A + 2∠B = 180° (sum) ⇒ (x+20) + 2∠B = 180 ⇒ ∠B = (160−x)/2 = 80 − x/2. Substitute: 4x = (x+20) + (80 − x/2) = x/2 + 100 ⇒ 8x = x + 200 ⇒ 7x = 200 ⇒ x ≈ 28.57. ∠A ≈ 48.57°, ∠B = ∠C ≈ 65.71°, exterior ≈ 114.29°. Check: 48.57 + 65.71 + 65.71 ≈ 180 ✓.',
  'ch02p1_triangle_angle_solving',
  'problem_solving',
  ['angle sum', 'isosceles', 'exterior angle', 'system', 'solve', 'unknown']
)

// ============================================================
// SECTION 5 — TRIANGLE CONGRUENCE: SSS/SAS/ASA/AAS/HL (3 items)
// ============================================================
add(
  'What are the triangle congruence postulates and theorems (SSS, SAS, ASA, AAS)?',
  'Two triangles are **congruent** if all corresponding sides and angles match. Shortcuts: **SSS** (Side-Side-Side): three pairs of corresponding sides congruent ⇒ triangles congruent. **SAS** (Side-Angle-Side): two sides and the **included** angle congruent. **ASA** (Angle-Side-Angle): two angles and the **included** side congruent. **AAS** (Angle-Angle-Side): two angles and a non-included side congruent (follows from ASA + angle sum). **NOT valid**: **SSA** (ambiguous — gives 0, 1, or 2 triangles) and **AAA** (similar but not necessarily congruent — only determines shape, not size). **Example**: △ABC and △DEF with AB=DE=5, BC=EF=7, ∠B=∠E=60° (SAS) ⇒ △ABC ≅ △DEF, so AC = DF, ∠A=∠D, ∠C=∠F. ✓',
  'ch02p1_congruence_postulates',
  'formula_recall',
  ['SSS', 'SAS', 'ASA', 'AAS', 'congruence', 'postulate', 'SSA ambiguous', 'AAA not congruence']
)

add(
  'What is the HL (Hypotenuse-Leg) congruence theorem for right triangles?',
  '**HL Theorem**: If the **hypotenuse** and a **leg** of one right triangle are congruent to the hypotenuse and a leg of another right triangle, the triangles are congruent. (Special case applicable only to right triangles; it is a valid form of SSA when the angle is 90°.) **Why valid**: Given leg a and hypotenuse c, the other leg is uniquely determined by a² + b² = c² (Pythagorean), so the triangles must match. **Example**: Right △ABC with right angle at C, hypotenuse AB = 10, leg AC = 6. Right △DEF with right angle at F, hypotenuse DE = 10, leg DF = 6. By HL, △ABC ≅ △DEF, so BC = EF = sqrt(100 − 36) = 8, and all corresponding angles equal. ✓',
  'ch02p1_hl_theorem',
  'formula_recall',
  ['HL', 'hypotenuse leg', 'right triangle', 'congruence', 'Pythagorean']
)

add(
  'How do you use CPCTC in a triangle congruence proof?',
  '**CPCTC** = "**C**orresponding **P**arts of **C**ongruent **T**riangles are **C**ongruent." Used after establishing two triangles are congruent (by SSS/SAS/ASA/AAS/HL) to conclude that any corresponding pair of sides or angles is also congruent. **Proof outline**: (1) Identify triangles to prove congruent. (2) Establish congruence by one of the postulates. (3) Apply CPCTC to conclude the desired parts match. **Example problem**: Given isosceles △ABC with AB = AC, and D, E on AB, AC such that AD = AE. Prove DB = EC. **Proof**: △ADE and △ABC... actually consider △ABE and △ACD. AB = AC (given), ∠A = ∠A (common), AD = AE (given) ⇒ △ABE ≅ △ACD? No — that\'s SAS with sides AB, AE and included ∠A; for △ACD the sides are AC, AD. AB=AC, AE=AD, ∠A common ⇒ △ABE ≅ △ACD by SAS. By CPCTC, BE = CD. Hmm — to get DB = EC: AD = AE (given) and AB = AC ⇒ DB = AB − AD = AC − AE = EC. ✓',
  'ch02p1_cpctc_proofs',
  'how_to',
  ['CPCTC', 'congruence proof', 'corresponding parts', 'two-column proof', 'isosceles']
)

// ============================================================
// SECTION 6 — TRIANGLE SIMILARITY: AA/SAS/SSS (3 items)
// ============================================================
add(
  'What is triangle similarity and the AA/SAS/SSS similarity criteria?',
  'Two triangles are **similar** (△ABC ∼ △DEF) if they have the same shape (corresponding angles congruent, corresponding sides proportional). **Ratio of similarity** (scale factor) k = DE/AB = EF/BC = DF/AC. **Similarity criteria**: **AA** (Angle-Angle): two pairs of corresponding angles congruent ⇒ similar. **SAS~**: two pairs of sides proportional AND the included angles congruent. **SSS~**: all three pairs of sides proportional. **Note**: AA suffices because the third angle is forced by angle sum. **Example**: △ABC has sides 6, 8, 10 and ∠A = 40°. △DEF has sides 9, 12, 15 (ratio 1.5) and ∠D = 40°. Sides around the equal angle have ratio 9/6 = 12/8 = 1.5 ⇒ SAS~ ⇒ similar. ✓',
  'ch02p1_similarity_criteria',
  'formula_recall',
  ['similar', 'AA', 'SAS similarity', 'SSS similarity', 'proportional', 'scale factor']
)

add(
  'How do you use similar triangles to find unknown lengths (e.g., indirect measurement)?',
  'Set up a proportion between corresponding sides. **Strategy**: (1) Identify similar triangles (by AA, SAS~, or SSS~). (2) Match corresponding vertices. (3) Write proportion and solve. **Classic example (shadow problem)**: A 6-ft person casts a 4-ft shadow; a nearby tree casts a 20-ft shadow. Tree height h satisfies 6/4 = h/20 ⇒ h = 6·20/4 = 30 ft. **Example 2**: In △ABC, DE ∥ BC with D on AB, E on AC, AD = 4, DB = 6, AE = 5, find EC. By Basic Proportionality Theorem (Thales): AD/DB = AE/EC ⇒ 4/6 = 5/EC ⇒ EC = 30/4 = 7.5. ✓',
  'ch02p1_similar_triangles_solving',
  'problem_solving',
  ['similar', 'proportion', 'indirect measurement', 'shadow', 'Thales', 'basic proportionality']
)

add (
  'What is the Basic Proportionality Theorem (Thales\' Theorem) and its converse?',
  '**Basic Proportionality Theorem (BPT / Thales)**: If a line is parallel to one side of a triangle and intersects the other two sides, then it divides those sides **proportionally**. That is, in △ABC, if DE ∥ BC with D on AB and E on AC, then **AD/DB = AE/EC** (equivalently AD/AB = AE/AC). **Converse**: If AD/DB = AE/EC, then DE ∥ BC. **Midsegment Theorem** (special case): The segment joining the midpoints of two sides of a triangle is parallel to the third side and half its length. **Example**: △ABC, D midpoint of AB, E midpoint of AC ⇒ DE ∥ BC and DE = (1/2)BC. If BC = 10, then DE = 5. ✓',
  'ch02p1_basic_proportionality',
  'formula_recall',
  ['Thales', 'basic proportionality', 'BPT', 'midsegment', 'parallel', 'converse']
)

// ============================================================
// SECTION 7 — PYTHAGOREAN THEOREM & CONVERSE (3 items)
// ============================================================
add(
  'What is the Pythagorean Theorem and its converse?',
  '**Pythagorean Theorem**: In a right triangle with legs a, b and hypotenuse c, **a² + b² = c²**. **Converse**: If a triangle with sides a, b, c satisfies a² + b² = c² (c longest), then it is a right triangle (right angle opposite c). **Pythagorean triples**: integer solutions like (3,4,5), (5,12,13), (8,15,17), (7,24,25), (9,40,41), and their multiples (e.g., 6,8,10). **Example**: A ladder 13 ft long leans against a wall with its base 5 ft from the wall. Height reached: c² = a² + b² ⇒ 13² = 5² + h² ⇒ 169 = 25 + h² ⇒ h = 12 ft. **Example (converse)**: Sides 9, 40, 41. Check: 9² + 40² = 81 + 1600 = 1681 = 41² ⇒ right triangle ✓.',
  'ch02p1_pythagorean_theorem',
  'formula_recall',
  ['Pythagorean', 'right triangle', 'converse', 'triple', 'hypotenuse', 'legs']
)

add(
  'What are common Pythagorean triples and how are they generated?',
  'A **Pythagorean triple** is a set of three positive integers (a, b, c) with a² + b² = c². **Primitive triples** (gcd = 1) generated by **Euclid\'s formula**: a = m² − n², b = 2mn, c = m² + n², for integers m > n > 0, gcd(m,n)=1, m−n odd (one even, one odd). **Common primitive triples**: (3,4,5), (5,12,13), (8,15,17), (7,24,25), (20,21,29), (9,40,41), (12,35,37), (11,60,61), (28,45,53), (33,56,65). **Multiples**: k·(3,4,5) = (3k, 4k, 5k). **Example**: m=2, n=1 ⇒ a=3, b=4, c=5. m=3, n=2 ⇒ a=5, b=12, c=13. m=4, n=1 ⇒ a=15, b=8, c=17. ✓ Useful for quickly identifying right triangles without computation.',
  'ch02p1_pythagorean_triples',
  'factual_question',
  ['Pythagorean triple', 'primitive', 'Euclid formula', 'm n', 'integer right triangle']
)

add(
  'How do you use the Pythagorean Theorem to find distances and solve applied problems?',
  'The Pythagorean Theorem underlies the **distance formula** in coordinate geometry and many applied problems. **Distance formula** (derived from Pythagoras): distance between (x_1, y_1) and (x_2, y_2) is **d = sqrt((x_2−x_1)² + (y_2−y_1)²)**. **Diagonal of a rectangle** with sides l, w: d = sqrt(l² + w²). **Diagonal of a rectangular box** (3D): d = sqrt(l² + w² + h²). **Applied example**: A 7 m pole is braced by a wire from the top to a point on the ground 5 m from the base. Wire length = sqrt(7² + 5²) = sqrt(74) ≈ 8.60 m. **Example (coordinate)**: Distance from (1, 2) to (4, 6) = sqrt((4−1)² + (6−2)²) = sqrt(9 + 16) = sqrt(25) = 5. ✓',
  'ch02p1_pythagorean_applications',
  'problem_solving',
  ['Pythagorean', 'distance formula', 'diagonal', 'applied', 'coordinate']
)

// ============================================================
// SECTION 8 — SPECIAL RIGHT TRIANGLES: 45-45-90 & 30-60-90 (3 items)
// ============================================================
add(
  'What are the side ratios in a 45-45-90 (isosceles right) triangle?',
  'In a **45°-45°-90°** triangle (isosceles right), the legs are equal and the hypotenuse is **leg × sqrt(2)**. **Ratios**: leg : leg : hyp = **1 : 1 : sqrt(2)**. If leg = x, then hypotenuse = x·sqrt(2). Conversely, if hyp = h, each leg = h/sqrt(2) = h·sqrt(2)/2. **Derivation**: An isosceles right triangle is half of a square cut along its diagonal. **Example**: Leg = 7 ⇒ hyp = 7·sqrt(2) ≈ 9.899. **Example 2**: Hyp = 10 ⇒ each leg = 10/sqrt(2) = 5·sqrt(2) ≈ 7.071. **Area** = (1/2)·leg² = (1/4)·hyp². ✓',
  'ch02p1_special_45_45_90',
  'formula_recall',
  ['45-45-90', 'isosceles right', 'special triangle', 'sqrt 2', 'leg', 'hypotenuse']
)

add(
  'What are the side ratios in a 30-60-90 triangle?',
  'In a **30°-60°-90°** triangle, sides are in ratio **1 : sqrt(3) : 2** (short leg : long leg : hypotenuse), where the short leg is opposite the 30° angle, the long leg is opposite 60°, and the hypotenuse is opposite 90°. **Relations**: hypotenuse = 2 × short leg; long leg = short leg × sqrt(3); short leg = hypotenuse / 2 = long leg / sqrt(3). **Derivation**: Half of an equilateral triangle (split by altitude) yields 30-60-90. **Example**: Short leg = 5 ⇒ long leg = 5·sqrt(3) ≈ 8.66, hyp = 10. **Example 2**: Hyp = 12 ⇒ short leg = 6, long leg = 6·sqrt(3) ≈ 10.39. **Area** = (1/2)·(short)·(long) = (1/2)·x·(x·sqrt(3)) = (x²·sqrt(3))/2. ✓',
  'ch02p1_special_30_60_90',
  'formula_recall',
  ['30-60-90', 'special triangle', 'sqrt 3', 'short leg', 'long leg', 'half equilateral']
)

add(
  'How do you solve problems involving special right triangles?',
  'Identify which special triangle is present, then apply the ratios directly without needing trig. **Look for**: square with diagonal ⇒ 45-45-90; equilateral triangle with altitude ⇒ 30-60-90. **Example 1**: Square with side 8. Diagonal = 8·sqrt(2). **Example 2**: Equilateral triangle with side 6. Altitude = (6/2)·sqrt(3) = 3·sqrt(3); area = (1/2)·6·3·sqrt(3) = 9·sqrt(3). **Example 3**: A 30-60-90 triangle has long leg = 9. Short leg = 9/sqrt(3) = 3·sqrt(3). Hypotenuse = 2·3·sqrt(3) = 6·sqrt(3). **Example 4**: Diagonal of a cube with side s = s·sqrt(3) (space diagonal — uses 3D extension: 1:1:sqrt(2) in face, then face-diag : edge : space-diag = 1 : 1 : sqrt(2) again on top of sqrt(2) edge to get sqrt(3)). ✓',
  'ch02p1_special_triangles_solving',
  'problem_solving',
  ['special right triangle', '45-45-90', '30-60-90', 'square diagonal', 'equilateral altitude']
)

// ============================================================
// SECTION 9 — TRIANGLE INEQUALITY & CEVIANS (4 items)
// ============================================================
add(
  'What is the Triangle Inequality Theorem and its corollaries?',
  '**Triangle Inequality**: The sum of the lengths of any two sides of a triangle is **greater than** the third side: a + b > c, a + c > b, b + c > a. Equivalently, |a − b| < c < a + b. **Use**: (1) Test whether three given lengths can form a triangle. (2) Find range of possible third side given two. **Example**: Sides 4, 6, 10 — 4 + 6 = 10, NOT > 10 ⇒ degenerate (not a valid triangle). Sides 4, 6, 9 — 4+6=10>9, 4+9=13>6, 6+9=15>4 ⇒ valid. **Range problem**: Two sides 5 and 9. Third side x: |9−5| < x < 9+5 ⇒ 4 < x < 14. **Corollary**: The shortest side is opposite the smallest angle; the longest side is opposite the largest angle. ✓',
  'ch02p1_triangle_inequality',
  'formula_recall',
  ['triangle inequality', 'side lengths', 'range', 'valid triangle', 'degenerate']
)

add(
  'What are cevians, and what distinguishes medians, altitudes, and angle bisectors?',
  '**Cevian**: a line segment from a vertex of a triangle to a point on the opposite side (or its extension). Three important cevians: **Median**: from a vertex to the **midpoint** of the opposite side (always inside the triangle; three medians are concurrent at the centroid). **Altitude**: from a vertex **perpendicular** to the line containing the opposite side (in obtuse triangles, two altitudes fall outside the triangle; in a right triangle, two altitudes are the legs themselves). **Angle bisector**: from a vertex bisecting the angle; divides opposite side proportionally to adjacent sides: **BD/DC = AB/AC** (Angle Bisector Theorem). Three angle bisectors concurrent at incenter. Three altitudes concurrent at orthocenter. ✓',
  'ch02p1_cevians_overview',
  'factual_question',
  ['cevian', 'median', 'altitude', 'angle bisector', 'midpoint', 'perpendicular']
)

add(
  'What is the Angle Bisector Theorem and how is it applied?',
  '**Angle Bisector Theorem**: In △ABC, if AD bisects ∠BAC (with D on BC), then **BD/DC = AB/AC**. The bisector divides the opposite side in the ratio of the adjacent sides. **Converse**: If D is on BC with BD/DC = AB/AC, then AD bisects ∠BAC. **External Angle Bisector Theorem** (D on extension of BC): BD/DC = AB/AC (directed lengths). **Example**: △ABC, AB = 6, AC = 9, BC = 10. AD bisects ∠A and meets BC at D. Then BD/DC = 6/9 = 2/3. With BD + DC = 10 ⇒ BD = 4, DC = 6. **Example 2**: △ABC, AB = 8, AC = 12, BD = 6, find DC. 6/DC = 8/12 = 2/3 ⇒ DC = 9. ✓',
  'ch02p1_angle_bisector_theorem',
  'formula_recall',
  ['angle bisector', 'theorem', 'ratio', 'opposite side', 'adjacent sides', 'converse']
)

add(
  'How do you find the length of a median using Apollonius\'s Theorem?',
  '**Apollonius\'s Theorem**: In △ABC, if M is the midpoint of BC and m_a = AM is the median from A, then **AB² + AC² = 2(AM² + BM²)**, i.e., **m_a² = (2b² + 2c² − a²)/4**, where a = BC, b = AC, c = AB. Equivalent forms: median to side a: m_a = (1/2)·sqrt(2b² + 2c² − a²); similarly m_b = (1/2)·sqrt(2a² + 2c² − b²), m_c = (1/2)·sqrt(2a² + 2b² − c²). **Example**: △ABC with sides a=8 (BC), b=7 (AC), c=5 (AB). Median to BC: m_a = (1/2)·sqrt(2·49 + 2·25 − 64) = (1/2)·sqrt(98 + 50 − 64) = (1/2)·sqrt(84) = sqrt(21) ≈ 4.583. ✓',
  'ch02p1_apollonius_median',
  'problem_solving',
  ['Apollonius', 'median length', 'theorem', 'formula', 'midpoint']
)

// ============================================================
// SECTION 10 — TRIANGLE CENTERS: CENTROID/ORTHOCENTER/INCENTER/CIRCUMCENTER (4 items)
// ============================================================
add(
  'What is the centroid of a triangle and its key properties?',
  '**Centroid** (G): the point of concurrency of the **three medians**. **Key property**: The centroid divides each median in ratio **2 : 1**, with the longer part between the vertex and the centroid. If M is the midpoint of BC and AM is the median, then AG : GM = 2 : 1, so AG = (2/3)·AM and GM = (1/3)·AM. **Coordinate formula**: For triangle with vertices (x_1,y_1), (x_2,y_2), (x_3,y_3), the centroid is **G = ((x_1+x_2+x_3)/3, (y_1+y_2+y_3)/3)**. **Physical interpretation**: centroid = center of mass (assuming uniform density). **Example**: △ with vertices A(0,0), B(6,0), C(0,9). G = ((0+6+0)/3, (0+0+9)/3) = (2, 3). Median from A to midpoint (3, 4.5) of BC: AM = sqrt(9 + 20.25) = sqrt(29.25); AG = (2/3)·AM ≈ 3.606; GM ≈ 1.803. ✓',
  'ch02p1_centroid',
  'formula_recall',
  ['centroid', 'median', '2:1', 'coordinate', 'center of mass', 'concurrency']
)

add(
  'What is the orthocenter of a triangle?',
  '**Orthocenter** (H): the point of concurrency of the **three altitudes** of a triangle. **Location**: (1) **Acute** triangle: orthocenter is **inside** the triangle. (2) **Right** triangle: orthocenter is at the **vertex of the right angle**. (3) **Obtuse** triangle: orthocenter is **outside** the triangle, on the side of the obtuse angle. **Coordinate computation**: solve two altitude equations. **Example**: △ABC with A(0,0), B(4,0), C(0,3) (right triangle at A) ⇒ orthocenter H = A = (0,0). **Example (acute)**: △ABC with A(0,0), B(6,0), C(2,4). Altitude from C ⊥ AB ⇒ vertical line x = 2. Altitude from B ⊥ AC: slope AC = 4/2 = 2, perp slope = −1/2; line through B(6,0): y = −(1/2)(x−6). At x=2: y = −(1/2)(−4) = 2. So H = (2, 2). ✓',
  'ch02p1_orthocenter',
  'formula_recall',
  ['orthocenter', 'altitude', 'concurrency', 'acute', 'right', 'obtuse']
)

add(
  'What are the incenter and incircle of a triangle?',
  '**Incenter** (I): the point of concurrency of the **three angle bisectors**; it is **equidistant from all three sides** of the triangle. **Incircle**: the circle centered at I, tangent to all three sides; its radius is the **inradius** r. **Incenter is always inside the triangle.** **Formula (coordinates)**: I = (a·A + b·B + c·C) / (a+b+c), where a, b, c are side lengths opposite A, B, C respectively (barycentric weights). **Inradius formula**: r = Area / s, where s = (a+b+c)/2 is the semi-perimeter. **Example**: △ with sides 3, 4, 5. s = 6, area = 6 (right triangle). r = 6/6 = 1. Coordinates: △ at A(0,0), B(3,0), C(0,4); a=BC=5, b=AC=4, c=AB=3. I = (5·(0,0) + 4·(3,0) + 3·(0,4)) / 12 = ((12, 12)) / 12 = (1, 1). ✓ Check distance to side AB (y=0): 1. To AC (x=0): 1. ✓',
  'ch02p1_incenter',
  'formula_recall',
  ['incenter', 'angle bisector', 'incircle', 'inradius', 'equidistant', 'barycentric']
)

add(
  'What are the circumcenter and circumcircle of a triangle?',
  '**Circumcenter** (O): the point of concurrency of the **perpendicular bisectors** of the three sides; it is **equidistant from all three vertices**. **Circumcircle**: the circle centered at O passing through all three vertices; its radius is the **circumradius** R. **Location**: (1) **Acute** triangle: O **inside**. (2) **Right** triangle: O is the **midpoint of the hypotenuse** (and R = hypotenuse/2). (3) **Obtuse** triangle: O **outside**, on the side of the obtuse angle. **Circumradius formula**: R = abc / (4·Area) = a/(2 sin A). **Example**: △ at A(0,0), B(4,0), C(0,3) (right triangle). Circumcenter = midpoint of hypotenuse BC = (2, 1.5). R = (1/2)·sqrt(16+9) = 2.5. Check: distance from O to A = sqrt(4 + 2.25) = sqrt(6.25) = 2.5 ✓. Same for B, C. ✓',
  'ch02p1_circumcenter',
  'formula_recall',
  ['circumcenter', 'perpendicular bisector', 'circumcircle', 'circumradius', 'hypotenuse midpoint']
)

// ============================================================
// SECTION 11 — TRIANGLE AREA: BASE-HEIGHT / HERON / TRIG (3 items)
// ============================================================
add(
  'How do you compute the area of a triangle using base and height, and using two sides and the included angle?',
  '**Base-Height**: Area = (1/2)·base·height = (1/2)·b·h, where h is the altitude to base b. **Trig form (SAS)**: Area = (1/2)·a·b·sin(C) = (1/2)·b·c·sin(A) = (1/2)·a·c·sin(B), where the angle is the included angle between the two given sides. **Example (base-height)**: base 10, height 6 ⇒ A = (1/2)(10)(6) = 30. **Example (SAS)**: a=5, b=7, included angle C=60°. A = (1/2)(5)(7)·sin(60°) = (35/2)·(sqrt(3)/2) = 35·sqrt(3)/4 ≈ 15.16. **Use trig form** when altitude is not directly known but two sides and included angle are. The two formulas agree because h = b·sin(C) when b is the side adjacent to angle C and h is the altitude to side b... actually h = a·sin(C) when h is the altitude to side b measured from the opposite vertex. ✓',
  'ch02p1_triangle_area_basic',
  'formula_recall',
  ['triangle area', 'base height', 'SAS', 'sin', 'included angle', 'half base times height']
)

add(
  'What is Heron\'s Formula for the area of a triangle given three sides?',
  '**Heron\'s Formula**: For a triangle with sides a, b, c and semi-perimeter **s = (a + b + c) / 2**, the area is **A = sqrt(s·(s−a)·(s−b)·(s−c))**. Useful when only side lengths are known. **Example**: Sides 13, 14, 15. s = 21. A = sqrt(21·(21−13)·(21−14)·(21−15)) = sqrt(21·8·7·6) = sqrt(7056) = 84. **Example 2**: Sides 5, 5, 6 (isosceles). s = 8. A = sqrt(8·3·3·2) = sqrt(144) = 12. (Check: height = sqrt(5² − 3²) = 4, A = (1/2)(6)(4) = 12 ✓.) **Heron** is equivalent to A = (1/4)·sqrt(4a²b² − (a²+b²−c²)²). It generalizes to Brahmagupta\'s formula for cyclic quadrilaterals. ✓',
  'ch02p1_heron_formula',
  'formula_recall',
  ['Heron', 'area', 'three sides', 'semi-perimeter', 'square root']
)

add(
  'How do you find the area of a triangle when given the circumradius or inradius?',
  '**Circumradius R**: A = (a·b·c) / (4R). Rearranges to R = abc/(4A). **Inradius r**: A = r·s, where s = (a+b+c)/2 is the semi-perimeter. Rearranges to r = A/s. **Example (R)**: Sides 3, 4, 5 (right triangle). Area A = 6. R = (3·4·5)/(4·6) = 60/24 = 2.5 (= half hypotenuse ✓). **Example (r)**: Sides 3, 4, 5. s = 6, A = 6. r = 6/6 = 1. **Combined**: r·R relation — for any triangle, the product r·R relates to (s−a)(s−b)(s−c)/(4R) and similar. **Euler\'s inequality**: R ≥ 2r, with equality iff equilateral. ✓',
  'ch02p1_area_circumradius_inradius',
  'problem_solving',
  ['area', 'circumradius', 'inradius', 'semi-perimeter', 'Euler inequality']
)

// ============================================================
// SECTION 12 — QUADRILATERALS (6 items)
// ============================================================
add(
  'What are the properties and area of a parallelogram?',
  '**Parallelogram**: quadrilateral with both pairs of opposite sides parallel. **Properties**: (1) Opposite sides are **congruent**. (2) Opposite angles are **congruent**. (3) Consecutive angles are **supplementary** (sum 180°). (4) Diagonals **bisect each other** (each cuts the other in half). (5) Diagonal bisects the parallelogram into two congruent triangles. **Tests**: a quad is a parallelogram if any of: both pairs of opposite sides parallel; both pairs of opposite sides congruent; one pair of opposite sides both parallel and congruent; diagonals bisect each other; both pairs of opposite angles congruent. **Area**: A = base × height = b·h, where h is the perpendicular height to base b. Also A = ab·sin(θ) where a, b are adjacent sides and θ is the included angle. **Example**: Adjacent sides 8, 5 with included angle 60°. A = 8·5·sin(60°) = 40·sqrt(3)/2 = 20·sqrt(3) ≈ 34.64. ✓',
  'ch02p1_parallelogram',
  'formula_recall',
  ['parallelogram', 'opposite sides parallel', 'diagonals bisect', 'area', 'base height']
)

add(
  'What are the properties and area of a rectangle?',
  '**Rectangle**: a parallelogram with four right angles. **Properties** (superset of parallelogram): all parallelogram properties, plus (1) all four angles are 90°; (2) **diagonals are congruent** (equal length); (3) diagonals bisect each other (from parallelogram). **Diagonal length** d = sqrt(l² + w²) (Pythagoras). **Area**: A = length × width = l·w. **Perimeter**: P = 2(l + w). **Example**: Rectangle 12 × 5. A = 60. Diagonal = sqrt(144 + 25) = sqrt(169) = 13. P = 34. A rectangle is a special parallelogram; a square is a special rectangle. ✓',
  'ch02p1_rectangle',
  'formula_recall',
  ['rectangle', 'right angles', 'diagonal', 'congruent diagonals', 'area length width']
)

add(
  'What are the properties and area of a rhombus?',
  '**Rhombus**: a parallelogram with all four sides congruent. **Properties** (superset of parallelogram): all parallelogram properties, plus (1) all four sides equal; (2) **diagonals are perpendicular** (intersect at 90°); (3) **diagonals bisect the vertex angles**; (4) diagonals are NOT necessarily congruent (they are equal only in a square). **Area**: A = base × height (parallelogram formula), OR **A = (1/2)·d_1·d_2** (half the product of the diagonals — since perpendicular). **Side from diagonals**: if diagonals are d_1 and d_2, each side s = (1/2)·sqrt(d_1² + d_2²) (Pythagoras on quartered rhombus). **Example**: Rhombus with diagonals 10 and 24. A = (1/2)(10)(24) = 120. Side = (1/2)·sqrt(100 + 576) = (1/2)·sqrt(676) = 13. P = 52. ✓',
  'ch02p1_rhombus',
  'formula_recall',
  ['rhombus', 'equal sides', 'perpendicular diagonals', 'half diagonal product', 'area']
)

add(
  'What are the properties and area of a square?',
  '**Square**: a quadrilateral that is simultaneously a rectangle AND a rhombus — all sides equal and all angles 90°. **Properties**: four equal sides; four right angles; diagonals congruent, perpendicular, bisect each other, AND bisect the vertex angles (at 45°); diagonals have length d = s·sqrt(2). **Area**: A = s² (side squared) = (1/2)·d² (half diagonal squared) = (1/2)·d_1·d_2 (rhombus form, with d_1=d_2=d). **Perimeter**: P = 4s. **Circumradius** (center to vertex) = s·sqrt(2)/2 = d/2. **Inradius** (center to side) = s/2. **Example**: Square with side 9. A = 81. Diagonal = 9·sqrt(2) ≈ 12.73. P = 36. A via diagonal: (1/2)·(9·sqrt(2))² = (1/2)·162 = 81 ✓. ✓',
  'ch02p1_square',
  'formula_recall',
  ['square', 'equal sides', 'right angles', 'diagonal', 'side squared', 'area']
)

add(
  'What are the properties and area of a trapezoid (and isosceles trapezoid)?',
  '**Trapezoid**: quadrilateral with **exactly one pair of parallel sides** (the **bases**, b_1 and b_2; the non-parallel sides are **legs**). **Isosceles trapezoid**: legs congruent; base angles congruent; diagonals congruent. **Area**: A = (1/2)·(b_1 + b_2)·h = (average of bases) × height. **Median (midsegment)** of trapezoid: the segment joining the midpoints of the legs; length = (b_1 + b_2)/2; parallel to the bases; equals half the sum of bases. So A = (median) × h. **Height from sides (isosceles)**: h = sqrt(leg² − ((b_1−b_2)/2)²). **Example**: Bases 10 and 6, height 4. A = (1/2)(10+6)(4) = 32. Isosceles example: legs 5, bases 10 and 6 ⇒ h = sqrt(25 − 4) = sqrt(21) ≈ 4.583; A = (1/2)(16)(sqrt(21)) = 8·sqrt(21) ≈ 36.66. ✓',
  'ch02p1_trapezoid',
  'formula_recall',
  ['trapezoid', 'parallel sides', 'bases', 'legs', 'isosceles', 'median', 'half sum height']
)

add(
  'What are the properties and area of a kite?',
  '**Kite**: quadrilateral with **two pairs of consecutive (adjacent) sides congruent** (i.e., AB = AD and CB = CD). **Properties**: (1) Diagonals are **perpendicular**. (2) **One diagonal is bisected** by the other (the longer diagonal bisects the shorter; the axis of symmetry diagonal bisects the other). (3) **One pair of opposite angles congruent** (the angles between unequal sides). (4) One diagonal is the **axis of symmetry** (it bisects the angles at the two vertices it joins). **Area**: A = (1/2)·d_1·d_2 (half product of diagonals, since perpendicular). **Example**: Kite with diagonals 16 and 12. A = (1/2)(16)(12) = 96. The diagonals split the kite into four right triangles. ✓',
  'ch02p1_kite',
  'formula_recall',
  ['kite', 'adjacent sides congruent', 'perpendicular diagonals', 'axis of symmetry', 'area']
)

// ============================================================
// SECTION 13 — POLYGONS (3 items)
// ============================================================
add(
  'What is the sum of interior and exterior angles of a polygon?',
  'For a convex polygon with **n sides**: **Sum of interior angles = (n − 2)·180°**. (Derived by triangulating into n − 2 triangles.) **Each interior angle (regular polygon)** = (n − 2)·180° / n. **Sum of exterior angles (one at each vertex, going around) = 360°** for any convex polygon (regular or not). **Each exterior angle (regular polygon)** = 360° / n. **Example (hexagon, n=6)**: Interior sum = 4·180° = 720°; each (regular) = 120°. Exterior sum = 360°; each (regular) = 60°. **Example (decagon, n=10)**: Interior sum = 8·180° = 1440°; each (regular) = 144°. Exterior each = 36°. **Diagnostic**: If each exterior angle is 24°, then n = 360/24 = 15 sides. ✓',
  'ch02p1_polygon_angles',
  'formula_recall',
  ['polygon', 'interior angles', 'exterior angles', 'sum', 'n sides', 'regular']
)

add(
  'How do you compute the area of a regular polygon using the apothem?',
  '**Regular polygon** (all sides equal, all angles equal) with **n sides**, side length **s**, and **apothem a** (the perpendicular distance from the center to a side, i.e., the inradius of the polygon): **A = (1/2)·a·P**, where P = n·s is the perimeter. Equivalently A = (1/2)·n·s·a. **Apothem from side and n**: a = (s/2)·cot(π/n) = (s/2)·cos(π/n)/sin(π/n). **Relation to circumradius R**: a = R·cos(π/n) and s = 2R·sin(π/n). **Example (regular hexagon)**: n=6, s=10. Apothem a = (10/2)·cot(30°) = 5·sqrt(3) ≈ 8.66. P = 60. A = (1/2)·8.66·60 = 259.81. Or directly: hexagon area = (3·sqrt(3)/2)·s² = (3·sqrt(3)/2)·100 = 150·sqrt(3) ≈ 259.81. ✓',
  'ch02p1_regular_polygon_area',
  'formula_recall',
  ['regular polygon', 'apothem', 'perimeter', 'area', 'inradius', 'circumradius']
)

add(
  'How do you compute the area of a general polygon given its vertices (shoelace for polygons)?',
  'Plane (non-coordinate) formulas: for any polygon, decompose into triangles. For a **cyclic quadrilateral**, **Brahmagupta\'s formula**: A = sqrt((s−a)(s−b)(s−c)(s−d)) where s = (a+b+c+d)/2 (generalization of Heron). For a quadrilateral with perpendicular diagonals (kite, rhombus): A = (1/2)·d_1·d_2. For a general quadrilateral with diagonals p, q and angle θ between them: A = (1/2)·p·q·sin(θ). **Ptolemy\'s theorem** (cyclic quad): AC·BD = AB·CD + AD·BC (relation, not area). **Example (Brahmagupta)**: Cyclic quadrilateral sides 7, 8, 9, 10. s = 17. A = sqrt(10·9·8·7) = sqrt(5040) ≈ 70.99. **Note**: coordinate-based shoelace is in ch02p2. ✓',
  'ch02p1_polygon_general_area',
  'problem_solving',
  ['Brahmagupta', 'cyclic quadrilateral', 'perpendicular diagonals', 'Ptolemy', 'general polygon area']
)

// ============================================================
// SECTION 14 — CIRCLES: PARTS, CIRCUMFERENCE, AREA (3 items)
// ============================================================
add(
  'What are the parts of a circle: radius, diameter, chord, tangent, secant?',
  '**Circle**: set of all points at a fixed distance (the **radius r**) from a center O. **Diameter** d = 2r — chord through the center (longest chord). **Chord**: segment whose endpoints lie on the circle. **Tangent**: a line that touches the circle at exactly one point (the point of tangency); tangent ⊥ radius at the point of tangency. **Secant**: a line that intersects the circle at two points. **Arc**: a portion of the circle (minor arc < 180°, major arc > 180°, semicircle = 180°). **Sector**: pie-slice region bounded by two radii and an arc. **Segment**: region bounded by a chord and its arc. **Concentric circles**: same center, different radii. ✓ **Example**: A chord at distance 4 from center in a circle of radius 5 has length 2·sqrt(5² − 4²) = 2·3 = 6 (Pythagoras on the half-chord).',
  'ch02p1_circle_parts',
  'factual_question',
  ['circle', 'radius', 'diameter', 'chord', 'tangent', 'secant', 'arc', 'sector', 'segment']
)

add(
  'What are the circumference and area of a circle?',
  '**Circumference** (perimeter): C = 2·π·r = π·d, where r is radius and d = 2r is diameter. **Area**: A = π·r² = (1/4)·π·d². **Derived**: π = C/d (definition). **Example**: r = 7 ⇒ C = 14π ≈ 43.98, A = 49π ≈ 153.94. **Example 2**: A = 100π ⇒ r² = 100 ⇒ r = 10; C = 20π. **Annulus** (ring between two concentric circles of radii R, r): Area = π(R² − r²). **Sector of angle θ (radians)**: arc length = r·θ, sector area = (1/2)·r²·θ. In degrees: arc = (θ/360)·2π·r, area = (θ/360)·π·r². **Example**: Sector with r = 6 and central angle 60°. Arc = (60/360)·2π·6 = 2π. Area = (60/360)·π·36 = 6π. ✓',
  'ch02p1_circle_circumference_area',
  'formula_recall',
  ['circumference', 'area', 'pi', 'radius', 'diameter', 'annulus', 'sector']
)

add(
  'How do you find the length of a chord and the distance from the center to a chord?',
  'A chord of length L in a circle of radius r, at perpendicular distance d from the center, satisfies **(L/2)² + d² = r²** (Pythagoras on the right triangle formed by the radius to an endpoint, half the chord, and the perpendicular from center to chord). **Rearranged**: L = 2·sqrt(r² − d²); d = sqrt(r² − (L/2)²). **Implications**: (1) The longest chord (diameter) has d = 0, L = 2r. (2) Chords equidistant from the center are congruent (and vice versa). (3) A chord at distance r from the center has length 0 (tangent point). **Example**: r = 10, chord length 12. d = sqrt(100 − 36) = sqrt(64) = 8. **Example 2**: r = 13, d = 5 ⇒ L = 2·sqrt(169 − 25) = 2·12 = 24. ✓',
  'ch02p1_chord_length',
  'problem_solving',
  ['chord', 'distance from center', 'Pythagoras', 'perpendicular', 'radius']
)

// ============================================================
// SECTION 15 — CIRCLES: ARCS, CENTRAL/INSCRIBED ANGLES, ARC LENGTH, SECTOR & SEGMENT (4 items)
// ============================================================
add(
  'What are central angles, inscribed angles, and the Inscribed Angle Theorem?',
  '**Central angle**: vertex at the center of the circle; intercepts an arc; **measure of central angle = measure of intercepted arc** (in degrees or radians). **Inscribed angle**: vertex on the circle, sides are chords; intercepts an arc. **Inscribed Angle Theorem**: The measure of an inscribed angle is **half** the measure of its intercepted arc: inscribed = (1/2)·(intercepted arc). Equivalently, central angle = 2·(inscribed angle) when both intercept the same arc. **Corollaries**: (1) Inscribed angles intercepting the same arc are congruent. (2) An angle inscribed in a **semicircle** is a **right angle (90°)** (since it intercepts a 180° arc, half of which is 90°). (3) Opposite angles of an inscribed **quadrilateral** are supplementary (sum 180°). **Example**: Inscribed angle 35° ⇒ intercepted arc 70°. Central angle on same arc = 70°. ✓',
  'ch02p1_inscribed_angle_theorem',
  'formula_recall',
  ['central angle', 'inscribed angle', 'inscribed angle theorem', 'semicircle', 'right angle', 'arc']
)

add(
  'How do you compute arc length and sector area of a circle?',
  '**Arc length** for a central angle θ (in radians): **L = r·θ**. In degrees: **L = (θ/360°)·2π·r**. **Sector area**: **A = (1/2)·r²·θ** (θ in radians). In degrees: **A = (θ/360°)·π·r²**. **Ratio intuition**: a sector is the fraction θ/2π of the full circle, so its area is that fraction of π·r², and its arc is that fraction of 2π·r. **Example (radians)**: r = 5, θ = π/3 (i.e., 60°). L = 5·(π/3) = 5π/3 ≈ 5.236. A = (1/2)·25·(π/3) = 25π/6 ≈ 13.09. **Example (degrees)**: r = 8, θ = 45°. L = (45/360)·2π·8 = (1/8)·16π = 2π ≈ 6.283. A = (45/360)·π·64 = 8π ≈ 25.13. ✓',
  'ch02p1_arc_length_sector_area',
  'formula_recall',
  ['arc length', 'sector area', 'central angle', 'radians', 'degrees', 'fraction of circle']
)

add(
  'How do you compute the area of a circular segment?',
  '**Circular segment**: region bounded by a chord and its arc. For a circle of radius r and a chord that subtends a central angle θ (in radians), the **area of the (minor) segment** = (area of sector) − (area of triangle): **A_segment = (1/2)·r²·(θ − sin θ)**. The triangle in question is the isosceles triangle formed by the two radii and the chord, with area (1/2)·r²·sin(θ). **In degrees**: A_segment = (1/2)·r²·(θ·π/180 − sin θ). **Example**: r = 10, θ = 60° = π/3. A_segment = (1/2)·100·(π/3 − sin(60°)) = 50·(π/3 − sqrt(3)/2) ≈ 50·(1.0472 − 0.8660) ≈ 50·0.1812 ≈ 9.06. **Major segment** area = π·r² − A_minor. ✓',
  'ch02p1_segment_area',
  'formula_recall',
  ['circular segment', 'chord', 'arc', 'sector minus triangle', 'sin theta', 'area']
)

add(
  'How do you find the arc measure given an inscribed angle or vice versa?',
  'Use the **Inscribed Angle Theorem**: inscribed angle = (1/2)·(intercepted arc). So given an inscribed angle α, the arc it intercepts is 2α; given an arc of measure β, an inscribed angle intercepting it is β/2. **For intersecting chords** (inside the circle): if two chords AB and CD intersect at point P inside the circle, then **m∠APC = (1/2)·(m(arc AC) + m(arc BD))** — half the sum of the intercepted arcs. **For two secants/tangent-secant from external point P**: **m∠P = (1/2)·|m(arc far) − m(arc near)|** — half the difference of the intercepted arcs. **Example**: Two chords intersect; intercepted arcs 80° and 30°. Angle formed = (1/2)(80 + 30) = 55°. ✓',
  'ch02p1_arc_angle_relations',
  'problem_solving',
  ['inscribed angle', 'arc measure', 'intersecting chords', 'secants', 'half sum half difference']
)

// ============================================================
// SECTION 16 — CIRCLE THEOREMS: TANGENT, SECANT, POWER OF A POINT (3 items)
// ============================================================
add(
  'What are the tangent-secant and secant-secant (Power of a Point) theorems?',
  '**Power of a Point P** w.r.t. a circle: Power(P) = OP² − r² (signed; positive outside, zero on, negative inside). It equals (length of tangent from P)² if P is outside. **Tangent-secant theorem**: If from external point P, a tangent of length PT and a secant through P intersecting the circle at A and B (with A closer to P) are drawn, then **PT² = PA · PB**. **Secant-secant theorem**: If two secants from external P intersect the circle at A,B and C,D (A,C closer), then **PA·PB = PC·PD**. **Two tangents**: PA = PC (tangent lengths from same external point are equal). **Example**: PA·PB = PT². PA = 6, PB = 24 ⇒ PT = sqrt(144) = 12. **Chord-chord (inside)**: If two chords AB and CD intersect at P inside, then **PA·PB = PC·PD**. ✓',
  'ch02p1_power_of_point',
  'formula_recall',
  ['power of point', 'tangent secant', 'secant secant', 'product of segments', 'chord intersection']
)

add(
  'What is the tangent of a circle and the tangent-line properties?',
  '**Tangent line**: a line that touches the circle at exactly one point (the **point of tangency**). **Key property**: a tangent is **perpendicular to the radius** at the point of tangency. **Two tangents from an external point**: lengths are **equal** (congruent segments). **Tangent from external point P**: tangent length t = sqrt(OP² − r²) (Pythagoras on the right triangle OPT, where T is the point of tangency). **Tangent of an angle in a right triangle** (separate concept, "tan"): ratio of opposite over adjacent. **Equation of tangent to circle** (coordinate): For circle x² + y² = r² at point (x_0, y_0) on the circle, tangent line is **x·x_0 + y·y_0 = r²**. **Example**: From point P at distance 13 from center O, with circle radius 5, tangent length = sqrt(169 − 25) = sqrt(144) = 12. ✓',
  'ch02p1_tangent_properties',
  'formula_recall',
  ['tangent', 'point of tangency', 'perpendicular radius', 'equal tangents', 'external point']
)

add(
  'What are the formulas for tangent-tangent angles and inscribed/circumscribed figures?',
  '**Angle formed by two tangents** from external point P, with points of tangency T_1, T_2: **m∠P = (1/2)·|m(major arc T_1T_2) − m(minor arc T_1T_2)|** = 180° − m(minor arc T_1T_2). **Angle formed by a tangent and a chord** at point of tangency = (1/2)·(intercepted arc). **Inscribed circle** (incircle): tangent to all three sides; centered at incenter. **Circumscribed circle** (circumcircle): passes through all vertices; centered at circumcenter. **A polygon is cyclic** iff it can be inscribed in a circle (all vertices on circle). **A polygon is tangential** iff it has an inscribed circle (all sides tangent to a circle); for a tangential quadrilateral, sums of opposite sides are equal: a + c = b + d (Pitot theorem). **Example**: Tangential quadrilateral sides 5, 7, 6, x ⇒ 5 + 6 = 7 + x ⇒ x = 4. ✓',
  'ch02p1_tangent_angle_cyclic',
  'problem_solving',
  ['tangent angle', 'inscribed circle', 'circumscribed', 'cyclic', 'tangential', 'Pitot']
)

// ============================================================
// SECTION 17 — TRANSFORMATIONS & SYMMETRY (4 items)
// ============================================================
add(
  'What are translations and rotations, and how are they represented?',
  '**Translation**: every point moves the same distance in the same direction; vector form: (x, y) → (x + a, y + b). No rotation or reflection; preserves distances, angles, orientation. **Rotation** (about a center O by angle θ, with sign convention CCW positive): about origin: (x, y) → (x·cos θ − y·sin θ, x·sin θ + y·cos θ). **Properties of rigid motions** (translations, rotations, reflections): preserve distances, angles, and areas; called **isometries**. Translations and rotations preserve **orientation** (a right hand stays right); reflections reverse it. **Composition**: Any rigid motion is a composition of reflections; specifically, every isometry is one of: translation, rotation, reflection, or glide reflection. **Example**: Translate (3, 5) by vector (4, −2) → (7, 3). Rotate (1, 0) by 90° about origin → (0, 1). ✓',
  'ch02p1_translation_rotation',
  'formula_recall',
  ['translation', 'rotation', 'isometry', 'rigid motion', 'orientation', 'matrix']
)

add(
  'What are reflections and glide reflections?',
  '**Reflection** across a line l (the mirror): each point P maps to P\' such that l is the perpendicular bisector of PP\'. Reflection reverses orientation. **Reflection across x-axis**: (x, y) → (x, −y). **Across y-axis**: (x, y) → (−x, y). **Across line y = x**: (x, y) → (y, x). **Across line y = −x**: (x, y) → (−y, −x). **Across an arbitrary line ax + by + c = 0**: use the formula P\' = P − 2·(a·x_0 + b·y_0 + c)/(a² + b²)·(a, b). **Glide reflection**: composition of a reflection across a line l and a translation parallel to l. The only isometry besides identity, translation, rotation, and reflection; reverses orientation. **Example**: Reflect (3, 4) across y-axis ⇒ (−3, 4). Glide reflect (1, 2) across x-axis then translate by (2, 0): reflection → (1, −2), then translate → (3, −2). ✓',
  'ch02p1_reflection_glide',
  'formula_recall',
  ['reflection', 'mirror', 'glide reflection', 'orientation reversing', 'axis', 'line of symmetry']
)

add(
  'What is a dilation (scaling) and how does it affect size, area, and shape?',
  '**Dilation** (homothety) with center O and scale factor k: each point P maps to P\' on ray OP with **OP\' = k·OP**. If k > 1, enlargement; 0 < k < 1, reduction; k = 1, identity; k < 0, dilation + half-turn (still centered). **Coordinate form (about origin)**: (x, y) → (kx, ky). **Effect**: lengths scale by |k|; **areas scale by k²**; **volumes scale by k³**. Preserves angles and shape (image is **similar** to original). Lines map to parallel lines (unless they pass through O, in which case they are invariant). **Example**: Triangle with vertices (1,1), (3,1), (1,4), dilated about origin by k = 2 ⇒ (2,2), (6,2), (2,8). Original area = (1/2)(2)(3) = 3; new area = (1/2)(4)(6) = 12 = 2²·3 ✓. **Example (area)**: A 5×7 rectangle scaled by 3 ⇒ new area = 15·21 = 315 = 9·35 (was 35). ✓',
  'ch02p1_dilation',
  'formula_recall',
  ['dilation', 'scaling', 'homothety', 'scale factor', 'area scales k squared', 'similar']
)

add(
  'What are the types of symmetry (line, rotational, point) and how do you identify them?',
  '**Line (reflection) symmetry**: a figure has line symmetry if there is a line l such that reflection across l maps the figure onto itself. Number of symmetry lines varies: equilateral triangle has 3; square has 4; circle has infinitely many (any diameter). **Rotational symmetry**: a figure has rotational symmetry of order n (or angle 360°/n) if a rotation by 360°/n about a center maps it onto itself. Regular n-gon has rotational symmetry of order n. **Point symmetry** (central symmetry): figure maps to itself under point reflection (P → −P about center); equivalent to 180° rotational symmetry. **Example**: A rectangle has 2 lines of symmetry (the perpendicular bisectors) and rotational symmetry of order 2. A parallelogram (non-rectangle) has only point symmetry (order 2 rotation), no line symmetry. A circle has all three (lines: all diameters; rotation: any angle; point: any diameter midpoint). ✓',
  'ch02p1_symmetry_types',
  'formula_recall',
  ['line symmetry', 'rotational symmetry', 'point symmetry', 'reflection', 'order', 'regular polygon']
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
  if (!it.answer.includes('\u2713') && it.answer.length < 200) {
    console.error('SUSPICIOUSLY SHORT ANSWER:', it.topic)
    process.exit(1)
  }
}

const output = {
  generatedAt: new Date().toISOString(),
  totalItems: items.length,
  subject: 'mathematics_formulas_volume_9_chapter_02_part_01',
  volume:
    'Volume 9 — Comprehensive Formula Encyclopedia, Chapter 2 Part 1 (Plane / Euclidean Geometry — Points, Lines, Planes, Segments, Rays; Angles & Angle Pairs; Parallel & Perpendicular Lines; Triangles: Classification, Congruence SSS/SAS/ASA/AAS/HL, Similarity AA/SAS/SSS, Pythagorean Theorem & Converse, Special Right Triangles 45-45-90 & 30-60-90, Triangle Inequality, Cevians, Centers, Heron\'s Formula; Quadrilaterals: Parallelogram, Rectangle, Rhombus, Square, Trapezoid, Kite; Polygons: Interior/Exterior Angles, Regular Polygon Area, Apothem; Circles: Parts, Arcs, Central/Inscribed Angles, Arc Length, Sector & Segment Area, Power of a Point; Transformations: Translation, Rotation, Reflection, Glide Reflection, Dilation, Symmetry)',
  source: 'TRIZA Generated Formula Dataset',
  language: 'en',
  religionNeutral: true,
  items,
}

mkdirSync('data', { recursive: true })
writeFileSync('data/math-formulas-vol9-ch02p1.json', JSON.stringify(output, null, 2))

console.log(`Wrote data/math-formulas-vol9-ch02p1.json with ${items.length} items.`)
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
