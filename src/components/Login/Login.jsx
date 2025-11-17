import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        const ok = login(credentials.username, credentials.password);

        if (ok) {
            navigate('/admin'); // ✅ Solo entra a admin
        } else {
            setError('Acceso no permitido. Solo admin puede ingresar.');
            setCredentials({ username: '', password: '' });
        }
    };

    return (
        <main className="login-page">
            <div className="login-container">
                <h2>🔐 Acceso Administrador</h2>
                <p>Solo para administradores del sistema.</p>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">Usuario:</label>
                        <input type="text" id="username" value={credentials.username} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña:</label>
                        <input type="password" id="password" value={credentials.password} onChange={handleChange} required />
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="login-button">
                        Entrar a Admin
                    </button>

                    <button 
                        type="button" 
                        className="later-button" 
                        onClick={() => navigate('/')}
                        style={{ marginTop: '10px' }}
                    >
                        ⬅ Volver a la tienda
                    </button>
                </form>
            </div>
        </main>
    );
};
