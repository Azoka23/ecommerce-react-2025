import React, { useState } from 'react';
import './Checkout.css';
import { useCartContext } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

console.log("✅ Checkout.jsx cargado correctamente");

const validateForm = (data) => {
  const errors = {};

  if (!data.name.trim()) errors.name = 'El nombre es obligatorio.';
  if (!data.phone.trim() || data.phone.trim().length < 8) errors.phone = 'El teléfono es obligatorio y debe ser válido.';
  if (!data.email.trim()) {
    errors.email = 'El email es obligatorio.';
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = 'El formato de email no es válido.';
  }

  return errors;
};

export const Checkout = () => {
  console.log("✅ Componente Checkout montado");

  const { cart, getTotalPrice, clearCart } = useCartContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("🟡 Submit presionado. FormData:", formData);

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    console.log("🔎 Errores encontrados:", validationErrors);

    if (Object.keys(validationErrors).length === 0) {

      console.log("🛒 Productos del carrito:", cart);

      const orderId = 'ABC' + Date.now().toString().slice(-6);
      console.log("🎯 Orden generada con ID:", orderId);

      clearCart();
      console.log("🧹 Carrito limpiado, navegando a Order Confirmation...");

      navigate(`/order-confirmation/${orderId}`);
    }
  };

  console.log("🛒 Cart actual:", cart);

  if (!cart || cart.length === 0) {
    console.warn("⚠️ Carrito vacío");
    return (
      <main className="checkout-page empty-cart">
        <h2>Carrito Vacío</h2>
        <p>No tienes productos para finalizar la compra.</p>
        <Link to="/" className="confirm-button">Volver a la tienda</Link>
      </main>
    );
  }

  const totalPrice = getTotalPrice();
  console.log("💰 Total calculado:", totalPrice);

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        <h2>🛒 Finalizar Pedido</h2>
        <p>Completa tus datos para confirmar la orden.</p>

        <div className="order-summary">
          <h3>Resumen de la Compra</h3>
          {cart.map(item => (
            <p key={item.id} className="summary-item">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </p>
          ))}
          <div className="order-total">
            Total a Pagar: **${totalPrice ? totalPrice.toFixed(2) : '0.00'}**
          </div>
        </div>

        <form onSubmit={handleSubmit} className="buyer-form">
          <div className="form-group">
            <label>Nombre Completo:</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label>Teléfono:</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} />
            {errors.phone && <p className="error-message">{errors.phone}</p>}
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <button type="submit" className="confirm-button">✔️ Confirmar y Generar Orden</button>
        </form>
      </div>
    </main>
  );
};
