import { toast } from 'react-toastify';

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem('token');
};

export const setTokenToLocalStorage = token => {
  localStorage.setItem('token', token);
};

export const deleteTokenFromLocalStorage = () => {
  localStorage.removeItem('token');
};

export const formatCountOfViews = views => {
  const numberViews = Number(views);

  if (numberViews > 1000000) {
    return `${(numberViews / 1000000).toFixed(1)} млн`;
  }
  if (numberViews >= 1000) {
    return `${(numberViews / 1000).toFixed(1)} тыс.`;
  }
  return numberViews.toString();
};

export const setEmailToLocalStorage = email => {
  localStorage.setItem('email', email);
};

export const getEmailFromLocalStorage = () => {
  return localStorage.getItem('email');
};

export const deleteEmailFromLocalStorage = () => {
  localStorage.removeItem('email');
};

export const saveFavoriteQueriesToLocalStorage = queries => {
  const email = getEmailFromLocalStorage();
  if (email) {
    const key = `favoriteQueries_${email}`;
    localStorage.setItem(key, JSON.stringify(queries));
  } else {
    toast.error('Данные о текущем пользователе не найдены');
  }
};

export const getFavoriteQueriesFromLocalStorage = () => {
  const email = getEmailFromLocalStorage();
  if (email) {
    const key = `favoriteQueries_${email}`;
    const queriesData = localStorage.getItem(key);
    const queries = queriesData ? JSON.parse(queriesData) : [];
    return queries;
  } else {
    toast.error('Данные о текущем пользователе не найдены');
  }
};
