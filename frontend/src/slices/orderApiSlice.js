import { apiSlice } from './apiSlice';
import { ORDERS_URL } from '../constants';

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: 'POST',
        body: { ...order },
      }),
    }),
    getOrderDetails: builder.query({
        query: (id) => ({
          url: `${ORDERS_URL}/${id}`,
          //method: 'GET',//this is the default method so you don't have to set it by yourself
        }),
        keepUnusedDataFor: 5,
      }),
  }),
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery } = orderApiSlice;