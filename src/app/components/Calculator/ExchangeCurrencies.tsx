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

import {CalculatorInput, ExchangeButton, SwapButton} from '~/ui';

import {StyledAddressContainer, StyledAdressSubmit, StyledExchangeContainer} from './styles';

import {CurrencySelector} from './CurrencySelector';

const initialCurrency = [
  {ticker: 'btc', image: 'https://content-api.changenow.io/uploads/btc_1_527dc9ec3c.svg'},
  {ticker: 'eth', image: 'https://content-api.changenow.io/uploads/eth_f4ebb54ec0.svg'},
];

export const ExchangeCurrencies = () => {
  const [amount, setAmount] = useState<IAmountToChange>({
    from: '',
    to: '',
  });
  const [selectedCurrency, setSelectedCurrency] = useState<ICurrency[]>(initialCurrency);
  const [toSelectorLoading, setToSelectorLoading] = useState<boolean>(false);

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

  const {estimatedExchangeAmount, minimalExchangeAmount, isLoading, isError} =
    useAppSelector(rootSelector);

  // Get Available Currencies
  useEffect(() => {
    dispatch(getAvailableCurrencies());
  }, [dispatch]);

  // Get Minimal Exchange Amount
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

  // Set Minimal Exchange Amount
  useEffect(() => {
    if (minimalExchangeAmount.minAmount) {
      setAmount((prev) => ({
        ...prev,
        from: String(minimalExchangeAmount.minAmount),
      }));
    }
  }, [minimalExchangeAmount.minAmount]);

  // Get Estimated Exchange Amount
  useEffect(() => {
    if (amount.from) {
      setToSelectorLoading(true);

      debouncedGetEstimatedExchangeAmount.current(
        selectedCurrency[0].ticker,
        selectedCurrency[1].ticker,
        amount.from,
      );
    }
  }, [amount.from]);

  // Set Estimated Exchange Amount
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

    setToSelectorLoading(false);
  }, [estimatedExchangeAmount.estimatedAmount, estimatedExchangeAmount.error]);

  return (
    <>
      <StyledExchangeContainer>
        <CurrencySelector
          value={amount?.from}
          onChange={handleAmountChange}
          selectedCurrency={selectedCurrency[0]}
          handleCurrencyChange={handleCurrencyChange}
          name="from"
          index={selectedCurrency.indexOf(selectedCurrency[0])}
          isLoadingInput={minimalExchangeAmount.status === 'loading'}
          disabledInput={!!minimalExchangeAmount.error}
          disabledButton={isLoading || toSelectorLoading}
        />

        <SwapButton onClick={swapCurrency} disabled={isLoading || toSelectorLoading} />

        <CurrencySelector
          value={amount?.to}
          onChange={handleAmountChange}
          selectedCurrency={selectedCurrency[1]}
          handleCurrencyChange={handleCurrencyChange}
          name="to"
          index={selectedCurrency.indexOf(selectedCurrency[1])}
          isLoadingInput={toSelectorLoading || minimalExchangeAmount.status === 'loading'}
          disabledInput={true}
          disabledButton={isLoading || toSelectorLoading}
        />
      </StyledExchangeContainer>
      <StyledAddressContainer>
        <p>Your Ethereum address</p>
        <StyledAdressSubmit>
          <CalculatorInput />
          <ExchangeButton
            title="Exchange"
            type="submit"
            disabled={isError || isLoading || toSelectorLoading}
          />
        </StyledAdressSubmit>
      </StyledAddressContainer>
    </>
  );
};
