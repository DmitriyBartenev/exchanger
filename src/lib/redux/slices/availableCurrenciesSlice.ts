import {createSlice} from '@reduxjs/toolkit';

import {getAvailableCurrencies} from './thunks';
import type {AvailableCurrenciesError, AvailableCurrenciesResponse} from './types';

export interface AvailableCurrenciesState {
  availableCurrencies: AvailableCurrenciesResponse[];
  error?: AvailableCurrenciesError | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AvailableCurrenciesState = {
  availableCurrencies: [],
  error: null,
  status: 'idle',
};

export const availableCurrenciesSlice = createSlice({
  name: 'availableCurrencies',
  initialState,
  reducers: {},
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
