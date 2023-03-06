import {faker} from '@faker-js/faker';

describe('Posts API', () => {
  context('GET /api/posts', () => {
    it('gets a list of posts', () => {
      cy.request('GET', 'http://localhost:4200/api/posts').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.length).to.eq(100);
      });
    });
  });
  context('GET /api/posts/:postID', () => {
    it('gets a post', () => {
      const postId = 2;
      cy.request('GET', `http://localhost:4200/api/posts/${postId}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.deep.equal({
          userId: 1,
          id: postId,
          title: 'qui est esse',
          body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
        });
      });
    });
  });

  context('POST /api/posts', () => {
    it('creates a new post', () => {
      const newPost = {
        userId: 1,
        title: faker.lorem.words(7),
        body: faker.lorem.paragraphs(),
      };
      cy.request('POST', 'http://localhost:4200/api/posts', newPost).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.deep.equal({
          ...newPost,
          id: response.body.id,
        });
      });
    });
    it('updates an existing post', () => {
      const updatedPost = {
        title: faker.lorem.words(7),
      };
      cy.request('PATCH', 'http://localhost:4200/api/posts/1', updatedPost).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.deep.equal({
          userId: 1,
          id: 1,
          title: updatedPost.title,
          body: response.body.body,
        });
      });
    });
  });
  context('DELETE /api/posts/:postID', () => {
    it('deletes a post', () => {
      const newPost = {
        userId: 1,
        title: faker.lorem.words(7),
        body: faker.lorem.paragraphs(),
      };
      cy.request('POST', 'http://localhost:4200/api/posts', newPost).then((response) => {
        const postId = response.body.id;
        cy.request('DELETE', `http://localhost:4200/api/posts/${postId}`).then((response) => {
          expect(response.status).to.eq(200);
          cy.request({
            url: `http://localhost:4200/api/posts/${postId}`,
            failOnStatusCode: false,
          }).then((response) => {
            expect(response.status).to.eq(404);
          });
        });
      });
    });
  });
  describe('Comments API', () => {
  context('GET /api/comments', () => {
    it('gets a list of comments', () => {
      cy.request('GET', 'http://localhost:4200/api/comments').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.length).to.eq(500);
      });
    });
  });
});
});
