import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import videoService from '../services/videoService';

const initialState = { totalResults: 0, videos: [], favoriteQueries: [] };

export const searchVideos = createAsyncThunk(
  'videos/searchVideos',
  async (searchParams, { rejectWithValue }) => {
    try {
      const searchResponse = await videoService.searchVideos(searchParams);
      const searchData = searchResponse.data;

      if (!searchData.items.length) {
        return {
          totalResults: 0,
          items: [],
        };
      }

      const videoIds = searchData.items.map(item => item.id.videoId);

      const statsResponse = await videoService.getVideoStatistics(videoIds);
      const statsData = statsResponse.data;

      const viewsMap = {};
      statsData.items.forEech(
        video => (viewsMap[video.id] = video.statistics.viewCount),
      );

      const videoItems = searchData.items.map(item => ({
        id: item.id.videoId,
        title: item.snippet.title,
        channelTitle: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails.medium.url,
        videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        viewCount: viewsMap[item.id.videoId],
      }));

      return {
        totalResults: searchData.pageInfo.totalResults,
        items: videoItems,
      };
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      return rejectWithValue(errorMessage);
    }
  },
);

export const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {},
  selectors: {},
});

// export const {

// } = tasksSlice.actions;

// export const {

// } = tasksSlice.selectors;

export default videosSlice.reducer;
