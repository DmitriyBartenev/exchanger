import React from 'react';

import {StyledExchangeButton} from './styles';

interface ExchangeButtonProps {
  title: string;
  type: 'button' | 'submit' | 'reset';
}

export const ExchangeButton: React.FC<ExchangeButtonProps> = ({title, type}) => {
  return <StyledExchangeButton type={type}>{title}</StyledExchangeButton>;
};
