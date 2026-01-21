import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const tutorApi = createApi({
    reducerPath:'tutorApi',
    baseQuery:fetchBaseQuery({
        baseUrl:'https://tutorbackend-i63e.onrender.com/api/users',
        credentials:'include',
    }),
    tagTypes:["Data"],

    endpoints:(builder) => ({
        getAllTutor:builder.query({
            query:() => ({
                url:'alltutors',
                method:'GET'
            }),
            providesTags:["Data"]
        }),
        getTutorById:builder.query({
            query: (id) => ({
                url:`tutor/${id}`,
                method:'GET'
            })
        }),
        deleteTutor:builder.mutation({
            query:(id) => ({
                url:"/deletetutor",
                method:'POST',
                body:{id}
            }),
            invalidatesTags:["Data"]
        })

    })
})

export const {
    useGetAllTutorQuery,
    useGetTutorByIdQuery,
    useDeleteTutorMutation,
} = tutorApi;