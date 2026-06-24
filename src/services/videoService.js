import { endpoints } from '../api/endpoints';
import videoInstance from '../api/videoInstance';

export const videoService = {
  searchVideos: async searchParams => {
    return videoInstance.get(endpoints.videos.searchVideos, {
      params: {
        q: searchParams.query,
        maxResults: searchParams.maxResults || 12,
        order: searchParams.order || 'relevance',
        part: 'snippet',
        type: 'video',
      },
    });
  },
  getVideoStatistics: async videoIds => {
    const ids = Array.isArray(videoIds) ? videoIds.join(',') : videoIds;
    return videoInstance.get(endpoints.videos.getVideoStatistics, {
      params: {
        id: ids,
        part: 'statistics',
      },
    });
  },
};

export default videoService;
