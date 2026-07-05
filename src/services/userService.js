import { endpoints } from '../api/endpoints';
import userInstance from '../api/userInstance';

export const userService = {
  register: userData => {
    return userInstance.post(endpoints.user.register, userData);
  },
  login: creditionals => {
    return userInstance.post(endpoints.user.login, creditionals);
  },
};
