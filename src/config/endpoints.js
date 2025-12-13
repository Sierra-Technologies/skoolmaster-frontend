/**
 * API Endpoints Configuration
 * Centralized endpoint definitions for all API calls
 */

const ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
    CHANGE_PASSWORD: '/auth/change-password',
    ME: '/auth/me',
  },

  // Users
  USERS: {
    LIST: '/users',
    CREATE: '/users',
    GET: (id) => `/users/${id}`,
    UPDATE: (id) => `/users/${id}`,
    DELETE: (id) => `/users/${id}`,
    UPDATE_PROFILE: (id) => `/users/${id}/profile`,
    UPDATE_AVATAR: (id) => `/users/${id}/avatar`,
  },

  // Students
  STUDENTS: {
    LIST: '/students',
    CREATE: '/students',
    GET: (id) => `/students/${id}`,
    UPDATE: (id) => `/students/${id}`,
    DELETE: (id) => `/students/${id}`,
    GRADES: (id) => `/students/${id}/grades`,
    ATTENDANCE: (id) => `/students/${id}/attendance`,
    ASSIGNMENTS: (id) => `/students/${id}/assignments`,
    FEES: (id) => `/students/${id}/fees`,
    TIMETABLE: (id) => `/students/${id}/timetable`,
    REPORT_CARD: (id) => `/students/${id}/report-card`,
    BULK_IMPORT: '/students/bulk-import',
    EXPORT: '/students/export',
  },

  // Teachers
  TEACHERS: {
    LIST: '/teachers',
    CREATE: '/teachers',
    GET: (id) => `/teachers/${id}`,
    UPDATE: (id) => `/teachers/${id}`,
    DELETE: (id) => `/teachers/${id}`,
    CLASSES: (id) => `/teachers/${id}/classes`,
    STUDENTS: (id) => `/teachers/${id}/students`,
    SCHEDULE: (id) => `/teachers/${id}/schedule`,
    BULK_IMPORT: '/teachers/bulk-import',
    EXPORT: '/teachers/export',
  },

  // Parents
  PARENTS: {
    LIST: '/parents',
    CREATE: '/parents',
    GET: (id) => `/parents/${id}`,
    UPDATE: (id) => `/parents/${id}`,
    DELETE: (id) => `/parents/${id}`,
    CHILDREN: (id) => `/parents/${id}/children`,
    ADD_CHILD: (id) => `/parents/${id}/children`,
    REMOVE_CHILD: (id, childId) => `/parents/${id}/children/${childId}`,
  },

  // Classes
  CLASSES: {
    LIST: '/classes',
    CREATE: '/classes',
    GET: (id) => `/classes/${id}`,
    UPDATE: (id) => `/classes/${id}`,
    DELETE: (id) => `/classes/${id}`,
    STUDENTS: (id) => `/classes/${id}/students`,
    ADD_STUDENT: (id) => `/classes/${id}/students`,
    REMOVE_STUDENT: (id, studentId) => `/classes/${id}/students/${studentId}`,
    TEACHERS: (id) => `/classes/${id}/teachers`,
    ASSIGN_TEACHER: (id) => `/classes/${id}/teachers`,
    SUBJECTS: (id) => `/classes/${id}/subjects`,
    TIMETABLE: (id) => `/classes/${id}/timetable`,
  },

  // Subjects
  SUBJECTS: {
    LIST: '/subjects',
    CREATE: '/subjects',
    GET: (id) => `/subjects/${id}`,
    UPDATE: (id) => `/subjects/${id}`,
    DELETE: (id) => `/subjects/${id}`,
    TEACHERS: (id) => `/subjects/${id}/teachers`,
  },

  // Grades
  GRADES: {
    LIST: '/grades',
    CREATE: '/grades',
    GET: (id) => `/grades/${id}`,
    UPDATE: (id) => `/grades/${id}`,
    DELETE: (id) => `/grades/${id}`,
    BY_STUDENT: (studentId) => `/grades/student/${studentId}`,
    BY_CLASS: (classId) => `/grades/class/${classId}`,
    BY_SUBJECT: (subjectId) => `/grades/subject/${subjectId}`,
    BULK_UPDATE: '/grades/bulk-update',
    EXPORT: '/grades/export',
  },

  // Attendance
  ATTENDANCE: {
    LIST: '/attendance',
    CREATE: '/attendance',
    GET: (id) => `/attendance/${id}`,
    UPDATE: (id) => `/attendance/${id}`,
    DELETE: (id) => `/attendance/${id}`,
    BY_STUDENT: (studentId) => `/attendance/student/${studentId}`,
    BY_CLASS: (classId) => `/attendance/class/${classId}`,
    BY_DATE: (date) => `/attendance/date/${date}`,
    MARK_ATTENDANCE: '/attendance/mark',
    BULK_MARK: '/attendance/bulk-mark',
    REPORT: '/attendance/report',
    EXPORT: '/attendance/export',
  },

  // Assignments
  ASSIGNMENTS: {
    LIST: '/assignments',
    CREATE: '/assignments',
    GET: (id) => `/assignments/${id}`,
    UPDATE: (id) => `/assignments/${id}`,
    DELETE: (id) => `/assignments/${id}`,
    BY_CLASS: (classId) => `/assignments/class/${classId}`,
    BY_SUBJECT: (subjectId) => `/assignments/subject/${subjectId}`,
    BY_STUDENT: (studentId) => `/assignments/student/${studentId}`,
    SUBMIT: (id) => `/assignments/${id}/submit`,
    SUBMISSIONS: (id) => `/assignments/${id}/submissions`,
    GRADE_SUBMISSION: (id, submissionId) => `/assignments/${id}/submissions/${submissionId}/grade`,
  },

  // Exams
  EXAMS: {
    LIST: '/exams',
    CREATE: '/exams',
    GET: (id) => `/exams/${id}`,
    UPDATE: (id) => `/exams/${id}`,
    DELETE: (id) => `/exams/${id}`,
    BY_CLASS: (classId) => `/exams/class/${classId}`,
    SCHEDULE: '/exams/schedule',
    RESULTS: (id) => `/exams/${id}/results`,
    PUBLISH_RESULTS: (id) => `/exams/${id}/publish-results`,
  },

  // Fees
  FEES: {
    LIST: '/fees',
    CREATE: '/fees',
    GET: (id) => `/fees/${id}`,
    UPDATE: (id) => `/fees/${id}`,
    DELETE: (id) => `/fees/${id}`,
    BY_STUDENT: (studentId) => `/fees/student/${studentId}`,
    PAYMENT: '/fees/payment',
    PAYMENT_HISTORY: (studentId) => `/fees/student/${studentId}/history`,
    RECEIPT: (paymentId) => `/fees/payment/${paymentId}/receipt`,
    PENDING: '/fees/pending',
    OVERDUE: '/fees/overdue',
    EXPORT: '/fees/export',
  },

  // Timetable
  TIMETABLE: {
    LIST: '/timetable',
    CREATE: '/timetable',
    GET: (id) => `/timetable/${id}`,
    UPDATE: (id) => `/timetable/${id}`,
    DELETE: (id) => `/timetable/${id}`,
    BY_CLASS: (classId) => `/timetable/class/${classId}`,
    BY_TEACHER: (teacherId) => `/timetable/teacher/${teacherId}`,
    BY_STUDENT: (studentId) => `/timetable/student/${studentId}`,
    GENERATE: '/timetable/generate',
  },

  // Admissions
  ADMISSIONS: {
    LIST: '/admissions',
    CREATE: '/admissions',
    GET: (id) => `/admissions/${id}`,
    UPDATE: (id) => `/admissions/${id}`,
    DELETE: (id) => `/admissions/${id}`,
    APPROVE: (id) => `/admissions/${id}/approve`,
    REJECT: (id) => `/admissions/${id}/reject`,
    PENDING: '/admissions/pending',
  },

  // Communication
  MESSAGES: {
    LIST: '/messages',
    CREATE: '/messages',
    GET: (id) => `/messages/${id}`,
    UPDATE: (id) => `/messages/${id}`,
    DELETE: (id) => `/messages/${id}`,
    BY_USER: (userId) => `/messages/user/${userId}`,
    THREAD: (threadId) => `/messages/thread/${threadId}`,
    MARK_READ: (id) => `/messages/${id}/read`,
    UNREAD_COUNT: '/messages/unread-count',
  },

  // Notifications
  NOTIFICATIONS: {
    LIST: '/notifications',
    GET: (id) => `/notifications/${id}`,
    MARK_READ: (id) => `/notifications/${id}/read`,
    MARK_ALL_READ: '/notifications/mark-all-read',
    DELETE: (id) => `/notifications/${id}`,
    UNREAD_COUNT: '/notifications/unread-count',
    PREFERENCES: '/notifications/preferences',
  },

  // Reports
  REPORTS: {
    STUDENT_REPORT: (studentId) => `/reports/student/${studentId}`,
    CLASS_REPORT: (classId) => `/reports/class/${classId}`,
    ATTENDANCE_REPORT: '/reports/attendance',
    GRADE_REPORT: '/reports/grades',
    FEE_REPORT: '/reports/fees',
    ANALYTICS: '/reports/analytics',
    EXPORT: '/reports/export',
  },

  // Schools (Super Admin)
  SCHOOLS: {
    LIST: '/schools',
    CREATE: '/schools',
    GET: (id) => `/schools/${id}`,
    UPDATE: (id) => `/schools/${id}`,
    DELETE: (id) => `/schools/${id}`,
    STATS: (id) => `/schools/${id}/stats`,
    ACTIVATE: (id) => `/schools/${id}/activate`,
    DEACTIVATE: (id) => `/schools/${id}/deactivate`,
  },

  // Subscriptions (Super Admin)
  SUBSCRIPTIONS: {
    LIST: '/subscriptions',
    CREATE: '/subscriptions',
    GET: (id) => `/subscriptions/${id}`,
    UPDATE: (id) => `/subscriptions/${id}`,
    DELETE: (id) => `/subscriptions/${id}`,
    PLANS: '/subscriptions/plans',
    RENEW: (id) => `/subscriptions/${id}/renew`,
  },

  // Settings
  SETTINGS: {
    GET: '/settings',
    UPDATE: '/settings',
    ACADEMIC_YEAR: '/settings/academic-year',
    GENERAL: '/settings/general',
    EMAIL: '/settings/email',
    SMS: '/settings/sms',
  },

  // File Upload
  FILES: {
    UPLOAD: '/files/upload',
    DELETE: (id) => `/files/${id}`,
    GET: (id) => `/files/${id}`,
  },
};

export default ENDPOINTS;
