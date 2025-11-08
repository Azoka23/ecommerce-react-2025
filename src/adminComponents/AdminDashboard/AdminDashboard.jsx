// src/adminComponents/AdminDashboard/AdminDashboard.jsx
import React from 'react';
import './AdminDashboard.css'; 
export const AdminDashboard = () => {
    return (
        <main style={{ padding: '20px', minHeight: '60vh' }}>
            <h1>Panel de Administración 🔐</h1>
            <p>Bienvenido, Administrador. Aquí irán las herramientas de gestión (CRUD).</p>
        </main>
    );
};