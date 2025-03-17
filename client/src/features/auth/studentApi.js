import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const studentApi = createApi({
    reducerPath:'studentApi',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:8000/api/users',
        credentials:'include',
    }),

    endpoints:(builder) => ({
        getAllStudent:builder.query({
            query:() => ({
                url:'allstudents',
                method:'GET'
            })
        }),
        getStudentById:builder.query({
            query: (id) => ({
                url:`student/${id}`,
                method:'GET'
            })
        }),

    })
})

export const {
    useGetAllStudentQuery,
    useGetStudentByIdQuery,
} = studentApi;