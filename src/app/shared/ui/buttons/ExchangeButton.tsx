import React from 'react';

import {StyledButtonContainer, StyledExchangeButton} from './styles';

interface ExchangeButtonProps {
  title: string;
  type: 'button' | 'submit' | 'reset';
}

export const ExchangeButton: React.FC<ExchangeButtonProps> = ({title, type}) => {
  return (
    <StyledButtonContainer>
      <StyledExchangeButton type={type}>{title}</StyledExchangeButton>
    </StyledButtonContainer>
  );
};
