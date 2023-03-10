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
  todoItem: '[data-cy="todo-item"]',
  activeButton: '[data-cy="show-active-btn"]',
  inActiveButton: '[data-cy="show-inactive-btn"]',
  allTodoButton: '[data-cy="show-all-btn"]',
};

test.describe('Todo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/todo');
  });
  test.only('Add 2 todo items', async ({ page }) => {
    await page.locator(S.inputTodo).fill('item 1');
    await page.locator(S.addButton).click();

    await page.locator(S.inputTodo).fill('item 2');
    await page.locator(S.addButton).click();

    await page.locator(S.inputTodo).fill('item 3');
    await page.locator(S.addButton).click();

    await page.locator(S.inputTodo).fill('item 4');
    await page.locator(S.addButton).click();

    await page.locator(S.inputTodo).fill('item 5');
    await page.locator(S.addButton).click();

    const todoItems = await page.locator(S.todoItem).count();
    await expect(todoItems).toBe(5);

    await page.locator('[data-cy="todo-item"]:nth-child(1) .p-checkbox').click();
    await page.locator('[data-cy="todo-item"]:nth-child(2) .p-checkbox').click();

    await page.pause();

    await page.locator(S.activeButton).click();
    const todoItemsActive = await page.locator(S.todoItem).count();
    await expect(todoItemsActive).toBe(3);

    await page.pause();

    await page.locator(S.inActiveButton).click();
    const todoItemsInActive = await page.locator(S.todoItem).count();
    await expect(todoItemsInActive).toBe(2);

    await page.pause();

    await page.locator(S.allTodoButton).click();
    const todoItemsAll = await page.locator(S.todoItem).count();
    await expect(todoItemsAll).toBe(5);

    await page.pause();
  });
});
