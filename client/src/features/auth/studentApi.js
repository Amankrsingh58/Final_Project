import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const studentApi = createApi({
    reducerPath:'studentApi',
    baseQuery:fetchBaseQuery({
        baseUrl:'https://tutorbackend-i63e.onrender.com/api/users',
        credentials:'include',
    }),
    tagTypes:["Student"],

    endpoints:(builder) => ({
        getAllStudent:builder.query({
            query:() => ({
                url:'allstudents',
                method:'GET'
            }),
            providesTags:["Student"]
        }),
        getStudentById:builder.query({
            query: (id) => ({
                url:`student/${id}`,
                method:'GET'
            })
        }),

        deleteStudent:builder.mutation({
            query:(id) => ({
                url:"/deletestudent",
                method:'POST',
                body:{id}
            }),
            invalidatesTags:["Student"]
        })

    })
})

export const {
    useGetAllStudentQuery,
    useGetStudentByIdQuery,
    useDeleteStudentMutation
} = studentApi;