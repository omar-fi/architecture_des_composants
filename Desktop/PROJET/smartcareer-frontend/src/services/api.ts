import axios from 'axios';

// Utilise le proxy Vite en développement, ou l'URL complète en production
const API_BASE_URL = import.meta.env.PROD 
  ? 'http://localhost:8080/api' 
  : '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token JWT aux requêtes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // Ne pas logger pour les endpoints publics
      if (config.url && !config.url.includes('/auth/login') && !config.url.includes('/auth/register')) {
        console.log('🔑 Token added to request:', config.url);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

// Utilisation d'un type pour éviter les problèmes d'export avec Vite
export type Cv = {
  id: number;
  fileName: string;
  filePath: string;
  uploadDate: string;
  userId: number;
};

// Export explicite pour compatibilité
export { type Cv };

export const authService = {
  register: async (data: RegisterRequest): Promise<void> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },
};

export const cvService = {
  uploadCv: async (userId: number, file: File): Promise<Cv> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post<Cv>(`/cv/upload/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getUserCvs: async (userId: number): Promise<Cv[]> => {
    const response = await api.get<Cv[]>(`/cv/user/${userId}`);
    return response.data;
  },
};

// Export nommé et par défaut pour compatibilité
export { api };
export default api;

