import {useState} from 'react';
import styles from './NewUser.module.css'
import {Form, Input, Button, message} from "antd";
import NewUserForm from "@/page/User/components/NewUserForm.jsx";
import user from '@/server/user.js'
import {useNavigate} from "react-router-dom";

function NewUser() {
    const navigate = useNavigate();
    const onsubmit = async (formData) => {
        let data= await user.addUser(formData);

        if(data.code == 0){
            navigate('/user/user-list')
            message.success('添加成功')
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>新增用户</div>
            <div style={{marginTop:'20px'}}>
                <NewUserForm type='add'  onSubmit={onsubmit} />
            </div>
        </div>
    );
}

export default NewUser;
