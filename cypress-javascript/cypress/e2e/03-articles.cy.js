const SELECTORS = require('../locators/selectors');

describe('Article management', () => {
  beforeEach(function () {
    cy.fixture('testData').as('data');
  });

  it('Creating a new article', function () {
    const title = `${this.data.article.baseTitle} ${Date.now()}`;
    cy.login(this.data.existingUser.email, this.data.existingUser.password);
    cy.createArticle(title, this.data.article.description, this.data.article.body, this.data.article.tags);
    cy.get(SELECTORS.ARTICLE.TITLE).should('contain', title);
  });

  it('Deleting a created article', function () {
    const title = `${this.data.article.baseTitle} ${Date.now()}`;
    cy.login(this.data.existingUser.email, this.data.existingUser.password);
    cy.createArticle(title, this.data.article.description, this.data.article.body, this.data.article.tags);
    cy.get(SELECTORS.ARTICLE.DELETE_BTN).first().click();
    cy.url().should('not.include', '/article/');
  });
});
