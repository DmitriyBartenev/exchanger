'use client';

import debounce from 'lodash.debounce';
import React, {useEffect, useRef, useState} from 'react';
import toast, {Toaster} from 'react-hot-toast';

import {exchangeSelector} from '~/redux/features/selectors';
import {getEstimatedExchangeAmount, getMinimalExchangeAmount} from '~/redux/features/thunks';
import {useAppDispatch, useAppSelector} from '~/redux/hooks';

import {formatValue} from '~/utils/formatValue';

import {useCurrencyChange, useInputChange} from '~/shared/hooks';
import {SwapButton} from '~/shared/ui';

import {StyledExchangeContainer, StyledExchangeForm} from './styles';

import type {IAmountToChange} from '~/types/ICalculator';
import type {AvailableCurrenciesResponse} from '~/types/IExchangeRequests';

import {Address} from './Address';
import {ExchangeItem} from './ExchangeItem/ExchangeItem';

interface ExchangeFormProps {
  currencies: AvailableCurrenciesResponse[];
}

export const ExchangeForm: React.FC<ExchangeFormProps> = ({currencies}) => {
  const [amount, setAmount, handleAmountChange] = useInputChange<IAmountToChange>({
    from: '',
    to: '',
  });
  const [ethereumValue, setEthereumValue, handleEthereumValue] = useInputChange<string>('');
  const [selectedCurrency, setSelectedCurrency, handleCurrencyChange, swapCurrency] =
    useCurrencyChange();
  const [toSelectorLoading, setToSelectorLoading] = useState<boolean>(false);
  const [isCalcLoading, setCalcLoading] = useState<boolean>(false);

  const combinedCalcLoading = toSelectorLoading || isCalcLoading;

  const debouncedGetEstimatedExchangeAmount = useRef(
    debounce((from, to, sendAmount) => {
      dispatch(getEstimatedExchangeAmount({send_amount: sendAmount, from, to}));
    }, 500),
  );

  const onSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCalcLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setCalcLoading(false);
    setEthereumValue('');

    toast.success(
      `Successfully exchanged ${formatValue(
        amount.from,
      )} ${selectedCurrency[0].ticker.toUpperCase()} to ${formatValue(
        amount.to,
      )} ${selectedCurrency[1].ticker.toUpperCase()}`,
      {
        position: 'bottom-left',
        icon: '👏',
        duration: 2000,
      },
    );
  };

  const dispatch = useAppDispatch();

  const {estimatedExchangeAmount, minimalExchangeAmount, isError} =
    useAppSelector(exchangeSelector);

  // Set Available Currencies
  useEffect(() => {
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
  }, [currencies]);

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
    <StyledExchangeForm onSubmit={onSubmit}>
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
          currencies={currencies}
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
          currencies={currencies}
        />
      </StyledExchangeContainer>
      <Address
        disabledButton={isError || combinedCalcLoading || amount.to === '-'}
        disabledInput={combinedCalcLoading}
        label="Your Ethereum address"
        value={ethereumValue}
        onChange={handleEthereumValue}
        name="ethereum-address"
      />
      <Toaster />
    </StyledExchangeForm>
  );
};
