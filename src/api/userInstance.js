import axios from 'axios';
import { getTokenFromLocalStorage } from '../helpers';

const userInstance = axios.create({
  baseURL: import.meta.env.VITE_USER_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

userInstance.interceptors.request.use(
  config => {
    const token = getTokenFromLocalStorage();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default userInstance;
