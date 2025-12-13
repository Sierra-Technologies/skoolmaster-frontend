import axios from 'axios';
import { toast } from 'react-hot-toast';

// Base API URL - will be configured via environment variables
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token to requests
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request in development
    if (import.meta.env.DEV) {
      console.log('🚀 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
      });
    }

    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle responses and errors globally
api.interceptors.response.use(
  (response) => {
    // Log response in development
    if (import.meta.env.DEV) {
      console.log('✅ API Response:', {
        url: response.config.url,
        status: response.status,
        data: response.data,
      });
    }

    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - Token expired or invalid
          if (!originalRequest._retry) {
            originalRequest._retry = true;

            // Try to refresh token
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
              try {
                const response = await axios.post(`${BASE_URL}/auth/refresh`, {
                  refreshToken,
                });

                const { token } = response.data;
                localStorage.setItem('token', token);

                // Retry original request with new token
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return api(originalRequest);
              } catch (refreshError) {
                // Refresh failed - logout user
                handleLogout();
                return Promise.reject(refreshError);
              }
            } else {
              // No refresh token - logout user
              handleLogout();
            }
          }
          break;

        case 403:
          // Forbidden - User doesn't have permission
          toast.error('You do not have permission to perform this action');
          break;

        case 404:
          // Not found
          toast.error(data?.message || 'Resource not found');
          break;

        case 422:
          // Validation error
          if (data?.errors) {
            // Display first validation error
            const firstError = Object.values(data.errors)[0];
            toast.error(Array.isArray(firstError) ? firstError[0] : firstError);
          } else {
            toast.error(data?.message || 'Validation error');
          }
          break;

        case 429:
          // Too many requests
          toast.error('Too many requests. Please try again later.');
          break;

        case 500:
        case 502:
        case 503:
        case 504:
          // Server errors
          toast.error('Server error. Please try again later.');
          break;

        default:
          toast.error(data?.message || 'An error occurred');
      }

      console.error('❌ API Error:', {
        status,
        message: data?.message,
        errors: data?.errors,
      });
    } else if (error.request) {
      // Request made but no response received
      console.error('❌ Network Error:', error.message);
      toast.error('Network error. Please check your connection.');
    } else {
      // Error in request configuration
      console.error('❌ Request Configuration Error:', error.message);
      toast.error('Request failed. Please try again.');
    }

    return Promise.reject(error);
  }
);

// Helper function to handle logout
const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
  window.location.href = '/';
  toast.error('Session expired. Please login again.');
};

// Retry logic for failed requests
export const retryRequest = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) {
      throw error;
    }

    // Wait before retrying
    await new Promise(resolve => setTimeout(resolve, delay));

    // Exponential backoff
    return retryRequest(fn, retries - 1, delay * 2);
  }
};

// API methods with better error handling
export const apiClient = {
  get: (url, config) => api.get(url, config),
  post: (url, data, config) => api.post(url, data, config),
  put: (url, data, config) => api.put(url, data, config),
  patch: (url, data, config) => api.patch(url, data, config),
  delete: (url, config) => api.delete(url, config),
};

export default api;
