import React, {useEffect, useState} from 'react';
import styles from './Blog.module.css';
import {  Table,Button,Space,Image,Popconfirm,message } from 'antd';
import {delBlog, getBlogByPage} from "@/server/blog.js";

function BlogList() {

    const [pageInfo, setPageInfo] = useState({
        limit:10,
        total:0,
        pageSize:1,
    })
    const [tableData, setTableData] = useState([])

    const columns = [
        {
            title: '文章名称',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '文章描述',
            dataIndex: 'description',
            key: 'description',
        },{
            title: '浏览数量',
            dataIndex: 'scanNumber',
            key: 'scanNumber',
        },{
            title: '文章封面',
            key: 'thunmb',
            render: (text, record) => (
                <>
                    <Image
                        width={50}
                        alt="basic"
                        src={record.thunmb}
                    />
                </>
            )
        },
        {
            title: '评论数量',
            dataIndex: 'commentNumber',
            key: 'commentNumber',
        },
        {
            title: '文章内容',
            ellipsis:true,
            dataIndex: 'htmlContent',
            key: 'htmlContent',
        },{
            title: '文章类别',
            key: 'htmlContent',
            render: (_,record) => (
               <>
                   {record.category.name}
               </>
            )
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },

        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="medium">
                    <Button size='small'>编辑</Button>
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={(e)=>confirmDel(e,record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button size='small' danger>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    async function confirmDel(e,id){
        await delBlog(id)
        message.success('删除成功')
        getList()
    }
   async function getList(){
        const {data} = await getBlogByPage({
            limit:pageInfo.limit,
            pageSize:pageInfo.pageSize
        })
       setTableData(data.list)
       setPageInfo({
           ...pageInfo,
           total: data.total
       })
       console.log('data>>',data)
   }

    useEffect(() => {
       getList()

    }, [pageInfo.pageSize]);

    return (
        <div className={styles.container}>
            <div className={styles.title}>文章列表</div>
            <div className={styles.tableContainer}>
                <Table pagination={{
                    placement: [ 'bottomEnd'],
                    total: pageInfo.total,
                    showTotal: (total) => `总数 ${total} 条`,
                    current: pageInfo.pageSize,
                    pageSize: pageInfo.limit,
                    onChange: (page, pageSize) => {
                        setPageInfo({
                            ...pageInfo,
                            current: page,
                            pageSize: pageSize
                        })
                    }

                }} columns={columns} dataSource={tableData} />
            </div>
        </div>
    );
}

export default BlogList;
