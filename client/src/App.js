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
  const demoMessageShown = useRef(false);
  const messagesEndRef = useRef(null);

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

      // Get recommendations from API (will fall back to simulation if API fails)
      // Pass the current city to the API if needed
      const response = await getHotelRecommendations(message, currentCity);

      const newBotMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: response
      };

      setMessages(prevMessages => [...prevMessages, newBotMessage]);
    } catch (error) {
      console.error('Error getting recommendations:', error);

      const errorMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: 'I\'m sorry, but an error has occurred. Please try again.'
      };

      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fix for iOS Safari viewport height issues
  useEffect(() => {
    const handleResize = () => {
      // Set a custom property with the viewport height
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Run once on mount and on resize
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return (
    <div className="app-wrapper">
      <Header
        apiAvailable={isApiAvailable}
        onCityChange={handleCityChange}
      />
      <div className="content-wrapper">
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