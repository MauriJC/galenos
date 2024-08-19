import axios from 'axios';

const api = axios.create({
  baseURL: 'http://142.93.53.173/'
});
//  baseURL: 'http://142.93.53.173/'
//http://localhost:3001
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('Authorization');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const logout = async () => {
    try {
      
      localStorage.removeItem('Authorization');
      localStorage.removeItem('rol'); 
      return true; 
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      return false; 
    }
};

export default api;
