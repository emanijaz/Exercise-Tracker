import {
    LockOutlined,
    UserOutlined
  } from '@ant-design/icons';
  import {
    LoginFormPage,
    ProConfigProvider,
    ProFormText,
  } from '@ant-design/pro-components';
  import { Tabs, theme, message } from 'antd';
  import { useState } from 'react';
  import axios from 'axios'
  import { Navigate } from 'react-router-dom';

  const Login = () => {
    const [redirectToDashboard, setRedirectToDashboard] = useState(false);
    const [loginType, setLoginType] = useState('login');
    const { token } = theme.useToken();
    const handleFinish = async(values) => {
        try {
            if (loginType === "login") {
                const response = await axios.post('http://localhost:5000/users/login', {
                    username: values.username,
                    password: values.password
                });
                console.log(response);
                if(response.status === 200){
                    message.success('User LoggedIn successfully');
                    sessionStorage.setItem('username', values.username);
                    setRedirectToDashboard(true);
                }
                if(response.status === 400){
                    message.error('Retry Login, enter correct username and password');
                }
            } else {
                const response = await axios.post('http://localhost:5000/users/create', {
                    username: values.new_username,
                    password: values.new_password
                });
                if(response.status === 200){
                    message.success('User created successfully');
                    sessionStorage.setItem('username', values.username);
                    setRedirectToDashboard(true);
                }
                if(response.status === 400){
                    message.error('Error creating user');
                }
                console.log(response);
            }
    
        } catch (error) {
            if (error.response) {
                message.error(error.response.data);
            }
        }
      };
    if (redirectToDashboard) {
        return <Navigate to="/" />;
    }
    return (
      <div
        style={{
          backgroundColor: 'white',
          height: '100vh',
        }}
      >
        <LoginFormPage
          backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
          title="FitMe"
          containerStyle={{
            backgroundColor: 'rgba(0, 0, 0,0.65)',
            backdropFilter: 'blur(4px)',
          }}
          subTitle="Stay Active, Stay Healthy"
          onFinish={handleFinish}
          submitter={{
            searchConfig: {
              submitText: 'Submit',
            },
          }}

        >
          <Tabs
            centered
            activeKey={loginType}
            onChange={(activeKey) => setLoginType(activeKey)}
          >
            <Tabs.TabPane key={'login'} tab={'Login'} />
            <Tabs.TabPane key={'register'} tab={'Create Account'} />
          </Tabs>
          
          {loginType === 'login' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: (
                    <UserOutlined
                      style={{
                        color: token.colorText,
                      }}
                      className={'prefixIcon'}
                    />
                  ),
                }}
                placeholder={'Username'}
                rules={[
                  {
                    required: true,
                    message: 'Username Required!',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: (
                    <LockOutlined
                      style={{
                        color: token.colorText,
                      }}
                      className={'prefixIcon'}
                    />
                  ),
                }}
                placeholder={'Password'}
                rules={[
                  {
                    required: true,
                    message: 'Password Required！',
                  },
                ]}
              />
       
            </>
          )}
          {loginType === 'register' && (
          <>
            <ProFormText
                name="new_username"
                fieldProps={{
                  size: 'large',
                  prefix: (
                    <UserOutlined
                      style={{
                        color: token.colorText,
                      }}
                      className={'prefixIcon'}
                    />
                  ),
                }}
                placeholder={'Enter Username'}
                rules={[
                  {
                    required: true,
                    message: 'Username Required!',
                  },
                ]}
              />
              <ProFormText.Password
                name="new_password"
                fieldProps={{
                  size: 'large',
                  prefix: (
                    <LockOutlined
                      style={{
                        color: token.colorText,
                      }}
                      className={'prefixIcon'}
                    />
                  ),
                }}
                placeholder={'Enter Password'}
                rules={[
                  {
                    required: true,
                    message: 'Password Required！',
                  },
                ]}
              />
            
          </>
          )}
          
          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
          </div>
        </LoginFormPage>
      </div>
    );
  };
  
  export default () => {
    return (
      <ProConfigProvider dark>
        <Login />
      </ProConfigProvider>
    );
  };
  