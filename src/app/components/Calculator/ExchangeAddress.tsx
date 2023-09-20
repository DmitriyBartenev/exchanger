import React from 'react';

import {AddressInput, ExchangeButton} from '~/ui';

import {StyledExchangeAddress, StyledInputContainer} from './styles';

interface ExchangeAddressProps {
  disabledButton: boolean;
  disabledInput: boolean;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

export const ExchangeAddress: React.FC<ExchangeAddressProps> = ({
  disabledButton,
  disabledInput,
  label,
  value,
  onChange,
  name,
}) => (
  <StyledExchangeAddress>
    <AddressInput
      value={value}
      onChange={onChange}
      placeholder="e.g., 0x742d35Cc6634C0..."
      disabled={disabledInput}
      name={name}
      label={label}
    />
    <ExchangeButton title="Exchange" type="submit" disabled={disabledButton} />
  </StyledExchangeAddress>
);
