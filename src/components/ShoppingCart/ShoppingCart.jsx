import React from 'react';
import './ShoppingCart.css'; 
import { Link } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext'; 
 
const ShoppingCart = () => {
  
  const { 
    cart, 
    clearCart, 
    getTotalItems,
    removeItem,
    updateItemQuantity // Función para modificar cantidad
  } = useCartContext();

  //  PRECIO TOTAL (Precio * Cantidad)
  const totalPrice = cart.reduce((total, product) => total + (product.price * product.quantity), 0);

  

  // --- EL PANEL COMPLETO (AHORA ES UNA VISTA) ---
  return (
    <aside className="shopping-cart view-mode"> 
      
      
      
      <h2>Carrito de Compras</h2>
      
      <p>Total de Unidades: {getTotalItems()}</p> 
      
      {cart.length === 0 ? (
        <p>El carrito está vacío. ¡Agrega tus productos favoritos!</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((product) => (
              <li key={product.id} className="cart-item"> 
                
                <div className="item-info">
                  {product.name} 
                  <span className="item-details">
                    ({product.quantity} uds.) - ${product.price * product.quantity}
                  </span>
                </div>
                
                <div className="item-controls">
                  {/* Botón para DECREMENTAR */}
                  <button 
                    onClick={() => updateItemQuantity(product.id, product.quantity - 1)}
                    disabled={product.quantity <= 1} // Deshabilita si ya es 1
                    className="qty-button"
                  >
                    -
                  </button>
                  
                  {/* Botón para INCREMENTAR */}
                  <button 
                    onClick={() => updateItemQuantity(product.id, product.quantity + 1)}
                    disabled={product.quantity >= product.stock} // Deshabilita si llega al stock
                    className="qty-button"
                  >
                    +
                  </button>
                  
                  {/* Botón para ELIMINAR COMPLETAMENTE */}
                  <button onClick={() => removeItem(product.id)} className="remove-button">
                    ❌
                  </button>
                </div>
              </li>
            ))}
          </ul>
          
          <h3>Total a Pagar: ${totalPrice.toFixed(2)}</h3>

          <div className="cart-actions"> 
            <button onClick={clearCart} className="clear-button">✖️ Vaciar Carrito</button>

            <Link to="/checkout" className="checkout-link"> 
              {/* ELIMINAMOS EL ONCLICK QUE CERRABA EL PANEL */}
              <button className="checkout-button">
                🛒 Finalizar Compra
              </button>
            </Link>
          </div>
        </>
      )}
    </aside>
  );
};

export default ShoppingCart;