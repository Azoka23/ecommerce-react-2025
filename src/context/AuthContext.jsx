// src/context/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Crear el Contexto
export const AuthContext = createContext();

// 2. Hook personalizado para consumir el contexto
export const useAuth = () => {
    return useContext(AuthContext);
};

// Clave para localStorage
const TOKEN_KEY = 'authToken';

// 3. El Provider que manejará el estado de la sesión
export const AuthProvider = ({ children }) => {
    // Inicializamos el estado de autenticación
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // Estado para guardar la información del usuario (solo el nombre)
    const [user, setUser] = useState(null);

    // Efecto para revisar el localStorage al cargar la aplicación
    useEffect(() => {
        const storedToken = localStorage.getItem(TOKEN_KEY);
        if (storedToken) {
            // Si hay un token (simulado), asumimos que el usuario está logueado
            setIsAuthenticated(true);
            // Simulamos que el token tiene la información básica
            setUser({ username: 'UsuarioAdministrador' }); 
        }
    }, []); // El array vacío asegura que solo se ejecute al montar el componente

    // 4. Función de Login (Simulada)
    const login = (username, password) => {
        // 🛑 SIMULACIÓN DE CREDENCIALES: Esto se reemplazará por una llamada a API real
        if (username === 'admin' && password === '1234') {
            const simulatedToken = 'fake-auth-token-' + new Date().getTime();
            
            // Guardar token y actualizar estado
            localStorage.setItem(TOKEN_KEY, simulatedToken);
            setIsAuthenticated(true);
            setUser({ username: username }); // Establecer el nombre de usuario
            
            console.log('Login exitoso. Sesión iniciada para:', username);
            return true;
        } else {
            // Credenciales fallidas
            return false;
        }
    };

    // 5. Función de Logout
    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        setIsAuthenticated(false);
        setUser(null);
        console.log('Sesión cerrada.');
    };

    const value = {
        isAuthenticated,
        user,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};