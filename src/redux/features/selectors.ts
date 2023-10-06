import {createSelector} from 'reselect';

import {RootState} from '../store';

const estimatedExchangeSelector = (state: RootState) => state.estimatedExchangeAmount;
const minimalExchangeSelector = (state: RootState) => state.minimalExchangeAmount;

export const exchangeSelector = createSelector(
  [estimatedExchangeSelector, minimalExchangeSelector],
  (estimatedExchangeAmount, minimalExchangeAmount) => {
    const isError =
      minimalExchangeAmount.status === 'failed' || estimatedExchangeAmount.status === 'failed';

    return {
      minimalExchangeAmount,
      estimatedExchangeAmount,
      isError,
    };
  },
);
