import Image from 'next/image';
import React, {useState} from 'react';
import {buttons, icons, inputs} from '~/app/shared/ui';
import {CloseButton} from '~/app/shared/ui/buttons/CloseButton';
import {AvailableCurrenciesResponse} from '~/lib/redux/slices/types';

import {StyledCurrencyDropdown, StyledCurrencySelector} from './styles';

interface CurrencySelectorProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  selectedCurrency: {ticker: string; image: string};
  handleCurrencyChange: (ticker: string, image: string, index: number) => void;
  index: number;
  currencies: AvailableCurrenciesResponse[];
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  onChange,
  value,
  name,
  selectedCurrency,
  handleCurrencyChange,
  index,
  currencies,
}) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const {SelectCurrencyButton} = buttons;
  const {ExchangeInput} = inputs;
  const {ArrowIcon} = icons;

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
    </StyledCurrencySelector>
  );
};

export default CurrencySelector;
