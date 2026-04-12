import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import admin from '@/server/admin.js'



// 异步请求管理员列表
export const getAdminListAsyncThunk = createAsyncThunk('admin/getAdminList',async(_,thunkAPI)=>{
    const {data}  = await admin.getAdmin()
    thunkAPI.dispatch(setAdminList(data))
})

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        adminList:[],
        adminInfo:{}
    },
    reducers:{
        setAdminList(state,action){
          state.adminList=action.payload
        },
        setAdminInfo(state, action){
            state.adminInfo = action.payload
        }
    }
})


export const {setAdminList,setAdminInfo} = adminSlice.actions;
export default adminSlice
