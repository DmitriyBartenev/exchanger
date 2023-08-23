import React from 'react';

import {StyledCalculator, StyledCalculatorForm} from './styles';

import {CryptoAdress} from './CryptoAdress';
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
        <CryptoAdress />
      </StyledCalculatorForm>
    </StyledCalculator>
  );
};
