import Image from 'next/image';
import React, {useState} from 'react';

import {useAppSelector} from '~/lib/redux/hooks';
import {AvailableCurrenciesResponse} from '~/lib/redux/slices/types';

import {ArrowIcon, CloseButton, ExchangeInput, SelectCurrencyButton} from '~/app/shared/ui';

import {StyledCurrencyDropdown, StyledCurrencySelector} from './styles';

interface CurrencySelectorProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  selectedCurrency: {ticker: string; image: string};
  handleCurrencyChange: (ticker: string, image: string, index: number) => void;
  index: number;
  currencies: AvailableCurrenciesResponse[];
  exchangeError?: boolean;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  onChange,
  value,
  name,
  selectedCurrency,
  handleCurrencyChange,
  index,
  currencies,
  exchangeError,
}) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const availableCurrenciesStatus = useAppSelector((state) => state.availableCurrencies.status);

  const onSelectCurrency = (ticker: string, image: string) => {
    handleCurrencyChange(ticker, image, index);
    setShowDropdown((prev) => !prev);
  };

  return (
    <StyledCurrencySelector>
      <ExchangeInput showDropdown={showDropdown} value={value} onChange={onChange} name={name} />

      {showDropdown ? (
        <CloseButton onClick={() => setShowDropdown((prev) => !prev)} />
      ) : (
        <SelectCurrencyButton
          icon={<ArrowIcon />}
          ticker={selectedCurrency.ticker.toUpperCase()}
          image={selectedCurrency.image}
          onClick={() => setShowDropdown((prev) => !prev)}
          loadingStatus={availableCurrenciesStatus}
        />
      )}

      {showDropdown && (
        <StyledCurrencyDropdown>
          {currencies.map((curr) => (
            <li key={curr.ticker} onClick={() => onSelectCurrency(curr.ticker, curr.image)}>
              {curr.image && <Image src={curr.image} alt={curr.ticker} width={20} height={20} />}
              {curr.ticker.toUpperCase()}
              <span>{curr.name}</span>
            </li>
          ))}
        </StyledCurrencyDropdown>
      )}
      {exchangeError && <span>You cannot exchange less than minimum in the left field</span>}
    </StyledCurrencySelector>
  );
};

export default CurrencySelector;
