import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Restaurant } from './restaurantTypes';

export const restaurantApi = createApi({
  reducerPath: 'restaurantApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/restaurants' }),
  tagTypes: ['Restaurant'],
  endpoints: (builder) => ({
    getRestaurants: builder.query<Restaurant[], void>({
      query: () => '/',
      providesTags: ['Restaurant'],
    }),
    getRestaurantById: builder.query<Restaurant, string>({
      query: (id) => `/${id}`,
      providesTags: ['Restaurant'],
    }),
    addRestaurant: builder.mutation<Restaurant, Partial<Restaurant>>({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Restaurant'],
    }),
    updateRestaurant: builder.mutation<Restaurant, { id: string; data: Partial<Restaurant> }>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Restaurant'],
    }),
    deleteRestaurant: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Restaurant'],
    }),
  }),
});

export const {
  useGetRestaurantsQuery,
  useGetRestaurantByIdQuery,
  useAddRestaurantMutation,
  useUpdateRestaurantMutation,
  useDeleteRestaurantMutation,
} = restaurantApi;
