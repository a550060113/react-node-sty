import React from 'react';
import { Button, Result } from 'antd';
import {useNavigate} from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();
    return (
        <Result
            status="404"
            title="404"
            subTitle="此页面未找到。"
            extra={<Button onClick={()=>navigate(-1)} type="primary">返回</Button>}
        />
    );
}

export default NotFound;
