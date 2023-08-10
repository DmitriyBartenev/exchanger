import * as exchangerAPI from './services';
import {createAppAsyncThunk} from '../createAppAsyncThunk';
import {EstimatedExchangeAmountResponse} from './types';

export const getAvailableCurrencies = createAppAsyncThunk('currency/fetchData', async () => {
  const response = await exchangerAPI.fetchCurrencyData();
  return response;
});

export const getMinimalExchangeAmount = createAppAsyncThunk(
  'minimalExchangeAmount/fetchData',
  async ({from, to}: {from: string; to: string}) => {
    const response = await exchangerAPI.fetchMinimalExchangeAmount(from, to);
    return response.minAmount;
  },
);

interface EstimatedExchangeAmountQueryParams {
  send_amount: string;
  from: string;
  to: string;
}

export const getEstimatedExchangeAmount = createAppAsyncThunk<
  EstimatedExchangeAmountResponse,
  EstimatedExchangeAmountQueryParams
>('estimatedExchangeAmount/fetchData', async ({send_amount, from, to}) => {
  const response = await exchangerAPI.fetchEstimatedExchangeAmount(send_amount, from, to);
  return response;
});
