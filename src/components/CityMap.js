import React, { useEffect } from 'react';
import './CityMap.css';

const CityMap = () => {
    useEffect(() => {
        // Проверка, был ли уже загружен скрипт API Яндекс.Карт
        if (window.ymaps) {
            window.ymaps.ready(initializeMap);
        } else {
            const ymapsScript = document.createElement('script');
            ymapsScript.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=80b1bfa8-140a-4613-80ca-6604cbf23e92";
            ymapsScript.async = true;
            ymapsScript.onload = () => {
                window.ymaps.ready(initializeMap);
            };
            document.head.appendChild(ymapsScript);

            return () => {
                // Удаление скрипта при размонтировании компонента
                document.head.removeChild(ymapsScript);
            };
        }

        // Инициализация карты
        function initializeMap() {
            try {
                const mapContainer = document.getElementById('map');
                mapContainer.innerHTML = ''; // Очистка контейнера карты перед инициализацией

                const map = new window.ymaps.Map(mapContainer, {
                    center: [62.027554, 129.727558], // Координаты центра
                    zoom: 14,
                });

                const placemark = new window.ymaps.Placemark([62.027554, 129.727558], {
                    balloonContent: 'Пример маркера на карте',
                });

                map.geoObjects.add(placemark);
            } catch (error) {
                console.error('Ошибка при инициализации карты:', error);
            }
        }

        return () => {
            // Очистка карты при размонтировании компонента
            const mapContainer = document.getElementById('map');
            if (mapContainer) {
                mapContainer.innerHTML = ''; // Очистка карты, чтобы избежать наложения карт
            }
        };
    }, []); // Пустой массив зависимостей

    return (
        <div className="city-map">
            <h2>Карта города</h2>
            <div id="map" className="map-container" style={{ width: '100%', height: '400px' }}></div>
        </div>
    );
};

export default CityMap;
