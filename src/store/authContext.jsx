import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState('');

    const login = (token) => {
        return new Promise((resolve) => {
            setIsAuthenticated(true);
            setToken(token);
            resolve();
        });
    };


    const getToken = () => {
        console.log("isAuthenticated: " + isAuthenticated);
        if (!isAuthenticated) {
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
