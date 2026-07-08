/**
 * ============================================================
 *  Mathematics Formula Encyclopedia — Volume 9
 *  Comprehensive Formula Reference
 *  Chapter 3 — Part 1 (Angle Measurement, Unit Circle, Six
 *  Trigonometric Ratios, Reference Angles, Special Angles,
 *  ASTC Signs, Graphs of Trig Functions, Inverse Trig
 *  Functions, Trig Properties & Evaluation)
 *  Generator for TRIZA
 * ============================================================
 *
 *  Output: data/math-formulas-vol9-ch03p1.json
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
// SECTION 1 — ANGLE MEASUREMENT (8 items)
// ============================================================
add(
  'What are degrees and radians, and how do you convert between them?',
  'Two units for measuring angles. **Degree**: a full circle = 360 deg, so 1 deg = 1/360 of a revolution. **Radian**: an angle whose arc length equals the radius; full circle = 2*pi rad. Conversion: pi rad = 180 deg, so (1) degrees -> radians: multiply by pi/180. (2) radians -> degrees: multiply by 180/pi. ### Examples 30 deg = 30 * pi/180 = pi/6 rad. 45 deg = pi/4 rad. 60 deg = pi/3 rad. 90 deg = pi/2 rad. 5pi/6 rad = 5pi/6 * 180/pi = 150 deg. 3 rad ~ 3 * 57.2958 = 171.89 deg. Tip: memorize the key angles pi/6, pi/4, pi/3, pi/2, pi, 3pi/2, 2pi and their degree equivalents. ✓',
  'ch03p1_degree_radian_conversion',
  'formula_recall',
  ['degree', 'radian', 'conversion', 'pi', 'angle measurement']
)

add(
  'How do you find coterminal angles?',
  'Coterminal angles share the same terminal side. To find a coterminal angle, add or subtract 360 deg (or 2*pi rad) repeatedly. ### General Formula For any angle theta, coterminal angles are theta + 360k deg (or theta + 2*pi*k rad), where k is any integer. ### Examples Find coterminal angles of 60 deg: 60 + 360 = 420 deg; 60 - 360 = -300 deg; 60 + 720 = 780 deg, etc. Find one positive and one negative coterminal angle of 5pi/4: 5pi/4 + 2pi = 13pi/4 (positive); 5pi/4 - 2pi = -3pi/4 (negative). Find coterminal of -7pi/6 in [0, 2pi): -7pi/6 + 2pi = 5pi/6. ✓',
  'ch03p1_coterminal_angles',
  'problem_solving',
  ['coterminal', 'terminal side', '360 deg', '2pi', 'angle']
)

add(
  'How do you compute arc length given a central angle in radians?',
  'Arc length s of a circle with radius r subtended by central angle theta (in radians): **s = r * theta**. The angle MUST be in radians for this formula. If theta is in degrees, convert first: theta_rad = theta_deg * pi/180. ### Examples r = 5 cm, theta = pi/3 rad: s = 5 * pi/3 = 5pi/3 cm ~ 5.24 cm. r = 10 in, theta = 60 deg = pi/3: s = 10 * pi/3 ~ 10.47 in. r = 8, theta = 1.5 rad: s = 12. Solve for theta given s = 12, r = 4: theta = s/r = 12/4 = 3 rad. Tip: if angle is small (e.g., < 0.1 rad), arc length ~ chord length. ✓',
  'ch03p1_arc_length',
  'formula_recall',
  ['arc length', 'r theta', 'radian', 'central angle', 'circle']
)

add(
  'How do you compute the area of a circular sector?',
  'Sector area A of a circle with radius r and central angle theta: ### In radians: **A = (1/2) * r^2 * theta**. ### In degrees: A = (theta/360) * pi * r^2. The radian form is cleaner and preferred. ### Examples r = 6, theta = pi/3: A = (1/2)(36)(pi/3) = 6pi ~ 18.85. r = 10, theta = 90 deg = pi/2: A = (1/2)(100)(pi/2) = 25pi ~ 78.54. r = 5, theta = 1.2 rad: A = (1/2)(25)(1.2) = 15. To find theta given A = 12 and r = 4: theta = 2A/r^2 = 24/16 = 1.5 rad. Compare to full circle area pi*r^2; sector is fraction theta/(2pi) of full circle. ✓',
  'ch03p1_sector_area',
  'formula_recall',
  ['sector area', 'circular sector', '1/2 r^2 theta', 'circle', 'radian']
)

add(
  'How do you convert angular velocity to linear velocity?',
  'Linear velocity v and angular velocity omega on a circle of radius r: **v = r * omega**. omega must be in radians per unit time. ### Examples Wheel of radius 0.4 m rotating at 120 rpm (rev/min). Convert: omega = 120 * 2pi rad/min = 240pi rad/min. Linear speed v = 0.4 * 240pi = 96pi m/min ~ 301.6 m/min ~ 5.03 m/s. Belt on pulley r = 6 in, omega = 4 rad/s: v = 6 * 4 = 24 in/s. Satellite at r = 7000 km, omega = 2pi/6320 rad/s (period 6320 s): v ~ 6.96 km/s. ✓',
  'ch03p1_angular_linear_velocity',
  'problem_solving',
  ['angular velocity', 'linear velocity', 'v = r omega', 'rpm', 'circle']
)

add(
  'How are degrees, minutes, and seconds (DMS) used and converted to decimal degrees?',
  'A degree is divided into 60 minutes (60\'), and each minute into 60 seconds (60"). So 1 deg = 60\' = 3600". ### DMS to decimal: decimal = deg + min/60 + sec/3600. ### Decimal to DMS: deg = floor(decimal); min = floor((decimal - deg) * 60); sec = (decimal - deg - min/60) * 3600. ### Examples Convert 35 deg 24\' 36" to decimal: 35 + 24/60 + 36/3600 = 35 + 0.4 + 0.01 = 35.41 deg. Convert 47.325 deg to DMS: deg = 47; min = floor(0.325*60) = floor(19.5) = 19; sec = (0.5)*60 = 30. So 47 deg 19\' 30". Compass bearing N 25 deg 30\' E -> 25.5 deg from north. ✓',
  'ch03p1_dms_decimal_conversion',
  'how_to',
  ['DMS', 'degree minute second', 'decimal degree', 'conversion']
)

add(
  'What are the four quadrants and their angle ranges?',
  'Standard position: vertex at origin, initial side on positive x-axis. Counterclockwise rotation is positive. ### Quadrant I (QI): 0 < theta < pi/2 (0-90 deg); both x and y positive. ### Quadrant II (QII): pi/2 < theta < pi (90-180 deg); x negative, y positive. ### Quadrant III (QIII): pi < theta < 3pi/2 (180-270 deg); both x and y negative. ### Quadrant IV (QIV): 3pi/2 < theta < 2pi (270-360 deg); x positive, y negative. ### Quadrant of an angle: reduce to [0, 2pi) by adding/subtracting 2pi, then check range. Examples: 5pi/4 is in QIII (pi < 5pi/4 < 3pi/2). -pi/6 + 2pi = 11pi/6 is in QIV. 750 deg -> 750 - 720 = 30 deg, QI. ✓',
  'ch03p1_quadrants',
  'factual_question',
  ['quadrant', 'standard position', 'I II III IV', 'angle range']
)

add(
  'How do you find the angle between two hands of a clock?',
  'Clock angle problem: minute hand moves 6 deg/min (360/60), hour hand moves 0.5 deg/min (360/(12*60) = 1/12 deg/min, so 30 deg/hour = 0.5 deg/min). At H hours M minutes, minute hand angle = 6M deg from 12. Hour hand angle = 30H + 0.5M deg from 12. Angle between = |(30H + 0.5M) - 6M| = |30H - 5.5M|. Take min(theta, 360 - theta) for the smaller angle. ### Example At 3:00: |30*3 - 5.5*0| = 90 deg. At 3:30: |30*3 - 5.5*30| = |90 - 165| = 75 deg. At 12:30: |30*12 - 5.5*30| = |360 - 165| = 195; min(195, 165) = 165 deg. At 4:15: |30*4 - 5.5*15| = |120 - 82.5| = 37.5 deg. ✓',
  'ch03p1_clock_angle',
  'problem_solving',
  ['clock', 'angle between hands', 'minute hand', 'hour hand', 'application']
)

// ============================================================
// SECTION 2 — UNIT CIRCLE (6 items)
// ============================================================
add(
  'What is the unit circle and how is it used to define trig functions?',
  'The **unit circle** is the circle of radius 1 centered at the origin: x^2 + y^2 = 1. An angle theta in standard position intersects the unit circle at point P = (x, y) = (cos theta, sin theta). ### Definitions - cos theta = x-coordinate of P - sin theta = y-coordinate of P - tan theta = sin/cos = y/x - csc theta = 1/sin = 1/y - sec theta = 1/cos = 1/x - cot theta = cos/sin = x/y ### Key values at standard angles: - theta=0: (1,0) -> cos=1, sin=0, tan=0 - theta=pi/2: (0,1) -> cos=0, sin=1, tan=undef - theta=pi: (-1,0) -> cos=-1, sin=0, tan=0 - theta=3pi/2: (0,-1) -> cos=0, sin=-1, tan=undef - theta=2pi: (1,0) -> back to start. ✓',
  'ch03p1_unit_circle_definition',
  'formula_recall',
  ['unit circle', 'cos sin', 'definition', 'x^2 + y^2 = 1', 'angle']
)

add(
  'How do you find a point on the unit circle corresponding to a given angle?',
  'For angle theta in standard position, point on unit circle is P = (cos theta, sin theta). For a circle of radius r centered at origin, P = (r cos theta, r sin theta). ### Method 1. If theta is a standard angle (multiple of pi/6, pi/4, pi/3, pi/2), use memorized values. 2. Otherwise, use a reference triangle or calculator. ### Examples Find P at theta = 5pi/6 (QII): reference angle = pi - 5pi/6 = pi/6. cos(5pi/6) = -cos(pi/6) = -sqrt(3)/2 (x neg in QII). sin(5pi/6) = sin(pi/6) = 1/2 (y pos in QII). P = (-sqrt(3)/2, 1/2). Circle of radius 4 at theta = 3pi/4: P = (4 cos(3pi/4), 4 sin(3pi/4)) = (4 * -sqrt(2)/2, 4 * sqrt(2)/2) = (-2sqrt(2), 2sqrt(2)). ✓',
  'ch03p1_point_on_unit_circle',
  'problem_solving',
  ['point on unit circle', 'cos sin', 'r cos theta', 'standard angle', 'circle']
)

add(
  'How do you use the unit circle to remember the values of trig functions?',
  'Memorization strategy: (1) **First quadrant only** — QII, QIII, QIV use symmetry with sign adjustments. (2) At theta=0, pi/2, pi, 3pi/2: cos goes 1, 0, -1, 0, 1; sin goes 0, 1, 0, -1, 0. (3) At pi/6, pi/4, pi/3 use patterns: cos values are sqrt(4)/2, sqrt(2)/2, sqrt(1)/2 = sqrt(3)/2 -> i.e., sqrt(3)/2, sqrt(2)/2, 1/2 going pi/6->pi/4->pi/3? Actually: cos(pi/6) = sqrt(3)/2, cos(pi/4) = sqrt(2)/2, cos(pi/3) = 1/2. sin reverses: 1/2, sqrt(2)/2, sqrt(3)/2. Pattern: numerator sqrt(3), sqrt(2), sqrt(1) decreasing for cos; increasing for sin. ### Example Find cos(7pi/6): QIII, reference = 7pi/6 - pi = pi/6. cos in QIII is negative. cos(7pi/6) = -cos(pi/6) = -sqrt(3)/2. ✓',
  'ch03p1_unit_circle_memorization',
  'how_to',
  ['unit circle', 'memorization', 'first quadrant', 'symmetry', 'standard values']
)

add(
  'What is the relationship between the unit circle and circular motion?',
  'A point moving around the unit circle: position (cos t, sin t) where t is the angle (radians, also arc length since r=1). ### Parametric equations of circular motion x(t) = r cos(omega t), y(t) = r sin(omega t), where omega is angular speed. Period T = 2pi/omega. ### Velocity v_x = -r omega sin(omega t), v_y = r omega cos(omega t); speed = r omega. ### Acceleration a = -omega^2 * r, always pointing toward center (centripetal). ### Example Wheel r = 2 m, omega = 3 rad/s. Position: (2 cos 3t, 2 sin 3t). Period = 2pi/3 s. Speed = 2*3 = 6 m/s. Centripetal accel = 2 * 9 = 18 m/s^2. ✓',
  'ch03p1_circular_motion',
  'problem_solving',
  ['circular motion', 'parametric', 'cos t sin t', 'centripetal', 'angular speed']
)

add(
  'How do you find the reference number (arc length) for a real number t on the unit circle?',
  'For real number t (interpreted as arc length on unit circle, equivalent to angle in radians), the **reference number t\'** is the shortest arc length from the terminal point P(t) to the x-axis. ### Rules - If 0 <= t <= pi/2 (QI): t\' = t. - If pi/2 < t <= pi (QII): t\' = pi - t. - If pi < t <= 3pi/2 (QIII): t\' = t - pi. - If 3pi/2 < t <= 2pi (QIV): t\' = 2pi - t. ### For any real t, first reduce to [0, 2pi): t mod 2pi. ### Examples t = 5pi/6: QII, t\' = pi - 5pi/6 = pi/6. t = 5pi/4: QIII, t\' = 5pi/4 - pi = pi/4. t = 11pi/6: QIV, t\' = 2pi - 11pi/6 = pi/6. t = -pi/4: +2pi -> 7pi/4 (QIV), t\' = 2pi - 7pi/4 = pi/4. ✓',
  'ch03p1_reference_number',
  'formula_recall',
  ['reference number', 'arc length', 'unit circle', 'reduce', 'x-axis']
)

add(
  'How do you find the terminal point P(t) on the unit circle using reference numbers?',
  'Method: (1) Find the reference number t\' for t (in [0, pi/4, pi/3, pi/6 family]). (2) Find P(t\') in QI: (a, b) where a = cos(t\'), b = sin(t\'). (3) Apply signs based on quadrant of t. ### Sign rules - QI: (+, +) - QII: (-, +) - QIII: (-, -) - QIV: (+, -) ### Example Find P(2pi/3). QII. t\' = pi - 2pi/3 = pi/3. P(pi/3) = (1/2, sqrt(3)/2). QII signs: (-, +). So P(2pi/3) = (-1/2, sqrt(3)/2). ### Example P(7pi/6): QIII. t\' = pi/6. P(pi/6) = (sqrt(3)/2, 1/2). QIII signs (-, -): P(7pi/6) = (-sqrt(3)/2, -1/2). ✓',
  'ch03p1_terminal_point',
  'problem_solving',
  ['terminal point', 'reference number', 'quadrant signs', 'unit circle', 'P(t)']
)

// ============================================================
// SECTION 3 — SIX TRIGONOMETRIC RATIOS (8 items)
// ============================================================
add(
  'What are the six trigonometric ratios defined via a right triangle?',
  'In a right triangle with angle theta, label sides: **opposite** (opp, side opposite theta), **adjacent** (adj, side next to theta, not hypotenuse), **hypotenuse** (hyp, longest side opposite the right angle). ### Six ratios - sin theta = opp/hyp - cos theta = adj/hyp - tan theta = opp/adj = sin/cos - csc theta = hyp/opp = 1/sin - sec theta = hyp/adj = 1/cos - cot theta = adj/opp = 1/tan = cos/sin ### Memory aid SOH-CAH-TOA: **S**in = **O**pp/**H**yp, **C**os = **A**dj/**H**yp, **T**an = **O**pp/**A**dj. ### Example Triangle with opp=3, adj=4, hyp=5. sin = 3/5, cos = 4/5, tan = 3/4, csc = 5/3, sec = 5/4, cot = 4/3. ✓',
  'ch03p1_right_triangle_ratios',
  'formula_recall',
  ['right triangle', 'SOH CAH TOA', 'sin cos tan', 'opposite adjacent hypotenuse', 'six ratios']
)

add(
  'How do the trig functions relate to the unit circle definition?',
  'Right triangle and unit circle definitions agree. On unit circle, P = (cos theta, sin theta). Drop perpendicular from P to x-axis: right triangle with hypotenuse 1 (radius), adjacent = cos theta (x), opposite = sin theta (y). So sin = opp/hyp = sin/1 = sin, cos = adj/hyp = cos/1 = cos. ✓ The unit circle extends definitions to all real theta (not just 0 < theta < pi/2). ### For any angle theta (any quadrant): cos theta = x, sin theta = y where (x,y) is on unit circle. tan = y/x, csc = 1/y, sec = 1/x, cot = x/y. ### Example theta = 5pi/3 (QIV). P = (1/2, -sqrt(3)/2). cos = 1/2, sin = -sqrt(3)/2, tan = -sqrt(3), csc = -2/sqrt(3) = -2sqrt(3)/3, sec = 2, cot = -1/sqrt(3) = -sqrt(3)/3. ✓',
  'ch03p1_unit_circle_ratios',
  'formula_recall',
  ['unit circle definition', 'cos sin tan', 'x y coordinates', 'extension', 'all angles']
)

add(
  'How do you evaluate the six trig functions for an angle whose terminal side passes through a given point?',
  'Given point (x, y) on terminal side (not origin): r = sqrt(x^2 + y^2) (distance from origin). ### Trig values - sin theta = y/r - cos theta = x/r - tan theta = y/x (x != 0) - csc theta = r/y (y != 0) - sec theta = r/x (x != 0) - cot theta = x/y (y != 0) ### Example Point (-3, -4) on terminal side. r = sqrt(9 + 16) = 5. sin = -4/5, cos = -3/5, tan = -4/-3 = 4/3, csc = -5/4, sec = -5/3, cot = 3/4. Note: signs follow quadrant — (-3,-4) is QIII, so sin & cos negative, tan positive. ✓',
  'ch03p1_trig_from_point',
  'problem_solving',
  ['terminal side', 'point', 'r sqrt', 'six trig functions', 'evaluate']
)

add(
  'How do you find the other five trig functions given one trig value?',
  'Method: (1) Use reciprocal/quotient identities to get directly related functions. (2) Use Pythagorean identity to find the third. (3) Apply quadrant sign rules. ### Example Given sin theta = 3/5, theta in QII. cos^2 = 1 - sin^2 = 1 - 9/25 = 16/25. QII: cos < 0, so cos = -4/5. tan = sin/cos = (3/5)/(-4/5) = -3/4. csc = 1/sin = 5/3. sec = 1/cos = -5/4. cot = 1/tan = -4/3. ### Example Given tan theta = 2, theta in QIII. r = sqrt(1 + 4) = sqrt(5). In QIII, sin < 0, cos < 0, tan > 0. sin = -2/sqrt(5) = -2sqrt(5)/5, cos = -1/sqrt(5) = -sqrt(5)/5, csc = -sqrt(5)/2, sec = -sqrt(5), cot = 1/2. ✓',
  'ch03p1_find_all_six',
  'problem_solving',
  ['find all six', 'Pythagorean identity', 'reciprocal', 'quadrant signs', 'given one value']
)

add(
  'How do you use the reciprocal identities?',
  'Reciprocal identities: - csc theta = 1/sin theta - sec theta = 1/cos theta - cot theta = 1/tan theta Equivalently: sin * csc = 1, cos * sec = 1, tan * cot = 1. ### Quotient identities - tan theta = sin theta / cos theta - cot theta = cos theta / sin theta = 1/tan theta. ### Example If sin theta = 5/13, csc = 13/5. If tan = 7/24, cot = 24/7. If cos = -3/5, sec = -5/3. Note: when sin theta = 0 (at theta = 0, pi, 2pi), csc is undefined. Same for cos = 0 -> sec undefined, and tan undefined at theta = pi/2, 3pi/2. ✓',
  'ch03p1_reciprocal_quotient_identities',
  'formula_recall',
  ['reciprocal identity', 'quotient identity', 'csc sec cot', '1/sin', 'sin/cos']
)

add(
  'How do you find trig values for non-standard angles using a calculator?',
  'For angles that are not multiples of pi/6, pi/4, pi/3, pi/2, use a calculator. ### Steps (1) Set calculator mode to degree or radian as appropriate. (2) Enter the trig function and angle. (3) For csc/sec/cot, compute the reciprocal of sin/cos/tan. ### Examples sin(0.4 rad) ~ 0.3894 (radian mode). cos(73 deg) ~ 0.2924 (degree mode). tan(1.2 rad) ~ 2.5722. csc(0.4) = 1/sin(0.4) ~ 2.568. sec(73) = 1/cos(73) ~ 3.420. cot(1.2) = 1/tan(1.2) ~ 0.3888. ### Common mistake: forgetting to switch between radian and degree mode. Always check: pi rad = 180 deg, so sin(pi) = 0 in radian mode but sin(180) ~ -0.8012 in degree mode (calculating sin of 180 radians). ✓',
  'ch03p1_calculator_evaluation',
  'how_to',
  ['calculator', 'degree radian mode', 'csc sec cot', 'evaluate', 'non-standard angle']
)

add(
  'What is the domain and range of each trigonometric function?',
  '### sin theta: domain = all real numbers; range = [-1, 1]. ### cos theta: domain = all real numbers; range = [-1, 1]. ### tan theta: domain = all reals except theta = pi/2 + k*pi (k integer); range = all real numbers. ### csc theta: domain = all reals except theta = k*pi (k integer); range = (-inf, -1] U [1, inf). ### sec theta: domain = all reals except theta = pi/2 + k*pi; range = (-inf, -1] U [1, inf). ### cot theta: domain = all reals except theta = k*pi; range = all reals. ### Reasoning sin and cos are bounded by ±1 because they are y and x coordinates on unit circle. csc = 1/sin: when sin in [-1, 1] (excluding 0), 1/sin has magnitude >= 1. tan = sin/cos unbounded because cos can be near 0. ✓',
  'ch03p1_domain_range',
  'formula_recall',
  ['domain', 'range', 'sin cos tan', 'csc sec cot', 'bounded']
)

add(
  'How do you solve a right triangle given an angle and a side?',
  'Solving a right triangle means finding all unknown sides and angles. Use SOH-CAH-TOA and the fact that the two acute angles sum to 90 deg. ### Example Right triangle, angle A = 35 deg, side a (opposite A) = 8. Find b, c, B. Angle B = 90 - 35 = 55 deg. sin(35) = opp/hyp = 8/c -> c = 8/sin(35) ~ 8/0.5736 ~ 13.95. tan(35) = opp/adj = 8/b -> b = 8/tan(35) ~ 8/0.7002 ~ 11.43. Check: a^2 + b^2 = c^2: 64 + 130.65 = 194.65 ~ 13.95^2 = 194.6. ✓ ### Example Hypotenuse c = 10, angle A = 40 deg. a = c sin A = 10 sin 40 ~ 6.43. b = c cos A = 10 cos 40 ~ 7.66. ✓',
  'ch03p1_solve_right_triangle',
  'problem_solving',
  ['solve right triangle', 'SOH CAH TOA', 'angle side', 'find unknowns', 'application']
)

// ============================================================
// SECTION 4 — REFERENCE ANGLES & SPECIAL ANGLES (8 items)
// ============================================================
add(
  'What is a reference angle and how do you find it?',
  'Reference angle theta\' is the acute angle (between 0 and pi/2) formed by the terminal side of theta and the x-axis. Used to evaluate trig functions in any quadrant by relating to QI values. ### Rules - QI (0 < theta < pi/2): theta\' = theta. - QII (pi/2 < theta < pi): theta\' = pi - theta. - QIII (pi < theta < 3pi/2): theta\' = theta - pi. - QIV (3pi/2 < theta < 2pi): theta\' = 2pi - theta. ### General For any angle (including negative or > 2pi), first reduce to [0, 2pi) by adding/subtracting 2pi, then apply above. ### Examples theta = 5pi/6 (QII): theta\' = pi - 5pi/6 = pi/6. theta = 5pi/4 (QIII): theta\' = 5pi/4 - pi = pi/4. theta = 11pi/6 (QIV): theta\' = 2pi - 11pi/6 = pi/6. theta = -2pi/3: +2pi -> 4pi/3 (QIII), theta\' = 4pi/3 - pi = pi/3. ✓',
  'ch03p1_reference_angle_definition',
  'formula_recall',
  ['reference angle', 'acute', 'terminal side', 'x-axis', 'quadrant']
)

add(
  'How do you use a reference angle to evaluate a trig function?',
  '### Procedure (1) Find reference angle theta\' for theta. (2) Find the trig value of theta\' (QI, all positive). (3) Apply sign of trig function in original quadrant. ### Sign rule (ASTC) "All Students Take Calculus": QI all positive, QII sin/csc positive, QIII tan/cot positive, QIV cos/sec positive. ### Examples cos(5pi/6): QII, ref = pi/6. cos positive in QIV only (not QII), so cos(5pi/6) = -cos(pi/6) = -sqrt(3)/2. tan(5pi/4): QIII, ref = pi/4. tan positive in QIII, so tan(5pi/4) = tan(pi/4) = 1. sin(11pi/6): QIV, ref = pi/6. sin negative in QIV, so sin(11pi/6) = -sin(pi/6) = -1/2. csc(-pi/3): -pi/3 + 2pi = 5pi/3 (QIV), ref = pi/3. sin neg in QIV, csc neg, so csc = -csc(pi/3) = -2/sqrt(3) = -2sqrt(3)/3. ✓',
  'ch03p1_reference_angle_evaluation',
  'problem_solving',
  ['reference angle', 'ASTC', 'evaluate', 'sign', 'quadrant']
)

add(
  'What are the exact trig values for special angles 0, 30, 45, 60, 90 degrees?',
  'Special angle values (memorize these!): ### theta=0 (0 rad): sin=0, cos=1, tan=0, csc=undef, sec=1, cot=undef. ### theta=30 (pi/6): sin=1/2, cos=sqrt(3)/2, tan=1/sqrt(3)=sqrt(3)/3, csc=2, sec=2/sqrt(3)=2sqrt(3)/3, cot=sqrt(3). ### theta=45 (pi/4): sin=cos=sqrt(2)/2, tan=cot=1, csc=sec=sqrt(2). ### theta=60 (pi/3): sin=sqrt(3)/2, cos=1/2, tan=sqrt(3), csc=2/sqrt(3)=2sqrt(3)/3, sec=2, cot=1/sqrt(3)=sqrt(3)/3. ### theta=90 (pi/2): sin=1, cos=0, tan=undef, csc=1, sec=undef, cot=0. ### Memory tricks For 0-30-45-60-90, sin values: 0, 1/2, sqrt(2)/2, sqrt(3)/2, 1 = (0, sqrt(0)/2, sqrt(1)/2... actually pattern sqrt(0)/2, sqrt(1)/2, sqrt(2)/2, sqrt(3)/2, sqrt(4)/2). cos reverses this. ✓',
  'ch03p1_special_angles_table',
  'factual_question',
  ['special angles', '30 45 60 90', 'exact values', 'sin cos tan', 'table']
)

add(
  'How do you find exact trig values for multiples of special angles (e.g., 120, 135, 150, 210, 225, 240, 300, 315, 330)?',
  'Use reference angles: the reference angles for these are all 30, 45, or 60 degrees. Apply ASTC signs. ### QII angles (180 - 30, 45, 60 = 150, 135, 120 deg): sin and csc positive; others negative. - sin(150) = sin(30) = 1/2; cos(150) = -cos(30) = -sqrt(3)/2; tan(150) = -tan(30) = -sqrt(3)/3. - sin(135) = sin(45) = sqrt(2)/2; cos(135) = -sqrt(2)/2; tan(135) = -1. - sin(120) = sin(60) = sqrt(3)/2; cos(120) = -1/2; tan(120) = -sqrt(3). ### QIII angles (180 + 30, 45, 60 = 210, 225, 240 deg): tan and cot positive. - sin(210) = -1/2; cos(210) = -sqrt(3)/2; tan(210) = sqrt(3)/3. - sin(225) = -sqrt(2)/2; cos(225) = -sqrt(2)/2; tan(225) = 1. - sin(240) = -sqrt(3)/2; cos(240) = -1/2; tan(240) = sqrt(3). ### QIV angles (360 - 30, 45, 60 = 330, 315, 300 deg): cos and sec positive. - sin(330) = -1/2; cos(330) = sqrt(3)/2; tan(330) = -sqrt(3)/3. - sin(315) = -sqrt(2)/2; cos(315) = sqrt(2)/2; tan(315) = -1. - sin(300) = -sqrt(3)/2; cos(300) = 1/2; tan(300) = -sqrt(3). ✓',
  'ch03p1_special_angle_multiples',
  'problem_solving',
  ['special angles', 'multiples', 'reference angle', 'ASTC', '120 135 150 210 225 240 300 315 330']
)

add(
  'How do you find trig values at 180, 270, and 360 degrees?',
  '### At 180 deg (pi rad): terminal point (-1, 0). sin = 0, cos = -1, tan = 0/(-1) = 0, csc = 1/0 = undef, sec = 1/(-1) = -1, cot = (-1)/0 = undef. ### At 270 deg (3pi/2 rad): terminal point (0, -1). sin = -1, cos = 0, tan = -1/0 = undef, csc = -1, sec = 1/0 = undef, cot = 0/(-1) = 0. ### At 360 deg (2pi rad): same as 0 deg, terminal point (1, 0). sin = 0, cos = 1, tan = 0, csc = undef, sec = 1, cot = undef. ### Pattern As theta goes 0 -> 90 -> 180 -> 270 -> 360, sin goes 0,1,0,-1,0 and cos goes 1,0,-1,0,1 (oscillating). Tangent is 0 at 0, 180, 360; undefined at 90, 270. ✓',
  'ch03p1_quadrantal_angles',
  'factual_question',
  ['quadrantal', '180 270 360', 'terminal point', 'sin cos tan', 'undefined']
)

add(
  'How do you find the six trig values of an angle whose terminal side lies on a given line?',
  'Method: pick a point on the line (other than origin), use formulas sin = y/r, cos = x/r, etc. ### Example Terminal side of theta is on line y = -2x, theta in QIV. Pick point on line in QIV: x > 0, y < 0. Let x = 1, y = -2. r = sqrt(1 + 4) = sqrt(5). sin = -2/sqrt(5) = -2sqrt(5)/5. cos = 1/sqrt(5) = sqrt(5)/5. tan = -2/1 = -2. csc = -sqrt(5)/2. sec = sqrt(5). cot = -1/2. ### Example Terminal side on line y = x with theta in QIII. Pick x = -1, y = -1. r = sqrt(2). sin = -1/sqrt(2) = -sqrt(2)/2, cos = -sqrt(2)/2, tan = 1, csc = -sqrt(2), sec = -sqrt(2), cot = 1. ✓',
  'ch03p1_terminal_line',
  'problem_solving',
  ['terminal side', 'line', 'point', 'six trig values', 'quadrant']
)

add(
  'How do you find angles from a known trig value using inverse trig functions?',
  'Given sin theta = a, find all theta in [0, 2pi). ### Method (1) Find reference angle: theta\' = arcsin(|a|) (in [0, pi/2]). (2) Determine quadrants where the function has the right sign. sin positive in QI and QII; sin negative in QIII and QIV. (3) List angles. ### Example sin theta = sqrt(2)/2. theta\' = pi/4. Positive in QI, QII: theta = pi/4, 3pi/4. ### Example sin theta = -1/2. theta\' = pi/6. Negative in QIII, QIV: theta = 7pi/6, 11pi/6. ### Example cos theta = -sqrt(3)/2. theta\' = pi/6 (since arccos(sqrt(3)/2) = pi/6). cos negative in QII, QIII: theta = 5pi/6, 7pi/6. ### Example tan theta = 1. theta\' = pi/4. tan positive in QI, QIII: theta = pi/4, 5pi/4. ✓',
  'ch03p1_find_angles_from_value',
  'problem_solving',
  ['find angles', 'arcsin', 'reference angle', 'all solutions', 'interval']
)

add(
  'How do you find all real solutions to a trig equation using the period?',
  'Once you find solutions in [0, 2pi), add integer multiples of the period to get all real solutions. ### Periods - sin, cos, csc, sec: period 2pi. - tan, cot: period pi. ### Example Solve sin theta = 1/2. In [0, 2pi): theta = pi/6, 5pi/6. All real solutions: theta = pi/6 + 2pi*k, 5pi/6 + 2pi*k (k integer). ### Example Solve tan theta = 1. In [0, pi): theta = pi/4. All real solutions: theta = pi/4 + pi*k (k integer). ### Example Solve cos theta = 0. In [0, 2pi): theta = pi/2, 3pi/2. All real solutions: theta = pi/2 + pi*k (k integer). [Since pi/2 + pi = 3pi/2, both solutions captured by single formula with period pi.] ✓',
  'ch03p1_general_solutions',
  'problem_solving',
  ['general solution', 'period', '2pi', 'pi', 'all real solutions']
)

// ============================================================
// SECTION 5 — SIGNS OF TRIG FUNCTIONS BY QUADRANT (5 items)
// ============================================================
add(
  'What is the ASTC (CAST) rule for signs of trig functions in each quadrant?',
  '**ASTC** mnemonic: "All Students Take Calculus" tells which trig functions are positive in each quadrant. ### QI (0 < theta < pi/2): **A**ll positive. ### QII (pi/2 < theta < pi): **S**in and csc positive; others negative. ### QIII (pi < theta < 3pi/2): **T**an and cot positive; others negative. ### QIV (3pi/2 < theta < 2pi): **C**os and sec positive; others negative. ### Alternative CAST (counterclockwise starting QIV): C-A-S-T for QIV-QI-QII-QIII. ### Memory tricks - "Add Sugar To Coffee" (QI: All, QII: Sin/csc, QIII: Tan/cot, QIV: Cos/sec). - On unit circle: QI (+,+), QII (-,+), QIII (-,-), QIV (+,-). Signs of x (cos/sec) and y (sin/csc) follow point signs; tan/cot have sign of y/x. ### Example theta in QII: sin and csc positive; cos, sec, tan, cot negative. ✓',
  'ch03p1_astc_rule',
  'formula_recall',
  ['ASTC', 'CAST', 'signs', 'quadrant', 'All Students Take Calculus']
)

add(
  'How do you determine the quadrant of an angle given signs of two trig functions?',
  'Use ASTC to match the signs. ### Example sin theta > 0 and cos theta < 0. sin positive in QI, QII; cos negative in QII, QIII. Intersection: QII. ### Example tan theta < 0 and cos theta > 0. tan negative in QII, QIV; cos positive in QI, QIV. Intersection: QIV. ### Example sin theta < 0 and tan theta > 0. sin negative in QIII, QIV; tan positive in QI, QIII. Intersection: QIII. ### Example sec theta < 0 and csc theta > 0. sec = 1/cos < 0 -> cos < 0 in QII, QIII. csc = 1/sin > 0 -> sin > 0 in QI, QII. Intersection: QII. ✓',
  'ch03p1_quadrant_from_signs',
  'problem_solving',
  ['quadrant', 'signs', 'ASTC', 'intersection', 'determine']
)

add(
  'How do you find all six trig function values given one value and the quadrant?',
  'Method: (1) Identify the sign of the given function in the quadrant. (2) Use Pythagorean identity to find related function. (3) Use reciprocal and quotient identities to fill in the rest. ### Example sin theta = -3/5, theta in QIV. cos^2 = 1 - 9/25 = 16/25, so cos = ±4/5. QIV: cos > 0, so cos = 4/5. tan = sin/cos = (-3/5)/(4/5) = -3/4. csc = 1/sin = -5/3. sec = 1/cos = 5/4. cot = 1/tan = -4/3. ### Example tan theta = -2, theta in QII. r = sqrt(1+4) = sqrt(5). In QII, sin > 0, cos < 0. sin = 2/sqrt(5) = 2sqrt(5)/5, cos = -1/sqrt(5) = -sqrt(5)/5. csc = sqrt(5)/2, sec = -sqrt(5), cot = -1/2. ✓',
  'ch03p1_find_six_from_one_quadrant',
  'problem_solving',
  ['given one value', 'quadrant', 'Pythagorean', 'find six', 'signs']
)

add(
  'How do you determine if a trig expression is positive or negative?',
  'Combine ASTC signs with knowledge of the quadrant of the angle. ### Steps (1) Determine the quadrant of each angle. (2) Use ASTC to find the sign of each function. (3) Combine using arithmetic sign rules. ### Example Evaluate sign of sin(3pi/4) * cos(5pi/4) * tan(7pi/4). sin(3pi/4): QII, sin positive -> +. cos(5pi/4): QIII, cos negative -> -. tan(7pi/4): QIV, tan negative -> -. Product: (+)(-)(-) = +. ### Example sin(2) * cos(3) * tan(4) (radians). 2 rad ~ 114.6 deg (QII, sin +). 3 rad ~ 171.9 deg (QII, cos -). 4 rad ~ 229.2 deg (QIII, tan +). Product: (+)(-)(+) = -. ✓',
  'ch03p1_determine_sign',
  'problem_solving',
  ['sign', 'ASTC', 'expression', 'quadrant', 'product']
)

add(
  'How do you handle trig functions of negative angles?',
  'Even-odd identities for trig: - sin(-theta) = -sin(theta) — sin is **odd**. - cos(-theta) = cos(theta) — cos is **even**. - tan(-theta) = -tan(theta) — tan is **odd**. - csc(-theta) = -csc(theta) — csc is odd. - sec(-theta) = sec(theta) — sec is even. - cot(-theta) = -cot(theta) — cot is odd. ### Reason On unit circle, angle -theta is the reflection of angle theta across x-axis. So x-coordinate (cos) stays same; y-coordinate (sin) changes sign. ### Examples sin(-pi/6) = -sin(pi/6) = -1/2. cos(-pi/3) = cos(pi/3) = 1/2. tan(-pi/4) = -tan(pi/4) = -1. csc(-pi/2) = -csc(pi/2) = -1. sec(-0) = sec(0) = 1. ✓',
  'ch03p1_negative_angles',
  'formula_recall',
  ['negative angle', 'even', 'odd', 'sin cos tan', 'identity']
)

// ============================================================
// SECTION 6 — GRAPHS OF TRIG FUNCTIONS (8 items)
// ============================================================
add(
  'What are the key features of the sine and cosine graphs?',
  '### y = sin theta: starts at (0, 0), max 1 at pi/2, back to 0 at pi, min -1 at 3pi/2, back to 0 at 2pi. Period = 2pi. ### y = cos theta: starts at (0, 1), down to 0 at pi/2, min -1 at pi, back to 0 at 3pi/2, max 1 at 2pi. Period = 2pi. ### Common features - Both have period 2pi. - Both have amplitude 1 (range [-1, 1]). - Both are continuous and smooth (no asymptotes, no breaks). - sin is odd (symmetric about origin); cos is even (symmetric about y-axis). - cos(theta) = sin(theta + pi/2) — cos is sin shifted left by pi/2. ### Key points for one period of sin (theta = 0, pi/2, pi, 3pi/2, 2pi): y = (0, 1, 0, -1, 0). ### Key points for one period of cos: y = (1, 0, -1, 0, 1). ✓',
  'ch03p1_sin_cos_graphs',
  'formula_recall',
  ['sine graph', 'cosine graph', 'period', 'amplitude', 'key points']
)

add(
  'How do you analyze the transformed sine function y = A sin(Bx - C) + D?',
  '### Form: y = A sin(Bx - C) + D (or y = A cos(Bx - C) + D). ### Features - **Amplitude** = |A| (half the distance from max to min). - **Period** = 2pi / |B|. - **Phase shift** = C/B (positive C shifts right by C/B; the function is sin(B(x - C/B))). - **Vertical shift** = D (midline is y = D). - **Domain**: all real numbers. - **Range**: [D - |A|, D + |A|]. ### Example y = 3 sin(2x - pi/2) + 1. Amplitude = 3, period = 2pi/2 = pi, phase shift = (pi/2)/2 = pi/4 (right), vertical shift = 1, midline y = 1, range [-2, 4]. ### Steps to graph (1) Draw midline y = D. (2) Mark amplitude above/below: D ± A. (3) Find one period starting at phase shift: x_start = C/B, x_end = x_start + period. (4) Divide into 4 subintervals; mark max, zero, min, zero, max (for sin) or max, zero, min, zero, max (for cos). (5) Sketch smoothly. ✓',
  'ch03p1_transformed_sin_cos',
  'formula_recall',
  ['amplitude', 'period', 'phase shift', 'vertical shift', 'A sin Bx']
)

add(
  'How do you find the period and asymptotes of y = tan x?',
  '### y = tan x = sin x / cos x. ### Period = pi (half of sin/cos period). ### Vertical asymptotes where cos x = 0: x = pi/2 + k*pi (k integer). So asymptotes at x = ..., -pi/2, pi/2, 3pi/2, .... ### Behavior On (-pi/2, pi/2): tan starts at 0 (theta=0), increases to +infinity as theta -> pi/2^-. On (pi/2, 3pi/2): tan starts at -infinity just right of pi/2, increases through 0 (at pi) to +infinity as theta -> 3pi/2^-. ### Range: all real numbers. ### Key values tan(0) = 0, tan(pi/4) = 1, tan(pi/2) = undef, tan(pi) = 0, tan(-pi/4) = -1. ### Transformed: y = A tan(Bx - C) + D has period = pi/|B|, asymptotes at Bx - C = pi/2 + k*pi, i.e., x = (C + pi/2 + k*pi)/B. No amplitude (tan is unbounded). ✓',
  'ch03p1_tangent_graph',
  'formula_recall',
  ['tangent graph', 'period pi', 'asymptote', 'pi/2', 'undefined']
)

add(
  'What are the graphs of csc, sec, and cot?',
  '### y = csc x = 1/sin x: period 2pi; vertical asymptotes where sin x = 0 (x = 0, pi, 2pi, ...); U-shaped branches opening up at maxima of sin (e.g., at x = pi/2) and down at minima of sin (e.g., at x = 3pi/2); range |y| >= 1. ### y = sec x = 1/cos x: period 2pi; asymptotes where cos x = 0 (x = pi/2, 3pi/2, ...); U-shapes opening up at x = 0, 2pi (maxima of cos) and down at x = pi (minimum of cos); range |y| >= 1. ### y = cot x = cos x / sin x = 1/tan x: period pi; asymptotes where sin x = 0 (x = 0, pi, 2pi, ...); decreasing on each branch from +infinity to -infinity; passes through 0 at x = pi/4 + k*pi (i.e., where tan = 1, but cot = 1 there too — actually cot passes 0 at x = pi/2 + k*pi where cos = 0). Note: csc and sec look like series of U-shapes; cot looks like decreasing tan curves. ✓',
  'ch03p1_csc_sec_cot_graphs',
  'formula_recall',
  ['cosecant graph', 'secant graph', 'cotangent graph', 'asymptote', 'U-shape']
)

add(
  'How do you determine amplitude, period, phase shift, and vertical shift from a trig equation?',
  '### Form: y = A sin(B(x - C)) + D (or y = A cos(B(x - C)) + D). Note the alternate form y = A sin(Bx - phi) + D has phase shift phi/B. Read off: - A = amplitude (use |A|). - B: affects period; period = 2pi/|B| (for sin, cos, csc, sec) or pi/|B| (for tan, cot). - C (or phi/B): phase shift right by C. - D: vertical shift (midline y = D). ### Example y = -2 cos(3x + pi/4) - 5. A = -2 (amplitude = |-2| = 2; negative reflects across x-axis), B = 3 (period = 2pi/3), phase shift = -(pi/4)/3 = -pi/12 (left by pi/12), D = -5 (midline y = -5), range [-7, -3]. ### Example y = 4 tan(pi x - pi/2). A = 4, B = pi, period = pi/pi = 1, phase shift = (pi/2)/pi = 1/2 (right). No amplitude, no vertical shift. ✓',
  'ch03p1_graph_parameters',
  'problem_solving',
  ['amplitude', 'period', 'phase shift', 'vertical shift', 'read off']
)

add(
  'How do you write the equation of a sinusoidal function from its graph?',
  '### Steps (1) Find midline D = (max + min)/2. (2) Find amplitude A = (max - min)/2. (3) Find period = (horizontal distance for one cycle); B = 2pi/period. (4) Determine if sine or cosine fits better: cosine starts at max (or A*1 + D if positive A); sine starts at midline going up. (5) Phase shift C: how far the standard graph is shifted. ### Example Graph: max = 5 at x = 0, min = -1 at x = pi, period = 2pi. D = (5 + -1)/2 = 2. A = (5 - -1)/2 = 3. B = 2pi/2pi = 1. Starts at max, so cosine: y = 3 cos(x) + 2. (Phase shift = 0.) ### Example Max = 4 at x = pi/4, min = 0 at x = 5pi/4, period = 2pi. D = 2, A = 2, B = 1. Cosine shifted right by pi/4: y = 2 cos(x - pi/4) + 2. Or as sine: max at pi/4 means sine at quarter period (pi/2) shifted left by pi/4 — y = 2 sin(x + pi/4) + 2. ✓',
  'ch03p1_sinusoidal_equation',
  'problem_solving',
  ['sinusoidal', 'equation from graph', 'amplitude period', 'phase shift', 'modeling']
)

add(
  'How do you model real-world periodic phenomena with sinusoidal functions?',
  'Many natural phenomena are periodic: tides, sound waves, temperature cycles, pendulum motion, etc. ### Steps (1) Identify max and min values; compute D (midline) and A (amplitude). (2) Identify period (time for one cycle); B = 2pi/period. (3) Determine phase shift from initial condition. (4) Write y = A sin(B(t - C)) + D or A cos(B(t - C)) + D. ### Example Temperature: high 90 at 4pm, low 60 at 4am, period 24 hours. D = (90+60)/2 = 75. A = 15. B = 2pi/24 = pi/12. Use cosine starting at max at t = 16 (4pm): T(t) = 15 cos((pi/12)(t - 16)) + 75. ### Example Tide: low 2 ft at 6am, high 10 ft at noon, period 12 hours. D = 6, A = 4, B = 2pi/12 = pi/6. Use sine starting at midline going up at t = 9 (between low and high): h(t) = 4 sin((pi/6)(t - 9)) + 6. ✓',
  'ch03p1_real_world_modeling',
  'problem_solving',
  ['real world', 'modeling', 'temperature', 'tide', 'periodic', 'sinusoidal']
)

add(
  'What are the domains, ranges, and periods of all six trig functions?',
  '### sin, cos: domain = all reals; range = [-1, 1]; period = 2pi. ### tan, cot: domain = all reals except multiples of pi/2 (tan) or multiples of pi (cot); range = all reals; period = pi. ### csc, sec: domain = all reals except multiples of pi (csc) or multiples of pi/2 (sec); range = (-inf, -1] U [1, inf); period = 2pi. ### Compact summary | Function | Domain (exclude) | Range | Period | | sin, cos | (none) | [-1, 1] | 2pi | | tan | pi/2 + k*pi | (-inf, inf) | pi | | cot | k*pi | (-inf, inf) | pi | | csc | k*pi | |y| >= 1 | 2pi | | sec | pi/2 + k*pi | |y| >= 1 | 2pi | The csc/sec ranges come from reciprocal of bounded [-1, 1]; magnitude must be >= 1. ✓',
  'ch03p1_all_function_properties',
  'factual_question',
  ['domain range period', 'all six', 'summary', 'trig functions', 'table']
)

// ============================================================
// SECTION 7 — INVERSE TRIG FUNCTIONS (7 items)
// ============================================================
add(
  'What are inverse trigonometric functions and what are their principal values?',
  'Inverse trig functions undo the trig functions. Because trig functions are periodic (not one-to-one), we restrict the domain to a principal branch to make them invertible. ### Definitions and principal ranges - **arcsin x** (also sin^-1 x): inverse of sin on [-pi/2, pi/2]. Domain of arcsin = [-1, 1] (range of sin). Range of arcsin = [-pi/2, pi/2]. - **arccos x**: inverse of cos on [0, pi]. Domain = [-1, 1]. Range = [0, pi]. - **arctan x**: inverse of tan on (-pi/2, pi/2). Domain = all reals. Range = (-pi/2, pi/2). ### Examples arcsin(1/2) = pi/6. arcsin(-sqrt(3)/2) = -pi/3. arccos(1/2) = pi/3. arccos(-1/2) = 2pi/3. arctan(1) = pi/4. arctan(-1) = -pi/4. arctan(sqrt(3)) = pi/3. ### Note sin^-1 x does NOT mean 1/sin x (which is csc x). The "-1" denotes function inverse. ✓',
  'ch03p1_inverse_trig_definition',
  'formula_recall',
  ['inverse trig', 'arcsin', 'arccos', 'arctan', 'principal value']
)

add(
  'How do you evaluate inverse trigonometric expressions?',
  '### Method Read as "the angle whose [sin/cos/tan] is x." Use principal value range. ### Examples sin^-1(sqrt(2)/2) = pi/4 (the angle in [-pi/2, pi/2] with sin = sqrt(2)/2). cos^-1(-sqrt(3)/2) = 5pi/6 (the angle in [0, pi] with cos = -sqrt(3)/2). tan^-1(-1) = -pi/4 (angle in (-pi/2, pi/2) with tan = -1). ### Special values - sin^-1(0) = 0; sin^-1(1) = pi/2; sin^-1(-1) = -pi/2. - cos^-1(0) = pi/2; cos^-1(1) = 0; cos^-1(-1) = pi. - tan^-1(0) = 0; tan^-1(infinity) -> pi/2; tan^-1(-infinity) -> -pi/2. ### Caution sin^-1(2) is undefined (2 not in domain [-1, 1]). cos^-1(-1.5) undefined. ### Composition sin(sin^-1(x)) = x for x in [-1, 1]. sin^-1(sin theta) = theta only if theta in [-pi/2, pi/2]. Otherwise, need to adjust by periodicity. Example: sin^-1(sin(3pi/4)) = sin^-1(sqrt(2)/2) = pi/4 (not 3pi/4). ✓',
  'ch03p1_evaluate_inverse_trig',
  'problem_solving',
  ['evaluate', 'inverse trig', 'arcsin', 'principal value', 'composition']
)

add(
  'How do you evaluate compositions like sin(arccos(x))?',
  'Use a reference triangle. Set up a right triangle where one angle is arccos(x) (so cos of that angle is x). Read off the other trig values. ### Example Find sin(arccos(3/5)). Let alpha = arccos(3/5), so cos alpha = 3/5. Triangle: adj = 3, hyp = 5, opp = sqrt(25 - 9) = 4. sin alpha = opp/hyp = 4/5. So sin(arccos(3/5)) = 4/5. ### Example Find cos(arctan(2)). Let alpha = arctan(2), tan alpha = 2 = opp/adj. Triangle: opp = 2, adj = 1, hyp = sqrt(5). cos alpha = adj/hyp = 1/sqrt(5) = sqrt(5)/5. So cos(arctan(2)) = sqrt(5)/5. ### Example Find tan(arcsin(-3/4)). alpha = arcsin(-3/4) in [-pi/2, 0]. sin alpha = -3/4. Triangle: opp = -3, hyp = 4, adj = sqrt(16-9) = sqrt(7) (adjacent positive in QIV). tan = opp/adj = -3/sqrt(7) = -3sqrt(7)/7. ✓',
  'ch03p1_composite_trig_inverse',
  'problem_solving',
  ['composition', 'sin arccos', 'reference triangle', 'composite', 'evaluate']
)

add(
  'What are the domains, ranges, and graphs of inverse trig functions?',
  '### arcsin x: domain = [-1, 1]; range = [-pi/2, pi/2]. Graph: increasing, starts at (-1, -pi/2), passes through (0, 0), ends at (1, pi/2). Reflection of y = sin x (restricted to [-pi/2, pi/2]) across line y = x. ### arccos x: domain = [-1, 1]; range = [0, pi]. Graph: decreasing, starts at (-1, pi), passes through (0, pi/2), ends at (1, 0). ### arctan x: domain = (-inf, inf); range = (-pi/2, pi/2). Graph: increasing, horizontal asymptotes y = pi/2 (as x -> +inf) and y = -pi/2 (as x -> -inf). Passes through (0, 0). ### Properties - All three are continuous and one-to-one on their domains. - arcsin is odd: arcsin(-x) = -arcsin(x). - arctan is odd: arctan(-x) = -arctan(x). - arccos is NOT odd; instead arccos(-x) = pi - arccos(x). ### Derivative of arcsin x = 1/sqrt(1-x^2). Derivative of arccos x = -1/sqrt(1-x^2). Derivative of arctan x = 1/(1+x^2). ✓',
  'ch03p1_inverse_trig_properties',
  'formula_recall',
  ['inverse trig', 'domain', 'range', 'graph', 'asymptote', 'derivative']
)

add(
  'How do you simplify expressions involving inverse trig compositions?',
  '### Useful identities - sin(arcsin x) = x for x in [-1, 1]. - cos(arccos x) = x for x in [-1, 1]. - tan(arctan x) = x for all x. - arcsin(sin theta) = theta only if theta in [-pi/2, pi/2]; otherwise adjust by periodicity/symmetry. - arccos(cos theta) = theta only if theta in [0, pi]. - arctan(tan theta) = theta only if theta in (-pi/2, pi/2). - **arcsin x + arccos x = pi/2** (complementary). - arctan x + arctan(1/x) = pi/2 for x > 0; = -pi/2 for x < 0. ### Examples arcsin(0.5) + arccos(0.5) = pi/6 + pi/3 = pi/2. ✓ arcsin(sin(3pi/4)) = arcsin(sqrt(2)/2) = pi/4 (since 3pi/4 not in principal range). arccos(cos(5pi/4)) = arccos(-sqrt(2)/2) = 3pi/4 (since 5pi/4 not in [0, pi], but cos(5pi/4) = -sqrt(2)/2, and arccos of that is 3pi/4). ✓',
  'ch03p1_inverse_trig_identities',
  'formula_recall',
  ['inverse trig identity', 'arcsin + arccos', 'pi/2', 'composition', 'simplify']
)

add(
  'How do you solve equations involving inverse trig functions?',
  'Method: take sin/cos/tan of both sides, then solve the resulting algebraic equation. Check answers against the principal range. ### Example Solve arcsin(x) = pi/3. Take sin of both sides: x = sin(pi/3) = sqrt(3)/2. Check: pi/3 in [-pi/2, pi/2]? Yes. So x = sqrt(3)/2. ### Example Solve arctan(2x + 1) = pi/4. Take tan: 2x + 1 = tan(pi/4) = 1. So x = 0. Check: arctan(1) = pi/4. ✓ ### Example Solve 2 arcsin(x) = pi/2. arcsin(x) = pi/4. x = sin(pi/4) = sqrt(2)/2. ✓ ### Example Solve arccos(x) + arcsin(x) = pi/2. Always true (identity), so all x in [-1, 1] are solutions. ### Example Solve arcsin(x) = arcsin(2x). Take sin: x = 2x -> x = 0. But also need to check: arcsin is one-to-one so x = 2x means x = 0. ✓',
  'ch03p1_solve_inverse_trig_equations',
  'problem_solving',
  ['solve', 'inverse trig equation', 'take sin', 'principal range', 'check']
)

add(
  'How do you convert between inverse trig functions and the related angle form?',
  'Sometimes you want to express an angle in different equivalent forms, or convert between inverse trig and explicit angle notation. ### Conversions - arcsin(x) = arccos(sqrt(1-x^2)) for x in [0, 1] (since if sin = x, then cos = sqrt(1-x^2) in QI). - arctan(x) = arcsin(x/sqrt(1+x^2)) for all x. - arctan(x) = arccos(1/sqrt(1+x^2)) for x >= 0. - arcsin(-x) = -arcsin(x); arctan(-x) = -arctan(x). - arccos(-x) = pi - arccos(x). ### Examples Express arctan(3) as arccos. Let alpha = arctan(3), so tan alpha = 3. Triangle: opp = 3, adj = 1, hyp = sqrt(10). cos alpha = 1/sqrt(10). So alpha = arccos(1/sqrt(10)) = arccos(sqrt(10)/10). ### Express arcsin(3/5) + arccos(3/5) using single function. arcsin(3/5) + arccos(3/5) = pi/2 (identity). ✓',
  'ch03p1_inverse_trig_conversion',
  'problem_solving',
  ['inverse trig', 'conversion', 'arctan to arcsin', 'identity', 'reference triangle']
)

// ============================================================
// SECTION 8 — TRIG PROPERTIES & EVALUATION (7 items)
// ============================================================
add(
  'What are the even and odd properties of trigonometric functions?',
  '### Even functions: cos theta = cos(-theta); sec theta = sec(-theta). ### Odd functions: sin(-theta) = -sin(theta); csc(-theta) = -csc(theta); tan(-theta) = -tan(theta); cot(-theta) = -cot(theta). ### Reason On unit circle, angle -theta is the reflection of theta across the x-axis: (cos theta, sin theta) -> (cos theta, -sin theta). So x (cos) unchanged, y (sin) flips. ### Graphs Even functions are symmetric about y-axis; odd functions are symmetric about origin. ### Examples cos(-pi/3) = cos(pi/3) = 1/2. sin(-pi/4) = -sin(pi/4) = -sqrt(2)/2. tan(-pi/6) = -tan(pi/6) = -sqrt(3)/3. ### Application Simplifies expressions: sin(-x) cos(-x) = (-sin x)(cos x) = -sin x cos x = -(1/2) sin(2x). ✓',
  'ch03p1_even_odd_properties',
  'formula_recall',
  ['even', 'odd', 'cos theta cos -theta', 'sin -theta -sin theta', 'symmetry']
)

add(
  'How do you use the reference triangle method to evaluate trig expressions?',
  'Reference triangle method: draw a right triangle representing the angle, label sides, then read off trig values. ### Steps (1) Identify the angle and quadrant. (2) Find reference angle (acute). (3) Draw right triangle with the reference angle. (4) Label sides using known trig value (often a Pythagorean triple: 3-4-5, 5-12-13, 8-15-17). (5) Apply signs based on quadrant. ### Example Evaluate sin(theta) and cos(theta) if tan(theta) = 5/12 and theta in QIII. Triangle: opp = 5, adj = 12, hyp = 13 (Pythagorean triple). In QIII, sin and cos are both negative. sin = -5/13, cos = -12/13. ### Example If cos(theta) = 7/25 (QIV), find sin and tan. Triangle: adj = 7, hyp = 25, opp = sqrt(625 - 49) = sqrt(576) = 24. QIV: sin negative. sin = -24/25, tan = -24/7. ✓',
  'ch03p1_reference_triangle_method',
  'how_to',
  ['reference triangle', 'Pythagorean triple', 'evaluate', 'right triangle', 'method']
)

add(
  'How do you simplify trig expressions using identities?',
  'Strategy: use reciprocal, quotient, and Pythagorean identities to rewrite expressions. ### Common identities - sin^2 + cos^2 = 1 -> sin^2 = 1 - cos^2, cos^2 = 1 - sin^2. - 1 + tan^2 = sec^2 -> tan^2 = sec^2 - 1. - 1 + cot^2 = csc^2 -> cot^2 = csc^2 - 1. ### Example Simplify (1 - cos^2 x) / sin x. Use 1 - cos^2 = sin^2: sin^2 x / sin x = sin x. ### Example Simplify sec^2 x - 1. Use sec^2 - 1 = tan^2: = tan^2 x. ### Example Simplify (sin x + cos x)^2 - 1. Expand: sin^2 + 2 sin cos + cos^2 - 1 = (sin^2 + cos^2) + 2 sin cos - 1 = 1 + 2 sin cos - 1 = 2 sin x cos x = sin(2x). ### Example Simplify csc x - sin x = (1/sin x) - sin x = (1 - sin^2 x)/sin x = cos^2 x / sin x = cos x cot x. ✓',
  'ch03p1_simplify_expressions',
  'problem_solving',
  ['simplify', 'identity', 'Pythagorean', 'factor', 'trig expression']
)

add(
  'How do you evaluate trig functions of real numbers?',
  'A real number t can be interpreted as an angle in radians. The trig functions are defined for all real t via the unit circle. ### Examples (in radians) sin(1) ~ 0.8415 (QI, since 1 < pi/2 ~ 1.5708). cos(2) ~ -0.4161 (QII, since pi/2 ~ 1.5708 < 2 < pi ~ 3.1416). sin(4) ~ -0.7568 (QIII, since pi < 4 < 3pi/2 ~ 4.712). tan(10) ~ 0.6484 (10 mod pi ~ 10 - 3pi ~ 0.5752; tan(0.5752) ~ 0.6484). ### To evaluate by hand (1) Reduce t modulo 2pi if t > 2pi or t < 0. (2) Find quadrant. (3) Find reference angle. (4) Use ASTC and special angle values if applicable. ### Example Evaluate sin(17pi/6). 17pi/6 - 2pi = 17pi/6 - 12pi/6 = 5pi/6 (QII). Reference = pi - 5pi/6 = pi/6. sin positive in QII, sin(5pi/6) = sin(pi/6) = 1/2. ✓',
  'ch03p1_evaluate_real_numbers',
  'problem_solving',
  ['real number', 'radian', 'evaluate', 'mod 2pi', 'unit circle']
)

add(
  'How do you find exact values using sum/difference and double-angle formulas?',
  'Combine formulas to express non-standard angles as sums/differences of standard angles. ### Example sin(75 deg) = sin(45 + 30) = sin 45 cos 30 + cos 45 sin 30 = (sqrt(2)/2)(sqrt(3)/2) + (sqrt(2)/2)(1/2) = (sqrt(6) + sqrt(2))/4. ### Example cos(15 deg) = cos(45 - 30) = cos 45 cos 30 + sin 45 sin 30 = (sqrt(2)/2)(sqrt(3)/2) + (sqrt(2)/2)(1/2) = (sqrt(6) + sqrt(2))/4. ### Example tan(105 deg) = tan(60 + 45) = (tan 60 + tan 45)/(1 - tan 60 tan 45) = (sqrt(3) + 1)/(1 - sqrt(3)) = -(sqrt(3) + 1)/(sqrt(3) - 1) = -((sqrt(3) + 1)^2)/((sqrt(3) - 1)(sqrt(3) + 1)) = -((3 + 2sqrt(3) + 1))/2 = -(4 + 2sqrt(3))/2 = -2 - sqrt(3). ### Example sin(22.5 deg) using half-angle: 22.5 = 45/2. sin(22.5) = sqrt((1 - cos 45)/2) = sqrt((1 - sqrt(2)/2)/2) = sqrt((2 - sqrt(2))/4) = sqrt(2 - sqrt(2))/2. ✓',
  'ch03p1_exact_values_formulas',
  'problem_solving',
  ['exact value', 'sum difference', 'half angle', 'non-standard angle', 'formula']
)

add(
  'What are the periodic properties of trigonometric functions?',
  'A function f is periodic with period p > 0 if f(theta + p) = f(theta) for all theta. ### Periods - sin, cos, csc, sec: fundamental period = 2pi. - tan, cot: fundamental period = pi. ### Implications Knowing values on one period gives all values. ### Transformed functions - y = sin(Bx) has period 2pi/|B|. - y = cos(Bx) has period 2pi/|B|. - y = tan(Bx) has period pi/|B|. ### Identities - sin(theta + 2pi) = sin(theta); cos(theta + 2pi) = cos(theta). - sin(theta + pi) = -sin(theta); cos(theta + pi) = -cos(theta). - tan(theta + pi) = tan(theta) (period pi). - sin(theta + pi/2) = cos(theta); cos(theta + pi/2) = -sin(theta). ### Examples sin(17pi/6) = sin(17pi/6 - 2pi) = sin(5pi/6) = 1/2. cos(100pi/3) = cos(100pi/3 - 16*2pi) — wait, 100pi/3 / (2pi) = 100/6 = 16.67, so subtract 16*2pi = 32pi: 100pi/3 - 32pi = 100pi/3 - 96pi/3 = 4pi/3 (QIII). cos(4pi/3) = -1/2. ✓',
  'ch03p1_periodic_properties',
  'formula_recall',
  ['periodic', 'period', '2pi', 'pi', 'identity', 'transformed']
)

add(
  'How do you find the values of all six trig functions at common non-unit-circle angles using combinations of special angles?',
  'For angles like 15, 75, 105, 165, 195, 255, 285, 345 degrees, use sum/difference formulas combining 30, 45, 60, 90. ### Strategy (1) Express the angle as sum or difference of two special angles. (2) Apply sum/difference formulas. (3) Simplify. ### 15 deg = 45 - 30 - sin 15 = sin 45 cos 30 - cos 45 sin 30 = (sqrt(6) - sqrt(2))/4. - cos 15 = (sqrt(6) + sqrt(2))/4. - tan 15 = 2 - sqrt(3). ### 75 deg = 45 + 30 - sin 75 = (sqrt(6) + sqrt(2))/4. - cos 75 = (sqrt(6) - sqrt(2))/4. - tan 75 = 2 + sqrt(3). ### 105 deg = 60 + 45 (QII, so cos and tan negative) - sin 105 = sin 75 = (sqrt(6) + sqrt(2))/4 (sin positive in QII). - cos 105 = -cos 75 = -(sqrt(6) - sqrt(2))/4 = (sqrt(2) - sqrt(6))/4. - tan 105 = -tan 75 = -(2 + sqrt(3)). ### 165 deg = 180 - 15 (QII) - sin 165 = sin 15 = (sqrt(6) - sqrt(2))/4. - cos 165 = -cos 15 = -(sqrt(6) + sqrt(2))/4. ### 22.5 deg, 67.5 deg (half-angles) - sin 22.5 = sqrt(2 - sqrt(2))/2. - cos 22.5 = sqrt(2 + sqrt(2))/2. - sin 67.5 = cos 22.5 = sqrt(2 + sqrt(2))/2. ✓',
  'ch03p1_nonstandard_angle_values',
  'problem_solving',
  ['non-standard angle', '15 75 105', 'sum difference', 'half angle', 'exact value']
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
  subject: 'mathematics_formulas_volume_9_chapter_03_part_01',
  volume:
    'Volume 9 — Comprehensive Formula Encyclopedia, Chapter 3 Part 1 (Trigonometric Functions — Angle Measurement & Conversion, Coterminal Angles, Arc Length, Sector Area, DMS, Unit Circle, Six Trigonometric Ratios via Right Triangle & Unit Circle, Reference Angles & Numbers, Special Angles 0/30/45/60/90 and Multiples, ASTC/CAST Signs by Quadrant, Graphs of Trig Functions with Amplitude/Period/Phase Shift/Vertical Shift, Inverse Trig Functions arcsin/arccos/arctan, Even/Odd Properties, Domains & Ranges, Reference Triangle Method, Evaluation of Trig Expressions)',
  source: 'TRIZA Generated Formula Dataset',
  language: 'en',
  religionNeutral: true,
  items,
}

mkdirSync('data', { recursive: true })
writeFileSync('data/math-formulas-vol9-ch03p1.json', JSON.stringify(output, null, 2))

console.log(`Wrote data/math-formulas-vol9-ch03p1.json with ${items.length} items.`)
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
