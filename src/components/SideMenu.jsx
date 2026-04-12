import {useState} from 'react';
import { Menu } from 'antd';
import {asyncRouters} from "@/router/routerConfig.jsx";
import {useNavigate} from 'react-router-dom'
import {filterHiddenRoutes,filterMenus,filterPathArray} from '@/utils/filterRoutes.jsx'
import {useSelector,useDispatch} from "react-redux";

function SideMenu({collapsed}) {
    // const [items ,setItems ] = useState([])
    const [tooltipEnabled, setTooltipEnabled] = useState(true);
    const {menuList} = useSelector(state => state.menu);
    const dispatch = useDispatch();
    //初始化选中菜单
    const navigate = useNavigate();


    let arr = filterHiddenRoutes(asyncRouters)
    console.log('arr',arr)
    let items = []
    items = filterMenus(arr)
    console.log('item',items)
    // if(menuList.length == 0){
    //     dispatch()
    // }
    let filterPathArr = filterPathArray(window.location.pathname,items).reverse()

    let defaultSelectedKeys = []
    let defaultOpenKeys = []
    if(filterPathArr.length == 1){
        defaultSelectedKeys = filterPathArr
        defaultOpenKeys = filterPathArr
    }else if(filterPathArr.length > 1){
        defaultSelectedKeys = [filterPathArr[0]]
        defaultOpenKeys = filterPathArr
    }
    // 回显菜单当前高亮
    // let defaultSelectedKeys = localStorage.getItem('defaultSelectedKeys') ? [localStorage.getItem('defaultSelectedKeys')] :[items[1].key]
    // let defaultOpenKeys = localStorage.getItem('defaultOpenKeys') ? JSON.parse(localStorage.getItem('defaultOpenKeys')) :[]
    console.log('defaultSelectedKeys',defaultSelectedKeys)
    console.log('defaultOpenKeys',defaultOpenKeys)

// 点击菜单导航
    function onclickItem({ key, keyPath }){
        // 保存菜单的key
        localStorage.defaultSelectedKeys = key
        localStorage.defaultOpenKeys = JSON.stringify(keyPath)
        let path = keyPath.reverse().join('/')

        console.log('点击的key',key)
        console.log('点击的keyPath',keyPath)
        console.log('点击的path',path)
        navigate(path)
        // console.log(key,keyPath)
    }
    return (
            <Menu
                defaultSelectedKeys={defaultSelectedKeys}
                defaultOpenKeys={defaultOpenKeys}
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
