import Image from 'next/image';
import React, {useState} from 'react';

import {AvailableCurrenciesState} from '~/lib/redux/slices/availableCurrenciesSlice';
import {EstimatedExchangeAmountError} from '~/lib/redux/slices/types';

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
  isLoading: 'idle' | 'loading' | 'failed';
  currencies: AvailableCurrenciesState;
  value: string | undefined;
  disabled?: boolean;
  index: number;
  name: string;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  handleCurrencyChange,
  onChange,
  exchangeError,
  selectedCurrency,
  isLoading,
  currencies,
  value,
  disabled,
  index,
  name,
}) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const onSelectCurrency = (ticker: string, image: string) => {
    handleCurrencyChange(ticker, image, index);
    setShowDropdown((prev) => !prev);
  };

  return (
    <StyledCurrencySelector>
      {isLoading === 'loading' ? (
        <ExchangeAmountSpinner />
      ) : (
        <ExchangeInput
          showDropdown={showDropdown}
          value={value ?? ''}
          onChange={onChange}
          name={name}
          disabled={disabled}
        />
      )}
      {showDropdown ? (
        <CloseButton onClick={() => setShowDropdown((prev) => !prev)} />
      ) : (
        <SelectCurrencyButton
          icon={<ArrowIcon />}
          ticker={selectedCurrency.ticker.toUpperCase()}
          image={selectedCurrency.image}
          onClick={() => setShowDropdown((prev) => !prev)}
          availableCurrenciesFetchStatus={currencies.status}
        />
      )}
      {showDropdown && (
        <StyledCurrencyDropdown>
          {currencies.availableCurrencies.map((curr) => (
            <li key={curr.ticker} onClick={() => onSelectCurrency(curr.ticker, curr.image)}>
              {curr.image && <Image src={curr.image} alt={curr.ticker} width={20} height={20} />}
              {curr.ticker.toUpperCase()}
              <span>{curr.name}</span>
            </li>
          ))}
        </StyledCurrencyDropdown>
      )}
      {exchangeError && <span>{exchangeError.message}</span>}
    </StyledCurrencySelector>
  );
};

export default CurrencySelector;
