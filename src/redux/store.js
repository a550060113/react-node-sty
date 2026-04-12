import adminSlice from './adminSlice.js'
import {configureStore} from "@reduxjs/toolkit"
import menuSlice from "@/redux/MenuSlice.js";


const store = configureStore({
    reducer: {
        'admin':adminSlice.reducer,
        'menu':menuSlice.reducer,
    }
})

export default store
