import Image from 'next/image';
import React from 'react';

import {StyledSelectCurrencyButton} from './styles';

import {FetchCurrenciesSpinner} from '../spinners/FetchCurrenciesSpinner';

interface SelectCurrencyButtonProps {
  ticker: string;
  icon: React.ReactElement;
  image: string;
  onClick: () => void;
  availableCurrenciesFetchStatus?: 'loading' | 'idle' | 'failed';
}

export const SelectCurrencyButton: React.FC<SelectCurrencyButtonProps> = ({
  ticker,
  icon,
  image,
  onClick,
  availableCurrenciesFetchStatus,
}) => {
  return (
    <StyledSelectCurrencyButton onClick={onClick}>
      {availableCurrenciesFetchStatus === 'loading' ? (
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
