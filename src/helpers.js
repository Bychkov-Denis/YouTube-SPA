export const getTokenFromLocalStorage = () => {
  return localStorage.getItem('token');
};

export const setTokenToLocalStorage = token => {
  localStorage.setItem('token', token);
};

export const deleteTokenFromLocalStorage = () => {
  localStorage.removeItem('token');
};
