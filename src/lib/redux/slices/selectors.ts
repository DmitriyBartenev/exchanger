import {RootState} from '../store';

export const rootSelector = (state: RootState) => ({
  availableCurrencies: state.availableCurrencies.currency,
  availableCurrenciesFetchStatus: state.availableCurrencies.status,
  minimalExchangeAmount: state.minimalExchangeAmount.minimalExchangeAmount.toString(),
  estimatedExchangeAmount: state.estimatedExchangeAmount,
});
