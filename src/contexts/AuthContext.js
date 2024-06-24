import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('token') || null);
    const [username, setUsername] = useState(() => localStorage.getItem('username') || null); // Initialize from localStorage

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            const decodedToken = decodeToken(storedToken);
            setUsername(decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
        }
    }, []);

    const login = (token) => {
        setToken(token);
        const decodedToken = decodeToken(token);
        const name = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
        setUsername(name);
        localStorage.setItem('token', token);
        localStorage.setItem('username', name);
    };

    const logout = () => {
        setToken(null);
        setUsername(null);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    };

    const decodeToken = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    };

    return (
        <AuthContext.Provider value={{ token, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
