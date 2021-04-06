import React from 'react';
import { ContentContainer, TodoList, TodoItem } from '../Style.css';
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
