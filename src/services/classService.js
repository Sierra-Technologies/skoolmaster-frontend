import { apiClient } from './api';
import ENDPOINTS from '../config/endpoints';

/**
 * Class Service
 * Handles all class-related API calls
 */
const classService = {
  /**
   * Get all classes
   * @param {Object} params - Query parameters (page, limit, search, level, etc.)
   * @returns {Promise<Object>} Classes list with pagination
   */
  getAll: async (params = {}) => {
    const response = await apiClient.get(ENDPOINTS.CLASSES.LIST, { params });
    return response.data;
  },

  /**
   * Get class by ID
   * @param {string} id - Class ID
   * @returns {Promise<Object>} Class data
   */
  getById: async (id) => {
    const response = await apiClient.get(ENDPOINTS.CLASSES.GET(id));
    return response.data;
  },

  /**
   * Create new class
   * @param {Object} classData - Class information
   * @returns {Promise<Object>} Created class data
   */
  create: async (classData) => {
    const response = await apiClient.post(ENDPOINTS.CLASSES.CREATE, classData);
    return response.data;
  },

  /**
   * Update class
   * @param {string} id - Class ID
   * @param {Object} classData - Updated class information
   * @returns {Promise<Object>} Updated class data
   */
  update: async (id, classData) => {
    const response = await apiClient.put(ENDPOINTS.CLASSES.UPDATE(id), classData);
    return response.data;
  },

  /**
   * Delete class
   * @param {string} id - Class ID
   * @returns {Promise<Object>} Deletion confirmation
   */
  delete: async (id) => {
    const response = await apiClient.delete(ENDPOINTS.CLASSES.DELETE(id));
    return response.data;
  },

  /**
   * Get students in class
   * @param {string} id - Class ID
   * @param {Object} params - Query parameters (page, limit, search, etc.)
   * @returns {Promise<Object>} List of students
   */
  getStudents: async (id, params = {}) => {
    const response = await apiClient.get(ENDPOINTS.CLASSES.STUDENTS(id), { params });
    return response.data;
  },

  /**
   * Add student to class
   * @param {string} id - Class ID
   * @param {Object} studentData - Student information { studentId } or data
   * @returns {Promise<Object>} Updated class data
   */
  addStudent: async (id, studentData) => {
    const response = await apiClient.post(ENDPOINTS.CLASSES.ADD_STUDENT(id), studentData);
    return response.data;
  },

  /**
   * Remove student from class
   * @param {string} id - Class ID
   * @param {string} studentId - Student ID
   * @returns {Promise<Object>} Updated class data
   */
  removeStudent: async (id, studentId) => {
    const response = await apiClient.delete(ENDPOINTS.CLASSES.REMOVE_STUDENT(id, studentId));
    return response.data;
  },

  /**
   * Get teachers assigned to class
   * @param {string} id - Class ID
   * @param {Object} params - Query parameters (subject, etc.)
   * @returns {Promise<Object>} List of teachers
   */
  getTeachers: async (id, params = {}) => {
    const response = await apiClient.get(ENDPOINTS.CLASSES.TEACHERS(id), { params });
    return response.data;
  },

  /**
   * Assign teacher to class
   * @param {string} id - Class ID
   * @param {Object} teacherData - Teacher information { teacherId, subject } or data
   * @returns {Promise<Object>} Updated class data
   */
  assignTeacher: async (id, teacherData) => {
    const response = await apiClient.post(ENDPOINTS.CLASSES.ASSIGN_TEACHER(id), teacherData);
    return response.data;
  },

  /**
   * Get subjects for class
   * @param {string} id - Class ID
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} List of subjects
   */
  getSubjects: async (id, params = {}) => {
    const response = await apiClient.get(ENDPOINTS.CLASSES.SUBJECTS(id), { params });
    return response.data;
  },

  /**
   * Get class timetable
   * @param {string} id - Class ID
   * @param {Object} params - Query parameters (term, year, etc.)
   * @returns {Promise<Object>} Class timetable
   */
  getTimetable: async (id, params = {}) => {
    const response = await apiClient.get(ENDPOINTS.CLASSES.TIMETABLE(id), { params });
    return response.data;
  },
};

export default classService;
