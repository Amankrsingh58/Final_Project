import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './auth/userApi';
import { helpFormApi } from './auth/helpFormApi';
import authReducer from './auth/authSlice'; 
import { profileApi } from './auth/profileApi';
import { tutorApi } from './auth/tutorApi';
import { studentApi } from './auth/studentApi';
import { noticeApi } from './auth/noticeApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer, 
    [helpFormApi.reducerPath]: helpFormApi.reducer, 
    [profileApi.reducerPath]: profileApi.reducer,
    [tutorApi.reducerPath]: tutorApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
    [noticeApi.reducerPath]: noticeApi.reducer,
    auth: authReducer,  
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(helpFormApi.middleware).concat(profileApi.middleware)
    .concat(tutorApi.middleware).concat(studentApi.middleware).concat(noticeApi.middleware),
});
