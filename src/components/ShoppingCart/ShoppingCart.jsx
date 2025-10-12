import React from 'react';
import './ShoppingCart.css'; 
import { Link } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext'; 
 
const ShoppingCart = () => {
  const { cart, clearCart, isCartVisible, toggleCartVisibility } = useCartContext();
  const totalPrice = cart.reduce((total, product) => total + product.price, 0);

  // 1. SI ESTÁ CERRADO (NO visible): Retornamos SOLO el botón flotante.
  //    La función toggleCartVisibility lo cambiará a TRUE al hacer clic.
  if (!isCartVisible) {
      return (
        <button onClick={toggleCartVisibility} className="cart-button">
          🛒
          {cart.length > 0 && (
            <span className="cart-badge">
              {cart.length}
            </span>
          )}
        </button>
      );
  }
  
  // 2. SI ESTÁ ABIERTO (Visible): Retornamos SOLO el panel completo.
  //    El botón 'X' o un nuevo clic en el flotante (ahora oculto) lo cambiará a FALSE.
  return (
    <aside className="shopping-cart">
      <button onClick={toggleCartVisibility} style={{ float: 'right', cursor: 'pointer', border: 'none', background: 'transparent' }}>
        X
      </button>
      <h2>Carrito de Compras</h2>
      <p>Cantidad de productos: {cart.length}</p>
      
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          <ul>
            {cart.map((product, index) => (
              <li key={index}>
                {/* Asumo que ya pasas la imagen en la prop 'image' */}
                {/* <img src={product.image} alt={product.name} className="cart-item-thumbnail" /> */}
                {product.name} - ${product.price}
              </li>
            ))}
          </ul>
          <h3>Total: ${totalPrice.toFixed(2)}</h3>

          <div className="cart-actions"> 
          <button onClick={clearCart}>✖️ Vaciar Carrito</button>

          <Link to="/checkout" className="checkout-link"> 
                  <button className="checkout-button"
                    onClick={toggleCartVisibility} 
                    >
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