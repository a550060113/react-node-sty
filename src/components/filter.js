function filterHiddenRoutes (routes){
    const  arr = []
    routes.forEach(((item,idx)=>{
        if(item.hidden) return

        if(item.children && item.children.length > 0){
            item.children = filterHiddenRoutes(item)
        }else{
            if(!item.hidden){
                arr.push(item)
            }
        }
    })

    return arr
}
