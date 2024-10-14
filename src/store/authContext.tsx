import React, { createContext, useContext, useState } from 'react';

import { ReactNode } from 'react';

interface CurrentUserContextType {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
    getToken: () => string | null;
}

const AuthContext = createContext<CurrentUserContextType>({
    isAuthenticated: false,
    login: (token: string) => { },
    logout: () => { },
    getToken: () => null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    const login = (token: string) => {
        setIsAuthenticated(true);
        setToken(token);
    };


    const getToken = (): string | null => {
        if (!isAuthenticated) {
            if (localStorage.getItem('token')) {
                const tokenInLocalStorage = localStorage.getItem('token');
                setIsAuthenticated(true);
                setToken(tokenInLocalStorage);
                return tokenInLocalStorage;
            }
            return null;
        }
        return token;
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, getToken }}>
            {children}
        </AuthContext.Provider>
    );
};
