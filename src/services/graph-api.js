import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getTokenFromLocalStorage } from './api-utils';

const graphApi = createApi({
  reducerPath: 'graphApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/PrecisionArc/points', 
    prepareHeaders: (headers) => {
      const token = getTokenFromLocalStorage();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserPoints: builder.query({
      query: () => '/get',
    }),
    addUserPoint: builder.mutation({
      query: (newPoint) => ({
        url: '/add',
        method: 'POST',
        body: newPoint,
      }),
    }),
    clearTable: builder.mutation({
      query: (credentials) => ({
        url: '/clearTable',
        method: 'GET',
        body: credentials,
      }),
    }),    
  }),
});

export const { useGetUserPointsQuery, useAddUserPointMutation, useClearTableMutation } = graphApi;
export default graphApi;
