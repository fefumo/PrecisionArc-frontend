import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getTokenFromLocalStorage } from './api-utils';

const graphApi = createApi({
  reducerPath: 'graphApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/PrecisionArc/graph',
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
      query: () => '/points',
    }),
    addUserPoint: builder.mutation({
      query: (newPoint) => ({
        url: '/points',
        method: 'POST',
        body: newPoint,
      }),
    }),
  }),
});

export const { useGetUserPointsQuery, useAddUserPointMutation } = graphApi;
export default graphApi;
