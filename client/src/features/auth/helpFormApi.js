import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const helpFormApi = createApi({
    reducerPath : "helpFormApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:8000/api/helprequests",
        credentials: 'include',
        tagTypes : ["A"],
    }),

    endpoints: (builder) => ({
        submithelpform : builder.mutation({
            query: (data) => ({
              url: '/submithelpform',
              method: 'POST',
              body: data,
            }),
          }),

          getAllHelpForms: builder.query({
            query: () => ({
              url: '/getallhelprequest',
              method: 'GET',
            }),
            providesTags:["A"],
        }),

    markMessageAsSolved: builder.mutation({
        query: ({ id }) => ({
          url: `/marksolved/${id}`, 
          method: 'PUT', 
          body: { solved: true }, 
        }),
        invalidatesTags:["A"],
      }),


    })
});

export const {
    useSubmithelpformMutation,
    useGetAllHelpFormsQuery,
    useMarkMessageAsSolvedMutation
} = helpFormApi;