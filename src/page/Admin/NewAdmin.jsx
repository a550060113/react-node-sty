import React, {useEffect} from 'react';
import styles from '././NewAdmin.module.css';
import AddminForm from "@/page/Admin/components/AddminForm.jsx";
import {useSelector,useDispatch} from "react-redux";
import {addAdminAsyncThunk,getAdminListAsyncThunk} from "@/redux/adminSlice.js";

function NewAdmin() {
    const dispatch = useDispatch();
    const {adminList} = useSelector((state) => state.admin);

    const onsubmit = (formValues) =>{
        dispatch(addAdminAsyncThunk(formValues))
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
