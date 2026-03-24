import { useState } from 'react';
import ChatWindow from './components/chat/ChatWindow';
import ChatInput from './components/chat/ChatInput';
import FeedbackDialog from './components/feedback/FeedbackDialog';
import { useChat } from './hooks/useChat';
import { submitFeedback } from './services/api.service';
import './assets/styles/global.css';

function App() {
  const { messages, isLoading, error, sendMessage } = useChat();
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [feedbackMessageType, setFeedbackMessageType] = useState<'success' | 'error' | null>(null);

  const handleFeedbackSubmit = async (payload: {
    name?: string;
    rating: number;
    comments?: string;
  }) => {
    try {
      await submitFeedback(payload);
      setFeedbackMessage('Thanks! Your feedback was submitted.');
      setFeedbackMessageType('success');
    } catch {
      setFeedbackMessage('We could not submit your feedback right now. Please try again in a moment.');
      setFeedbackMessageType('error');
    }

    window.setTimeout(() => {
      setFeedbackMessage(null);
      setFeedbackMessageType(null);
    }, 5000);
  };

  return (
    <div className="chat-container">
      <header className="flex justify-between items-center w-full" style={{ marginBottom: '1.5rem' }}>
        <div className="flex items-center" style={{ gap: '0.9rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--accent-primary)' }}>
            StoryGen <span style={{ color: 'var(--text-secondary)', fontWeight: '400' }}>AI</span>
          </h1>
        </div>
        <div className="flex items-center" style={{ gap: '0.9rem' }}>
          {error && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{error}</span>}
          <button
            type="button"
            className="feedback-trigger-button"
            onClick={() => setIsFeedbackOpen(true)}
          >
            Feedback
          </button>
        </div>
      </header>

      {feedbackMessage && (
        <p className={feedbackMessageType === 'error' ? 'feedback-error-banner' : 'feedback-success-banner'}>
          {feedbackMessage}
        </p>
      )}
      
      <ChatWindow messages={messages} isLoading={isLoading} />
      
      <ChatInput onSendMessage={sendMessage} disabled={isLoading} />

      <FeedbackDialog
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        onSubmit={handleFeedbackSubmit}
      />
    </div>
  );
}

export default App;
