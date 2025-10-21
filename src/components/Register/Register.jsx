// src/components/Register/Register.jsx
import React, { useState } from 'react';
// 🛑 Asegúrate de que useAuth incluya updateUserProfile
import { useAuth } from '../../context/AuthContext'; 
import { useNavigate, Link } from 'react-router-dom';
import './Register.css'; 

export const Register = () => {
    
    const [credentials, setCredentials] = useState({ 
        username: '', 
        password: '',
        confirmPassword: '', 
        email: '',
        // Campos que deben coincidir con las propiedades del objeto 'user'
        name: '',
        phone: '', 
    });
    const [error, setError] = useState('');
    
    // 🛑 IMPORTAMOS updateUserProfile
    const { register, updateUserProfile } = useAuth(); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setCredentials(prev => ({ 
            ...prev, 
            [id]: value 
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (credentials.password !== credentials.confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        // 1. Intenta Registrar y Loguear (pasa solo credenciales básicas)
        const success = register(credentials.username, credentials.password, credentials.email);

        if (success) {
            // 2. 🛑 LÓGICA CLAVE: Guarda los datos de contacto adicionales
            // El usuario ya está logueado gracias a la función 'register'.
            // Ahora actualizamos su perfil con los datos que acaba de ingresar.
            
            const { name, phone, email } = credentials;
            
            updateUserProfile({ 
                name, 
                phone, 
                email // Reconfirma el email también, aunque ya lo pasó el register
            }); 
            
            navigate('/');
            alert('¡Registro exitoso! Ya has iniciado sesión. Tus datos de contacto han sido guardados.');
        } else {
            // Registro fallido (ej. usuario ya existe)
            setError('Error al registrar usuario. Intenta con otro nombre de usuario.');
        }
    };

    return (
        <main className="register-page">
            <div className="register-container">
                
                <h2>📝 Crear Cuenta</h2>
                
                <form onSubmit={handleSubmit} className="register-form">
                    
                    {/* CAMPO NOMBRE COMPLETO (id="name") */}
                    <div className="form-group">
                        <label htmlFor="name">Nombre Completo:</label>
                        <input type="text" id="name" value={credentials.name} onChange={handleChange} required />
                    </div>
                    
                    {/* CAMPO TELÉFONO (id="phone") */}
                    <div className="form-group">
                        <label htmlFor="phone">Teléfono:</label>
                        <input type="tel" id="phone" value={credentials.phone} onChange={handleChange} required />
                    </div>
                    
                    {/* CAMPO USUARIO */}
                    <div className="form-group">
                        <label htmlFor="username">Usuario:</label>
                        <input type="text" id="username" value={credentials.username} onChange={handleChange} required />
                    </div>
                    
                    {/* CAMPO EMAIL */}
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" value={credentials.email} onChange={handleChange} required />
                    </div>
                    
                    {/* CAMPO CONTRASEÑA */}
                    <div className="form-group">
                        <label htmlFor="password">Contraseña:</label>
                        <input type="password" id="password" value={credentials.password} onChange={handleChange} required />
                    </div>
                    
                    {/* CAMPO CONFIRMAR CONTRASEÑA */}
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
                        <input type="password" id="confirmPassword" value={credentials.confirmPassword} onChange={handleChange} required />
                    </div>

                    {error && <p className="error-message">{error}</p>}
                    
                    <button type="submit" className="register-button">
                        Registrarme
                    </button>

                    <div className="register-footer-links">
                        <p>¿Ya tienes cuenta? 
                            <Link to="/login" className="login-link">
                                Inicia Sesión
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </main>
    );
};