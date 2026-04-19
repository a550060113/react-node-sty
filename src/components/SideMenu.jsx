import { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { asyncRouters } from "@/router/routerConfig.jsx";
import { useNavigate, useLocation } from 'react-router-dom'
import { filterHiddenRoutes, filterMenus, filterPathArray } from '@/utils/filterRoutes.jsx'
import {deepClone} from "@/utils/tool.js";

function SideMenu({ collapsed }) {
    const [tooltipEnabled, setTooltipEnabled] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const arr = filterHiddenRoutes(deepClone(asyncRouters));
    const items = filterMenus(arr);

    const filterPathArr = filterPathArray(location.pathname, items).reverse();
    const selectedKeys = filterPathArr.length > 0 ? [filterPathArr[0]] : [];

    // 👇 展开状态自己管理
    const [openKeys, setOpenKeys] = useState([]);

    // 路由变化时自动展开对应菜单
    useEffect(() => {
        setOpenKeys(filterPathArr);
    }, [location.pathname]);

    // 点击展开/关闭时同步状态
    const handleOpenChange = (keys) => {
        setOpenKeys(keys);
    };

    const onclickItem = ({ key, keyPath }) => {
        localStorage.defaultSelectedKeys = key
        localStorage.defaultOpenKeys = JSON.stringify(keyPath)
        let path = keyPath.reverse().join('/')

        console.log('点击的key',key)
        console.log('点击的keyPath',keyPath)
        console.log('点击的path',path)
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
