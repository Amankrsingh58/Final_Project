import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const  profileApi = createApi({
    reducerPath:"profileApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"https://tutorbackend-i63e.onrender.com/api/users",
        credentials:"include",
    }),
    tagTypes:["Profile"],
    endpoints:(builder) => ({
        getProfile:builder.query({
            query:() => ({
                url:'profile',
                method:'GET'
            }),
            providesTags:["Profile"],
        }),

        updateProfile:builder.mutation({
           query:({id, profile}) => ({
                url:`profile/${id}`,
                method:'PUT',
                body:{profile}
           }),
           invalidatesTags:["Profile"]
        }),

        uploadImage: builder.mutation({
            query: (formData) => ({
              url: '/upload-image', 
              method: 'POST',  
              body: formData, 
            }),
            invalidatesTags:["Profile"]
          }),
    })
})

export const {
    useGetProfileQuery,
    useUpdateProfileMutation,
    useUploadImageMutation,
} = profileApi;


