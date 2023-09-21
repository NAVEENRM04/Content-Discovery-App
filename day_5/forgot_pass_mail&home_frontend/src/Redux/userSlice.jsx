import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:"userr",
    initialState:{
        userr:null
    },
    reducers:{
        login:(state,action)=>{
            state.userr=action.payload;
        },
        logout:(state)=>{
            state.userr=null;
        }
    }  
})
export const {login,logout}=userSlice.actions;

export const selectuserr =(state)=>state.userr.userr;

export default userSlice.reducer;


