# Styling with Styled Components

This document explains how to use Styled Components for styling React applications.

## Table of Contents

- [What is Styled Components?](#what-is-styled-components)
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Project Styling Structure](#project-styling-structure)
- [Advanced Patterns](#advanced-patterns)
- [Best Practices](#best-practices)

## What is Styled Components?

Styled Components is a CSS-in-JS library that allows you to write CSS code directly in your JavaScript files. It uses tagged template literals to style components.

### Benefits

1. **Scoped Styles**: Styles are scoped to components, preventing naming conflicts
2. **Dynamic Styling**: Easy to use props for dynamic styles
3. **Automatic Vendor Prefixing**: No need to worry about browser compatibility
4. **Dead Code Elimination**: Unused styles are removed automatically
5. **Easy Maintenance**: Styles live with components

### Comparison with Traditional CSS

#### Traditional CSS

```css
/* styles.css */
.container {
  padding: 5px;
  display: flex;
  flex-direction: column;
}

.input {
  width: 250px;
}
```

```jsx
// Component.js
import './styles.css';

const Component = () => (
  <div className="container">
    <input className="input" />
  </div>
);
```

**Problems**:
- Global namespace (class name conflicts)
- Unused styles are hard to identify
- No dynamic styling without additional complexity

#### Styled Components

```jsx
import styled from 'styled-components';

const Container = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 250px;
`;

const Component = () => (
  <Container>
    <Input />
  </Container>
);
```

**Benefits**:
- Scoped automatically
- Unused components are detected by linters
- Dynamic props support built-in

## Installation

The project already includes Styled Components. To add it to a new project:

```sh
yarn add styled-components

# or with npm
npm install styled-components
```

## Basic Usage

### Creating a Styled Component

```jsx
import styled from 'styled-components';

// Create a styled div
const Box = styled.div`
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 4px;
`;

// Use it like a regular component
const App = () => (
  <Box>
    <p>This is a styled box!</p>
  </Box>
);
```

### Styled Component Syntax

```jsx
const ComponentName = styled.htmlElement`
  css-property: value;
  another-property: value;
`;
```

- **styled**: The main function from styled-components
- **htmlElement**: Any HTML element (div, button, input, etc.)
- **Template literal**: CSS code goes inside backticks

### Examples

```jsx
// Styled button
const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

// Styled input
const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

// Styled list
const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;
```

## Project Styling Structure

### Style.css.js Overview

The project uses a centralized styling file: `app/src/Style.css.js`

```jsx
import styled from 'styled-components';

// Reusable style snippets
const Style = {
    PADDING: 'padding: 5px;',
    FLEX_ROW_CENTER: 'display: flex; justify-content: center;'
}

// Exported styled components
export const Container = styled.div`
    ${Style.PADDING}
    display: flex;
    flex-direction: column;
`;

export const ContentContainer = styled.div`
    ${Style.FLEX_ROW_CENTER}
`;

export const Input = styled.input`
    width: 250px;
`;

export const Title = styled.div`
    ${Style.FLEX_ROW_CENTER}
    ${Style.PADDING}
    font-size: 16px;
`;

export const AddButton = styled.button`
    width: 70px;
    height: 30px;
`;

export const TodoList = styled.ul`
    ${Style.PADDING}
`;

export const TodoItem = styled.li`
    padding: 5px;
    cursor: pointer;
`;
```

### Component Breakdown

#### Container

```jsx
export const Container = styled.div`
    ${Style.PADDING}
    display: flex;
    flex-direction: column;
`;
```

**Purpose**: Main app container
**Usage**: Wraps the entire app
**Styles**:
- Padding from reusable style
- Flexbox column layout

#### ContentContainer

```jsx
export const ContentContainer = styled.div`
    ${Style.FLEX_ROW_CENTER}
`;
```

**Purpose**: Centers content horizontally
**Usage**: Wraps Control and Content components
**Styles**:
- Flexbox row with center justification

#### Input

```jsx
export const Input = styled.input`
    width: 250px;
`;
```

**Purpose**: Styled input field
**Usage**: User input for new todo items
**Styles**:
- Fixed width of 250px

#### Title

```jsx
export const Title = styled.div`
    ${Style.FLEX_ROW_CENTER}
    ${Style.PADDING}
    font-size: 16px;
`;
```

**Purpose**: App title display
**Usage**: Shows "Todo List Sample"
**Styles**:
- Centered with flexbox
- Padding
- 16px font size

#### AddButton

```jsx
export const AddButton = styled.button`
    width: 70px;
    height: 30px;
`;
```

**Purpose**: Add button
**Usage**: Triggers adding new items
**Styles**:
- Fixed dimensions (70x30)

#### TodoList

```jsx
export const TodoList = styled.ul`
    ${Style.PADDING}
`;
```

**Purpose**: List container
**Usage**: Wraps all todo items
**Styles**:
- Padding from reusable style

#### TodoItem

```jsx
export const TodoItem = styled.li`
    padding: 5px;
    cursor: pointer;
`;
```

**Purpose**: Individual todo item
**Usage**: Each item in the list
**Styles**:
- 5px padding
- Pointer cursor (indicates clickable)

### Using Styled Components in Components

#### In App.js

```jsx
import { Container, Title } from './Style.css';

const App = () => {
    return (
        <Container>
            <Title>Todo List Sample</Title>
            {/* ... */}
        </Container>
    );
}
```

#### In Control.js

```jsx
import { Input, ContentContainer, AddButton } from '../Style.css';

const Control = ({ list, setList }) => {
    return (
        <ContentContainer>
            <Input value={value} onChange={...} />
            <AddButton onClick={...}>Add</AddButton>
        </ContentContainer>
    );
};
```

#### In Content.js

```jsx
import { ContentContainer, TodoList, TodoItem } from '../Style.css';

const Content = ({ list, setList }) => {
    return (
        <ContentContainer>
            <TodoList>
                {list.map((item) => (
                    <TodoItem key={item.id}>
                        {item.value}
                    </TodoItem>
                ))}
            </TodoList>
        </ContentContainer>
    );
};
```

## Advanced Patterns

### Reusable Style Snippets

Define common styles once and reuse them:

```jsx
const Style = {
    PADDING: 'padding: 5px;',
    FLEX_ROW_CENTER: 'display: flex; justify-content: center;',
    BORDER_RADIUS: 'border-radius: 4px;',
}

export const Box = styled.div`
    ${Style.PADDING}
    ${Style.BORDER_RADIUS}
    background: white;
`;

export const Card = styled.div`
    ${Style.PADDING}
    ${Style.BORDER_RADIUS}
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;
```

### Props-Based Styling

Style components dynamically based on props:

```jsx
const Button = styled.button`
    padding: 10px 20px;
    background-color: ${props => props.primary ? '#007bff' : '#6c757d'};
    color: white;
    border: none;
    border-radius: 4px;

    &:hover {
        opacity: 0.8;
    }
`;

// Usage
<Button primary>Primary Button</Button>
<Button>Secondary Button</Button>
```

### Extending Styles

Create variations of existing styled components:

```jsx
const Button = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

const PrimaryButton = styled(Button)`
    background-color: #007bff;
    color: white;
`;

const DangerButton = styled(Button)`
    background-color: #dc3545;
    color: white;
`;
```

### Pseudo-classes and Pseudo-elements

```jsx
const Item = styled.li`
    padding: 10px;
    background: white;

    /* Hover state */
    &:hover {
        background-color: #f0f0f0;
    }

    /* First child */
    &:first-child {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }

    /* Last child */
    &:last-child {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
    }

    /* Before pseudo-element */
    &::before {
        content: '• ';
        color: #007bff;
    }
`;
```

### Nesting Styles

Style child elements:

```jsx
const Card = styled.div`
    padding: 20px;
    background: white;
    border-radius: 4px;

    /* Style h2 inside Card */
    h2 {
        margin-top: 0;
        color: #333;
    }

    /* Style p inside Card */
    p {
        color: #666;
        line-height: 1.5;
    }
`;
```

### Theming

Create a theme for consistent styling:

```jsx
import { ThemeProvider } from 'styled-components';

const theme = {
    colors: {
        primary: '#007bff',
        secondary: '#6c757d',
        danger: '#dc3545',
        background: '#f8f9fa',
    },
    spacing: {
        small: '5px',
        medium: '10px',
        large: '20px',
    },
};

const Button = styled.button`
    background-color: ${props => props.theme.colors.primary};
    padding: ${props => props.theme.spacing.medium};
`;

// Usage
const App = () => (
    <ThemeProvider theme={theme}>
        <Button>Themed Button</Button>
    </ThemeProvider>
);
```

## Best Practices

### 1. Organize Styles by Component

```
// Option 1: Separate style file
src/
├── components/
│   ├── Button/
│   │   ├── Button.js
│   │   └── Button.styles.js
│   └── Input/
│       ├── Input.js
│       └── Input.styles.js

// Option 2: Centralized (current project approach)
src/
├── Style.css.js
└── components/
```

### 2. Use Meaningful Names

```jsx
// Good ✅
const AddButton = styled.button`...`;
const TodoList = styled.ul`...`;
const Container = styled.div`...`;

// Bad ❌
const Btn = styled.button`...`;
const List = styled.ul`...`;
const Div1 = styled.div`...`;
```

### 3. Keep Styles Close to Components

```jsx
// Good: Related styles together ✅
export const TodoList = styled.ul`
    padding: 5px;
`;

export const TodoItem = styled.li`
    padding: 5px;
    cursor: pointer;
`;

// Less ideal: Scattered ❌
export const TodoList = styled.ul`...`;
export const Input = styled.input`...`;
export const TodoItem = styled.li`...`;
```

### 4. Use Constants for Repeated Values

```jsx
const Style = {
    PADDING: 'padding: 5px;',
    PRIMARY_COLOR: '#007bff',
};

export const Button = styled.button`
    ${Style.PADDING}
    background-color: ${Style.PRIMARY_COLOR};
`;

export const Container = styled.div`
    ${Style.PADDING}
`;
```

### 5. Mobile Responsive Design

```jsx
const Container = styled.div`
    width: 100%;
    max-width: 1200px;
    padding: 20px;

    /* Tablet */
    @media (max-width: 768px) {
        padding: 10px;
    }

    /* Mobile */
    @media (max-width: 480px) {
        padding: 5px;
    }
`;
```

## Exercise: Improve the Styling

Try enhancing the project's styles:

### Exercise 1: Add Hover Effects

Add a hover effect to the todo items:

<details>
<summary>Click to see answer</summary>

```jsx
export const TodoItem = styled.li`
    padding: 5px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #f0f0f0;
    }
`;
```
</details>

### Exercise 2: Style the Add Button

Make the Add button more visually appealing:

<details>
<summary>Click to see answer</summary>

```jsx
export const AddButton = styled.button`
    width: 70px;
    height: 30px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;

    &:hover {
        background-color: #0056b3;
    }

    &:active {
        transform: translateY(1px);
    }
`;
```
</details>

### Exercise 3: Add a Delete Icon

Add a visual indicator for deletion:

<details>
<summary>Click to see answer</summary>

```jsx
export const TodoItem = styled.li`
    padding: 5px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
        background-color: #f0f0f0;
    }

    &::after {
        content: '×';
        font-size: 20px;
        color: #dc3545;
        opacity: 0;
        transition: opacity 0.2s;
    }

    &:hover::after {
        opacity: 1;
    }
`;
```
</details>

## Summary

In this chapter, we learned:

- ✅ What Styled Components is and its benefits
- ✅ How to create and use styled components
- ✅ The project's styling structure
- ✅ Advanced patterns like props-based styling and theming
- ✅ Best practices for organizing styles
- ✅ How to create responsive and interactive styles

## Next Steps

- Read [04-Testing.md](./04-Testing.md) to learn how to test styled components
- Try customizing the styles to match your preferences
- Experiment with themes and dynamic styling
