import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAccessToken } from "../utils/getAccessToken";

export const hackathonApi = createApi({
  reducerPath: "hackathonApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://hackathonmanagementsystem.vercel.app/api/",
    baseUrl: "http://localhost:5000/api/",
  }),
  tagTypes: ["hackthon"],
  endpoints: (builder) => ({
    getAllHackathon: builder.query({
      query: () => `hackathons`,
      providesTags: ["hackthon"],
    }),
    getHackathonById: builder.query({
      query: (id) => ({
        url: `hackathons/${id}`,
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["hackthon"],
    }),
    getHackathonByUserId: builder.query({
      query: () => ({
        url: `hackathon/userId`,
        method: "Get",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "Content-Type": "application/json",
        },
      }),
    }),

    getRegisterHackathonByUserId: builder.query({
      query: () => ({
        url: `/register-hackathon/userId`,
        method: "Get",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "Content-Type": "application/json",
        },
      }),
    }),

    createHackathon: builder.mutation({
      query: (body) => ({
        url: `hackathons`,
        method: "Post",
        body: body,
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["hackthon"],
    }),

    loginUser: builder.mutation({
      query: (body) => ({
        url: `auth/login`,
        method: "Post",
        body: body,
      }),
    }),

    createUser: builder.mutation({
      query: (body) => ({
        url: `auth/register`,
        method: "Post",
        body: body,
      }),
    }),

    registerHackathon: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `hackathons/${id}/register`,
        method: "Post",
        body: body,
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["hackthon"],
    }),
  }),
});

export const {
  useGetAllHackathonQuery,
  useGetHackathonByIdQuery,
  useCreateHackathonMutation,
  useGetHackathonByUserIdQuery,
  useGetRegisterHackathonByUserIdQuery,
  useRegisterHackathonMutation,
  useLoginUserMutation,
  useCreateUserMutation,
} = hackathonApi;
