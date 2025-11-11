// src/adminComponents/AdminDashboard/AdminDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

export const AdminDashboard = () => {
  return (
    <main style={{ padding: '20px', minHeight: '60vh' }}>
      <div className="dashboard-card">
        <h1>Panel de Administración 🔐</h1>
        <p>Bienvenido, Administrador. Aquí irán las herramientas de gestión (CRUD).</p>

        <div style={{ marginTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link to="productos/crear" className="admin-action-btn">
            ➕ Crear Producto
          </Link>

          <Link to="productos/lista" className="admin-action-btn admin-action-secondary">
  🧾 Gestionar Productos
</Link>

        </div>
      </div>
    </main>
  );
};
