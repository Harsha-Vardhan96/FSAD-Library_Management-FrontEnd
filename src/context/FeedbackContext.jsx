import React, { createContext, useContext, useState } from 'react';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  // In-memory UI state for session feedback.
  // Note: True persistent cross-device feedback storage requires backend API endpoints in a future backend phase.
  const [feedbacks, setFeedbacks] = useState([]);

  const addFeedback = (message) => {
    const newFeedback = {
      id: Date.now(),
      message,
      timestamp: new Date().toISOString(),
      status: 'unread',
    };
    setFeedbacks((prev) => [newFeedback, ...prev]);
  };

  const markAsRead = (id) => {
    setFeedbacks((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: 'read' } : f))
    );
  };

  const deleteFeedback = (id) => {
    setFeedbacks((prev) => prev.filter((f) => f.id !== id));
  };

  const unreadCount = feedbacks.filter((f) => f.status === 'unread').length;

  return (
    <FeedbackContext.Provider value={{ feedbacks, addFeedback, markAsRead, deleteFeedback, unreadCount }}>
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => useContext(FeedbackContext);
