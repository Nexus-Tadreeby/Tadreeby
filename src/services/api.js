import axios from 'axios';

// Use '/api' as base URL when using proxy
const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authAPI = {
  registerStudent: (data) => api.post('/auth/register/student', data),
};

export default api;