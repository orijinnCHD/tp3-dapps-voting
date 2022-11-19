import { createSlice } from "@reduxjs/toolkit";

export const providersSlice = createSlice({
    name:"providers",
    initialState:{
        contract:null,
        account :null,
        sign:null,
        chain:null,
        owner:null,
        connected:null

    },
    reducers:{
        // state : array[]
        //action : parameter function : ex: setPictureData(param)
        setContract:(state,action)=>{
            // incrementer les données dans le states quand il joue le setPictureData
            // payload : le parametre
            state.contract=action.payload;
        },
        setAccount:(state,action)=>{

            state.account = action.payload;

        },
        setSign:(state,action)=>{
            state.sign = action.payload;
        },
        setChain:(state,action)=>{
            state.chain = action.payload;
        },
        setOwner:(state,action)=>{
            state.owner = action.payload;
        },
        setConnected:(state,action)=>{
            state.connected = action.payload;
        }
        
    }
});

export const {setContract,setAccount,setChain,setSign,setOwner,setConnected} = providersSlice.actions;
export default providersSlice.reducer;