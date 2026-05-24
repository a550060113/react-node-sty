import {useEffect, useState} from 'react';
import styles from './NewBooks.module.css'
import {Button, Col, Form, Image, Input, message,Select, Popconfirm, Row, Table, Tag} from "antd";
import {getTableScroll} from '@/utils/tool.js'
import book from "@/server/book.js";
import {useSelector} from "react-redux";
import {formatDate} from "@/utils/tool.js";
import {useNavigate} from "react-router-dom";

function Books() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [booksList, setBooksList] = useState([]);
    const [scrollY, setScrollY] = useState(null);
    const [params,setParams] = useState({})
    const {typesList} = useSelector(state=> state.types)
    const [flag, setFlag] = useState(false)
    const [pageInfo, setPageInfo] = useState({
        current:1,
        pageSize:10,
        total:0
    });
    const onSearch = (values) => {
          setParams(values)
    }

    const columns =[
        {
            title:'序号',
            key:'idx',
            width:50,
            render:(_,row,index)=>{
                return (pageInfo.current -1) * pageInfo.pageSize + index +1
            }
        },
        {
            title:"书籍名",
            width:100,
            dataIndex:'bookTitle',
            key: 'bookTitle',
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
            title:'书籍简介',
            key:'bookIntro',
            ellipsis:true,
            width:150,
            render:(val,row,index)=>{
                // 将书籍简介的文字进行简化
                // 在表格中显示书籍简介时，过滤掉 html 标签
                let reg = /<[^<>]+>/g;
                let brief = row.bookIntro;
                brief = brief.replace(reg, '');

                if (brief.length > 15) {
                    brief = brief.slice(0, 15) + '...';
                }
                return [brief];
            }
        },
        {
            title:'书籍封面',
            key:'bookPic',
            ellipsis:true,
            width:70,
            align:'center',
            render:(val,row,index)=>{
                return <Image src={row.bookPic} width={50}/>
            }
        },
        {
            title:'浏览数',
            key:'bookPic',
            width:'90px',
            dataIndex: 'scanNumber'
        },
        {
            title:'评论数',
            key:'bookPic',
            width:'90px',
            dataIndex: 'commentNumber'
        },
        {
            title:'上架日期',
            key:'onShelfDate',
            width:'90px',
            render:(val,row)=>{
                return formatDate(row.onShelfDate)
            }
        },
        {
            title:'操作',
            key:'action',
            width:'150px',
            render:(val,row)=>(
               <>
                   <Button onClick={()=>editBook(row._id)} color="primary" variant="text">编辑</Button>
                   <Popconfirm
                       description="是否要删除此书籍?"
                       onConfirm={()=>delBook(row._id)}
                       okText="确定"
                       cancelText="取消"
                   >
                       <Button color="primary" variant="text">删除</Button>
                   </Popconfirm>
               </>
            )
        },
    ]
    const delBook = async (_id)=>{
        await book.deleteBook(_id)
        setFlag(!flag)
        message.success('删除成功')
    }
    const editBook = (id)=>{
        navigate(`/books/book-details?id=${id}`)
    }
    useEffect(() => {

       async function getFectch(){
           const {data}  = await book.getBookByPage({
               ...pageInfo,
               ...params
           })
           // console.log('data',data)
           setPageInfo({
               ...pageInfo,
               total: data.count
           })
           setBooksList(data.data)
           setScrollY(getTableScroll({}))
        }

        getFectch()
    }, [pageInfo.pageSize,pageInfo.current,params]);
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                书籍列表
            </div>

            <div className={styles.searchContainer}>
                <Form
                   layout='horizontal'
                   form={form}
                   labelCol={{span:3}}
                   style={{maxWidth: 'none'}}
                   onReset={(value)=>{
                       form.resetFields();
                       setParams({})
                   }}
                   onFinish={onSearch}>
                    <Row gutter={30}>
                        <Col span={8}>
                            <Form.Item name='bookTitle' label='书籍名称'>
                                <Input placeholder="书籍名称"/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name='typeId' label='书籍分类'>
                                <Select
                                    options={typesList.map(item=>({ value: item._id, label: item.typeName }))}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8} style={{textAlign:'right'}}>
                            <Form.Item >
                                <Button htmlType='reset' style={{marginRight:'10px'}}>重置</Button>
                                <Button htmlType='submit'  type="primary">搜索</Button>
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
                    scroll={{y:scrollY}}
                    columns={columns}
                    dataSource={booksList}/>
            </div>
        </div>
    );
}

export default Books;
