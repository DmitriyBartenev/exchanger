import React from 'react';

import {StyledAddressInput} from './styles';

interface CalculatorInputProps {
  type?: 'email' | 'password' | 'text' | 'number';
  placeholder?: string;
}

export const CalculatorInput: React.FC<CalculatorInputProps> = ({placeholder, type = 'text'}) => {
  return <StyledAddressInput type={type} placeholder={placeholder} required />;
};
