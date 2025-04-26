// client/src/components/chat/MessageList.js
import React from 'react';
import UserMessage from './UserMessage';
import BotMessage from './BotMessage';
import LoadingIndicator from './LoadingIndicator';

/**
 * MessageList component that displays all messages and loading state
 * @param {Object} props
 * @param {Array} props.messages - Array of message objects
 * @param {boolean} props.isLoading - Whether the app is currently loading a response
 * @param {React.RefObject} props.messagesEndRef - Ref to scroll to the end of messages
 * @param {boolean} props.useAdvancedLoading - Whether to use advanced loading UI
 */
const MessageList = ({
  messages,
  isLoading,
  messagesEndRef,
  useAdvancedLoading = false
}) => {
  return (
    <div className="chat-messages">
      {messages.map(message => (
        message.type === 'user' ? (
          <UserMessage key={message.id} content={message.content} />
        ) : (
          <BotMessage key={message.id} content={message.content} />
        )
      ))}

      {isLoading && <LoadingIndicator advanced={useAdvancedLoading} />}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;