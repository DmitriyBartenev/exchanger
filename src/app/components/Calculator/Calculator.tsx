'use client';

import React, {useEffect, useState} from 'react';
import {Spinner} from '~/app/shared/ui/spinners/Spinner';
import {useAppDispatch, useAppSelector} from '~/lib/redux/hooks';
import {getAvailableCurrencies, getMinimalExchangeAmount} from '~/lib/redux/slices/thunks';
import {buttons} from '~/ui';

import CryptoAdress from './CryptoAdress';
import CurrencySelector from './CurrencySelector';
import {StyledCalculator, StyledContainer, StyledExchangeContainer} from './styles';

export const Calculator: React.FC = () => {
  const [amount, setAmount] = useState<{currency1: string; currency2: string}>({
    currency1: '',
    currency2: '',
  });
  const [selectedCurrency, setSelectedCurrency] = useState<{ticker: string; image: string}[]>([
    {ticker: '', image: ''},
    {ticker: '', image: ''},
  ]);

  const {SwapButton} = buttons;

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

  const dispatch = useAppDispatch();
  const currencies = useAppSelector((state) => state.currency.currency);
  const currenciesLoadingStatus = useAppSelector((state) => state.currency.status);
  const minimalExchangeAmount = useAppSelector(
    (state) => state.minimalExchangeAmount.minimalExchangeAmount,
  ).toString();

  useEffect(() => {
    dispatch(getAvailableCurrencies());
    dispatch(getMinimalExchangeAmount());
  }, [dispatch]);

  useEffect(() => {
    if (currencies.length > 0 && minimalExchangeAmount) {
      setSelectedCurrency([
        {ticker: currencies[0]?.ticker.toUpperCase(), image: currencies[0]?.image},
        {ticker: currencies[1]?.ticker.toUpperCase(), image: currencies[1]?.image},
      ]);

      setAmount((prev) => ({
        ...prev,
        currency1: minimalExchangeAmount,
      }));
    }
  }, [currencies, minimalExchangeAmount]);

  if (currenciesLoadingStatus === 'loading') {
    return <Spinner />;
  }

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
            currencies={currencies}
          />
          <SwapButton type="button" onClick={swapCurrency} />
          <CurrencySelector
            value={amount.currency2}
            selectedCurrency={selectedCurrency[1]}
            onChange={handleAmountChange}
            handleCurrencyChange={handleCurrencyChange}
            name="currency2"
            index={1}
            currencies={currencies}
          />
        </StyledExchangeContainer>
        <CryptoAdress />
      </StyledContainer>
    </StyledCalculator>
  );
};
