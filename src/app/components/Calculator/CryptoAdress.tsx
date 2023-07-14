import React from 'react';

import {buttons, inputs} from '~/app/shared/ui';

import {StyledAddressContainer, StyledAdressSubmit} from './styles';

interface CryptoAdressProps {
  estimatedExchangeAmountError: string | null;
}

const CryptoAdress: React.FC<CryptoAdressProps> = ({estimatedExchangeAmountError}) => {
  const {ExchangeButton} = buttons;
  const {CalculatorInput} = inputs;

  return (
    <StyledAddressContainer>
      <p>Your Ethereum address</p>
      <StyledAdressSubmit>
        <CalculatorInput />
        <ExchangeButton title="Exchange" type="submit" error={estimatedExchangeAmountError} />
      </StyledAdressSubmit>
    </StyledAddressContainer>
  );
};

export default CryptoAdress;
