// client/src/components/layout/ChatContainer.js
import React from 'react';
import MessageList from '../chat/MessageList';
import MessageInput from '../chat/MessageInput';

/**
 * ChatContainer component that holds the messages and input
 * @param {Object} props
 * @param {Array} props.messages - Array of message objects
 * @param {boolean} props.isLoading - Whether the app is currently loading a response
 * @param {Function} props.onSendMessage - Callback for when a message is sent
 * @param {React.RefObject} props.messagesEndRef - Ref to scroll to the end of messages
 * @param {boolean} props.useAdvancedLoading - Whether to use advanced loading UI
 */
const ChatContainer = ({
  messages,
  isLoading,
  onSendMessage,
  messagesEndRef,
  useAdvancedLoading = false
}) => {
  return (
    <div className="chat-container">
      <MessageList
        messages={messages}
        isLoading={isLoading}
        messagesEndRef={messagesEndRef}
        useAdvancedLoading={useAdvancedLoading}
      />
      <MessageInput onSendMessage={onSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatContainer;