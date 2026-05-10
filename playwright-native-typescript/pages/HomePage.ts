import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { SELECTORS } from '../selectors/selectors';
import { BASE_URL } from '../data/testData';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.navigate(BASE_URL);
  }

  async isLoggedIn(): Promise<boolean> {
    return this.isVisible(SELECTORS.NAV.NEW_ARTICLE);
  }

  async clickNewArticle(): Promise<void> {
    await this.page.locator(SELECTORS.NAV.NEW_ARTICLE).click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickGlobalFeed(): Promise<void> {
    await this.page.getByText('Global Feed').click();
    await this.page.waitForLoadState('networkidle');
  }

  async waitForArticles(): Promise<void> {
    await this.page.locator(SELECTORS.HOME.ARTICLE_PREVIEW).first().waitFor({ state: 'visible', timeout: 20000 });
  }

  async getFirstArticleFavoriteCount(): Promise<number> {
    await this.waitForArticles();
    const text = (await this.page.locator(SELECTORS.HOME.FIRST_FAV_BTN).textContent()) ?? '0';
    const match = text.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  }

  async clickFirstArticleFavorite(): Promise<void> {
    await this.waitForArticles();
    await this.page.locator(SELECTORS.HOME.FIRST_FAV_BTN).click();
    await this.page.waitForTimeout(1500);
  }
}
