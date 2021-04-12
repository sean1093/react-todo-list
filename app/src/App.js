import React, { useState } from 'react';
import Control from './components/Control';
import Content from './components/Content';
import { Container, Title } from './Style.css';
import { TEST_ID } from './config/testId';

const App = () => {
    const [list, setList] = useState([]);
    return (
        <Container>
            <Title data-testid={TEST_ID.APP_TITLE}>Todo List Sample</Title>
            <Control
                list={list}
                setList={setList}
            />
            <Content
                list={list}
                setList={setList}
            />
        </Container>
    );
}

export default App;
