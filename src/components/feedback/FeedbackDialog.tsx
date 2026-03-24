import React, { useMemo, useState } from 'react';
import './FeedbackDialog.css';

interface FeedbackPayload {
  name?: string;
  rating: number;
  comments?: string;
}

interface FeedbackDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: FeedbackPayload) => Promise<void>;
}

const MAX_COMMENTS_LENGTH = 1000;
const RATING_LABELS: Record<number, string> = {
  1: 'Very bad',
  2: 'Bad',
  3: 'Good',
  4: 'Very good',
  5: 'Excellent',
};
const RATING_TONE_CLASS: Record<number, string> = {
  1: 'tone-low',
  2: 'tone-low',
  3: 'tone-mid',
  4: 'tone-high',
  5: 'tone-high',
};

const FeedbackDialog: React.FC<FeedbackDialogProps> = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remainingCharacters = useMemo(
    () => MAX_COMMENTS_LENGTH - comments.length,
    [comments.length]
  );

  if (!isOpen) return null;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (rating === null) {
      setError('Please choose a star rating before submitting.');
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({
        name: name.trim() || undefined,
        rating,
        comments: comments.trim() || undefined,
      });

      setName('');
      setRating(null);
      setComments('');
      onClose();
    } catch {
      setError('We could not submit your feedback right now. Please try again in a moment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="feedback-backdrop" role="presentation" onClick={onClose}>
      <div
        className="feedback-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="feedback-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="feedback-header">
          <h2 id="feedback-title">Share feedback</h2>
          <button
            type="button"
            className="feedback-close-button"
            aria-label="Close feedback dialog"
            onClick={onClose}
          >
            x
          </button>
        </div>

        <form className="feedback-form" onSubmit={handleSubmit}>
          <label htmlFor="feedback-name">Name (optional)</label>
          <input
            id="feedback-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
            maxLength={120}
          />

          <fieldset className="feedback-rating">
            <legend>Rating (required)</legend>
            <div className="feedback-stars" aria-label="Rate between 1 and 5 stars">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  type="button"
                  key={value}
                  className={`star-button ${rating !== null && value <= rating ? 'selected' : ''}`}
                  onClick={() => setRating(value)}
                  aria-label={`${value} star${value > 1 ? 's' : ''}`}
                >
                  ★
                </button>
              ))}
              {rating !== null && (
                <button
                  type="button"
                  className="clear-rating-button"
                  onClick={() => setRating(null)}
                >
                  Clear
                </button>
              )}
            </div>
            <small
              className={`rating-label ${rating !== null ? RATING_TONE_CLASS[rating] : ''}`}
            >
              {rating !== null ? `Selected: ${RATING_LABELS[rating]}` : 'Select a rating'}
            </small>
          </fieldset>

          <label htmlFor="feedback-comments">Comments (optional)</label>
          <textarea
            id="feedback-comments"
            value={comments}
            onChange={(event) => setComments(event.target.value.slice(0, MAX_COMMENTS_LENGTH))}
            maxLength={MAX_COMMENTS_LENGTH}
            rows={6}
            placeholder="Tell us what worked well or what we should improve."
          />

          <div className="feedback-meta">
            <small>{remainingCharacters} characters remaining</small>
            {error && <small className="feedback-error">{error}</small>}
          </div>

          <button
            type="submit"
            className="feedback-submit-button"
            disabled={isSubmitting || rating === null}
          >
            {isSubmitting ? 'Submitting...' : 'Submit feedback'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackDialog;
