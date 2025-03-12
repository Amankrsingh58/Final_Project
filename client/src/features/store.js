import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './auth/userApi';
import { helpFormApi } from './auth/helpFormApi';
import authReducer from './auth/authSlice'; 

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer, 
    [helpFormApi.reducerPath]: helpFormApi.reducer, 
    auth: authReducer,  
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(helpFormApi.middleware), 
});
