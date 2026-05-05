import {useEffect,useState} from 'react';
import {useLocation,useNavigate} from 'react-router-dom';
import {asyncRouters} from "@/router/routerConfig.jsx";
import {filterHiddenRoutes,filterHiddenBreadcrumbsRoutes, filterBreadcrumbsMenus,filterPathObjectArray} from "@/utils/filterRoutes.jsx";
import {Avatar, Breadcrumb, Layout, List, Popover} from 'antd'
import styles from '@/componentsCss/HeaderContainer.module.css'
import {deepClone} from "@/utils/tool.js";
import {useSelector,useDispatch} from "react-redux";
import {initAdminInfo} from "@/redux/adminSlice.js";

function HeaderContent(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {adminInfo}  = useSelector(state => state.admin);
    // console.log(location)
    const [items,setItems] = useState([]);
    useEffect(()=>{
        const filterHiddenRouters = filterHiddenBreadcrumbsRoutes(deepClone(asyncRouters))
        // console.log('filterHiddenRouters',filterHiddenRouters)
        const menuList = filterBreadcrumbsMenus(filterHiddenRouters)
        // console.log('menuList',menuList)
        // console.log('location.pathname',location.pathname)
        const arr = filterPathObjectArray(location.pathname,menuList)
        // console.log('arr',arr)
        let breadcrumbs = []
        breadcrumbs = arr.map((item)=>{
            return {
                title:(
                    <>
                        {item.icon && item.icon}
                        <span>{item.name}</span>
                    </>
                )
            }
        })
        setItems(breadcrumbs)

    },[location])
    const onClickItemHandle = (item)=>{
        if(item == '退出登录'){
            navigate('/login')
            localStorage.removeItem('adminToken')
            dispatch(initAdminInfo({}))

        }
    }
    return (
        <div className='w-full flex justify-between items-center'>
            <Breadcrumb
                className={styles['custom-breadcrumb']}
                items={items}
        />
            <div className={styles.avatarContainer}>

                <Popover content={<List
                    dataSource={['退出登录']}
                    renderItem={(item) => (
                        <List.Item onClick={()=>onClickItemHandle(item)} style={{cursor: 'pointer'}}>
                            {item}
                        </List.Item>
                    )}
                />} >
                    <div className='flex items-center'>
                        <Avatar src={adminInfo.avatar}/>
                        <div className='pl-4 leading-4'>
                            <div >{adminInfo.nickname}</div>
                            <div>{adminInfo.loginId}</div>
                        </div>
                    </div>
                </Popover>

            </div>
        </div>
    );
}

export default HeaderContent;
