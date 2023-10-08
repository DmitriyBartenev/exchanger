import React from 'react';

import {AddressInput, ExchangeButton} from '~/shared/ui';

import {StyledAddress} from './styles';

interface AddressProps {
  disabledButton: boolean;
  disabledInput: boolean;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

export const Address: React.FC<AddressProps> = ({
  disabledButton,
  disabledInput,
  label,
  value,
  onChange,
  name,
}) => (
  <StyledAddress>
    <AddressInput
      value={value}
      onChange={onChange}
      placeholder="e.g., 0x742d35Cc6634C0..."
      disabled={disabledInput}
      name={name}
      label={label}
    />
    <ExchangeButton title="Exchange" type="submit" disabled={disabledButton} />
  </StyledAddress>
);
