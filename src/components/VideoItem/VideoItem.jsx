import { Card, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { formatCountOfViews } from '../../helpers';
import { selectedVideoViewMode } from '../../redux/videosSlice';
import styles from './videoItem.module.css';

const { Title, Text } = Typography;

const VideoItem = ({ video }) => {
  const viewVideoMode = useSelector(selectedVideoViewMode);
  const isGrid = viewVideoMode === 'grid';

  return (
    <a
      href={video.videoUrl}
      target="_blank"
      className={styles['video-item-link']}
    >
      <Card
        hoverable
        className={
          isGrid
            ? styles['video-card']
            : `${styles['video-card']} ${styles['video-card-flex']}`
        }
        cover={
          <div
            className={
              isGrid
                ? styles['video-card-cover']
                : `${styles['video-card-cover']} ${styles['video-card-cover-flex']}`
            }
          >
            <img alt={video.title} src={video.thumbnail} />
          </div>
        }
      >
        <Title level={5} className={styles['video-title']}>
          {video.title}
        </Title>
        <Text className={styles['channel-name']}>{video.channelTitle}</Text>
        <Text className={styles['views-count']}>
          {formatCountOfViews(video.viewCount)} просмотров
        </Text>
      </Card>
    </a>
  );
};

export default VideoItem;
