'use client';

import React, {useEffect, useState} from 'react';
import {ICurrency} from '~/app/types';

import {useAppDispatch, useAppSelector} from '~/lib/redux/hooks';
import {rootSelector} from '~/lib/redux/slices/selectors';
import {
  getAvailableCurrencies,
  getEstimatedExchangeAmount,
  getMinimalExchangeAmount,
} from '~/lib/redux/slices/thunks';

import {SwapButton} from '~/app/shared/ui';

import {StyledExchangeContainer} from './styles';

import {CurrencySelector} from './CurrencySelector';

export const ExchangeCurrencies = () => {
  const [amount, setAmount] = useState<{
    currency1: string | undefined;
    currency2: string | undefined;
  }>({
    currency1: '',
    currency2: '',
  });
  const [selectedCurrency, setSelectedCurrency] = useState<ICurrency[]>([
    {ticker: 'btc', image: 'https://content-api.changenow.io/uploads/btc_1_527dc9ec3c.svg'},
    {ticker: 'eth', image: 'https://content-api.changenow.io/uploads/eth_f4ebb54ec0.svg'},
  ]);

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
    setSelectedCurrency((prevSelectedCurrency) => [
      prevSelectedCurrency[1],
      prevSelectedCurrency[0],
    ]);
  };

  const dispatch = useAppDispatch();

  const {estimatedExchangeAmount, minimalExchangeAmount} = useAppSelector(rootSelector);

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
  }, [dispatch, selectedCurrency[0].ticker, selectedCurrency[1].ticker]);

  useEffect(() => {
    if (minimalExchangeAmount.minAmount) {
      setAmount((prev) => ({
        ...prev,
        currency1: String(minimalExchangeAmount.minAmount),
      }));
    }
  }, [minimalExchangeAmount.minAmount]);

  useEffect(() => {
    if (amount.currency1) {
      dispatch(
        getEstimatedExchangeAmount({
          send_amount: amount.currency1,
          from: selectedCurrency[0]?.ticker,
          to: selectedCurrency[1]?.ticker,
        }),
      );
    }
  }, [dispatch, amount.currency1]);

  useEffect(() => {
    if (amount.currency1 && estimatedExchangeAmount.estimatedAmount) {
      setAmount((prev) => ({
        ...prev,
        currency2: String(estimatedExchangeAmount.estimatedAmount),
      }));
    }
    if (estimatedExchangeAmount.error) {
      setAmount((prev) => ({
        ...prev,
        currency2: '-',
      }));
    }
  }, [estimatedExchangeAmount.estimatedAmount, estimatedExchangeAmount.error]);

  return (
    <StyledExchangeContainer>
      <CurrencySelector
        value={amount?.currency1}
        selectedCurrency={selectedCurrency[0]}
        onChange={handleAmountChange}
        handleCurrencyChange={handleCurrencyChange}
        name="currency1"
        isLoading={minimalExchangeAmount.status === 'loading'}
        index={selectedCurrency.indexOf(selectedCurrency[0])}
        disabled={!!minimalExchangeAmount.error}
      />

      <SwapButton onClick={swapCurrency} />

      <CurrencySelector
        value={amount?.currency2}
        selectedCurrency={selectedCurrency[1]}
        onChange={handleAmountChange}
        handleCurrencyChange={handleCurrencyChange}
        name="currency2"
        isLoading={estimatedExchangeAmount.status === 'loading'}
        index={selectedCurrency.indexOf(selectedCurrency[1])}
        disabled={true}
      />
    </StyledExchangeContainer>
  );
};