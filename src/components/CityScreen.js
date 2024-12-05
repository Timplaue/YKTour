import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CityScreen.css'; // Подключим стили для компонента

const CityScreen = ({ city, goBack }) => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Получаем туры для города:", city._id);

        const fetchTours = async () => {
            try {
                console.log(`Запрос туров для города с ID: ${city._id}`);
                const response = await axios.get(`http://localhost:5000/api/cities/${city._id}/tours`);
                console.log("Ответ от сервера с турами:", response.data);
                setTours(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Ошибка при загрузке туров:", error);
                setError('Не удалось загрузить туры');
                setLoading(false);
            }
        };

        fetchTours();
    }, [city]);

    return (
        <div className="city-screen">
            <div className="header">
                <h1>{city.name}</h1>
                <img src={`http://localhost:5000${city.image}`} alt={city.name} className="city-image"/>
            </div>
            <p className="city-description">{city.description}</p>

            <h2>Доступные туры:</h2>

            {loading && <p>Загрузка туров...</p>}

            {error && <p style={{color: 'red'}}>{error}</p>}

            <div className="tours-container">
                {tours.length > 0 ? (
                    tours.map((tour) => (
                        <div key={tour._id} className="tour-card">
                            <h3>{tour.tourName}</h3>
                            <p>{tour.description}</p>
                            <p>Цена: {tour.price} руб.</p>
                            <button className="select-date-btn">Выбрать дату</button>
                        </div>
                    ))
                ) : (
                    !loading && <p>Туры не найдены для этого города.</p>
                )}
            </div>

            <button onClick={goBack} className="back-btn">Назад</button>
        </div>
    );
};

export default CityScreen;
