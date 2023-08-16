import React from 'react';

import {useAppSelector} from '~/lib/redux/hooks';
import {rootSelector} from '~/lib/redux/slices/selectors';

import {StyledButtonContainer, StyledExchangeButton} from './styles';

interface ExchangeButtonProps {
  title: string;
  type?: 'button' | 'submit' | 'reset';
}

export const ExchangeButton: React.FC<ExchangeButtonProps> = ({title, type = 'button'}) => {
  const {availableCurrencies, estimatedExchangeAmount, minimalExchangeAmount} =
    useAppSelector(rootSelector);

  const isDisabled =
    availableCurrencies.status === 'loading' ||
    estimatedExchangeAmount.status === 'loading' ||
    minimalExchangeAmount.status === 'loading';

  return (
    <StyledButtonContainer>
      <StyledExchangeButton type={type} disabled={isDisabled}>
        {title}
      </StyledExchangeButton>
    </StyledButtonContainer>
  );
};
