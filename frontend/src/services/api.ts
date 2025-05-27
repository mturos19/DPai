import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const voiceService = {
  processVoiceSamples: async (formData: FormData) => {
    const response = await api.post('/voice/process', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getVoiceModel: async (userId: string) => {
    const response = await api.get(`/voice/model/${userId}`);
    return response.data;
  },
};

export const storyService = {
  generateStory: async (prompt: string, voiceModelId: string) => {
    const response = await api.post('/story/generate', {
      prompt,
      voiceModelId,
    });
    return response.data;
  },

  getStories: async (userId: string) => {
    const response = await api.get(`/story/list/${userId}`);
    return response.data;
  },
};

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (userData: { email: string; password: string; name: string }) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
};

export default api; 