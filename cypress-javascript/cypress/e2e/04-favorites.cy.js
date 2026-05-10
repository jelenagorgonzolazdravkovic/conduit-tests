const SELECTORS = require('../locators/selectors');

describe('Liking articles', () => {
  beforeEach(function () {
    cy.fixture('testData').as('data');
  });

  it('Liking an article on the home page', function () {
    cy.login(this.data.existingUser.email, this.data.existingUser.password);
    cy.visit('/');
    cy.contains('Global Feed').click();
    cy.get(SELECTORS.HOME.ARTICLE_PREVIEW).first().should('be.visible');

    cy.get(SELECTORS.HOME.FIRST_FAV_BTN)
      .invoke('text')
      .then((initialText) => {
        const initialCount = parseInt(initialText.replace(/\D/g, '')) || 0;
        cy.get(SELECTORS.HOME.FIRST_FAV_BTN).click();
        cy.wait(1500);
        cy.get(SELECTORS.HOME.FIRST_FAV_BTN)
          .invoke('text')
          .then((newText) => {
            const newCount = parseInt(newText.replace(/\D/g, '')) || 0;
            expect(newCount).to.not.equal(initialCount);
          });
      });
  });
});
