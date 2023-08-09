import {createSlice} from '@reduxjs/toolkit';

import {getEstimatedExchangeAmount} from './thunks';

export interface EstimatedExchangeAmountError {
  error: string;
  message: string;
}

interface EstimatedExchangeAmountState {
  estimatedAmount: number | null;
  transactionSpeedForecast: string | null;
  warningMessage: string | null;
  error: string | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: EstimatedExchangeAmountState = {
  estimatedAmount: null,
  transactionSpeedForecast: null,
  warningMessage: null,
  error: null,
  status: 'idle',
};

export const estimatedExchangeAmountSlice = createSlice({
  name: 'estimatedExchangeAmount',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEstimatedExchangeAmount.pending, (state) => {
        state.status = 'loading';
        state.warningMessage = null;
        state.error = null;
      })
      .addCase(getEstimatedExchangeAmount.fulfilled, (state, action) => {
        state.status = 'idle';
        state.error = null;
        state.estimatedAmount = action.payload.estimatedAmount;
        state.transactionSpeedForecast = action.payload.transactionSpeedForecast;
        state.warningMessage = action.payload.warningMessage;
      })
      .addCase(getEstimatedExchangeAmount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string | null;
      });
  },
});
