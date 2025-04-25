// src/components/Header.js
import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <div className="check24-style-logo">
          <span className="logo-text">SMARTSTAY<span className="logo-number">24</span></span>
          <span className="logo-arrow">⟩</span>
        </div>
      </div>
      <nav className="header-nav">
        <a href="#" className="nav-item">Hilfe</a>
        <a href="#" className="nav-item">Kontakt</a>
      </nav>
    </header>
  );
};

export default Header;