import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const helpFormApi = createApi({
    reducerPath: "helpFormApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://tutorbackend-i63e.onrender.com/api/helprequests",
        credentials: 'include',
    }),
    tagTypes: ['HelpForm'],
    endpoints: (builder) => ({
        submithelpform: builder.mutation({
            query: (data) => ({
                url: '/submithelpform',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['HelpForm'],
        }),

        getAllHelpForms: builder.query({
            query: () => ({
                url: '/getallhelprequest',
                method: 'GET',
            }),
            providesTags: ['HelpForm'],
        }),

        markMessageAsSolved: builder.mutation({
            query: ({ id }) => ({
                url: `/marksolved/${id}`,
                method: 'PUT',
                body: { solved: true },
            }),
            invalidatesTags: ['HelpForm'],
        }),
    })
});

export const {
    useSubmithelpformMutation,
    useGetAllHelpFormsQuery,
    useMarkMessageAsSolvedMutation
} = helpFormApi;