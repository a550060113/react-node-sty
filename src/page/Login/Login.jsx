import {useEffect,useState} from 'react';
import styles from './Login.module.css';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {Button, Checkbox, Col, Flex, Form, Input, message, Row} from 'antd';
import admin from '@/server/admin.js'
import {replace, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {initAdminInfo} from "@/redux/adminSlice.js";
import {useLocation} from "react-router-dom";

function Login() {
    const [captchaImg, setCaptchaImg] = useState(null);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const onFinish = async (values)=>{
        let result = await admin.login({
            ...values
        })
        console.log(result)

        if(result.data == null){
                message.error('验证码错误')
                form.resetFields(['captcha'])
                console.log('form.getFieldsValue',form.getFieldsValue(true))
                getCaptcha()
        }else{
            if(result.data.data){
                //登录成功
                if(result.data.data.enabled == false){
                    message.error('被禁止登录')
                    form.resetFields(['captcha'])
                    getCaptcha()
                }else{
                    let adminInfo = await admin.getAdminById(result.data.data._id)
                    dispatch(initAdminInfo(adminInfo.data))
                    console.log(adminInfo.data)
                    localStorage.adminToken = result.data.token
                    let path = null
                    if(location.state && location.state.from){
                        path = location.state.from
                    }
                    console.log('path>>>',path)
                    navigate(path,{replace:true})
                    message.success('登录成功')
                }
            }else{
                message.error('用户不存在')
                form.resetFields(['captcha'])
                getCaptcha()
            }
        }
        // if(!data.data){
        //     message.error('验证码错误')
        //     form.resetFields(['captcha'])
        //     console.log('form.getFieldsValue',form.getFieldsValue(true))
        //     getCaptcha()
        // }else if(!data.data.data){
        //     console.log('sasa')
        //     message.error('账号或密码错误')
        //     form.resetFields(['captcha'])
        //     getCaptcha()
        // }
        // console.log(data);
    }

    const getCaptcha = async ()=>{
        let data = await admin.getCaptcha()
        setCaptchaImg(data)
    }



    useEffect(()=>{
        console.log('登录页面的location',location)
        getCaptcha()
    },[location])
    return (
        <div className={styles.loginContainer}>
           <div className={styles.formContainer}>
               <Form
                   style={{ width: 400 }}
                   name="login"
                   form={form}
                   initialValues={{ remember: true }}
                   labelCol={{ span: 4 }}
                   onFinish={onFinish}
               >
                   <Form.Item
                       label='账号'
                       name="loginId"
                       rules={[{ required: true, message: '输入账号!' }]}
                   >
                       <Input prefix={<UserOutlined />} placeholder="Username" />
                   </Form.Item>
                   <Form.Item
                       label='密码'
                       name="loginPwd"
                       rules={[{ required: true, message: '输入密码' }]}
                   >
                       <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                   </Form.Item>
                   <Form.Item
                       label='验证码'
                       name="captcha"
                       rules={[{ required: true, message: '输入验证码' }]}
                   >
                      <Row gutter={3} align='middle' >
                          <Col span={16}>
                              <Input placeholder="验证码" />
                          </Col>
                          <Col span={5}>
                              <div onClick={()=>getCaptcha()} style={{width:'100px', height: '32px', display: 'flex', alignItems: 'center'}} dangerouslySetInnerHTML={{__html:captchaImg}}></div>
                          </Col>
                      </Row>
                   </Form.Item>
                   <Form.Item>
                           <Form.Item name="remember" valuePropName="checked" noStyle>
                               <Checkbox>记住我</Checkbox>
                           </Form.Item>
                   </Form.Item>

                   <Form.Item >
                       <Flex justify="center" >
                           <Button style={{width:'90%'}} block type="primary" htmlType="submit">
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
