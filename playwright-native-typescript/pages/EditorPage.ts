import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { SELECTORS } from '../selectors/selectors';

export class EditorPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async createArticle(title: string, description: string, body: string, tags: string): Promise<void> {
    await this.page.locator(SELECTORS.EDITOR.TITLE).fill(title);
    await this.page.locator(SELECTORS.EDITOR.DESCRIPTION).fill(description);
    await this.page.locator(SELECTORS.EDITOR.BODY).fill(body);
    await this.page.locator(SELECTORS.EDITOR.TAGS).fill(tags);
    await this.page.locator(SELECTORS.EDITOR.PUBLISH_BTN).click();
    await this.page.waitForLoadState('networkidle');
  }
}
