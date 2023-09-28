import {Dispatch, SetStateAction, useState} from 'react';

import type {ICurrency} from '~/types/ICalculator';

export const useCurrencyChange = (
  initialValue = [],
): [
  ICurrency[],
  Dispatch<SetStateAction<ICurrency[]>>,
  (ticker: string, image: string, index: number) => void,
  () => void,
] => {
  const [value, setValue] = useState<ICurrency[]>(initialValue);

  const handleCurrencyChange = (ticker: string, image: string, index: number) => {
    setValue((prevSelectedCurrency) => {
      const newSelectedCurrencies = [...prevSelectedCurrency];
      newSelectedCurrencies[index] = {ticker, image};
      return newSelectedCurrencies;
    });
  };

  const swapCurrency = () => {
    setValue((prevSelectedCurrency) => [prevSelectedCurrency[1], prevSelectedCurrency[0]]);
  };

  return [value, setValue, handleCurrencyChange, swapCurrency];
};
