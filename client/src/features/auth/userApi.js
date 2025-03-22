import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setLogout } from './authSlice';
import { setLoading } from './authSlice';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/users',
    credentials: 'include',
    // Custom fetch base query to check for token expiry and handle it
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Login', 'Logout', 'TokenExpiry'],

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: data,
      }),
    }),

    Signup: builder.mutation({
      query: (data) => ({
        url: '/register',
        method: 'POST',
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
      providesTags:["Logout"],
    }),

    passwordChange: builder.mutation({
      query: (formData) => ({
        url:'/change-password',
        method:'PUT',
        body:formData
      }),
      invalidatesTags:["Logout"],
    }),

    verifyTokenExpiry: builder.query({
      query: () => '/verify-token', 
      onError: (error, { dispatch }) => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        dispatch(setLogout());
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useVerifyTokenExpiryQuery,
  usePasswordChangeMutation,
} = authApi;
