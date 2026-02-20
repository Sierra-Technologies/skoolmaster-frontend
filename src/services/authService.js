import { apiClient } from './api';
import ENDPOINTS from '../config/endpoints';

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */
const authService = {
  /**
   * Login user
   * @param {Object} credentials - { email, password }
   * @returns {Promise<Object>} User data and token
   */
  login: async (credentials) => {
    const response = await apiClient.post(ENDPOINTS.AUTH.LOGIN, credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      if (response.data.refreshToken) {
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
    }
    return response.data;
  },

  /**
   * Logout user
   * @returns {Promise<void>}
   */
  logout: async () => {
    try {
      await apiClient.post(ENDPOINTS.AUTH.LOGOUT);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
  },

  /**
   * Register new user
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} Created user data
   */
  register: async (userData) => {
    const response = await apiClient.post(ENDPOINTS.AUTH.REGISTER, userData);
    return response.data;
  },

  /**
   * Refresh authentication token
   * @param {string} refreshToken - Refresh token
   * @returns {Promise<Object>} New token data
   */
  refreshToken: async (refreshToken) => {
    const response = await apiClient.post(ENDPOINTS.AUTH.REFRESH, { refreshToken });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  /**
   * Request password reset
   * @param {string} email - User email
   * @returns {Promise<Object>} Reset request confirmation
   */
  forgotPassword: async (email) => {
    const response = await apiClient.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
    return response.data;
  },

  /**
   * Reset password with token
   * @param {Object} data - { token, password, confirmPassword }
   * @returns {Promise<Object>} Reset confirmation
   */
  resetPassword: async (data) => {
    const response = await apiClient.post(ENDPOINTS.AUTH.RESET_PASSWORD, data);
    return response.data;
  },

  /**
   * Verify email address
   * @param {string} token - Verification token
   * @returns {Promise<Object>} Verification confirmation
   */
  verifyEmail: async (token) => {
    const response = await apiClient.post(ENDPOINTS.AUTH.VERIFY_EMAIL, { token });
    return response.data;
  },

  /**
   * Change password for logged-in user
   * @param {Object} data - { currentPassword, newPassword, confirmPassword }
   * @returns {Promise<Object>} Change confirmation
   */
  changePassword: async (data) => {
    const response = await apiClient.post(ENDPOINTS.AUTH.CHANGE_PASSWORD, data);
    return response.data;
  },

  /**
   * Get current user data
   * @returns {Promise<Object>} Current user data
   */
  getCurrentUser: async () => {
    const response = await apiClient.get(ENDPOINTS.AUTH.ME);
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} Authentication status
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  /**
   * Get stored user data
   * @returns {Object|null} User data from localStorage
   */
  getStoredUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
};

export default authService;
