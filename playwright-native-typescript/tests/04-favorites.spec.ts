import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { EXISTING_USER } from '../data/testData';

test.describe('Liking articles', () => {
  test('Liking an article on the home page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(EXISTING_USER.email, EXISTING_USER.password);

    const homePage = new HomePage(page);
    await homePage.clickGlobalFeed();

    const initialCount = await homePage.getFirstArticleFavoriteCount();
    await homePage.clickFirstArticleFavorite();
    const newCount = await homePage.getFirstArticleFavoriteCount();

    expect(newCount).not.toBe(initialCount);
  });
});
