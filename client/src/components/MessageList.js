// src/components/MessageList.js
import React from 'react';
import UserMessage from './UserMessage';
import BotMessage from './BotMessage';
import LoadingIndicator from './LoadingIndicator';

const MessageList = ({ messages, isLoading, messagesEndRef }) => {
  return (
    <div className="chat-messages">
      {messages.map(message => (
        message.type === 'user' ? (
          <UserMessage key={message.id} content={message.content} />
        ) : (
          <BotMessage key={message.id} content={message.content} />
        )
      ))}

      {isLoading && <LoadingIndicator />}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;