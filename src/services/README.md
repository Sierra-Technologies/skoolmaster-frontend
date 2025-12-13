# API Services Layer

This directory contains the API integration layer for the SkoolMaster frontend application.

## Structure

```
services/
├── api.js                    # Base Axios instance with interceptors
├── authService.js            # Authentication API calls
├── studentService.js         # Student-related API calls
├── teacherService.js         # Teacher-related API calls
├── parentService.js          # Parent-related API calls
├── classService.js           # Class management API calls
├── gradeService.js           # Grade management API calls
├── attendanceService.js      # Attendance management API calls
├── feeService.js             # Fee management API calls
├── assignmentService.js      # Assignment management API calls
└── index.js                  # Central export point
```

## Configuration

### Environment Variables

Create a `.env` file in the project root with the following variables:

```env
VITE_API_URL=http://localhost:3000/api
```

### Base API Setup

The `api.js` file exports a configured Axios instance with:

- Base URL from environment variables
- 30-second timeout
- Request/response interceptors
- Automatic token injection
- Token refresh logic
- Global error handling
- Development logging

## Usage

### Using Service Modules

```javascript
import { studentService } from '../services';

// Get all students
const students = await studentService.getAll({ page: 1, limit: 10 });

// Get student by ID
const student = await studentService.getById('123');

// Create student
const newStudent = await studentService.create(studentData);

// Update student
const updatedStudent = await studentService.update('123', studentData);

// Delete student
await studentService.delete('123');
```

### Using the Custom Hook

```javascript
import useApi from '../hooks/useApi';
import { studentService } from '../services';

function StudentsPage() {
  const {
    data: students,
    loading,
    error,
    execute: fetchStudents,
  } = useApi(studentService.getAll, {
    onSuccess: (data) => console.log('Students loaded:', data),
    onError: (error) => console.error('Error loading students:', error),
  });

  useEffect(() => {
    fetchStudents({ page: 1, limit: 10 });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div>{/* Render students */}</div>;
}
```

### Direct API Calls

```javascript
import { apiClient } from '../services/api';

// GET request
const response = await apiClient.get('/students');

// POST request
const response = await apiClient.post('/students', { name: 'John Doe' });

// PUT request
const response = await apiClient.put('/students/123', { name: 'Jane Doe' });

// DELETE request
const response = await apiClient.delete('/students/123');
```

## Error Handling

### Global Error Handling

The API layer includes global error handling for:

- **401 Unauthorized**: Attempts token refresh, logs out if refresh fails
- **403 Forbidden**: Shows permission denied message
- **404 Not Found**: Shows resource not found message
- **422 Validation Error**: Shows validation error messages
- **429 Too Many Requests**: Shows rate limit message
- **5xx Server Errors**: Shows generic server error message
- **Network Errors**: Shows network error message

### Custom Error Handling

```javascript
try {
  const student = await studentService.getById('123');
} catch (error) {
  if (error.response) {
    // Server responded with error
    console.error('Status:', error.response.status);
    console.error('Data:', error.response.data);
  } else if (error.request) {
    // Request made but no response
    console.error('Network error');
  } else {
    // Error in request configuration
    console.error('Error:', error.message);
  }
}
```

## File Uploads

### Uploading Files

```javascript
import { studentService } from '../services';

// Create FormData
const formData = new FormData();
formData.append('file', file);
formData.append('name', 'John Doe');

// Upload
const result = await studentService.bulkImport(formData);
```

### Downloading Files

```javascript
import { studentService } from '../services';
import { downloadFile } from '../utils/apiHelpers';

// Export data
const blob = await studentService.export({ format: 'csv' });

// Download file
downloadFile(blob, 'students.csv');
```

## Retry Logic

### Using Retry Helper

```javascript
import { retryRequest } from '../services/api';

// Retry failed requests
const data = await retryRequest(
  () => studentService.getAll(),
  3,     // max retries
  1000   // initial delay (ms)
);
```

## Authentication

### Login

```javascript
import { authService } from '../services';

const { user, token } = await authService.login({
  email: 'user@example.com',
  password: 'password',
});

// Token is automatically stored in localStorage
// All subsequent requests include the token
```

### Logout

```javascript
import { authService } from '../services';

await authService.logout();
// Token is removed from localStorage
```

### Get Current User

```javascript
import { authService } from '../services';

// From API
const user = await authService.getCurrentUser();

// From localStorage
const storedUser = authService.getStoredUser();
```

## Utilities

### API Helpers

```javascript
import {
  buildQueryString,
  downloadFile,
  formatErrorMessage,
  isNetworkError,
  isAuthError,
  isValidationError,
  getValidationErrors,
  objectToFormData,
  createPaginationParams,
  parsePaginationResponse,
  retryWithBackoff,
} from '../utils/apiHelpers';

// Build query string
const queryString = buildQueryString({ page: 1, limit: 10, search: 'John' });
// Result: "page=1&limit=10&search=John"

// Create pagination params
const params = createPaginationParams(1, 10, { search: 'John' });
// Result: { page: 1, limit: 10, search: 'John' }

// Format error for display
const message = formatErrorMessage(error);

// Check error types
if (isAuthError(error)) {
  // Handle authentication error
}

// Extract validation errors
const validationErrors = getValidationErrors(error);
```

## Best Practices

1. **Always use service modules** instead of direct API calls
2. **Use the `useApi` hook** for component-level API calls
3. **Handle errors appropriately** at the component level
4. **Use TypeScript** for better type safety (optional)
5. **Implement loading states** for better UX
6. **Cache responses** when appropriate
7. **Implement optimistic updates** for better perceived performance
8. **Use retry logic** for network errors
9. **Validate data** before sending to API
10. **Log errors** in development for debugging

## Adding New Services

To add a new service:

1. Create a new file in `src/services/` (e.g., `messageService.js`)
2. Import `apiClient` and `ENDPOINTS`
3. Create service object with methods
4. Export the service as default
5. Add to `src/services/index.js` for easy importing
6. Add endpoints to `src/config/endpoints.js`

Example:

```javascript
// messageService.js
import { apiClient } from './api';
import ENDPOINTS from '../config/endpoints';

const messageService = {
  getAll: async (params = {}) => {
    const response = await apiClient.get(ENDPOINTS.MESSAGES.LIST, { params });
    return response.data;
  },

  // Add more methods...
};

export default messageService;
```

## Testing

```javascript
import { studentService } from '../services';
import { vi } from 'vitest';

// Mock the service
vi.mock('../services', () => ({
  studentService: {
    getAll: vi.fn(),
  },
}));

// Test
test('fetches students', async () => {
  const mockStudents = [{ id: 1, name: 'John Doe' }];
  studentService.getAll.mockResolvedValue(mockStudents);

  const students = await studentService.getAll();
  expect(students).toEqual(mockStudents);
});
```
