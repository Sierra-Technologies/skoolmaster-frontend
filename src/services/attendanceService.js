import { apiClient } from './api';
import ENDPOINTS from '../config/endpoints';

/**
 * Attendance Service
 * Handles all attendance-related API calls
 */
const attendanceService = {
  /**
   * Get all attendance records
   * @param {Object} params - Query parameters (page, limit, search, date, class, etc.)
   * @returns {Promise<Object>} Attendance records with pagination
   */
  getAll: async (params = {}) => {
    const response = await apiClient.get(ENDPOINTS.ATTENDANCE.LIST, { params });
    return response.data;
  },

  /**
   * Get attendance record by ID
   * @param {string} id - Attendance ID
   * @returns {Promise<Object>} Attendance record data
   */
  getById: async (id) => {
    const response = await apiClient.get(ENDPOINTS.ATTENDANCE.GET(id));
    return response.data;
  },

  /**
   * Create new attendance record
   * @param {Object} attendanceData - Attendance information
   * @returns {Promise<Object>} Created attendance record
   */
  create: async (attendanceData) => {
    const response = await apiClient.post(ENDPOINTS.ATTENDANCE.CREATE, attendanceData);
    return response.data;
  },

  /**
   * Update attendance record
   * @param {string} id - Attendance ID
   * @param {Object} attendanceData - Updated attendance information
   * @returns {Promise<Object>} Updated attendance record
   */
  update: async (id, attendanceData) => {
    const response = await apiClient.put(ENDPOINTS.ATTENDANCE.UPDATE(id), attendanceData);
    return response.data;
  },

  /**
   * Delete attendance record
   * @param {string} id - Attendance ID
   * @returns {Promise<Object>} Deletion confirmation
   */
  delete: async (id) => {
    const response = await apiClient.delete(ENDPOINTS.ATTENDANCE.DELETE(id));
    return response.data;
  },

  /**
   * Get attendance records for a specific student
   * @param {string} studentId - Student ID
   * @param {Object} params - Query parameters (month, term, year, etc.)
   * @returns {Promise<Object>} Student attendance records
   */
  getByStudent: async (studentId, params = {}) => {
    const response = await apiClient.get(ENDPOINTS.ATTENDANCE.BY_STUDENT(studentId), { params });
    return response.data;
  },

  /**
   * Get attendance records for a specific class
   * @param {string} classId - Class ID
   * @param {Object} params - Query parameters (date, month, etc.)
   * @returns {Promise<Object>} Class attendance records
   */
  getByClass: async (classId, params = {}) => {
    const response = await apiClient.get(ENDPOINTS.ATTENDANCE.BY_CLASS(classId), { params });
    return response.data;
  },

  /**
   * Get attendance records for a specific date
   * @param {string} date - Date (YYYY-MM-DD format)
   * @param {Object} params - Query parameters (class, etc.)
   * @returns {Promise<Object>} Attendance records for date
   */
  getByDate: async (date, params = {}) => {
    const response = await apiClient.get(ENDPOINTS.ATTENDANCE.BY_DATE(date), { params });
    return response.data;
  },

  /**
   * Mark attendance for a student
   * @param {Object} attendanceData - Attendance data { studentId, date, status, etc. }
   * @returns {Promise<Object>} Created/Updated attendance record
   */
  markAttendance: async (attendanceData) => {
    const response = await apiClient.post(ENDPOINTS.ATTENDANCE.MARK_ATTENDANCE, attendanceData);
    return response.data;
  },

  /**
   * Bulk mark attendance for multiple students
   * @param {Array} attendanceArray - Array of attendance records
   * @returns {Promise<Object>} Bulk mark result
   */
  bulkMark: async (attendanceArray) => {
    const response = await apiClient.post(ENDPOINTS.ATTENDANCE.BULK_MARK, { records: attendanceArray });
    return response.data;
  },

  /**
   * Get attendance report
   * @param {Object} params - Report parameters (class, month, year, etc.)
   * @returns {Promise<Object>} Attendance report data
   */
  getReport: async (params = {}) => {
    const response = await apiClient.get(ENDPOINTS.ATTENDANCE.REPORT, { params });
    return response.data;
  },

  /**
   * Export attendance data
   * @param {Object} params - Export parameters (format, filters, date range, etc.)
   * @returns {Promise<Blob>} Export file
   */
  export: async (params = {}) => {
    const response = await apiClient.get(ENDPOINTS.ATTENDANCE.EXPORT, {
      params,
      responseType: 'blob',
    });
    return response.data;
  },
};

export default attendanceService;
