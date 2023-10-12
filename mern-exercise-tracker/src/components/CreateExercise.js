import React, { useState } from 'react';
import { Button, Modal, Form } from 'antd';
import axios from 'axios';
import {
    DatePicker,
    Input,
    InputNumber
} from 'antd';

const tailLayout = {
    wrapperCol: {
      offset: 6,
      span: 16,
    },
};

export default function CreateExercise() {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onFinish = async(values) => {

        axios.post("http://localhost:5000/exercises/create", {
            username: "tester1",
            description: values.description,
            duration: Number(values.duration),
            date: Date(values.date)
        }).then((response)=>{
            console.log("exercise created successfully")

        })
        console.log(values)
        setIsModalOpen(false);
    };
    const onReset = () => {
        form.resetFields();
    };
    return (
        <div>
            <Button type="dark" style={{float: "right", backgroundColor: "#002140", color: "white", marginTop: "20px"}}  onClick={showModal} >Log Exercise</Button>
            
            <Modal title="Create Exercise" open={isModalOpen} onOk={onFinish} onReset={onReset} onCancel={handleCancel} footer={null}>
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
                
                <Form.Item name="description" label="Description"
                rules={[
                    {
                      required: true,
                    },
                ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="duration" label="Duration"
                rules={[
                    {
                    required: true,
                    },
                ]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item name="date" label="DatePicker">
                    <DatePicker />
                </Form.Item>
                <Form.Item {...tailLayout} style={{marginRight: "2%"}}>
                    <Button type="primary" htmlType="submit" >Submit</Button>
                    
                </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
