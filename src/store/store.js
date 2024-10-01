import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Features/authSlice";
import eventSlice from "./Features/eventSlice";

const store = configureStore({
    reducer: {
        auth: authSlice , 
        event : eventSlice
    }
}
)


export default store