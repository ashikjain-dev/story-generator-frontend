import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

const fetcher = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const generateStory = async (context: string) => {
  try {
    const response = await fetcher.post('/story/generate', { context });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export default fetcher;
