// src/App.js
import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import ChatContainer from './components/ChatContainer';
import { simulateHotelRecommendation } from './utils/SimulateResponse';

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hallo! Ich bin SmartStay24, Ihr persönlicher Hotel-Assistent. Wie kann ich Ihnen bei der Hotelsuche helfen?'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message) => {
    // Add user message to chat
    const newUserMessage = {
      id: messages.length + 1,
      type: 'user',
      content: message
    };
    
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(async () => {
      try {
        // Simulate AI response
        const response = await simulateHotelRecommendation(message);
        
        const newBotMessage = {
          id: messages.length + 2,
          type: 'bot',
          content: response
        };
        
        setMessages(prevMessages => [...prevMessages, newBotMessage]);
      } catch (error) {
        const errorMessage = {
          id: messages.length + 2,
          type: 'bot',
          content: 'Es tut mir leid, aber es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.'
        };
        
        setMessages(prevMessages => [...prevMessages, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="app">
      <Header />
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