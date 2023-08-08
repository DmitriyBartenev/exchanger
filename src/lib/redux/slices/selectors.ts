import {createSelector} from 'reselect';

import {RootState} from '../store';

const selectRoot = (state: RootState) => state;

export const rootSelector = createSelector([selectRoot], (rootState) => ({
  availableCurrencies: rootState.availableCurrencies,
  minimalExchangeAmount: rootState.minimalExchangeAmount,
  estimatedExchangeAmount: rootState.estimatedExchangeAmount,
}));
