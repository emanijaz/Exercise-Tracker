
import React, {useState} from 'react';
import { DashboardOutlined, CalculatorOutlined, AreaChartOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';
const { Content, Sider } = Layout;

const items2 = [
  { key: 'sub1', icon: <DashboardOutlined />, label: 'Dashboard', path: '/' },
  { key: 'sub2', icon: <CalculatorOutlined />, label: 'Fitness Calculator', path: '/calculator' },
  { key: 'sub3', icon: <AreaChartOutlined />, label: 'Charts', path: '/chart' },
];

const LayoutPage = ({children, defaultSelectedKey}) => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <NavBar/>
      <Content
        style={{
          padding: '0 0px',
          overflow: 'initial' 
        }}
      >
        <Layout
          style={{
            padding: '0px 0',
            background: colorBgContainer,
            minHeight: '100%'
          }}
        >
          <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
            style={{
              background: colorBgContainer,
              minHeight: '100vh', overflow: 'hidden'
            }}
            width={200}
          >
          <Menu 
            mode="inline"
            defaultSelectedKeys={[defaultSelectedKey]}
            defaultOpenKeys={[defaultSelectedKey]}
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
              minHeight: '100vh',
            }}
          >
            {children}
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};
export default LayoutPage;