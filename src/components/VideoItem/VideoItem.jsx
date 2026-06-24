import { Card, Typography } from 'antd';
import { formatCountOfViews } from '../../helpers';
import './VideoItem.css';

const { Title, Text } = Typography;

const VideoItem = ({ video }) => {
  return (
    <a href={video.videoUrl} target="_blank" className="video-item-link">
      <Card
        hoverable
        className="video-card"
        cover={
          <div className="video-card-cover">
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
