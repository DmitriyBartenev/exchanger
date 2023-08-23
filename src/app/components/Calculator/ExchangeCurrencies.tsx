'use client';

import debounce from 'lodash.debounce';
import React, {useEffect, useRef, useState} from 'react';

import {IAmountToChange, ICurrency} from '~/app/types';

import {useAppDispatch, useAppSelector} from '~/redux/hooks';
import {rootSelector} from '~/redux/slices/selectors';
import {
  getAvailableCurrencies,
  getEstimatedExchangeAmount,
  getMinimalExchangeAmount,
} from '~/redux/slices/thunks';

import {SwapButton} from '~/ui';

import {StyledExchangeContainer} from './styles';

import {CurrencySelector} from './CurrencySelector';

export const ExchangeCurrencies = () => {
  const [amount, setAmount] = useState<IAmountToChange>({
    from: '',
    to: '',
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

  const debouncedGetEstimatedExchangeAmount = useRef(
    debounce((from, to, sendAmount) => {
      dispatch(getEstimatedExchangeAmount({send_amount: sendAmount, from, to}));
    }, 500),
  );

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
        from: String(minimalExchangeAmount.minAmount),
      }));
    }
  }, [minimalExchangeAmount.minAmount]);

  useEffect(() => {
    if (amount.from) {
      debouncedGetEstimatedExchangeAmount.current(
        selectedCurrency[0].ticker,
        selectedCurrency[1].ticker,
        amount.from,
      );
    }
  }, [amount.from]);

  useEffect(() => {
    if (amount.from && estimatedExchangeAmount.estimatedAmount) {
      setAmount((prev) => ({
        ...prev,
        to: String(estimatedExchangeAmount.estimatedAmount),
      }));
    }
    if (estimatedExchangeAmount.error) {
      setAmount((prev) => ({
        ...prev,
        to: '-',
      }));
    }
  }, [estimatedExchangeAmount.estimatedAmount, estimatedExchangeAmount.error]);

  return (
    <StyledExchangeContainer>
      <CurrencySelector
        value={amount?.from}
        selectedCurrency={selectedCurrency[0]}
        onChange={handleAmountChange}
        handleCurrencyChange={handleCurrencyChange}
        name="from"
        isLoading={minimalExchangeAmount.status === 'loading'}
        index={selectedCurrency.indexOf(selectedCurrency[0])}
        disabled={!!minimalExchangeAmount.error}
      />

      <SwapButton onClick={swapCurrency} />

      <CurrencySelector
        value={amount?.to}
        selectedCurrency={selectedCurrency[1]}
        onChange={handleAmountChange}
        handleCurrencyChange={handleCurrencyChange}
        name="to"
        isLoading={estimatedExchangeAmount.status === 'loading'}
        index={selectedCurrency.indexOf(selectedCurrency[1])}
        disabled={true}
      />
    </StyledExchangeContainer>
  );
};
