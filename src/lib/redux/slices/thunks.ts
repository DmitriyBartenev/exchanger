import {createAppAsyncThunk} from '../createAppAsyncThunk';
import type {
  AvailableCurrenciesError,
  AvailableCurrenciesResponse,
  EstimatedExchangeAmountError,
  EstimatedExchangeAmountQueryParams,
  EstimatedExchangeAmountResponse,
  MinimalExchangeAmountError,
  MinimalExchangeAmountQueryParams,
  MinimalExchangeAmountResponse,
} from './types';

const api_key = 'c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd';

export const getAvailableCurrencies = createAppAsyncThunk<
  AvailableCurrenciesResponse[],
  void,
  {rejectValue: AvailableCurrenciesError}
>('availableCurrencies/fetchData', async (_, {rejectWithValue}) => {
  try {
    const response = await fetch('https://api.changenow.io/v1/currencies?active=true');

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData: AvailableCurrenciesError = await response.json();
      return rejectWithValue(errorData);
    }
  } catch (error) {
    return rejectWithValue({
      error: 'Failed to load currencies',
      message: 'An unknown error occurred',
    });
  }
});

export const getMinimalExchangeAmount = createAppAsyncThunk<
  MinimalExchangeAmountResponse,
  MinimalExchangeAmountQueryParams,
  {rejectValue: MinimalExchangeAmountError}
>('minimalExchangeAmount/fetchData', async ({from, to}, {rejectWithValue}) => {
  try {
    const response = await fetch(
      `https://api.changenow.io/v1/min-amount/${from}_${to}?api_key=${api_key}`,
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData: MinimalExchangeAmountError = await response.json();
      return rejectWithValue(errorData);
    }
  } catch (error) {
    return rejectWithValue({
      error: 'Failed to load minimal exchange amount',
      message: 'An unknown error occurred',
    });
  }
});

export const getEstimatedExchangeAmount = createAppAsyncThunk<
  EstimatedExchangeAmountResponse,
  EstimatedExchangeAmountQueryParams,
  {rejectValue: EstimatedExchangeAmountError}
>('estimatedExchangeAmount/fetchData', async ({send_amount, from, to}, {rejectWithValue}) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await fetch(
      `https://api.changenow.io/v1/exchange-amount/${send_amount}/${from}_${to}/?api_key=${api_key}`,
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData: EstimatedExchangeAmountError = await response.json();
      return rejectWithValue(errorData);
    }
  } catch (error) {
    return rejectWithValue({
      error: 'Failed to load estimated exchange amount',
      message: 'An unknown error occurred',
    });
  }
});
