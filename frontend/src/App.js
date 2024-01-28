import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { Route, Routes } from 'react-router';
import Navbar from './components/Navbar';
import { createContext, useContext, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Main from './pages/Main';
import { UserProvider } from './contexts/UserContext';
import AddFriends from './pages/AddFriends';
import AddEcho from './pages/AddEcho';
import Landing from './pages/Landing';
import './assets/styles/index.css'

export const EchoContext = createContext();

function App() {
    const [friendsEmails, setFriendsEmails] = useState(null);
    const { isAuthenticated } = useAuth0();
  
    return (
        <EchoContext.Provider value={{ friendsEmails, setFriendsEmails }}>
            <UserProvider>
                <ChakraProvider theme={theme}>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        { isAuthenticated && <Route path="/graph" element={<Main />} />}
                        <Route path='/add-friends' element={<AddFriends />} />
                        <Route path='/add-echo' element={<AddEcho />} />
                        <Route path="*" element={<Landing />} />
                    </Routes>
                </ChakraProvider>
            </UserProvider>
        </EchoContext.Provider>
    );
}

export default App;
