import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CityScreen.css';
import logo from '../assets/logo.svg';

const TourBookingModal = ({ tour, availableDates, availableTimes, onClose, onBook }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const handleDateChange = (event) => {
        const date = event.target.value;
        setSelectedDate(date);
        setSelectedTime(''); // Сбрасываем время при изменении даты
    };

    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    };

    const handleBooking = () => {
        if (selectedDate && selectedTime) {
            onBook(tour, selectedDate, selectedTime);
            onClose();
        } else {
            alert("Пожалуйста, выберите дату и время.");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3>Выберите дату и время для тура: {tour.tourName}</h3>

                <div className="date-selection">
                    <label>Дата:</label>
                    <select value={selectedDate} onChange={handleDateChange}>
                        <option value="">Выберите дату</option>
                        {availableDates.map((date) => (
                            <option key={date} value={date}>
                                {date}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedDate && (
                    <div className="time-selection">
                        <label>Время:</label>
                        <select value={selectedTime} onChange={handleTimeChange}>
                            <option value="">Выберите время</option>
                            {availableTimes[selectedDate]?.map((time) => (
                                <option key={time} value={time}>
                                    {time}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <div className="modal-actions">
                    <button onClick={onClose}>Закрыть</button>
                    <button onClick={handleBooking}>Забронировать</button>
                </div>
            </div>
        </div>
    );
};

const CityScreen = ({ city, goBack }) => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTour, setSelectedTour] = useState(null);

    const [availableDates, setAvailableDates] = useState([]);
    const [availableTimes, setAvailableTimes] = useState({});

    const handleBookTour = (tour, date, time) => {
        const token = localStorage.getItem('token');
        axios.post('http://localhost:5000/api/auth/profile/bookTour', { tourId: tour._id, date, time }, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(() => {
                alert(`Вы успешно забронировали тур: ${tour.tourName} на ${date} в ${time}`);
            })
            .catch((error) => {
                console.error('Ошибка при бронировании тура:', error);
                alert('Не удалось забронировать тур');
            });
    };

    const openBookingModal = (tour) => {
        setSelectedTour(tour);
        setIsModalOpen(true);
    };

    const closeBookingModal = () => {
        setIsModalOpen(false);
        setSelectedTour(null);
    };

    // Загрузка туров и доступных дат/времен
    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/cities/${city._id}/tours`);
                setTours(response.data);
                setLoading(false);
            } catch (error) {
                setError('Не удалось загрузить туры');
                setLoading(false);
            }
        };

        const fetchAvailableDatesAndTimes = () => {
            // Пример загрузки доступных дат и времени, можно заменить на реальную логику
            const dates = ["2024-12-10", "2024-12-11", "2024-12-12"];
            const times = {
                "2024-12-10": ["10:00", "14:00", "18:00"],
                "2024-12-11": ["11:00", "15:00", "19:00"],
                "2024-12-12": ["09:00", "13:00", "17:00"]
            };
            setAvailableDates(dates);
            setAvailableTimes(times);
        };

        fetchTours();
        fetchAvailableDatesAndTimes();

    }, [city]);

    return (
        <div className="info1">
            <img src={logo} alt="Logo" className="logos" />
            <div className="login-container">
                <div className="header">
                    <h1>{city.name}</h1>
                    <img src={`http://localhost:5000${city.image}`} alt={city.name} className="city-image1" />
                </div>
                <p className="city-description">{city.description}</p>

                <h2>Доступные туры:</h2>

                {loading && <p>Загрузка туров...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <div className="tours-container">
                    {tours.length > 0 ? (
                        tours.map((tour) => (
                            <div key={tour._id} className="tour-card">
                                <h3>{tour.tourName}</h3>
                                <p>{tour.description}</p>
                                <p>Цена: {tour.price} руб.</p>
                                <button className="select-date-btn" onClick={() => openBookingModal(tour)}>
                                    Выбрать дату
                                </button>
                            </div>
                        ))
                    ) : (
                        !loading && <p>Туры не найдены для этого города.</p>
                    )}
                </div>

                <button onClick={goBack} className="back-btn">Назад</button>

                {isModalOpen && selectedTour && (
                    <TourBookingModal
                        tour={selectedTour}
                        availableDates={availableDates}
                        availableTimes={availableTimes}
                        onClose={closeBookingModal}
                        onBook={handleBookTour}
                    />
                )}
            </div>
        </div>
    );
};

export default CityScreen;
