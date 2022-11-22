import { createSlice } from "@reduxjs/toolkit";

export const votersSlice = createSlice({
    name:"voters",
    initialState:{
        voter:null,
        

    },
    reducers:{

        isAccountRegistered:(state,action)=>{
            state.voter = action.payload;
        }
        
    }
});

export const {isAccountRegistered} = votersSlice.actions;
export default votersSlice.reducer;