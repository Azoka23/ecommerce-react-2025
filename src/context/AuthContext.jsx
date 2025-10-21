import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Crear el Contexto
export const AuthContext = createContext();

// 2. Hook personalizado para consumir el contexto
export const useAuth = () => {
    return useContext(AuthContext);
};

// Claves para localStorage
const TOKEN_KEY = 'authToken';
const USERS_KEY = 'registeredUsers';

// --- FUNCIONES AUXILIARES PARA MANEJO DE "BASE DE DATOS" (localStorage) ---

// Inicializa o obtiene los usuarios registrados. 
const getRegisteredUsers = () => {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : { 
        // Usuario por defecto (completo)
        'admin': { 
            password: '1234', 
            username: 'admin', 
            name: 'Administrador Demo', // Datos extra para simular autocompletado
            phone: '555-1234',
            email: 'admin@demo.com' 
        } 
    };
};

const saveRegisteredUsers = (users) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// 3. El Provider que manejará el estado de la sesión
export const AuthProvider = ({ children }) => {
    
    // Estado de autenticación
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // Estado para guardar la información COMPLETA del usuario
    const [user, setUser] = useState(null);

    // Efecto para revisar el localStorage al cargar la aplicación
    useEffect(() => {
        const storedToken = localStorage.getItem(TOKEN_KEY);
        // Intentamos cargar el usuario completo
        const storedUser = JSON.parse(localStorage.getItem('user')); 
        
        if (storedToken && storedUser) {
            setIsAuthenticated(true);
            setUser(storedUser); 
        } else {
             localStorage.removeItem(TOKEN_KEY);
             localStorage.removeItem('user');
        }
    }, []); 

    // 4. Función de LOGIN (Ajustada para cargar el objeto completo)
    const login = (username, password) => {
        const users = getRegisteredUsers();
        const userInDB = users[username];

        if (userInDB && userInDB.password === password) {
            const simulatedToken = 'fake-auth-token-' + new Date().getTime();
            
            // Guardar token y el OBJETO COMPLETO del usuario
            localStorage.setItem(TOKEN_KEY, simulatedToken);
            localStorage.setItem('user', JSON.stringify(userInDB)); // <-- Guardamos el objeto completo
            
            setIsAuthenticated(true);
            setUser(userInDB); // Establecer el objeto completo
            
            console.log('Login exitoso. Sesión iniciada para:', username);
            return true;
        } else {
            return false;
        }
    };
    
    // 5. Función de REGISTER (Ajustada para guardar el objeto completo)
    const register = (username, password, email) => {
        const users = getRegisteredUsers();
        if (users.hasOwnProperty(username)) {
            return false;
        }
        
        const newUser = { 
            password: password, 
            username: username,
            email: email,
            // 🛑 Estos campos se llenarán en el Checkout
            name: '', 
            phone: '',
            address: ''
        };

        users[username] = newUser;
        saveRegisteredUsers(users);

        return login(username, password);
    };

    // 🚀 NUEVA FUNCIÓN: Actualizar datos de perfil (usada en Checkout)
    const updateUserProfile = (data) => {
        const users = getRegisteredUsers();
        
        if (!user || !users[user.username]) {
             console.error("No hay usuario logueado para actualizar el perfil.");
             return false;
        }
        
        const updatedUser = { ...user, ...data };
        
        // 1. Actualiza la "DB" (localStorage de usuarios)
        users[user.username] = updatedUser;
        saveRegisteredUsers(users);

        // 2. Actualiza el estado global (Contexto)
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser)); // Actualiza el usuario logueado en LS
        
        return true;
    }

    // 6. Función de Logout
    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
        console.log('Sesión cerrada.');
    };

    const value = {
        isAuthenticated,
        user,
        login,
        logout,
        register,
        updateUserProfile, // 🛑 EXPORTAMOS LA NUEVA FUNCIÓN
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};