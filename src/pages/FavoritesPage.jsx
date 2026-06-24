import { Typography } from 'antd';
import FavoritesList from '../components/FavoritesList';

const { Title } = Typography;

const FavoritesPage = () => {
  return (
    <>
      <Title level={1}>Избранное</Title>
      <FavoritesList />
    </>
  );
};

export default FavoritesPage;
