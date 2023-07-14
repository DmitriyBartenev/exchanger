import Image from 'next/image';
import React from 'react';

import {StyledSelectCurrencyButton} from './styles';

interface SelectCurrencyButtonProps {
  ticker: string;
  icon: React.ReactElement;
  image: string;
  onClick: () => void;
}

export const SelectCurrencyButton: React.FC<SelectCurrencyButtonProps> = ({
  ticker,
  icon,
  image,
  onClick,
}) => {
  return (
    <StyledSelectCurrencyButton onClick={onClick}>
      <Image src={image} alt={ticker} width={20} height={20} />
      {ticker}
      {icon}
    </StyledSelectCurrencyButton>
  );
};
