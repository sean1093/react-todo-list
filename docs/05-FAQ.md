# Frequently Asked Questions (FAQ)

Common questions and troubleshooting guide for the React Todo List project.

## Table of Contents

- [General Questions](#general-questions)
- [Setup and Installation](#setup-and-installation)
- [Development](#development)
- [Testing](#testing)
- [Common Errors](#common-errors)
- [Best Practices](#best-practices)
- [Further Learning](#further-learning)

## General Questions

### What is this project for?

This is a learning project designed to teach React fundamentals including:
- React Hooks (useState)
- Component-based architecture
- Styled Components
- Testing with Jest and React Testing Library

### What version of React does this use?

This project uses React 16.14.0. While newer versions exist, React 16.x is stable and widely used. The concepts learned here apply to newer versions as well.

### Do I need to know JavaScript first?

Yes, you should have a basic understanding of JavaScript including:
- Variables and data types
- Functions
- Arrays and array methods (map, filter)
- ES6+ features (arrow functions, destructuring, spread operator)

### What's the difference between App.js and App.todo.basic.js?

- **App.todo.basic.js**: All code in one file, good for understanding the complete flow
- **App.js**: Code split into components, demonstrates best practices

Start with App.todo.basic.js to understand basics, then study App.js to learn component organization.

## Setup and Installation

### I don't have Node.js. Where do I get it?

Download from [nodejs.org](https://nodejs.org/). Install the LTS (Long Term Support) version.

Verify installation:
```sh
node --version
npm --version
```

### Should I use npm or yarn?

Either works fine. This project uses yarn, but you can use npm:

```sh
# Yarn commands
yarn install
yarn start
yarn test

# Equivalent npm commands
npm install
npm start
npm test
```

### Installation fails with "permission denied"

On Mac/Linux, don't use `sudo` with npm/yarn. Instead:

```sh
# Fix npm permissions
npm config set prefix ~/.npm-global
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

### Port 3000 is already in use

Kill the process using port 3000:

```sh
# On Mac/Linux
lsof -ti:3000 | xargs kill -9

# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

Or run on a different port:
```sh
PORT=3001 yarn start
```

## Development

### How do I switch between App.js and App.todo.basic.js?

In `app/src/index.js`, change the import:

```jsx
// Use App.js (default)
import App from './App';

// Use App.todo.basic.js
import App from './App.todo.basic';
```

### Why do I need data-testid attributes?

data-testid attributes help identify elements in tests without relying on implementation details:

```jsx
<div data-testid="app-title">Todo List</div>

// In tests
const title = getByTestId('app-title');
```

**Benefits**:
- Tests won't break when CSS classes change
- Clear intent for testing
- Better than using text content which may change

### What is the timestamp ID for?

Each todo item needs a unique ID. Timestamp provides a simple unique identifier:

```jsx
const timestamp = (new Date).getTime();  // e.g., 1634567890123
```

**Why not use array index?**
- Index changes when items are reordered or removed
- Causes bugs in React's reconciliation
- Not suitable for identifying items

**Production alternative**: Use UUID library
```sh
yarn add uuid
```

```jsx
import { v4 as uuidv4 } from 'uuid';
const id = uuidv4();  // e.g., '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
```

### Why use optional chaining (e?.target?.value)?

Optional chaining prevents errors if a value is null or undefined:

```jsx
// Without optional chaining
const value = e.target.value;  // Error if e or target is undefined

// With optional chaining
const value = e?.target?.value;  // Returns undefined if e or target is undefined
```

### How do I add new styled components?

In `Style.css.js`:

```jsx
export const MyNewComponent = styled.div`
  padding: 10px;
  background: #f0f0f0;
`;
```

Then import where needed:
```jsx
import { MyNewComponent } from './Style.css';
```

## Testing

### Tests are failing after I made changes

Common reasons:

1. **Snapshot mismatch**: If you intentionally changed the UI, update snapshots:
   ```sh
   yarn test -- -u
   ```

2. **Logic changed**: Update tests to match new behavior

3. **Test ID missing**: Ensure data-testid attributes are present

### How do I run a specific test?

```sh
# Run specific file
yarn test App.testing.test.js

# Run tests matching a pattern
yarn test --testNamePattern="add"
```

### What's the difference between Enzyme and React Testing Library?

**Enzyme**:
- Tests implementation details
- Can access component state
- More control over rendering

**React Testing Library**:
- Tests user behavior
- Encourages best practices
- Focuses on what user sees

**Recommendation**: React Testing Library for new projects.

### My test passes but the feature doesn't work

Your test may not be thorough enough. Ensure you're testing:
- User interactions
- Visual output
- Edge cases

### How do I test a component in isolation?

Create a test file for the specific component:

```jsx
// components/__test__/Control.test.js
import Control from '../Control';

describe('Control', () => {
    test('renders input and button', () => {
        const { getByTestId } = render(
            <Control list={[]} setList={jest.fn()} />
        );

        expect(getByTestId(TEST_ID.TODO_INPUT)).toBeInTheDocument();
        expect(getByTestId(TEST_ID.ADD_BUTTON)).toBeInTheDocument();
    });
});
```

## Common Errors

### Error: Cannot find module 'react'

```sh
cd app
yarn install
```

### Error: React Hook "useState" is called in function that is neither a React function component nor a custom React Hook function

**Cause**: Component name must start with uppercase letter

```jsx
// Wrong ❌
const myComponent = () => { ... }

// Correct ✅
const MyComponent = () => { ... }
```

### Warning: Each child in a list should have a unique "key" prop

**Cause**: Missing or duplicate keys in mapped elements

```jsx
// Wrong ❌
list.map((item) => <div>{item}</div>)

// Correct ✅
list.map((item) => <div key={item.id}>{item}</div>)
```

### Error: Objects are not valid as a React child

**Cause**: Trying to render an object directly

```jsx
// Wrong ❌
<div>{item}</div>  // if item is {id: 1, value: 'text'}

// Correct ✅
<div>{item.value}</div>
```

### Warning: Cannot update a component while rendering a different component

**Cause**: Calling setState directly in render

```jsx
// Wrong ❌
const Component = () => {
    const [value, setValue] = useState('');
    setValue('new value');  // Called during render
    return <div>{value}</div>;
}

// Correct ✅
const Component = () => {
    const [value, setValue] = useState('');
    const handleClick = () => {
        setValue('new value');  // Called in event handler
    };
    return <button onClick={handleClick}>{value}</button>;
}
```

### Styled component renders with random class names

This is normal! Styled Components generates unique class names to prevent conflicts.

```jsx
// Renders as something like:
<div class="sc-fznyAO bwCtST">
```

### Tests fail with "ReferenceError: document is not defined"

**Cause**: Test environment not configured

Ensure `setupTests.js` imports jest-dom:
```jsx
import '@testing-library/jest-dom';
```

## Best Practices

### When should I split a component?

Split when:
- Component exceeds 200-300 lines
- Has multiple responsibilities
- Logic could be reused elsewhere
- Hard to understand or test

### How should I name my components?

- **Components**: PascalCase (MyComponent)
- **Files**: Match component name (MyComponent.js)
- **Props**: camelCase (onClick, userName)
- **Handlers**: onEventName or handleEventName

### Should I use inline styles or styled components?

**Prefer styled components** for:
- Reusable styles
- Pseudo-classes (:hover, :active)
- Media queries
- Component-scoped styles

**Use inline styles** for:
- Dynamic values that change frequently
- Quick prototypes

### How do I handle form input?

Use controlled components:

```jsx
const [value, setValue] = useState('');

<input
    value={value}
    onChange={(e) => setValue(e.target.value)}
/>
```

**Why controlled?**
- React state is source of truth
- Easy to validate
- Easy to manipulate

### Where should I put my state?

**Guidelines**:
- Keep state as close as possible to where it's used
- Lift state up when multiple components need it
- Consider context or state management for deeply nested components

## Further Learning

### What should I learn next?

1. **React Router**: For multi-page applications
2. **useEffect Hook**: For side effects and API calls
3. **Context API**: For global state management
4. **Redux**: Advanced state management
5. **TypeScript**: Type safety
6. **Next.js**: Server-side rendering

### Where can I find more resources?

**Official Documentation**:
- [React Docs](https://react.dev/)
- [Create React App](https://create-react-app.dev/)
- [Styled Components](https://styled-components.com/)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)

**Tutorials**:
- [React Tutorial](https://react.dev/learn)
- [JavaScript.info](https://javascript.info/)
- [MDN Web Docs](https://developer.mozilla.org/)

**Practice**:
- Build a blog
- Create a weather app
- Make a calculator
- Build a shopping cart

### How can I contribute to this project?

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Submit a pull request

### Where do I get help?

1. **Read the error message**: Often tells you what's wrong
2. **Check documentation**: Official docs are your best resource
3. **Search GitHub issues**: Someone may have had the same problem
4. **Ask questions**:
   - Stack Overflow
   - React Discord/Reddit
   - GitHub Discussions

## Troubleshooting Checklist

When something doesn't work:

- [ ] Read the error message completely
- [ ] Check the browser console for errors
- [ ] Verify all dependencies are installed (`yarn install`)
- [ ] Check that you're in the correct directory (`cd app`)
- [ ] Try clearing node_modules and reinstalling
- [ ] Restart the development server
- [ ] Check for typos in imports and component names
- [ ] Verify test IDs match between component and tests
- [ ] Make sure component names start with uppercase
- [ ] Check that all required props are passed

## Summary

This FAQ covers:
- ✅ Common questions about the project
- ✅ Setup and installation issues
- ✅ Development best practices
- ✅ Testing troubleshooting
- ✅ Common error messages and solutions
- ✅ Resources for further learning

Can't find your answer? Check the [GitHub issues](https://github.com) or create a new one!
