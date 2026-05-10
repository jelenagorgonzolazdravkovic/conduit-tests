import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SELECTORS } from '../selectors/selectors';
import { EXISTING_USER, INVALID_USER } from '../data/testData';

test.describe('User login', () => {
  test('Successful login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(EXISTING_USER.email, EXISTING_USER.password);

    await expect(page.locator(SELECTORS.NAV.NEW_ARTICLE)).toBeVisible();
  });

  test('Failed login with a non-existent account', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(INVALID_USER.email, INVALID_USER.password);

    await expect(page.locator(SELECTORS.AUTH.ERROR_MESSAGES)).toBeVisible();
  });

  test('Failed login with a wrong password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(EXISTING_USER.email, INVALID_USER.password);

    await expect(page.locator(SELECTORS.AUTH.ERROR_MESSAGES)).toBeVisible();
  });
});
