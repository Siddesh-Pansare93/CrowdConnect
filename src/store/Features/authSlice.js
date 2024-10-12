import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    status: false,
    userData: null
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true,
                state.userData = action.payload
        },
        logout: (state, action) => {
            state.status = false
            state.userData = null
        },
        updateUser(state, action) {
            state.user = { ...state.user, ...action.payload }; // Merge the updated data
        },
    }
}
)


export const { login, logout , updateUser} = authSlice.actions
export default authSlice.reducer