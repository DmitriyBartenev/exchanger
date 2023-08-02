import {createSelector} from 'reselect';

import {RootState} from '../store';

const selectRoot = (state: RootState) => state;

export const rootSelector = createSelector([selectRoot], (rootState) => ({
  availableCurrencies: rootState.availableCurrencies.currency,
  availableCurrenciesFetchStatus: rootState.availableCurrencies.status,
  minimalExchangeAmount: rootState.minimalExchangeAmount.minimalExchangeAmount.toString(),
  estimatedExchangeAmount: rootState.estimatedExchangeAmount.estimatedAmount?.toString(),
  estimatedExchangeAmountError: rootState.estimatedExchangeAmount.error,
}));
