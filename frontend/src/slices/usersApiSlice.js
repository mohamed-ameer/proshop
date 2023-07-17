import { apiSlice } from './apiSlice';
import { USERS_URL } from '../constants';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({//the builder object has methods like mutation that allow us to make a post request,in the other hand the query method just allow us to fetch data only.
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    profile: builder.mutation({//this is the mutation to update our Profile
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});
/*
the convention is :start with [use] end with [Mutation]
login ==> useLoginMutation
*/
export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation, } = usersApiSlice;