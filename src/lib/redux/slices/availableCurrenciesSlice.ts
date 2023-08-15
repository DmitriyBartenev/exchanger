import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {getAvailableCurrencies} from './thunks';
import type {AvailableCurrenciesError, AvailableCurrenciesResponse} from './types';

export interface AvailableCurrenciesState {
  availableCurrencies: AvailableCurrenciesResponse[];
  error?: AvailableCurrenciesError | null;
  status: 'idle' | 'loading' | 'failed';
  searchValue: string;
  searchResults: AvailableCurrenciesResponse[];
}

const initialState: AvailableCurrenciesState = {
  availableCurrencies: [],
  error: null,
  status: 'idle',
  searchValue: '',
  searchResults: [],
};

export const availableCurrenciesSlice = createSlice({
  name: 'availableCurrencies',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;

      state.searchResults = state.availableCurrencies.filter((currency) =>
        currency.name.toLowerCase().includes(action.payload.toLowerCase()),
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAvailableCurrencies.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getAvailableCurrencies.fulfilled, (state, action) => {
        state.status = 'idle';
        state.error = null;
        state.availableCurrencies = action.payload;
      })
      .addCase(getAvailableCurrencies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const {setSearchValue} = availableCurrenciesSlice.actions;
