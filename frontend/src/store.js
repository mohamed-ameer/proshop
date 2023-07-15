//this file is the entry point of Redux
//this file is the boileplate,so we will never touch this file again
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import cartSliceReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
//create our store
const store = configureStore({
    //here we will add any reducer that we have
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartSliceReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>{
        return getDefaultMiddleware().concat(apiSlice.middleware)
    },
    //this option allow us to use the redux development tools ,but use it at the development time only
    //turn this option to false at the deployment time
    devTools: true,
});
  
export default store;