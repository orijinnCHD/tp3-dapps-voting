import{ configureStore } from "@reduxjs/toolkit";
import providersReducer from '../features/providers.slice';
import workflowsReducer from '../features/workflows.slice';
import votersReducer from '../features/voters.slice';


export default configureStore({
    reducer:{
      providers: providersReducer,
      workflows: workflowsReducer,
      voters: votersReducer

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
 })