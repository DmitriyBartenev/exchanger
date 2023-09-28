import React from 'react';

import {StyledDot, StyledSpinnerWrapper} from './styles';

interface ExchangeAmountSpinnerProps {
  dotCount?: number;
}

export const ExchangeAmountSpinner: React.FC<ExchangeAmountSpinnerProps> = ({dotCount = 3}) => {
  const dots = Array.from({length: dotCount}, (_, index) => (
    <StyledDot key={index} $mydelay={`${index * 0.2}s`} />
  ));

  return <StyledSpinnerWrapper>{dots}</StyledSpinnerWrapper>;
};
