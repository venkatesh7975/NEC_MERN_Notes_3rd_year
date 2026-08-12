import React, { useState, useTransition } from 'react';

export default function OptimisticQuizSubmit({ quizId = 'q101' }) {
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(async () => {
      // Optimistically update UI immediately
      setSubmitted(true);
      
      // Simulate backend network API delay
      await new Promise(r => setTimeout(r, 1000));
    });
  };

  return (
    <div style={{ padding: '20px', background: '#0f172a', color: 'white', borderRadius: '12px' }}>
      <h3>Quiz Completion Submission</h3>
      {submitted ? (
        <div style={{ color: '#4ade80' }}>
          ✓ Quiz Submitted Successfully! {isPending && '(Syncing with cloud server...)'}
        </div>
      ) : (
        <button onClick={handleSubmit} disabled={isPending}>
          Submit Answers Now
        </button>
      )}
    </div>
  );
}
