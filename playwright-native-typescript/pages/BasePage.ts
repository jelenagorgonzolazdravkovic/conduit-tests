import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle');
  }

  async isVisible(selector: string): Promise<boolean> {
    try {
      return await this.page.locator(selector).first().isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  async getText(selector: string): Promise<string> {
    return (await this.page.locator(selector).first().textContent()) ?? '';
  }
}
