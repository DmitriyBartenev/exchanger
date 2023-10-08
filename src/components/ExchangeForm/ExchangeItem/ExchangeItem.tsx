import React, {useEffect, useRef} from 'react';

import {exchangeSelector} from '~/redux/features/selectors';
import {useAppSelector} from '~/redux/hooks';

import {useInputChange, useToggleState} from '~/shared/hooks';
import {ExchangeInput, SelectCurrencyButton} from '~/shared/ui';

import type {AvailableCurrenciesResponse} from '~/types/IExchangeRequests';

import {StyledExchangeItem, StyledExchangeItemBox} from '../styles';
import {Dropdown} from './Dropdown';
import {Error} from './Error';

interface ExchangeItemProps {
  handleCurrencyChange: (ticker: string, image: string, index: number) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedCurrency: {ticker: string; image: string};
  value: string | undefined;
  isLoadingInput: boolean;
  disabledInput: boolean;
  disabledButton: boolean;
  index: number;
  name: string;
  currencies: AvailableCurrenciesResponse[];
}

export const ExchangeItem: React.FC<ExchangeItemProps> = ({
  handleCurrencyChange,
  onChange,
  selectedCurrency,
  value,
  isLoadingInput,
  disabledInput,
  disabledButton,
  index,
  name,
  currencies,
}) => {
  const [searchValue, _, handleSearchValue] = useInputChange<string>('');
  const [showDropdown, setShowDropdown, toggleDropdown] = useToggleState(false);

  const {isError} = useAppSelector(exchangeSelector);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const onSelectCurrency = (ticker: string, image: string) => {
    handleCurrencyChange(ticker, image, index);
    toggleDropdown();
  };

  useEffect(() => {
    if (showDropdown) {
      inputRef.current?.focus();
    }
  }, [showDropdown]);

  return (
    <StyledExchangeItemBox>
      <StyledExchangeItem $showDropdown={showDropdown} $isError={isError}>
        <ExchangeInput
          value={showDropdown ? searchValue : value ?? ''}
          onChange={showDropdown ? handleSearchValue : onChange}
          placeholder={showDropdown ? 'Search' : ''}
          name={name}
          disabled={showDropdown ? false : disabledInput}
          inputRef={inputRef}
          isLoading={isLoadingInput && !showDropdown}
        />

        <SelectCurrencyButton
          image={selectedCurrency?.image}
          ticker={selectedCurrency?.ticker?.toUpperCase()}
          onClick={toggleDropdown}
          buttonRef={buttonRef}
          showDropdown={showDropdown}
          disabled={disabledButton}
        />
      </StyledExchangeItem>
      <Dropdown
        onSelectCurrency={onSelectCurrency}
        showDropdown={showDropdown}
        searchValue={searchValue}
        inputRef={inputRef}
        buttonRef={buttonRef}
        setShowDropdown={setShowDropdown}
        currencies={currencies}
      />
      <Error index={index} />
    </StyledExchangeItemBox>
  );
};
