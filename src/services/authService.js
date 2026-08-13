/**
 * Authentication Service
 * Centralizes user login, signup, forgot password, and reset password API calls.
 */

import apiClient from './apiClient';

export const loginUser = async ({ email, password, role }) => {
  return await apiClient.post('/api/login', { email, password, role });
};

export const signUpUser = async ({ name, email, password, role }) => {
  return await apiClient.post('/api/signup', { name, email, password, role });
};

export const requestPasswordReset = async (email) => {
  return await apiClient.post('/api/forgot-password', { email });
};

export const resetPassword = async (email, otp, newPassword) => {
  return await apiClient.post('/api/reset-password', { email, otp, newPassword });
};

const authService = {
  loginUser,
  signUpUser,
  requestPasswordReset,
  resetPassword,
};

export default authService;
