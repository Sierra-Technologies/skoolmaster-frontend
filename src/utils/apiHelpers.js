/**
 * API Helper Utilities
 * Common functions for API operations
 */

/**
 * Build query string from object
 * @param {Object} params - Query parameters
 * @returns {string} Query string
 */
export const buildQueryString = (params) => {
  const filteredParams = Object.entries(params).reduce((acc, [key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      acc[key] = value;
    }
    return acc;
  }, {});

  return new URLSearchParams(filteredParams).toString();
};

/**
 * Download file from blob response
 * @param {Blob} blob - File blob
 * @param {string} filename - File name
 */
export const downloadFile = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

/**
 * Format error response for display
 * @param {Error} error - Error object
 * @returns {string} Formatted error message
 */
export const formatErrorMessage = (error) => {
  if (error.response) {
    // Server responded with error
    const { data } = error.response;

    if (data.errors && typeof data.errors === 'object') {
      // Validation errors
      return Object.values(data.errors)
        .flat()
        .join(', ');
    }

    return data.message || 'An error occurred';
  }

  if (error.request) {
    // Request made but no response
    return 'Network error. Please check your connection.';
  }

  // Error in request configuration
  return error.message || 'An error occurred';
};

/**
 * Check if error is network error
 * @param {Error} error - Error object
 * @returns {boolean} True if network error
 */
export const isNetworkError = (error) => {
  return !error.response && error.request;
};

/**
 * Check if error is authorization error
 * @param {Error} error - Error object
 * @returns {boolean} True if authorization error
 */
export const isAuthError = (error) => {
  return error.response && [401, 403].includes(error.response.status);
};

/**
 * Check if error is validation error
 * @param {Error} error - Error object
 * @returns {boolean} True if validation error
 */
export const isValidationError = (error) => {
  return error.response && error.response.status === 422;
};

/**
 * Extract validation errors from error response
 * @param {Error} error - Error object
 * @returns {Object} Validation errors object
 */
export const getValidationErrors = (error) => {
  if (isValidationError(error)) {
    return error.response.data.errors || {};
  }
  return {};
};

/**
 * Convert FormData to object
 * @param {FormData} formData - Form data
 * @returns {Object} Object representation
 */
export const formDataToObject = (formData) => {
  const object = {};
  formData.forEach((value, key) => {
    if (!Reflect.has(object, key)) {
      object[key] = value;
      return;
    }
    if (!Array.isArray(object[key])) {
      object[key] = [object[key]];
    }
    object[key].push(value);
  });
  return object;
};

/**
 * Convert object to FormData
 * @param {Object} object - Plain object
 * @returns {FormData} Form data
 */
export const objectToFormData = (object) => {
  const formData = new FormData();

  Object.entries(object).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          formData.append(`${key}[]`, item);
        });
      } else if (value instanceof File) {
        formData.append(key, value);
      } else if (typeof value === 'object' && !(value instanceof Date)) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    }
  });

  return formData;
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Retry API call with exponential backoff
 * @param {Function} apiCall - API function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} delay - Initial delay in milliseconds
 * @returns {Promise} API response
 */
export const retryWithBackoff = async (apiCall, maxRetries = 3, delay = 1000) => {
  let lastError;

  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await apiCall();
    } catch (error) {
      lastError = error;

      // Don't retry on client errors (4xx)
      if (error.response && error.response.status >= 400 && error.response.status < 500) {
        throw error;
      }

      // Don't retry if it's the last attempt
      if (i === maxRetries) {
        break;
      }

      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
    }
  }

  throw lastError;
};

/**
 * Create pagination params
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @param {Object} filters - Additional filters
 * @returns {Object} Pagination parameters
 */
export const createPaginationParams = (page = 1, limit = 10, filters = {}) => {
  return {
    page,
    limit,
    ...filters,
  };
};

/**
 * Parse pagination response
 * @param {Object} response - API response
 * @returns {Object} Parsed pagination data
 */
export const parsePaginationResponse = (response) => {
  return {
    data: response.data || [],
    total: response.total || 0,
    page: response.page || 1,
    limit: response.limit || 10,
    totalPages: response.totalPages || 1,
    hasMore: response.hasMore || false,
  };
};

/**
 * Create search params for autocomplete
 * @param {string} query - Search query
 * @param {Object} options - Additional options
 * @returns {Object} Search parameters
 */
export const createSearchParams = (query, options = {}) => {
  const { limit = 10, fields = [], ...rest } = options;

  return {
    q: query,
    limit,
    ...(fields.length > 0 && { fields: fields.join(',') }),
    ...rest,
  };
};

/**
 * Handle file upload progress
 * @param {ProgressEvent} progressEvent - Progress event
 * @param {Function} callback - Progress callback
 */
export const handleUploadProgress = (progressEvent, callback) => {
  const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
  if (callback) {
    callback(percentCompleted);
  }
};

/**
 * Create cancellation token source
 * @returns {Object} Axios cancellation token source
 */
export const createCancelToken = () => {
  const CancelToken = axios.CancelToken;
  return CancelToken.source();
};

/**
 * Check if request was cancelled
 * @param {Error} error - Error object
 * @returns {boolean} True if cancelled
 */
export const isCancelledRequest = (error) => {
  return axios.isCancel(error);
};
