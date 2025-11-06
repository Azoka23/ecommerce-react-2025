// src/components/Login/Login.jsx - Versión Estable
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext'; 
import { useNavigate, Link } from 'react-router-dom'; 
import './Login.css'; 

export const Login = () => {
    
    const [credentials, setCredentials] = useState({ 
        username: '', 
        password: '' 
    });
    const [error, setError] = useState('');
    
    const { login } = useAuth();
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

        const success = login(credentials.username, credentials.password);

        if (success) {
            navigate('/');
        } else {
            setError('Credenciales incorrectas. Intenta con "usuario" y "1234".');
            setCredentials(prev => ({ 
                ...prev, 
                password: '' 
            }));
        }
    };

    return (
        <main className="login-page">
            <div className="login-container">
                
                <h2>👋 Regístrate para iniciar tu compra</h2>
                <p>Usa **usuario** y **1234** para ingresar.</p>
                
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
                        
                        <p>¿Sos nuevo? 
                            <Link to="/register" className="register-link"> 
                                Regístrate aquí
                            </Link>
                        </p>

                        <button 
                            type="button"
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