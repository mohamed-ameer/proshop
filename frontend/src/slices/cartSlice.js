/*
*since we're using Redux toolkit, we'll create a new slice for the cart and that will hold any state that has to deal with the shopping cart.
*In the other slice we use createAPI because this is a slice where we have endpoints that are dealing with asynchronous requests,
*but we're not doing that with the cart.So we don't need to use createAPI, we can simply use the createSlice function.
*/
import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal'};


const cartSlice = createSlice({
  name: 'cart',//name of the slice
  initialState,//initial value of the state that the slice carry in
  reducers: {//here we will create all the functions (reducers) that are gonna deal with / manipulate the state of the cart like:addToCart reducer,removeFromCart reducer,...
    /*
    any reducer function will take:
    1-state:which is the current state of the slice (cart).
    2-action:which include any data inside of a payload.
    */
    addToCart: (state, action) => {
        // The item to add to the cart
        const item = action.payload;
        // Check if the item is already in the cart
        const existItem = state.cartItems.find((x) => x._id === item._id);

        if (existItem) {
        // If exists, update quantity
        state.cartItems = state.cartItems.map((x) =>
            x._id === existItem._id ? item : x
        );
        } else {
        // If not exists, add new item to cartItems
        state.cartItems = [...state.cartItems, item];
        }
        // Update the cart state using the updateCart function
        return updateCart(state);  
    },
    removeFromCart: (state, action) => {
        // Filter out the item to remove from the cart
        state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
  
        // Update the prices and save to storage
        return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});
//we need to export any function we create as an action ,so we will be able to bring it and use it.
export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems } = cartSlice.actions;
/*
*each slice contain it's own state and reducers,hence we need to export the reducers of the cartSlice altogether to add them in the store. 
*note:the apiSlice contain different slices that are dealing with asynchronous requests,so it work differently unlike the normal slice. 
*/
export default cartSlice.reducer;