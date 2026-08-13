/**
 * Activity Service
 * Centralizes activity log fetching API calls.
 */

import apiClient from './apiClient';

export const fetchActivities = async () => {
  return await apiClient.get('/api/activities');
};

const activityService = {
  fetchActivities,
};

export default activityService;
