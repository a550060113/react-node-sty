import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import admin from '@/server/admin.js'



// 异步请求管理员列表
export const getAdminListAsyncThunk = createAsyncThunk('admin/getAdminList',async(_,thunkAPI)=>{
    const {data}  = await admin.getAdmin()
    thunkAPI.dispatch(setAdminList(data))
})

export const addAdminAsyncThunk = createAsyncThunk('admin/addAdminAsyncThunk',async (payload,thunkAPI)=>{
    const {data}  = await admin.addAdmin({...payload})
    thunkAPI.dispatch(addAddAdmin(data))

    console.log(data)
})

export const updateAdminAsyncThunk = createAsyncThunk('admin/addAdminAsyncThunk',async (payload,thunkAPI)=>{
    const {data}  = await admin.editAdmin(payload.id,{...payload.newInfo})
    console.log(payload)
    thunkAPI.dispatch(updateAdmin(payload))
    // console.log(data)
})


export const delAdminAsyncThunk = createAsyncThunk('admin/delAdminAsyncThunk',async (payload,thunkAPI)=>{
    console.log(payload)
    const {data} = await admin.deleteAdmin(payload)
    thunkAPI.dispatch(delAdminItem(payload))
})

export const getAdminInfoAsyncThunk = createAsyncThunk('admin/getAdminInfoAsyncThunk',async (_,thunkAPI)=>{
    const data = await admin.getInfo()
    console.log('getAdminInfoAsyncThunk：',data)
    // thunkAPI.dispatch(setAdminInfo)
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
        initAdminInfo(state, action){
            state.adminInfo = action.payload
        },
        addAddAdmin(state, action){
            state.adminList.push(action.payload)
        },
        updateAdmin(state, {payload}){
            console.log('action.payload',payload)
            let items = state.adminList.find(item=>item._id == payload.id)
            for(let key in payload.newInfo){
                items[key] = payload.newInfo[key]
            }
            console.log('adminInfo',items)
        },
        delAdminItem(state, action){
            let idx = state.adminList.findIndex(item=>item._id == action.payload)
            console.log('idx',idx)
            state.adminList.splice(idx,1)
        }
    }
})


export const {setAdminList,updateAdmin,initAdminInfo,addAddAdmin,delAdminItem} = adminSlice.actions;
export default adminSlice
