// src/App.js
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Header from './components/Header';
import ChatContainer from './components/ChatContainer';
import { getHotelRecommendations, checkApiAvailability } from './api/hotelService';

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hallo! Ich bin Carlos, Ihr persönlicher Hotel-Assistent. Wie kann ich Ihnen bei der Hotelsuche helfen?'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isApiAvailable, setIsApiAvailable] = useState(false);
  const demoMessageShown = useRef(false);

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
            content: 'Hinweis: Ich arbeite derzeit im Demo-Modus, da keine Verbindung zum Server besteht.'
          }
        ]);
      }
    };

    checkApi();
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

    // Add slight delay for natural conversation flow
    setTimeout(async () => {
      try {
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
          content: 'Es tut mir leid, aber es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.'
        };

        setMessages(prevMessages => [...prevMessages, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }, 800); // Small delay for natural conversation flow
  };

  return (
    <div className="app">
      <Header apiAvailable={isApiAvailable} />
      <main className="main-content">
        <ChatContainer 
          messages={messages}
          isLoading={isLoading} 
          onSendMessage={handleSendMessage} 
        />
      </main>
    </div>
  );
}

export default App;