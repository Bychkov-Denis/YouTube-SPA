import { useSelector } from 'react-redux';
import { selectedVideos } from '../../redux/videosSlice';
import VideoItem from '../VideoItem/VideoItem';
import './videosList.css';

const VideosList = () => {
  const videos = useSelector(selectedVideos);

  return (
    <div className="videos-container">
      {videos.map(video => (
        <VideoItem video={video} key={video.id} />
      ))}
    </div>
  );
};

export default VideosList;
