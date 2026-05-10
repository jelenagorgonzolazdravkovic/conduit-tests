import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { SELECTORS } from '../selectors/selectors';

test.describe('User registration', () => {
  test('Successful registration of a new user', async ({ page }) => {
    const timestamp = Date.now();
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.register(
      `user${timestamp}`,
      `user${timestamp}@mailinator.com`,
      'Test1234!'
    );

    await expect(page.locator(SELECTORS.NAV.NEW_ARTICLE)).toBeVisible();
  });
});
