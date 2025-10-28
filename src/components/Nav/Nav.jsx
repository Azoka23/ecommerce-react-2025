// src/components/Nav/Nav.jsx

// 🛑 FUSIONAMOS: Link y useNavigate en una SOLA importación
import { Link, useNavigate } from 'react-router-dom'; 
import { useCartContext } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext'; // Ya estaba
import './Nav.css';

export const Nav = () => {
    const { user, logout } = useAuth();
    const { getTotalItems } = useCartContext(); 
    const navigate = useNavigate();
    
    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        logout(); // Llama a la función de tu contexto
        navigate('/'); 
    };   
    
    return (
        <nav>
            <ul>
                
                <li>
                    <Link to="/Categorias">Categorias</Link>
                </li>
                <li>
                    <Link to="/Contacto">Contactanos</Link>
                </li>
                
                {/* 🛑 AÑADIMOS EL BOTÓN DE SESIÓN */}
                <li>
                    {user ? (
                        // Si el usuario existe (está logueado), mostramos Cerrar Sesión
                        <button 
                            className="nav-link" 
                            onClick={handleLogout}
                        >
                            Cerrar Sesión ({user.username}) 
                        </button>
                    ) : (
                        // Si no está logueado, mostramos Iniciar Sesión
                        <Link to="/login" className="nav-link">
                            Iniciar Sesión
                        </Link>
                    )}
                </li>

                {/* 🛑 ENLACE AL CARRITO (Asegúrate que el <li> de carrito esté afuera del <li> de Login) */}
                <li> 
                    <Link to="/carrito" className="nav-cart-icon-link"> 
                        
                        <img 
                            src="/images/carrito.png" 
                            alt="Carrito de Compras" 
                            className="cart-nav-image-icon" 
                        />
                        {/* El span que deja preparado para el contador */}
                        <span className="cart-item-count-badge">
                            ({getTotalItems()}) 
                        </span>
                    </Link>
                </li>
                
            </ul>
        </nav>

    );
};