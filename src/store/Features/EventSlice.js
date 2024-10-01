import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    allEvents : [] , 
    singleEvent : null , 
    userEvent : []

}



const eventSlice = createSlice({
    name : "event" , 
    initialState : initialState,
    reducers:{
        setAllEvents : (state , action )=>{
            state.allEvents = action.payload
        } , 
        setEvent : (state , action)=>{
            state.singleEvent = action.payload
        } , 
        setUserEvent : (state , action)=>{
            state.userEvent = action.payload
        }

    }
}) 


export const {setAllEvents , setEvent , setUserEvent } = eventSlice.actions

export default eventSlice.reducer