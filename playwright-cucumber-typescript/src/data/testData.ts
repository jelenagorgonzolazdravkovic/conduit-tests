// Test data separated from code (requirement 5)
// NOTE: Before running tests, register an account at:
// https://conduit.bondaracademy.com/register
// with the email and password listed below (if it does not already exist).

export const BASE_URL = 'https://conduit.bondaracademy.com';
export const API_URL = 'https://conduit-api.bondaracademy.com/api';

// Existing account for login tests and tests that require authentication
export const EXISTING_USER = {
  email: 'testjelena@mailinator.com',
  password: 'Test1234!',
};

// Credentials for the failed login test
export const INVALID_USER = {
  email: 'nepostojeci@test.com',
  password: 'PogresnaLozinka99',
};

// Base article data (title is generated dynamically in the step)
export const ARTICLE = {
  BASE_TITLE: 'Automation Test Article',
  description: 'This is a description of a test article created by automation',
  body: 'This is the body of a test article. It was created automatically using Playwright and Cucumber tests.',
  tags: 'automation',
};

// Comment text (timestamp is appended in the step for uniqueness)
export const COMMENT = {
  BASE_TEXT: 'Test comment left by automation',
};
