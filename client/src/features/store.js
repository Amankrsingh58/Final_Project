import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './auth/userApi';
import authReducer from './auth/authSlice'; 

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer, 
    auth: authReducer,  
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware), 
});
