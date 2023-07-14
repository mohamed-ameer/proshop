/*
*since we're using Redux toolkit, we'll create a new slice for the cart and that will hold any state that has to deal with the shopping cart.
*In the other slice we use createAPI because this is a slice where we have endpoints that are dealing with asynchronous requests,
*but we're not doing that with the cart.So we don't need to use createAPI, we can simply use the createSlice function.
*/
import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] };
//addDecimals is a helper function
const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

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

      // Calculate the items price
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );

      // Calculate the shipping price | If items price is greater than 100, shipping is free | If not, shipping is 10
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

      // Calculate the tax price | Tax is 15% of the items price
      state.taxPrice = addDecimals(
        Number((0.15 * state.itemsPrice).toFixed(2))
      );

      // Calculate the total price | Total price is the sum of the items price, shipping price and tax price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      // Save the cart to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});
//we need to export any function we create as an action ,so we will be able to bring it and use it.
export const { addToCart } = cartSlice.actions;
/*
*each slice contain it's own state and reducers,hence we need to export the reducers of the cartSlice altogether to add them in the store. 
*note:the apiSlice contain different slices that are dealing with asynchronous requests,so it work differently unlike the normal slice. 
*/
export default cartSlice.reducer;