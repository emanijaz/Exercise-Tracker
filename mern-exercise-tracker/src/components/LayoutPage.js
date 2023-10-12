
import React, {useState,useRef} from 'react';
import { UserOutlined, DashboardOutlined, CalculatorOutlined, AreaChartOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import NavBar from './NavBar';
import LoggedExercises from './LoggedExercises';
import CreateExercise from './CreateExercise';
import { Link } from 'react-router-dom';
const { Content, Sider } = Layout;

const items2 = [
  { key: 'sub1', icon: <DashboardOutlined />, label: 'Dashboard', path: '/' },
  { key: 'sub2', icon: <CalculatorOutlined />, label: 'Fitness Calculator', path: '/calculator' },
  { key: 'sub3', icon: <AreaChartOutlined />, label: 'Charts', path: '/charts' },
  { key: 'sub4', icon: <UserOutlined />, label: 'Profile', path: '/profile' },
];

const LayoutPage = () => {
  const [collapsed, setCollapsed] = useState(false);

  const loggedExercisesRef = useRef();
  // Function to be called when a new exercise is added
  const handleExerciseAdded = () => {
    // Call the fetchData function of the LoggedExercises component through the ref
    loggedExercisesRef.current.fetchData();
  };
 
  const {
    token: { colorBgContainer },
  } = theme.useToken();
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
            defaultSelectedKeys={['sub1']}
            defaultOpenKeys={['sub1']}
            style={{
              height: '180%',
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
              padding: '0 24px',
              minHeight: 280,
            }}
          >
            <CreateExercise onExerciseAdded={handleExerciseAdded}/>
            <LoggedExercises ref={loggedExercisesRef}/>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};
export default LayoutPage;