import React, { useEffect, useState, forwardRef, useImperativeHandle, useRef } from 'react';
import axios from 'axios'
import dayjs from 'dayjs';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table, Button, Space, Popconfirm, message, Modal, Form, Input, InputNumber } from 'antd';

    
const LoggedExercises = forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingExercise, setEditingExercise] = useState(null);
  const editFormRef = useRef();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/exercises/');
      const d = response.data.map((exercise, index)=> ({
        key: exercise._id,
        description: exercise.description,
        duration: exercise.duration,
        date: dayjs(exercise.date).format('YYYY-MM-DD')
      }))
      setData(d);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 

  const columns = [
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
      <Space size="middle">
        <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}/>
        <Popconfirm
          title="Delete the exercise"
          description="Are you sure to delete this exercise?"
          onConfirm={() => handleDelete(record)}
          onCancel={cancelDelete}
          okText="Yes"
          cancelText="No"
        >
          <Button danger icon={<DeleteOutlined />}/>
        </Popconfirm>
      </Space>
      )
    }
  ];
  const cancelDelete = (e) => {
    console.log(e);
  };
  const handleEdit = (record) => {
    console.log(record)
    setEditingExercise(record);
    setEditModalVisible(true);
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
    setEditingExercise(null);
  };

  const handleEditModalOk = () => {
    const form = editFormRef.current;
    form
      .validateFields()
      .then(async (values) => {
        try {
          await axios.post(`http://localhost:5000/exercises/update/${editingExercise.key}`, {
            username: "tester1",
            description: values.description,
            duration: Number(values.duration),
            date: values.date,
          });
          message.success('Exercise updated successfully');
          fetchData();
        } catch (error) {
          message.error('Error updating exercise');
        } finally {
          setEditModalVisible(false);
          setEditingExercise(null);
        }
      })
      .catch((error) => {
        console.error('Validation error:', error);
      });
  };

  const handleDelete = async(record) => {
    try {
      await axios.delete(`http://localhost:5000/exercises/${record.key}`);
      message.success('Exercise deleted successfully');
      fetchData();
    } catch (error) {
      message.error('Error deleting exercise');
    } 
  };

  // Expose the fetchData function through the ref
  useImperativeHandle(ref, () => ({
    fetchData,
  }));

  return (
    <div>
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{ pageSize: 10 }}
    />

    <Modal
      title="Edit Exercise"
      visible={editModalVisible}
      onOk={handleEditModalOk}
      onCancel={handleEditModalCancel}
    >
      <Form ref={editFormRef} initialValues={editingExercise?.record} layout="vertical">
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter the description' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="duration"
          label="Duration"
          rules={[{ required: true, message: 'Please enter the duration' }]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: 'Please select the date' }]}
        >
          <Input type="date" />
        </Form.Item>
      </Form>
    </Modal>
    </div>
  );
});
export default LoggedExercises;