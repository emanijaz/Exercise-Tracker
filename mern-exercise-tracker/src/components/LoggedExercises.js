
import React, { useEffect, useState,forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import { Table } from 'antd';
  
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
];
  
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
        date: String(new Date(exercise.date))
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