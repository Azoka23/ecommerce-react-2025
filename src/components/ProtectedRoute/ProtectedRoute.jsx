// src/components/ProtectedRoute/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Consumimos el estado de autenticación

// Este componente recibe la página que queremos proteger como prop 'element'
export const ProtectedRoute = ({ element }) => {
    // Obtenemos el estado de autenticación del contexto
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        // Si NO está autenticado, lo redirigimos a la página de login.
        // El 'replace' asegura que no pueda volver atrás con el botón del navegador.
        return <Navigate to="/login" replace />; 
    }

    // Si SÍ está autenticado, renderizamos el componente solicitado (ej: ShoppingCart)
    return element;
};