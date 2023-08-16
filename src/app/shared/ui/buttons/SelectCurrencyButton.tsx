import Image from 'next/image';
import React from 'react';

import {useAppSelector} from '~/lib/redux/hooks';
import {rootSelector} from '~/lib/redux/slices/selectors';

import {StyledSelectCurrencyButton} from './styles';

import {FetchCurrenciesSpinner} from '../spinners/FetchCurrenciesSpinner';

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
  const {availableCurrencies, estimatedExchangeAmount, minimalExchangeAmount} =
    useAppSelector(rootSelector);

  const isLoading = availableCurrencies.status === 'loading';
  const isDisabled =
    availableCurrencies.status === 'loading' ||
    estimatedExchangeAmount.status === 'loading' ||
    minimalExchangeAmount.status === 'loading';

  return (
    <StyledSelectCurrencyButton onClick={onClick} disabled={isDisabled}>
      {renderButtonContent(isLoading, image, ticker, icon)}
    </StyledSelectCurrencyButton>
  );
};

function renderButtonContent(
  isLoading: boolean,
  image: string,
  ticker: string,
  icon: React.ReactElement,
) {
  if (isLoading) return <FetchCurrenciesSpinner />;

  return (
    <>
      {image && <Image src={image} alt={ticker} width={20} height={20} />}
      {ticker}
      {icon}
    </>
  );
}
