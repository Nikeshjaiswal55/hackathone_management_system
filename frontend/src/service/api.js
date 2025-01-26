import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAccessToken } from "../utils/getAccessToken";

export const hackathonApi = createApi({
  reducerPath: "hackathonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  endpoints: (builder) => ({
    getAllHackathon: builder.query({
      query: () => `hackathons`,
    }),
    getHackathonById: builder.query({
      query: (id) => ({
        url: `hackathons/${id}`,
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "Content-Type": "application/json",
        },
      }),
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
      }),
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
