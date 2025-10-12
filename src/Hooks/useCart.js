// src/Hooks/useCart.js

import { useState } from 'react';

export function useCart() {
  const [cart, setCart] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  // La función recibe el producto completo (incluyendo el stock)
  const addToCart = (productToAdd) => {
    
    // 1. Contar cuántas veces el producto ya está en el carrito
    const currentCount = cart.filter(item => item.id === productToAdd.id).length;
    
    // 2. Determinar la nueva cantidad si se agrega uno más
    const newCount = currentCount + 1;

    
    if (newCount > productToAdd.stock) {
      alert(`Stock insuficiente. Ya tienes ${currentCount} unidad(es) en el carrito y solo hay ${productToAdd.stock} disponibles.`);
      return; // Detener la adición
    }

    // 4. Si pasa la validación, agregar el producto (mantiene tu lógica original)
    setCart((prevCart) => [...prevCart, productToAdd]);
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  // Retornamos todas las variables y funciones
  return {
    cart,
    addToCart,
    clearCart,
    isCartVisible,
    toggleCartVisibility,
  };
}