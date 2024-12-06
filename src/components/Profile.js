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

        try {
            const response = await axios.get('http://localhost:5000/api/auth/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProfileData(response.data);
            setTours(response.data.tours);  // Устанавливаем записанные туры
        } catch (error) {
            if (error.response && error.response.status === 401) {
                onLogout();
            } else {
                console.error("Ошибка при получении профиля:", error);
                setError("Ошибка при получении профиля");
            }
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

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
                    // Добавляем временную метку для сброса кэша
                    setProfileData(prevState => ({
                        ...prevState,
                        avatarUrl: `${response.data.avatarUrl}?t=${new Date().getTime()}`
                    }));
                    alert('Аватарка обновлена');
                })
                .catch((error) => {
                    console.error('Ошибка загрузки аватарки:', error);
                    alert('Ошибка загрузки аватарки');
                });
        }
    };

    return (
        <div className="block3">
            {error && <p>{error}</p>}
            {profileData && (
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
                    <h5>Записанные туры:</h5>
                    <ul>
                        {tours.length > 0 ? (
                            tours.map((tour, index) => (
                                <li key={index}>{tour.name}</li>
                            ))
                        ) : (
                            <p>Вы не записаны на туры.</p>
                        )}
                    </ul>
                    <button className="logout" onClick={onLogout}>Выйти</button>
                </div>
            )}
        </div>
    );
};

export default Profile;
