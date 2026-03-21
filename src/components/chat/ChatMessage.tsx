import React from 'react';
import './ChatMessage.css';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ role, content }) => {
  return (
    <div className={`chat-message ${role}`}>
      <div className="message-bubble">
        <div className="message-content">{content}</div>
      </div>
    </div>
  );
};

export default ChatMessage;
