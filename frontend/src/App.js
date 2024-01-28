import React from 'react';
import {
    ChakraProvider,
    theme,
} from '@chakra-ui/react';
import { Route, Routes } from 'react-router';
import Main from './pages/Main';
import { UserProvider } from './contexts/UserContext';

function App() {
    return (
        <ChakraProvider theme={theme}>
            <UserProvider>
                <Routes>
                    <Route path="/" element={<Main />} />
                </Routes>
            </UserProvider>
        </ChakraProvider>
    );
}

export default App;
