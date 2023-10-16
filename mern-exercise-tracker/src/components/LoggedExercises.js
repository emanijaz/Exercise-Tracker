import React, { useEffect, useState, forwardRef, useImperativeHandle  } from 'react';
import axios from 'axios'
import dayjs from 'dayjs';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table, Button, Space, Popconfirm, message } from 'antd';
  
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
        <Button icon={<EditOutlined />} onClick={() => handleEdit(record.id)}>
          Edit
        </Button>
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          okText="Yes"
          cancelText="No"
        >
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>Delete</Button>
        </Popconfirm>
      </Space>
      )
    }
  ];
  const confirmDelete = (e) => {
    console.log(e);
    message.success('Click on Yes');
  };
  const cancelDelete = (e) => {
    console.log(e);
    message.error('Click on No');
  };
  const handleEdit = (id) => {
    // Implement edit logic here
    console.log(`Edit record with ID ${id}`);
  };
  
  const handleDelete = (id) => {
    // Implement delete logic here
    console.log(`Delete record with ID ${id}`);
  };

  
const LoggedExercises = forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/exercises/');
      const d = response.data.map((exercise, index)=> ({
        key: index,
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

  // Expose the fetchData function through the ref
  useImperativeHandle(ref, () => ({
    fetchData,
  }));

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{ pageSize: 10 }}
    />
  );
});
export default LoggedExercises;