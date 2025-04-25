// src/components/BotMessage.js
import React from 'react';
import HotelList from './HotelList';

const BotMessage = ({ content }) => {
  // Function to detect if content is a hotel list
  const isHotelList = (content) => {
    return Array.isArray(content) && content.length > 0;
  };

  // Function to detect if content is a special message
  const isSpecialMessage = (content) => {
    return content === "No hotels found" || content === "Invalid request";
  };

  return (
    <div className="bot-message-container">
      <div className="bot-avatar">S</div>
      <div className="message bot-message">
        {isHotelList(content) ? (
          <>
            <div>Hier sind einige Hotel-Empfehlungen für Sie:</div>
            <HotelList hotels={content} />
          </>
        ) : isSpecialMessage(content) ? (
          content === "No hotels found" ?
            "Leider konnte ich keine Hotels finden, die Ihren Wünschen entsprechen. Versuchen Sie es mit anderen Kriterien." :
            "Es tut mir leid, aber ich verstehe Ihre Anfrage nicht. Bitte geben Sie eine hotelbezogene Anfrage ein."
        ) : (
          content
        )}
      </div>
    </div>
  );
};

export default BotMessage;