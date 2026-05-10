#!/bin/bash

echo "======================================================"
echo " Conduit Cypress + JavaScript Tests"
echo "======================================================"
echo ""

# Install dependencies if node_modules does not exist
if [ ! -d "node_modules" ]; then
  echo "Installing npm packages..."
  npm install
  echo ""
fi

echo "Cleaning old reports..."
rm -rf reports/
echo ""

echo "Running tests..."
echo "------------------------------------------------------"
# env -u ELECTRON_RUN_AS_NODE is required when running from VS Code terminal
# (VS Code sets this variable which prevents Cypress from starting as an Electron app)
env -u ELECTRON_RUN_AS_NODE npx cypress run

EXIT_CODE=$?

echo ""
echo "Merging reports..."
npx mochawesome-merge reports/*.json > reports/merged-report.json
npx marge reports/merged-report.json --reportDir reports/html --inline

echo ""
echo "------------------------------------------------------"
if [ $EXIT_CODE -eq 0 ]; then
  echo "All tests PASSED!"
else
  echo "Some tests FAILED. Check the report."
fi
echo "HTML report: reports/html/merged-report.html"
echo "======================================================"

open reports/html/merged-report.html

exit $EXIT_CODE
