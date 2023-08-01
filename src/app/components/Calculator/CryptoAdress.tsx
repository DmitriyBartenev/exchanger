import React from 'react';

import {CalculatorInput, ExchangeButton} from '~/app/shared/ui';

import {StyledAddressContainer, StyledAdressSubmit} from './styles';

interface CryptoAdressProps {
  estimatedExchangeAmountError: string | null;
}

const CryptoAdress: React.FC<CryptoAdressProps> = ({estimatedExchangeAmountError}) => {
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
