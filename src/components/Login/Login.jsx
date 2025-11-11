// src/components/Login/Login.jsx - Versión Estable
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext'; 
import { useNavigate, Link } from 'react-router-dom'; 
import './Login.css'; 

// 🛑 Exportación Nombrada: "export const" para coincidir con "import { Login }"
export const Login = () => {
    
    const [credentials, setCredentials] = useState({ 
        username: '', 
        password: '' 
    });
    const [error, setError] = useState('');
    
    // Obtenemos la función login del contexto
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

        // CLAVE: login ahora devuelve el rol ('dueño', 'cliente') o null
        const role = login(credentials.username, credentials.password);

        if (role) {
            
            // Redirección condicional basada en el rol
            if (role === 'administrador') {
                // Redirigir al Panel de Administración
                navigate('/admin');
            } else {
                // Redirigir a la tienda para clientes normales
                navigate('/');
            }
            
        } else {
            // Mensaje de error
            setError('Credenciales incorrectas. Intenta con "usuario" (1234) o "dueño" (12345).');
            setCredentials(prev => ({ 
                ...prev, 
                password: '' 
            }));
        }
    };

    return (
        <main className="login-page">
            <div className="login-container">
                
                <h2>👋 Accede a tu cuenta</h2>
                <p>Usuario de prueba: **usuario/1234** (Cliente) o **administrador/12345** (Admin) tambien podes crear tu propio usuario y contraseña., no te lo pierdas!!</p>
                
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