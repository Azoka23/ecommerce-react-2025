// src/components/ItemDetail/ItemDetail.jsx

// src/components/ItemDetail/ItemDetail.jsx (CORREGIDO)

import React from 'react';
import './ItemDetail.css'; 
import { useCartContext } from '../../context/CartContext';  
//  Recibe todas las props, incluyendo 'addToCart'
export const ItemDetail = ({ id, name, type, price, description, stock, image }) => {
    const { addToCart } = useCartContext(); 
    const isOutOfStock = stock === 0;

    //  Definir la función handleAddToCart
    const handleAddToCart = () => {
        // Crear el objeto exactamente como lo espera useCart.js
        const productToAdd = { id, name, price, stock, image };
        addToCart(productToAdd);
    };

    return (
        
        <div className="item-detail">
            <div className="detail-image-container">
                
                <img 
                    src={`/images/${image}`} 
                    alt={name} 
                    className="detail-image"
                />
            </div>
            
            <div className="detail-info">
                <h1>{name}</h1>
                <p className="detail-price">Precio: **${price}**</p>
                <p className="detail-description">{description}</p>
                <p className="detail-type">Tipo: {type}</p>
                <p className="detail-stock" style={{ color: isOutOfStock ? 'red' : 'green' }}>
                    Stock: {isOutOfStock ? 'Agotado' : stock}
                </p>
                
                
                <button 
                    className="detail-add-button"
                    disabled={isOutOfStock}
                    //  Llamar a la función recién definida
                    onClick={handleAddToCart} 
                >
                    {isOutOfStock ? 'SIN STOCK' : 'Agregar al Carrito'}
                </button>
            </div>
        </div>
    );
};