import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAdminListAsyncThunk,delAdminAsyncThunk,updateAdminAsyncThunk} from "@/redux/adminSlice.js";
import { Flex, Space, Table, Tag,Avatar,Switch, Button,Popconfirm,message } from 'antd';
import styles from './Admin.module.css';
import admin from '@/server/admin.js'
function Admin() {
    const dispatch = useDispatch();
    const {adminList} = useSelector((state) => state.admin);

    const columns = [
        {
            title: '序号',
            align: 'center',
            render: (text, record,index) => index+1
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
                        <Button color="primary" variant="text">编辑</Button>
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
    useEffect(() => {
        if(!adminList.length){
            dispatch(getAdminListAsyncThunk());
        }
    }, []);
    return (
        <div className={styles.container}>
           <div className={styles.title}>管理员列表</div>
           <div className={styles.tableContainer}>
               <Table pagination={{
                   total:adminList.length,
                   showTotal:(total)=> `总数 ${total} 条`
               }} rowKey={(row)=>row._id} columns={columns} dataSource={adminList} />
           </div>
        </div>
    );
}

export default Admin;
