import { YoutubeOutlined } from '@ant-design/icons';
import { Button, Flex, Layout, Menu } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { useDispatch } from 'react-redux';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  deleteEmailFromLocalStorage,
  deleteTokenFromLocalStorage,
} from '../../helpers';
import { clearFavoriteQueries } from '../../redux/videosSlice';
import LimitedContainer from '../LimitedContainer/LimitedContainer';

import styles from './mainLayout.module.css';

const MainLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { key: 'videos', label: 'Поиск' },
    { key: 'favorites', label: 'Избранные' },
  ];

  const logout = () => {
    deleteTokenFromLocalStorage();
    dispatch(clearFavoriteQueries());
    deleteEmailFromLocalStorage();
    navigate('/auth');
  };

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <LimitedContainer>
          <Flex justify="space-between" align="center" gap="medium">
            <Flex align="center" gap="medium">
              <NavLink
                to="/videos"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <YoutubeOutlined style={{ fontSize: 30 }} />
              </NavLink>
              <Menu
                mode="horizontal"
                selectedKeys={[
                  location.pathname === '/videos' ? 'videos' : 'favorites',
                ]}
                items={menuItems}
                onClick={({ key }) => navigate(`/${key}`)}
                disabledOverflow
              />
            </Flex>
            <Button onClick={logout}>Выйти</Button>
          </Flex>
        </LimitedContainer>
      </Header>
      <Content style={{ padding: '20px 0' }}>
        <LimitedContainer maxWidth={1040}>
          <Outlet />
        </LimitedContainer>
      </Content>
    </Layout>
  );
};

export default MainLayout;
