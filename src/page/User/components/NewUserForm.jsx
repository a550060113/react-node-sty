import {useImperativeHandle, useState, forwardRef, useEffect} from 'react';
import {Button, Form, Input, Upload, Modal, Image} from "antd";
import {PlusOutlined} from "@ant-design/icons";

const NewUserForm = forwardRef((props,ref)=> {
    const [fileList, setFileList] = useState([]);
    const [form] = Form.useForm();

    const onFinish = (values) => {
        props.onSubmit(values)
    }


    // const avatarUrl = Form.useWatch('avatar',form) || props?.userInfo?.avatar; //防止查看的时候 Form.item 是avatar上传组件不显示而表达没有avatar字段
    const values = Form.useWatch((values)=>{
        return{
            avatar:values?.avatar || props.userInfo?.avatar,
        }
    })
    console.log('valuesloginId>>>>>>',values);
    // const avatarUrl = props.userInfo.avatar;
    // console.log('avatarUrl><>>',avatarUrl)
    // let avatar =  Form.useWatch('avatar',form)
    const handleChangeAvatar = ({file,fileList})=>{

        if(file.status == 'done'){
            // console.log('don完成上传>>',file.response.data)
            form.setFieldValue('avatar',file.response.data)
        }
        setFileList(fileList)
    }

    useImperativeHandle(ref,()=>{
        return{
            getFormData(){
                return form.getFieldsValue()
            }
        }
    })

    useEffect(() => {
        if(props.userInfo){
            form.setFieldsValue(props.userInfo)
        }
    }, []);


    return (
        <>
            {/*<Button onClick={()=>form.setFieldValue('loginId',32)}>设置字段</Button>*/}
            {/*<Button onClick={()=>{*/}
            {/*    console.log(form.getFieldsValue({*/}
            {/*        filter: (meta) => meta.touched*/}
            {/*    }))}}>获取字段</Button>*/}
            <Form
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                form={form}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="登录账号"
                    name="loginId"
                    rules={[{ required: true, message: '输入登录账号' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="昵称"
                    name="nickname"
                    rules={[{ required: true, message: '输入昵称' }]}
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
                    label="头像"
                >
                    <Image src={values.avatar} />
                </Form.Item>
                {
                    props.type !== 'view' ? (
                        <Form.Item
                            label="头像"
                            name="avatar"
                        >
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
                    ) :null
                }

                {props.type == 'add' && (
                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                            确认新增
                        </Button>
                    </Form.Item>
                )}
            </Form>
        </>
    );
    }
)


export default NewUserForm;
