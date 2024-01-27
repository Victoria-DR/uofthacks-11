import React from 'react';
import {
    ChakraProvider,
    theme,
} from '@chakra-ui/react';
import { Route, Routes } from 'react-router';
import Main from './pages/Main';

function App() {
    return (
        <ChakraProvider theme={theme}>
            <Routes>
                <Route path="/" element={<Main />} />
            </Routes>
        </ChakraProvider>
    );
}

export default App;
