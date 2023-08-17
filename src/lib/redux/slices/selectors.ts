import {createSelector} from 'reselect';

import {RootState} from '../store';

const selectRoot = (state: RootState) => state;

export const rootSelector = createSelector([selectRoot], (rootState) => {
  const {availableCurrencies, estimatedExchangeAmount, minimalExchangeAmount} = rootState;
  const isLoading =
    availableCurrencies.status === 'loading' ||
    minimalExchangeAmount.status === 'loading' ||
    estimatedExchangeAmount.status === 'loading';

  return {
    availableCurrencies,
    minimalExchangeAmount,
    estimatedExchangeAmount,
    isLoading,
  };
});
