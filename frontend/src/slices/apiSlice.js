/*
slice is a way to organize your state.
So it's a collection of reducers and actions that are related to each other.
And we can create multiple slices in our application and each slice can have its own state.
*/
/*
since we're working with a backend API, basically we're going to have a route API slice and
then we'll extend that with the products API slice ,the orders API slice, the users API slice.
in short the apiSlice is gonna be the parent slice to our other API slices like productAPISlice,orderAPISlice...etc
*/
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

// fetchBaseQuery is the function that will allow us to make requests to our backend API.
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

//using redux toolkit we can send request to backend api without using fetch api.
export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Product', 'Order', 'User'],//tagTypes are used to define the types of data that will be fetching from our API.
  endpoints: (builder) => ({}),//we can put the endpoints directly here or we can inject the endpoints from a separate file. 
});