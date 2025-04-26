// src/components/UserMessage.js
import React from 'react';

const UserMessage = ({ content }) => {
  return (
    <div className="message user-message">
      {content}
    </div>
  );
};

export default UserMessage;