// src/components/layout/Header.js
import React, { useState } from 'react';
import InfoPopup from './InfoPopup'; // We'll create this component

const Header = ({ apiAvailable, onCityChange }) => {
  const [selectedCity, setSelectedCity] = useState('Copenhagen');
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false); // State for popup

  const handleCityChange = (city) => {
    setSelectedCity(city);
    if (onCityChange) {
      onCityChange(city);
    }
  };

  const toggleInfoPopup = () => {
    setIsInfoPopupOpen(!isInfoPopupOpen);
  };

  return (
    <> {/* Use Fragment to return multiple top-level elements */}
      <header className="header">
        <div className="header-inner">
          <div className="header-logo">
            <div className="check24-style-logo">
              <span className="logo-text">SMARTSTAY<span className="logo-number">24</span></span>
              <img src="/assets/arrow.png" alt="CHECK24 arrow" className="logo-arrow" />
            </div>
          </div>

          <div className="city-selector">
            <button
              className={`city-option ${selectedCity === 'Copenhagen' ? 'selected' : ''}`}
              onClick={() => handleCityChange('Copenhagen')}
            >
              Copenhagen
            </button>
            <button
              className={`city-option ${selectedCity === 'Mallorca' ? 'selected' : ''}`}
              onClick={() => handleCityChange('Mallorca')}
            >
              Mallorca
            </button>
            <button
              className={`city-option ${selectedCity === 'New York' ? 'selected' : ''}`}
              onClick={() => handleCityChange('New York')}
            >
              New York
            </button>
          </div>

          <nav className="header-nav">
            {/* Add the Info button here */}
            <button onClick={toggleInfoPopup} className="nav-item info-button">
              Info
            </button>
            <a href="https://github.com/M4RKUS28/SmartStay24" className="nav-item">Github</a>
            {apiAvailable !== undefined && (
              <span className={`nav-item status-indicator ${apiAvailable ? 'online' : 'offline'}`}>
                {apiAvailable ? 'Live' : 'Demo'}
              </span>
            )}
          </nav>
        </div>
      </header>

      {/* Conditionally render the Info Popup */}
      {isInfoPopupOpen && <InfoPopup onClose={toggleInfoPopup} />}
    </>
  );
};

export default Header;