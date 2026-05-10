const SELECTORS = require('../locators/selectors');

describe('Commenting on articles', () => {
  beforeEach(function () {
    cy.fixture('testData').as('data');
  });

  it('Adding a comment to an article', function () {
    const timestamp = Date.now();
    const title = `${this.data.article.baseTitle} ${timestamp}`;
    const commentText = `${this.data.comment.baseText} ${timestamp}`;

    cy.login(this.data.existingUser.email, this.data.existingUser.password);
    cy.createArticle(title, this.data.article.description, this.data.article.body, this.data.article.tags);

    cy.get(SELECTORS.ARTICLE.COMMENT_INPUT).type(commentText);
    cy.get(SELECTORS.ARTICLE.COMMENT_SUBMIT).click();
    cy.get(SELECTORS.ARTICLE.COMMENT_TEXT).should('contain', commentText);
  });
});
