#!/bin/bash

echo "======================================================"
echo " Conduit Playwright + TypeScript + Cucumber Tests"
echo "======================================================"
echo ""

# Install dependencies if node_modules does not exist
if [ ! -d "node_modules" ]; then
  echo "Installing npm packages..."
  npm install
  echo ""
fi

# Install Playwright browser if not already installed
if [ ! -d "node_modules/playwright/.local-browsers" ]; then
  echo "Installing Playwright browser..."
  npx playwright install chromium
  echo ""
fi

echo "Running tests..."
echo "------------------------------------------------------"
npx cucumber-js

EXIT_CODE=$?
echo ""
echo "------------------------------------------------------"
if [ $EXIT_CODE -eq 0 ]; then
  echo "All tests PASSED!"
else
  echo "Some tests FAILED. Check the report."
fi
echo "HTML report: reports/cucumber-report.html"
echo "======================================================"

open reports/cucumber-report.html

exit $EXIT_CODE
