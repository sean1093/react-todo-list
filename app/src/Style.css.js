import styled from 'styled-components';

const Style = {
    PADDING: 'padding: 5px;',
    FLEX_ROW_CENTER: 'display: flex; justify-content: center;'
}

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