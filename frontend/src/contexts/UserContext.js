import { createContext, useState, useEffect, useContext } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(
        localStorage.getItem('userId') || null
    );

    useEffect(() => {
        localStorage.setItem('userId', userId);
    }, [userId]);

    return (
        <UserContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);