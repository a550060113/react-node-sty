import { useState,useEffect,Suspense } from 'react'
import './App.css'
import RouterConfig from './router/index.jsx'
import {useSelector,useDispatch} from "react-redux";
import {getTypesAsyncThunk} from "@/redux/types.js";
import {getAdminInfoAsyncThunk, initAdminInfo} from "@/redux/adminSlice.js";
import admin from "@/server/admin.js";
import {message} from "antd";
import {useNavigate} from "react-router-dom";
import RouterBefore from "@/router/routerBefore.jsx";
import GlobleContext from "@/context/index.js";
function App() {
    const {typesList} = useSelector(state => state.types)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    useEffect(()=>{

      async function fetchAdminInfo(){
          if(localStorage.getItem('adminToken')){
              try {
                  let data = await admin.getInfo()
                  console.log('woami data',data)
              }catch (err){
                  console.log('err>>>',err)
                  if(err.code == 401){ //未登录/token失效/篡改:code=401
                          localStorage.removeItem('adminToken')
                          message.error('登录过期')
                      navigate('/login',{
                          state:{
                              from: location.pathname
                          }
                      })
                  }
              }
              // if(data.data){
              //     let adminInfo = await admin.getAdminById(data.data._id)
              //     dispatch(initAdminInfo(adminInfo.data))
              // }else{
              //     localStorage.removeItem('adminToken')
              //     message.error('登录过期')
              // }

          }
      }

        if(typesList.length == 0){
            dispatch(getTypesAsyncThunk())
        }

        fetchAdminInfo()

    },[])
  return (
    <div className='app'>
        {/*<Suspense fallback={'加载中'}>*/}
            <RouterBefore></RouterBefore>
        {/*</Suspense>*/}
      {/*<RouterConfig></RouterConfig>*/}
    </div>
  )
}

export default App
