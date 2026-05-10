#!/bin/bash

echo "======================================================"
echo " Conduit Playwright Native (@playwright/test)"
echo "======================================================"
echo ""

if [ ! -d "node_modules" ]; then
  echo "Installing npm packages..."
  npm install
  npx playwright install chromium
  echo ""
fi

echo "Running tests..."
echo "------------------------------------------------------"
npx playwright test

EXIT_CODE=$?
echo ""
echo "------------------------------------------------------"
if [ $EXIT_CODE -eq 0 ]; then
  echo "All tests PASSED!"
else
  echo "Some tests FAILED."
fi
echo "HTML report: reports/html-report/index.html"
echo "======================================================"

npx playwright show-report reports/html-report

exit $EXIT_CODE
