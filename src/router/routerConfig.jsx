import {Navigate} from "react-router-dom";
import {lazy} from "react";
// import Login from "@/page/Login/Login.jsx";
// import BaseLayout from "@/page/Layout/BaseLayout.jsx";
// import Home from "@/page/Home/Home.jsx";
// import Admin from "@/page/Admin/Admin.jsx";
// import NewAdmin from "@/page/NewAdmin/NewAdmin.jsx";
// import User from "@/page/User/User.jsx";
// import NewUser from "@/page/NewUser/NewUser.jsx";
// 懒加载组件
const Login = lazy(() => import("@/page/Login/Login.jsx"));
const BaseLayout = lazy(() => import("@/page/Layout/BaseLayout.jsx"));
const Home = lazy(() => import("@/page/Home/Home.jsx"));
const Admin = lazy(() => import("@/page/Admin/Admin.jsx"));
const NewAdmin = lazy(() => import("@/page/Admin/NewAdmin.jsx"));
const User = lazy(() => import("@/page/User/User.jsx"));
const NewUser = lazy(() => import("@/page/User/NewUser.jsx"));

const Books = lazy(() => import("@/page/Books/Books.jsx"));
const NewBooks = lazy(() => import("@/page/NewBooks/NewBooks.jsx"));
const BookDetails = lazy(() => import("@/page/BookDetails/BookDetails.jsx"));

const InterViews = lazy(() => import("@/page/InterViews/InterViews.jsx"));
const NewInterViews = lazy(() => import("@/page/NewInterViews/NewInterViews.jsx"));

const Issues = lazy(() => import("@/page/Issues/Issues.jsx"));
const IssueDetail = lazy(() => import("@/page/IssueDetail/IssueDetail.jsx"));
const Comments = lazy(() => import("@/page/Comments/Comments.jsx"));
const Types = lazy(() => import("@/page/Types/Types.jsx"));
const NotFound = lazy(() => import("@/page/404/NotFound.jsx"));

/**
 * @param {Boolen} hidden  路由菜单不显示
 * @type {[{path: string, hidden: boolean, element: JSX.Element}]}
 */

/**
 * @param {showSub} hidden  true时在面包屑中显示二级路径
 * @type {[{path: string, hidden: boolean, element: JSX.Element}]}
 */

export const baseRouter = [
    {
        path:'/login',
        element:<Login/>,
        hidden:true,
    }

]

export const NOT_FOUND_ROUTE = {
    path: '*',
    element: <NotFound />,
    hidden:true
};

export const asyncRouters = [
    {
        path:'/login',
        element:<Login/>,
        hidden:true,
    },
    {
        element:<BaseLayout/>,
        children:[
            {
                path:'/home',
                element:<Home/>,
                name:'首页',
                icon:'iconfont icon-icon-test',
                meta:{}
            },
            {
                path:'',
                hidden:true,
                element: <Navigate replace={true} to={'/home'}/>
            }
        ]
    },
    {
        path:'/admin',
        element:<BaseLayout/>,
        name:'管理员',
        icon:'iconfont icon-guanliyuan',
        meta:{},
        children:[
            {
                path:'admin-list',
                name:"管理员列表",
                element: <Admin/>,
                permissions:[1]
            },
            {
                path:'new-admin',
                name:'添加管理员',
                element: <NewAdmin/>,
                permissions:[1]
            },
            {
                path:'',
                hidden:true, //路由菜单不显示
                element: <Navigate replace={true} to={'admin-list'}/>,
                permissions:[1]
            }
        ]
    },
    {
        path:'/user',
        element:<BaseLayout/>,
        name:'用户',
        icon:'iconfont icon-yonghu1',
        meta:{},
        children:[

            {
                path:'user-list',
                name:'用户列表',
                element: <User/>,
                permissions:[1,2]
                // children:[
                //     {path:"list-more",name:'用户排名', element: <NewUser/>,},
                //     {path:"list-more1",name:'用户排名1', element: <NewUser/>,}
                // ]
            },
            {
                path:'new-user',
                name:'添加用户',
                element: <NewUser/>,
                permissions:[1,2]
            },
            {
                path: 'edit', //可以是path:'',写法都一样
                hidden:true, //路由菜单不显示
                permissions:[1,2]
            },{
                index:true, //可以是path:'',写法都一样
                hidden:true, //路由菜单不显示
                element: <Navigate replace={true} to={'/user/user-list'}/>,
                permissions:[1,2]
            },
        ]
    },
    {
        path:'/books',
        element:<BaseLayout/>,
        name:'书籍',
        icon:'iconfont icon-shuji',
        meta:{},
        children:[
            {
                path:'book-list',
                name:'书籍列表',
                element: <Books/>,
            },
            {
                path:'new-book',
                name:'添加书籍',
                element: <NewBooks/>,
            },
            {
                path: 'book-details',
                name:'书籍详情',
                showSub:true,
                hidden:true, //路由菜单不显示
                element: <BookDetails/>,
            },
            {
                path:'',
                hidden:true, //路由菜单不显示
                element: <Navigate replace={true} to={'book-list'}/>
            }
        ]
    },
    {
        path:'/interviews',
        element:<BaseLayout/>,
        name:'面试题',
        icon:'iconfont icon-xiugai',
        meta:{},
        children:[
            {
                path:'view-list',
                name:'面试题',
                element: <InterViews/>,
            },
            {
                path:'new-view',
                name:'添加面试题',
                element: <NewInterViews/>,
            },
            {
                path:'',
                hidden:true, //路由菜单不显示
                element: <Navigate replace={true} to={'view-list'}/>
            }
        ]
    },
    {
        element:<BaseLayout/>,
        children:[
                {path:'/issues',name:'问答',icon:'iconfont icon-wenda', element:<Issues/> },
                {
                    path: '/issues/issuesDetails',
                    name:'问答详情',
                    showSub:true,
                    hidden:true, //路由菜单不显示
                    element: <IssueDetail/>,
                }
        ],
    },
    {
        element:<BaseLayout/>,
        name:'评论',
        children:[
            {path:'/comment',name:'评论',icon:'iconfont icon-pinglun1', element:<Comments/> }
        ],
    },
    {
        element:<BaseLayout/>,
        children:[
            {path:'/types',name:'类别',icon:'iconfont icon-leimupinleifenleileibie', element:<Types/> }
        ],
    },
    {
        path: '*',
        element: <NotFound />,
        hidden:true
    }
]

