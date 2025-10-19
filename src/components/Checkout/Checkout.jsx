import React, { useState, } from 'react';
import './Checkout.css'; 
import { useCartContext } from '../../context/CartContext'; 
import { Link, useNavigate } from 'react-router-dom'; 

// Lógica de validación
const validateForm = (data) => {
    const errors = {};

    if (!data.name.trim()) {
        errors.name = 'El nombre es obligatorio.';
    }
    if (!data.phone.trim() || data.phone.trim().length < 8) {
        errors.phone = 'El teléfono es obligatorio y debe ser válido.';
    }
    if (!data.email.trim()) {
        errors.email = 'El email es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = 'El formato de email no es válido.';
    }
    if (data.email !== data.confirmEmail) {
        errors.confirmEmail = 'Los emails no coinciden.';
    }

    return errors;
};

// Componente principal Checkout
export const Checkout = () => {
    // 🛑 Consumimos las funciones y variables necesarias del Contexto
    const { cart, getTotalPrice, clearCart } = useCartContext(); 
    const navigate = useNavigate(); 

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        confirmEmail: '',
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        const validationErrors = validateForm(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            
            console.log('Generando orden con datos:', formData, 'y productos:', cart);
            
            // Simulación de ID de orden
            const orderId = 'ABC' + Date.now().toString().slice(-6); 
            
            // Finalización de la compra
            clearCart(); 
            navigate(`/order-confirmation/${orderId}`);
        }
    };

    // Usamos el carro directamente. Si falla aquí, revisa el CartContext.js
    if (!cart || cart.length === 0) { 
        return (
            <main className="checkout-page empty-cart">
                <h2>Carrito Vacío</h2>
                <p>No tienes productos para finalizar la compra.</p>
                <Link to="/" className="confirm-button">Volver a la tienda</Link>
            </main>
        );
    }
    
    // Llamamos a la función recién asegurada del Contexto
    const totalPrice = getTotalPrice(); 

    return (
        <main className="checkout-page">
            <div className="checkout-container">
                <h2>🛒 Finalizar Pedido</h2>
                <p>Completa tus datos para confirmar la orden.</p>

                {/* Resumen del Carrito */}
                <div className="order-summary">
                    <h3>Resumen de la Compra</h3>
                    {cart.map(item => {
                        const itemPrice = item.price || 0;
                        const itemQuantity = item.quantity || 0;
                        const subtotal = itemPrice * itemQuantity;

                        return (
                            <p key={item.id} className="summary-item">
                                <span>{item.name} x {itemQuantity}</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </p>
                        );
                    })}
                    <div className="order-total">
                        Total a Pagar: **${totalPrice ? totalPrice.toFixed(2) : '0.00'}**
                    </div>
                </div>

                {/* Formulario de Datos del Comprador */}
                <form onSubmit={handleSubmit} className="buyer-form">
                    
                    {/* Campo Nombre */}
                    <div className="form-group">
                        <label htmlFor="name">Nombre Completo:</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleInputChange} 
                        />
                         {errors.name && <p className="error-message">{errors.name}</p>}
                    </div>

                    {/* Campo Teléfono */}
                    <div className="form-group">
                        <label htmlFor="phone">Teléfono:</label>
                        <input 
                            type="tel" 
                            id="phone" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleInputChange} 
                        />
                         {errors.phone && <p className="error-message">{errors.phone}</p>}
                    </div>

                    {/* Campo Email */}
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleInputChange} 
                        />
                         {errors.email && <p className="error-message">{errors.email}</p>}
                    </div>

                    {/* Campo Confirmar Email */}
                    <div className="form-group">
                        <label htmlFor="confirmEmail">Confirmar Email:</label>
                        <input 
                            type="email" 
                            id="confirmEmail" 
                            name="confirmEmail" 
                            value={formData.confirmEmail} 
                            onChange={handleInputChange} 
                        />
                         {errors.confirmEmail && <p className="error-message">{errors.confirmEmail}</p>}
                    </div>

                    <button type="submit" className="confirm-button">
                        ✔️ Confirmar y Generar Orden
                    </button>
                </form>
            </div>
        </main>
    );
};