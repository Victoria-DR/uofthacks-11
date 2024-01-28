import React from 'react';
import {
    ChakraProvider,
    theme,
} from '@chakra-ui/react';
import { useAuth0 } from "@auth0/auth0-react";
import { Route, Routes } from 'react-router';
import Main from './pages/Main';
import Landing from './pages/Landing';

function App() {
    const { isAuthenticated } = useAuth0();

    return (
        <ChakraProvider theme={theme}>
            <Routes>
                <Route path="/" element={<Landing />} />
                { isAuthenticated && <Route path="/graph" element={<Main />} />}
                <Route path="*" element={<Landing />} />
            </Routes>
        </ChakraProvider>
    );
}

export default App;
