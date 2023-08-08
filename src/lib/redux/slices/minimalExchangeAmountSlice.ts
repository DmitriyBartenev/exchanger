import {createSlice} from '@reduxjs/toolkit';

import {getMinimalExchangeAmount} from './thunks';

interface MinimalExchangeAmountState {
  minimalExchangeAmount: number | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: MinimalExchangeAmountState = {
  minimalExchangeAmount: null,
  status: 'idle',
};

export const minimalExchangeAmountSlice = createSlice({
  name: 'minimalExchange',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMinimalExchangeAmount.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMinimalExchangeAmount.fulfilled, (state, action) => {
        state.status = 'idle';
        state.minimalExchangeAmount = action.payload;
      })
      .addCase(getMinimalExchangeAmount.rejected, (state) => {
        state.status = 'failed';
      });
  },
});
