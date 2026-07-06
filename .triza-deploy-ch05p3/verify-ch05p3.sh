#!/bin/bash
# Chat verification for ch05p3 - queries spanning all 12 sections

URL="https://triza-ai.vercel.app/api/triza/chat"
ORIGIN="https://triza-ai.vercel.app"

# Queries: section_id|query|expected_topic_substring
QUERIES=(
  # Section 1: Vector Fields (5)
  "s1q1|What is a vector field?|vector_field_definition"
  "s1q2|What is a gradient vector field?|gradient_field"
  "s1q3|How do you find the potential function of a conservative vector field?|potential_function"
  "s1q4|What are examples of important vector fields in physics?|physics_vector_fields"
  "s1q5|How do you sketch a vector field?|sketch_vector_field"
  # Section 2: Line Integrals (6)
  "s2q1|What is a line integral of a scalar function?|line_integral_scalar"
  "s2q2|How do you compute a line integral of a vector field?|line_integral_vector"
  "s2q3|What is the physical interpretation of a line integral?|line_integral_work"
  "s2q4|How do you compute line integrals along piecewise smooth curves?|line_integral_piecewise"
  "s2q5|How do you compute line integrals with respect to x y z separately?|line_integral_coordinates"
  "s2q6|What is the relationship between line integrals and arc length?|line_integral_arc_length"
  # Section 3: FTC for Line Integrals (5)
  "s3q1|What is the Fundamental Theorem for Line Integrals?|ftc_line_integrals"
  "s3q2|How do you determine if a vector field is conservative?|conservative_test"
  "s3q3|What is path independence of line integrals?|path_independence"
  "s3q4|How do you use the Fundamental Theorem to evaluate line integrals?|ftc_evaluate"
  "s3q5|How do you find the work done by a conservative force?|work_conservative"
  # Section 4: Green's Theorem (6)
  "s4q1|What is Green Theorem?|greens_theorem"
  "s4q2|How do you use Green Theorem to evaluate line integrals?|greens_evaluate"
  "s4q3|How do you use Green Theorem to find area?|greens_area"
  "s4q4|What is the extended form of Green Theorem for regions with holes?|greens_holes"
  "s4q5|What is the alternative flux divergence form of Green Theorem?|greens_flux_form"
  "s4q6|How do you compute flux and circulation using Green Theorem?|flux_circulation"
  # Section 5: Curl and Divergence (5)
  "s5q1|What is the curl of a vector field?|curl"
  "s5q2|What is the divergence of a vector field?|divergence"
  "s5q3|What is the relationship between curl div and conservative fields?|curl_div_relationships"
  "s5q4|What is the Laplacian and how does it relate to div and grad?|laplacian_div_grad"
  "s5q5|What are the vector calculus identities?|vector_identities"
  # Section 6: Parametric Surfaces (5)
  "s6q1|What is a parametric surface?|parametric_surface"
  "s6q2|How do you find the tangent plane to a parametric surface?|tangent_plane_parametric"
  "s6q3|How do you find the surface area of a parametric surface?|surface_area_parametric"
  "s6q4|How do you find the normal vector to a surface?|surface_normal"
  "s6q5|How do you find the orientation of a surface?|surface_orientation"
  # Section 7: Surface Integrals (6)
  "s7q1|What is a surface integral of a scalar function?|surface_integral_scalar"
  "s7q2|How do you compute a surface integral of a vector field flux?|surface_integral_vector"
  "s7q3|How do you compute surface integrals over graphs z = g(x,y)?|surface_integral_graph"
  "s7q4|How do you compute surface integrals over spheres?|surface_integral_sphere"
  "s7q5|How do you compute surface integrals over cylinders?|surface_integral_cylinder"
  "s7q6|How do you find the mass and center of mass of a surface?|surface_mass_center"
  # Section 8: Stokes' Theorem (5)
  "s8q1|What is Stokes Theorem?|stokes_theorem"
  "s8q2|How do you use Stokes Theorem to evaluate line integrals?|stokes_line_integral"
  "s8q3|How do you use Stokes Theorem to evaluate surface integrals?|stokes_surface_integral"
  "s8q4|What is the significance of Stokes Theorem being independent of surface?|stokes_surface_independence"
  "s8q5|How do you verify Stokes Theorem with an example?|stokes_verify"
  # Section 9: Divergence Theorem (6)
  "s9q1|What is the Divergence Theorem Gauss Theorem?|divergence_theorem"
  "s9q2|How do you use the Divergence Theorem to evaluate surface integrals?|divergence_evaluate"
  "s9q3|How do you use the Divergence Theorem to evaluate volume integrals?|divergence_volume"
  "s9q4|How do you apply the Divergence Theorem to electric and gravitational fields?|gauss_law"
  "s9q5|How do you verify the Divergence Theorem with an example?|divergence_verify"
  "s9q6|How do you find flux for a surface that is not closed?|flux_non_closed"
  # Section 10: Applications & Unification (4)
  "s10q1|How do the Fundamental Theorem Green Stokes and Divergence Theorems relate?|theorems_unification"
  "s10q2|How do you choose which vector calculus theorem to use?|choosing_theorem"
  "s10q3|What are the applications of vector calculus in physics?|applications_physics"
  "s10q4|What are Maxwell equations in differential form?|maxwells_equations"
  # Section 11: Conservation Laws & PDEs (4)
  "s11q1|What is the continuity equation for conservation of mass?|continuity_equation"
  "s11q2|What is the heat equation?|heat_equation"
  "s11q3|What is the wave equation?|wave_equation"
  "s11q4|What are Laplace and Poisson equations?|laplace_poisson"
  # Section 12: Worked Problems (4)
  "s12q1|How do you compute the work done moving a particle along a curve in a force field?|work_problem"
  "s12q2|How do you find the circulation of a vector field around a closed curve?|circulation_problem"
  "s12q3|How do you find the flux of a vector field across a surface?|flux_problem"
  "s12q4|How do you verify a vector field is conservative and find its potential?|conservative_potential_problem"
)

TOTAL=${#QUERIES[@]}
DIRECT_HITS=0
CROSS_MATCHES=0
MISSES=0
RESULTS_FILE="/home/z/my-project/.triza-deploy-ch05p3/verification-results.txt"
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
  
  if echo "$topic" | grep -q "ch05p3_$expected"; then
    status="DIRECT_HIT"
    DIRECT_HITS=$((DIRECT_HITS+1))
  elif echo "$topic" | grep -q "ch05p3_"; then
    status="CROSS_MATCH(ch05p3)"
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
