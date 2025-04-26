// src/components/ChatContainer.js
import React, { useEffect } from 'react';
import MessageList from '../chat/MessageList';
import MessageInput from '../chat/MessageInput';

const ChatContainer = ({ messages, isLoading, onSendMessage, messagesEndRef }) => {
  return (
    <div className="chat-container">
      <MessageList
        messages={messages}
        isLoading={isLoading}
        messagesEndRef={messagesEndRef}
      />
      <MessageInput onSendMessage={onSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatContainer;