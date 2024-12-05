import React, { useState, useEffect } from 'react';
import './App.css';
import Register from './components/registration';
import Login from './components/login';
import CityScreen from './components/CityScreen';
import CityCards from './components/CityCards';
import NavMenu from './components/NavMenu';
import Profile from './components/Profile';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('login'); // Убираем 'welcome', так как его больше нет
  const [selectedCity, setSelectedCity] = useState(null);

  const handleLogin = (token) => {
    setIsAuthenticated(true);
    localStorage.setItem('token', token);
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentScreen('login');
    setSelectedCity(null);
    localStorage.removeItem('token');
  };

  const toggleAuthScreen = () => {
    setCurrentScreen((prev) => (prev === 'login' ? 'register' : 'login'));
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setCurrentScreen('city');
  };

  const goBackToHome = () => {
    setSelectedCity(null);
    setCurrentScreen('home');
  };

  const handleNavigation = (screen) => {
    setCurrentScreen(screen);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setCurrentScreen('login');
    } else {
      setIsAuthenticated(true);
      setCurrentScreen('home');
    }
  }, []);

  return (
      <div className="App">
        {!isAuthenticated && currentScreen === 'login' && (
            <Login onLogin={handleLogin} toggleAuthScreen={toggleAuthScreen} />
        )}

        {!isAuthenticated && currentScreen === 'register' && (
            <Register onRegister={() => setCurrentScreen('login')} toggleAuthScreen={toggleAuthScreen} />
        )}

        {isAuthenticated && <NavMenu onNavigate={handleNavigation} />}

        {isAuthenticated && currentScreen === 'home' && (
            <CityCards onSelectCity={handleCitySelect} />
        )}

        {isAuthenticated && currentScreen === 'city' && selectedCity && (
            <CityScreen city={selectedCity} goBack={goBackToHome} />
        )}

        {isAuthenticated && currentScreen === 'profile' && (
            <Profile onLogout={handleLogout} />
        )}
      </div>
  );
}

export default App;
