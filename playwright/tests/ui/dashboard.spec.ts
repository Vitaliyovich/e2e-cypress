import { test, expect } from '@playwright/test';

const S = {
  title: '[data-cy="title"]',
  menuLink: 'p-menuitem-link',
  homeLink: '[data-automationid="home-page"]',
  todoLink: '[data-automationid="todo-page"]',
  postsLink: '[data-automationid="posts-page"]',
  galleryLink: '[data-automationid="gallery-page"]',
  aboutLink: '[data-automationid="about-page"]',
  inputTodo: '[data-cy="todo-text"]',
  addButton: '[data-cy="add-btn"]',
  deleteButton: '[data-cy="delete-btn"]',
  editButton: '[data-cy="edit-btn"]',
  editText: '[data-cy="edit-text"]',
  saveButton: '[data-cy="save-btn"]',
  todoLabel: '[data-cy="label"]',
};

test('Dashboard', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Todolist');
  await expect(page).toHaveURL('/home');
  await expect(page.locator(S.title)).toContainText('welcome!');
});
