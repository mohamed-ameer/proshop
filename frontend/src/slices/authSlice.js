/*
*In this slice we are not dealing with any backend endpoints/api,
 in this slice we are simply gonna set the user cradentials to local storage and remove them.
*we are creating normal slice so we will use createSlice not createApi.
*any slice we create it will have it's own state and reducers that update that state
 and to access this state we have to add this slice to the store(register the slice's reducers into the store).
*/
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;