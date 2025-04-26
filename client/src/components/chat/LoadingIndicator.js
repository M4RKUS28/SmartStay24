// client/src/components/chat/LoadingIndicator.js
import React, { useState, useEffect, useRef } from 'react';
import { initialSearchMessages, processingMessages, refinementMessages, personalityMessages } from '../../utils/LoadingMessages';
import { FaSearch, FaHotel, FaStar } from 'react-icons/fa';

/**
 * LoadingIndicator component with simple and advanced modes
 * @param {Object} props - Component props
 * @param {boolean} props.advanced - Whether to show advanced loading UI (default: false)
 * @param {number} props.searchDuration - Total search duration in ms (default: 6000)
 */
const LoadingIndicator = ({ advanced = false, searchDuration = 6000 }) => {
  // If not advanced mode, render simple loading indicator
  if (!advanced) {
    return <SimpleLoadingIndicator />;
  }

  // Otherwise render advanced loading indicator
  return <AdvancedLoadingIndicator searchDuration={searchDuration} />;
};

/**
 * Simple loading indicator with rotating messages
 */
const SimpleLoadingIndicator = () => {
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

// Define icons for each phase
const phaseIcons = [
  <FaSearch key="search" className="phase-icon" />,  // Initial search
  <FaHotel key="hotel" className="phase-icon" />,   // Processing
  <FaStar key="star" className="phase-icon" />     // Refinement
];

/**
 * Advanced loading indicator with phases and progress bar
 * @param {number} searchDuration - Total search duration in ms
 */
const AdvancedLoadingIndicator = ({ searchDuration = 6000 }) => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef(Date.now());
  const phaseTimersRef = useRef([]);

  // All message arrays for reference
  const allMessageArrays = [
    initialSearchMessages,
    processingMessages,
    refinementMessages
  ];

  // Occasionally insert a personality message
  const getMessageForPhase = (phase) => {
    // 20% chance to show a personality message instead
    if (Math.random() < 0.2) {
      return personalityMessages[Math.floor(Math.random() * personalityMessages.length)];
    }

    const messagesForPhase = allMessageArrays[phase];
    return messagesForPhase[Math.floor(Math.random() * messagesForPhase.length)];
  };

  // Set up the phase progression based on total search duration
  useEffect(() => {
    startTimeRef.current = Date.now();

    // Clear any existing timers
    phaseTimersRef.current.forEach(timer => clearTimeout(timer));
    phaseTimersRef.current = [];

    // Set initial phase and message
    setCurrentPhase(0);
    setMessage(getMessageForPhase(0));

    // Phase 1 starts at ~30% of total time
    const phase1Time = searchDuration * 0.3;
    const timer1 = setTimeout(() => {
      setCurrentPhase(1);
      setMessage(getMessageForPhase(1));
    }, phase1Time);

    // Phase 2 starts at ~70% of total time
    const phase2Time = searchDuration * 0.7;
    const timer2 = setTimeout(() => {
      setCurrentPhase(2);
      setMessage(getMessageForPhase(2));
    }, phase2Time);

    phaseTimersRef.current = [timer1, timer2];

    return () => {
      phaseTimersRef.current.forEach(timer => clearTimeout(timer));
    };
  }, [searchDuration]);

  // Update progress bar and rotate messages within each phase
  useEffect(() => {
    const messageRotationTimer = setInterval(() => {
      // Update progress
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.min((elapsed / searchDuration) * 100, 99); // Cap at 99% for visual effect
      setProgress(newProgress);

      // Rotate messages every 2 seconds, but stay within current phase
      setMessage(getMessageForPhase(currentPhase));
    }, 2000);

    return () => clearInterval(messageRotationTimer);
  }, [currentPhase, searchDuration]);

  return (
    <div className="advanced-loading-indicator">
      <div className="loading-phases">
        {[0, 1, 2].map((phase) => (
          <div
            key={phase}
            className={`phase-indicator ${currentPhase >= phase ? 'active' : ''}`}
          >
            {phaseIcons[phase]}
          </div>
        ))}
      </div>

      <div className="loading-message-container">
        <div className="message-icon">
          {phaseIcons[currentPhase]}
        </div>
        <span className="loading-message">{message}</span>
      </div>

      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="loading-dots">
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
      </div>
    </div>
  );
};

export default LoadingIndicator;