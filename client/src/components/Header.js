// src/components/Header.js
import React from 'react';

const Header = ({ apiAvailable }) => {
  return (
    <header className="header">
      <div className="header-logo">
        <div className="check24-style-logo">
          <span className="logo-text">SMARTSTAY<span className="logo-number">24</span></span>
          <img src="/assets/arrow.png" alt="CHECK24 arrow" className="logo-arrow" />
        </div>
      </div>
      <nav className="header-nav">
        <a href="#" className="nav-item">Hilfe</a>
        <a href="#" className="nav-item">Kontakt</a>
        {apiAvailable !== undefined && (
          <span className={`nav-item status-indicator ${apiAvailable ? 'online' : 'offline'}`}>
            {apiAvailable ? 'Live' : 'Demo'}
          </span>
        )}
      </nav>
    </header>
  );
};

export default Header;