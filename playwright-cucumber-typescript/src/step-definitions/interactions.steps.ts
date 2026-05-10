import { Given, When, Then } from '@cucumber/cucumber';
import { strict as assert } from 'assert';
import { ConduitWorld } from '../support/world';
import { HomePage } from '../pages/HomePage';
import { ArticlePage } from '../pages/ArticlePage';
import { COMMENT } from '../data/testData';

Given('the user is on the home page', async function (this: ConduitWorld) {
  const homePage = new HomePage(this.page);
  await homePage.clickGlobalFeed();
  await homePage.waitForArticles();
});

When('they click like on the first article', async function (this: ConduitWorld) {
  const homePage = new HomePage(this.page);
  this.initialFavoriteCount = await homePage.getFirstArticleFavoriteCount();
  await homePage.clickFirstArticleFavorite();
});

Then('the like count has changed', async function (this: ConduitWorld) {
  const homePage = new HomePage(this.page);
  const newCount = await homePage.getFirstArticleFavoriteCount();
  assert.notEqual(
    newCount,
    this.initialFavoriteCount,
    `Like count was not changed (remained: ${newCount})`
  );
});

When('they leave a comment on the article', async function (this: ConduitWorld) {
  const commentText = `${COMMENT.BASE_TEXT} ${Date.now()}`;
  (this as any).lastComment = commentText;
  const articlePage = new ArticlePage(this.page);
  await articlePage.addComment(commentText);
});

Then('the comment is visible on the page', async function (this: ConduitWorld) {
  const articlePage = new ArticlePage(this.page);
  const isVisible = await articlePage.isCommentVisible((this as any).lastComment);
  assert.ok(isVisible, `Comment was not found on the article page`);
});
