import React from 'react';
import './Checkout.css'; 
import { useCartContext } from '../../context/CartContext'; 
export const Checkout = () => {
    return (
        <main className="checkout-page">
            <div className="checkout-container">
                <h2>🛒 Finalizar Pedido</h2>
                <p>¡Ya casi terminamos! Aquí ingresarás tus datos de contacto y envío.</p>
                {/* Aquí iría el formulario (inputs para nombre, email, etc.)
                  y el botón final de "Pagar" o "Confirmar Orden".
                */}
            </div>
        </main>
    );
};