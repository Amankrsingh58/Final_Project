import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const tutorApi = createApi({
    reducerPath:'tutorApi',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:8000/api/users',
        credentials:'include',
    }),

    endpoints:(builder) => ({
        getAllTutor:builder.query({
            query:() => ({
                url:'alltutors',
                method:'GET'
            })
        }),
        getTutorById:builder.query({
            query: (id) => ({
                url:`tutor/${id}`,
                method:'GET'
            })
        }),

    })
})

export const {
    useGetAllTutorQuery,
    useGetTutorByIdQuery,
} = tutorApi;