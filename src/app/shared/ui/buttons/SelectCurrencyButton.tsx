import Image from 'next/image';
import React from 'react';

import {ArrowIcon, FetchCurrenciesSpinner} from '~/ui';

import {StyledSelectCurrencyButton} from './styles';

interface SelectCurrencyButtonProps {
  type?: 'reset' | 'submit' | 'button';
  ticker: string;
  image: string;
  buttonRef: React.MutableRefObject<HTMLButtonElement | null>;
  showDropdown: boolean;
  isLoading: boolean;
  disabled: boolean;
  onClick: () => void;
}

export const SelectCurrencyButton: React.FC<SelectCurrencyButtonProps> = ({
  type = 'button',
  ticker,
  image,
  buttonRef,
  showDropdown,
  isLoading,
  disabled,
  onClick,
}) =>
  isLoading ? (
    <FetchCurrenciesSpinner />
  ) : (
    <StyledSelectCurrencyButton
      onClick={onClick}
      disabled={disabled}
      type={type}
      ref={buttonRef}
      $showDropdown={showDropdown}
    >
      {image && <Image src={image} alt={ticker} width={20} height={20} />}
      {ticker}
      <ArrowIcon />
    </StyledSelectCurrencyButton>
  );
