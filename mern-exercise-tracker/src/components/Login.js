import {
    AlipayOutlined,
    LockOutlined,
    TaobaoOutlined,
    UserOutlined,
    WeiboOutlined,
    MobileOutlined
  } from '@ant-design/icons';
  import {
    LoginFormPage,
    ProConfigProvider,
    ProFormCaptcha,
    ProFormCheckbox,
    ProFormText,
  } from '@ant-design/pro-components';
  import { Divider, Space, Tabs, theme } from 'antd';
  import { useState } from 'react';
  import logo from './logo.png';
  
  const iconStyles = {
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '18px',
    verticalAlign: 'middle',
    cursor: 'pointer',
  };
  
  const Login = () => {
    const [loginType, setLoginType] = useState('account');
    const { token } = theme.useToken();
    const handleFinish = (values) => {
        console.log('Form submitted with values:', values);
        sessionStorage.setItem('username', values.username);
      };
    return (
      <div
        style={{
          backgroundColor: 'white',
          height: '100vh',
        }}
      >
        <LoginFormPage
        //   backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
        //   logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
          logo={logo}
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
        //   actions={
        //     <div
        //       style={{
        //         display: 'flex',
        //         justifyContent: 'center',
        //         alignItems: 'center',
        //         flexDirection: 'column',
        //       }}
        //     >
        //       <Divider plain>
        //         <span
        //           style={{
        //             color: token.colorTextPlaceholder,
        //             fontWeight: 'normal',
        //             fontSize: 14,
        //           }}
        //         >
        //           Contact
        //         </span>
        //       </Divider>
        //       <Space align="center" size={24}>
        //         <div
        //           style={{
        //             display: 'flex',
        //             justifyContent: 'center',
        //             alignItems: 'center',
        //             flexDirection: 'column',
        //             height: 40,
        //             width: 40,
        //             border: '1px solid ' + token.colorPrimaryBorder,
        //             borderRadius: '50%',
        //           }}
        //         >
        //           <AlipayOutlined style={{ ...iconStyles, color: '#1677FF' }} />
        //         </div>
        //         <div
        //           style={{
        //             display: 'flex',
        //             justifyContent: 'center',
        //             alignItems: 'center',
        //             flexDirection: 'column',
        //             height: 40,
        //             width: 40,
        //             border: '1px solid ' + token.colorPrimaryBorder,
        //             borderRadius: '50%',
        //           }}
        //         >
        //           <TaobaoOutlined style={{ ...iconStyles, color: '#FF6A10' }} />
        //         </div>
        //         <div
        //           style={{
        //             display: 'flex',
        //             justifyContent: 'center',
        //             alignItems: 'center',
        //             flexDirection: 'column',
        //             height: 40,
        //             width: 40,
        //             border: '1px solid ' + token.colorPrimaryBorder,
        //             borderRadius: '50%',
        //           }}
        //         >
        //           <WeiboOutlined style={{ ...iconStyles, color: '#1890ff' }} />
        //         </div>
        //       </Space>
        //     </div>
        //   }
        >
          <Tabs
            centered
            activeKey={loginType}
            onChange={(activeKey) => setLoginType(activeKey)}
          >
            <Tabs.TabPane key={'account'} tab={'Login'} />
            <Tabs.TabPane key={'phone'} tab={'Create Account'} />
          </Tabs>
          
          {loginType === 'account' && (
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
          {loginType === 'phone' && (
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
            <ProFormCheckbox noStyle name="autoLogin">
              Remember
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              Forgot Password
            </a>
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
  