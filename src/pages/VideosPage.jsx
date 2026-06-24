import {
  AppstoreOutlined,
  HeartOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Button, Flex, Input, Space, Typography } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContainerFlex from '../components/ContainerFlex';
import Loader from '../components/Loader';
import ModalQuery from '../components/ModalQuery/ModalQuery';
import VideosList from '../components/VideosList/VideosList';
import {
  searchVideos,
  selectedCurrentQueryText,
  selectedLoading,
  selectedTotalResults,
  selectedVideos,
  setCurrentQueryText,
} from '../redux/videosSlice';

const { Title, Paragraph, Text } = Typography;

const VideosPage = () => {
  const dispatch = useDispatch();

  const videos = useSelector(selectedVideos);
  const loading = useSelector(selectedLoading);
  const currentQueryText = useSelector(selectedCurrentQueryText);
  const totalResults = useSelector(selectedTotalResults);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    if (!currentQueryText) {
      return;
    }

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveSuccess = () => {
    setIsModalOpen(false);
  };

  const handleChangeCurrentQueryText = event => {
    dispatch(setCurrentQueryText(event.target.value));
  };

  const getVideosBySearchQuery = () => {
    dispatch(searchVideos({ query: currentQueryText }));
  };

  if (loading) {
    return (
      <ContainerFlex>
        <Loader />
      </ContainerFlex>
    );
  }

  if (videos.length === 0) {
    return (
      <Flex
        vertical
        gap="large"
        align="center"
        justify="center"
        style={{ minHeight: 'calc(100vh - 64px - 40px)' }}
      >
        <Title level={2}>Поиск видео</Title>
        <Space.Compact style={{ width: '100%' }}>
          <Input
            placeholder="Введите название для поиска"
            size="large"
            value={currentQueryText}
            onChange={handleChangeCurrentQueryText}
          />
          <Button
            type="primary"
            size="large"
            disabled={!currentQueryText}
            onClick={getVideosBySearchQuery}
          >
            Найти
          </Button>
        </Space.Compact>
      </Flex>
    );
  }

  return (
    <>
      <div>
        <Title level={1}>Поиск видео</Title>
        <Space.Compact style={{ width: '100%' }}>
          <Input
            placeholder="Введите название для поиска"
            size="large"
            value={currentQueryText}
            onChange={handleChangeCurrentQueryText}
            suffix={<HeartOutlined onClick={handleModalOpen} />}
          />
          <Button
            type="primary"
            size="large"
            disabled={!currentQueryText}
            onClick={getVideosBySearchQuery}
          >
            Найти
          </Button>
        </Space.Compact>
      </div>
      <div>
        <Flex justify="space-between" align="center">
          <Paragraph>
            <Text strong>{`Видео по запросу «${currentQueryText}»`}</Text>{' '}
            <Text type="secondary">{totalResults}</Text>
          </Paragraph>
          <Flex gap="small" align="center">
            <UnorderedListOutlined />
            <AppstoreOutlined />
          </Flex>
        </Flex>
        <VideosList />
      </div>
      <ModalQuery
        open={isModalOpen}
        onCancel={handleCloseModal}
        onSuccess={handleSaveSuccess}
      />
    </>
  );
};

export default VideosPage;

// *Дописать компонент для отображения видео
// *Написать функцию хелпер которая в зависимости от числа будет добавлять тыс. млн.
// *при нажатии кнопки найти вызывать экшен searchVideos в него передать объект {query: currentQueryText}
// *Переделать структуру: все инлайн стили сделать классами и классы вынести в отдельные css файлы для каждого компонента. Общие стили вынести в App.css

// * Отрисовать избранные запросы списком
// * В компонент QueryModal добавить флаг isQueryEditing
// * Написать логику для редактирования
// * Написать логику для выполнения запроса
// * Написать логику для удаления запроса
