**TodoMVC Application Testing with Playwright**

This repository contains automated tests for the TodoMVC React application using Playwright. The tests ensure proper functionality for adding, managing, and verifying todos within the application.

Features Tested

1.**Adding Items to the Todo List**

Users can add multiple todo items.

Each item appears in the todo list after being added. 

2. **Verifying Todo Count**

Verifies the total number of items in the todo list.

Confirms that the displayed count (e.g., "3 items left") matches the actual number of items.

3. **Marking Items as Completed**

All items can be marked as completed using the "Toggle All" checkbox.

Individual items can also be toggled between completed and active states.

4. **Deleting Items**

Allows users to delete individual todo items.

5. **Filtering Todos by Section**

Users can navigate between Active and Completed sections.

Verifies that only the appropriate items appear in each section.

6. **Clearing Completed Todos**

Users can remove all completed items from the list with a single action.

```Folder Structure

├── pageObject
│   └── todoPage.ts      // Contains the page object model for the TodoMVC app
├── tests
│   └── todo.spec.ts     // Test suite for the TodoMVC app
```

Installation and Setup

```Clone the repository:
git clone <repository-url>
cd <repository-folder>
```

```Install dependencies:
npm install
```

Update playwright.config.ts to configure the base URL if needed.

Running the Tests

```Execute the tests using the Playwright test runner:
npx playwright test
```

Test Highlights

Test Suite: ```todo.spec.ts```

Test Scenarios:

Verify application title and heading.

Add multiple todo items and verify their presence.

Mark items as completed and toggle their state.

Delete specific items from the list.

Filter and verify items in the Active and Completed sections.

Clear all completed items from the list.

Key Files

```todoPage.ts```

Defines the Page Object Model (POM) for the TodoMVC application. Includes methods for:

Navigating to the application

Adding, toggling, and deleting todo items

Filtering items and clearing completed todos

```todo.spec.ts```

Contains the test cases for verifying the functionality of the TodoMVC application.

**Example Usage**

Adding and Managing Todos
```
const todos = ['Playwright', 'Automation Test', 'Cypress', 'Selenium'];

for (const todo of todos) {
  await todoPage.addTodoItem(todo);
}

const count = await todoPage.getTodoCount();
expect(await todoPage.todoCount.textContent()).toEqual(`${count} items left!`);
```
Filtering and Clearing Todos
```
await todoPage.navigateToSection('active');
const activeItems = await todoPage.getSectionItems();
console.log('Active items count:', await activeItems.count());

await todoPage.clearCompletedTodos();
```
