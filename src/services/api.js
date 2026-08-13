/**
 * Central API Gateway Re-export
 * Re-exports domain services (auth, pdf, activity, feedback) for unified access.
 */

export { apiClient, ApiError } from './apiClient';
export { loginUser, signUpUser, requestPasswordReset, resetPassword } from './authService';
export { fetchPDFs, createPDF, deletePDF } from './pdfService';
export { fetchActivities } from './activityService';
export { fetchFeedbacks, submitFeedback } from './feedbackService';
