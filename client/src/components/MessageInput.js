// src/components/MessageInput.js
import React, { useState } from 'react';

const MessageInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Fragen Sie nach Hotels (z.B. Hotel mit Pool und Sauna in der Nähe vom Zentrum)..."
        disabled={isLoading}
      />
      <button type="submit" disabled={!message.trim() || isLoading}>
        Senden
      </button>
    </form>
  );
};

export default MessageInput;