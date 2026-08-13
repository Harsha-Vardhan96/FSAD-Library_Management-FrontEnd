/**
 * Feedback Service
 * Prepared service structure for feedback API communication.
 * Note: Backend feedback endpoints (/api/feedbacks) will be implemented in a future backend phase.
 */

import apiClient from './apiClient';

export const fetchFeedbacks = async () => {
  // Placeholder for future backend integration: return await apiClient.get('/api/feedbacks');
  return [];
};

export const submitFeedback = async (feedbackData) => {
  // Placeholder for future backend integration: return await apiClient.post('/api/feedbacks', feedbackData);
  return { status: 'success', message: 'Feedback submitted locally (backend endpoint pending).' };
};

const feedbackService = {
  fetchFeedbacks,
  submitFeedback,
};

export default feedbackService;
