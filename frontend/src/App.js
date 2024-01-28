import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { Route, Routes } from 'react-router';
import Main from './pages/Main';
import Navbar from './components/Navbar';
import { createContext, useContext, useState } from 'react';
import AddFriends from './pages/AddFriends';
import AddEcho from './pages/AddEcho';

export const EchoContext = createContext();
function App() {
    const [friendsEmails, setFriendsEmails] = useState(null);
    return (
        <EchoContext.Provider value={{ friendsEmails, setFriendsEmails }}>
            <ChakraProvider theme={theme}>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path='/add-friends' element={<AddFriends />} />
                    <Route path='/add-echo' element={<AddEcho />} />
                </Routes>
            </ChakraProvider>
        </EchoContext.Provider>
    );
}

export default App;
