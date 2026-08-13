/**
 * Centralized API Client for Library Management System
 * Handles base URL configuration, common headers, JSON request/response processing,
 * and structured HTTP error handling.
 */

const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl && envUrl.trim() !== '') {
    return envUrl.replace(/\/+$/, '');
  }
  return 'http://localhost:8080';
};

const API_BASE_URL = getApiBaseUrl();

/**
 * Helper to get authorization headers (for future JWT implementation)
 */
const getAuthHeaders = () => {
  const headers = {};
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      if (user && user.token) {
        headers['Authorization'] = `Bearer ${user.token}`;
      }
    } catch (e) {
      // Ignore invalid JSON in localStorage
    }
  }
  return headers;
};

/**
 * Custom API Error class providing status code and structured response details
 */
export class ApiError extends Error {
  constructor(message, status = 500, data = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Core HTTP request handler
 */
export const request = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
    ...options.headers,
  };

  const config = {
    ...options,
    headers: defaultHeaders,
  };

  if (config.body && typeof config.body === 'object' && !(config.body instanceof FormData)) {
    config.body = JSON.stringify(config.body);
  }

  let response;
  try {
    response = await fetch(url, config);
  } catch (netErr) {
    console.error(`[API Network Error] ${config.method || 'GET'} ${url}:`, netErr);
    throw new ApiError(
      'Backend server is unreachable. Please ensure the Spring Boot server is running on port 8080.',
      0
    );
  }

  let data = null;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  } else {
    const text = await response.text();
    if (text) {
      data = { message: text };
    }
  }

  if (!response.ok) {
    let errorMessage = data?.message || response.statusText || 'An unexpected error occurred.';

    switch (response.status) {
      case 400:
        errorMessage = data?.message || 'Invalid request parameters.';
        break;
      case 401:
        errorMessage = data?.message || 'Unauthorized access. Please log in.';
        break;
      case 403:
        errorMessage = data?.message || 'Access forbidden. Insufficient permissions.';
        break;
      case 404:
        errorMessage = data?.message || 'Requested resource not found.';
        break;
      case 409:
        errorMessage = data?.message || 'Conflict detected. Resource already exists.';
        break;
      case 413:
        errorMessage = data?.message || 'Uploaded file exceeds the allowed size limit.';
        break;
      case 500:
      default:
        errorMessage = data?.message || 'Internal server error. Please try again later.';
        break;
    }

    throw new ApiError(errorMessage, response.status, data);
  }

  return data;
};

export const apiClient = {
  get: (endpoint, headers) => request(endpoint, { method: 'GET', headers }),
  post: (endpoint, body, headers) => request(endpoint, { method: 'POST', body, headers }),
  put: (endpoint, body, headers) => request(endpoint, { method: 'PUT', body, headers }),
  delete: (endpoint, headers) => request(endpoint, { method: 'DELETE', headers }),
  getBaseUrl: () => API_BASE_URL,
};

export default apiClient;
