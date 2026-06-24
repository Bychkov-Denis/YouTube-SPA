import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Slider,
  Space,
  Typography,
} from 'antd';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  addFavoriteQueries,
  selectedCurrentQueryText,
} from '../../redux/videosSlice';

const { Title } = Typography;
const { Item } = Form;
const { Option } = Select;

const ModalQuery = ({
  open,
  onCancel,
  onSuccess,
  isEditing = false,
  editingQuery = null,
}) => {
  const dispatch = useDispatch();

  const currentQueryText = useSelector(selectedCurrentQueryText);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      query: currentQueryText,
      name: currentQueryText,
      maxResults: 12,
      sortBy: 'relevance',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (isEditing && editingQuery) {
      setValue('query', editingQuery.query || '');
      setValue('name', editingQuery.name || '');
      setValue('orderBy', editingQuery.orderBy || 'relevance');
      setValue('maxResults', editingQuery.maxResults || 12);
    }
  }, [currentQueryText, editingQuery, isEditing, setValue]);

  const orderOptions = [
    { value: 'relevance', label: 'Без сортировки' },
    { value: 'date', label: 'По дате' },
    { value: 'rating', label: 'По рейтингу' },
    { value: 'viewCount', label: 'По количеству просмоторов' },
    { value: 'title', label: 'По названию' },
  ];

  const maxResults = watch('maxResults');

  const onSubmit = query => {
    if (isEditing) {
      if (onSuccess) {
        onSuccess(query);
      }
      return;
    }

    dispatch(
      addFavoriteQueries({
        name: query.name,
        query: query.query,
        orderBy: query.orderBy,
        maxResults: query.maxResults,
      }),
    );

    toast.success('Запрос успешно сохранён в избранные');
    reset();

    if (onSuccess) {
      onSuccess();
    }
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  const modalTitle = isEditing ? 'Редактировать запрос' : 'Сохранить запрос';

  return (
    <Modal
      title={
        <Title level={3} style={{ textAlign: 'center' }}>
          {modalTitle}
        </Title>
      }
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={600}
      destroyOnClose
    >
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Item label="Запрос">
          <Controller
            name="query"
            control={control}
            render={({ field }) => <Input {...field} disabled={!isEditing} />}
          />
        </Item>
        <Item
          label="Название"
          validateStatus={errors.name ? 'error' : ''}
          help={errors.name?.message}
          required
        >
          <Controller
            name="name"
            control={control}
            rules={{
              required: 'Пожалуйста, введите название запроса',
              minLength: {
                value: 3,
                message: 'Название должно содержать минимум 3 символа',
              },
              maxLength: {
                value: 50,
                message: 'Название не должно превышать 50 символов',
              },
            }}
            render={({ field }) => (
              <Input {...field} placeholder="Введите название для запроса" />
            )}
          />
        </Item>
        <Item label="Сортировать по">
          <Controller
            name="orderBy"
            control={control}
            render={({ field }) => (
              <Select {...field} defaultValue={orderOptions[0]}>
                {orderOptions.map(option => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            )}
          />
        </Item>
        <Item label="Максимальное количество">
          <div>
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontWeight: 'bold' }}>{maxResults || 12}</span>
            </div>
            <Controller
              name="maxResults"
              control={control}
              render={({ field }) => (
                <Slider
                  {...field}
                  min={5}
                  max={50}
                  step={1}
                  marks={{
                    5: '5',
                    12: '12',
                    25: '25',
                    50: '50',
                  }}
                />
              )}
            />
          </div>
        </Item>
        <Space
          style={{ width: '100%', justifyContent: 'flex-end', marginTop: 24 }}
        >
          <Button onClick={handleCancel}>Отмена</Button>
          <Button type="primary" htmlType="submit" disabled={!isValid}>
            Сохранить
          </Button>
        </Space>
      </Form>
    </Modal>
  );
};

export default ModalQuery;
