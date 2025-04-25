// src/components/LoadingIndicator.js
import React from 'react';

const LoadingIndicator = () => {
  return (
    <div className="loading-indicator">
      <span>SmartStay24 sucht</span>
      <div className="loading-dots">
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
      </div>
    </div>
  );
};

export default LoadingIndicator;