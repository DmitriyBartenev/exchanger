'use client';

import React from 'react';
import {buttons, inputs} from '~/ui';

import CurrencySelector from './CurrencySelector';
import {
  StyledAddressContainer,
  StyledAdressSubmit,
  StyledCalculator,
  StyledContainer,
  StyledExchangeContainer,
} from './styles';

export const Calculator: React.FC = () => {
  const {ExchangeButton, SwapButton} = buttons;
  const {CalculatorInput} = inputs;
  return (
    <StyledCalculator>
      <h1>Crypto Exchange</h1>
      <p>Exchange fast and easy</p>
      <StyledContainer>
        <StyledExchangeContainer>
          <CurrencySelector />
          <SwapButton type="button" />
          <CurrencySelector />
        </StyledExchangeContainer>
        <StyledAddressContainer>
          <p>Your Ethereum address</p>
          <StyledAdressSubmit>
            <CalculatorInput />
            <ExchangeButton title="Exchange" type="button" />
          </StyledAdressSubmit>
        </StyledAddressContainer>
      </StyledContainer>
    </StyledCalculator>
  );
};
