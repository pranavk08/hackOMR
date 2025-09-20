import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.data);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    if (error.code === 'ECONNREFUSED') {
      throw new Error('Cannot connect to server. Please make sure the backend is running on port 8000.');
    }
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    if (error.response?.status === 413) {
      throw new Error('File too large. Please choose a smaller image.');
    }
    throw new Error(error.message || 'An unexpected error occurred.');
  }
);

export const processOMRImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error processing OMR image:', error);
    throw error;
  }
};

export const checkServerHealth = async () => {
  try {
    const response = await api.get('/docs');
    return response.status === 200;
  } catch (error) {
    console.error('Server health check failed:', error);
    return false;
  }
};

export default api;
