import {
  AvailableCurrenciesResponse,
  EstimatedExchangeAmountResponse,
  MinExchangeAmountResponse,
} from './types';

const api_key = 'c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd';

export const fetchCurrencyData = async (): Promise<AvailableCurrenciesResponse[]> => {
  const response = await fetch('https://api.changenow.io/v1/currencies?active=true');
  const data = await response.json();
  return data;
};

export const fetchMinimalExchangeAmount = async (
  from: string,
  to: string,
): Promise<MinExchangeAmountResponse> => {
  const response = await fetch(
    `https://api.changenow.io/v1/min-amount/${from}_${to}?api_key=${api_key}`,
  );
  const data = await response.json();
  return data;
};

export const fetchEstimatedExchangeAmount = async (
  send_amount: string,
  from: string,
  to: string,
): Promise<EstimatedExchangeAmountResponse> => {
  const response = await fetch(
    `https://api.changenow.io/v1/exchange-aount/${send_amount}/${from}_${to}/?api_key=${api_key}`,
  );
  const data = await response.json();
  return data;
};
