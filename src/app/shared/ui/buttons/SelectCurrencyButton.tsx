import Image from 'next/image';
import React from 'react';

import {useAppSelector} from '~/redux/hooks';
import {rootSelector} from '~/redux/slices/selectors';

import {FetchCurrenciesSpinner} from '~/ui';

import {StyledSelectCurrencyButton} from './styles';

interface SelectCurrencyButtonProps {
  type?: 'reset' | 'submit' | 'button';
  ticker: string;
  icon: React.ReactElement;
  image: string;
  showDropdown: boolean;
  onClick: () => void;
}

export const SelectCurrencyButton: React.FC<SelectCurrencyButtonProps> = ({
  type = 'button',
  ticker,
  icon,
  image,
  showDropdown,
  onClick,
}) => {
  const {availableCurrencies, isLoading} = useAppSelector(rootSelector);

  const isCurrenciesLoading = availableCurrencies.status === 'loading';

  return (
    <StyledSelectCurrencyButton
      onClick={onClick}
      disabled={isLoading}
      type={type}
      $showDropdown={showDropdown}
    >
      {isCurrenciesLoading ? (
        <FetchCurrenciesSpinner />
      ) : (
        <>
          {image && <Image src={image} alt={ticker} width={20} height={20} />}
          {ticker}
          {icon}
        </>
      )}
    </StyledSelectCurrencyButton>
  );
};
