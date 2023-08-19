import Image from 'next/image';
import React, {createRef, useEffect, useState} from 'react';

import {useAppSelector} from '~/lib/redux/hooks';
import {rootSelector} from '~/lib/redux/slices/selectors';
import {AvailableCurrenciesResponse} from '~/lib/redux/slices/types';

import {
  ArrowIcon,
  CloseButton,
  ExchangeAmountSpinner,
  ExchangeInput,
  SelectCurrencyButton,
} from '~/app/shared/ui';

import {
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
  error: boolean;
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
  error,
  index,
  name,
}) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const inputRef = createRef<HTMLInputElement>();

  const {availableCurrencies} = useAppSelector(rootSelector);

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
    <StyledCurrencySelector>
      <Exchange
        showDropdown={showDropdown}
        value={value ?? ''}
        onChange={onChange}
        name={name}
        disabled={disabled}
        isLoading={isLoading}
        searchValue={searchValue}
        onSearchCurrencies={onSearchCurrencies}
        error={error}
        inputRef={inputRef}
      />
      <SelectCurrency
        toggleDropdown={toggleDropdown}
        selectedCurrency={selectedCurrency}
        showDropdown={showDropdown}
      />
      <CurrencyDropdown
        onSelectCurrency={onSelectCurrency}
        showDropdown={showDropdown}
        filteredCurrencies={filteredCurrencies}
      />
      <ExchangeError error={error} />
    </StyledCurrencySelector>
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
  error: boolean;
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
    error,
    inputRef,
  } = props;

  if (isLoading) return <ExchangeAmountSpinner />;

  return (
    <ExchangeInput
      showDropdown={showDropdown}
      value={showDropdown ? searchValue : value}
      onChange={showDropdown ? onSearchCurrencies : onChange}
      name={name}
      disabled={showDropdown ? false : disabled}
      error={error}
      inputRef={inputRef}
    />
  );
}

function SelectCurrency(props: {
  selectedCurrency: {
    ticker: string;
    image: string;
  };
  showDropdown: boolean;
  toggleDropdown: () => void;
}) {
  const {selectedCurrency, toggleDropdown, showDropdown} = props;

  if (showDropdown) return <CloseButton onClick={toggleDropdown} />;

  return (
    <SelectCurrencyButton
      icon={<ArrowIcon />}
      image={selectedCurrency.image}
      ticker={selectedCurrency.ticker.toUpperCase()}
      onClick={toggleDropdown}
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

function ExchangeError(props: {error: boolean}) {
  const {error} = props;
  const {estimatedExchangeAmount, minimalExchangeAmount} = useAppSelector(rootSelector);

  if (error && estimatedExchangeAmount.error)
    return (
      <StyledExchangeError>
        {estimatedExchangeAmount.error.message ?? estimatedExchangeAmount.error.error}
      </StyledExchangeError>
    );
  if (error && minimalExchangeAmount.error)
    return <StyledExchangeError>{minimalExchangeAmount.error.error}</StyledExchangeError>;

  return null;
}
