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
  const {availableCurrencies, isLoading} = useAppSelector(rootSelector);

  const isCurrenciesLoading = availableCurrencies.status === 'loading';

  return (
    <StyledSelectCurrencyButton onClick={onClick} disabled={isLoading}>
      {renderButtonContent(isCurrenciesLoading, image, ticker, icon)}
    </StyledSelectCurrencyButton>
  );
};

function renderButtonContent(
  isCurrenciesLoading: boolean,
  image: string,
  ticker: string,
  icon: React.ReactElement,
) {
  if (isCurrenciesLoading) return <FetchCurrenciesSpinner />;

  return (
    <>
      {image && <Image src={image} alt={ticker} width={20} height={20} />}
      {ticker}
      {icon}
    </>
  );
}
