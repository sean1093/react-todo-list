# Testing React Components

This document explains how to write and run tests for React components using Jest, Enzyme, and React Testing Library.

## Table of Contents

- [Why Testing Matters](#why-testing-matters)
- [Testing Tools](#testing-tools)
- [Test Setup](#test-setup)
- [Writing Tests](#writing-tests)
- [Testing Patterns](#testing-patterns)
- [Running Tests](#running-tests)
- [Best Practices](#best-practices)

## Why Testing Matters

### Benefits of Testing

1. **Confidence**: Know your code works as expected
2. **Documentation**: Tests serve as living documentation
3. **Refactoring Safety**: Change code without fear of breaking functionality
4. **Bug Prevention**: Catch bugs before they reach production
5. **Better Design**: Writing testable code leads to better architecture

### Types of Tests

```
Unit Tests → Integration Tests → E2E Tests
   ↓              ↓                  ↓
 Fast          Medium             Slow
 Many          Some               Few
 Isolated      Combined           Full app
```

This project focuses on **Unit** and **Integration** tests.

## Testing Tools

### 1. Jest

Jest is a JavaScript testing framework that provides:
- Test runner
- Assertion library
- Mocking capabilities
- Code coverage reports

```jsx
// Basic Jest assertions
expect(value).toBe(expectedValue);
expect(value).toEqual(expectedValue);
expect(element).toBeInTheDocument();
expect(array).toHaveLength(3);
```

### 2. React Testing Library

A lightweight testing library that focuses on testing components from a user's perspective.

```jsx
import { render, fireEvent } from '@testing-library/react';

// Render component
const { getByText, getByTestId } = render(<MyComponent />);

// Find elements
const button = getByText('Click me');
const input = getByTestId('my-input');

// Simulate user interactions
fireEvent.click(button);
fireEvent.change(input, { target: { value: 'test' } });
```

### 3. Enzyme

A testing utility from Airbnb that provides a more traditional approach to component testing.

```jsx
import { shallow, mount } from 'enzyme';

// Shallow rendering (component only)
const wrapper = shallow(<MyComponent />);

// Full DOM rendering
const wrapper = mount(<MyComponent />);

// Find elements
wrapper.find('button');
wrapper.find('.className');
wrapper.find('ComponentName');
```

## Test Setup

### Configuration Files

#### setupTests.js

Located at `app/src/setupTests.js`:

```jsx
// jest-dom adds custom jest matchers for asserting on DOM nodes
import '@testing-library/jest-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Configure Enzyme with React 16 adapter
Enzyme.configure({ adapter: new Adapter() });
```

**Purpose**:
- Set up jest-dom matchers
- Configure Enzyme adapter
- Runs before all tests

#### package.json Jest Configuration

```json
"jest": {
  "snapshotSerializers": ["enzyme-to-json/serializer"],
  "collectCoverageFrom": ["src/**/*.js", "!src/index.js"],
  "coverageReporters": ["text"]
}
```

**Configuration**:
- `snapshotSerializers`: Format Enzyme snapshots
- `collectCoverageFrom`: Which files to include in coverage
- `coverageReporters`: How to report coverage

### Test File Structure

```
app/src/
├── __test__/
│   ├── App.enzyme.test.js           # Enzyme tests
│   ├── App.testing.test.js          # React Testing Library tests
│   └── __snapshots__/               # Snapshot files
│       ├── App.enzyme.test.js.snap
│       └── App.testing.test.js.snap
├── components/
├── config/
│   └── testId.js                    # Test ID constants
└── App.js
```

### Test ID Configuration

Located at `app/src/config/testId.js`:

```jsx
export const TEST_ID = {
    APP_TITLE: 'app_title',
    TODO_INPUT: 'todo_input',
    ADD_BUTTON: 'add_button',
    TODO_ITEM: 'todo_item',
};
```

**Benefits**:
- Centralized test identifiers
- Prevents typos
- Easy to update
- Consistent across tests

## Writing Tests

### Test Structure

```jsx
describe('Test Suite Name', () => {
    // Setup before each test
    beforeEach(() => {
        // Initialize test data
    });

    // Cleanup after each test
    afterEach(() => {
        // Clean up
    });

    test('should do something', () => {
        // Arrange: Set up test data
        // Act: Perform action
        // Assert: Verify result
    });
});
```

### React Testing Library Tests

Located at `app/src/__test__/App.testing.test.js`:

```jsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import { TEST_ID } from '../config/testId';

describe('Todo App container tests', () => {
    let app;
    const renderApp = () => <App />;

    beforeEach(() => {
        app = render(renderApp());
    });

    afterEach(() => {
        app.unmount();
    });

    test('Todo App container should display as expected', () => {
        expect(app).toMatchSnapshot();
    });

    test('App title should display as expected', () => {
        const appTitle = app.getByTestId(TEST_ID.APP_TITLE);
        expect(appTitle).toHaveTextContent('Todo List Sample');
    });

    test('Todo item should add on todo list as expected', () => {
        const todoInput = app.getByTestId(TEST_ID.TODO_INPUT);
        const addButton = app.getByTestId(TEST_ID.ADD_BUTTON);

        fireEvent.change(todoInput, { target: { value: 'todo1' } });
        fireEvent.click(addButton);

        const todoItem1 = app.getByTestId(`${TEST_ID.TODO_ITEM}_todo1`);
        expect(todoItem1).toBeInTheDocument();
    });

    test('Todo item should delete on todo list as expected', () => {
        const todoInput = app.getByTestId(TEST_ID.TODO_INPUT);
        const addButton = app.getByTestId(TEST_ID.ADD_BUTTON);

        fireEvent.change(todoInput, { target: { value: 'todo1' } });
        fireEvent.click(addButton);

        const todoItem1 = app.getByTestId(`${TEST_ID.TODO_ITEM}_todo1`);
        fireEvent.click(todoItem1);
        expect(todoItem1).not.toBeInTheDocument();
    });
});
```

**Test Breakdown**:

#### Test 1: Snapshot Test

```jsx
test('Todo App container should display as expected', () => {
    expect(app).toMatchSnapshot();
});
```

**Purpose**: Ensure UI doesn't change unexpectedly
**How it works**:
1. First run creates a snapshot file
2. Subsequent runs compare against snapshot
3. Fails if output differs

#### Test 2: Title Display

```jsx
test('App title should display as expected', () => {
    const appTitle = app.getByTestId(TEST_ID.APP_TITLE);
    expect(appTitle).toHaveTextContent('Todo List Sample');
});
```

**Purpose**: Verify title renders correctly
**Steps**:
1. Find title element by test ID
2. Assert it contains expected text

#### Test 3: Add Item

```jsx
test('Todo item should add on todo list as expected', () => {
    const todoInput = app.getByTestId(TEST_ID.TODO_INPUT);
    const addButton = app.getByTestId(TEST_ID.ADD_BUTTON);

    fireEvent.change(todoInput, { target: { value: 'todo1' } });
    fireEvent.click(addButton);

    const todoItem1 = app.getByTestId(`${TEST_ID.TODO_ITEM}_todo1`);
    expect(todoItem1).toBeInTheDocument();
});
```

**Purpose**: Test adding functionality
**Steps**:
1. Find input and button
2. Type 'todo1' in input
3. Click add button
4. Verify item appears in list

#### Test 4: Delete Item

```jsx
test('Todo item should delete on todo list as expected', () => {
    // Add item
    const todoInput = app.getByTestId(TEST_ID.TODO_INPUT);
    const addButton = app.getByTestId(TEST_ID.ADD_BUTTON);
    fireEvent.change(todoInput, { target: { value: 'todo1' } });
    fireEvent.click(addButton);

    // Delete item
    const todoItem1 = app.getByTestId(`${TEST_ID.TODO_ITEM}_todo1`);
    fireEvent.click(todoItem1);

    // Verify item is removed
    expect(todoItem1).not.toBeInTheDocument();
});
```

**Purpose**: Test deletion functionality
**Steps**:
1. Add a todo item
2. Click on the item
3. Verify item is removed

### Enzyme Tests

Located at `app/src/__test__/App.enzyme.test.js`:

```jsx
import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import { TEST_ID } from '../config/testId';

describe('Todo App container tests', () => {
    let app;
    const renderApp = () => <App />;

    beforeEach(() => {
        app = mount(renderApp());
    });

    afterEach(() => {
        app.unmount();
    });

    test('Todo App container should display as expected', () => {
        const appShallow = shallow(renderApp());
        expect(appShallow).toMatchSnapshot();
        expect(app).toMatchSnapshot();
    });

    test('App title should display as expected', () => {
        const appTitle = app.find(`div[data-testid="${TEST_ID.APP_TITLE}"]`).text();
        expect(appTitle).toBe('Todo List Sample');
    });

    test('Todo item should add on todo list as expected', () => {
        const todoInput = app.find('input');
        const addButton = app.find('button');

        todoInput.simulate('change', { target: { value: 'todo1' } });
        addButton.simulate('click');

        const todoItem1Content = app.find('li').text();
        expect(todoItem1Content).toBe('todo1');
    });
});
```

**Key Differences from React Testing Library**:
- Uses `shallow` and `mount` instead of `render`
- Uses `find` instead of `getByTestId`
- Uses `simulate` instead of `fireEvent`
- Can test implementation details more easily

## Testing Patterns

### Pattern 1: Arrange-Act-Assert (AAA)

```jsx
test('should add todo item', () => {
    // Arrange: Set up test data
    const { getByTestId } = render(<App />);
    const input = getByTestId(TEST_ID.TODO_INPUT);
    const button = getByTestId(TEST_ID.ADD_BUTTON);

    // Act: Perform action
    fireEvent.change(input, { target: { value: 'new item' } });
    fireEvent.click(button);

    // Assert: Verify result
    const item = getByTestId(`${TEST_ID.TODO_ITEM}_new item`);
    expect(item).toBeInTheDocument();
});
```

### Pattern 2: Testing User Interactions

```jsx
test('user can type and submit', () => {
    const { getByTestId } = render(<App />);
    const input = getByTestId(TEST_ID.TODO_INPUT);

    // Simulate typing
    fireEvent.change(input, { target: { value: 'Buy milk' } });
    expect(input.value).toBe('Buy milk');

    // Simulate form submission
    const button = getByTestId(TEST_ID.ADD_BUTTON);
    fireEvent.click(button);
});
```

### Pattern 3: Testing Component Output

```jsx
test('displays correct number of items', () => {
    const { getByTestId, getAllByRole } = render(<App />);
    const input = getByTestId(TEST_ID.TODO_INPUT);
    const button = getByTestId(TEST_ID.ADD_BUTTON);

    // Add multiple items
    ['item1', 'item2', 'item3'].forEach(item => {
        fireEvent.change(input, { target: { value: item } });
        fireEvent.click(button);
    });

    // Check count
    const items = getAllByRole('listitem');
    expect(items).toHaveLength(3);
});
```

### Pattern 4: Snapshot Testing

```jsx
test('matches snapshot', () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
});
```

**When to update snapshots**:
- Intentional UI changes: `yarn test -- -u`
- Review changes carefully
- Don't blindly update

## Running Tests

### Basic Commands

```sh
# Run all tests
yarn test

# Run tests in watch mode
yarn test --watch

# Run tests with coverage
yarn test --coverage

# Update snapshots
yarn test -- -u

# Run specific test file
yarn test App.testing.test.js

# Run tests matching pattern
yarn test --testNamePattern="add"
```

### Watch Mode Commands

When running `yarn test`, you can use:
- `a`: Run all tests
- `f`: Run only failed tests
- `p`: Filter by file name
- `t`: Filter by test name
- `q`: Quit watch mode
- `Enter`: Trigger a test run

### Coverage Report

```sh
yarn test --coverage
```

**Output Example**:
```
-----------------------|---------|----------|---------|---------|
File                   | % Stmts | % Branch | % Funcs | % Lines |
-----------------------|---------|----------|---------|---------|
All files              |   95.24 |      100 |      90 |   95.24 |
 components            |     100 |      100 |     100 |     100 |
  Content.js           |     100 |      100 |     100 |     100 |
  Control.js           |     100 |      100 |     100 |     100 |
 App.js                |      90 |      100 |      75 |      90 |
-----------------------|---------|----------|---------|---------|
```

## Best Practices

### 1. Test Behavior, Not Implementation

```jsx
// Good: Test what user sees ✅
test('displays error message', () => {
    const { getByText } = render(<Form />);
    expect(getByText('Error: Invalid input')).toBeInTheDocument();
});

// Bad: Test internal state ❌
test('sets error state', () => {
    const wrapper = shallow(<Form />);
    expect(wrapper.state('error')).toBe(true);
});
```

### 2. Use data-testid for Complex Queries

```jsx
// In component
<div data-testid="user-profile">...</div>

// In test
const profile = getByTestId('user-profile');
```

### 3. Write Descriptive Test Names

```jsx
// Good ✅
test('should display error message when input is empty', () => {});
test('user can add todo item by clicking add button', () => {});

// Bad ❌
test('test 1', () => {});
test('works', () => {});
```

### 4. Keep Tests Independent

```jsx
// Good: Each test is independent ✅
describe('TodoApp', () => {
    beforeEach(() => {
        // Fresh render for each test
        render(<App />);
    });

    test('test 1', () => { /* uses fresh render */ });
    test('test 2', () => { /* uses fresh render */ });
});

// Bad: Tests depend on each other ❌
describe('TodoApp', () => {
    let app;

    test('test 1', () => {
        app = render(<App />);
        // modifies app
    });

    test('test 2', () => {
        // depends on test 1's modifications
    });
});
```

### 5. Test Edge Cases

```jsx
describe('Todo Input', () => {
    test('handles empty input', () => {});
    test('handles very long input', () => {});
    test('handles special characters', () => {});
    test('handles whitespace-only input', () => {});
});
```

### 6. Use beforeEach and afterEach

```jsx
describe('Component Tests', () => {
    let component;

    beforeEach(() => {
        // Setup before each test
        component = render(<MyComponent />);
    });

    afterEach(() => {
        // Cleanup after each test
        component.unmount();
    });

    test('test 1', () => {
        // component is fresh and clean
    });
});
```

## Practice Exercises

### Exercise 1: Test Input Validation

Write a test to verify that empty items are not added:

<details>
<summary>Click to see answer</summary>

```jsx
test('should not add empty todo items', () => {
    const { getByTestId, queryByRole } = render(<App />);
    const input = getByTestId(TEST_ID.TODO_INPUT);
    const button = getByTestId(TEST_ID.ADD_BUTTON);

    // Try to add empty item
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(button);

    // Verify no items were added
    const items = queryByRole('listitem');
    expect(items).toBeNull();
});
```

Note: This test will fail with the current implementation. You'd need to add validation to the Control component first.
</details>

### Exercise 2: Test Multiple Items

Write a test to add multiple items and verify the count:

<details>
<summary>Click to see answer</summary>

```jsx
test('should add multiple todo items', () => {
    const { getByTestId, getAllByRole } = render(<App />);
    const input = getByTestId(TEST_ID.TODO_INPUT);
    const button = getByTestId(TEST_ID.ADD_BUTTON);

    const items = ['task 1', 'task 2', 'task 3'];
    items.forEach(item => {
        fireEvent.change(input, { target: { value: item } });
        fireEvent.click(button);
    });

    const listItems = getAllByRole('listitem');
    expect(listItems).toHaveLength(3);
});
```
</details>

### Exercise 3: Test Component in Isolation

Write tests for the Control component separately:

<details>
<summary>Click to see answer</summary>

```jsx
import Control from '../components/Control';

describe('Control Component', () => {
    test('calls setList when add button is clicked', () => {
        const mockSetList = jest.fn();
        const { getByTestId } = render(
            <Control list={[]} setList={mockSetList} />
        );

        const input = getByTestId(TEST_ID.TODO_INPUT);
        const button = getByTestId(TEST_ID.ADD_BUTTON);

        fireEvent.change(input, { target: { value: 'test' } });
        fireEvent.click(button);

        expect(mockSetList).toHaveBeenCalled();
    });
});
```
</details>

## Summary

In this chapter, we learned:

- ✅ Why testing is important
- ✅ Different testing tools: Jest, React Testing Library, and Enzyme
- ✅ How to set up tests
- ✅ How to write effective tests
- ✅ Common testing patterns
- ✅ How to run tests and check coverage
- ✅ Best practices for testing React components

## Next Steps

- Read [05-FAQ.md](./05-FAQ.md) for common questions and troubleshooting
- Practice writing more tests for your components
- Explore testing more complex scenarios
- Learn about integration and E2E testing
