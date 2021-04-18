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
