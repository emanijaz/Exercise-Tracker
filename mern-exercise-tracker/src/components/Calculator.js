import React , {useState} from 'react'
import NavBar from './NavBar'
import { Layout, Menu ,theme} from 'antd';
import { UserOutlined, DashboardOutlined, CalculatorOutlined, AreaChartOutlined } from '@ant-design/icons';
import { Card, Row, Col, Button,  Modal, Form, InputNumber, Select, Alert} from 'antd';
import axios from 'axios'
import { Link } from 'react-router-dom';
const { Option } = Select;
const { Content, Sider } = Layout;

const tailLayout = {
    wrapperCol: {
      offset: 6,
      span: 16,
    },
};

const items2 = [
    { key: 'sub1', icon: <DashboardOutlined />, label: 'Dashboard', path: '/' },
    { key: 'sub2', icon: <CalculatorOutlined />, label: 'Fitness Calculator', path: '/calculator' },
    { key: 'sub3', icon: <AreaChartOutlined />, label: 'Charts', path: '/chart' },
    { key: 'sub4', icon: <UserOutlined />, label: 'Profile', path: '/profile' },
  ];
  

export default function Calculator() {
    const [collapsed, setCollapsed] = useState(false);
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bmi, setBmi] = useState(false);
    const [bmr, setBmr] = useState(false);
    const [bfp, setBfp] = useState(false);
    const [ibw, setIbw] = useState(false);
    const [whr, setWhr] = useState(false);
    const [absi, setAbsi] = useState(false);

    const handleBmiForm = () => {
        setBmi(true);
        setIsModalOpen(true);
    };
    const handleBmrForm = () => {
        setBmr(true);
        setIsModalOpen(true);
    };
    const handleBfpForm = () => {
        setBfp(true);
        setIsModalOpen(true);
    };
    const handleIbwForm = () => {
        setIbw(true);
        setIsModalOpen(true);
    };
    const handleWhrForm = () => {
        setWhr(true);
        setIsModalOpen(true);
    };
    const handleAbsiForm = () => {
        setAbsi(true);
        setIsModalOpen(true);
    };
    
    const handleCancel = () => {
        setBmi(false);
        setBmr(false);
        setBfp(false);
        setIbw(false);
        setWhr(false);
        setAbsi(false);
        setIsModalOpen(false);
        form.resetFields();
    };
    const onFinish = async (values) => {
        let params = {};
        let type = ""
        if(bmi){
            type = "bmi"
            params = {
                weight: String(values.weight),
                height: String(values.height)
            }
        }
        else if(bmr){
            type = "bmi"
            params = {
                weight: String(values.weight),
                height: String(values.height),
                age: String(values.age),
                gender: values.gender
            }
        }
        else if(bfp){
            type = "bfp"
            params = {
                weight: String(values.weight),
                height: String(values.height),
                age: String(values.age),
                gender: values.gender
            }
        }
        else if(ibw){
            type = "ibw"
            params = {
                weight: String(values.weight),
                height: String(values.height),
                gender: values.gender
            }
        }
        else if(whr){
            type = "whr"
            params = {
                waist: String(values.waist),
                hip: String(values.hip),
                gender: values.gender
            }
        }
        else if(absi){
            type = "absi"
            params = {
                weight: String(values.weight),
                height: String(values.height),
                waist: String(values.waist),
                age: String(values.age),
                gender: values.gender
            }
        }

        const options = {
            method: 'GET',
            url: `https://mega-fitness-calculator1.p.rapidapi.com/${type}`,
            params: params,
            headers: {
                'X-RapidAPI-Key': 'c87cc564dbmsh3177faec6eeccecp1d7464jsn1b0185e0a4b5',
                'X-RapidAPI-Host': 'mega-fitness-calculator1.p.rapidapi.com'
            }
          };
          
          try {
            const response = await axios.request(options);
            console.log(response.data);
            const resultInfo = response.data.info;
            Modal.info({
                // title: 'Calculation Successful',
                content: (
                <>
                    <Alert
                    message="Result:"
                    description="Calculation successful!"
                    type="success"
                    showIcon
                    />
                    {resultInfo && (
                    <div>
                        <h3>Details:</h3>
                        <ul>
                        {Object.entries(resultInfo).map(([key, value]) => (
                            <li key={key}>
                            <strong>{key}:</strong> {value}
                            </li>
                        ))}
                        </ul>
                    </div>
                    )}
                </>
                ),
            });
          } catch (error) {
              console.error(error);
              Modal.error({
                title: 'Calculation Failed',
                content: 'An error occurred during calculation.',
              });
          }
        console.log(values)
        handleCancel();
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
            defaultSelectedKeys={['sub2']}
            defaultOpenKeys={['sub2']}
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
              padding: '0 24px',
              minHeight: 280,
            }}
          >

            <Row style={{margin: "5% 5%"}} gutter={16}>
                <Col span={8}>
                <Card title="Body Mass Index" bordered={true}>
                    Body mass index (BMI) is a value derived from the mass (weight) and height of a person. The BMI is defined as the body mass divided by the square of the body height, and is expressed in units of kg/m2, resulting from mass in kilograms (kg) and height in metres (m).
                    <Button type="dark" style={{float: "right", backgroundColor: "#002140", color: "white", marginTop: "20px"}}  onClick={handleBmiForm} >Calculate</Button>
                </Card>
                
                </Col>
                <Col span={8}>
                <Card title="Basal Metabolic Rate" bordered={true}>
                    Basal metabolic rate is the energy expended by an individual at rest (when fasted and at thermoneutral temperature), as a result of normal cell and organ function within the body, and accounts for approximately 60-75% of total daily energy expenditure in individuals with a sedentary occupation.
                    <Button type="dark" style={{float: "right", backgroundColor: "#002140", color: "white", marginTop: "20px"}}  onClick={handleBmrForm} >Calculate</Button>
                </Card>
                </Col>
                <Col span={8}>
                <Card title="Body Fat Percentage" bordered={true}>
                    Body fat percentage (BFP) is a good indicator of your body composition and indicates the amount of fat you have in your body. Body fat percentage (BFP) is the total mass of fat divided by total body mass. The total body fat includes essential body fat and stored body fat.
                    <Button type="dark" style={{float: "right", backgroundColor: "#002140", color: "white", marginTop: "20px"}}  onClick={handleBfpForm} >Calculate</Button>
                </Card>
                </Col>
            </Row>
            <Row  style={{margin: "5% 5%"}} gutter={16}>
                <Col span={8}>
                <Card title="Ideal Body Weight" bordered={true}>
                    Ideal body weight (IBW) was initially introduced by Ben J. Devine in 1974 to allow estimation of drug clearances in obese patients; researchers have since shown that the metabolism of certain drugs relates more to IBW than total body weight. The term was based on the use of insurance data that demonstrated the relative mortality for males and females according to different height-weight combinations.
                    <Button type="dark" style={{float: "right", backgroundColor: "#002140", color: "white", marginTop: "20px"}}  onClick={handleIbwForm} >Calculate</Button>
                </Card>
                </Col>
                <Col span={8}>
                <Card title="Waist-Hip Ratio" bordered={true}>
                    The Waist Hip Ratio is calculated by dividing your waist measurement by your hip measurement, since the hips are the widest part of your buttocks. It is a simple but useful measure of fat distribution. 
                    <Button type="dark" style={{float: "right", backgroundColor: "#002140", color: "white", marginTop: "20px"}} onClick={handleWhrForm} >Calculate</Button>
                </Card>
                </Col>
                <Col span={8}>
                <Card title="A Body Shape Index" bordered={true}>
                    A Body Shape Index (ABSI) or simply body shape index (BSI) is a metric for assessing the health implications of a given human body height, mass and waist circumference (WC). The inclusion of WC is believed to make the BSI a better indicator of risk of mortality from excess weight than the standard body mass index.
                    <Button type="dark" style={{float: "right", backgroundColor: "#002140", color: "white", marginTop: "20px"}}  onClick={handleAbsiForm} >Calculate</Button>
                </Card>
                </Col>
            </Row>


            <Modal title="Provide Information" open={isModalOpen} onOk={onFinish} onCancel={handleCancel} footer={null}>
            <Form
                form={form}
                onFinish={onFinish}
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                initialValues={{
                    size: "default",
                }}
                size="default"
                style={{
                    maxWidth: 600,
                    marginTop: "10%",
                }}
            >
                {(bmi || bmr || bfp || ibw || absi) && 
                <Form.Item name="weight" label="Weight"
                rules={[
                    {
                      required: true,
                    },
                ]}
                >
                    <InputNumber />
                </Form.Item> }
                {(bmi || bmr || bfp || ibw || absi) &&
                <Form.Item name="height" label="Height"
                rules={[
                    {
                    required: true,
                    },
                ]}
                >
                    <InputNumber />
                </Form.Item> }
                {(bmr || bfp || absi) && 
                <Form.Item name="age" label="Age"
                rules={[
                    {
                    required: true,
                    },
                ]}
                >
                    <InputNumber />
                </Form.Item> }
                {(whr || absi) && 
                <Form.Item name="waist" label="Waist"
                rules={[
                    {
                    required: true,
                    },
                ]}
                >
                    <InputNumber />
                </Form.Item> }
                {whr && 
                <Form.Item name="hip" label="Hip"
                rules={[
                    {
                    required: true,
                    },
                ]}
                >
                    <InputNumber />
                </Form.Item> }
                {(bmr || bfp ||ibw || whr ||absi) && 
                <Form.Item
                    name="gender"
                    label="Gender"
                    rules={[
                    {
                        required: true,
                        message: 'Please select gender!',
                    },
                    ]}
                >
                    <Select placeholder="select your gender">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    </Select>
                </Form.Item>}
                <Form.Item {...tailLayout} style={{marginRight: "2%"}}>
                    <Button type="primary" htmlType="submit" >Submit</Button>
                    
                </Form.Item>
                </Form>
            </Modal>

          </Content>
        </Layout>
      </Content>
    </Layout>
  )
}
