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
