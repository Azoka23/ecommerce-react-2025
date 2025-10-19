import React from 'react';
import './ShoppingCart.css'; 
import { Link } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext'; 
 
const ShoppingCart = () => {
  
  const { 
    cart, 
    clearCart, 
    getTotalItems,
    getTotalPrice, 
    removeItem,
    updateItemQuantity
  } = useCartContext();

  
  
  // 🛑 LLAMAMOS A LA FUNCIÓN DEL CONTEXTO
  const totalPrice = getTotalPrice(); 

  // el panel es una vista
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
                    {/* Reutilizamos la lógica de precio por ítem, o la simplificamos con toFixed(2) */}
                    ({product.quantity} uds.) - ${ (product.price * product.quantity).toFixed(2) }
                  </span>
                </div>
                
                <div className="item-controls">
                  {/* Botón para DECREMENTAR */}
                  <button 
                    onClick={() => updateItemQuantity(product.id, product.quantity - 1)}
                    disabled={product.quantity <= 1} 
                    className="qty-button"
                  >
                    -
                  </button>
                  
                  {/* Botón para INCREMENTAR */}
                  <button 
                    onClick={() => updateItemQuantity(product.id, product.quantity + 1)}
                    disabled={product.quantity >= product.stock}
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
          
          {/* 🛑 Usamos el valor calculado por la función del Contexto */}
          <h3>Total a Pagar: ${totalPrice.toFixed(2)}</h3>

          <div className="cart-actions"> 
            <button onClick={clearCart} className="clear-button">✖️ Vaciar Carrito</button>

            <Link to="/checkout" className="checkout-link"> 
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