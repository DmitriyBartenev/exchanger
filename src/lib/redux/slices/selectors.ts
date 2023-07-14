import type {ReduxState} from '../store';

export const currencyData = (state: ReduxState) => state.availableCurrencies.currency;
export const currencyFetchStatus = (state: ReduxState) => state.availableCurrencies.status;
