import { apiClient } from './api';
import ENDPOINTS from '../config/endpoints';

/**
 * Teacher Service
 * Handles all teacher-related API calls
 */
const teacherService = {
  /**
   * Get all teachers
   * @param {Object} params - Query parameters (page, limit, search, department, etc.)
   * @returns {Promise<Object>} Teachers list with pagination
   */
  getAll: async (params = {}) => {
    const response = await apiClient.get(ENDPOINTS.TEACHERS.LIST, { params });
    return response.data;
  },

  /**
   * Get teacher by ID
   * @param {string} id - Teacher ID
   * @returns {Promise<Object>} Teacher data
   */
  getById: async (id) => {
    const response = await apiClient.get(ENDPOINTS.TEACHERS.GET(id));
    return response.data;
  },

  /**
   * Create new teacher
   * @param {Object} teacherData - Teacher information
   * @returns {Promise<Object>} Created teacher data
   */
  create: async (teacherData) => {
    const response = await apiClient.post(ENDPOINTS.TEACHERS.CREATE, teacherData);
    return response.data;
  },

  /**
   * Update teacher
   * @param {string} id - Teacher ID
   * @param {Object} teacherData - Updated teacher information
   * @returns {Promise<Object>} Updated teacher data
   */
  update: async (id, teacherData) => {
    const response = await apiClient.put(ENDPOINTS.TEACHERS.UPDATE(id), teacherData);
    return response.data;
  },

  /**
   * Delete teacher
   * @param {string} id - Teacher ID
   * @returns {Promise<Object>} Deletion confirmation
   */
  delete: async (id) => {
    const response = await apiClient.delete(ENDPOINTS.TEACHERS.DELETE(id));
    return response.data;
  },

  /**
   * Get classes taught by teacher
   * @param {string} id - Teacher ID
   * @param {Object} params - Query parameters (term, year, etc.)
   * @returns {Promise<Object>} List of classes
   */
  getClasses: async (id, params = {}) => {
    const response = await apiClient.get(ENDPOINTS.TEACHERS.CLASSES(id), { params });
    return response.data;
  },

  /**
   * Get students taught by teacher
   * @param {string} id - Teacher ID
   * @param {Object} params - Query parameters (class, subject, etc.)
   * @returns {Promise<Object>} List of students
   */
  getStudents: async (id, params = {}) => {
    const response = await apiClient.get(ENDPOINTS.TEACHERS.STUDENTS(id), { params });
    return response.data;
  },

  /**
   * Get teacher schedule/timetable
   * @param {string} id - Teacher ID
   * @param {Object} params - Query parameters (term, year, etc.)
   * @returns {Promise<Object>} Teacher schedule
   */
  getSchedule: async (id, params = {}) => {
    const response = await apiClient.get(ENDPOINTS.TEACHERS.SCHEDULE(id), { params });
    return response.data;
  },

  /**
   * Bulk import teachers
   * @param {FormData} formData - CSV/Excel file with teacher data
   * @returns {Promise<Object>} Import result
   */
  bulkImport: async (formData) => {
    const response = await apiClient.post(ENDPOINTS.TEACHERS.BULK_IMPORT, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  /**
   * Export teachers data
   * @param {Object} params - Export parameters (format, filters, etc.)
   * @returns {Promise<Blob>} Export file
   */
  export: async (params = {}) => {
    const response = await apiClient.get(ENDPOINTS.TEACHERS.EXPORT, {
      params,
      responseType: 'blob',
    });
    return response.data;
  },
};

export default teacherService;
