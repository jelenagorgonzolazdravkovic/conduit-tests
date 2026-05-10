const report = require('multiple-cucumber-html-reporter');

report.generate({
  jsonDir: 'reports',
  reportPath: 'reports/html-report',
  metadata: {
    browser: { name: 'chromium', version: 'latest' },
    device: 'Local',
    platform: { name: 'macOS' },
  },
  customData: {
    title: 'Conduit Test Report',
    data: [
      { label: 'Projekat', value: 'Conduit Playwright + Cucumber' },
      { label: 'Framework', value: 'Playwright + TypeScript + Cucumber BDD' },
      { label: 'URL', value: 'https://conduit.bondaracademy.com' },
    ],
  },
});

console.log('Izvestaj generisan u: reports/html-report/index.html');
