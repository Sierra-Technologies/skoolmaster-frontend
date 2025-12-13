import { apiClient } from './api';
import ENDPOINTS from '../config/endpoints';

/**
 * Fee Service
 * Handles all fee and payment-related API calls
 */
const feeService = {
  /**
   * Get all fees
   * @param {Object} params - Query parameters (page, limit, search, status, etc.)
   * @returns {Promise<Object>} Fees list with pagination
   */
  getAll: async (params = {}) => {
    const response = await apiClient.get(ENDPOINTS.FEES.LIST, { params });
    return response.data;
  },

  /**
   * Get fee by ID
   * @param {string} id - Fee ID
   * @returns {Promise<Object>} Fee data
   */
  getById: async (id) => {
    const response = await apiClient.get(ENDPOINTS.FEES.GET(id));
    return response.data;
  },

  /**
   * Create new fee
   * @param {Object} feeData - Fee information
   * @returns {Promise<Object>} Created fee data
   */
  create: async (feeData) => {
    const response = await apiClient.post(ENDPOINTS.FEES.CREATE, feeData);
    return response.data;
  },

  /**
   * Update fee
   * @param {string} id - Fee ID
   * @param {Object} feeData - Updated fee information
   * @returns {Promise<Object>} Updated fee data
   */
  update: async (id, feeData) => {
    const response = await apiClient.put(ENDPOINTS.FEES.UPDATE(id), feeData);
    return response.data;
  },

  /**
   * Delete fee
   * @param {string} id - Fee ID
   * @returns {Promise<Object>} Deletion confirmation
   */
  delete: async (id) => {
    const response = await apiClient.delete(ENDPOINTS.FEES.DELETE(id));
    return response.data;
  },

  /**
   * Get fees for a specific student
   * @param {string} studentId - Student ID
   * @param {Object} params - Query parameters (status, term, year, etc.)
   * @returns {Promise<Object>} Student fees
   */
  getByStudent: async (studentId, params = {}) => {
    const response = await apiClient.get(ENDPOINTS.FEES.BY_STUDENT(studentId), { params });
    return response.data;
  },

  /**
   * Process payment for fees
   * @param {Object} paymentData - Payment information { studentId, amount, method, etc. }
   * @returns {Promise<Object>} Payment result and receipt info
   */
  makePayment: async (paymentData) => {
    const response = await apiClient.post(ENDPOINTS.FEES.PAYMENT, paymentData);
    return response.data;
  },

  /**
   * Get payment history for a student
   * @param {string} studentId - Student ID
   * @param {Object} params - Query parameters (page, limit, etc.)
   * @returns {Promise<Object>} Payment history
   */
  getPaymentHistory: async (studentId, params = {}) => {
    const response = await apiClient.get(ENDPOINTS.FEES.PAYMENT_HISTORY(studentId), { params });
    return response.data;
  },

  /**
   * Get payment receipt
   * @param {string} paymentId - Payment ID
   * @returns {Promise<Object>} Receipt data
   */
  getReceipt: async (paymentId) => {
    const response = await apiClient.get(ENDPOINTS.FEES.RECEIPT(paymentId));
    return response.data;
  },

  /**
   * Get pending fees
   * @param {Object} params - Query parameters (page, limit, class, etc.)
   * @returns {Promise<Object>} Pending fees list
   */
  getPending: async (params = {}) => {
    const response = await apiClient.get(ENDPOINTS.FEES.PENDING, { params });
    return response.data;
  },

  /**
   * Get overdue fees
   * @param {Object} params - Query parameters (page, limit, class, days, etc.)
   * @returns {Promise<Object>} Overdue fees list
   */
  getOverdue: async (params = {}) => {
    const response = await apiClient.get(ENDPOINTS.FEES.OVERDUE, { params });
    return response.data;
  },

  /**
   * Export fees data
   * @param {Object} params - Export parameters (format, filters, status, etc.)
   * @returns {Promise<Blob>} Export file
   */
  export: async (params = {}) => {
    const response = await apiClient.get(ENDPOINTS.FEES.EXPORT, {
      params,
      responseType: 'blob',
    });
    return response.data;
  },
};

export default feeService;
