import React from 'react';
import {Image, Upload,Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import Request from "@/server/request.js";
function Types() {
    const [fileList,setFileList] = React.useState([]);
    const [avatartUrl, setAvatartUrl] = React.useState("");

    const handleChangeAvatar = ({file,fileList})=>{
        if(file.status == 'done'){
            setAvatartUrl(file.response.data);
            console.log('done',file)
        }
        setFileList(fileList)
    }
    const onRemove = file => {
        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);
        setFileList(newFileList);
    }

    const beforeUpload = (file) =>{
        setFileList([...fileList,file])
        return false
    }
    const  handleUpload = async ()=>{
        const formData = new FormData();
        console.log(fileList)
        fileList.forEach((item) => {
            formData.append('file', item);
        });
        console.log(formData)
        // return
        let result = await Request('/api/upload',{
            method: 'POST',
            headers:{
                'Authorization':`Bearer ${localStorage.getItem('adminToken')}`
            },
            data: formData
        })
        console.log('>>>result>>>',result)
    }
    return (
        <div>
            <Image width={100} src={avatartUrl}/>
            {/*<Upload*/}
            {/*    multiple*/}
            {/*    maxCount={2}*/}
            {/*    fileList={fileList}*/}
            {/*    listType="picture-card"*/}
            {/*    className="avatar-uploader"*/}
            {/*    beforeUpload={beforeUpload}*/}
            {/*    onRemove={onRemove}*/}
            {/*>*/}
            {/*    <PlusOutlined/>*/}
            {/*</Upload>*/}
            {/*<Button*/}
            {/*    type="primary"*/}
            {/*    onClick={handleUpload}*/}
            {/*    disabled={fileList.length === 0}*/}
            {/*    style={{ marginTop: 16 }}*/}
            {/*>上传</Button>*/}
            <Upload
                multiple
                maxCount={2}
                fileList={fileList}
                listType="picture-card"
                className="avatar-uploader"
                headers={
                   { 'Authorization':`Bearer ${localStorage.getItem('adminToken')}`}
                }
                action="/api/upload"
                onChange={handleChangeAvatar}
            >
                <PlusOutlined/>
            </Upload>
        </div>
    );
}

export default Types;
