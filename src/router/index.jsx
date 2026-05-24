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
    const [accessRouters,setAccessRoutersRouters] = useState([])
    const {adminInfo} = useSelector(state => state.admin);
    // const countRef = useRef(0);
    // countRef.current = countRef.current + 1;
    // console.log('router index页面渲染了几次',countRef.current,adminInfo)
    // 2. ✅ useMemo 监听 adminInfo —— 完全满足你的需求！
    // const accessRouters = useMemo(() => {
    //     console.log('执行meno')
    //     // 没有权限时返回基础路由，防止空白
    //     if (!adminInfo || !adminInfo.permission) {
    //         return []
    //     }
    //
    //     // 权限变化 → 自动重新筛选
    //     const filteredRouters = filterPermissionRouter(
    //         deepClone([...asyncRouters]),
    //         adminInfo.permission
    //     );
    //     return [ ...filteredRouters];
    //
    // }, [adminInfo]); // ✅ 你依赖它，完全正确！

    // 3. 渲染
    // return useRoutes(accessRouters);


    useEffect(() => {
        // console.log('执行力一边')
        setAccessRoutersRouters(filterPermissionRouter(deepClone([ ...asyncRouters]),adminInfo.permission))
    }, [adminInfo]);
    return useRoutes([...accessRouters])
    // return useRoutes(routes)
}

export default memo(Router)
