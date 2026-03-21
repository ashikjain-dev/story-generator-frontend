import React, { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import './ChatWindow.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ChatWindowProps {
  messages: Message[];
  isLoading?: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div className="chat-window" ref={scrollRef}>
      {messages.length === 0 && !isLoading && (
        <div className="empty-state">
          <p>Paste a YouTube URL or type a story prompt to begin.</p>
        </div>
      )}
      
      {messages.map((msg) => (
        <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
      ))}
      
      {isLoading && (
        <div className="chat-message assistant">
          <div className="message-bubble loading">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
