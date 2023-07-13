import {createAppAsyncThunk} from '../createAppAsyncThunk';
import {fetchCurrencyData} from './services';

export const getAvailableCurrencies = createAppAsyncThunk('currency/fetchData', async () => {
  const response = await fetchCurrencyData();
  return response;
});
