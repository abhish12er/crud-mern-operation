import './index.css';
import { Button, Table, Image, Modal, Form, Input, Select, message, Upload } from "antd";
import { DeleteFilled, EditFilled, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useState } from 'react';
import useSWR, { mutate } from "swr";
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

const App = () => {
  const [regForm] = Form.useForm();
  const [modal, setModal] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [imgUrl, setImageUrl] = useState(null);
  const [id, setId] = useState(null);

  const fetcher = async () => {
    const response = await axios.get('/register');
    return response.data;
  };

  const { data, error } = useSWR('/register', fetcher);

  const columns = [
    {
      title: 'Profile',
      dataIndex: 'profile',
      key: 'profile',
      render: (text) => (
        <Image
          className="rounded-full"
          src={text}
          width={60}
          height={60}
          alt="Profile"
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: 'Dob',
      dataIndex: 'dob',
      key: 'dob',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, obj) => (
        <div>
          <Button
            className='text-green-500'
            icon={<EditFilled />}
            shape='circle'
            type='text'
            onClick={() => onEdit(obj)}
          />
          <Button
            className='text-rose-500'
            icon={<DeleteFilled />}
            shape='circle'
            type='text'
            onClick={() => onDelete(obj._id)}
          />
        </div>
      ),
    },
  ];

  const onDelete = async (id) => {
    try {
      await axios.delete(`/register/${id}`);
      message.success("Data deleted successfully");
      mutate('/register/');
    } catch (error) {
      message.error("Unable to delete data!");
    }
  };

  const onEdit = (obj) => {
    delete obj.profile;
    setModal(true);
    regForm.setFieldsValue(obj);
    setId(obj._id);
  };

  const onFinish = async (values) => {
    values.profile = imgUrl ? imgUrl : 'https://www.vhv.rs/dpng/d/15-155087_dummy-image-of-user-hd-png-download.png';

    try {
      const response = await axios.post('/register', values);
      setModal(false);
      regForm.resetFields();
      message.success("Registration Successful");

      // Update the SWR cache with the new data
      mutate('/register', [...(data || []), response.data], false); // 'false' to skip revalidation
    } catch (err) {
      console.error("Registration Error:", err.response || err);
      message.error("Unable to insert data!");
    }
  };

  const onUpdate = async (values) => {
    values.profile = imgUrl ? imgUrl : 'https://www.vhv.rs/dpng/d/15-155087_dummy-image-of-user-hd-png-download.png';

    try {
      const response = await axios.put(`/register/${id}`, values);
      setModal(false);
      regForm.resetFields();
      setId(null);
      message.success("Registration Successful");

      // Update the SWR cache with the new data
      mutate('/register', [...(data || []), response.data], false); // 'false' to skip revalidation
    } catch (err) {
     
      message.error("Unable to update data!");
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const maxSize = 8 * 1048576; // 8MB
    const fReader = new FileReader();
    if (file.size <= maxSize) {
      setDisabled(false);
      regForm.setFields([{ name: 'profile', errors: [] }]);
      fReader.readAsDataURL(file);
      fReader.onload = (ev) => {
        const url = ev.target.result;
        setImageUrl(url);
      };
    } else {
      setDisabled(true);
      regForm.setFields([{ name: 'profile', errors: ['Max 8MB Image Size!'] }]);
    }
  };

  const OnClose = ()=>{
    setModal(false);
    setId(null);
    regForm.resetFields();
  }

  return (
    <div className='min-h-screen bg-rose-100 flex flex-col items-center md:p-4'>
      <div className='flex rounded justify-between items-center bg-blue-600 w-10/12 my-5 p-4'>
        <h1 className="capitalize font-bold text-white text-2xl md:text-5xl ">Mern CRUD</h1>
        <Button
          shape='circle'
          size='large'
          className='bg-green-400 text-white'
          type='text'
          icon={<PlusOutlined />}
          onClick={() => setModal(true)}
        />
      </div>
      <Table
        className='w-10/12'
        columns={columns}
        dataSource={data || []}
        pagination={{ pageSize: 5, position: ['bottomCenter'] }}
        scroll={{ x: 'max-content' }}
        rowKey="_id" // Make sure your unique identifier is consistent
      />
      <Modal
        open={modal}
        onCancel={OnClose}
        footer={null}
        title={<h1 className='text-xl font-semibold text-blue-600'>Registration Form</h1>} 
        width={720}
      >
        <Form layout='vertical' onFinish={id ? onUpdate : onFinish} form={regForm} className='font-semibold'>
          <div className='mt-5 grid md:grid-cols-2 gap-x-2'>
            <Form.Item label='Profile' name='profile'>
              <Input type='file' onChange={handleImage} size='large' style={{ borderRadius: 0 }} />
            </Form.Item>
            <Form.Item
              label='Fullname'
              name='fullname'
              rules={[{ required: true }]}
            >
              <Input size='large' style={{ borderRadius: 0 }} />
            </Form.Item>
            <Form.Item
              label='Email'
              name='email'
              rules={[{ required: true, type: 'email' }]}
            >
              <Input size='large' style={{ borderRadius: 0 }} />
            </Form.Item>
            <Form.Item
              label='Mobile'
              name='mobile'
              rules={[{ required: true }]}
            >
              <Input size='large' style={{ borderRadius: 0 }} />
            </Form.Item>
            <Form.Item
              label='Dob'
              name='dob'
              rules={[{ required: true }]}
            >
              <Input type='date' size='large' style={{ borderRadius: 0 }} />
            </Form.Item>
            <Form.Item
              label='Gender'
              name='gender'
              rules={[{ required: true }]}
            >
              <Select className='custom-select' size='large' placeholder="Select Gender">
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
                <Select.Option value="other">Other</Select.Option>
              </Select>
            </Form.Item>
          </div>
          <Form.Item
            label='Address'
            name='address'
            rules={[{ required: true }]}
          >
            <Input.TextArea size='large' rows={4} style={{ borderRadius: 0 }} />
          </Form.Item>
          {
            id ? (
              <Button
                type='primary'
                htmlType='submit'
                className='w-full font-semibold text-white bg-rose-600'
                size='large'
                block
                disabled={disabled}
              >
                Update User
              </Button>
            ) : (
              <Button
                type='primary'
                htmlType='submit'
                className='w-full font-semibold text-white bg-blue-600'
                size='large'
                block
                disabled={disabled}
              >
                Create User
              </Button>
            )
          }

        </Form>
      </Modal>
    </div>
  );
};

export default App;
