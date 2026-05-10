import { Given, When, Then } from '@cucumber/cucumber';
import { strict as assert } from 'assert';
import { request } from 'playwright';
import { ConduitWorld } from '../support/world';
import { API_URL, EXISTING_USER, INVALID_USER, ARTICLE } from '../data/testData';

const API_BASE = API_URL;

// Helper function to initialise APIRequestContext (requirement 4)
async function getReq(world: ConduitWorld) {
  if (!world.apiReq) {
    world.apiReq = await request.newContext();
  }
  return world.apiReq;
}

When('I send a login API request with valid credentials', async function (this: ConduitWorld) {
  const req = await getReq(this);
  const response = await req.post(`${API_BASE}/users/login`, {
    data: { user: { email: EXISTING_USER.email, password: EXISTING_USER.password } },
  });
  this.apiStatus = response.status();
  this.apiBody = await response.json();
});

When('I send a login API request with invalid credentials', async function (this: ConduitWorld) {
  const req = await getReq(this);
  const response = await req.post(`${API_BASE}/users/login`, {
    data: { user: { email: INVALID_USER.email, password: INVALID_USER.password } },
  });
  this.apiStatus = response.status();
  this.apiBody = await response.json();
});

When('I send a GET request for the article list', async function (this: ConduitWorld) {
  const req = await getReq(this);
  const response = await req.get(`${API_BASE}/articles?limit=10`);
  this.apiStatus = response.status();
  this.apiBody = await response.json();
});

Given('the user is authenticated via API', async function (this: ConduitWorld) {
  const req = await getReq(this);
  const response = await req.post(`${API_BASE}/users/login`, {
    data: { user: { email: EXISTING_USER.email, password: EXISTING_USER.password } },
  });
  const body = await response.json();
  this.apiToken = body.user?.token;
  assert.ok(this.apiToken, 'API login failed - check credentials in testData.ts');
});

When('I send a request to create an article via API', async function (this: ConduitWorld) {
  const req = await getReq(this);
  const title = `${ARTICLE.BASE_TITLE} API ${Date.now()}`;
  const response = await req.post(`${API_BASE}/articles`, {
    headers: { Authorization: `Token ${this.apiToken}` },
    data: {
      article: {
        title,
        description: ARTICLE.description,
        body: ARTICLE.body,
        tagList: ['api-test'],
      },
    },
  });
  this.apiStatus = response.status();
  this.apiBody = await response.json();
  this.apiArticleSlug = this.apiBody?.article?.slug;
});

Given('an article exists created via API', async function (this: ConduitWorld) {
  const req = await getReq(this);
  const title = `${ARTICLE.BASE_TITLE} API Delete ${Date.now()}`;
  const response = await req.post(`${API_BASE}/articles`, {
    headers: { Authorization: `Token ${this.apiToken}` },
    data: {
      article: {
        title,
        description: ARTICLE.description,
        body: ARTICLE.body,
        tagList: ['api-test'],
      },
    },
  });
  const body = await response.json();
  this.apiArticleSlug = body.article?.slug;
  assert.ok(this.apiArticleSlug, 'Article for deletion was not created');
});

When('I send a request to delete that article via API', async function (this: ConduitWorld) {
  const req = await getReq(this);
  const response = await req.delete(`${API_BASE}/articles/${this.apiArticleSlug}`, {
    headers: { Authorization: `Token ${this.apiToken}` },
  });
  this.apiStatus = response.status();
});

Then('the response has status {int}', function (this: ConduitWorld, expectedStatus: number) {
  assert.equal(
    this.apiStatus,
    expectedStatus,
    `Expected HTTP status: ${expectedStatus}, got: ${this.apiStatus}`
  );
});

Then('the response contains a JWT token', function (this: ConduitWorld) {
  assert.ok(this.apiBody?.user?.token, 'JWT token was not found in the response');
});

Then('the response contains a list of articles', function (this: ConduitWorld) {
  assert.ok(Array.isArray(this.apiBody?.articles), 'The "articles" field is not an array');
  assert.ok(this.apiBody?.articlesCount !== undefined, 'The "articlesCount" field is missing');
});

Then('the response contains the title of the created article', function (this: ConduitWorld) {
  assert.ok(this.apiBody?.article?.title, 'The "title" field is missing from the response');
  assert.ok(this.apiBody?.article?.slug, 'The "slug" field is missing from the response');
});
