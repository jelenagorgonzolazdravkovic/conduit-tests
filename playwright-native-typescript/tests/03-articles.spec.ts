import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { EditorPage } from '../pages/EditorPage';
import { ArticlePage } from '../pages/ArticlePage';
import { SELECTORS } from '../selectors/selectors';
import { EXISTING_USER, ARTICLE } from '../data/testData';

test.describe('Article management', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(EXISTING_USER.email, EXISTING_USER.password);
  });

  test('Creating a new article', async ({ page }) => {
    const title = `${ARTICLE.BASE_TITLE} ${Date.now()}`;
    const homePage = new HomePage(page);
    await homePage.clickNewArticle();

    const editorPage = new EditorPage(page);
    await editorPage.createArticle(title, ARTICLE.description, ARTICLE.body, ARTICLE.tags);

    await expect(page.locator(SELECTORS.ARTICLE.TITLE)).toContainText(title);
  });

  test('Deleting a created article', async ({ page }) => {
    const title = `${ARTICLE.BASE_TITLE} ${Date.now()}`;
    const homePage = new HomePage(page);
    await homePage.clickNewArticle();

    const editorPage = new EditorPage(page);
    await editorPage.createArticle(title, ARTICLE.description, ARTICLE.body, ARTICLE.tags);

    const articlePage = new ArticlePage(page);
    await expect(page.locator(SELECTORS.ARTICLE.DELETE_BTN).first()).toBeVisible();
    await articlePage.deleteArticle();

    await expect(page).not.toHaveURL(/\/article\//);
  });
});
