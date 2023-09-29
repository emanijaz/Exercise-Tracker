
import React, {useState} from 'react';
import { UserOutlined, DashboardOutlined, CalculatorOutlined, AreaChartOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import NavBar from './NavBar';
import LoggedExercises from './LoggedExercises';
const { Content, Footer, Sider } = Layout;


const items2 = [DashboardOutlined, CalculatorOutlined, AreaChartOutlined, UserOutlined].map((icon, index) => {
  const key = String(index + 1);
  let itemLabel = ""
  if(index === 0){
    itemLabel = "Dashboard"
  }
  else if(index === 1){
    itemLabel = "Fitness Calculator"
  }
  else if(index === 2){
    itemLabel = "Charts"
  }
  else if(index === 3){
    itemLabel = "Profile"
  }
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: itemLabel,
  };
});
const LayoutPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <NavBar/>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          style={{
            padding: '24px 0',
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
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{
                height: '100%',
              }}
              items={items2}
            />
          </Sider>
          <Content
            style={{
              padding: '0 24px',
              minHeight: 280,
            }}
          >
            <LoggedExercises/>
          </Content>
        </Layout>
      </Content>
      {/* <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©2023 Created by Ant UED
      </Footer> */}
    </Layout>
  );
};
export default LayoutPage;