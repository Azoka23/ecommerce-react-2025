import React, { useState, useEffect } from 'react'; 
import './Checkout.css'; 
import { useCartContext } from '../../context/CartContext'; 
import { useAuth } from '../../context/AuthContext'; 
import { Link, useNavigate } from 'react-router-dom'; 

// Lógica de validación (AJUSTADA)
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
    // 🛑 SE ELIMINÓ la verificación de 'confirmEmail'
    
    return errors;
};

// Componente principal Checkout
export const Checkout = () => {
    
    const { cart, getTotalPrice, clearCart } = useCartContext(); 
    const { isAuthenticated, user, updateUserProfile } = useAuth(); 
    
    const navigate = useNavigate(); 

    // 🛑 ESTADO AJUSTADO: Quitamos 'confirmEmail'
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
    });

    const [errors, setErrors] = useState({});

    // 🚀 EFECTO CLAVE: Inicializa/Autocompleta el formulario
    useEffect(() => {
        if (isAuthenticated && user) {
            // Inicializa los campos con los datos del usuario guardados.
            setFormData(prev => ({
                ...prev,
                // 🛑 Autocompletamos con user.name y user.phone
                name: user.name || '',
                phone: user.phone || '',
                email: user.email || '',
                // Ya no necesitamos inicializar confirmEmail
            }));
        }
    }, [isAuthenticated, user]); 

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

        // NOTA: Si necesitas que el email se confirme, puedes hacer una doble validación simple
        // if (formData.email !== formData.confirmEmail) ...
        // Pero como lo eliminamos de la UX, no lo necesitamos.

        if (Object.keys(validationErrors).length === 0) {
            
            // 🛑 PASO CLAVE: Actualizar el perfil del usuario si está logueado
            if (isAuthenticated) {
                // Guardamos los datos de name, phone y email en el perfil
                updateUserProfile({
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                });
            }
            
            console.log('Generando orden con datos:', formData, 'y productos:', cart);
            
            // Simulación de ID de orden
            const orderId = 'ABC' + Date.now().toString().slice(-6); 
            
            // Finalización de la compra
            clearCart(); 
            navigate(`/order-confirmation/${orderId}`);
        }
    };

    if (!cart || cart.length === 0) { 
        return (
            <main className="checkout-page empty-cart">
                <h2>Carrito Vacío</h2>
                <p>No tienes productos para finalizar la compra.</p>
                <Link to="/" className="confirm-button">Volver a la tienda</Link>
            </main>
        );
    }
    
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

                    {/* 🛑 SE ELIMINÓ EL CAMPO CONFIRMAR EMAIL */}

                    <button type="submit" className="confirm-button">
                        ✔️ Confirmar y Generar Orden
                    </button>
                </form>
            </div>
        </main>
    );
};