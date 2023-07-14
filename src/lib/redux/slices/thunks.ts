import {createAppAsyncThunk} from '../createAppAsyncThunk';
import {fetchCurrencyData, fetchMinimalExchangeAmount} from './services';

export const getAvailableCurrencies = createAppAsyncThunk('currency/fetchData', async () => {
  const response = await fetchCurrencyData();
  return response;
});

export const getMinimalExchangeAmount = createAppAsyncThunk(
  'minimalExchangeAmount/fetchData',
  async () => {
    const response = await fetchMinimalExchangeAmount();
    return response.minAmount;
  },
);
