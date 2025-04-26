// src/components/LoadingIndicator.js
import React, { useState, useEffect } from 'react';
import { initialSearchMessages, processingMessages, refinementMessages } from '../../utils/LoadingMessages';

const LoadingIndicator = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);

  // All message arrays combined for easy reference
  const allMessages = [
    initialSearchMessages,
    processingMessages,
    refinementMessages
  ];

  // Advance through search phases
  useEffect(() => {
    const phaseTimer = setTimeout(() => {
      if (currentPhase < 2) {
        setCurrentPhase(prev => prev + 1);
        setMessageIndex(0); // Reset message index for new phase
      }
    }, 3000); // Change phase every 3 seconds

    return () => clearTimeout(phaseTimer);
  }, [currentPhase]);

  // Rotate messages within the current phase
  useEffect(() => {
    const messageTimer = setTimeout(() => {
      setMessageIndex(prev =>
        (prev + 1) % allMessages[currentPhase].length
      );
    }, 1500); // Change messages every 1.5 seconds

    return () => clearTimeout(messageTimer);
  }, [messageIndex, currentPhase]);

  return (
    <div className="loading-indicator">
      <span>{allMessages[currentPhase][messageIndex]}</span>
      <div className="loading-dots">
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
      </div>
    </div>
  );
};

export default LoadingIndicator;