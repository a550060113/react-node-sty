import { useState,useEffect } from 'react'
import './App.css'
import RouterConfig from './router/index.jsx'
import {useSelector,useDispatch} from "react-redux";
import {getTypesAsyncThunk} from "@/redux/types.js";

function App() {
    const {typesList} = useSelector(state => state.types)
    const dispatch = useDispatch()
    useEffect(()=>{
        if(typesList.length == 0){
            dispatch(getTypesAsyncThunk())
        }
    },[])
  return (
    <div className='app'>
      <RouterConfig></RouterConfig>
    </div>
  )
}

export default App
