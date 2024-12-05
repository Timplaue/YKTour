import React, { useState } from 'react';
import './registration.css';
import axios from 'axios';
import logo from '../assets/logo.svg';

function Register({ onRegister, toggleAuthScreen }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            console.log('Registering user:', { firstName, lastName, birthDate, username, password });
            await axios.post('http://localhost:5000/api/auth/register', {
                firstName,
                lastName,
                birthDate,
                username,
                password
            });
            onRegister();
        } catch (error) {
            console.error('Registration error:', error.response || error.message); // Лог ошибки
            alert('Ошибка при регистрации пользователя');
        }
    };

    return (
        <div className="block2">
            <img src={logo} alt="Logo" className="logo"/>
            <div className="left">
                <h1 className="registration">Регистрация</h1>
                <input className="registration" type="text" placeholder="Имя" value={firstName}
                       onChange={(e) => setFirstName(e.target.value)}/>
                <input className="registration" type="text" placeholder="Фамилия" value={lastName}
                       onChange={(e) => setLastName(e.target.value)}/>
                <div className="birthdate-inputs">
                    <input
                        className="registration"
                        type="date"
                        placeholder="Дата"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                    />
                </div>
                <input className="registration" type="text" placeholder="Логин" value={username}
                       onChange={(e) => setUsername(e.target.value)}/>
                <input className="registration" type="password" placeholder="Пароль" value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={toggleAuthScreen} className="toggle-button">
                    Уже есть аккаунт? Войти
                </button>
            </div>
            <button className="registration" onClick={handleRegister}>
                Создать аккаунт
            </button>
        </div>
    );
}

export default Register;
