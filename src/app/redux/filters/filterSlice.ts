
"use client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  sortBy: string;
  quickFilter: string[];
  offers: string[];
  selectedCuisines: string[];
  selectedPrices: string[];
}

const initialState: FilterState = {
  sortBy: "relevance",
  quickFilter: [],
  offers: [],
  selectedCuisines: [],
  selectedPrices: [],
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setQuickFilter: (state, action: PayloadAction<string[]>) => { state.quickFilter = action.payload; },
    toggleQuickFilter: (state, action: PayloadAction<string>) => {
      if (state.quickFilter.includes(action.payload)) {
        state.quickFilter = state.quickFilter.filter((x) => x !== action.payload);
      } else {
        state.quickFilter.push(action.payload);
      }
    },
    toggleOffer: (state, action: PayloadAction<string>) => {
      if (state.offers.includes(action.payload)) {
        state.offers = state.offers.filter((x) => x !== action.payload);
      } else {
        state.offers.push(action.payload);
      }
    },
    toggleCuisine: (state, action: PayloadAction<string>) => {
      if (state.selectedCuisines.includes(action.payload)) {
        state.selectedCuisines = state.selectedCuisines.filter((x) => x !== action.payload);
      } else {
        state.selectedCuisines.push(action.payload);
      }
    },
    togglePrice: (state, action: PayloadAction<string>) => {
      if (state.selectedPrices.includes(action.payload)) {
        state.selectedPrices = state.selectedPrices.filter((x) => x !== action.payload);
      } else {
        state.selectedPrices.push(action.payload);
      }
    },
    clearAll: (state) => {
      state.sortBy = "relevance";
      state.quickFilter = [];
      state.offers = [];
      state.selectedCuisines = [];
      state.selectedPrices = []; 
    },
  },
});

export const {
  setSortBy,
  setQuickFilter,
  toggleQuickFilter,
  toggleOffer,
  toggleCuisine,
  togglePrice,
  clearAll,
} = filterSlice.actions;

export default filterSlice.reducer;
