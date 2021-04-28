import React, { useState } from 'react';

const [list, setList] = useState([]);
const [value, setValue] = useState('');

const add = () => {
    const newArray = [...list, value];
    setList(newArray);
    setValue('');
}

const change = (e) => {
    setValue(e.target.value)
}

const renderList = list.map((item) => {
    return <div>{item}</div>;
});

return (
    <div>
        <input value={value} onChange={change}/>
        <button onClick={add}>Add</button>
        <div>
            {renderList}
        </div>
    </div>
);
