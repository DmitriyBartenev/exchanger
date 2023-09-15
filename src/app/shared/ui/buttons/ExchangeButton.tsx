import React from 'react';

import {StyledExchangeButton} from './styles';

interface ExchangeButtonProps {
  type?: 'button' | 'submit' | 'reset';
  title: string;
  disabled?: boolean;
}

export const ExchangeButton: React.FC<ExchangeButtonProps> = ({
  type = 'button',
  title,
  disabled,
}) => {
  return (
    <StyledExchangeButton type={type} disabled={disabled}>
      {title}
    </StyledExchangeButton>
  );
};
