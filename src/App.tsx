import ChatWindow from './components/chat/ChatWindow';
import ChatInput from './components/chat/ChatInput';
import { useChat } from './hooks/useChat';
import './assets/styles/global.css';

function App() {
  const { messages, isLoading, error, sendMessage } = useChat();

  return (
    <div className="chat-container">
      <header className="flex justify-between items-center w-full" style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--accent-primary)' }}>
          StoryGen <span style={{ color: 'var(--text-secondary)', fontWeight: '400' }}>AI</span>
        </h1>
        {error && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{error}</span>}
      </header>
      
      <ChatWindow messages={messages} isLoading={isLoading} />
      
      <ChatInput onSendMessage={sendMessage} disabled={isLoading} />
    </div>
  );
}

export default App;
