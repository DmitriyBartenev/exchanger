import React from 'react';

import {StyledCalculator} from './styles';

import {CalculatorForm} from './CalculatorForm';

export const Calculator: React.FC = () => {
  return (
    <StyledCalculator>
      <h1>Crypto Exchange</h1>
      <p>Exchange fast and easy</p>
      <CalculatorForm />
    </StyledCalculator>
  );
};
