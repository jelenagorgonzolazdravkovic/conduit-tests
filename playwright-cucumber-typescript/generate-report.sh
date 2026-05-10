#!/bin/bash

echo "Generisanje HTML izvestaja..."
node generate-report.js
echo ""
echo "Izvestaj je dostupan u: reports/html-report/index.html"
open reports/html-report/index.html 2>/dev/null || echo "Otvori rucno: reports/html-report/index.html"
