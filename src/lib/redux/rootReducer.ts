import {currencySlice} from './slices/currencySlice';
import {minimalExchangeAmountStateSlice} from './slices/minimalExchangeAmountSlice';

export const reducer = {
  currency: currencySlice.reducer,
  minimalExchangeAmount: minimalExchangeAmountStateSlice.reducer,
};
