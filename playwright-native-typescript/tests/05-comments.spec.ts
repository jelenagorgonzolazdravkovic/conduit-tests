import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { EditorPage } from '../pages/EditorPage';
import { ArticlePage } from '../pages/ArticlePage';
import { SELECTORS } from '../selectors/selectors';
import { EXISTING_USER, ARTICLE, COMMENT } from '../data/testData';

test.describe('Commenting on articles', () => {
  test('Adding a comment to an article', async ({ page }) => {
    const timestamp = Date.now();
    const title = `${ARTICLE.BASE_TITLE} ${timestamp}`;
    const commentText = `${COMMENT.BASE_TEXT} ${timestamp}`;

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(EXISTING_USER.email, EXISTING_USER.password);

    const homePage = new HomePage(page);
    await homePage.clickNewArticle();

    const editorPage = new EditorPage(page);
    await editorPage.createArticle(title, ARTICLE.description, ARTICLE.body, ARTICLE.tags);

    const articlePage = new ArticlePage(page);
    await articlePage.addComment(commentText);

    await expect(page.locator(SELECTORS.ARTICLE.COMMENT_TEXT).first()).toContainText(commentText);
  });
});
