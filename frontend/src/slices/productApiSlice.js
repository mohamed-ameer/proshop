import { PRODUCTS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const productSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({//the builder object has methods like query that allow us to make a query.
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,//using redux toolkit we can send request to backend api and fetch our data without using fetch api or axios.
      }),
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});
/*
the actual name of the Queries that we have build,it will be:
prefixed with (use___) ,and 
the naming convention will be in cammel case ,and
suffixed with (___Query)
ex:
getProducts ==> useGetProductsQuery
*/
export const { useGetProductsQuery, useGetProductDetailsQuery } = productSlice;