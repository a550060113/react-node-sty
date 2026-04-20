import React, {useEffect,useState} from 'react';
import {Button, Col, Form, Image, Input, Popconfirm, Radio, Row, Select, Switch, Table, Tag,message} from 'antd'
import issue from '@/server/issue.js'
import {useSelector} from "react-redux";
import styles from "@/page/Books/NewBooks.module.css";
import {formatDate, getTableScroll} from "@/utils/tool.js";
import {useNavigate} from "react-router-dom";


function Issues(props) {
    const navigate = useNavigate();
    const {typesList}  = useSelector(state => state.types);
    // const [issueType, setIssueType] = useState(1)
    const [params, setParams] = useState({})
    const [scrollY, setScrollY] = useState(null)
    const [issuesList, setIssuesList] = useState([])
    const [loadingId,setLoadingId] = useState(null)
    const [pageInfo, setPageInfo] = useState({
        current:1,
        pageSize:10,
        total:0
    })
    const onSearch = (values)=>{
        setParams(values)
    }
    const columns = [
        {
            title:'序号',
            key:'idx',
            width:50,
            render:(_,row,index)=>{
                return (pageInfo.current -1) * pageInfo.pageSize + index +1
            }
        },
        {
            title:"问答标题",
            width:100,
            dataIndex:'issueTitle',
            key: 'bookTitle',
        },
        {
            title:'问答描述',
            key:'bookIntro',
            ellipsis:true,
            width:150,
            render:(val,row,index)=>{
                // 将书籍简介的文字进行简化
                // 在表格中显示书籍简介时，过滤掉 html 标签
                let reg = /<[^<>]+>/g;
                let brief = row.issueContent;
                brief = brief.replace(reg, '');

                if (brief.length > 15) {
                    brief = brief.slice(0, 15) + '...';
                }
                return [brief];
            }
        },

        {
            title:'浏览数',
            key:'scanNumber',
            width:'90px',
            dataIndex: 'scanNumber'
        },
        {
            title:'评论数',
            key:'commentNumber',
            width:'90px',
            dataIndex: 'commentNumber'
        },
        {
            title:"书籍分类",
            dataIndex: 'typeId',
            width:80,
            render:(val,row)=>{
                return    <Tag  color='purple' variant='outlined'>
                    {typesList.find(item=>item._id == row.typeId).typeName}
                </Tag>

            }
        },
        {
            title:"审核状态",
            dataIndex: 'issueStatus',
            width:80,
            render:(val,row)=>{
                return  (
                        <Switch value={row.issueStatus} loading={row._id == loadingId} onChange={(e)=>onChangeStatus(e,row)}></Switch>
                )

            }
        },
        {
            title:'操作',
            key:'action',
            width:'150px',
            render:(val,row)=>(
                <>
                    <Button onClick={()=>detailIssue(row._id)} color="primary" variant="text">详情</Button>
                    <Popconfirm
                        description="是否要删除此问答?"
                        onConfirm={()=>delIssue(row._id)}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Button color="primary" variant="text">删除</Button>
                    </Popconfirm>
                </>
            )
        },
    ]
    const detailIssue = (id) =>{
        navigate(`/issues/issuesDetails?id=${id}`)
    }
    const delIssue = (id) =>{

    }
    const onChangeStatus = async (val,row) =>{
        setLoadingId(row._id)
        let data = await issue.editIssue(row._id,{
            issueStatus:val
        })
        if(data.code == 0){
            setIssuesList(pre=>pre.map(item=>{
                if(item._id == row._id){
                    return {
                        ...item,
                        issueStatus:val
                    }
                }else{
                    return item
                }
            }))
            setLoadingId(null)
            message.success('修改成功')
        }else{
            setLoadingId(null)
            message.error('网络出现问题，修改失败')
        }
    }
    useEffect(()=>{
        async function fetchIssues() {
            const {data} = await issue.getIssueByPage({
                ...pageInfo,
                ...params
            })
            setPageInfo({
                ...pageInfo,
                total: data.count
            })
            setIssuesList(data.data)
        }

        fetchIssues()
       setScrollY(getTableScroll({}))
    },[pageInfo.current,pageInfo.pageSize,params])

    return (
        <div className='p-4'>
            <div className="font-bold text-xl pb-4">问答</div>
            {/*<div>*/}
            {/*    <Radio.Group onChange={(e)=>setIssueType(e.target.value)} value={issueType} buttonStyle="solid">*/}
            {/*        <Radio.Button value={1}>问答评论</Radio.Button>*/}
            {/*        <Radio.Button value={2}>书籍评论</Radio.Button>*/}
            {/*    </Radio.Group>*/}
            {/*</div>*/}
            <div>
                <Form
                    onFinish={onSearch}
                >
                    <Row gutter={20}>
                        <Col span={8} xxxl={6}>
                            <Form.Item name='issueTitle' label='问答标题'>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={8} xxxl={6}>
                            <Form.Item name='typeId' label='问答类型'>
                                <Select options={typesList.map(item => (
                                    {
                                        value: item._id,
                                        label: item.typeName
                                    }
                                ))}/>
                            </Form.Item>
                        </Col>
                        <Col span={8} xxxl={6} >
                            <Form.Item style={{textAlign: 'right'}}>
                                <Button htmlType='reset' className={'mr-2'}>重置</Button>
                                <Button type='primary' htmlType='submit'>搜索</Button>
                            </Form.Item>
                        </Col>
                    </Row>

                </Form>
            </div>

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
                    scroll={{y: scrollY}}
                    columns={columns}
                    dataSource={issuesList}/>
            </div>
        </div>

    );
}

export default Issues;
