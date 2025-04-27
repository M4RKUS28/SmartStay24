// client/src/App.js
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Header from './components/layout/Header';
import ChatContainer from './components/layout/ChatContainer';
import BackgroundImages from './components/layout/BackgroundImages';
import { getHotelRecommendations, checkApiAvailability } from './api/hotelService';

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m SmartStay, your personal hotel assistant. How can I help you find a hotel?'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isApiAvailable, setIsApiAvailable] = useState(false);
  const [currentCity, setCurrentCity] = useState('Copenhagen');
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const demoMessageShown = useRef(false);
  const messagesEndRef = useRef(null);
  const previousHeight = useRef(window.innerHeight);

  // Check API availability on component mount
  useEffect(() => {
    const checkApi = async () => {
      const available = await checkApiAvailability();
      setIsApiAvailable(available);

      // Add a system message about API status if not available
      if (!available && !demoMessageShown.current) {
        demoMessageShown.current = true;
        setMessages(prev => [
          ...prev,
          {
            id: prev.length + 1,
            type: 'bot',
            content: 'Note: I\'m currently working in demo mode as there\'s no connection to the server.'
          }
        ]);
      }
    };

    checkApi();
  }, []);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle city change
  const handleCityChange = (city) => {
    setCurrentCity(city);

    // Add message about city change
    const newBotMessage = {
      id: messages.length + 1,
      type: 'bot',
      content: `Switched to ${city}. How can I help you find a hotel in ${city}?`
    };

    setMessages(prevMessages => [...prevMessages, newBotMessage]);
  };


  const handleSendMessage = async (message) => {
    // Add user message to chat
    const newUserMessage = {
      id: messages.length + 1,
      type: 'user',
      content: message
    };

    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setIsLoading(true);

    // Easter egg
    if (message.trim().toLowerCase() === 'bombardino') {
      setTimeout(() => {
        const specialResponse = {
          id: messages.length + 2,
          type: 'bot',
          content: 'crocodilo!'
        };
        setMessages(prevMessages => [...prevMessages, specialResponse]);
        setIsLoading(false);
      }, 800);
      return;
    }

    // Regular hotel recommendation flow
    try {
      // Small delay for natural conversation flow
      await new Promise(resolve => setTimeout(resolve, 800));

      // Get recommendations from API
      const response = await getHotelRecommendations(message, currentCity);

      let content;

      // Handle different response types
      if (response === null) {
        // If response is null (invalid query)
        content = "Invalid request";
      } else if (Array.isArray(response) && response.length === 0) {
        // If response is an empty array (no matching hotels)
        content = "No hotels found";
      } else {
        // Otherwise use the actual response (hotel list or specific message)
        content = response;
      }

      const newBotMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: content
      };

      setMessages(prevMessages => [...prevMessages, newBotMessage]);
    } catch (error) {
      console.error('Error getting recommendations:', error);

      const errorMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: 'I\'m sorry, but an error has occurred while searching for hotels. Please try again later.'
      };

      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Detect keyboard open/close on mobile
  useEffect(() => {
    const handleResize = () => {
      // Set a custom property with the viewport height
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);

      // Update viewport height state
      setViewportHeight(window.innerHeight);

      // Detect if keyboard is likely open (for mobile devices)
      // If height decreased significantly, keyboard is probably open
      const heightDifference = previousHeight.current - window.innerHeight;
      const threshold = 150; // Threshold in pixels to consider keyboard open

      if (heightDifference > threshold) {
        setIsKeyboardOpen(true);
        // Set a CSS class on body for keyboard open state
        document.body.classList.add('keyboard-open');
      } else if (heightDifference < -50) { // Negative threshold for keyboard closing
        setIsKeyboardOpen(false);
        document.body.classList.remove('keyboard-open');
      }

      previousHeight.current = window.innerHeight;
    };

    // Handle focus events to scroll input into view on mobile
    const handleFocus = () => {
      // On iOS, wait a moment for the keyboard to appear
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    };

    const inputElements = document.querySelectorAll('input');
    inputElements.forEach(input => {
      input.addEventListener('focus', handleFocus);
    });

    // Run once on mount and on resize
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      inputElements.forEach(input => {
        input.removeEventListener('focus', handleFocus);
      });
    };
  }, []);

  return (
    <div className={`app-wrapper ${isKeyboardOpen ? 'keyboard-open' : ''}`}>
      <Header
        apiAvailable={isApiAvailable}
        onCityChange={handleCityChange}
      />
      <div className="content-wrapper" style={{ height: `${viewportHeight}px` }}>
        <BackgroundImages />
        <div className="app">
          <ChatContainer
            messages={messages}
            isLoading={isLoading}
            onSendMessage={handleSendMessage}
            messagesEndRef={messagesEndRef}
            useAdvancedLoading={false}
          />
        </div>
      </div>
      <div ref={messagesEndRef} style={{ height: 0, width: 0 }} />
    </div>
  );
}

export default App;