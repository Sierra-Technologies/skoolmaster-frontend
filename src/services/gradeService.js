import { apiClient } from './api';
import ENDPOINTS from '../config/endpoints';

/**
 * Grade Service
 * Handles all grade-related API calls
 */
const gradeService = {
  /**
   * Get all grades
   * @param {Object} params - Query parameters (page, limit, search, subject, etc.)
   * @returns {Promise<Object>} Grades list with pagination
   */
  getAll: async (params = {}) => {
    const response = await apiClient.get(ENDPOINTS.GRADES.LIST, { params });
    return response.data;
  },

  /**
   * Get grade by ID
   * @param {string} id - Grade ID
   * @returns {Promise<Object>} Grade data
   */
  getById: async (id) => {
    const response = await apiClient.get(ENDPOINTS.GRADES.GET(id));
    return response.data;
  },

  /**
   * Create new grade
   * @param {Object} gradeData - Grade information
   * @returns {Promise<Object>} Created grade data
   */
  create: async (gradeData) => {
    const response = await apiClient.post(ENDPOINTS.GRADES.CREATE, gradeData);
    return response.data;
  },

  /**
   * Update grade
   * @param {string} id - Grade ID
   * @param {Object} gradeData - Updated grade information
   * @returns {Promise<Object>} Updated grade data
   */
  update: async (id, gradeData) => {
    const response = await apiClient.put(ENDPOINTS.GRADES.UPDATE(id), gradeData);
    return response.data;
  },

  /**
   * Delete grade
   * @param {string} id - Grade ID
   * @returns {Promise<Object>} Deletion confirmation
   */
  delete: async (id) => {
    const response = await apiClient.delete(ENDPOINTS.GRADES.DELETE(id));
    return response.data;
  },

  /**
   * Get grades for a specific student
   * @param {string} studentId - Student ID
   * @param {Object} params - Query parameters (subject, term, year, etc.)
   * @returns {Promise<Object>} Student grades
   */
  getByStudent: async (studentId, params = {}) => {
    const response = await apiClient.get(ENDPOINTS.GRADES.BY_STUDENT(studentId), { params });
    return response.data;
  },

  /**
   * Get grades for a specific class
   * @param {string} classId - Class ID
   * @param {Object} params - Query parameters (subject, term, etc.)
   * @returns {Promise<Object>} Class grades
   */
  getByClass: async (classId, params = {}) => {
    const response = await apiClient.get(ENDPOINTS.GRADES.BY_CLASS(classId), { params });
    return response.data;
  },

  /**
   * Get grades for a specific subject
   * @param {string} subjectId - Subject ID
   * @param {Object} params - Query parameters (class, term, etc.)
   * @returns {Promise<Object>} Subject grades
   */
  getBySubject: async (subjectId, params = {}) => {
    const response = await apiClient.get(ENDPOINTS.GRADES.BY_SUBJECT(subjectId), { params });
    return response.data;
  },

  /**
   * Bulk update multiple grades
   * @param {Object} gradesData - Array of grades to update
   * @returns {Promise<Object>} Bulk update result
   */
  bulkUpdate: async (gradesData) => {
    const response = await apiClient.post(ENDPOINTS.GRADES.BULK_UPDATE, gradesData);
    return response.data;
  },

  /**
   * Export grades data
   * @param {Object} params - Export parameters (format, filters, subject, class, etc.)
   * @returns {Promise<Blob>} Export file
   */
  export: async (params = {}) => {
    const response = await apiClient.get(ENDPOINTS.GRADES.EXPORT, {
      params,
      responseType: 'blob',
    });
    return response.data;
  },
};

export default gradeService;
