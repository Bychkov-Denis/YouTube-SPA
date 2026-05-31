import axios from 'axios';

const baseURL = 'https://www.googleapis.com/youtube/v3';

const videoInstance = axios.create({
  baseURL: baseURL,
  params: {
    key: import.meta.env.VITE_YOUTUBE_API_KEY,
  },
});

videoInstance.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  },
);

export default videoInstance;
