import {useEffect,useState} from 'react';
import {useLocation} from 'react-router-dom';
import {asyncRouters} from "@/router/routerConfig.jsx";
import {filterHiddenRoutes, filterMenus,filterPathObjectArray} from "@/utils/filterRoutes.jsx";
import {Breadcrumb} from 'antd'
import styles from '@/componentsCss/HeaderContainer.module.css'
function HeaderContent(props) {
    const location = useLocation();
    const [items,setItems] = useState([]);
    useEffect(()=>{
        const filterHiddenRouters = filterHiddenRoutes(asyncRouters)
        const menuList = filterMenus(filterHiddenRouters)
        const arr = filterPathObjectArray(location.pathname,menuList)
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
