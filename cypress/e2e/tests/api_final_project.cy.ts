import { faker } from '@faker-js/faker';

const url = 'https://reqres.in/api';

describe('Reqres API', () => {
  context('GET list users', () => {
    it('get 1 page, check users per_page, check length data', () => {
      cy.request('GET', `${url}/users?page=1`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data.length).to.eq(6);
        expect(response.body.per_page).to.eq(6);
      });
    });
  });
  context('GET single user', () => {
    it('get user #7', () => {
      cy.request('GET', `${url}/users/7`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data.id).to.eq(7);
      });
    });
    it("return a user's fields", () => {
      cy.request('GET', `${url}/users/7`).then((response) => {
        expect(response.body.data).to.include.keys('id', 'email', 'first_name', 'last_name', 'avatar');
      });
    });
    it('should contain a valid avatar URL', () => {
      cy.request('GET', `${url}/users/7`).then((response) => {
        expect(response.body.data.avatar).to.match(/^https?:\/\/.+\/.+\.(jpg|png)$/);
      });
    });
    it('should contain a valid URL for support', () => {
      cy.request('GET', `${url}/users/7`).then((response) => {
        expect(response.body.support.url).to.match(/^https?:\/\/.+$/);
      });
    });
    it('get non-existent user', () => {
      cy.request({ method: 'GET', url: `${url}/users/13`, failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });
  context('Post a new user', () => {
    it('create a new user', () => {
      const newUser = {
        name: faker.name.firstName(),
        job: faker.name.jobTitle(),
      };
      cy.request('POST', `${url}/users`, newUser).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.deep.equal({
          ...newUser,
          id: response.body.id,
          createdAt: response.body.createdAt,
        });
      });
    });
  });
  context('Update an existing user using PUT', () => {
    it('updates an existing user', () => {
      const updatedUser = {
        name: faker.name.firstName(),
        job: faker.name.jobTitle(),
      };
      cy.request('PUT', `${url}/users/1`, updatedUser).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.deep.equal({
          ...updatedUser,
          updatedAt: response.body.updatedAt,
        });
      });
    });
  });
  context('Update an existing user using PATCH', () => {
    it('updates an existing user', () => {
      const updatedUser = {
        name: faker.name.firstName(),
        job: faker.name.jobTitle(),
      };
      cy.request('PATCH', `${url}/users/1`, updatedUser).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.deep.equal({
          ...updatedUser,
          job: response.body.job,
          updatedAt: response.body.updatedAt,
        });
      });
    });
  });
  context('Delete an existing user', () => {
    it('deletes an existing user', () => {
      cy.request('DELETE', `${url}/users/2`).then((response) => {
        expect(response.status).to.eq(204);
      });
    });
  });
  context('Register a new user', () => {
    it('registers a new user', () => {
      const newUser = {
        email: 'eve.holt@reqres.in',
        password: 'pistol',
      };
      cy.request('POST', `${url}/register`, newUser).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id');
        expect(response.body).to.have.property('token');
      });
    });
  });
  context('Register a new user with missing password', () => {
    it('returns an error for missing password', () => {
      const newUser = {
        email: 'sydney@fife',
      };
      cy.request({
        method: 'POST',
        url: `${url}/register`,
        body: newUser,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.error).to.eq('Missing password');
      });
    });
  });
  context('Login with correct credentials', () => {
    it('returns a token', () => {
      const user = {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
      };
      cy.request('POST', `${url}/login`, user).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('token');
      });
    });
  });
});
