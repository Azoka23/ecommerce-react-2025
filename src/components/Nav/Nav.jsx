import { Link } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext';
import './Nav.css';
export const Nav = () => {
 const { getTotalItems } = useCartContext(); 
    return (
        <nav>
            <ul>
                
                <li>
                    <Link to="/Categorias">Categorias</Link>
                </li>
                <li>
                    <Link to="/Contacto">Contactanos</Link>
                </li>
                
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