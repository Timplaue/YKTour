import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = ({ onLogout }) => {
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState('');
    const [tours, setTours] = useState([]);
    const [avatar, setAvatar] = useState(null); // Состояние для аватарки

    // Получаем информацию о профиле и записанных турах
    const fetchProfile = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.log("Токен отсутствует");
            setError("Токен отсутствует");
            return;
        }

        try {
            console.log("Отправка запроса с токеном:", token); // Логируем токен
            const response = await axios.get('http://localhost:5000/api/auth/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Данные профиля получены:', response.data); // Лог для получения данных

            setProfileData(response.data);
            setTours(response.data.tours || []);  // Устанавливаем записанные туры, если они есть

            console.log('Записанные туры:', response.data.tours);  // Лог туров для отладки

        } catch (error) {
            console.error("Ошибка при получении профиля:", error);
            if (error.response && error.response.status === 401) {
                setError("Ошибка аутентификации. Пожалуйста, войдите снова.");
            } else {
                setError("Ошибка при получении профиля");
            }
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    // Обработка изменения аватарки
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('avatar', file);
            const token = localStorage.getItem('token');
            axios.post('http://localhost:5000/api/auth/profile/avatar', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            })
                .then((response) => {
                    setProfileData(prevState => ({
                        ...prevState,
                        avatarUrl: `${response.data.avatarUrl}?t=${new Date().getTime()}` // Принудительная перезагрузка аватарки
                    }));
                    alert('Аватарка обновлена');
                })
                .catch((error) => {
                    console.error('Ошибка загрузки аватарки:', error);
                    alert('Ошибка загрузки аватарки');
                });
        }
    };

    // Проверяем, что профиль загружен, иначе показываем загрузку или ошибку
    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!profileData) {
        return <div>Загрузка...</div>; // Пока данные не загружены, показываем сообщение о загрузке
    }

    // Логируем туры для отладки
    console.log('Записанные туры в профиле:', tours);

    return (
        <div className="block3">
            <div className="profile">
                <h3>• Мой аккаунт</h3>
                <div className="profile-container">
                    <img
                        src={profileData.avatarUrl ? `http://localhost:5000${profileData.avatarUrl}` : '/default-avatar.png'}
                        alt="Аватар"
                        className="avatar"
                    />
                    <input
                        type="file"
                        onChange={handleAvatarChange}
                        className="avatar-input"
                    />
                    <div className="profile-info">
                        <h2>{profileData.firstName} {profileData.lastName}</h2>
                        <p>Дата регистрации: {new Date(profileData.registrationDate).toLocaleDateString()}</p>
                    </div>
                </div>
                <h5>Логин: {profileData.username}</h5>

                {/* Условие отображения записанных туров */}
                <h5>Записанные туры:</h5>
                {tours.length > 0 ? (
                    <ul>
                        {tours.map((tour, index) => (
                            <li key={index}>
                                <strong>{tour.name}</strong>
                                <p>{tour.description}</p>
                                <p>Дата: {new Date(tour.date).toLocaleDateString()}</p>
                                <p>Время: {tour.time}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Вы не записаны на туры.</p>
                )}

                <button className="logout" onClick={onLogout}>Выйти</button>
            </div>
        </div>
    );
};

export default Profile;
