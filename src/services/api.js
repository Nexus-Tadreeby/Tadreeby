// src/services/api.js

const API_BASE_URL = 'https://tadreeby-backend-production.up.railway.app';

const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('accessToken');
  
  // For FormData, do NOT set Content-Type – browser will set it with boundary
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  // If body is FormData, remove any 'Content-Type' that may have been set
  if (options.body instanceof FormData) {
    delete headers['Content-Type'];
  }

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
  registerStudent: async (formData) => {
    // formData is already a FormData object
    return apiRequest('/auth/register/student', {
      method: 'POST',
      body: formData,
      // no extra headers – we want multipart/form-data
    });
  },
  
  login: async (credentials) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
  
  // ... other methods remain unchanged
};