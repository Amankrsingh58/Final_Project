import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bookingApi = createApi({
    reducerPath: "bookingApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/users",
        credentials: 'include',
    }),

    tagTypes : ["Booking"],

    endpoints: (builder) => ({
        createBoking: builder.mutation({
            query:(data) => ({
                url:'create-booking',
                method:'POST',
                body:data
            }),
            invalidatesTags:["Booking"],
        }),

        getUserBooking: builder.query({
            query: () => ({
              url: '/bookings',
              method: 'GET',
            }),
            providesTags:["Booking"],
          }),

          updateBookingState: builder.mutation({
            query: ({bookingId,newStatus}) => ({
              url: '/update-bookings-status',
              method: 'PUT',
              body: {bookingId,newStatus}, 
            }),
            invalidatesTags:["Booking"],
          }),
})
})

export const {useCreateBokingMutation,
              useUpdateBookingStateMutation,
              useGetUserBookingQuery,
} = bookingApi;