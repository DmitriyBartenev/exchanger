import {ICurrencyData} from './types';

export const fetchCurrencyData = async (): Promise<ICurrencyData[]> => {
  const response = await fetch('https://api.changenow.io/v1/currencies?active=true');
  const data = await response.json();
  return data;
};
