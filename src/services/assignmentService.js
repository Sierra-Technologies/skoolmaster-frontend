import { apiClient } from './api';
import ENDPOINTS from '../config/endpoints';

/**
 * Assignment Service
 * Handles all assignment-related API calls
 */
const assignmentService = {
  /**
   * Get all assignments
   * @param {Object} params - Query parameters (page, limit, search, status, etc.)
   * @returns {Promise<Object>} Assignments list with pagination
   */
  getAll: async (params = {}) => {
    const response = await apiClient.get(ENDPOINTS.ASSIGNMENTS.LIST, { params });
    return response.data;
  },

  /**
   * Get assignment by ID
   * @param {string} id - Assignment ID
   * @returns {Promise<Object>} Assignment data
   */
  getById: async (id) => {
    const response = await apiClient.get(ENDPOINTS.ASSIGNMENTS.GET(id));
    return response.data;
  },

  /**
   * Create new assignment
   * @param {Object} assignmentData - Assignment information
   * @returns {Promise<Object>} Created assignment data
   */
  create: async (assignmentData) => {
    const response = await apiClient.post(ENDPOINTS.ASSIGNMENTS.CREATE, assignmentData);
    return response.data;
  },

  /**
   * Update assignment
   * @param {string} id - Assignment ID
   * @param {Object} assignmentData - Updated assignment information
   * @returns {Promise<Object>} Updated assignment data
   */
  update: async (id, assignmentData) => {
    const response = await apiClient.put(ENDPOINTS.ASSIGNMENTS.UPDATE(id), assignmentData);
    return response.data;
  },

  /**
   * Delete assignment
   * @param {string} id - Assignment ID
   * @returns {Promise<Object>} Deletion confirmation
   */
  delete: async (id) => {
    const response = await apiClient.delete(ENDPOINTS.ASSIGNMENTS.DELETE(id));
    return response.data;
  },

  /**
   * Get assignments for a specific class
   * @param {string} classId - Class ID
   * @param {Object} params - Query parameters (subject, status, etc.)
   * @returns {Promise<Object>} Class assignments
   */
  getByClass: async (classId, params = {}) => {
    const response = await apiClient.get(ENDPOINTS.ASSIGNMENTS.BY_CLASS(classId), { params });
    return response.data;
  },

  /**
   * Get assignments for a specific subject
   * @param {string} subjectId - Subject ID
   * @param {Object} params - Query parameters (class, status, etc.)
   * @returns {Promise<Object>} Subject assignments
   */
  getBySubject: async (subjectId, params = {}) => {
    const response = await apiClient.get(ENDPOINTS.ASSIGNMENTS.BY_SUBJECT(subjectId), { params });
    return response.data;
  },

  /**
   * Get assignments for a specific student
   * @param {string} studentId - Student ID
   * @param {Object} params - Query parameters (status, subject, etc.)
   * @returns {Promise<Object>} Student assignments
   */
  getByStudent: async (studentId, params = {}) => {
    const response = await apiClient.get(ENDPOINTS.ASSIGNMENTS.BY_STUDENT(studentId), { params });
    return response.data;
  },

  /**
   * Submit assignment
   * @param {string} id - Assignment ID
   * @param {FormData} submissionData - Submission data with files
   * @returns {Promise<Object>} Submission confirmation
   */
  submit: async (id, submissionData) => {
    const response = await apiClient.post(ENDPOINTS.ASSIGNMENTS.SUBMIT(id), submissionData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  /**
   * Get submissions for an assignment
   * @param {string} id - Assignment ID
   * @param {Object} params - Query parameters (page, limit, status, etc.)
   * @returns {Promise<Object>} Submissions list
   */
  getSubmissions: async (id, params = {}) => {
    const response = await apiClient.get(ENDPOINTS.ASSIGNMENTS.SUBMISSIONS(id), { params });
    return response.data;
  },

  /**
   * Grade a submission
   * @param {string} id - Assignment ID
   * @param {string} submissionId - Submission ID
   * @param {Object} gradeData - Grade data { marks, feedback, etc. }
   * @returns {Promise<Object>} Graded submission
   */
  gradeSubmission: async (id, submissionId, gradeData) => {
    const response = await apiClient.put(
      ENDPOINTS.ASSIGNMENTS.GRADE_SUBMISSION(id, submissionId),
      gradeData
    );
    return response.data;
  },
};

export default assignmentService;
