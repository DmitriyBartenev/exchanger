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
    {ticker: 'btc', image: 'https://content-api.changenow.io/uploads/btc_1_527dc9ec3c.svg'},
    {ticker: 'eth', image: 'https://content-api.changenow.io/uploads/eth_f4ebb54ec0.svg'},
  ]);

  const {SwapButton} = buttons;

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount({...amount, [event.target.name]: event.target.value});
  };

  const handleCurrencyChange = (ticker: string, image: string, index: number) => {
    setSelectedCurrency((prevSelectedCurrency) => {
      const newSelectedCurrencies = [...prevSelectedCurrency];
      newSelectedCurrencies[index] = {ticker, image};
      return newSelectedCurrencies;
    });
  };

  const swapCurrency = () => {
    setSelectedCurrency([selectedCurrency[1], selectedCurrency[0]]);
  };

  const dispatch = useAppDispatch();
  const currencies = useAppSelector((state) => state.availableCurrencies.currency);
  const currenciesLoadingStatus = useAppSelector((state) => state.availableCurrencies.status);
  const minimalExchangeAmount = useAppSelector(
    (state) => state.minimalExchangeAmount.minimalExchangeAmount,
  )?.toString();

  useEffect(() => {
    dispatch(getAvailableCurrencies());
  }, [dispatch]);

  useEffect(() => {
    if (currencies.length > 0 && selectedCurrency[0]?.ticker && selectedCurrency[1]?.ticker) {
      dispatch(
        getMinimalExchangeAmount({
          from: selectedCurrency[0]?.ticker,
          to: selectedCurrency[1]?.ticker,
        }),
      );
    }
  }, [dispatch, currencies, selectedCurrency]);

  useEffect(() => {
    if (currencies.length > 0 && minimalExchangeAmount) {
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
