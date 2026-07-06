import { useSelector } from 'react-redux';
import { selectedVideos, selectedVideoViewMode } from '../../redux/videosSlice';
import VideoItem from '../VideoItem/VideoItem';
import styles from './videosList.module.css';

const VideosList = () => {
  const videos = useSelector(selectedVideos);
  const videoViewMode = useSelector(selectedVideoViewMode);
  const isGrid = videoViewMode === 'grid';

  return (
    <div
      className={
        isGrid
          ? styles['videos-container-grid']
          : styles['videos-container-flex']
      }
    >
      {videos.map(video => (
        <VideoItem video={video} key={video.id} />
      ))}
    </div>
  );
};

export default VideosList;
