import React, { useMemo, useState } from 'react';
import './ContactDialog.css';

export interface ContactPayload {
  name?: string;
  email: string;
  topic: string;
  message: string;
}

interface ContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: ContactPayload) => Promise<void>;
}

const MAX_NAME_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 2000;

const TOPICS: Array<{ value: string; label: string }> = [
  { value: 'support', label: 'Support' },
  { value: 'collaboration/partnerships', label: 'Collaboration / Partnerships' },
  { value: 'Other', label: 'Other' },
];

const isValidEmail = (value: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
};

const ContactDialog: React.FC<ContactDialogProps> = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState(TOPICS[0].value);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const trimmedMessage = message.trim();
  const remainingCharacters = useMemo(
    () => MAX_MESSAGE_LENGTH - message.length,
    [message.length]
  );

  if (!isOpen) return null;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    const cleanedEmail = email.trim();
    const cleanedName = name.trim();

    if (!cleanedEmail || !isValidEmail(cleanedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!topic) {
      setError('Please select a topic.');
      return;
    }

    if (!trimmedMessage) {
      setError('Please write a message before submitting.');
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({
        name: cleanedName || undefined,
        email: cleanedEmail,
        topic,
        message: trimmedMessage,
      });

      setName('');
      setEmail('');
      setTopic(TOPICS[0].value);
      setMessage('');
      onClose();
    } catch {
      setError('We could not send your message right now. Please try again in a moment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-backdrop" role="presentation" onClick={onClose}>
      <div
        className="contact-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="contact-header">
          <h2 id="contact-title">Contact Us</h2>
          <button
            type="button"
            className="contact-close-button"
            aria-label="Close contact dialog"
            onClick={onClose}
          >
            x
          </button>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="contact-name">Name (optional)</label>
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value.slice(0, MAX_NAME_LENGTH))}
            placeholder="Your name"
            maxLength={MAX_NAME_LENGTH}
          />

          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            inputMode="email"
          />

          <label htmlFor="contact-topic">Topic</label>
          <select
            id="contact-topic"
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
          >
            {TOPICS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>

          <label htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            value={message}
            onChange={(event) => setMessage(event.target.value.slice(0, MAX_MESSAGE_LENGTH))}
            rows={6}
            placeholder="Write your message..."
          />

          <div className="contact-meta">
            <small>{remainingCharacters} characters remaining</small>
            {error && <small className="contact-error">{error}</small>}
          </div>

          <button
            type="submit"
            className="contact-submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactDialog;

