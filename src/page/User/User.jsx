import {useState, useEffecte, useEffect, useRef} from 'react';
import styles from './User.module.css'
import {Form, Input, Button, Flex, Row, Col, Avatar, Switch, Tag, Space, Popconfirm, Table, message,Modal } from 'antd'
import {getTableScroll} from '@/utils/tool.js'
import user from '@/server/user.js'
import NewUserForm from "@/page/User/components/NewUserForm.jsx";
function User() {
    const [pageInfo, setPageInfo] = useState({
        current:1,
        pageSize:10,
        total:0
    });

    const [userList, setUserList] = useState([]);
    const [form] = Form.useForm()
    const [scrollY, setScrollY] = useState(null);
    const [params, setParams] = useState({})
    const [flag, setFlag] = useState(false)
    const [isExpend, setIsExpend] = useState(false)
    const [userInfo,setUserInfo]=useState(null)
    const [isModalOpen,setModalOpen] = useState(false);
    const formRef = useRef(null);
    const [btnType, setBtnType] = useState('edit')
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
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            allowSearch:false,
            render: (text,record) =>{
                return (
                    <Space size="middle">
                        <Button onClick={()=>viewUser(record)} color="primary" variant="text">详情</Button>
                        <Button onClick={()=>editUser(record)} color="primary" variant="text">编辑</Button>
                        <Popconfirm
                            description="是否要删除此用户?"
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

    useEffect(() => {
        setScrollY(getTableScroll({}))
        async function fetchUserList() {
            const {data}  = await user.getUserByPage({...pageInfo,...params})
            setPageInfo({
                ...pageInfo,
                total: data.count
            })
            setUserList(data.data)
            // console.log('data',data)
        }
        fetchUserList()
    }, [pageInfo.current,pageInfo.pageSize,params,flag])

    const delAdmin = async (id) =>{
       await user.deleteUser(id)
        setFlag(!flag)
        message.success('删除成功')
    }

    const onSearch = (value) => {
        setParams(value)
    }
    const editUser = (row) => {
        setBtnType('edit')
        setUserInfo(row)
        setModalOpen(true);
    }

    const viewUser = (row)=>{
        setBtnType('view')
        setUserInfo(row)
        setModalOpen(true);
    }

    const handleOk = async (value) => {
        const newInfo = formRef.current.getFormData()
        // console.log(newInfo)
        let data= await user.editUser(userInfo._id,{
            ...userInfo,
            ...newInfo
        })
        // console.log(data)
        if(data.code == 0){
            setModalOpen(false);
            setFlag(!flag)
            message.success('修改成功')
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.searchContainer}>
                <Form
                    layout='horizontal'
                    form={form}
                    labelCol={{span:3}}
                    style={{maxWidth: 'none'}}
                    onFinish={onSearch}
                    onReset={(value)=>setParams(value)}
                >
                    <Row  justify='start' gutter={30}>
                        {
                            columns.map((item,idx)=>{
                                return (
                                 item.allowSearch !==false && idx <2 ?  <Col span={8}>
                                         <Form.Item name={item.dataIndex} label={item.title}>
                                             <Input placeholder="登录账号"/>
                                         </Form.Item>
                                     </Col> : idx == 2 ? (
                                     <>
                                         <Col span={8} style={{textAlign: 'right'}}>
                                             <Form.Item>
                                                 <Button  onClick={()=>{setIsExpend(!isExpend)}} style={{marginRight:'10px'}}>折叠</Button>
                                                 <Button htmlType='reset' style={{marginRight:'10px'}}>重置</Button>
                                                 <Button htmlType='submit'  type="primary">提交</Button>
                                             </Form.Item>
                                         </Col>
                                         {
                                             ( !isExpend &&
                                                 <Col span={8} >
                                                     <Form.Item name={item.dataIndex} label={item.title}>
                                                         <Input placeholder="登录账号"/>
                                                     </Form.Item>
                                                 </Col>
                                             )
                                         }
                                     </>
                                 ) :idx > 2 ? ( !isExpend &&
                                     <Col span={8} >
                                         <Form.Item name={item.dataIndex} label={item.title}>
                                             <Input placeholder="登录账号"/>
                                         </Form.Item>
                                     </Col>
                                 ) :null

                                )
                            })

                        }

                        {/*<Col span={8}>*/}
                        {/*    <Form.Item name='nickname' label="用户名">*/}
                        {/*        <Input placeholder="用户名"/>*/}
                        {/*    </Form.Item>*/}
                        {/*</Col>*/}


                        {/*<Col span={8}>*/}
                        {/*    <Form.Item name='loginId' label="登录账号">*/}
                        {/*        <Input placeholder="登录账号"/>*/}
                        {/*    </Form.Item>*/}
                        {/*</Col>*/}
                        {/*<Col span={8}>*/}
                        {/*    <Form.Item name='nickname' label="用户名">*/}
                        {/*        <Input placeholder="用户名"/>*/}
                        {/*    </Form.Item>*/}
                        {/*</Col>*/}

                        {/*<Col span={8} style={{textAlign: 'right'}}>*/}
                        {/*    <Form.Item>*/}
                        {/*        <Button htmlType='reset' style={{marginRight:'10px'}}>重置</Button>*/}
                        {/*        <Button htmlType='submit'  type="primary">提交</Button>*/}
                        {/*    </Form.Item>*/}
                        {/*</Col>*/}

                    </Row>
                </Form>
            </div>
            <div className={styles.title}>管理员列表</div>
            <div className={styles.tableContainer}>
                <Table
                    pagination={{
                        total: pageInfo.total,
                        showTotal: (total) => `总数 ${total} 条`,
                        current: pageInfo.current,
                        pageSize: pageInfo.pageSize,
                        onChange: (page, pageSize) => {
                            setPageInfo({
                                ...pageInfo,
                                current: page,
                                pageSize: pageSize
                            })
                        }
                    }}
                    rowKey={(row) => row._id}
                    scroll={{y:scrollY}}
                    columns={columns}
                    dataSource={userList}/>
            </div>

            <Modal
                title="编辑用户信息"
                open={isModalOpen}
                onOk={handleOk}
                destroyOnHidden={true}
                onCancel={()=>setModalOpen(false)}
                footer={(originNode, extra) => {
                    // originNode = 官方默认的那两个按钮
                    // extra.OkBtn = 官方确定按钮
                    // extra.CancelBtn = 官方取消按钮

                    return <div>{<extra.CancelBtn/>} { btnType!=='view' ? <extra.OkBtn/> : null}</div>
                }}
            >
                <NewUserForm type={btnType} userInfo={userInfo} ref={formRef}/>
            </Modal>
        </div>
    );
}

export default User;
