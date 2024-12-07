import { configureStore, createSlice } from '@reduxjs/toolkit';
import graphApi from './graph-api';
import authApi from './auth-api';

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: localStorage.getItem('token') || null },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem('token');
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;

const store = configureStore({
  reducer: {
    auth: authSlice.reducer, 
    [graphApi.reducerPath]: graphApi.reducer, 
    [authApi.reducerPath]: authApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(graphApi.middleware)  
      .concat(authApi.middleware), 
});

export default store;
