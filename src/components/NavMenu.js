import React from 'react';
import './NavMenu.css';
import Profile from '../assets/NavIcon/Layer_1.svg';
import Map from '../assets/NavIcon/Layer_1-1.svg';
import Like from '../assets/NavIcon/Layer_1-2.svg';
import Comment from '../assets/NavIcon/Layer_1-3.svg';

function NavMenu({ onNavigate }) {
    return (
        <div className="nav-menu">
            {/* Кнопка для перехода на главную страницу */}
            <button onClick={() => onNavigate('home')} className="icon-button">
                <img src={Comment} alt="Home Icon" className="home-image" />
            </button>

            {/* Кнопка для перехода на карту */}
            <button onClick={() => onNavigate('map')} className="icon-button">
                <img src={Map} alt="Map Icon" className="icon-image"/>
            </button>

            {/* Кнопка для выбора сложности */}
            <button onClick={() => onNavigate('difficulty')} className="icon-button">
                <img src={Like} alt="Favorite Icon" className="favorite-image" />
            </button>

            {/* Кнопка для перехода в профиль */}
            <button onClick={() => onNavigate('profile')} className="icon-button">
                <img src={Profile} alt="Profile Icon" className="profile-image" />
            </button>
        </div>
    );
}

export default NavMenu;
