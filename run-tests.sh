#!/bin/bash

echo "======================================================"
echo " CONDUIT AUTOMATED TESTS"
echo " https://conduit.bondaracademy.com"
echo "======================================================"
echo ""
echo "Usage:"
echo "  ./run-tests.sh              - runs all projects"
echo "  ./run-tests.sh cucumber     - Playwright + Cucumber BDD"
echo "  ./run-tests.sh native       - Playwright native (@playwright/test)"
echo "  ./run-tests.sh cypress      - Cypress + JavaScript"
echo ""

run_cucumber() {
  echo "------------------------------------------------------"
  echo " Playwright + TypeScript + Cucumber BDD"
  echo "------------------------------------------------------"
  cd playwright-cucumber-typescript
  bash run-tests.sh
  EXIT=$?
  cd ..
  return $EXIT
}

run_native() {
  echo "------------------------------------------------------"
  echo " Playwright Native (@playwright/test)"
  echo "------------------------------------------------------"
  cd playwright-native-typescript
  bash run-tests.sh
  EXIT=$?
  cd ..
  return $EXIT
}

run_cypress() {
  echo "------------------------------------------------------"
  echo " Cypress + JavaScript"
  echo "------------------------------------------------------"
  cd cypress-javascript
  bash run-tests.sh
  EXIT=$?
  cd ..
  return $EXIT
}

case "$1" in
  cucumber)
    run_cucumber; exit $?
    ;;
  native)
    run_native; exit $?
    ;;
  cypress)
    run_cypress; exit $?
    ;;
  *)
    run_cucumber;  C1=$?; echo ""
    run_native;    C2=$?; echo ""
    run_cypress;   C3=$?
    echo ""
    echo "======================================================"
    echo " RESULTS"
    echo "======================================================"
    [ $C1 -eq 0 ] && echo " Playwright Cucumber: PASSED" || echo " Playwright Cucumber: FAILED"
    [ $C2 -eq 0 ] && echo " Playwright Native:   PASSED" || echo " Playwright Native:   FAILED"
    [ $C3 -eq 0 ] && echo " Cypress:             PASSED" || echo " Cypress:             FAILED"
    echo "======================================================"
    [ $C1 -eq 0 ] && [ $C2 -eq 0 ] && [ $C3 -eq 0 ] && exit 0 || exit 1
    ;;
esac
