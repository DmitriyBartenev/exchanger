import React from 'react';

import {StyledAddressInput, StyledContainer} from './styles';

interface AddressInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'email' | 'password' | 'text' | 'number';
  placeholder: string;
  disabled: boolean;
  name: string;
  label?: string;
}

export const AddressInput: React.FC<AddressInputProps> = ({
  value,
  onChange,
  type = 'text',
  placeholder,
  disabled,
  name,
  label,
}) => (
  <StyledContainer>
    <label htmlFor={name}>{label}</label>
    <StyledAddressInput
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      name={name}
      id={name}
      required
    />
  </StyledContainer>
);
