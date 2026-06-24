import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import videoService from '../services/videoService';

const initialState = {
  currentQueryText: '',
  totalResults: 0,
  videos: [],
  videoViewMode: 'grid',
  favoriteQueries: [],
  loading: null,
};

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
      statsData.items.forEach(
        video => (viewsMap[video.id] = video.statistics.viewCount),
      );

      const videoItems = searchData.items.map(item => ({
        id: item.id.videoId,
        title: item.snippet.title,
        channelTitle: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails.medium.url,
        videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        viewCount: viewsMap[item.id.videoId] || 0,
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
  reducers: {
    setCurrentQueryText(state, action) {
      state.currentQueryText = action.payload;
    },
    setVideoViewMode(state, action) {
      state.videoViewMode = action.payload;
    },
    addFavoriteQueries(state, action) {
      state.favoriteQueries.push({
        id: crypto.randomUUID(),
        ...action.payload,
      });
    },
    removeFavoriteQuery(state, action) {
      state.favoriteQueries = state.favoriteQueries.filter(
        query => query.id !== action.payload,
      );
    },
    updateFavoriteQuery(state, action) {
      const { id, name, query, orderBy, maxResults } = action.payload;

      const index = state.favoriteQueries.findIndex(query => query.id === id);
      if (index !== -1) {
        state.favoriteQueries[index] = {
          ...state.favoriteQueries[index],
          name,
          query,
          orderBy,
          maxResults,
        };
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(searchVideos.fulfilled, (state, action) => {
      state.videos = action.payload.items;
      state.totalResults = action.payload.totalResults;
    });
    builder.addMatcher(isFulfilled, state => {
      state.loading = false;
    });
    builder.addMatcher(isPending, state => {
      state.loading = true;
    });
    builder.addMatcher(isRejected, (state, action) => {
      state.videos = [];
      state.loading = false;
      toast.error(action.payload);
    });
  },
  selectors: {
    selectedCurrentQueryText: state => state.currentQueryText,
    selectedTotalResults: state => state.totalResults,
    selectedVideos: state => state.videos,
    selectedFavoriteQueries: state => state.favoriteQueries,
    selectedLoading: state => state.loading,
  },
});

export const {
  setCurrentQueryText,
  setVideoViewMode,
  addFavoriteQueries,
  removeFavoriteQuery,
  updateFavoriteQuery,
} = videosSlice.actions;

export const {
  currentQueryText,
  selectedTotalResults,
  selectedVideos,
  selectedFavoriteQueries,
  selectedLoading,
  selectedCurrentQueryText,
} = videosSlice.selectors;

export default videosSlice.reducer;
