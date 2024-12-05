import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import logo from '../assets/logo.svg';

function Login({ onLogin, toggleAuthScreen }) {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async () => {
        setError('');
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
            const token = response.data.token;
            if (token) {
                onLogin(token); // Передаем токен в App.js
            } else {
                setError('Не удалось получить токен');
            }
        } catch (error) {
            setError('Неправильный логин или пароль');
        }
    };

    return (
        <div className="login-container">
            <img src={logo} alt="Logo" className="logo"/>
            <div className="left">
                <h1 className="registration">Авторизация</h1>
                {error && <p className="error-message">{error}</p>}
                <input
                    type="text"
                    name="username"
                    placeholder="Логин"
                    className="registration"
                    value={credentials.username}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    className="registration"
                    value={credentials.password}
                    onChange={handleChange}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
                <button onClick={toggleAuthScreen} className="toggle-button">
                    Нет аккаунта? Зарегистрироваться
                </button>
            </div>
            <button onClick={handleLogin} className="registration">Войти</button>
        </div>
    );
}

export default Login;
