import { useRoutes,Navigate} from "react-router-dom";

import {baseRouter,asyncRouters,NOT_FOUND_ROUTE} from "@/router/routerConfig.jsx";


function Router(){
    const routes = [ ...baseRouter,...asyncRouters,NOT_FOUND_ROUTE]
    return useRoutes(routes)
}

export default Router
