import React, { useEffect } from 'react';

const CityMap = ({ city, locations }) => {
    useEffect(() => {
        const ymaps = window.ymaps;

        // Инициализация карты после загрузки библиотеки Яндекс.Карт
        ymaps.ready(() => {
            const map = new ymaps.Map("map", {
                center: [city.coordinates.lat, city.coordinates.lon], // Центр карты - передаем координаты города
                zoom: 12, // Начальный уровень масштабирования
            });

            // Добавление меток на карту
            locations.forEach((location) => {
                const placemark = new ymaps.Placemark([location.lat, location.lon], {
                    balloonContent: location.name, // Описание для метки
                });

                map.geoObjects.add(placemark); // Добавляем метку на карту
            });
        });
    }, [city, locations]);

    return (
        <div className="city-map">
            <h2>Карта города: {city.name}</h2>
            <div id="map" style={{ width: '100%', height: '400px' }}></div>
        </div>
    );
};

export default CityMap;
