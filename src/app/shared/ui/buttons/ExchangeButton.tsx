import React from 'react';

import {useAppSelector} from '~/lib/redux/hooks';
import {rootSelector} from '~/lib/redux/slices/selectors';

import {StyledButtonContainer, StyledExchangeButton} from './styles';

interface ExchangeButtonProps {
  title: string;
  type?: 'button' | 'submit' | 'reset';
}

export const ExchangeButton: React.FC<ExchangeButtonProps> = ({title, type = 'button'}) => {
  const {isLoading, isError} = useAppSelector(rootSelector);

  return (
    <StyledButtonContainer>
      <StyledExchangeButton type={type} disabled={isLoading || isError}>
        {title}
      </StyledExchangeButton>
    </StyledButtonContainer>
  );
};
