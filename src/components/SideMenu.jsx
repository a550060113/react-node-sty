import { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { asyncRouters } from "@/router/routerConfig.jsx";
import { useNavigate, useLocation } from 'react-router-dom'
import { filterHiddenRoutes, filterMenus, filterPathArray } from '@/utils/filterRoutes.jsx'
import {deepClone} from "@/utils/tool.js";
import {useSelector} from "react-redux";

//再进行根据用户权限筛选菜单权限，
function filterPermissionRouter(routes,permission){
    // console.log('routes>>',routes,permission)
    let arr = []

    routes.forEach(item => {
        if(item.children && item.children.length > 0){
            item.children = filterPermissionRouter(item.children,permission)
            // console.log('children>>>',item.children)
            if(item.children && item.children.length > 0){
                arr.push(item)
                // console.log('push成功',arr)
            }
        }else{
            if(item.permissions && item.permissions.length>0 && item.permissions.includes(permission)){
                arr.push(item)
                // console.log('有权限',arr)
            }else if(item.permissions == undefined){

                arr.push(item)
                // console.log('mkeiy权限',arr)
            }
        }
        // console.log('arr>>>',arr)
    })
    return arr
}
function SideMenu({ collapsed }) {
    const [tooltipEnabled, setTooltipEnabled] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const {adminInfo} = useSelector(state=> state.admin);
    // const [perRouters,setPerRouters] = useState([]);
    const perRouters = filterPermissionRouter(deepClone(asyncRouters),adminInfo.permission)
    // console.log('perRouters>>>',perRouters)
    const arr = filterHiddenRoutes(perRouters);
    // const arr = filterHiddenRoutes(asyncRouters);
    const items = filterMenus(arr);
    // console.log('item>>>',items)

    const filterPathArr = filterPathArray(location.pathname, items).reverse();
    const selectedKeys = filterPathArr.length > 0 ? [filterPathArr[0]] : [];

    // 👇 展开状态自己管理
    const [openKeys, setOpenKeys] = useState([]);

    // 路由变化时自动展开对应菜单
    useEffect(() => {
        // setPerRouters(filterPermissionRouter(deepClone(asyncRouters),adminInfo.permission));
        setOpenKeys(filterPathArr);
    }, [location.pathname,adminInfo]);

    // 点击展开/关闭时同步状态
    const handleOpenChange = (keys) => {
        setOpenKeys(keys);
    };

    const onclickItem = ({ key, keyPath }) => {
        localStorage.defaultSelectedKeys = key
        localStorage.defaultOpenKeys = JSON.stringify(keyPath)
        let path = keyPath.reverse().join('/')

        // console.log('点击的key',key)
        // console.log('点击的keyPath',keyPath)
        // console.log('点击的path',path)
        navigate(path)
    };

    return (
        <Menu
            // 👇 只留这三个！！！
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onOpenChange={handleOpenChange}

            mode="inline"
            theme="light"
            onClick={onclickItem}
            inlineCollapsed={collapsed}
            tooltip={tooltipEnabled ? { placement: 'left' } : false}
            items={items}
        />
    );
}

export default SideMenu;
