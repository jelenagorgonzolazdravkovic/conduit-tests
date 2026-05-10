o// API tests - direct HTTP calls without a browser (cy.request)

const API_URL = 'https://conduit-api.bondaracademy.com/api';

describe('API tests', () => {
  beforeEach(function () {
    cy.fixture('testData').as('data');
  });

  it('Successful login via API returns a JWT token', function () {
    cy.request({
      method: 'POST',
      url: `${API_URL}/users/login`,
      body: {
        user: {
          email: this.data.existingUser.email,
          password: this.data.existingUser.password,
        },
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.user).to.have.property('token');
      expect(response.body.user.token).to.be.a('string').and.not.be.empty;
    });
  });

  it('Failed login with invalid credentials returns an error', function () {
    cy.request({
      method: 'POST',
      url: `${API_URL}/users/login`,
      body: {
        user: {
          email: this.data.invalidUser.email,
          password: this.data.invalidUser.password,
        },
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(403);
    });
  });

  it('Fetching the article list returns an array', () => {
    cy.request('GET', `${API_URL}/articles?limit=10`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('articles').that.is.an('array');
      expect(response.body).to.have.property('articlesCount');
    });
  });

  it('Creating an article via API', function () {
    const title = `${this.data.article.baseTitle} API ${Date.now()}`;

    // Step 1: Login to obtain a token
    cy.request({
      method: 'POST',
      url: `${API_URL}/users/login`,
      body: { user: { email: this.data.existingUser.email, password: this.data.existingUser.password } },
    }).then((loginResponse) => {
      const token = loginResponse.body.user.token;

      // Step 2: Create the article using the token
      cy.request({
        method: 'POST',
        url: `${API_URL}/articles`,
        headers: { Authorization: `Token ${token}` },
        body: {
          article: {
            title,
            description: this.data.article.description,
            body: this.data.article.body,
            tagList: ['api-test'],
          },
        },
      }).then((createResponse) => {
        expect(createResponse.status).to.eq(201);
        expect(createResponse.body.article).to.have.property('title', title);
        expect(createResponse.body.article).to.have.property('slug');
      });
    });
  });

  it('Deleting an article via API', function () {
    const title = `${this.data.article.baseTitle} API Delete ${Date.now()}`;

    cy.request({
      method: 'POST',
      url: `${API_URL}/users/login`,
      body: { user: { email: this.data.existingUser.email, password: this.data.existingUser.password } },
    }).then((loginResponse) => {
      const token = loginResponse.body.user.token;

      // Create the article that will be deleted
      cy.request({
        method: 'POST',
        url: `${API_URL}/articles`,
        headers: { Authorization: `Token ${token}` },
        body: {
          article: {
            title,
            description: this.data.article.description,
            body: this.data.article.body,
            tagList: ['api-test'],
          },
        },
      }).then((createResponse) => {
        const slug = createResponse.body.article.slug;

        // Delete the created article
        cy.request({
          method: 'DELETE',
          url: `${API_URL}/articles/${slug}`,
          headers: { Authorization: `Token ${token}` },
        }).then((deleteResponse) => {
          expect(deleteResponse.status).to.eq(204);
        });
      });
    });
  });
});
