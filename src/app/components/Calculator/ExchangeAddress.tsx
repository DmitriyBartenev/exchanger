import React from 'react';

import {AddressInput, ExchangeButton} from '~/ui';

import {StyledAddressContainer, StyledAddressInput, StyledAddressSubmit} from './styles';

interface ExchangeAddressProps {
  disabled: boolean;
  title: string;
}

export const ExchangeAddress: React.FC<ExchangeAddressProps> = ({disabled, title}) => {
  return (
    <StyledAddressContainer>
      <p>{title}</p>
      <StyledAddressSubmit>
        <StyledAddressInput>
          <AddressInput />
        </StyledAddressInput>
        <ExchangeButton title="Exchange" type="submit" disabled={disabled} />
      </StyledAddressSubmit>
    </StyledAddressContainer>
  );
};
