import { test, expect } from '@playwright/test';
import { EXISTING_USER, INVALID_USER, ARTICLE, API_URL } from '../data/testData';

// API tests use the 'request' fixture from @playwright/test — no browser required

test.describe('API tests', () => {
  test('Successful login via API returns a JWT token', async ({ request }) => {
    const response = await request.post(`${API_URL}/users/login`, {
      data: { user: { email: EXISTING_USER.email, password: EXISTING_USER.password } },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.user.token).toBeTruthy();
  });

  test('Failed login with invalid credentials returns 403', async ({ request }) => {
    const response = await request.post(`${API_URL}/users/login`, {
      data: { user: { email: INVALID_USER.email, password: INVALID_USER.password } },
    });

    expect(response.status()).toBe(403);
  });

  test('Fetching the article list returns an array', async ({ request }) => {
    const response = await request.get(`${API_URL}/articles?limit=10`);

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body.articles)).toBeTruthy();
    expect(body).toHaveProperty('articlesCount');
  });

  test('Creating an article via API', async ({ request }) => {
    const loginRes = await request.post(`${API_URL}/users/login`, {
      data: { user: { email: EXISTING_USER.email, password: EXISTING_USER.password } },
    });
    const { user } = await loginRes.json();

    const title = `${ARTICLE.BASE_TITLE} API ${Date.now()}`;
    const createRes = await request.post(`${API_URL}/articles`, {
      headers: { Authorization: `Token ${user.token}` },
      data: {
        article: {
          title,
          description: ARTICLE.description,
          body: ARTICLE.body,
          tagList: ['api-test'],
        },
      },
    });

    expect(createRes.status()).toBe(201);
    const body = await createRes.json();
    expect(body.article.title).toBe(title);
    expect(body.article.slug).toBeTruthy();
  });

  test('Deleting an article via API', async ({ request }) => {
    const loginRes = await request.post(`${API_URL}/users/login`, {
      data: { user: { email: EXISTING_USER.email, password: EXISTING_USER.password } },
    });
    const { user } = await loginRes.json();

    const createRes = await request.post(`${API_URL}/articles`, {
      headers: { Authorization: `Token ${user.token}` },
      data: {
        article: {
          title: `${ARTICLE.BASE_TITLE} Delete ${Date.now()}`,
          description: ARTICLE.description,
          body: ARTICLE.body,
          tagList: ['api-test'],
        },
      },
    });
    const { article } = await createRes.json();

    const deleteRes = await request.delete(`${API_URL}/articles/${article.slug}`, {
      headers: { Authorization: `Token ${user.token}` },
    });

    expect(deleteRes.status()).toBe(204);
  });
});
