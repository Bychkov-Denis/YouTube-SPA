import { Card, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { formatCountOfViews } from '../../helpers';
import { selectedVideoViewMode } from '../../redux/videosSlice';
import './VideoItem.css';

const { Title, Text } = Typography;

const VideoItem = ({ video }) => {
  const viewVideoMode = useSelector(selectedVideoViewMode);
  const isGrid = viewVideoMode === 'grid';

  return (
    <a href={video.videoUrl} target="_blank" className="video-item-link">
      <Card
        hoverable
        className={isGrid ? 'video-card' : 'video-card video-card-flex'}
        cover={
          <div
            className={isGrid ? 'video-card-cover' : 'video-card-cover-flex'}
          >
            <img alt={video.title} src={video.thumbnail} />
          </div>
        }
      >
        <Title level={5} className="video-title">
          {video.title}
        </Title>
        <Text className="channel-name">{video.channelTitle}</Text>
        <Text className="views-count">
          {formatCountOfViews(video.viewCount)} просмотров
        </Text>
      </Card>
    </a>
  );
};

export default VideoItem;
