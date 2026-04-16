import {useState, useImperativeHandle, forwardRef, useEffect} from 'react';
import {Button, Radio, Form, Input, Upload, Image} from 'antd';
import {  PlusOutlined } from '@ant-design/icons';

const AddminForm = forwardRef((props,ref) => {

        const onFinish = (values)=>{
            props.onsubmit(values)
        }
        const [fileList,setFileList] = useState([]);

        const [form] = Form.useForm();
        const avatartUrl = Form.useWatch('avatar', form)
        const customValue = Form.useWatch((values) => values, form);
        // console.log('customValue',props.adminInfo)
    // if(props.adminInfo){
        //     form.setFieldsValue(props.adminInfo);
        // }
        const handleChangeAvatar = ({file,fileList})=>{
            if(file.status == 'done'){
                console.log('done',file)
                form.setFieldValue('avatar', file.response.data);
            }
            setFileList(fileList)
        }
         useImperativeHandle(ref,()=>{
            return {
                getFormData:()=>({...props.adminInfo,...form.getFieldsValue(true)}),
                validate:()=> form.validateFields()
            }
    })
    console.log('测试')
    useEffect(() => {
        console.log('执行几次')

        if( props.type == 'edit'){
            console.log('props.adminInfo',props.adminInfo)
            form.setFieldsValue(props.adminInfo);
        }
    }, []);
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
                        <Input disabled={props.type == 'edit' ? true :false} />
                    </Form.Item>

                    <Form.Item
                        label="登录密码"
                        name="loginPwd"
                        rules={[props.type =='edit'?{required:true, message: '请输入密码'}:null]}
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
                    <Form.Item   label='头像'>
                        <Image width={100} src={avatartUrl}/>
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
                    {props.type !== 'edit'  && <Form.Item label={null}>
                        <Button  type="primary" htmlType="submit">
                            确认新增
                        </Button>
                    </Form.Item>}
                </Form>
            </>
        );
    }
)

// function AddminForm(props)
export default AddminForm;
