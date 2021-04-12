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
