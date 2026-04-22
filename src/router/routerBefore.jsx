import RouterConfig from './index.jsx'
import React from 'react';
import {useLocation, Navigate, useNavigate} from 'react-router-dom';

function RouterBefore() {
    const location = useLocation();
    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken');
    console.log('location.pathname11111>>>',location.pathname)

    if (location.pathname == '/login') {
        if (token) {
            console.log('location.pathname2>>>',location.pathname)
            console.log('有没有进Home')
            return <Navigate to={'/home'} replace />;
        }
        return <RouterConfig />;
    }

    // 未登录访问其他页面 → 去登录
    if (!token) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    // 正常放行
    return <RouterConfig />;
}

export default RouterBefore;
