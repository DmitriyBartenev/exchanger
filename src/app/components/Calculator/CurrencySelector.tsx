import Image from 'next/image';
import React, {createRef, useEffect, useState} from 'react';

import {useAppSelector} from '~/redux/hooks';
import {rootSelector} from '~/redux/slices/selectors';
import {AvailableCurrenciesResponse} from '~/redux/slices/types';

import {ArrowIcon, ExchangeAmountSpinner, ExchangeInput, SelectCurrencyButton} from '~/ui';

import {
  StyledContainer,
  StyledCurrencyDropdown,
  StyledCurrencySelector,
  StyledExchangeError,
  StyledNotFoundMessage,
} from './styles';

interface CurrencySelectorProps {
  handleCurrencyChange: (ticker: string, image: string, index: number) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedCurrency: {ticker: string; image: string};
  value: string | undefined;
  isLoading: boolean;
  disabled: boolean;
  index: number;
  name: string;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  handleCurrencyChange,
  onChange,
  selectedCurrency,
  value,
  isLoading,
  disabled,
  index,
  name,
}) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const inputRef = createRef<HTMLInputElement>();

  const {availableCurrencies, isError} = useAppSelector(rootSelector);

  const filteredCurrencies = availableCurrencies.availableCurrencies.filter((currency) =>
    currency.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const onSearchCurrencies = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const onSelectCurrency = (ticker: string, image: string) => {
    handleCurrencyChange(ticker, image, index);
    setShowDropdown((prev) => !prev);
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  useEffect(() => {
    if (showDropdown) {
      inputRef.current?.focus();
    }
  }, [showDropdown]);

  return (
    <StyledContainer>
      <StyledCurrencySelector $showDropdown={showDropdown} $isError={isError}>
        <Exchange
          showDropdown={showDropdown}
          value={value ?? ''}
          onChange={onChange}
          name={name}
          disabled={disabled}
          isLoading={isLoading}
          searchValue={searchValue}
          onSearchCurrencies={onSearchCurrencies}
          inputRef={inputRef}
        />
        <SelectCurrencyButton
          icon={<ArrowIcon />}
          image={selectedCurrency.image}
          ticker={selectedCurrency.ticker.toUpperCase()}
          onClick={toggleDropdown}
          showDropdown={showDropdown}
        />
      </StyledCurrencySelector>
      <CurrencyDropdown
        onSelectCurrency={onSelectCurrency}
        showDropdown={showDropdown}
        filteredCurrencies={filteredCurrencies}
      />
      <ExchangeError index={index} />
    </StyledContainer>
  );
};

function Exchange(props: {
  showDropdown: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  disabled: boolean;
  isLoading: boolean;
  searchValue: string;
  onSearchCurrencies: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}) {
  const {
    name,
    onChange,
    showDropdown,
    value,
    disabled,
    isLoading,
    searchValue,
    onSearchCurrencies,
    inputRef,
  } = props;

  if (isLoading && !showDropdown) return <ExchangeAmountSpinner />;

  return (
    <ExchangeInput
      placeholder={showDropdown ? 'Search' : ''}
      value={showDropdown ? searchValue : value}
      onChange={showDropdown ? onSearchCurrencies : onChange}
      disabled={showDropdown ? false : disabled}
      name={name}
      inputRef={inputRef}
    />
  );
}

function CurrencyDropdown(props: {
  showDropdown: boolean;
  onSelectCurrency: (ticker: string, image: string) => void;
  filteredCurrencies: AvailableCurrenciesResponse[];
}) {
  const {showDropdown, onSelectCurrency, filteredCurrencies} = props;

  if (showDropdown) {
    return (
      <StyledCurrencyDropdown>
        {filteredCurrencies.length > 0 ? (
          filteredCurrencies.map((curr) => (
            <li key={curr.ticker} onClick={() => onSelectCurrency(curr.ticker, curr.image)}>
              {curr.image && <Image src={curr.image} alt={curr.ticker} width={20} height={20} />}
              {curr.ticker.toUpperCase()}
              <span>{curr.name}</span>
            </li>
          ))
        ) : (
          <StyledNotFoundMessage>No results found</StyledNotFoundMessage>
        )}
      </StyledCurrencyDropdown>
    );
  }

  return null;
}

function ExchangeError(props: {index: number}) {
  const {index} = props;
  const {estimatedExchangeAmount, minimalExchangeAmount} = useAppSelector(rootSelector);

  const errorToRender =
    minimalExchangeAmount.error?.error || estimatedExchangeAmount.error?.message;

  const renderError = (errorMessage: string) => (
    <StyledExchangeError>{errorMessage}</StyledExchangeError>
  );

  if (index === 1 && errorToRender) {
    return renderError(errorToRender);
  }

  return null;
}
