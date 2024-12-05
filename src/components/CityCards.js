// В файле CityCards.js
import React, { useState, useEffect } from 'react';
import './CityCards.css';
import axios from 'axios';
import logo from "../assets/logo.svg";

const CityCards = ({ onSelectCity }) => {
    const [cities, setCities] = useState([]);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/cities');
                setCities(response.data);
            } catch (error) {
                console.error("Ошибка при загрузке городов", error);
                alert("Не удалось загрузить города");
            }
        };
        fetchCities();
    }, []);

    return (
        <div>
            <img src={logo} alt="Logo" className="logos"/>
            <div className="city-cards">
                {cities.map((city) => (
                    <div key={city.id} className="city-card" onClick={() => onSelectCity(city)}>
                        <img
                            src={`http://localhost:5000${city.image}`}  // Путь с базовым URL
                            alt={city.name}
                            className="city-image"
                        />
                        <div className="city-content">
                            <h3>{city.name}</h3>
                            <button>Подробнее</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CityCards; // Убедитесь, что это экспорт по умолчанию
