import { YoutubeOutlined } from '@ant-design/icons';
import { Button, Flex, Layout, Menu, theme } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { deleteTokenFromLocalStorage } from '../helpers';
import LimitedContainer from './LimitedContainer';

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = theme.useToken();

  const menuItems = [
    { key: 'videos', label: 'Поиск' },
    { key: 'favorites', label: 'Избранные' },
  ];

  const logout = () => {
    deleteTokenFromLocalStorage();
    navigate('/auth');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          padding: 0,
          background: token.colorBgContainer,
        }}
      >
        <LimitedContainer>
          <Flex justify="space-between" align="center" gap="medium">
            <Flex align="center" gap="medium">
              <NavLink
                to="/videos"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <YoutubeOutlined
                  style={{ fontSize: 30, color: token.colorPrimary }}
                />
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
        <LimitedContainer>
          <Outlet />
        </LimitedContainer>
      </Content>
    </Layout>
  );
};

export default MainLayout;
