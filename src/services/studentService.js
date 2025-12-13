import { apiClient } from './api';
import ENDPOINTS from '../config/endpoints';

/**
 * Student Service
 * Handles all student-related API calls
 */
const studentService = {
  /**
   * Get all students
   * @param {Object} params - Query parameters (page, limit, search, class, etc.)
   * @returns {Promise<Object>} Students list with pagination
   */
  getAll: async (params = {}) => {
    const response = await apiClient.get(ENDPOINTS.STUDENTS.LIST, { params });
    return response.data;
  },

  /**
   * Get student by ID
   * @param {string} id - Student ID
   * @returns {Promise<Object>} Student data
   */
  getById: async (id) => {
    const response = await apiClient.get(ENDPOINTS.STUDENTS.GET(id));
    return response.data;
  },

  /**
   * Create new student
   * @param {Object} studentData - Student information
   * @returns {Promise<Object>} Created student data
   */
  create: async (studentData) => {
    const response = await apiClient.post(ENDPOINTS.STUDENTS.CREATE, studentData);
    return response.data;
  },

  /**
   * Update student
   * @param {string} id - Student ID
   * @param {Object} studentData - Updated student information
   * @returns {Promise<Object>} Updated student data
   */
  update: async (id, studentData) => {
    const response = await apiClient.put(ENDPOINTS.STUDENTS.UPDATE(id), studentData);
    return response.data;
  },

  /**
   * Delete student
   * @param {string} id - Student ID
   * @returns {Promise<Object>} Deletion confirmation
   */
  delete: async (id) => {
    const response = await apiClient.delete(ENDPOINTS.STUDENTS.DELETE(id));
    return response.data;
  },

  /**
   * Get student grades
   * @param {string} id - Student ID
   * @param {Object} params - Query parameters (subject, term, etc.)
   * @returns {Promise<Object>} Student grades
   */
  getGrades: async (id, params = {}) => {
    const response = await apiClient.get(ENDPOINTS.STUDENTS.GRADES(id), { params });
    return response.data;
  },

  /**
   * Get student attendance
   * @param {string} id - Student ID
   * @param {Object} params - Query parameters (subject, month, etc.)
   * @returns {Promise<Object>} Student attendance records
   */
  getAttendance: async (id, params = {}) => {
    const response = await apiClient.get(ENDPOINTS.STUDENTS.ATTENDANCE(id), { params });
    return response.data;
  },

  /**
   * Get student assignments
   * @param {string} id - Student ID
   * @param {Object} params - Query parameters (status, subject, etc.)
   * @returns {Promise<Object>} Student assignments
   */
  getAssignments: async (id, params = {}) => {
    const response = await apiClient.get(ENDPOINTS.STUDENTS.ASSIGNMENTS(id), { params });
    return response.data;
  },

  /**
   * Get student fees
   * @param {string} id - Student ID
   * @param {Object} params - Query parameters (status, term, etc.)
   * @returns {Promise<Object>} Student fee records
   */
  getFees: async (id, params = {}) => {
    const response = await apiClient.get(ENDPOINTS.STUDENTS.FEES(id), { params });
    return response.data;
  },

  /**
   * Get student timetable
   * @param {string} id - Student ID
   * @returns {Promise<Object>} Student timetable
   */
  getTimetable: async (id) => {
    const response = await apiClient.get(ENDPOINTS.STUDENTS.TIMETABLE(id));
    return response.data;
  },

  /**
   * Get student report card
   * @param {string} id - Student ID
   * @param {Object} params - Query parameters (term, year, etc.)
   * @returns {Promise<Object>} Report card data
   */
  getReportCard: async (id, params = {}) => {
    const response = await apiClient.get(ENDPOINTS.STUDENTS.REPORT_CARD(id), { params });
    return response.data;
  },

  /**
   * Bulk import students
   * @param {FormData} formData - CSV/Excel file with student data
   * @returns {Promise<Object>} Import result
   */
  bulkImport: async (formData) => {
    const response = await apiClient.post(ENDPOINTS.STUDENTS.BULK_IMPORT, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  /**
   * Export students data
   * @param {Object} params - Export parameters (format, filters, etc.)
   * @returns {Promise<Blob>} Export file
   */
  export: async (params = {}) => {
    const response = await apiClient.get(ENDPOINTS.STUDENTS.EXPORT, {
      params,
      responseType: 'blob',
    });
    return response.data;
  },
};

export default studentService;
