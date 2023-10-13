import React, { useState, useEffect } from 'react';
import axios from 'axios'
import dayjs from 'dayjs';
import { Alert, Calendar } from 'antd';
import NavBar from './NavBar'
import { Link } from 'react-router-dom';
import ExercisePieChart from './ExercisePieChart';
import { UserOutlined, DashboardOutlined, CalculatorOutlined, AreaChartOutlined } from '@ant-design/icons';
import { Layout, Menu ,theme} from 'antd';
const { Content, Sider } = Layout;


const items2 = [
    { key: 'sub1', icon: <DashboardOutlined />, label: 'Dashboard', path: '/' },
    { key: 'sub2', icon: <CalculatorOutlined />, label: 'Fitness Calculator', path: '/calculator' },
    { key: 'sub3', icon: <AreaChartOutlined />, label: 'Charts', path: '/chart' },
    { key: 'sub4', icon: <UserOutlined />, label: 'Profile', path: '/profile' },
];

const Chart = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [value, setValue] = useState(() => dayjs('2017-01-25'));
  const [selectedValue, setSelectedValue] = useState(() => dayjs('2017-01-25'));
  const onSelect = (newValue) => {
    setValue(newValue);
    setSelectedValue(newValue);
    console.log("new value on select : ", newValue)
  };
  const onPanelChange = (newValue) => {
    setValue(newValue);
    console.log("panel value : ", newValue)
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [exerciseData, setExerciseData] = useState([]);

  useEffect(() => {
    // Fetch your exercise data from the server
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/exercises/');
        const filteredExercises = response.data.filter((exercise)=> {
            console.log(dayjs(exercise.date).format('YYYY-MM-DD'))
            return dayjs(exercise.date).format('YYYY-MM-DD') === selectedValue.format('YYYY-MM-DD');
        })
        setExerciseData(filteredExercises);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedValue]);
  return (
    
    <Layout>
    <NavBar/>
    <Content
      style={{
        padding: '0 0px',
      }}
    >
      <Layout
        style={{
          padding: '0px 0',
          background: colorBgContainer,
        }}
      >
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
          style={{
            background: colorBgContainer,
          }}
          width={200}
        >
        <Menu 
          mode="inline"
          defaultSelectedKeys={['sub3']}
          defaultOpenKeys={['sub3']}
          style={{
            height: '400%',
          }}
          theme="dark"
          inlineCollapsed={collapsed}
          
        >
          {items2.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.path}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
        </Sider>
        <Content
          style={{
            padding: '20px 100px',
            minHeight: 280,
          }}
        >
            <Alert message={`You selected date: ${selectedValue?.format('YYYY-MM-DD')}`} />
            <Calendar value={value} onSelect={onSelect} onPanelChange={onPanelChange} />
            <ExercisePieChart exerciseData={exerciseData} />
        </Content>
        </Layout>
      </Content>
    </Layout>

  );
};
export default Chart;