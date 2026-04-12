import React from 'react';
import styles from './Login.module.css';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Flex, Form, Input } from 'antd';
function Login() {
    const onFinish = (values)=>{
        console.log(values);
    }
    return (
        <div className={styles.loginContainer}>
           <div className={styles.formContainer}>
               <Form
                   name="login"
                   initialValues={{ remember: true }}
                   onFinish={onFinish}
               >
                   <Form.Item
                       label='账号'
                       name="username"
                       rules={[{ required: true, message: '输入账号!' }]}
                   >
                       <Input prefix={<UserOutlined />} placeholder="Username" />
                   </Form.Item>
                   <Form.Item
                       label='密码'
                       name="password"
                       rules={[{ required: true, message: '输入密码' }]}
                   >
                       <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                   </Form.Item>
                   <Form.Item>
                           <Form.Item name="remember" valuePropName="checked" noStyle>
                               <Checkbox>Remember me</Checkbox>
                           </Form.Item>
                   </Form.Item>

                   <Form.Item >
                       <Flex justify="center" >
                           <Button style={{width:'300px'}} block type="primary" htmlType="submit">
                               登录
                           </Button>
                       </Flex>
                   </Form.Item>
               </Form>
           </div>
        </div>
    );
}

export default Login;
