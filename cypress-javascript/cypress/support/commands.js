const SELECTORS = require('../locators/selectors');

// Login command — reusable across tests (requirement 4)
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get(SELECTORS.AUTH.EMAIL).type(email);
  cy.get(SELECTORS.AUTH.PASSWORD).type(password);
  cy.get(SELECTORS.AUTH.SUBMIT_BTN).click();
  cy.url().should('not.include', '/login');
  cy.get(SELECTORS.NAV.NEW_ARTICLE).should('be.visible');
});

// Create article command — reusable across tests (requirement 4)
Cypress.Commands.add('createArticle', (title, description, body, tags) => {
  cy.get(SELECTORS.NAV.NEW_ARTICLE).click();
  cy.get(SELECTORS.EDITOR.TITLE).type(title);
  cy.get(SELECTORS.EDITOR.DESCRIPTION).type(description);
  cy.get(SELECTORS.EDITOR.BODY).type(body);
  cy.get(SELECTORS.EDITOR.TAGS).type(tags).type('{enter}');
  cy.get(SELECTORS.EDITOR.PUBLISH_BTN).click();
  cy.url().should('include', '/article/');
});

// Register command — reusable across tests (requirement 4)
Cypress.Commands.add('register', (username, email, password) => {
  cy.visit('/register');
  cy.get(SELECTORS.AUTH.USERNAME).type(username);
  cy.get(SELECTORS.AUTH.EMAIL).type(email);
  cy.get(SELECTORS.AUTH.PASSWORD).type(password);
  cy.get(SELECTORS.AUTH.SUBMIT_BTN).click();
});
