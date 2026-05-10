const SELECTORS = require('../locators/selectors');

describe('User registration', () => {
  it('Successful registration of a new user', () => {
    const timestamp = Date.now();
    cy.register(
      `user${timestamp}`,
      `user${timestamp}@mailinator.com`,
      'Test1234!'
    );
    cy.get(SELECTORS.NAV.NEW_ARTICLE).should('be.visible');
  });
});
