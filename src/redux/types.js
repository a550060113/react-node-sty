import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import type from '@/server/type.js'

export const getTypesAsyncThunk = createAsyncThunk('ty[es/getTypesAsyncThunk]',async (_,thunkAPI)=>{
    let {data} = await type.getType()
    thunkAPI.dispatch(setTypesList(data))
});


const typesSlice = createSlice({
    name:'types-slice',
    initialState:{
        typesList:[]
    },
    reducers:{
       setTypesList:(state,action)=>{
           state.typesList=action.payload;
       }
    },

})


export const {setTypesList}  = typesSlice.actions
export default typesSlice;
