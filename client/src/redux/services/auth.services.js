import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/api`,
    credentials: "include"
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"]
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"]
    }),
    getUserDetails: builder.query({
      query: () => "/me",
      providesTags: ["User"]
    }),
    updateUserDetails: builder.mutation({
      query: (data) => ({
        url: "/me",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"]
    }),
    logout: builder.mutation({
      query: () => "/logout",
      invalidatesTags: ["User"]
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
