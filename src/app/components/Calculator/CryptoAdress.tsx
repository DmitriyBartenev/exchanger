import React from 'react';

import {CalculatorInput, ExchangeButton} from '~/ui';

import {StyledAddressContainer, StyledAdressSubmit} from './styles';

export const CryptoAdress: React.FC = () => {
  return (
    <StyledAddressContainer>
      <p>Your Ethereum address</p>
      <StyledAdressSubmit>
        <CalculatorInput />
        <ExchangeButton title="Exchange" type="submit" />
      </StyledAdressSubmit>
    </StyledAddressContainer>
  );
};
