import adminSlice from './adminSlice.js'
import {configureStore} from "@reduxjs/toolkit"
import menuSlice from "@/redux/MenuSlice.js";
import typesSlice from "@/redux/types.js";

const store = configureStore({
    reducer: {
        'admin':adminSlice.reducer,
        'menu':menuSlice.reducer,
        'types':typesSlice.reducer
    }
})

export default store
