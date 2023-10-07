
import React, { useEffect, useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table, Button, Space, Popconfirm, message } from 'antd';
const data = [
    {
      key: '1',
      description: 'Task 1',
      duration: '2 hours',
      date: '2023-09-29',
    },
    {
      key: '2',
      description: 'Task 2',
      duration: '1.5 hours',
      date: '2023-09-30',
    },
    {
      key: '3',
      description: 'Task 1',
      duration: '2 hours',
      date: '2023-09-29',
    },
    {
      key: '4',
      description: 'Task 2',
      duration: '1.5 hours',
      date: '2023-09-30',
    },
    {
      key: '5',
      description: 'Task 1',
      duration: '2 hours',
      date: '2023-09-29',
    },
    {
      key: '6',
      description: 'Task 2',
      duration: '1.5 hours',
      date: '2023-09-30',
    },
    {
      key: '7',
      description: 'Task 1',
      duration: '2 hours',
      date: '2023-09-29',
    }
  ];
  
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
  
// const getRandomuserParams = (params) => ({
//   results: params.pagination?.pageSize,
//   page: params.pagination?.current,
//   ...params,
// });
const LoggedExercises = () => {
//   const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

//   const fetchData = () => {
//     setLoading(true);
//     fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
//       .then((res) => res.json())
//       .then(({ results }) => {
//         setData(results);
//         setLoading(false);
//         setTableParams({
//           ...tableParams,
//           pagination: {
//             ...tableParams.pagination,
//             total: 200,
//             // 200 is mock data, you should read it from server
//             // total: data.totalCount,
//           },
//         });
//       });
//   };

//   useEffect(() => {
//     fetchData();
//   }, [JSON.stringify(tableParams)]);


//   const handleTableChange = (pagination, filters, sorter) => {
//     setTableParams({
//       pagination,
//       filters,
//       ...sorter,
//     });

//     // `dataSource` is useless since `pageSize` changed
//     if (pagination.pageSize !== tableParams.pagination?.pageSize) {
//       setData([]);
//     }
//   };
  return (
    <Table
      columns={columns}
    //   rowKey={(record) => record.login.uuid}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      // scroll={{
      //   y: 800,
      // }}
    //   onChange={handleTableChange}
    />
  );
};
export default LoggedExercises;