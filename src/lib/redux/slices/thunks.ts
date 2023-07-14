import {createAppAsyncThunk} from '../createAppAsyncThunk';
import {
  fetchCurrencyData,
  fetchEstimatedExchangeAmount,
  fetchMinimalExchangeAmount,
} from './services';

export const getAvailableCurrencies = createAppAsyncThunk('currency/fetchData', async () => {
  const response = await fetchCurrencyData();
  return response;
});

export const getMinimalExchangeAmount = createAppAsyncThunk(
  'minimalExchangeAmount/fetchData',
  async ({from, to}: {from: string; to: string}) => {
    const response = await fetchMinimalExchangeAmount(from, to);
    return response.minAmount;
  },
);

export const getEstimatedExchangeAmount = createAppAsyncThunk(
  'estimatedExchangeAmount/fetchData',
  async ({send_amount, from, to}: {send_amount: string; from: string; to: string}) => {
    const response = await fetchEstimatedExchangeAmount(send_amount, from, to);
    return response;
  },
);
