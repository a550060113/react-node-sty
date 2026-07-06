import React from 'react';
import {Image, Upload} from "antd";
import {PlusOutlined} from "@ant-design/icons";

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
    return (
        <div>
            <Image width={100} src={avatartUrl}/>
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
        </div>
    );
}

export default Types;
