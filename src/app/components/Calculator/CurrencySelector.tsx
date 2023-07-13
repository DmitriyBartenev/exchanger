import React, {useEffect, useState} from 'react';
import {buttons, icons, inputs} from '~/app/shared/ui';
import {CloseButton} from '~/app/shared/ui/buttons/CloseButton';
import {useAppDispatch, useAppSelector} from '~/lib/redux/hooks';
import {getAvailableCurrencies} from '~/lib/redux/slices/thunks';

import {StyledCurrencyDropdown, StyledCurrencySelector} from './styles';

const currency = [
  {id: 1, title: 'BTC'},
  {id: 2, title: 'ETH'},
  {id: 3, title: 'MGF'},
  {id: 4, title: 'SFG'},
];

const CurrencySelector = () => {
  const [currentCurrency, setCurrentCurrency] = useState<string>(currency[0].title);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const {SelectCurrencyButton} = buttons;
  const {ExchangeInput} = inputs;
  const {ArrowIcon} = icons;

  const onSelectCurrency = (currency: string) => {
    setCurrentCurrency(currency);
    setShowDropdown((prev) => !prev);
  };

  const dispatch = useAppDispatch();

  const currencyData = useAppSelector((state) => state.currency.currency);

  useEffect(() => {
    dispatch(getAvailableCurrencies());
  }, []);

  return (
    <StyledCurrencySelector>
      <ExchangeInput showDropdown={showDropdown} />
      {showDropdown ? (
        <CloseButton onClick={() => setShowDropdown((prev) => !prev)} />
      ) : (
        <SelectCurrencyButton
          icon={<ArrowIcon />}
          title={currentCurrency}
          onClick={() => setShowDropdown((prev) => !prev)}
        />
      )}
      {showDropdown && (
        <StyledCurrencyDropdown>
          {currency.map((curr) => (
            <li key={curr.id} onClick={() => onSelectCurrency(curr.title)}>
              {curr.title}
            </li>
          ))}
        </StyledCurrencyDropdown>
      )}
    </StyledCurrencySelector>
  );
};

export default CurrencySelector;
