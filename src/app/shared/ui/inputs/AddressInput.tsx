import React from 'react';

import {StyledAddressInput} from './styles';

interface AddressInputProps {
  type?: 'email' | 'password' | 'text' | 'number';
  placeholder?: string;
}

export const AddressInput: React.FC<AddressInputProps> = ({placeholder, type = 'text'}) => {
  return <StyledAddressInput type={type} placeholder={placeholder} required />;
};
