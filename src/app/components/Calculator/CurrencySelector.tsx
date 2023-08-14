import Image from 'next/image';
import React, {useState} from 'react';

import {useAppSelector} from '~/lib/redux/hooks';
import {rootSelector} from '~/lib/redux/slices/selectors';
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
  value: string | undefined;
  isLoading: boolean;
  index: number;
  name: string;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
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

  const {availableCurrencies} = useAppSelector(rootSelector);

  const onSelectCurrency = (ticker: string, image: string) => {
    handleCurrencyChange(ticker, image, index);
    setShowDropdown((prev) => !prev);
  };

  return (
    <StyledCurrencySelector>
      {isLoading ? (
        <ExchangeAmountSpinner />
      ) : (
        <ExchangeInput
          showDropdown={showDropdown}
          value={value ?? ''}
          onChange={onChange}
          name={name}
          disabled={index === 1}
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
          availableCurrenciesFetchStatus={availableCurrencies.status}
        />
      )}
      {showDropdown && (
        <StyledCurrencyDropdown>
          {availableCurrencies.availableCurrencies.map((curr) => (
            <li key={curr.ticker} onClick={() => onSelectCurrency(curr.ticker, curr.image)}>
              {curr.image && <Image src={curr.image} alt={curr.ticker} width={20} height={20} />}
              {curr.ticker.toUpperCase()}
              <span>{curr.name}</span>
            </li>
          ))}
        </StyledCurrencyDropdown>
      )}
      {exchangeError && <span>{exchangeError.message ?? exchangeError.error}</span>}
    </StyledCurrencySelector>
  );
};

export default CurrencySelector;
