import React, { useState } from 'react';
import { login } from '../../Api.js';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await login(username, password);
            console.log('Respuesta del servidor:', response);

        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    return (
        <div>
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Nombre de usuario:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    );
};

export default Login;
