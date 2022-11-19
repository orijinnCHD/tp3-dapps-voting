import{ configureStore } from "@reduxjs/toolkit";
import providersReducer from '../features/providers.slice';
import workflowsReducer from '../features/workflows.slice';


export default configureStore({
    reducer:{
        providers: providersReducer,
        workflows: workflowsReducer

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
 })