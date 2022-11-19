import { createSlice } from "@reduxjs/toolkit";

export const workflowsSlice = createSlice({
    name:"workflows",
    initialState:{
        workflow:null,
        

    },
    reducers:{
        // state : array[]
        //action : parameter function : ex: setPictureData(param)
        setWorkflow:(state,action)=>{
            state.workflow = parseInt(action.payload);
        }
        
    }
});

export const {setWorkflow} = workflowsSlice.actions;
export default workflowsSlice.reducer;