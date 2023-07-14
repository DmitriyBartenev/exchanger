import React from 'react';
import {buttons, inputs} from '~/app/shared/ui';

import {StyledAddressContainer, StyledAdressSubmit} from './styles';

const CryptoAdress = () => {
  const {ExchangeButton} = buttons;
  const {CalculatorInput} = inputs;

  return (
    <StyledAddressContainer>
      <p>Your Ethereum address</p>
      <StyledAdressSubmit>
        <CalculatorInput />
        <ExchangeButton title="Exchange" type="button" />
      </StyledAdressSubmit>
    </StyledAddressContainer>
  );
};

export default CryptoAdress;
