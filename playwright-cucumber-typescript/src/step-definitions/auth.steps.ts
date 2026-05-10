import { Given, When, Then } from '@cucumber/cucumber';
import { strict as assert } from 'assert';
import { ConduitWorld } from '../support/world';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { HomePage } from '../pages/HomePage';
import { EXISTING_USER, INVALID_USER } from '../data/testData';

Given('the user is on the login page', async function (this: ConduitWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.goto();
});

Given('the user is on the registration page', async function (this: ConduitWorld) {
  const registerPage = new RegisterPage(this.page);
  await registerPage.goto();
});

When('they enter valid credentials', async function (this: ConduitWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.login(EXISTING_USER.email, EXISTING_USER.password);
});

When('they enter invalid credentials', async function (this: ConduitWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.login(INVALID_USER.email, INVALID_USER.password);
});

When('they enter the correct email but wrong password', async function (this: ConduitWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.login(EXISTING_USER.email, INVALID_USER.password);
});

When('they enter valid registration details', async function (this: ConduitWorld) {
  const timestamp = Date.now();
  const registerPage = new RegisterPage(this.page);
  await registerPage.register(
    `user${timestamp}`,
    `user${timestamp}@mailinator.com`,
    'Test1234!'
  );
});

Then('the user is successfully logged in', async function (this: ConduitWorld) {
  const homePage = new HomePage(this.page);
  const loggedIn = await homePage.isLoggedIn();
  assert.ok(loggedIn, 'User is not logged in - the New Article link is not visible in the navigation');
});

Then('a login error is displayed', async function (this: ConduitWorld) {
  const loginPage = new LoginPage(this.page);
  const hasError = await loginPage.isErrorVisible();
  assert.ok(hasError, 'Error message was not displayed after invalid login');
});

Then('the user is successfully registered', async function (this: ConduitWorld) {
  const homePage = new HomePage(this.page);
  const loggedIn = await homePage.isLoggedIn();
  assert.ok(loggedIn, 'Registration failed - user was not automatically logged in');
});
