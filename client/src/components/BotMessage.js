// src/components/BotMessage.js
import React, { useState } from 'react';
import HotelList from './HotelList';
import { VscRobot } from "react-icons/vsc";
import TypingEffect from './TypingEffect';

const BotMessage = ({ content }) => {
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Function to detect if content is a hotel list
  const isHotelList = (content) => {
    return Array.isArray(content) && content.length > 0;
  };

  // Function to detect if content is a special message
  const isSpecialMessage = (content) => {
    return content === "No hotels found" || content === "Invalid request";
  };

  // Get the appropriate message for special cases
  const getSpecialMessage = (content) => {
    return content === "No hotels found"
      ? "Sorry, I couldn't find any hotels that match your preferences. Please try with different criteria."
      : "I'm sorry, but I don't understand your request. Please enter a hotel-related query.";
  };

  return (
    <div className="bot-message-container">
      <div className="bot-avatar">
        <VscRobot />
      </div>
      <div className="message bot-message">
        {isHotelList(content) ? (
          <>
            <TypingEffect
              content="Here are some hotel recommendations for you:"
              typingSpeed={4}
              onComplete={() => setIsTypingComplete(true)}
            />
            {isTypingComplete && (
              <div className="hotel-list-container fade-in">
                <HotelList hotels={content} />
              </div>
            )}
          </>
        ) : isSpecialMessage(content) ? (
          <TypingEffect content={getSpecialMessage(content)} typingSpeed={4} />
        ) : (
          <TypingEffect content={content} typingSpeed={4} />
        )}
      </div>
    </div>
  );
};

export default BotMessage;