import React from 'react';

import {CalculatorInput, ExchangeButton} from '~/app/shared/ui';

import {StyledAddressContainer, StyledAdressSubmit} from './styles';

const CryptoAdress: React.FC = () => {
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

export default CryptoAdress;
