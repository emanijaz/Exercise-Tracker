
import React, {useState} from 'react';
import { UserOutlined, DashboardOutlined, CalculatorOutlined, AreaChartOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import NavBar from './NavBar';
import LoggedExercises from './LoggedExercises';
import CreateExercise from './CreateExercise';
const { Content, Sider } = Layout;


const items2 = [DashboardOutlined, CalculatorOutlined, AreaChartOutlined, UserOutlined].map((icon, index) => {
  const key = String(index + 1);
  let itemLabel;
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
              height: '300%',
            }}
            theme="dark"
            inlineCollapsed={collapsed}
            items={items2}
          />
          </Sider>
          <Content
            style={{
              padding: '0 24px',
              minHeight: 280,
            }}
          >
            <CreateExercise/>
            <LoggedExercises/>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};
export default LayoutPage;