
"use client"
import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../redux/filters/filterSlice";
import favouriteSlice from "../redux/favourites/favouriteSlice"
import cartSlice from "../redux/Carts/cartSlice"
import { restaurantApi } from "../redux/Api/restaurantApi";

export const store = configureStore({
  reducer: {
    filters: filterReducer,
    favourites:favouriteSlice,
    carts:cartSlice,
    [restaurantApi.reducerPath]: restaurantApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(restaurantApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
