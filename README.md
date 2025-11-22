# React Todo List Tutorial

A simple React Todo List application designed for learning React fundamentals. This project is built with Create React App and includes comprehensive testing examples and component-based architecture demonstrations.

## Features

- React Hooks (useState)
- Component-based Architecture
- Styled Components for styling
- Complete test coverage (Jest + Enzyme + React Testing Library)
- Progressive learning examples

## Getting Started

### Prerequisites

- Node.js >= 14
- Yarn or npm

### Installation

```sh
cd app
yarn install
```

### Run Development Server

```sh
cd app
yarn start
```

Open your browser and visit [http://localhost:3000](http://localhost:3000)

### Run Tests

```sh
cd app
yarn test
```

### Build for Production

```sh
cd app
yarn build
```

## Project Structure

```
react-todo-list/
├── app/                      # Main application directory
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Control.js   # Input control component
│   │   │   └── Content.js   # Todo list content component
│   │   ├── config/          # Configuration files
│   │   ├── __test__/        # Test files
│   │   ├── App.js           # Main application component
│   │   ├── App.todo.basic.js  # Basic example (no component split)
│   │   ├── Style.css.js     # Styled Components styles
│   │   └── index.js         # Application entry point
│   └── package.json
├── docs/                     # Tutorial documentation
└── README.md                # This file
```

## Learning Path

This project provides two versions of code for learning:

1. **Basic Version** (`App.todo.basic.js`): All logic in a single file, suitable for beginners to understand basic concepts
2. **Advanced Version** (`App.js` + components): Code split into multiple components, demonstrating React best practices

### Recommended Learning Order

1. Read [docs/01-Fundamentals.md](docs/01-Fundamentals.md) to understand React basics
2. Study `App.todo.basic.js` to understand the complete flow
3. Read [docs/02-Component-Design.md](docs/02-Component-Design.md) to learn component splitting
4. Study the refactored `App.js` and components directory
5. Read [docs/03-Styling.md](docs/03-Styling.md) to learn Styled Components
6. Read [docs/04-Testing.md](docs/04-Testing.md) to learn how to write tests

## Functionality

- Add todo items
- Click on todo items to remove them
- Use timestamp as unique ID

## Tech Stack

- React 16.14.0
- Styled Components 5.2.3
- Jest + Enzyme + React Testing Library
- Create React App 4.0.3

## Documentation

Complete tutorial documentation can be found in the [docs](docs) directory:

- [01-Fundamentals.md](docs/01-Fundamentals.md) - React basics and Hooks introduction
- [02-Component-Design.md](docs/02-Component-Design.md) - Component splitting and best practices
- [03-Styling.md](docs/03-Styling.md) - Styled Components usage guide
- [04-Testing.md](docs/04-Testing.md) - Writing and running tests
- [05-FAQ.md](docs/05-FAQ.md) - Frequently Asked Questions and troubleshooting

## License

MIT License - See [LICENSE](LICENSE) file for details

## Contributing

Issues and Pull Requests are welcome!

## Author

Sean Chou
