import {createSlice} from '@reduxjs/toolkit';

import {getMinimalExchangeAmount} from './thunks';
import type {MinimalExchangeAmountError} from './types';

interface MinimalExchangeAmountState {
  minAmount: number | null;
  error?: MinimalExchangeAmountError | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: MinimalExchangeAmountState = {
  minAmount: null,
  error: null,
  status: 'idle',
};

export const minimalExchangeAmountSlice = createSlice({
  name: 'minimalExchangeAmount',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMinimalExchangeAmount.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getMinimalExchangeAmount.fulfilled, (state, action) => {
        state.status = 'idle';
        state.error = null;
        state.minAmount = action.payload.minAmount;
      })
      .addCase(getMinimalExchangeAmount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});
