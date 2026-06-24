// src/services/api.js

// Use empty string or direct URL for development
const API_BASE_URL = 'https://tadreeby-backend-production.up.railway.app';

const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('accessToken');
  
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log(`📡 Sending ${options.method || 'GET'} request to: ${url}`);
    
    const response = await fetch(url, config);
    
    let responseData;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }
    
    if (!response.ok) {
      throw {
        status: response.status,
        data: responseData,
        message: responseData?.message || responseData?.error || `HTTP error ${response.status}`
      };
    }
    
    return responseData;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const authAPI = {
  registerStudent: async (userData) => {
    return apiRequest('/auth/register/student', { // No /api prefix
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
  
  login: async (credentials) => {
    return apiRequest('/auth/login', { // No /api prefix
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
  
  logout: async () => {
    return apiRequest('/auth/logout', { // No /api prefix
      method: 'POST',
    });
  },
  
  refreshToken: async (refreshToken) => {
    return apiRequest('/auth/refresh', { // No /api prefix
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  },
  
  getCurrentUser: async () => {
    return apiRequest('/auth/me', { // No /api prefix
      method: 'GET',
    });
  },
};