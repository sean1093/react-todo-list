import React, { useState } from 'react';
import Control from './components/Control';
import Content from './components/Content';
import { Container } from './Style.css';

const App = () => {
    const [list, setList] = useState([]);
    return (
        <Container>
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
