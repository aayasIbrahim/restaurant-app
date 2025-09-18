import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Restaurant } from './restaurantTypes';

interface GetRestaurantsResponse {
  restaurants: Restaurant[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } | null;
}

export const restaurantApi = createApi({
  reducerPath: 'restaurantApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/restaurants' }),
  tagTypes: ['Restaurant'],
  endpoints: (builder) => ({
    // Fetch all or paginated restaurants
    getRestaurants: builder.query<GetRestaurantsResponse, { page?: number; limit?: number } | void>({
      query: (params) => {
        if (!params?.page || !params?.limit) {
          // Fetch all
          return '/';
        }
        // Paginated fetch
        return `/?page=${params.page}&limit=${params.limit}`;
      },
      providesTags: ['Restaurant'],
    }),

    // Get a single restaurant by ID
    getRestaurantById: builder.query<Restaurant, string>({
      query: (id) => `/${id}`,
      providesTags: ['Restaurant'],
    }),

    // Add new restaurant
    addRestaurant: builder.mutation<Restaurant, Partial<Restaurant>>({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Restaurant'],
    }),

    // Update restaurant
    updateRestaurant: builder.mutation<Restaurant, { id: string; data: Partial<Restaurant> }>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Restaurant'],
    }),

    // Delete restaurant
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
