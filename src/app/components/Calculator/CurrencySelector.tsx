import React, {useEffect, useState} from 'react';
import {buttons, icons, inputs} from '~/app/shared/ui';
import {CloseButton} from '~/app/shared/ui/buttons/CloseButton';
import {Spinner} from '~/app/shared/ui/spinners/Spinner';
import {useAppDispatch, useAppSelector} from '~/lib/redux/hooks';
import {getAvailableCurrencies} from '~/lib/redux/slices/thunks';

import {StyledCurrencyDropdown, StyledCurrencySelector} from './styles';

interface CurrencySelectorProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  selectedCurrency: {ticker: string; image: string};
  handleCurrencyChange: (ticker: string, image: string, index: number) => void;
  index: number;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  onChange,
  value,
  name,
  selectedCurrency,
  handleCurrencyChange,
  index,
}) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const {SelectCurrencyButton} = buttons;
  const {ExchangeInput} = inputs;
  const {ArrowIcon} = icons;

  const dispatch = useAppDispatch();
  const currencyData = useAppSelector((state) => state.currency.currency);
  const currencyFetchStatus = useAppSelector((state) => state.currency.status);

  useEffect(() => {
    dispatch(getAvailableCurrencies());
  }, []);

  const onSelectCurrency = (ticker: string, image: string) => {
    handleCurrencyChange(ticker, image, index);
    setShowDropdown((prev) => !prev);
  };

  if (currencyFetchStatus === 'loading') {
    return <Spinner />;
  }

  return (
    <StyledCurrencySelector>
      <ExchangeInput showDropdown={showDropdown} value={value} onChange={onChange} name={name} />
      {showDropdown ? (
        <CloseButton onClick={() => setShowDropdown((prev) => !prev)} />
      ) : (
        <SelectCurrencyButton
          icon={<ArrowIcon />}
          ticker={selectedCurrency.ticker}
          image={selectedCurrency.image}
          onClick={() => setShowDropdown((prev) => !prev)}
        />
      )}
      {showDropdown && (
        <StyledCurrencyDropdown>
          {currencyData.map((curr) => (
            <li key={curr.ticker} onClick={() => onSelectCurrency(curr.ticker, curr.image)}>
              <img src={curr.image} alt={curr.ticker} width={20} height={20} />
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
