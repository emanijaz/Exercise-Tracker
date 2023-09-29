
import React, { useEffect, useState } from 'react';
import qs from 'qs';
import { Table } from 'antd';
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
    // Add more data as needed
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
  ];
  
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
    //   onChange={handleTableChange}
    />
  );
};
export default LoggedExercises;