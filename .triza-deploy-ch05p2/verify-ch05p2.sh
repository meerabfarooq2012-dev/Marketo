#!/bin/bash
# Chat verification for ch05p2 - queries spanning all 18 sections

URL="https://triza-ai.vercel.app/api/triza/chat"
ORIGIN="https://triza-ai.vercel.app"

# Queries: section_id|query|expected_topic_substring
QUERIES=(
  # Section 1: Vectors (5)
  "s1q1|What is a vector and how is it represented?|vector_definition"
  "s1q2|How do you find the magnitude of a vector?|vector_magnitude"
  "s1q3|What are the operations on vectors?|vector_operations"
  "s1q4|What are the standard basis vectors?|standard_basis"
  "s1q5|How do you find a unit vector in a given direction?|unit_vector_direction"
  # Section 2: Dot Product (5)
  "s2q1|What is the dot product of two vectors?|dot_product"
  "s2q2|How do you find the angle between two vectors using the dot product?|angle_between_vectors"
  "s2q3|What are scalar and vector projections?|projections"
  "s2q4|How do you decompose a vector into parallel and perpendicular components?|vector_decomposition"
  "s2q5|What is the Cauchy-Schwarz inequality?|cauchy_schwarz"
  # Section 3: Cross Product (5)
  "s3q1|What is the cross product of two vectors?|cross_product"
  "s3q2|What are the properties of the cross product?|cross_product_properties"
  "s3q3|How do you find the area of a parallelogram using the cross product?|cross_product_area"
  "s3q4|How do you find the volume of a parallelepiped using the scalar triple product?|scalar_triple_product"
  "s3q5|How do you find the torque using the cross product?|torque_cross_product"
  # Section 4: Lines and Planes (6)
  "s4q1|What is the vector equation of a line in 3D?|line_equation"
  "s4q2|How do you determine if two lines in 3D are parallel intersecting or skew?|lines_parallel_intersecting_skew"
  "s4q3|What is the equation of a plane in 3D?|plane_equation"
  "s4q4|How do you find the distance from a point to a plane?|point_to_plane_distance"
  "s4q5|How do you find the distance from a point to a line in 3D?|point_to_line_distance"
  "s4q6|How do you find the angle between two planes?|angle_between_planes"
  # Section 5: Quadric Surfaces (4)
  "s5q1|What are the standard equations of quadric surfaces?|quadric_surfaces"
  "s5q2|How do you identify an ellipsoid and its properties?|ellipsoid"
  "s5q3|How do you identify a paraboloid?|paraboloid"
  "s5q4|How do you identify cylinders?|cylinders"
  # Section 6: VVF (5)
  "s6q1|What is a vector-valued function?|vvf_definition"
  "s6q2|How do you find the limit and continuity of a vector-valued function?|vvf_limit_continuity"
  "s6q3|How do you find the derivative of a vector-valued function?|vvf_derivative"
  "s6q4|What are the differentiation rules for vector-valued functions?|vvf_differentiation_rules"
  "s6q5|How do you find the integral of a vector-valued function?|vvf_integral"
  # Section 7: Calculus of VVF (5)
  "s7q1|How do you find the arc length of a space curve?|arc_length_space_curve"
  "s7q2|What is the curvature of a curve?|curvature"
  "s7q3|What are the principal unit normal and binormal vectors?|normal_binormal"
  "s7q4|What are the normal and osculating planes?|normal_osculating_plane"
  "s7q5|What are tangential and normal components of acceleration?|tangential_normal_acceleration"
  # Section 8: Motion in Space (4)
  "s8q1|How do you describe the motion of a particle in space?|motion_space"
  "s8q2|How do you analyze projectile motion?|projectile_motion"
  "s8q3|How do you find the speed and distance traveled by a particle?|speed_distance"
  "s8q4|How do you solve initial value problems for vector functions?|ivp_vector"
  # Section 9: Functions of Several Variables (4)
  "s9q1|What is a function of several variables?|function_several_variables"
  "s9q2|How do you find the domain and range of a function of two variables?|domain_range"
  "s9q3|What are level curves and how do you sketch them?|level_curves"
  "s9q4|What are limits and continuity for functions of two variables?|limits_continuity_2var"
  # Section 10: Partial Derivatives (5)
  "s10q1|What is a partial derivative?|partial_derivative"
  "s10q2|How do you compute second-order partial derivatives?|second_partial"
  "s10q3|How do you use the Chain Rule for partial derivatives?|chain_rule_partial"
  "s10q4|How do you do implicit differentiation with partial derivatives?|implicit_partial"
  "s10q5|What is the Laplacian and other higher partial derivative operators?|laplacian_operators"
  # Section 11: Directional Derivatives & Gradient (5)
  "s11q1|What is the directional derivative?|directional_derivative"
  "s11q2|What is the gradient of a function?|gradient"
  "s11q3|What are the properties of the gradient?|gradient_properties"
  "s11q4|How do you find the tangent plane to a level surface?|tangent_plane_level_surface"
  "s11q5|How do you find the normal line to a surface?|normal_line"
  # Section 12: Tangent Planes & Linear Approximation (4)
  "s12q1|What is the linear approximation of a function of two variables?|linear_approximation"
  "s12q2|What is the total differential of a function of two variables?|total_differential"
  "s12q3|How do you use differentials for error estimation?|error_estimation"
  "s12q4|What is the multivariable Taylor polynomial?|taylor_multivariable"
  # Section 13: Extrema (5)
  "s13q1|How do you find critical points of a function of two variables?|critical_points"
  "s13q2|What is the Second Derivative Test for functions of two variables?|second_derivative_test"
  "s13q3|What is a saddle point?|saddle_point"
  "s13q4|How do you find absolute extrema on a closed bounded region?|absolute_extrema"
  "s13q5|How do you find extrema on a boundary using substitution?|boundary_extrema"
  # Section 14: Lagrange Multipliers (4)
  "s14q1|What is the method of Lagrange multipliers?|lagrange_multipliers"
  "s14q2|How do you use Lagrange multipliers with one constraint in 3 variables?|lagrange_3d"
  "s14q3|How do you use Lagrange multipliers with two constraints?|lagrange_two_constraints"
  "s14q4|What are applications of Lagrange multipliers?|lagrange_applications"
  # Section 15: Double Integrals (5)
  "s15q1|What is a double integral and how do you compute it?|double_integral"
  "s15q2|What is Fubini Theorem?|fubini_theorem"
  "s15q3|How do you evaluate double integrals over general regions?|double_integral_regions"
  "s15q4|How do you switch the order of integration?|switch_order"
  "s15q5|How do you find area and volume using double integrals?|area_volume_double"
  # Section 16: Double Integrals in Polar (4)
  "s16q1|How do you evaluate double integrals in polar coordinates?|polar_double_integral"
  "s16q2|When should you use polar coordinates for double integrals?|polar_when_to_use"
  "s16q3|How do you convert a region from Cartesian to polar?|convert_region_polar"
  "s16q4|How do you find the area and centroid using polar double integrals?|polar_area_centroid"
  # Section 17: Triple Integrals (4)
  "s17q1|What is a triple integral and how do you compute it?|triple_integral"
  "s17q2|How do you set up a triple integral over a general solid?|triple_general_solid"
  "s17q3|How do you evaluate triple integrals in cylindrical coordinates?|cylindrical_coordinates"
  "s17q4|How do you evaluate triple integrals in spherical coordinates?|spherical_coordinates"
  # Section 18: Applications (4)
  "s18q1|How do you find the mass and center of mass using multiple integrals?|mass_center"
  "s18q2|How do you find moments of inertia using multiple integrals?|moments_inertia"
  "s18q3|How do you find the surface area using double integrals?|surface_area_double"
  "s18q4|How do you find the probability using double integrals?|probability_double"
)

TOTAL=${#QUERIES[@]}
DIRECT_HITS=0
CROSS_MATCHES=0
MISSES=0
RESULTS_FILE="/home/z/my-project/.triza-deploy-ch05p2/verification-results.txt"
> "$RESULTS_FILE"

echo "Starting verification of $TOTAL queries..." | tee -a "$RESULTS_FILE"

for entry in "${QUERIES[@]}"; do
  IFS='|' read -r qid query expected <<< "$entry"
  response=$(curl -s -X POST "$URL" \
    -H "Content-Type: application/json" \
    -H "Origin: $ORIGIN" \
    -d "{\"message\":\"$query\"}" 2>&1)
  
  topic=$(echo "$response" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('topic','') or d.get('matchedTopic','') or d.get('source','') or '')" 2>/dev/null)
  confidence=$(echo "$response" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('confidence','') or d.get('score','') or '')" 2>/dev/null)
  
  if echo "$topic" | grep -q "ch05p2_$expected"; then
    status="DIRECT_HIT"
    DIRECT_HITS=$((DIRECT_HITS+1))
  elif echo "$topic" | grep -q "ch05p2_"; then
    status="CROSS_MATCH(ch05p2)"
    CROSS_MATCHES=$((CROSS_MATCHES+1))
  elif [ -n "$topic" ]; then
    status="OTHER_VOL($topic)"
    CROSS_MATCHES=$((CROSS_MATCHES+1))
  else
    status="MISS"
    MISSES=$((MISSES+1))
  fi
  
  echo "[$qid] $status | conf=$confidence | topic=$topic | q=${query:0:60}" | tee -a "$RESULTS_FILE"
done

echo "" | tee -a "$RESULTS_FILE"
echo "=== SUMMARY ===" | tee -a "$RESULTS_FILE"
echo "Total queries: $TOTAL" | tee -a "$RESULTS_FILE"
echo "Direct hits: $DIRECT_HITS" | tee -a "$RESULTS_FILE"
echo "Cross/other matches: $CROSS_MATCHES" | tee -a "$RESULTS_FILE"
echo "Misses: $MISSES" | tee -a "$RESULTS_FILE"
echo "Direct hit rate: $(python3 -c "print(f'{$DIRECT_HITS/$TOTAL*100:.1f}%')")" | tee -a "$RESULTS_FILE"
