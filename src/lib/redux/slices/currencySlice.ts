import {createSlice} from '@reduxjs/toolkit';

import {getAvailableCurrencies} from './thunks';
import type {ICurrencyData} from './types';

interface CurrencyState {
  currency: ICurrencyData[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CurrencyState = {
  currency: [],
  status: 'idle',
};

export const currencySlice = createSlice({
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
