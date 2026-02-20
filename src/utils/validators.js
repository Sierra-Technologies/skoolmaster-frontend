// Email validation
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Phone validation
export function isValidPhone(phone) {
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone);
}

// Password strength validation
export function isStrongPassword(password) {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special char
  const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return strongRegex.test(password);
}

export function getPasswordStrength(password) {
  if (!password) return { strength: 'none', score: 0 };

  let score = 0;

  // Length
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;

  // Contains lowercase
  if (/[a-z]/.test(password)) score++;

  // Contains uppercase
  if (/[A-Z]/.test(password)) score++;

  // Contains number
  if (/\d/.test(password)) score++;

  // Contains special character
  if (/[@$!%*?&]/.test(password)) score++;

  const strengthMap = {
    0: 'weak',
    1: 'weak',
    2: 'fair',
    3: 'fair',
    4: 'good',
    5: 'good',
    6: 'strong',
  };

  return {
    strength: strengthMap[score],
    score,
  };
}

// URL validation
export function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Required field validation
export function isRequired(value) {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
}

// Min length validation
export function minLength(value, min) {
  return value.length >= min;
}

// Max length validation
export function maxLength(value, max) {
  return value.length <= max;
}

// Number range validation
export function inRange(value, min, max) {
  const num = parseFloat(value);
  return num >= min && num <= max;
}

// Date validation
export function isValidDate(dateString) {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
}

// Future date validation
export function isFutureDate(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date > today;
}

// Past date validation
export function isPastDate(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

// Age validation
export function isValidAge(dateOfBirth, minAge, maxAge) {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age >= minAge && age <= maxAge;
}

// Percentage validation
export function isValidPercentage(value) {
  const num = parseFloat(value);
  return !isNaN(num) && num >= 0 && num <= 100;
}

// GPA validation
export function isValidGPA(value, max = 4.0) {
  const num = parseFloat(value);
  return !isNaN(num) && num >= 0 && num <= max;
}

// File size validation
export function isValidFileSize(file, maxSizeInMB) {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return file.size <= maxSizeInBytes;
}

// File type validation
export function isValidFileType(file, allowedTypes) {
  return allowedTypes.includes(file.type);
}

// Form validation helper
export function validateForm(formData, rules) {
  const errors = {};

  Object.keys(rules).forEach((field) => {
    const value = formData[field];
    const fieldRules = rules[field];

    fieldRules.forEach((rule) => {
      const { type, message, ...params } = rule;

      switch (type) {
        case 'required':
          if (!isRequired(value)) {
            errors[field] = message || `${field} is required`;
          }
          break;
        case 'email':
          if (value && !isValidEmail(value)) {
            errors[field] = message || 'Invalid email address';
          }
          break;
        case 'phone':
          if (value && !isValidPhone(value)) {
            errors[field] = message || 'Invalid phone number';
          }
          break;
        case 'minLength':
          if (value && !minLength(value, params.min)) {
            errors[field] = message || `Minimum length is ${params.min}`;
          }
          break;
        case 'maxLength':
          if (value && !maxLength(value, params.max)) {
            errors[field] = message || `Maximum length is ${params.max}`;
          }
          break;
        default:
          break;
      }
    });
  });

  return errors;
}
