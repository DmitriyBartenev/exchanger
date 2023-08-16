import React from 'react';

import {StyledCalculatorInput} from './styles';

interface CalculatorInputProps {
  type?: 'email' | 'password' | 'text' | 'number';
  placeholder?: string;
}

export const CalculatorInput: React.FC<CalculatorInputProps> = ({placeholder, type = 'text'}) => {
  return <StyledCalculatorInput type={type} placeholder={placeholder} required />;
};
