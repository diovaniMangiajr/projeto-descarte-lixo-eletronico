import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api/v1';

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@ELixo:token');
  
  const publicRoutes = ['/auth/login', '/relatos-problema'];
  const isPublicRoute = publicRoutes.some(route => config.url?.includes(route));

  if (token && token !== 'undefined' && config.headers && !isPublicRoute) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401 && window.location.pathname !== '/login') {
      console.warn('Token inválido ou expirado. Limpando a sessão...');
      localStorage.removeItem('@ELixo:token');
      window.location.reload(); 
    }
    return Promise.reject(error);
  }
);