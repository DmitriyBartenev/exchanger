import {availableCurrenciesSlice} from './slices/AvailableCurrenciesSlice';
import {estimatedExchangeAmountSlice} from './slices/estimatedExchangeAmountSlice';
import {minimalExchangeAmountSlice} from './slices/minimalExchangeAmountSlice';

export const reducer = {
  availableCurrencies: availableCurrenciesSlice.reducer,
  minimalExchangeAmount: minimalExchangeAmountSlice.reducer,
  estimatedExchangeAmount: estimatedExchangeAmountSlice.reducer,
};
