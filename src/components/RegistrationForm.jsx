import { YoutubeOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Card,
  Flex,
  Form,
  Input,
  InputNumber,
  Select,
  Typography,
} from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { authService } from '../services/authService';

const { Paragraph } = Typography;

const registrationSheme = yup.object({
  username: yup
    .string()
    .required('Введите логин')
    .min(6, 'Логин должен быть не менее 6 символов')
    .matches(
      /^[a-zA-Z0-9]+$/,
      'Логин может содержать только английские буквы и цифры',
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

  gender: yup.string().required('Введите свой пол'),
  age: yup
    .number()
    .required('Введите возраст')
    .typeError('Возраст должен быть числом')
    .min(1, 'Возраст должен быть от 1 до 100 лет')
    .max(100, 'Возраст должен быть от 1 до 100 лет')
    .integer('Возраст должен быть целым числом'),
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
      username: '',
      email: '',
      password: '',
      gender: undefined,
      age: undefined,
    },
  });

  const registration = async userData => {
    try {
      const { data } = await authService.register(userData);
      reset();
      toast.success(
        `Пользователь с логином ${data.username} успешно зарегистрирован`,
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
          label="Логин:"
          name="username"
          style={{ marginBottom: '10px' }}
          help={errors.username?.message}
          validateStatus={errors.username ? 'error' : ''}
        >
          <Controller
            name="username"
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
          label="Пол:"
          name="gender"
          style={{ marginBottom: '10px' }}
          help={errors.gender?.message}
          validateStatus={errors.gender ? 'error' : ''}
        >
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                allowClear
                placeholder="Выберите пол..."
                options={[
                  { label: 'Мужской', value: 'male' },
                  { label: 'Женский', value: 'female' },
                ]}
                onChange={value => field.onChange(value)}
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Возраст:"
          name="age"
          style={{ marginBottom: '10px' }}
          help={errors.age?.message}
          validateStatus={errors.age ? 'error' : ''}
        >
          <Controller
            name="age"
            control={control}
            render={({ field }) => (
              <InputNumber
                style={{ width: '100%' }}
                min={1}
                max={100}
                {...field}
                placeholder="Введите возраст..."
              />
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
