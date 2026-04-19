import { useRoutes,Navigate} from "react-router-dom";

import {baseRouter,asyncRouters,NOT_FOUND_ROUTE} from "@/router/routerConfig.jsx";


function Router(){
    return useRoutes([ ...baseRouter,...asyncRouters ])
}

export default Router
