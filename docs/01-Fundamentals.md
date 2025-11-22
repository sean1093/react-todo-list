# React Fundamentals

This document introduces React fundamentals and how to use these concepts to build a Todo List application.

## Table of Contents

- [What is React?](#what-is-react)
- [JSX Syntax](#jsx-syntax)
- [Components](#components)
- [React Hooks](#react-hooks)
- [State Management](#state-management)
- [Basic Version Analysis](#basic-version-analysis)

## What is React?

React is a JavaScript library for building user interfaces, developed and maintained by Facebook. Its main features include:

- **Component-Based Development**: Break down UI into reusable components
- **Declarative Programming**: Describe what the UI should look like, not how to change it
- **Virtual DOM**: Virtual DOM mechanism for improved performance
- **Unidirectional Data Flow**: Data flows from parent to child components

## JSX Syntax

JSX is a syntax extension for JavaScript that allows us to write HTML-like code in JavaScript.

### Basic Syntax

```jsx
// Basic JSX
const element = <h1>Hello, World!</h1>;

// Using JavaScript expressions in JSX
const name = 'Sean';
const greeting = <h1>Hello, {name}!</h1>;

// JSX attributes
const input = <input type="text" placeholder="Enter text" />;

// Conditional rendering in JSX
const isLoggedIn = true;
const message = (
  <div>
    {isLoggedIn ? <p>Welcome back!</p> : <p>Please sign in.</p>}
  </div>
);
```

### JSX Rules

1. **Must have one root element**: Each component can only return one root element
   ```jsx
   // Wrong ❌
   return (
     <h1>Title</h1>
     <p>Content</p>
   );

   // Correct ✅
   return (
     <div>
       <h1>Title</h1>
       <p>Content</p>
     </div>
   );

   // Or use Fragment ✅
   return (
     <>
       <h1>Title</h1>
       <p>Content</p>
     </>
   );
   ```

2. **All tags must be closed**
   ```jsx
   <input type="text" />  // Self-closing tag
   <div></div>            // Paired tag
   ```

3. **Use camelCase for attributes**
   ```jsx
   <div className="container" onClick={handleClick}>
   ```

## Components

Components are the basic building blocks of React applications. In modern React, we primarily use function components.

### Function Components

```jsx
// Simple function component
const Welcome = () => {
  return <h1>Welcome!</h1>;
};

// Component with props
const Greeting = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};

// Using components
const App = () => {
  return (
    <div>
      <Welcome />
      <Greeting name="Sean" />
    </div>
  );
};
```

### Props (Properties)

Props are data passed from parent components to child components.

```jsx
// Define a component that receives props
const TodoItem = ({ text, id, onRemove }) => {
  return (
    <div onClick={() => onRemove(id)}>
      {text}
    </div>
  );
};

// Use the component and pass props
const App = () => {
  const handleRemove = (id) => {
    console.log('Remove item:', id);
  };

  return (
    <TodoItem
      text="Buy milk"
      id="1"
      onRemove={handleRemove}
    />
  );
};
```

## React Hooks

Hooks are a feature introduced in React 16.8 that allow us to use state and other React features in function components.

### useState Hook

`useState` is the most commonly used Hook for adding state to function components.

#### Basic Usage

```jsx
import React, { useState } from 'react';

const Counter = () => {
  // Declare a state variable
  // count is the current value, setCount is the update function
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
};
```

#### Syntax Explanation

```jsx
const [state, setState] = useState(initialValue);
```

- `state`: Current state value
- `setState`: Function to update state
- `initialValue`: Initial value of the state

#### Multiple States

```jsx
const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);

  return (
    <form>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
      />
    </form>
  );
};
```

## State Management

### Array State

In a Todo List, we need to manage an array to store all todo items.

```jsx
const [list, setList] = useState([]);
```

### Adding Items

Use the spread operator to add items:

```jsx
const addItem = (value) => {
  // Create a new array with old items and new item
  const newList = [...list, value];
  setList(newList);
};

// Or use simplified syntax
const addItem = (value) => {
  setList([...list, value]);
};
```

### Removing Items

Use the `filter` method to remove items:

```jsx
const removeItem = (id) => {
  // Filter out the item with the specified id
  const newList = list.filter(item => item.id !== id);
  setList(newList);
};
```

### Why Can't We Mutate State Directly?

```jsx
// Wrong approach ❌
list.push(newItem);
setList(list);

// Correct approach ✅
setList([...list, newItem]);
```

**Reasons**:
1. React uses reference comparison to determine if state has changed
2. Directly modifying the array doesn't change its reference, so React won't re-render
3. You must create a new array to trigger an update

## Basic Version Analysis

Let's analyze the code in `App.todo.basic.js`:

### Complete Code

```jsx
import React, { useState } from 'react';

// TodoList component: Display todo items list
const TodoList = ({ list }) => (
  <div>
    {
      list.map((item) => {
        return <div>{item}</div>;
      })
    }
  </div>
);

// Control component: Input and add functionality
const Control = ({ onAdd }) => {
  const [value, setValue] = useState('');

  const onChange = (e) => {
    setValue(e.target.value);
  }

  const addItem = () => {
    onAdd(value);
    setValue('');  // Clear input field
  }

  return (
    <>
      <input value={value} onChange={onChange}/>
      <button onClick={addItem}>Add</button>
    </>
  );
};

// App main component
const App = () => {
  const [list, setList] = useState([]);

  const onAdd = (value) => {
    const newArray = [...list, value];
    setList(newArray);
  }

  return (
    <>
      <Control onAdd={onAdd} />
      <TodoList list={list} />
    </>
  );
}

export default App;
```

### Code Analysis

#### 1. App Component (Main Component)

```jsx
const App = () => {
  // Use useState to manage todo list
  const [list, setList] = useState([]);

  // Function to add items
  const onAdd = (value) => {
    const newArray = [...list, value];
    setList(newArray);
  }

  return (
    <>
      {/* Pass onAdd function to Control component */}
      <Control onAdd={onAdd} />
      {/* Pass list array to TodoList component */}
      <TodoList list={list} />
    </>
  );
}
```

**Key Points**:
- `list` state stores all todo items
- `onAdd` function handles adding items
- Use props to pass data and functions to child components

#### 2. Control Component (Input Control)

```jsx
const Control = ({ onAdd }) => {
  // Manage input field value
  const [value, setValue] = useState('');

  // Handle input changes
  const onChange = (e) => {
    setValue(e.target.value);
  }

  // Add item and clear input field
  const addItem = () => {
    onAdd(value);    // Call function from parent component
    setValue('');    // Reset input field
  }

  return (
    <>
      <input value={value} onChange={onChange}/>
      <button onClick={addItem}>Add</button>
    </>
  );
};
```

**Key Points**:
- `value` state controls input field content
- `onChange` event handler updates input value
- `addItem` calls the parent component's `onAdd` function

#### 3. TodoList Component (List Display)

```jsx
const TodoList = ({ list }) => (
  <div>
    {
      list.map((item) => {
        return <div>{item}</div>;
      })
    }
  </div>
);
```

**Key Points**:
- Use `map` method to iterate through the list
- Create a `<div>` element for each item

### Data Flow

```
App (list state)
  │
  ├─→ Control (onAdd prop)
  │     └─→ User input → Call onAdd → Update App's list
  │
  └─→ TodoList (list prop)
        └─→ Display list content
```

## Practice Exercises

### Exercise 1: Display Item Count

Add functionality to display the total number of todo items in the App component.

<details>
<summary>Click to see answer</summary>

```jsx
const App = () => {
  const [list, setList] = useState([]);

  const onAdd = (value) => {
    setList([...list, value]);
  }

  return (
    <>
      <h2>Total: {list.length} items</h2>
      <Control onAdd={onAdd} />
      <TodoList list={list} />
    </>
  );
}
```
</details>

### Exercise 2: Prevent Adding Empty Items

Modify the Control component to prevent adding empty todo items.

<details>
<summary>Click to see answer</summary>

```jsx
const Control = ({ onAdd }) => {
  const [value, setValue] = useState('');

  const onChange = (e) => {
    setValue(e.target.value);
  }

  const addItem = () => {
    // Check if empty string
    if (value.trim() === '') {
      return;
    }
    onAdd(value);
    setValue('');
  }

  return (
    <>
      <input value={value} onChange={onChange}/>
      <button onClick={addItem}>Add</button>
    </>
  );
};
```
</details>

### Exercise 3: Add with Enter Key

Allow users to add items by pressing the Enter key.

<details>
<summary>Click to see answer</summary>

```jsx
const Control = ({ onAdd }) => {
  const [value, setValue] = useState('');

  const onChange = (e) => {
    setValue(e.target.value);
  }

  const addItem = () => {
    if (value.trim() === '') return;
    onAdd(value);
    setValue('');
  }

  // Handle keyboard events
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addItem();
    }
  }

  return (
    <>
      <input
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress}
      />
      <button onClick={addItem}>Add</button>
    </>
  );
};
```
</details>

## Summary

In this chapter, we learned:

- ✅ Basic concepts and features of React
- ✅ JSX syntax and rules
- ✅ How to create function components
- ✅ How to use Props
- ✅ How to use useState Hook
- ✅ Array state management (adding items)
- ✅ Basic version code analysis

## Next Steps

- Read [02-Component-Design.md](./02-Component-Design.md) to learn how to split code into better component structures
