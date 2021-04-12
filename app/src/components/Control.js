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
