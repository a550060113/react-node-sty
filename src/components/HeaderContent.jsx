import {useEffect,useState} from 'react';
import {useLocation} from 'react-router-dom';
import {asyncRouters} from "@/router/routerConfig.jsx";
import {filterHiddenRoutes,filterHiddenBreadcrumbsRoutes, filterMenus,filterPathObjectArray} from "@/utils/filterRoutes.jsx";
import {Breadcrumb} from 'antd'
import styles from '@/componentsCss/HeaderContainer.module.css'
import {deepClone} from "@/utils/tool.js";

function HeaderContent(props) {
    const location = useLocation();
    console.log(location)
    const [items,setItems] = useState([]);
    useEffect(()=>{
        const filterHiddenRouters = filterHiddenBreadcrumbsRoutes(deepClone(asyncRouters))
        console.log('filterHiddenRouters',filterHiddenRouters)
        const menuList = filterMenus(filterHiddenRouters)
        console.log('menuList',menuList)
        const arr = filterPathObjectArray(location.pathname,menuList)
        console.log('arr',arr)
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

    return (
        <div >
            <Breadcrumb
                className={styles['custom-breadcrumb']}
                items={items}
        />
        </div>
    );
}

export default HeaderContent;
