import axios from 'axios';

// Base API URL - change this in production
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000, // 2 minutes for AI generation
  headers: {
    'Content-Type': 'application/json',
  }
});

/**
 * Generate a single thumbnail
 */
export const generateThumbnail = async (formData) => {
  try {
    const response = await api.post('/thumbnails/generate', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to generate thumbnail');
  }
};

/**
 * Get multiple thumbnail suggestions
 */
export const getThumbnailSuggestions = async (data) => {
  try {
    const response = await api.post('/thumbnails/suggestions', data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to get suggestions');
  }
};

/**
 * Get theme suggestions
 */
export const getThemeSuggestions = async (data) => {
  try {
    const response = await api.post('/thumbnails/themes', data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to get theme suggestions');
  }
};

/**
 * Get thumbnail history
 */
export const getThumbnailHistory = async (limit = 20, skip = 0) => {
  try {
    const response = await api.get(`/thumbnails/history?limit=${limit}&skip=${skip}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch history');
  }
};

/**
 * Delete a thumbnail
 */
export const deleteThumbnail = async (id) => {
  try {
    const response = await api.delete(`/thumbnails/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to delete thumbnail');
  }
};

export default api;
