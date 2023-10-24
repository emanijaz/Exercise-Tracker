
import React from 'react';
import { Form, Input, Button, Tabs, Card } from 'antd';
import { message } from 'antd';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const { TabPane } = Tabs;
const { Item } = Form;


const LoginForm = ({ onFinish }) => {
  return (
    <Form onFinish={onFinish}>
      <Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input />
      </Item>
      <Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password />
      </Item>
      <Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Item>
    </Form>
  );
};

const CreateAccountForm = ({ onFinish }) => {
  return (
    <Form onFinish={onFinish}>
      <Item label="Username" name="new_username" rules={[{ required: true, message: 'Please input your new username!' }]}>
        <Input />
      </Item>
      <Item label="Password" name="new_password" rules={[{ required: true, message: 'Please input your new password!' }]}>
        <Input.Password />
      </Item>
      <Item>
        <Button type="primary" htmlType="submit">
          Create Account
        </Button>
      </Item>
    </Form>
  );
};

export default function Login() {
  const navigate = useNavigate();
  const handleLogin = async(values) => {
    try{

    
      const response = await axios.post('/users/login', {
        username: values.username,
        password: values.password
      });
      if(response.status === 200){
          message.success('User LoggedIn successfully');
          sessionStorage.setItem('username', values.username);
          navigate("/")
      }
      else{
          message.error('Retry Login, enter correct username and password');
      }
    }
    catch (error) {
      if (error.response) {
          message.error(error.response.data);
      }
    }
  };

  const handleCreateAccount = async(values) => {
    try{
    const response = await axios.post('/users/create', {
          username: values.new_username,
          password: values.new_password
      });
      if(response.status === 200){
          message.success('User created successfully');
          sessionStorage.setItem('username', values.new_username);
          navigate("/")

      }
      else{
          message.error('Error creating user');
      }
    }
    catch (error) {
      if (error.response) {
          message.error(error.response.data);
      }
    }
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#001529' }}>
      <Card title="FitMe" style={{ width: 500, height: 400, padding: '20px', borderRadius: '8px' }}>
        <Tabs defaultActiveKey="login">
          <TabPane tab="Login" key="login">
            <LoginForm onFinish={handleLogin} />
          </TabPane>
          <TabPane tab="Create Account" key="createAccount">
            <CreateAccountForm onFinish={handleCreateAccount} />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
}
