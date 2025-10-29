// src/components/Nav/Nav.jsx

import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { useCartContext } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext'; 
import './Nav.css';

export const Nav = () => {
    // 1. ESTADO PARA CONTROLAR LA VISIBILIDAD DEL MENÚ
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const { user, logout } = useAuth();
    const { getTotalItems } = useCartContext(); 
    const navigate = useNavigate();
    
    // Definición de Categorías
    const categorias = [
        { id: 'grano', nombre: 'Café en Grano' },
        { id: 'molido', nombre: 'Café Molido' },
        { id: 'capsulas', nombre: 'Cápsulas' },
    ];
    
    // Función para alternar el estado (abrir/cerrar) al hacer clic en "Categorías"
    const toggleDropdown = (e) => {
        e.preventDefault(); // Previene que el link principal navegue
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Función para cerrar el menú después de hacer clic en un enlace de categoría
    const handleCategoryClick = () => {
        setIsDropdownOpen(false);
    };
    
    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        logout(); 
        navigate('/'); 
    };   

    return (
        <nav>
            <ul>
                
                

                {/* 🛑 INICIO DEL SUBMENÚ/DROPDOWN DE CATEGORÍAS */}
                {/* CLAVE: Usamos la clase 'show-dropdown' solo si isDropdownOpen es true */}
                <li 
                    className={`nav-dropdown ${isDropdownOpen ? 'show-dropdown' : ''}`}
                > 
                    
                    {/* Enlace principal. Al hacer clic, alterna el estado */}
                    <Link to="#" onClick={toggleDropdown}> 
                        Categorías
                    </Link>
                    
                    {/* El contenedor del submenú oculto */}
                    <ul className="dropdown-content">
                        
                        {/* Enlace para ver TODOS los productos */}
                        <li key="todos">
                            <Link to="/" onClick={handleCategoryClick}> {/* Cierra al seleccionar */}
                                Ver Todo
                            </Link>
                        </li>
                        
                        {/* Mapeo de los enlaces de filtro */}
                        {categorias.map((cat) => (
                            <li key={cat.id}>
                                <Link 
                                    to={`/categoria/${cat.id}`}
                                    onClick={handleCategoryClick} // Cierra al seleccionar
                                >
                                    {cat.nombre}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </li>
                {/* 🛑 FIN DEL SUBMENÚ/DROPDOWN */}
                
                <li>
                    <Link to="/Contacto">Contactanos</Link>
                </li>
                
                {/* 🛑 BOTÓN DE SESIÓN (Login/Logout) */}
                <li>
                    {user ? (
                        // Si el usuario existe (está logueado)
                        <button 
                            className="nav-link" 
                            onClick={handleLogout}
                        >
                            Cerrar Sesión ({user.username}) 
                        </button>
                    ) : (
                        // Si no está logueado
                        <Link to="/login" className="nav-link">
                            Iniciar Sesión
                        </Link>
                    )}
                </li>

                {/* 🛑 ENLACE AL CARRITO (CartWidget) */}
                <li> 
                    <Link to="/carrito" className="nav-cart-icon-link"> 
                        
                        <img 
                            src="/images/carrito.png" 
                            alt="Carrito de Compras" 
                            className="cart-nav-image-icon" 
                        />
                        <span className="cart-item-count-badge">
                            ({getTotalItems()}) 
                        </span>
                    </Link>
                </li>
                
            </ul>
        </nav>

    );
};