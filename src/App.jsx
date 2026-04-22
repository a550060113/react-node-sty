import { useState,useEffect } from 'react'
import './App.css'
import RouterConfig from './router/index.jsx'
import {useSelector,useDispatch} from "react-redux";
import {getTypesAsyncThunk} from "@/redux/types.js";
import {getAdminInfoAsyncThunk, initAdminInfo} from "@/redux/adminSlice.js";
import admin from "@/server/admin.js";
import {message} from "antd";
import RouterBefore from "@/router/routerBefore.jsx";
function App() {
    const {typesList} = useSelector(state => state.types)
    const dispatch = useDispatch()
    useEffect(()=>{

      async function fetchAdminInfo(){
          if(localStorage.getItem('adminToken')){
                let data = await admin.getInfo()

              if(data.data){
                  // {
                  //     "_id": "69dd0700e220f06fa9702db7",
                  //     "loginId": "ces"
                  // }
                  let adminInfo = await admin.getAdminById(data.data._id)
                  dispatch(initAdminInfo(adminInfo.data))
              }else{
                  localStorage.removeItem('adminToken')
                  message.error('登录过期')
              }
              console.log('data',data)
                // if()
          }
      }

        if(typesList.length == 0){
            dispatch(getTypesAsyncThunk())
        }

        fetchAdminInfo()

    },[])
  return (
    <div className='app'>
      <RouterBefore></RouterBefore>
      {/*<RouterConfig></RouterConfig>*/}
    </div>
  )
}

export default App
