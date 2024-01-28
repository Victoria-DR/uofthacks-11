import { createContext, useState, useContext } from 'react';

const ActiveEchoContext = createContext(null)

export const ActiveEchoProvider = ({ children }) => {
    const [isActiveEchoOpen, setIsActiveEchoOpen] = useState(false)
    const [activeEcho, setActiveEcho] = useState(null)

    return (
        <ActiveEchoContext.Provider value={{ activeEcho, setActiveEcho, isActiveEchoOpen, setIsActiveEchoOpen }}>
            {children}
        </ActiveEchoContext.Provider>
    )
}

export const useActiveEcho = () => useContext(ActiveEchoContext)