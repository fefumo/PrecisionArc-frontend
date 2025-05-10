import { configureStore, createSlice } from '@reduxjs/toolkit';
import graphApi from './graph-api';
import authApi from './auth-api';

const initialState = {
  token: localStorage.getItem('token') || null,
  username: null,
  };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem('token');
    },
    logout: (state) => {
      state.token = null;
      state.username = null;
    },
  },
});

export const { setToken,setUsername, clearToken } = authSlice.actions;

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
