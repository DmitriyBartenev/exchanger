'use client';

import React, {useEffect, useState} from 'react';

import {useAppDispatch, useAppSelector} from '~/lib/redux/hooks';
import {rootSelector} from '~/lib/redux/slices/selectors';
import {
  getAvailableCurrencies,
  getEstimatedExchangeAmount,
  getMinimalExchangeAmount,
} from '~/lib/redux/slices/thunks';

import {SwapButton} from '~/ui';

import {StyledCalculator, StyledCalculatorForm, StyledExchangeContainer} from './styles';

import CryptoAdress from './CryptoAdress';
import CurrencySelector from './CurrencySelector';

export const Calculator: React.FC = () => {
  const [amount, setAmount] = useState<{
    currency1: string | undefined;
    currency2: string | undefined;
  }>({
    currency1: '',
    currency2: '',
  });
  const [selectedCurrency, setSelectedCurrency] = useState<{ticker: string; image: string}[]>([
    {ticker: 'btc', image: 'https://content-api.changenow.io/uploads/btc_1_527dc9ec3c.svg'},
    {ticker: 'eth', image: 'https://content-api.changenow.io/uploads/eth_f4ebb54ec0.svg'},
  ]);
  const [exchangeError, setExchangeError] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const {availableCurrencies, estimatedExchangeAmount, minimalExchangeAmount} =
    useAppSelector(rootSelector);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setAmount((prevAmount) => ({
      ...prevAmount,
      [name]: value,
    }));
  };

  const handleCurrencyChange = (ticker: string, image: string, index: number) => {
    setSelectedCurrency((prevSelectedCurrency) => {
      const newSelectedCurrencies = [...prevSelectedCurrency];
      newSelectedCurrencies[index] = {ticker, image};
      return newSelectedCurrencies;
    });
  };

  const swapCurrency = () => {
    setAmount((prevAmount) => ({
      currency1: prevAmount.currency2,
      currency2: prevAmount.currency1,
    }));
    setSelectedCurrency((prevSelectedCurrency) => [
      prevSelectedCurrency[1],
      prevSelectedCurrency[0],
    ]);
  };

  const onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (Number(amount.currency1) < Number(minimalExchangeAmount.minimalExchangeAmount)) {
      setAmount((prev) => ({
        ...prev,
        currency2: '-',
      }));
      setExchangeError(true);
    } else {
      setExchangeError(false);
    }
  };

  useEffect(() => {
    dispatch(getAvailableCurrencies());
  }, []);

  useEffect(() => {
    if (selectedCurrency[0]?.ticker && selectedCurrency[1]?.ticker) {
      dispatch(
        getMinimalExchangeAmount({
          from: selectedCurrency[0]?.ticker,
          to: selectedCurrency[1]?.ticker,
        }),
      );
    }
  }, [dispatch, selectedCurrency]);

  useEffect(() => {
    if (minimalExchangeAmount) {
      setAmount((prev) => ({
        ...prev,
        currency1: minimalExchangeAmount.minimalExchangeAmount?.toString(),
      }));
    }
  }, [minimalExchangeAmount]);

  useEffect(() => {
    if (amount.currency1 && minimalExchangeAmount) {
      dispatch(
        getEstimatedExchangeAmount({
          send_amount: amount.currency1,
          from: selectedCurrency[0]?.ticker,
          to: selectedCurrency[1]?.ticker,
        }),
      );
    }
  }, [dispatch, amount.currency1, selectedCurrency, minimalExchangeAmount]);

  useEffect(() => {
    if (amount.currency1 !== '' && minimalExchangeAmount && estimatedExchangeAmount) {
      setAmount((prev) => ({
        ...prev,
        currency2: estimatedExchangeAmount.estimatedAmount?.toString(),
      }));
      setExchangeError(false);
    }
  }, [amount.currency1, minimalExchangeAmount, estimatedExchangeAmount]);

  return (
    <StyledCalculator>
      <h1>Crypto Exchange</h1>
      <p>Exchange fast and easy</p>
      <StyledCalculatorForm onSubmit={onSubmit}>
        <StyledExchangeContainer>
          <CurrencySelector
            value={amount?.currency1}
            selectedCurrency={selectedCurrency[0]}
            onChange={handleAmountChange}
            handleCurrencyChange={handleCurrencyChange}
            name="currency1"
            index={0}
            currencies={availableCurrencies}
            isLoading={minimalExchangeAmount.status}
          />
          <SwapButton type="button" onClick={swapCurrency} />
          <CurrencySelector
            value={amount?.currency2}
            selectedCurrency={selectedCurrency[1]}
            onChange={handleAmountChange}
            handleCurrencyChange={handleCurrencyChange}
            name="currency2"
            index={1}
            currencies={availableCurrencies}
            isLoading={estimatedExchangeAmount.status}
            exchangeError={exchangeError}
          />
        </StyledExchangeContainer>
        <CryptoAdress estimatedExchangeAmountError={estimatedExchangeAmount.error} />
      </StyledCalculatorForm>
    </StyledCalculator>
  );
};
