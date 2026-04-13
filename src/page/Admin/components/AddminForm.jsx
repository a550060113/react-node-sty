import {useState} from 'react';
import { Button, Radio, Form, Input,Upload } from 'antd';
import {  PlusOutlined } from '@ant-design/icons';

function AddminForm(props) {

    const onFinish = (values)=>{
        props.onsubmit(values)
    }
    const [fileList,setFileList] = useState([]);
    const handleChangeAvatar = ({file,fileList})=>{
        if(file.status == 'done'){
            console.log('done',file)

            form.setFieldValue('avatar', file.response.data);
        }
        setFileList(fileList)
    }
    const [form] = Form.useForm();
    return (
        <>
            <Form
                name="basic"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 23}}
                style={{maxWidth:'500px'}}
                onFinish={onFinish}
                autoComplete="off"
                form={form}
                initialValues={props.initialValues}
            >
                <Form.Item
                    label="管理员账号"
                    name="loginId"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="登录密码"
                    name="loginPwd"
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="登录昵称"
                    name="nickname"
                >
                    <Input />
                </Form.Item>

                <Form.Item name="permission"  label='权限选择'>
                    <Radio.Group  options={[{label:'普通管理员',value:2},{label:'超级管理员',value:1}]} />
                </Form.Item>
                <Form.Item name="avatar"  label='上传头像'>
                    <Upload
                        maxCount={1}
                        fileList={fileList}
                        listType="picture-card"
                        className="avatar-uploader"
                        action="/api/upload"
                        onChange={handleChangeAvatar}
                    >
                        <PlusOutlined/>
                    </Upload>
                </Form.Item>
                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        确认新增
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default AddminForm;
