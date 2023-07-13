import type {ReduxState} from '../store';

export const currencyData = (state: ReduxState) => state.currency.currency;
export const currencyFetchStatus = (state: ReduxState) => state.currency.status;
