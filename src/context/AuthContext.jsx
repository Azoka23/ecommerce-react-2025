import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const TOKEN_KEY = 'adminAuthToken';
const USER_KEY = 'adminUser';

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem(TOKEN_KEY);
        const storedUser = JSON.parse(localStorage.getItem(USER_KEY));

        if (token && storedUser) {
            setIsAuthenticated(true);
            setUser(storedUser);
        } else {
            logout();
        }
    }, []);

    const login = (username, password) => {
        // ✅ Único usuario permitido:
        if (username === 'admin' && password === '1234') {
            const adminUser = { username: 'admin', role: 'administrador' };

            localStorage.setItem(TOKEN_KEY, 'admin-session-token');
            localStorage.setItem(USER_KEY, JSON.stringify(adminUser));

            setIsAuthenticated(true);
            setUser(adminUser);
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
