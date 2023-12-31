import {estimatedExchangeAmountSlice} from './features/exchange/estimatedExchangeAmountSlice';
import {minimalExchangeAmountSlice} from './features/exchange/minimalExchangeAmountSlice';

export const rootReducer = {
  minimalExchangeAmount: minimalExchangeAmountSlice.reducer,
  estimatedExchangeAmount: estimatedExchangeAmountSlice.reducer,
};
