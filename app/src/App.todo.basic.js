import React, { useState } from 'react';

const TodoList = ({ list }) => (
    <div>
    {
        list.map((item) => {
            return <div>{item}</div>;
        })
    }
    </div>
);

const Control = ({ onAdd }) => {
    const [value, setValue] = useState('');

    const onChange = (e) => {
        setValue(e.target.value);
    }
    const addItem = (e) => {
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
