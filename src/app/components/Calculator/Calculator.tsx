import React from 'react';

import {StyledCalculator, StyledCalculatorForm} from './styles';

import {ExchangeCurrencies} from './ExchangeCurrencies';

export const Calculator: React.FC = () => {
  const onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <StyledCalculator>
      <h1>Crypto Exchange</h1>
      <p>Exchange fast and easy</p>
      <StyledCalculatorForm>
        <ExchangeCurrencies />
      </StyledCalculatorForm>
    </StyledCalculator>
  );
};
