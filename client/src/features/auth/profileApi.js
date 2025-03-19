import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const  profileApi = createApi({
    reducerPath:"profileApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:8000/api/users",
        credentials:"include",
    }),

    endpoints:(builder) => ({
        getProfile:builder.query({
            query:() => ({
                url:'profile',
                method:'GET'
            })
        }),

        updateProfile:builder.mutation({
           query:({id, profile}) => ({
                url:`profile/${id}`,
                method:'PUT',
                body:{profile}
           })
        }),
    })
})

export const {
    useGetProfileQuery,
    useUpdateProfileMutation,
} = profileApi;


