import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Empty, Flex, List, Typography } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  removeFavoriteQuery,
  searchVideos,
  selectedFavoriteQueries,
  setCurrentQueryText,
  updateFavoriteQuery,
} from '../redux/videosSlice';
import ModalQuery from './ModalQuery/ModalQuery';

const { Text } = Typography;
const { Item } = List;

const FavoritesList = () => {
  const favoriteQueries = useSelector(selectedFavoriteQueries);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingQuery, setEditingQuery] = useState(null);

  const removeQuery = queryId => {
    dispatch(removeFavoriteQuery(queryId));
    toast.success('Запрос успешно удалён из избранного');
  };

  const handleEditQuery = query => {
    setEditingQuery(query);
    setIsEditModalOpen(true);
  };

  const handleExecuteQuery = query => {
    dispatch(setCurrentQueryText(query.query));
    dispatch(
      searchVideos({
        query: query.query,
        maxResults: query.maxResults || 12,
        order: query.orderBy || 'relevance',
      }),
    );
    navigate('/videos');
  };

  const handleEditSuccess = queryData => {
    dispatch(
      updateFavoriteQuery({
        id: editingQuery.id,
        ...queryData,
      }),
    );
    toast.success('Запрос успешно обновлён');
    setIsEditModalOpen(false);
    setEditingQuery(null);
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setEditingQuery(null);
  };

  return (
    <>
      <List
        bordered
        dataSource={favoriteQueries}
        locale={{
          emptyText: <Empty description="Нет избранных запросов" />,
        }}
        renderItem={item => (
          <Item>
            <Flex
              justify="space-between"
              align="center"
              style={{ width: '100%' }}
            >
              <Text bold>{item.name}</Text>
              <Flex justify="space-between" align="center" gap="medium">
                <EditOutlined onClick={() => handleEditQuery(item)} />
                <DeleteOutlined onClick={() => removeQuery(item.id)} />
                <CheckCircleOutlined onClick={() => handleExecuteQuery(item)} />
              </Flex>
            </Flex>
          </Item>
        )}
      />
      <ModalQuery
        open={isEditModalOpen}
        onCancel={handleCancelEdit}
        onSuccess={handleEditSuccess}
        isEditing={true}
        editingQuery={editingQuery}
      />
    </>
  );
};

export default FavoritesList;
