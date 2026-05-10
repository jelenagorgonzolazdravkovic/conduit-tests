import { Given, When, Then } from '@cucumber/cucumber';
import { strict as assert } from 'assert';
import { ConduitWorld } from '../support/world';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { EditorPage } from '../pages/EditorPage';
import { ArticlePage } from '../pages/ArticlePage';
import { EXISTING_USER, ARTICLE } from '../data/testData';

Given('the user is logged in', async function (this: ConduitWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.goto();
  await loginPage.login(EXISTING_USER.email, EXISTING_USER.password);
});

Given('the user opens the editor for a new article', async function (this: ConduitWorld) {
  const homePage = new HomePage(this.page);
  await homePage.clickNewArticle();
});

When('they fill in the article form and publish', async function (this: ConduitWorld) {
  const title = `${ARTICLE.BASE_TITLE} ${Date.now()}`;
  this.lastArticleTitle = title;
  const editorPage = new EditorPage(this.page);
  await editorPage.createArticle(title, ARTICLE.description, ARTICLE.body, ARTICLE.tags);
});

Then('the article is successfully created', async function (this: ConduitWorld) {
  const articlePage = new ArticlePage(this.page);
  const title = await articlePage.getTitle();
  assert.ok(
    title.includes(this.lastArticleTitle ?? ARTICLE.BASE_TITLE),
    `Expected title: "${this.lastArticleTitle}", got: "${title}"`
  );
});

Then('the delete button is visible', async function (this: ConduitWorld) {
  const articlePage = new ArticlePage(this.page);
  const isVisible = await articlePage.isDeleteButtonVisible();
  assert.ok(isVisible, 'The article delete button is not visible');
});

When('they click the delete article button', async function (this: ConduitWorld) {
  const articlePage = new ArticlePage(this.page);
  await articlePage.deleteArticle();
});

Then('the article is successfully deleted', async function (this: ConduitWorld) {
  const currentUrl = this.page.url();
  assert.ok(
    !currentUrl.includes('/article/'),
    `User is still on the article page: ${currentUrl}`
  );
});
