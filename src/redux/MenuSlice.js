import {createSlice} from "@reduxjs/toolkit";
import {Menu} from "antd";

const menuSlice = createSlice({
    name: "menu",
    initialState: {
        menuList:[]
    },
    reducers:{
        setMenuList: (state, action)=>{
            state.menuList=action.payload
        }
    }
})

export const {setMenuList} = menuSlice.actions;
export default menuSlice;
