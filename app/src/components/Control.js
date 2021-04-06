import React, { useState } from 'react';
import { Input, ContentContainer, AddButton } from '../Style.css';

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
            <Input value={value} onChange={(e) => { setValue(e?.target?.value)}} />
            <AddButton onClick={onAddItem}>Add</AddButton>
        </ContentContainer>
    );
};
export default Control;
