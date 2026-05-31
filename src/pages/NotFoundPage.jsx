import { Button, Flex, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import ContainerFlex from '../components/ContainerFlex';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <ContainerFlex width={300}>
      <Flex vertical align="center">
        <Typography.Paragraph strong style={{ fontSize: 30 }}>
          404 NOT FOUND
        </Typography.Paragraph>
        <Button type="primary" onClick={goBack}>
          Вернуться назад
        </Button>
      </Flex>
    </ContainerFlex>
  );
};

export default NotFoundPage;
