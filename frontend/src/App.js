import React from 'react';
import {
    ChakraProvider,
    theme,
} from '@chakra-ui/react';
import { Route, Routes } from 'react-router';
import Main from './pages/Main';
import Landing from './pages/Landing';

function App() {
    return (
        <ChakraProvider theme={theme}>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/graph" element={<Main />} />
            </Routes>
        </ChakraProvider>
    );
}

export default App;
