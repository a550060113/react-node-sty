import React, {useRef, useState} from 'react';
import {Button, Checkbox, Form, Input, Upload, Select, message} from 'antd';
import {PlusOutlined,LoadingOutlined} from "@ant-design/icons";
import {addBlog} from "@/server/blog.js";
import {uploadImg} from "@/server/blog.js";
import {Editor} from "@toast-ui/react-editor";
import '@toast-ui/editor/dist/toastui-editor.css';
import {useNavigate} from "react-router-dom";
function BlogForm(props) {
    const [imageUrl, setImageUrl] = useState();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const editorRef = useRef(null);
    const [loading,setLoading] = useState(false);
    const [editorKey] = useState(Date.now());
    const [markDownContent,setMarkDownContent] = useState('');
    const onFinish = async (values) => {
         await addBlog({
            ...values,
            markDownContent
        });
        navigate('/BlogManage/blog-list')
        message.success('添加成功')
    }

    const handleChange = (status) =>{
        console.log(status)
    }
    const beforeUpload = () =>{

    }
    const handleEditorChange = (values) => {
        let editorInatance = editorRef.current.getInstance()
        const value = editorInatance.getHTML()
        setMarkDownContent(editorInatance.getMarkdown())
        form.setFieldValue('htmlContent',value)
    }
    const customRequest =  async (options,info)=>{
        const formData = new FormData();
        formData.append('file', options.file);
        setLoading(true);
        const data = await uploadImg(formData)
        setLoading(false)
        setImageUrl(data.data)
        form.setFieldValue('thunmb',data.data)
        console.log('data>>>',data)
    }
    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );
    return (
       <>
           <Form
               form={form}
               name="basic"
               labelCol={{ span: 1 }}
               wrapperCol={{ span: 16 }}
               onFinish={onFinish}
               autoComplete="off"
           >
               <Form.Item
                   label="文章标题"
                   name="title"
                   wrapperCol={{ span: 8 }}
                   rules={[{ required: true, message: '请输入文章标题' }]}
               >
                   <Input />
               </Form.Item>

               <Form.Item
                   label="文章描述"
                   name="description"
                   wrapperCol={{ span: 8 }}
                   rules={[{ required: true, message: '请输入文章描述' }]}
               >
                   <Input />
               </Form.Item>
               <Form.Item
                   label='文章内容'
                   name='htmlContent'
                   rules={[
                       {required:true,message:'输入文章内容'},
                       {validator:(_,value)=>{
                               if (!editorRef.current) return Promise.reject("编辑器未加载");
                               let editorInatance = editorRef.current.getInstance()
                               // console.log(!editorInatance.getMarkdown())
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
                       language='zh-CN'
                       useCommandShortcut={true}
                       onChange={handleEditorChange} // 监听变化同步值
                   />
               </Form.Item>
               <Form.Item
                   label="文章封面"
                   name="thunmb"
                   rules={[{ required: true, message: '请上传文章封面' }]}
               >
                   <Upload
                       name="thunmb"
                       listType="picture-card"
                       className="avatar-uploader"
                       showUploadList={false}
                       customRequest={customRequest}
                       beforeUpload={beforeUpload}
                       onChange={handleChange}
                   >
                       {imageUrl ? (
                           <img draggable={false} src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                       ) : (
                           uploadButton
                       )}
                   </Upload>
               </Form.Item>
               <Form.Item
                   label="文章类别"
                   wrapperCol={{ span: 8 }}
                   name="categoryId"
                   rules={[{ required: true, message: '请选择文章类别' }]}
               >
                   <Select
                       options={[
                           { value: '1', label: 'javascript' },
                           { value: '2', label: 'node' },
                       ]}
                   />
               </Form.Item>
               <Form.Item label={null}>
                   <Button type="primary" htmlType="submit">
                       Submit
                   </Button>
               </Form.Item>
           </Form>
       </>
    );
}

export default BlogForm;
