'use client';

import debounce from 'lodash.debounce';
import React, {useEffect, useRef, useState} from 'react';
import toast, {Toaster} from 'react-hot-toast';

import type {IAmountToChange, ICurrency} from '~/app/types';

import {useAppDispatch, useAppSelector} from '~/redux/hooks';
import {rootSelector} from '~/redux/slices/selectors';
import {
  getAvailableCurrencies,
  getEstimatedExchangeAmount,
  getMinimalExchangeAmount,
} from '~/redux/slices/thunks';

import {SwapButton} from '~/ui';

import {StyledCalculatorForm, StyledExchangeContainer} from './styles';

import {ExchangeAddress} from './ExchangeAddress';
import {ExchangeItem} from './ExchangeItem';

export const CalculatorForm = () => {
  const [amount, setAmount] = useState<IAmountToChange>({
    from: '',
    to: '',
  });
  const [ethereumAddressValue, setEthereumAddressValue] = useState<string>('');
  const [selectedCurrency, setSelectedCurrency] = useState<ICurrency[]>([]);
  const [toSelectorLoading, setToSelectorLoading] = useState<boolean>(false);
  const [isCalcLoading, setCalcLoading] = useState<boolean>(false);

  const combinedCalcLoading = toSelectorLoading || isCalcLoading;

  const handleEthereumAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEthereumAddressValue(event.target.value);
  };

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

  const onSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCalcLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setCalcLoading(false);
    toast.success('Successfully Exchanged', {
      position: 'bottom-left',
      icon: '👏',
      duration: 2000,
    });
  };

  const dispatch = useAppDispatch();

  const {availableCurrencies, estimatedExchangeAmount, minimalExchangeAmount, isError} =
    useAppSelector(rootSelector);

  // Get Available Currencies
  useEffect(() => {
    setCalcLoading(true);
    dispatch(getAvailableCurrencies());
  }, []);

  // Set Available Currencies
  useEffect(() => {
    const {availableCurrencies: currencies, error} = availableCurrencies;
    if (currencies) {
      setSelectedCurrency([
        {
          ticker: currencies[0]?.ticker,
          image: currencies[0]?.image,
        },
        {
          ticker: currencies[1]?.ticker,
          image: currencies[1]?.image,
        },
      ]);
    }
    if (error) {
      setCalcLoading(false);
      setSelectedCurrency([
        {ticker: '-', image: ''},
        {ticker: '-', image: ''},
      ]);
    }
  }, [availableCurrencies.availableCurrencies, availableCurrencies.error]);

  // Get Minimal Exchange Amount
  useEffect(() => {
    const isFieldsNotEmpty = selectedCurrency[0]?.ticker && selectedCurrency[1]?.ticker;
    const isFieldsValid =
      selectedCurrency[0]?.ticker !== '-' && selectedCurrency[1]?.ticker !== '-';

    if (isFieldsNotEmpty && isFieldsValid) {
      setCalcLoading(true);
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
    const {minAmount, error} = minimalExchangeAmount;

    if (minAmount) {
      setAmount((prev) => ({
        ...prev,
        from: String(minAmount),
      }));
    }
    if (error) {
      setAmount((prev) => ({
        from: '-',
        to: '-',
      }));
      setCalcLoading(false);
    }
  }, [minimalExchangeAmount.minAmount, minimalExchangeAmount.error]);

  // Get Estimated Exchange Amount
  useEffect(() => {
    const {error} = estimatedExchangeAmount;
    const isExchangeAmountValid =
      !error || Number(amount.from) >= Number(minimalExchangeAmount.minAmount);
    const isValidNumber = amount.from && /^[0-9]+(\.[0-9]+)?$/.test(amount.from);

    if (isValidNumber && isExchangeAmountValid) {
      setToSelectorLoading(true);

      debouncedGetEstimatedExchangeAmount.current(
        selectedCurrency[0].ticker,
        selectedCurrency[1].ticker,
        amount.from,
      );
    }

    if (!isValidNumber) {
      setAmount((prev) => ({
        ...prev,
        to: '-',
      }));
    }
  }, [amount.from]);

  // Set Estimated Exchange Amount
  useEffect(() => {
    const {estimatedAmount, error} = estimatedExchangeAmount;

    if (amount.from && estimatedAmount) {
      setAmount((prev) => ({
        ...prev,
        to: String(estimatedAmount),
      }));
      setCalcLoading(false);
      setToSelectorLoading(false);
    }
    if (error) {
      setAmount((prev) => ({
        ...prev,
        to: '-',
      }));
      setCalcLoading(false);
      setToSelectorLoading(false);
    }
  }, [estimatedExchangeAmount.estimatedAmount, estimatedExchangeAmount.error]);

  return (
    <StyledCalculatorForm onSubmit={onSubmit}>
      <StyledExchangeContainer>
        <ExchangeItem
          value={amount?.from}
          onChange={handleAmountChange}
          selectedCurrency={selectedCurrency[0]}
          handleCurrencyChange={handleCurrencyChange}
          name="from"
          index={selectedCurrency.indexOf(selectedCurrency[0])}
          isLoadingInput={isCalcLoading}
          disabledInput={!!minimalExchangeAmount.error}
          disabledButton={combinedCalcLoading}
        />

        <SwapButton onClick={swapCurrency} disabled={combinedCalcLoading} />

        <ExchangeItem
          value={amount?.to}
          onChange={handleAmountChange}
          selectedCurrency={selectedCurrency[1]}
          handleCurrencyChange={handleCurrencyChange}
          name="to"
          index={selectedCurrency.indexOf(selectedCurrency[1])}
          isLoadingInput={combinedCalcLoading}
          disabledInput={true}
          disabledButton={combinedCalcLoading}
        />
      </StyledExchangeContainer>
      <ExchangeAddress
        disabledButton={isError || combinedCalcLoading || amount.to === '-'}
        disabledInput={combinedCalcLoading}
        label="Your Ethereum address"
        value={ethereumAddressValue}
        onChange={handleEthereumAddressChange}
        name="ethereum-address"
      />
      <Toaster />
    </StyledCalculatorForm>
  );
};
