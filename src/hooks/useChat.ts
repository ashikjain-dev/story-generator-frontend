import { useState, useCallback } from 'react';
import * as api from '../services/api.service';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    setIsLoading(true);
    setError(null);
    
    // Add user message immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
    };
    
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await api.generateStory(content);
      
      if (response && response.data) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response.data.story,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to generate story. Please try again.');
      // Optionally add an error message from the system to the chat
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
  };
};
