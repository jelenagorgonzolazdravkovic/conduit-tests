#!/bin/bash

echo "Generisanje Cypress izvestaja..."
npx mochawesome-merge reports/*.json > reports/merged-report.json
npx marge reports/merged-report.json --reportDir reports/html --inline
echo ""
echo "Izvestaj je dostupan u: reports/html/"
open reports/html/merged-report.html 2>/dev/null || echo "Otvori rucno: reports/html/merged-report.html"
