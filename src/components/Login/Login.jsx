// src/components/Login/Login.jsx

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext'; // Consumimos el hook que creamos
import { useNavigate } from 'react-router-dom';
import './Login.css'; 

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    // Obtenemos la función login del contexto
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // 🛑 Llamamos a la función login simulada del contexto
        const success = login(username, password);

        if (success) {
            // Si el login fue exitoso, redirigimos a la página principal
            navigate('/');
        } else {
            setError('Credenciales incorrectas. Intenta con "admin" y "1234".');
            setPassword(''); 
        }
    };

    return (
        <main className="login-page">
            <div className="login-container">
                <h2>👤 Iniciar Sesión</h2>
                <p>Usa **admin** y **1234** para ingresar.</p>
                <form onSubmit={handleSubmit} className="login-form">
                    
                    <div className="form-group">
                        <label htmlFor="username">Usuario:</label>
                        <input 
                            type="text" 
                            id="username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Contraseña:</label>
                        <input 
                            type="password" 
                            id="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}
                    
                    <button type="submit" className="login-button">
                        Acceder
                    </button>
                </form>
            </div>
        </main>
    );
};