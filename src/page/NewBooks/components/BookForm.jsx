import React, {useEffect, useRef, useState} from 'react';
import {Button, Form, Input, message, Select, Upload} from "antd";
import {Editor} from "@toast-ui/react-editor";
import {PlusOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import book from "@/server/book.js";
import '@toast-ui/editor/dist/toastui-editor.css';

function BookForm(props) {
    const [form] = Form.useForm();
    const editorRef = useRef(null);
    const {typesList}  = useSelector(state=>state.types)
    const [fileList,setFileList] = useState([]);
    const navigate = useNavigate();
    const [editorKey, setEditorKey] = useState(Date.now());

    const onFinish = async (values) => {
       if(props.type =='add'){
           let data =   await book.addBook(values);
           if(data.code == 0){
               message.success('新增成功')
               navigate('/books/book-list')
           }else{
               message.error(data.msg)
           }
       }else if(props.type =='edit'){
         props.editBook(form.getFieldsValue())
       }
    }
    const handleEditorChange = (values) => {
        let editorInatance = editorRef.current.getInstance()
        const value = editorInatance.getHTML()
        form.setFieldValue('bookIntro',value)
    }
    const handleChangeAvatar = ({file,fileList})=>{
        if(file.status =='done'){
            form.setFieldValue('bookPic',file.response.data);
        }
        setFileList(fileList)
    }

    useEffect(()=>{
        if(props.bookInfo){
            form.setFieldsValue({...props.bookInfo})
            setEditorKey(Date.now());
            setFileList([{name:'bookPic',url:props.bookInfo.bookPic}])
            console.log('editorRef.current.getInstance()',editorRef.current.getInstance())
            // 4. 等编辑器渲染完再赋值（必须延时）
            const timer = setTimeout(() => {
                if (editorRef.current) {
                    editorRef.current.getInstance().setHTML(props.bookInfo.bookIntro);
                }
            }, 200);
            return () => clearTimeout(timer);
        }
    },[props.bookInfo])
    return (
        <>
            <Form
                form={form}
                onFinish={onFinish}
            >
                <Form.Item
                    label='书籍标题'
                    name='bookTitle'
                    rules={[
                        {required:true}
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='书籍介绍'
                    name='bookIntro'
                    rules={[
                        {required:true,message:'输入书籍介绍'},
                        {validator:(_,value)=>{
                                if (!editorRef.current) return Promise.reject("编辑器未加载");
                                let editorInatance = editorRef.current.getInstance()
                                console.log(!editorInatance.getMarkdown())
                                if(!editorInatance.getMarkdown()){
                                    return Promise.reject(new Error('The new password that you entered do not match!'))
                                }
                                return Promise.resolve()

                            }}
                    ]}
                >
                    <Editor
                        key={editorKey}
                        previewStyle="vertical"
                        height="400px"
                        initialEditType="markdown"
                        ref={editorRef}
                        useCommandShortcut={true}
                        onChange={handleEditorChange} // 监听变化同步值
                    />
                </Form.Item>
                <Form.Item
                    label='下载连接'
                    name='downloadLink'
                    rules={[
                        {required:true}
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='所需积分'
                    name='requirePoints'
                    rules={[
                        {required:true}
                    ]}
                >
                    <Select options={[{value:20,name:'20积分'},{value:30,name:'30积分'},{value:40,name:'40积分'}]}>
                    </Select>
                </Form.Item>
                <Form.Item
                    label='书籍分类'
                    name='typeId'
                    rules={[
                        {required:true}
                    ]}
                >
                    <Select options={typesList.map(item=>(
                        {
                            value: item._id,
                            label:item.typeName
                        }
                    ))} />
                </Form.Item>
                <Form.Item rules={[{required:true}]} label='书籍封面' name='bookPic'>
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
                <Form.Item wrapperCol={{offset:1}}>
                    <Button type="primary" htmlType="submit">{props.type=='edit'?'保存编辑':'确认新增'}</Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default BookForm;
