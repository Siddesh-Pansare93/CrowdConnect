import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Features/authSlice";

const store = configureStore({
    reducer: {
        auth: authSlice
    }
}
)


export default store