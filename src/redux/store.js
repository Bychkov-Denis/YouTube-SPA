import { configureStore } from '@reduxjs/toolkit';
import videosSlice from './videosSlice';

const store = configureStore({
  reducer: {
    videos: videosSlice,
  },
});

export default store;
