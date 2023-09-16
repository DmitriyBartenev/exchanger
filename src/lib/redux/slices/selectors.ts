import {createSelector} from 'reselect';

import {RootState} from '../store';

const selectRoot = (state: RootState) => state;

export const rootSelector = createSelector([selectRoot], (rootState) => {
  const {availableCurrencies, estimatedExchangeAmount, minimalExchangeAmount} = rootState;

  const isError =
    availableCurrencies.status === 'failed' ||
    minimalExchangeAmount.status === 'failed' ||
    estimatedExchangeAmount.status === 'failed';

  return {
    availableCurrencies,
    minimalExchangeAmount,
    estimatedExchangeAmount,
    isError,
  };
});
