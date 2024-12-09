import { test, expect } from '@playwright/test';
import TodoPage from '../pageObject/todoPage';

test.describe('TodoMVC Application Tests', () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    // Initialize the page object and navigate to the app
    todoPage = new TodoPage(page);
    await todoPage.navigateTo();
    await todoPage.verifyPageTitle();
  });

  test('should add, manage, and verify todos', async () => {
    const todos = ['Playwright', 'Automation Test', 'Cypress', 'Selenium'];

    // Add new todos
    for (const todo of todos) {
      await todoPage.addTodoItem(todo);
    }

    // Verify todo count
    const count = await todoPage.getTodoCount();
    const todoCountText = await todoPage.todoCount.textContent();
    expect(todoCountText).toEqual(`${count} items left!`);

    // Toggle all todos to mark them as completed
    await todoPage.toggleAllTodos();

    // Uncheck the first todo item
    await todoPage.toggleSpecificTodo(0, false);

    // Delete the second todo item
    await todoPage.deleteTodoItem(1);

    // Verify items in the "Active" section
    await todoPage.navigateToSection('active');
    const activeItems = await todoPage.getSectionItems();
    const activeCount = await activeItems.count();
    console.log('Active items count:', activeCount);

    // Verify items in the "Completed" section
    await todoPage.navigateToSection('completed');
    const completedItems = await todoPage.getSectionItems();
    const completedCount = await completedItems.count();
    console.log('Completed items count:', completedCount);

    // Clear all completed todos
    await todoPage.clearCompletedTodos();
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});
