import { apiClient } from './api';
import ENDPOINTS from '../config/endpoints';

/**
 * Parent Service
 * Handles all parent-related API calls
 */
const parentService = {
  /**
   * Get all parents
   * @param {Object} params - Query parameters (page, limit, search, etc.)
   * @returns {Promise<Object>} Parents list with pagination
   */
  getAll: async (params = {}) => {
    const response = await apiClient.get(ENDPOINTS.PARENTS.LIST, { params });
    return response.data;
  },

  /**
   * Get parent by ID
   * @param {string} id - Parent ID
   * @returns {Promise<Object>} Parent data
   */
  getById: async (id) => {
    const response = await apiClient.get(ENDPOINTS.PARENTS.GET(id));
    return response.data;
  },

  /**
   * Create new parent
   * @param {Object} parentData - Parent information
   * @returns {Promise<Object>} Created parent data
   */
  create: async (parentData) => {
    const response = await apiClient.post(ENDPOINTS.PARENTS.CREATE, parentData);
    return response.data;
  },

  /**
   * Update parent
   * @param {string} id - Parent ID
   * @param {Object} parentData - Updated parent information
   * @returns {Promise<Object>} Updated parent data
   */
  update: async (id, parentData) => {
    const response = await apiClient.put(ENDPOINTS.PARENTS.UPDATE(id), parentData);
    return response.data;
  },

  /**
   * Delete parent
   * @param {string} id - Parent ID
   * @returns {Promise<Object>} Deletion confirmation
   */
  delete: async (id) => {
    const response = await apiClient.delete(ENDPOINTS.PARENTS.DELETE(id));
    return response.data;
  },

  /**
   * Get all children of parent
   * @param {string} id - Parent ID
   * @param {Object} params - Query parameters (status, class, etc.)
   * @returns {Promise<Object>} List of children
   */
  getChildren: async (id, params = {}) => {
    const response = await apiClient.get(ENDPOINTS.PARENTS.CHILDREN(id), { params });
    return response.data;
  },

  /**
   * Add child to parent
   * @param {string} id - Parent ID
   * @param {Object} childData - Child information { studentId } or child data
   * @returns {Promise<Object>} Updated parent data with children
   */
  addChild: async (id, childData) => {
    const response = await apiClient.post(ENDPOINTS.PARENTS.ADD_CHILD(id), childData);
    return response.data;
  },

  /**
   * Remove child from parent
   * @param {string} id - Parent ID
   * @param {string} childId - Child/Student ID
   * @returns {Promise<Object>} Updated parent data
   */
  removeChild: async (id, childId) => {
    const response = await apiClient.delete(ENDPOINTS.PARENTS.REMOVE_CHILD(id, childId));
    return response.data;
  },
};

export default parentService;
