'use client';

import React, {useState} from 'react';
import {useAppSelector} from '~/lib/redux/hooks';
import {buttons} from '~/ui';

import CryptoAdress from './CryptoAdress';
import CurrencySelector from './CurrencySelector';
import {StyledCalculator, StyledContainer, StyledExchangeContainer} from './styles';

export const Calculator: React.FC = () => {
  const currencies = useAppSelector((state) => state.currency.currency);
  const [amount, setAmount] = useState<{currency1: string; currency2: string}>({
    currency1: '',
    currency2: '',
  });
  const [selectedCurrency, setSelectedCurrency] = useState<{ticker: string; image: string}[]>([
    {ticker: 'BTC', image: 'https://content-api.changenow.io/uploads/btc_1_527dc9ec3c.svg'},
    {ticker: 'ETH', image: 'https://content-api.changenow.io/uploads/eth_f4ebb54ec0.svg'},
  ]);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount({...amount, [event.target.name]: event.target.value});
  };

  const handleCurrencyChange = (ticker: string, image: string, index: number) => {
    setSelectedCurrency((prevSelectedCurrency) => {
      const newSelectedCurrencies = [...prevSelectedCurrency];
      newSelectedCurrencies[index] = {ticker: ticker.toUpperCase(), image};
      return newSelectedCurrencies;
    });
  };

  const swapCurrency = () => {
    setAmount({currency1: amount.currency2, currency2: amount.currency1});
    setSelectedCurrency([selectedCurrency[1], selectedCurrency[0]]);
  };

  const {SwapButton} = buttons;

  return (
    <StyledCalculator>
      <h1>Crypto Exchange</h1>
      <p>Exchange fast and easy</p>
      <StyledContainer>
        <StyledExchangeContainer>
          <CurrencySelector
            value={amount.currency1}
            selectedCurrency={selectedCurrency[0]}
            onChange={handleAmountChange}
            handleCurrencyChange={handleCurrencyChange}
            name="currency1"
            index={0}
          />
          <SwapButton type="button" onClick={swapCurrency} />
          <CurrencySelector
            value={amount.currency2}
            selectedCurrency={selectedCurrency[1]}
            onChange={handleAmountChange}
            handleCurrencyChange={handleCurrencyChange}
            name="currency2"
            index={1}
          />
        </StyledExchangeContainer>
        <CryptoAdress />
      </StyledContainer>
    </StyledCalculator>
  );
};
