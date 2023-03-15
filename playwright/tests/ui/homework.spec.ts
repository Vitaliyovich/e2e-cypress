import { test, expect } from '@playwright/test';

const S = {
  inputTodo: '[data-cy="todo-text"]',
  addButton: '[data-cy="add-btn"]',
  todoItem: '[data-cy="todo-item"]',
  activeButton: '[data-cy="show-active-btn"]',
  inActiveButton: '[data-cy="show-inactive-btn"]',
  allTodoButton: '[data-cy="show-all-btn"]',
};

test.describe('Todo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/todo');
  });
  test('Add 2 todo items', async ({ page }) => {
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

    await page.locator(S.activeButton).click();
    const todoItemsActive = await page.locator(S.todoItem).count();
    await expect(todoItemsActive).toBe(3);

    await page.locator(S.inActiveButton).click();
    const todoItemsInActive = await page.locator(S.todoItem).count();
    await expect(todoItemsInActive).toBe(2);

    await page.locator(S.allTodoButton).click();
    const todoItemsAll = await page.locator(S.todoItem).count();
    await expect(todoItemsAll).toBe(5);
  });
});
