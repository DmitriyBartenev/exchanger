import {ICurrencyData, IMinExchangeAmount} from './types';

const api_key = 'c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd';

export const fetchCurrencyData = async (): Promise<ICurrencyData[]> => {
  const response = await fetch('https://api.changenow.io/v1/currencies?active=true');
  const data = await response.json();
  return data;
};

export const fetchMinimalExchangeAmount = async (): Promise<IMinExchangeAmount> => {
  const response = await fetch(`https://api.changenow.io/v1/min-amount/btc_eth?api_key=${api_key}`);
  const data = await response.json();
  return data;
};
