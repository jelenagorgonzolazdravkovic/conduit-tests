const SELECTORS = require('../locators/selectors');

describe('User login', () => {
  beforeEach(function () {
    cy.fixture('testData').as('data');
  });

  it('Successful login with valid credentials', function () {
    cy.login(this.data.existingUser.email, this.data.existingUser.password);
    cy.get(SELECTORS.NAV.NEW_ARTICLE).should('be.visible');
  });

  it('Failed login with a non-existent account', function () {
    cy.visit('/login');
    cy.get(SELECTORS.AUTH.EMAIL).type(this.data.invalidUser.email);
    cy.get(SELECTORS.AUTH.PASSWORD).type(this.data.invalidUser.password);
    cy.get(SELECTORS.AUTH.SUBMIT_BTN).click();
    cy.get(SELECTORS.AUTH.ERROR_MESSAGES).should('be.visible');
  });

  it('Failed login with a wrong password', function () {
    cy.visit('/login');
    cy.get(SELECTORS.AUTH.EMAIL).type(this.data.existingUser.email);
    cy.get(SELECTORS.AUTH.PASSWORD).type(this.data.invalidUser.password);
    cy.get(SELECTORS.AUTH.SUBMIT_BTN).click();
    cy.get(SELECTORS.AUTH.ERROR_MESSAGES).should('be.visible');
  });
});
