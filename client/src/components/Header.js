// src/components/Header.js
import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <span className="logo-text">SmartStay24</span>
      </div>
      <nav className="header-nav">
        <a href="#" className="nav-item">Hilfe</a>
        <a href="#" className="nav-item">Kontakt</a>
      </nav>
    </header>
  );
};

export default Header;