import { getTokenFromLocalStorage } from '../helpers';

export const useAuth = () => {
  const isAuthenticated = !!getTokenFromLocalStorage();
  return { isAuthenticated };
};
