import {createSlice} from '@reduxjs/toolkit';

import {getAvailableCurrencies} from './thunks';
import type {AvailableCurrenciesResponse} from './types';

export interface AvailableCurrenciesState {
  currency: AvailableCurrenciesResponse[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AvailableCurrenciesState = {
  currency: [],
  status: 'idle',
};

export const availableCurrenciesSlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAvailableCurrencies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAvailableCurrencies.fulfilled, (state, action) => {
        state.status = 'idle';
        state.currency = action.payload;
      })
      .addCase(getAvailableCurrencies.rejected, (state) => {
        state.status = 'failed';
      });
  },
});
