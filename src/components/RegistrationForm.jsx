import { YoutubeOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Flex, Form, Input, Typography } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { userService } from '../services/userService';

const { Paragraph } = Typography;

const registrationSheme = yup.object({
  name: yup
    .string()
    .required('Введите имя')
    .min(3, 'Имя должен быть не менее 3 символов')
    .matches(
      /^[a-zA-Zа-яёА-ЯЁ]+$/,
      'Имя может содержать только английские буквы',
    ),
  email: yup.string().required('Введите email').email('Неверный формат email'),
  password: yup
    .string()
    .required('Введите пароль')
    .min(8, 'Пароль должен быть не менее 8 символов')
    .matches(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
    .matches(/[a-z]/, 'Пароль должен содержать хотя бы одну прописную букву')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Пароль должен содержать хотя бы один специальный символ',
    ),
  confirmPassword: yup
    .string()
    .required('Введите подтверждение пароля')
    .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
});

const RegistrationForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(registrationSheme),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const registration = async data => {
    const { confirmPassword, ...userData } = data;

    try {
      await userService.register(userData);
      reset();
      toast.success(
        `Пользователь с именем ${userData.name} успешно зарегистрирован`,
      );
    } catch ({ response }) {
      const errorMessage = response?.data?.message;
      toast.error(errorMessage);
    }
  };

  const navigate = useNavigate();

  const goToAuthPage = () => {
    navigate('/auth');
  };

  return (
    <Card
      title={
        <Flex vertical justify="center" align="center" style={{ padding: 20 }}>
          <YoutubeOutlined style={{ fontSize: 40 }} />
          <Paragraph style={{ fontSize: 30, margin: 0 }}>Регистрация</Paragraph>
        </Flex>
      }
    >
      <Form
        name="registrationForm"
        size="large"
        layout="horizontal"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        autoComplete="off"
        onFinish={handleSubmit(registration)}
      >
        <Form.Item
          label="Имя:"
          name="name"
          style={{ marginBottom: '10px' }}
          help={errors.name?.message}
          validateStatus={errors.name ? 'error' : ''}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Введите логин..." />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Email:"
          name="email"
          style={{ marginBottom: '10px' }}
          help={errors.email?.message}
          validateStatus={errors.email ? 'error' : ''}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Введите email..." />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Пароль"
          name="password"
          style={{ marginBottom: '10px' }}
          help={errors.password?.message}
          validateStatus={errors.password ? 'error' : ''}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password {...field} placeholder="Введите пароль..." />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Пароль"
          name="confirmPassword"
          style={{ marginBottom: '10px' }}
          help={errors.confirmPassword?.message}
          validateStatus={errors.confirmPassword ? 'error' : ''}
        >
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Input.Password {...field} placeholder="Подтверждение пароля" />
            )}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }} style={{ marginBottom: '0' }}>
          <Button type="primary" block disabled={!isValid} htmlType="submit">
            Регистрация
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'right' }}>
          <Typography.Link
            onClick={goToAuthPage}
            style={{ textAlign: 'right' }}
          >
            Есть аккаунт? Войдите.
          </Typography.Link>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default RegistrationForm;
