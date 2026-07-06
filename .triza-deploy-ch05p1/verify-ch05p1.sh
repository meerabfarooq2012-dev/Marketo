#!/bin/bash
# Chat verification for ch05p1 - queries spanning all 15 sections
# Each query is sent to production TRIZA chat endpoint

URL="https://triza-ai.vercel.app/api/triza/chat"
ORIGIN="https://triza-ai.vercel.app"

# Queries: section_id|query|expected_topic_substring
QUERIES=(
  # Section 1: Sequences (8)
  "s1q1|What is a convergent sequence?|sequence_definition"
  "s1q2|How do you find the limit of a sequence defined by a function?|sequence_function_limit"
  "s1q3|What are the limit laws for sequences?|sequence_limit_laws"
  "s1q4|What is the Monotonic Sequence Theorem?|monotonic_sequence_theorem"
  "s1q5|How do you find limits of recursively defined sequences?|recursive_sequence_limit"
  "s1q6|What are important limits of sequences like n^(1/n)?|important_limits"
  "s1q7|How do you determine if a sequence is monotonic?|monotonic_test"
  "s1q8|What is the Squeeze Theorem for sequences?|squeeze_theorem_sequences"
  # Section 2: Series Basics (6)
  "s2q1|What is an infinite series and when does it converge?|series_definition"
  "s2q2|What is the nth Term Test for divergence?|nth_term_test"
  "s2q3|What is a geometric series and when does it converge?|geometric_series"
  "s2q4|How do you convert a repeating decimal to a fraction using series?|repeating_decimal"
  "s2q5|What is a telescoping series?|telescoping_series"
  "s2q6|What are the properties of convergent series?|series_properties"
  # Section 3: Integral Test & p-Series (5)
  "s3q1|What is the Integral Test for series convergence?|integral_test"
  "s3q2|What is a p-series and when does it converge?|p_series"
  "s3q3|Why does the harmonic series diverge?|harmonic_series"
  "s3q4|How do you estimate the sum of a series using integral test remainder?|integral_test_remainder"
  "s3q5|How do you test series with logarithms using the integral test?|logarithmic_series_test"
  # Section 4: Comparison Tests (5)
  "s4q1|What is the Direct Comparison Test?|comparison_test"
  "s4q2|What is the Limit Comparison Test?|limit_comparison_test"
  "s4q3|How do you choose an appropriate comparison series?|choosing_comparison"
  "s4q4|How do you estimate sums using the Comparison Test?|comparison_remainder"
  "s4q5|How do you handle factorials and exponentials in comparison tests?|factorial_exponential_comparison"
  # Section 5: Alternating Series & Absolute Convergence (6)
  "s5q1|What is an alternating series?|alternating_series"
  "s5q2|What is the Alternating Series Test?|alternating_series_test"
  "s5q3|How do you estimate the sum of an alternating series?|alternating_estimation"
  "s5q4|What is the difference between absolute and conditional convergence?|absolute_conditional"
  "s5q5|What is the Rearrangement Theorem for absolutely convergent series?|rearrangement_theorem"
  "s5q6|How do you test for absolute convergence?|absolute_convergence_test"
  # Section 6: Ratio & Root Tests (5)
  "s6q1|What is the Ratio Test?|ratio_test"
  "s6q2|What is the Root Test?|root_test"
  "s6q3|When should you use Ratio Test vs Root Test?|ratio_vs_root"
  "s6q4|How do you handle series with factorials in the Ratio Test?|factorial_ratio_test"
  "s6q5|How do you test series with mixed terms powers and factorials?|mixed_terms_ratio"
  # Section 7: Strategy (3)
  "s7q1|What is a strategy for choosing which convergence test to use?|strategy"
  "s7q2|What is a summary of all convergence tests?|test_summary"
  "s7q3|How do you classify a series as absolutely conditionally or divergent?|classification"
  # Section 8: Power Series (6)
  "s8q1|What is a power series?|power_series"
  "s8q2|How do you find the radius and interval of convergence?|radius_interval"
  "s8q3|How do you find the radius of convergence using the Ratio Test formula?|radius_formula"
  "s8q4|How do you find the radius of convergence using the Root Test?|radius_root"
  "s8q5|What are the operations on power series?|power_series_operations"
  "s8q6|How do you represent a function as a power series?|function_as_power_series"
  # Section 9: Taylor & Maclaurin Series (8)
  "s9q1|What is a Taylor series and a Maclaurin series?|taylor_maclaurin_definition"
  "s9q2|What is the formula for the coefficients of a Taylor series?|taylor_coefficients"
  "s9q3|What is Taylor Inequality for the remainder?|taylor_inequality"
  "s9q4|How do you find a Taylor series by differentiation?|taylor_differentiation"
  "s9q5|How do you find a Taylor series using substitution?|taylor_substitution"
  "s9q6|How do you find a Taylor series using multiplication of series?|taylor_multiplication"
  "s9q7|How do you use Taylor series to evaluate limits?|taylor_limits"
  "s9q8|How do you use Taylor series to approximate function values?|taylor_approximation"
  # Section 10: Common Maclaurin Series (6)
  "s10q1|What is the Maclaurin series for e^x?|maclaurin_exp"
  "s10q2|What are the Maclaurin series for sin x and cos x?|maclaurin_sin_cos"
  "s10q3|What are the Maclaurin series for ln(1+x) and arctan x?|maclaurin_ln_arctan"
  "s10q4|What is the binomial series?|binomial_series"
  "s10q5|What are the Maclaurin series for hyperbolic functions?|maclaurin_hyperbolic"
  "s10q6|How do you derive a Maclaurin series by integration of a known series?|series_by_integration"
  # Section 11: Applications of Taylor Series (5)
  "s11q1|How do you use Taylor series for integrals with no elementary antiderivative?|taylor_integrals"
  "s11q2|How do you approximate definite integrals using Taylor series?|taylor_definite_integrals"
  "s11q3|How do you use Taylor series for indeterminate form limits?|taylor_indeterminate"
  "s11q4|How do you use Taylor series in physics small angle approximations?|taylor_physics"
  "s11q5|How do you determine if a Taylor series equals its function?|taylor_equals_function"
  # Section 12: Parametric Equations (6)
  "s12q1|What are parametric equations?|parametric_definition"
  "s12q2|How do you eliminate the parameter to find a Cartesian equation?|eliminate_parameter"
  "s12q3|How do you find dy/dx for a parametric curve?|parametric_derivative"
  "s12q4|How do you find the second derivative for a parametric curve?|parametric_second_derivative"
  "s12q5|How do you find the arc length of a parametric curve?|parametric_arc_length"
  "s12q6|How do you find surface area of revolution for a parametric curve?|parametric_surface_area"
  # Section 13: Calculus with Parametric Curves (5)
  "s13q1|How do you find the area under a parametric curve?|parametric_area"
  "s13q2|How do you find the tangent line to a parametric curve?|parametric_tangent"
  "s13q3|How do you analyze particle motion along a parametric curve?|parametric_motion"
  "s13q4|How do you find horizontal and vertical tangents of a parametric curve?|parametric_horizontal_vertical"
  "s13q5|How do you find the concavity of a parametric curve?|parametric_concavity"
  # Section 14: Polar Coordinates (5)
  "s14q1|What are polar coordinates?|polar_definition"
  "s14q2|How do you convert between polar and Cartesian equations?|polar_conversion"
  "s14q3|What are common polar curves like cardioid limacon rose?|polar_curves"
  "s14q4|How do you find the slope of a tangent line to a polar curve?|polar_slope"
  "s14q5|How do you sketch a polar curve?|polar_sketching"
  # Section 15: Calculus with Polar Curves (5)
  "s15q1|How do you find the area enclosed by a polar curve?|polar_area"
  "s15q2|How do you find the area between two polar curves?|polar_area_between"
  "s15q3|How do you find the arc length of a polar curve?|polar_arc_length"
  "s15q4|How do you find the surface area of revolution for a polar curve?|polar_surface_area"
  "s15q5|How do you find points of intersection of two polar curves?|polar_intersections"
)

TOTAL=${#QUERIES[@]}
DIRECT_HITS=0
CROSS_MATCHES=0
MISSES=0
RESULTS_FILE="/home/z/my-project/.triza-deploy-ch05p1/verification-results.txt"
> "$RESULTS_FILE"

echo "Starting verification of $TOTAL queries..." | tee -a "$RESULTS_FILE"

for entry in "${QUERIES[@]}"; do
  IFS='|' read -r qid query expected <<< "$entry"
  # Send chat request
  response=$(curl -s -X POST "$URL" \
    -H "Content-Type: application/json" \
    -H "Origin: $ORIGIN" \
    -d "{\"message\":\"$query\"}" 2>&1)
  
  # Extract topic and confidence from response
  topic=$(echo "$response" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('topic','') or d.get('matchedTopic','') or d.get('source','') or '')" 2>/dev/null)
  confidence=$(echo "$response" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('confidence','') or d.get('score','') or '')" 2>/dev/null)
  
  # Check if topic contains expected substring
  if echo "$topic" | grep -q "ch05p1_$expected"; then
    status="DIRECT_HIT"
    DIRECT_HITS=$((DIRECT_HITS+1))
  elif echo "$topic" | grep -q "ch05p1_"; then
    status="CROSS_MATCH(ch05p1)"
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
echo "Direct hits (ch05p1 expected): $DIRECT_HITS" | tee -a "$RESULTS_FILE"
echo "Cross/other matches: $CROSS_MATCHES" | tee -a "$RESULTS_FILE"
echo "Misses: $MISSES" | tee -a "$RESULTS_FILE"
echo "Direct hit rate: $(echo "scale=1; $DIRECT_HITS*100/$TOTAL" | bc)%" | tee -a "$RESULTS_FILE"
