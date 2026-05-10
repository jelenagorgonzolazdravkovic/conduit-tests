import { Before, After, BeforeAll, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser } from 'playwright';
import { ConduitWorld } from './world';

setDefaultTimeout(30000);

let browser: Browser;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: true });
});

AfterAll(async function () {
  await browser.close();
});

// UI hooks — skipped for @api scenarios that do not use a browser
Before({ tags: 'not @api' }, async function (this: ConduitWorld) {
  this.browser = browser;
  this.context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
  });
  this.page = await this.context.newPage();
});

After({ tags: 'not @api' }, async function (this: ConduitWorld, scenario) {
  if (scenario.result?.status === 'FAILED') {
    const screenshot = await this.page.screenshot({ fullPage: true });
    this.attach(screenshot, 'image/png');
  }
  await this.page.close();
  await this.context.close();
});

// API hooks — clean up APIRequestContext after each API scenario
After({ tags: '@api' }, async function (this: ConduitWorld) {
  await this.apiReq?.dispose();
});
