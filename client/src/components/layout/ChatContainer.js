// src/components/ChatContainer.js
import React, { useEffect, useRef, useState } from 'react';
import MessageList from '../chat/MessageList';
import MessageInput from '../chat/MessageInput';

const ChatContainer = ({ messages, isLoading, onSendMessage }) => {
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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