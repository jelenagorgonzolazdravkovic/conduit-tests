import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { SELECTORS } from '../selectors/selectors';
import { BASE_URL } from '../data/testData';

export class RegisterPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.navigate(`${BASE_URL}/register`);
  }

  async register(username: string, email: string, password: string): Promise<void> {
    await this.page.locator(SELECTORS.AUTH.USERNAME).fill(username);
    await this.page.locator(SELECTORS.AUTH.EMAIL).fill(email);
    await this.page.locator(SELECTORS.AUTH.PASSWORD).fill(password);
    await this.page.locator(SELECTORS.AUTH.SUBMIT_BTN).click();
    await this.page.waitForLoadState('networkidle');
  }
}
