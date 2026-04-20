

/**
 * 筛选路由:把二级children的hidden=true的路由和login等hidden=true的过滤掉
 * @param {Array} routes - 异步路由
 */
export function filterHiddenRoutes (routes){
    // console.log('?>?',routes)
    const  arr = []
    routes.forEach((item)=>{
        if(item.hidden) return //针对/login 这种页面过滤
        if(item.children && item.children.length > 0){
            item.children = filterHiddenRoutes(item.children)
            if(item.children  && item.children.length > 0){
                arr.push(item)
            }
        }else{
            if(!item.hidden){  //针对二级路由重定向的过滤
                arr.push(item)
            }
        }
    })
    return arr
}




/**
 * 把筛选好的路由数组格式化成Menu所需的数据
 * @params {routes}  filterHiddenRoutes筛选返回的路由
 */
export function filterMenus(routes){  //数组
    const arr = []
    routes.forEach((item,idx)=>{
        if(!item.path && item.children && item.children.length == 1){
            arr.push({ ...item.children[0],key: item.children[0].path, icon:item.children[0].icon? <i className={[item.children[0].icon]}/>:null, label: item.children[0].name })
        }else{
            if(item.children && item.children.length > 0){
                item.children = filterMenus(item.children,idx)
                item = {...item,key: item.path , icon: item.icon?<i className={item.icon}/>:null,label: item.name,children:item.children }
                arr.push(item)
            }else{
                arr.push({ ...item,key: item.path  , label: item.name })
            }
        }
    })
    return arr
}


//根据location.pathName 和菜单导航 递归找出路径 ['books','books']
export function filterPathArray(pathname,routers){
    let arr = []
    routers.forEach(item=>{
        if(item.children && item.children.length > 0){
            if(pathname.indexOf(item.path)!==-1){
                arr.push(item.path)
            }
            let newArr =  filterPathArray(pathname,item.children)
            if(newArr.length > 0){
                arr = [...arr,...newArr]
            }
        }else{
            if(pathname.indexOf(item.path)!==-1){
                arr.push(item.path)
            }
        }
    })
    return arr
}




//场景：面包屑为了显示二级名称，例如
export function filterHiddenBreadcrumbsRoutes (routes){
    // console.log('?>?',routes)
    const  arr = []
    routes.forEach((item)=>{
        if(item.hidden && !item.showSub) return //针对/login 这种页面过滤
        if(item.children && item.children.length > 0){
            item.children = filterHiddenBreadcrumbsRoutes(item.children)
            if(item.children  && item.children.length > 0){
                arr.push(item)
            }
        }else{

            if(item.showSub){
                // console.log('item',item)
                arr.push(item)
            }else if(!item.hidden){  //如果hidden没设置hidden ，没隐藏
                arr.push(item)
            }
        }
    })
    return arr
}


/**
 * 把筛选好的路由数组格式化成Menu所需的数据
 * @params {routes}  filterHiddenRoutes筛选返回的路由
 */
export function filterBreadcrumbsMenus(routes){  //数组
    const arr = []
    routes.forEach((item,idx)=>{
        if(!item.path && item.children && item.children.filter(item=>!item.showSub).length == 1){
            let childrens = item.children.filter(item=>item.showSub )
            item.children[0].children = childrens
            arr.push({ ...item.children[0],key: item.children[0].path, icon:item.children[0].icon? <i className={[item.children[0].icon]}/>:null, label: item.children[0].name })
        }else{
            if(item.children && item.children.length > 0){
                item.children = filterMenus(item.children,idx)
                item = {...item,key: item.path , icon: item.icon?<i className={item.icon}/>:null,label: item.name,children:item.children }
                arr.push(item)
            }else{
                arr.push({ ...item,key: item.path  , label: item.name })
            }
        }
    })
    return arr
}


//根据location.pathName 和菜单导航 递归找出路径 ['books','books']
export function filterPathObjectArray(pathname,routers){
    let arr = []
    // console.log('routers>>>',routers)
    routers.forEach(item=>{
        if(item.children && item.children.length > 0){
            if(pathname.indexOf(item.path)!==-1){
                arr.push(item)
            }
            let newArr =  filterPathObjectArray(pathname,item.children)
            if(newArr.length > 0){
                arr = [...arr,...newArr]
            }
        }else{
            console.log(pathname,item.path)
            if(pathname.indexOf(item.path)!==-1){
                console.log('item>>??',item)
                arr.push(item)
            }
        }
    })
    return arr
}
