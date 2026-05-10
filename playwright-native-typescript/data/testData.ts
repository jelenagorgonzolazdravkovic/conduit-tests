// Test data separated from code (requirement 5)

export const BASE_URL = 'https://conduit.bondaracademy.com';
export const API_URL = 'https://conduit-api.bondaracademy.com/api';

export const EXISTING_USER = {
  email: 'testjelena@mailinator.com',
  password: 'Test1234!',
};

export const INVALID_USER = {
  email: 'nepostojeci@test.com',
  password: 'PogresnaLozinka99',
};

export const ARTICLE = {
  BASE_TITLE: 'Automation Test Article',
  description: 'This is a description of a test article created by automation',
  body: 'This is the body of a test article. It was created automatically using Playwright tests.',
  tags: 'automation',
};

export const COMMENT = {
  BASE_TEXT: 'Test comment left by automation',
};
