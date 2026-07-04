import { useRoutes,Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {baseRouter,asyncRouters,NOT_FOUND_ROUTE} from "@/router/routerConfig.jsx";
import {deepClone} from "@/utils/tool.js";
import {useEffect, useState,useRef,memo,useMemo} from "react";

function filterPermissionRouter(routes,permission){
    // console.log('routes>>',routes,permission)
    let arr = []
    routes.forEach(item => {
        if(item.children && item.children.length > 0){
            item.children = filterPermissionRouter(item.children,permission)
            if(item.children && item.children.length > 0){
                arr.push(item)
            }
        }else{
            if(item.permissions && item.permissions.length>0 && item.permissions.includes(permission)){
                arr.push(item)
            }else if(item.permissions == undefined){

                arr.push(item)
            }
        }
    })
    return arr
}

function Router(){
    const [accessRouters,setAccessRoutersRouters] = useState([...asyncRouters])
    const {adminInfo} = useSelector(state => state.admin);

    useEffect(() => {
        // console.log('执行力一边')

        // setAccessRoutersRouters([ ...asyncRouters])
        // 动态路由权限筛选
        setAccessRoutersRouters(filterPermissionRouter(deepClone([ ...asyncRouters]),adminInfo.permission))

    }, [adminInfo]);
    console.log('accessRouters',accessRouters)
    return useRoutes([...accessRouters])
    // return useRoutes(routes)
}

export default memo(Router)
