import React, {useEffect} from 'react';
import styles from '././NewAdmin.module.css';
import AddminForm from "@/page/Admin/components/AddminForm.jsx";
import {useSelector,useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {addAdminAsyncThunk,getAdminListAsyncThunk} from "@/redux/adminSlice.js";
import {message} from "antd";

function NewAdmin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {adminList} = useSelector((state) => state.admin);

    const onsubmit = (formValues) =>{
        dispatch(addAdminAsyncThunk(formValues))
        message.success('添加成功')
        navigate('/admin/admin-list')
        console.log('formValues',formValues);
    }

    useEffect(()=>{
        if(!adminList.length){
            dispatch(getAdminListAsyncThunk())
        }
    },[])
    return (
        <div className={styles.container}>
            <div className={styles.title}>新增管理员</div>
            <div style={{marginTop:'20px'}}>
                <AddminForm type='add' initialValues={{permission:2}} onsubmit={onsubmit} />

            </div>
        </div>
    );
}

export default NewAdmin;
