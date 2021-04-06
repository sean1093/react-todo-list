import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px;
`;

export const ContentContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export const Input = styled.input`
    width: 40vw;
`;

export const AddButton = styled.button`
    width: 70px;
    height: 30px;
`;

export const TodoList = styled.ul`
    margin: 5px;
`;

export const TodoItem = styled.li`
    padding: 5px;
    cursor: pointer;
`;