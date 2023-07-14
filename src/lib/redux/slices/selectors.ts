import type {ReduxState} from '../store';

export const availableCurrencies = (state: ReduxState) => state.availableCurrencies.currency;
export const availableCurrenciesStatus = (state: ReduxState) => state.availableCurrencies.status;
