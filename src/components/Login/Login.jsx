import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext'; 
// 🛑 Importamos 'Link' para el enlace de registro
import { useNavigate, Link } from 'react-router-dom'; 
import './Login.css'; 

export const Login = () => {
    
    // Optimización: Un solo estado para manejar ambos campos del formulario
    const [credentials, setCredentials] = useState({ 
        username: '', 
        password: '' 
    });
    const [error, setError] = useState('');
    
    const { login } = useAuth();
    const navigate = useNavigate();

    // Handler de cambio genérico para actualizar el estado
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

        const success = login(credentials.username, credentials.password);

        if (success) {
            // Login exitoso: Redirige a la página principal
            navigate('/');
        } else {
            // Login fallido: Muestra error y limpia solo la contraseña
            setError('Credenciales incorrectas. Intenta con "admin" y "1234".');
            setCredentials(prev => ({ 
                ...prev, 
                password: '' 
            }));
        }
    };

    return (
        <main className="login-page">
            <div className="login-container">
                
                {/* ✅ MEJORA UX: Mensaje amigable */}
                <h2>👋 Regístrate para iniciar tu compra</h2>
                <p>Usa **admin** y **1234** para ingresar.</p>
                
                <form onSubmit={handleSubmit} className="login-form">
                    
                    <div className="form-group">
                        <label htmlFor="username">Usuario:</label>
                        <input 
                            type="text" 
                            id="username" 
                            value={credentials.username} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Contraseña:</label>
                        <input 
                            type="password" 
                            id="password" 
                            value={credentials.password} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}
                    
                    <button type="submit" className="login-button">
                        Acceder
                    </button>

                    <div className="login-footer-links">
                        
                        {/* 🚀 NUEVO ENLACE: REGISTRARSE */}
                        <p>¿Sos nuevo? 
    <Link to="/register" className="register-link"> {/* 🛑 Cambiamos a /register */}
        Regístrate aquí
    </Link>
</p>

                        {/* Opción para seguir navegando */}
                        <button 
                            type="button" // CRÍTICO: Para evitar enviar el formulario
                            className="later-button" 
                            onClick={() => navigate('/')}
                        >
                            Ahora no, más tarde
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};