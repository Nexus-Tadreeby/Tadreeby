import axios from 'axios';

// Create an instance of axios with custom configurations
const apiClient = axios.create({
  // This is the base URL for all your backend endpoints.
  // For now, we use a placeholder. Your team will give you the actual URL later!
  baseURL: 'https://api.example.com/v1', 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Optional: A quick request interceptor. 
// This automatically grabs your auth token from storage and attaches it to every request!
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;