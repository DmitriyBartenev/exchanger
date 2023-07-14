import React from 'react';

import {StyledButtonContainer, StyledExchangeButton} from './styles';

interface ExchangeButtonProps {
  title: string;
  type: 'button' | 'submit' | 'reset';
  error?: string | null | undefined;
}

export const ExchangeButton: React.FC<ExchangeButtonProps> = ({title, type, error}) => {
  return (
    <StyledButtonContainer>
      <StyledExchangeButton type={type}>{title}</StyledExchangeButton>
      <span>{error}</span>
    </StyledButtonContainer>
  );
};
