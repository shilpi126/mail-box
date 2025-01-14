import {configureStore} from "@reduxjs/toolkit"
import mailSlice from "./slices/mailSlice";

const store = configureStore({
    reducer:{
        sendmail:mailSlice.reducer,
    }
})


export default store;