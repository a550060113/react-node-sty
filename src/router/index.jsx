import { useRoutes,Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {baseRouter,asyncRouters,NOT_FOUND_ROUTE} from "@/router/routerConfig.jsx";
import {deepClone} from "@/utils/tool.js";
import {useEffect, useState} from "react";

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

function Router(){
    const [accessRouters,setAccessRoutersRouters] = useState([])
    const {adminInfo} = useSelector(state => state.admin);
    console.log('adminInfo',adminInfo)
    // let perAsyncRouters = filterPermissionRouter(deepClone(asyncRouters),adminInfo.permission)
    // const routes = [ ...baseRouter,...asyncRouters,NOT_FOUND_ROUTE]
    // const newAsyncRouter =
    // console.log('perAsyncRouters',perAsyncRouters)
    console.log('执行力一边?')
    useEffect(() => {
        console.log('执行力一边')
        setAccessRoutersRouters(filterPermissionRouter(deepClone([ ...asyncRouters]),adminInfo.permission))
    }, [adminInfo]);
    return useRoutes([...accessRouters])
    // return useRoutes(routes)
}

export default Router
