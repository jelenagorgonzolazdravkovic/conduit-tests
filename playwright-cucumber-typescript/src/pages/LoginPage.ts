import { Page } from 'playwright';
import { BasePage } from './BasePage';
import { SELECTORS } from '../selectors/selectors';
import { BASE_URL } from '../data/testData';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.navigate(`${BASE_URL}/login`);
  }

  // Komanda za visestruku upotrebu (zahtev 4)
  async login(email: string, password: string): Promise<void> {
    await this.page.locator(SELECTORS.AUTH.EMAIL).fill(email);
    await this.page.locator(SELECTORS.AUTH.PASSWORD).fill(password);
    await this.page.locator(SELECTORS.AUTH.SUBMIT_BTN).click();
    await this.page.waitForLoadState('networkidle');
  }

  async isErrorVisible(): Promise<boolean> {
    return this.isVisible(SELECTORS.AUTH.ERROR_MESSAGES);
  }
}
