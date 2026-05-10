import { Page } from 'playwright';
import { BasePage } from './BasePage';
import { SELECTORS } from '../selectors/selectors';

export class ArticlePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async getTitle(): Promise<string> {
    await this.page.locator(SELECTORS.ARTICLE.TITLE).waitFor({ timeout: 10000 });
    return this.getText(SELECTORS.ARTICLE.TITLE);
  }

  async isDeleteButtonVisible(): Promise<boolean> {
    return this.isVisible(SELECTORS.ARTICLE.DELETE_BTN);
  }

  async deleteArticle(): Promise<void> {
    await this.page.locator(SELECTORS.ARTICLE.DELETE_BTN).first().click();
    await this.page.waitForURL((url) => !url.pathname.includes('/article/'), { timeout: 15000 });
  }

  // Komanda za visestruku upotrebu (zahtev 4)
  async addComment(text: string): Promise<void> {
    await this.page.locator(SELECTORS.ARTICLE.COMMENT_INPUT).fill(text);
    await this.page.locator(SELECTORS.ARTICLE.COMMENT_SUBMIT).click();
    await this.page.waitForLoadState('networkidle');
  }

  async isCommentVisible(text: string): Promise<boolean> {
    try {
      await this.page.locator(SELECTORS.ARTICLE.COMMENT_TEXT).first().waitFor({ state: 'visible', timeout: 10000 });
    } catch {
      return false;
    }
    const comments = await this.page.locator(SELECTORS.ARTICLE.COMMENT_TEXT).allTextContents();
    return comments.some((c) => c.includes(text));
  }
}
