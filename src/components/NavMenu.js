import React from 'react';
import './NavMenu.css';
import Profile from '../assets/NavIcon/Layer_1.svg';
import Map from '../assets/NavIcon/Layer_1-1.svg';
import Like from '../assets/NavIcon/Layer_1-2.svg';
import Comment from '../assets/NavIcon/Layer_1-3.svg';

function NavMenu({ onNavigate }) {
    return (
        <div className="nav-menu">
            <button onClick={() => onNavigate('map')} className="icon-button">
                <img src={Map} alt="Map Icon" className="icon-image" />
            </button>
            <button onClick={() => onNavigate('difficulty')} className="icon-button">
                <img src={Like} alt="Favorite Icon" className="favorite-image" />
            </button>
            <button onClick={() => onNavigate('settings')} className="icon-button">
                <img src={Comment} alt="Comment Icon" className="comment-image" />
            </button>
            <button onClick={() => onNavigate('profile')} className="icon-button">
                <img src={Profile} alt="Profile Icon" className="profile-image" />
            </button>
        </div>
    );
}

export default NavMenu;
