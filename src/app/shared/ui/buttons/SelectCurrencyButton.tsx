import Image from 'next/image';
import React from 'react';

import {StyledSelectCurrencyButton} from './styles';

import {Spinner} from '../spinners/Spinner';

interface SelectCurrencyButtonProps {
  ticker: string;
  icon: React.ReactElement;
  image: string;
  onClick: () => void;
  loadingStatus?: 'loading' | 'idle' | 'failed';
}

export const SelectCurrencyButton: React.FC<SelectCurrencyButtonProps> = ({
  ticker,
  icon,
  image,
  onClick,
  loadingStatus,
}) => {
  return (
    <StyledSelectCurrencyButton onClick={onClick}>
      {loadingStatus === 'loading' ? (
        <Spinner />
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
