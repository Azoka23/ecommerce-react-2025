// src/components/Categorias/Categorias.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './Categorias.css';

export const Categorias = () => {
    
    // ✅ DEFINICIÓN DE CATEGORÍAS usando los valores exactos del JSON
    const categorias = [
        // 🛑 CLAVE: El 'id' (ruta) debe ser igual al 'type' del JSON
        { id: 'grano', nombre: 'Café en Grano' },
        { id: 'molido', nombre: 'Café Molido' },
        { id: 'capsulas', nombre: 'Cápsulas' },
        // Si añades más tipos a tu JSON (ej: 'instantaneo'), debes agregarlo aquí.
    ];

    return (
        <main className="categorias-section">
            <h2>Explora Nuestras Categorías</h2>
            <p>Selecciona una opción para filtrar los productos:</p>
            
            <div className="category-list"> 
                {categorias.map((cat) => (
                    // El Link genera la ruta: /categorias/grano
                    <Link 
                        key={cat.id} 
                        to={`/categorias/${cat.id}`} 
                        className="category-link-button"
                    >
                        {cat.nombre}
                    </Link>
                ))}
            </div>
            
        </main>
    );
};