import { Locator, Page, expect } from '@playwright/test';

class TodoPage {
  readonly page: Page;
  // Also,We can configure the `baseURL` directly in the `playwright.config.ts` file
  readonly url = 'https://todomvc.com/examples/react/dist#/' 
  readonly heading: Locator;
  readonly todoInput: Locator;
  readonly todoList: Locator;
  readonly todoCount: Locator;
  readonly toggleAll: Locator;
  readonly clearCompleted: Locator;
  readonly activeLink: Locator;
  readonly completedLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator('h1');
    this.todoInput = page.locator('#todo-input');
    this.todoList = page.locator('.todo-list .view');
    this.todoCount = page.locator('.todo-count');
    this.toggleAll = page.locator('.toggle-all');
    this.clearCompleted = page.locator('.clear-completed');
    this.activeLink = page.locator('a[href="#/active"]');
    this.completedLink = page.locator('a[href="#/completed"]');
  }

  async navigateTo() {
    await this.page.goto(this.url); 
  }

  async verifyPageTitle() {
    await expect(this.page).toHaveTitle('TodoMVC: React');
    await expect(this.heading).toHaveText('todos');
  }

  async addTodoItem(item: string) {
    await this.todoInput.fill(item);
    await this.todoInput.press('Enter');
  }

  async getTodoCount() {
    return await this.todoList.count();
  }

  async toggleAllTodos() {
    await this.toggleAll.click();
  }

  async toggleSpecificTodo(index: number, state: boolean) {
    const checkbox = this.page.locator('.view input.toggle').nth(index);
    const isChecked = await checkbox.isChecked();
    if (isChecked !== state) {
      state ? await checkbox.check() : await checkbox.uncheck();
    }
  }

  async deleteTodoItem(index: number) {
    const todoItem = this.page.locator(`.todo-list li:nth-child(${index + 1})`);
    await todoItem.hover();
    const deleteButton = todoItem.locator('button.destroy');
    await deleteButton.click();
  }

  async navigateToSection(section: 'active' | 'completed') {
    const link = section === 'active' ? this.activeLink : this.completedLink;
    await link.click();
    await this.page.waitForSelector('.todo-list');
  }

  async getSectionItems() {
    return this.page.locator('.todo-list .view label');
  }

  async clearCompletedTodos() {
    await this.clearCompleted.click();
  }
}

export default TodoPage;