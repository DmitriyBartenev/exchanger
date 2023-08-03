import React from 'react';

import {StyledCalculatorInput} from './styles';

interface CalculatorInputProps {
  type?: 'email' | 'password' | 'text' | 'number';
  placeholder?: string;
}

export const CalculatorInput: React.FC<CalculatorInputProps> = ({placeholder, type}) => {
  return (
    <StyledCalculatorInput
      type={type !== 'text' ? type : 'text'}
      placeholder={placeholder}
      required
    />
  );
};
