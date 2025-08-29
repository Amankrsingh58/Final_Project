import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

 export const noticeApi = createApi({
    reducerPath:"noticeApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/users",
        credentials: 'include',
    }),

    endpoints: (builder) => ({
        sendNotice: builder.mutation({
            query: (data) => ({
                url:'/send-notice',
                method:'POST',
                body:data,
            })
        }),

        getNotice: builder.query({
            query: ({id}) => ({
                url:`/notices/${id}`,
                method:'GET'
            })
        }),
    })
 });

 export const  {
    useGetNoticeQuery,
    useSendNoticeMutation
 } = noticeApi

