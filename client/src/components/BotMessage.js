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
      ? "Leider konnte ich keine Hotels finden, die Ihren Wünschen entsprechen. Versuchen Sie es mit anderen Kriterien."
      : "Es tut mir leid, aber ich verstehe Ihre Anfrage nicht. Bitte geben Sie eine hotelbezogene Anfrage ein.";
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
              content="Hier sind einige Hotel-Empfehlungen für Sie:"
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