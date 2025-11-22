# Component-Based Design

This document explains how to design and organize React components effectively, comparing the basic single-file approach with the component-based architecture.

## Table of Contents

- [Why Component-Based Design?](#why-component-based-design)
- [From Basic to Advanced](#from-basic-to-advanced)
- [Component Structure](#component-structure)
- [Props and Data Flow](#props-and-data-flow)
- [Best Practices](#best-practices)

## Why Component-Based Design?

### Benefits

1. **Reusability**: Components can be reused across different parts of your application
2. **Maintainability**: Smaller, focused components are easier to understand and maintain
3. **Testability**: Individual components can be tested in isolation
4. **Separation of Concerns**: Each component handles a specific responsibility
5. **Team Collaboration**: Different team members can work on different components

### Single Responsibility Principle

Each component should have one reason to change. For example:
- A **Control** component should only handle user input
- A **Content** component should only handle displaying the list
- An **App** component should only handle state management and composition

## From Basic to Advanced

### Basic Version (App.todo.basic.js)

The basic version has everything in one file:

```jsx
const App = () => {
  const [list, setList] = useState([]);
  const [value, setValue] = useState('');

  // All logic in one component
  const onChange = (e) => { ... }
  const addItem = () => { ... }

  return (
    <>
      <input value={value} onChange={onChange}/>
      <button onClick={addItem}>Add</button>
      <div>
        {list.map((item) => <div>{item}</div>)}
      </div>
    </>
  );
}
```

**Problems**:
- Hard to test individual parts
- Difficult to reuse input logic or list display
- All logic mixed together
- Harder to understand as it grows

### Advanced Version (Component-Based)

The advanced version splits into focused components:

```
App.js (State Management)
  ├── Control.js (Input Logic)
  └── Content.js (Display Logic)
```

## Component Structure

### App Component (app/src/App.js)

The main component that manages state and composes other components.

```jsx
import React, { useState } from 'react';
import Control from './components/Control';
import Content from './components/Content';
import { Container, Title } from './Style.css';
import { TEST_ID } from './config/testId';

const App = () => {
    const [list, setList] = useState([]);
    return (
        <Container>
            <Title data-testid={TEST_ID.APP_TITLE}>Todo List Sample</Title>
            <Control
                list={list}
                setList={setList}
            />
            <Content
                list={list}
                setList={setList}
            />
        </Container>
    );
}

export default App;
```

**Responsibilities**:
- Manage the todo list state
- Compose Control and Content components
- Pass state and state updater to children

**Key Points**:
- Clean and simple
- Easy to understand the app structure
- Testable with test IDs
- Uses styled components for styling

### Control Component (app/src/components/Control.js)

Handles user input and adding new items.

```jsx
import React, { useState } from 'react';
import { Input, ContentContainer, AddButton } from '../Style.css';
import { TEST_ID } from '../config/testId';

const Control = ({ list, setList }) => {
    const [value, setValue] = useState('');
    const onAddItem = () => {
        // eslint-disable-next-line new-parens
        const timestamp = (new Date).getTime();
        setList([...list, { value: value, id: `${timestamp}` }]);
        setValue('');
    };
    return (
        <ContentContainer>
            <Input
                data-testid={TEST_ID.TODO_INPUT}
                value={value}
                onChange={(e) => { setValue(e?.target?.value)}}
            />
            <AddButton
                data-testid={TEST_ID.ADD_BUTTON}
                onClick={onAddItem}
            >
                Add
            </AddButton>
        </ContentContainer>
    );
};
export default Control;
```

**Responsibilities**:
- Manage input field value
- Handle user input changes
- Create new todo items with unique IDs
- Update the todo list through props

**Key Points**:
- Uses timestamp for unique IDs
- Clears input after adding
- Optional chaining (`e?.target?.value`) for safety
- Structured data: `{ value, id }` instead of just strings

### Content Component (app/src/components/Content.js)

Displays the todo list and handles item removal.

```jsx
import React from 'react';
import { ContentContainer, TodoList, TodoItem } from '../Style.css';
import { TEST_ID } from '../config/testId';

const Content = ({ list, setList }) => {
    const onRemove = (e) => {
        const id = e?.target?.id;
        const newList = list.filter(item => item.id !== id);
        setList(newList);
    };
    return (
        <ContentContainer>
            <TodoList>
                {
                    list.map((item, idx) => {
                        return (
                            <TodoItem
                                key={`${idx}_item_${item.id}`}
                                data-testid={`${TEST_ID.TODO_ITEM}_${item.value}`}
                                id={item.id}
                                onClick={onRemove}
                            >
                                {item.value}
                            </TodoItem>
                        )
                    })
                }
            </TodoList>
        </ContentContainer>
    );
};
export default Content;
```

**Responsibilities**:
- Display all todo items
- Handle item removal
- Provide visual feedback (cursor pointer)

**Key Points**:
- Uses `map` to render list items
- Unique `key` prop for React reconciliation
- ID-based removal for accuracy
- Optional chaining for safety

## Props and Data Flow

### Understanding Props

Props (properties) are how data flows from parent to child components in React.

```jsx
// Parent Component
<Control list={list} setList={setList} />

// Child Component receives props
const Control = ({ list, setList }) => {
  // Can use list and setList here
}
```

### Data Flow Diagram

```
┌─────────────────────────────────────┐
│            App Component            │
│  - Manages list state               │
│  - Owns: [list, setList]            │
└───────────┬─────────────────────────┘
            │
            ├─ Props: list, setList
            │
    ┌───────┴────────┐
    │                │
┌───▼────────┐  ┌───▼────────┐
│  Control   │  │  Content   │
│  - Input   │  │  - Display │
│  - Add     │  │  - Remove  │
└────────────┘  └────────────┘
```

### Lifting State Up

State is kept in the **App** component because:
1. Both Control and Content need access to the list
2. Control needs to add items
3. Content needs to remove items
4. Shared state should live in the common parent

```jsx
// Good: State in parent ✅
const App = () => {
  const [list, setList] = useState([]);
  return (
    <>
      <Control setList={setList} list={list} />
      <Content setList={setList} list={list} />
    </>
  );
}

// Bad: Duplicated state ❌
const App = () => {
  return (
    <>
      <Control /> {/* Has its own list state */}
      <Content /> {/* Has different list state */}
    </>
  );
}
```

## Best Practices

### 1. Component File Organization

```
src/
├── components/
│   ├── Control.js        # One component per file
│   └── Content.js
├── config/
│   └── testId.js         # Centralized constants
├── Style.css.js          # Styled components
└── App.js                # Main app component
```

### 2. Naming Conventions

```jsx
// Component names: PascalCase
const TodoList = () => { ... }

// File names: PascalCase or kebab-case
Control.js  or  control.js

// Props: camelCase
<Control list={list} setList={setList} />

// Event handlers: onEventName or handleEventName
const onAddItem = () => { ... }
const handleClick = () => { ... }
```

### 3. Props Destructuring

```jsx
// Good: Destructure in parameters ✅
const Control = ({ list, setList }) => {
  return <div>{list.length}</div>
}

// Less clear: Using props object ❌
const Control = (props) => {
  return <div>{props.list.length}</div>
}
```

### 4. Key Prop in Lists

```jsx
// Good: Unique and stable key ✅
list.map((item) => (
  <TodoItem key={item.id} {...item} />
))

// Bad: Using index as key (when items can be reordered) ⚠️
list.map((item, idx) => (
  <TodoItem key={idx} {...item} />
))

// Worse: No key ❌
list.map((item) => (
  <TodoItem {...item} />
))
```

**Why keys matter**:
- React uses keys to identify which items have changed
- Using index can cause bugs when items are reordered or removed
- Keys should be stable and unique

### 5. Optional Chaining

```jsx
// Safe access with optional chaining ✅
const value = e?.target?.value;

// Without optional chaining (can throw errors) ❌
const value = e.target.value;
```

### 6. Unique ID Generation

```jsx
// Using timestamp ✅
const timestamp = (new Date).getTime();
const id = `${timestamp}`;

// Could also use:
const id = Date.now().toString();
const id = `item_${Date.now()}`;

// Or use a library like uuid for production apps
import { v4 as uuidv4 } from 'uuid';
const id = uuidv4();
```

## Comparison: Basic vs Advanced

| Aspect | Basic Version | Advanced Version |
|--------|---------------|------------------|
| **Structure** | Single file | Multiple files |
| **Testability** | Hard to test parts | Easy to test each component |
| **Reusability** | Cannot reuse | Components can be reused |
| **Maintainability** | Harder as it grows | Easier to maintain |
| **Data Model** | Simple strings | Structured objects `{id, value}` |
| **ID Generation** | None | Timestamp-based |
| **Styling** | Inline or basic CSS | Styled Components |
| **Best For** | Learning basics | Production apps |

## Refactoring Exercise

Try refactoring the basic version yourself:

### Step 1: Extract TodoList Display

Extract the list rendering into a separate component:

```jsx
const TodoList = ({ list }) => (
  <div>
    {list.map((item) => (
      <div key={item}>{item}</div>
    ))}
  </div>
);
```

### Step 2: Extract Input Control

Extract the input and add button:

```jsx
const Control = ({ onAdd }) => {
  const [value, setValue] = useState('');

  const addItem = () => {
    onAdd(value);
    setValue('');
  };

  return (
    <>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={addItem}>Add</button>
    </>
  );
};
```

### Step 3: Simplify App Component

```jsx
const App = () => {
  const [list, setList] = useState([]);

  const onAdd = (value) => {
    setList([...list, value]);
  };

  return (
    <>
      <Control onAdd={onAdd} />
      <TodoList list={list} />
    </>
  );
};
```

## Summary

In this chapter, we learned:

- ✅ Why component-based design is important
- ✅ How to split a single component into multiple focused components
- ✅ Component responsibilities and structure
- ✅ How props enable data flow between components
- ✅ Best practices for component organization
- ✅ Differences between basic and advanced approaches

## Next Steps

- Read [03-Styling.md](./03-Styling.md) to learn about Styled Components
- Read [04-Testing.md](./04-Testing.md) to learn how to test these components
