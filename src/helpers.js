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
