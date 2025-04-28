import React from 'react';

const InfoPopup = ({ onClose }) => {
  // Prevent closing when clicking inside the popup content
  const handlePopupContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    // Overlay covers the whole screen
    <div className="info-popup-overlay" onClick={onClose}>
      {/* Popup container */}
      <div className="info-popup" onClick={handlePopupContentClick}>
        {/* Close button */}
        <button className="close-button" onClick={onClose}>×</button>

        {/* Popup Content */}
        <h1>AI-Powered Hotel Recommendation System</h1>
        <h2>🥇 Winner of the CHECK24 AI Makeathon 2025 Challenge!</h2>

        <p>
          Out of 32 competing teams at the AI Makeathon (April 25–27, 2025), we proudly secured 1st place and had the incredible opportunity to pitch SmartStay24 in front of over 500 participants!
        </p>

        <p>
          Inspired by the challenges in modern travel booking, we proudly present SmartStay24—an intelligent hotel recommendation system developed for the CHECK24 AI Makeathon Challenge that understands natural language queries, extracts user preferences, and provides personalized hotel recommendations.
        </p>

        <hr />

        <h3>Developed with 🧡 by:</h3>
        <ul className="contributors-list">
          <li>Paul Vorderbrügge</li>
          <li>Markus Huber</li>
          <li>Luca Bozzetti</li>
          <li>Sebastian Rogg</li>
        </ul>
      </div>
    </div>
  );
};

export default InfoPopup;