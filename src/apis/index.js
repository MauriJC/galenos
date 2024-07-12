import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/'
});

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
      // Lógica para cerrar sesión en el frontend
      localStorage.removeItem('Authorization'); // Elimina el token de Authorization
      return true; // Indica que el cierre de sesión fue exitoso
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      return false; // Indica que hubo un error al cerrar sesión
    }
};

export default api;
