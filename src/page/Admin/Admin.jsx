import {useEffect, useState, useRef, use} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAdminListAsyncThunk,delAdminAsyncThunk,updateAdminAsyncThunk} from "@/redux/adminSlice.js";
import { Space, Table, Tag,Avatar,Switch, Button,Popconfirm,message,Modal } from 'antd';
import styles from './Admin.module.css';
import AddminForm from "@/page/Admin/components/AddminForm.jsx";
function Admin() {
    const dispatch = useDispatch();
    const {adminList} = useSelector((state) => state.admin);

    const [isModalOpen,setModalOpen] = useState(false);
    const [adminInfo,setAdminInfo] = useState(null);
    const [pageInfo,setPageInfo] = useState({
        current:1,
        pageSize:10
    });
    const formRef = useRef(null);
    const columns = [
        {
            title: '序号',
            align: 'center',
            render: (text, record,index) => (pageInfo.current -1) * pageInfo.pageSize + index+1
        },{
            title: '登录账号',
            dataIndex: 'loginId',
            key: 'loginId',
        },
        {
            title: '登录密码',
            dataIndex: 'loginPwd',
            key: 'loginPwd',
        },
        {
            title: '昵称',
            dataIndex: 'nickname',
            key: 'nickname',
        },{
            title: '头像',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (text) => (
                <Avatar size={64} src={text} />
            )
        },{
            title: '账号状态',
            dataIndex: 'enabled',
            key: 'enabled',
            render: (text,row) => (
                <Switch size={"middle"} defaultChecked={row.enabled ? true:false}  onChange={(e)=>onChangeTableSwitch(e,row)}  />
            )
        },{
            title: '权限',
            dataIndex: 'permission',
            key: 'permission',
            render: (text,record) =>{
                return record.permission ==1 ? <Tag color='orange' variant='outlined'>超级管理员</Tag> :record.permission ==2 ? <Tag color='#108ee9' variant='outlined'>超级管理员</Tag> :null
            }
            },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (text,record) =>{
                return (
                    <Space size="middle">
                        <Button onClick={()=>editAdmin(record)} color="primary" variant="text">编辑</Button>
                        <Popconfirm
                            description="是否要删除此管理员?"
                            onConfirm={()=>delAdmin(record._id)}
                            okText="确定"
                            cancelText="取消"
                        >
                            <Button color="primary" variant="text">删除</Button>
                        </Popconfirm>
                    </Space>
                )
            }
        }
        ]
    const onChangeTableSwitch = (e,row)=>{
        dispatch(updateAdminAsyncThunk({
            id: row._id,
            newInfo:{
                enabled: e
            }
        }))
    }
    const delAdmin = async (id)=>{
        dispatch(delAdminAsyncThunk(id))
        message.success('删除成功')
       // let {data} = await admin.deleteAdmin(id)
    }
    const editAdmin = (row)=>{
        setAdminInfo(row)
        setModalOpen(true);
    }
    const handleOk = async ()=>{

        // console.log(formRef.current.getFieldsValue())
        // let values = await formRef.current.validateFields()
        // console.log(values)
       let values  = await formRef.current.validate()
        console.log(values)
        console.log('success')
        let admin = formRef.current.getFormData()
        console.log(formRef.current.getFormData())
        dispatch(updateAdminAsyncThunk({id:admin._id,newInfo:admin}))
        message.success('修改成功')
        setModalOpen(false);

    }
    const handleCancel = ()=>{
        setModalOpen(false);
    }
    useEffect(() => {
        if(!adminList.length){
            dispatch(getAdminListAsyncThunk());
        }
    }, []);
    return (
        <div className={styles.container}>
           <div className={styles.title}>管理员列表</div>
           <div className={styles.tableContainer}>
               <Table
                   pagination={{
                   total:adminList.length,
                   showTotal:(total)=> `总数 ${total} 条`,
                   current:pageInfo.current,
                   pageSize:pageInfo.pageSize,
                   onChange:(page, pageSize)=>{
                       setPageInfo({
                           current:page,
                           pageSize:pageSize
                       })
                       console.log(page,pageSize)
                   }
               }}
                   rowKey={(row)=>row._id}
                   columns={columns}
                   dataSource={adminList} />
           </div>
            <Modal
                title="编辑管理员"
                closable={{ 'aria-label': 'Custom Close Button' }}
                destroyOnHidden={true}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <AddminForm ref={formRef} type='edit' adminInfo={adminInfo} />
            </Modal>
        </div>
    );
}

export default Admin;
