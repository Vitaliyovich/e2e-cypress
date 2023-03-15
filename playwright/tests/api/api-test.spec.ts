import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('Posts API', () => {
  test('GET /api/posts', async ({ request }) => {
    const response = await request.get('/api/posts');
    const posts = await response.json();

    await expect(response.status()).toBe(200);
    await expect(posts.length).toBe(100);
  });
});
test('GET /api/posts/:postId', async ({ request }) => {
  const postId = 13;
  const response = await request.get(`/api/posts/${postId}`);
  const post = await response.json();

  await expect(response.status()).toBe(200);
  await expect(post).toEqual({
    userId: 2,
    id: postId,
    title: 'dolorum ut in voluptas mollitia et saepe quo animi',
    body: 'aut dicta possimus sint mollitia voluptas commodi quo doloremque\niste corrupti reiciendis voluptatem eius rerum\nsit cumque quod eligendi laborum minima\nperferendis recusandae assumenda consectetur porro architecto ipsum ipsam',
  });
});

test('POST /api/posts', async ({ request }) => {
  const newPostData = {
    userId: 1,
    title: faker.lorem.sentences(),
    body: faker.lorem.text(),
  };

  console.log(newPostData);

  const response = await request.post('/api/posts', { data: { ...newPostData } });
  const newPost = await response.json();

  await expect(response.status()).toBe(201);
  await expect(newPost).toEqual({ ...newPost, id: 101 });
});

test('PATCH /api/posts/:postID', async ({ request }) => {
  const postId = 13;
  const updatedPostData = {
    userId: 2,
    title: faker.lorem.sentences(),
    body: faker.lorem.text(),
  };

  const response = await request.patch(`/api/posts/${postId}`, { data: { ...updatedPostData } });
  const updatedPost = await response.json();

  await expect(response.status()).toBe(200);
  await expect(updatedPost).toEqual({ ...updatedPostData, id: postId });
});

test.only('DELETE /api/posts/:postId', async ({ request }) => {
  const postId = 13;
  const response = await request.delete(`/api/posts/${postId}`);
  await expect(response.status()).toBe(200);
  const getResponse = await request.get(`/api/posts/${postId}`);
  await expect(getResponse.status()).toBe(404);
});
