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
  const demoMessageShown = useRef(false);
  const messagesEndRef = useRef(null);

  // Check API availability on component mount
  useEffect(() => {
    const checkApi = async () => {
      const available = await checkApiAvailability();
      setIsApiAvailable(available);

      // Add a system message about API status if not available
      // Use ref to prevent duplicate messages in StrictMode
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

  // Handle resize to ensure proper layout
  useEffect(() => {
    const handleResize = () => {
      // Force scroll to bottom on resize to keep input visible
      messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      const response = await getHotelRecommendations(message);

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

  // Add an event listener to handle viewport issues on mobile
  useEffect(() => {
    // Fix for iOS Safari viewport height issues
    const handleResize = () => {
      // Set a custom property with the viewport height
      document.documentElement.style.setProperty(
        '--vh',
        `${window.innerHeight * 0.01}px`
      );
    };

    // Run once on mount
    handleResize();

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return (
    <div className="app">
      <BackgroundImages />
      <Header apiAvailable={isApiAvailable} />
      <main className="main-content">
        <ChatContainer
          messages={messages}
          isLoading={isLoading}
          onSendMessage={handleSendMessage}
          messagesEndRef={messagesEndRef}
          useAdvancedLoading={false} // Set to true to use advanced loading UI
        />
      </main>
      <div ref={messagesEndRef} style={{ height: 0, width: 0 }} />
    </div>
  );
}

export default App;