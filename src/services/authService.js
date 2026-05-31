import { endpoints } from '../api/endpoints';
import userInstance from '../api/userInstance';

export const authService = {
  register: userData => {
    return userInstance.post(endpoints.auth.register, userData);
  },
  login: creditionals => {
    return userInstance.post(endpoints.auth.login, creditionals);
  },
};
