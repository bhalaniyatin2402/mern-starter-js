import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:3000/api/v1`,
    credentials: "include"
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/user/register",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
      }),
    }),
    getUserDetails: builder.query({
      query: () => "/user/me",
    }),
    updateUserDetails: builder.mutation({
      query: (data) => ({
        url: "/user/me",
        method: "PUT",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => "/user/logout",
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUserDetailsQuery,
  useUpdateUserDetailsMutation,
  useLogoutMutation
} = authApi;
