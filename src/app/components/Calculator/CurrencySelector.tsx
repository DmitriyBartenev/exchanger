import Image from 'next/image';
import React, {useState} from 'react';

import {useAppSelector} from '~/lib/redux/hooks';
import {rootSelector} from '~/lib/redux/slices/selectors';
import {AvailableCurrenciesResponse, EstimatedExchangeAmountError} from '~/lib/redux/slices/types';

import {
  ArrowIcon,
  CloseButton,
  ExchangeAmountSpinner,
  ExchangeInput,
  SelectCurrencyButton,
} from '~/app/shared/ui';

import {StyledCurrencyDropdown, StyledCurrencySelector} from './styles';

interface CurrencySelectorProps {
  handleCurrencyChange: (ticker: string, image: string, index: number) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  exchangeError?: EstimatedExchangeAmountError | null;
  selectedCurrency: {ticker: string; image: string};
  value: string | undefined;
  isLoading: boolean;
  index: number;
  name: string;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  handleCurrencyChange,
  onChange,
  exchangeError,
  selectedCurrency,
  value,
  isLoading,
  index,
  name,
}) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

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

  return (
    <StyledCurrencySelector>
      <Exchange
        showDropdown={showDropdown}
        value={value ?? ''}
        onChange={onChange}
        name={name}
        disabled={index === 1}
        isLoading={isLoading}
        searchValue={searchValue}
        onSearchCurrencies={onSearchCurrencies}
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
      <ExchangeError exchangeError={exchangeError} />
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
  } = props;

  if (isLoading) return <ExchangeAmountSpinner />;

  return (
    <ExchangeInput
      showDropdown={showDropdown}
      value={showDropdown ? searchValue : value}
      onChange={showDropdown ? onSearchCurrencies : onChange}
      name={name}
      disabled={showDropdown ? false : disabled}
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

  const {availableCurrencies} = useAppSelector(rootSelector);

  if (showDropdown) return <CloseButton onClick={toggleDropdown} />;

  return (
    <SelectCurrencyButton
      icon={<ArrowIcon />}
      image={selectedCurrency.image}
      ticker={selectedCurrency.ticker.toUpperCase()}
      onClick={toggleDropdown}
      status={availableCurrencies.status}
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
        {filteredCurrencies.map((curr) => (
          <li key={curr.ticker} onClick={() => onSelectCurrency(curr.ticker, curr.image)}>
            {curr.image && <Image src={curr.image} alt={curr.ticker} width={20} height={20} />}
            {curr.ticker.toUpperCase()}
            <span>{curr.name}</span>
          </li>
        ))}
      </StyledCurrencyDropdown>
    );
  }

  return null;
}

function ExchangeError(props: {
  exchangeError?: {
    error: string;
    message: string;
  } | null;
}) {
  const {exchangeError} = props;

  if (exchangeError) return <span>{exchangeError.message ?? exchangeError.error}</span>;

  return null;
}
