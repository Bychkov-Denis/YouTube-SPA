import { useSelector } from 'react-redux';
import { selectedVideos, selectedVideoViewMode } from '../../redux/videosSlice';
import VideoItem from '../VideoItem/VideoItem';
import './videosList.css';

const VideosList = () => {
  const videos = useSelector(selectedVideos);
  const videoViewMode = useSelector(selectedVideoViewMode);
  const isGrid = videoViewMode === 'grid';

  return (
    <div className={isGrid ? 'videos-container-grid' : 'videos-container-flex'}>
      {videos.map(video => (
        <VideoItem video={video} key={video.id} />
      ))}
    </div>
  );
};

export default VideosList;
