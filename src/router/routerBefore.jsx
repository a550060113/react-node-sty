import Router from './index.jsx'
import React from 'react';
import {useLocation, Navigate} from 'react-router-dom';

function RouterBefore() {
    const location = useLocation();
    const token = localStorage.getItem('adminToken');
    console.log('routerBefore页面： useLocation监听',location.pathname)

    if (location.pathname == '/login') {
        if (token) {
            return <Navigate to={'/home'} replace />;
        }
        return <Router />;
    }

    // 未登录访问其他页面 → 去登录
    // if (!token) {
    //     return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    // }
    // 正常放行
    return <Router />;
}

export default RouterBefore;
