import React, { useState, useEffect } from 'react';
import axios from 'axios'
import dayjs from 'dayjs';
import { Alert, Calendar, Row, Col } from 'antd';
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
  const [exerciseData, setExerciseData] = useState([]);
  const [exerciseDescriptions, setExerciseDescriptions] = useState({});
  const [value, setValue] = useState(() => dayjs());
  const [selectedValue, setSelectedValue] = useState(() => dayjs());
  const onSelect = (newValue) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };
  const onPanelChange = (newValue) => {
    setValue(newValue);
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();


  const dateCellRender = (value) => {
    const formattedDate = value.format('YYYY-MM-DD');
    const descriptions = exerciseDescriptions[formattedDate];

    return (
      <div>
        {descriptions && descriptions.length > 0 && (
          <ul>
            {descriptions.map((description, index) => (
              <li key={index}>{description}</li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  useEffect(() => {
    // Fetch your exercise data from the server
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/exercises/');
        const filteredExercises = response.data.filter((exercise)=> {
            return dayjs(exercise.date).format('YYYY-MM-DD') === selectedValue.format('YYYY-MM-DD');
        })
        setExerciseData(filteredExercises);

        const descriptions = {};
        response.data.forEach((exercise) => {
          const formattedDate = dayjs(exercise.date).format('YYYY-MM-DD');
          if (!descriptions[formattedDate]) {
            descriptions[formattedDate] = [];
          }
          descriptions[formattedDate].push(exercise.description);
        });
        setExerciseDescriptions(descriptions);
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
          width={180}
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
            <Row gutter={[16, 16]}> {/* Add Row with gutter for spacing */}
                <Col span={16}>
                    <Alert message={`You selected date: ${selectedValue?.format('YYYY-MM-DD')}`} />
                    <Calendar value={value} onSelect={onSelect} onPanelChange={onPanelChange} dateCellRender={dateCellRender} />
                </Col>
                <Col span={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    { exerciseData.length > 0 ? 
                        <ExercisePieChart exerciseData={exerciseData} /> : 
                        <Alert message="No Data To Show, Select any other date from calendar" />
                    }
                </Col>
            </Row>

        </Content>
        </Layout>
      </Content>
    </Layout>

  );
};
export default Chart;