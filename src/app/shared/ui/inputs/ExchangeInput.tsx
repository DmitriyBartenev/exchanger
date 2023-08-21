import React from 'react';

import {StyledCalculatorInput} from './styles';

interface ExchangeInputProps {
  type?: 'email' | 'password' | 'text' | 'number';
  name: string;
  showDropdown: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
}

export const ExchangeInput: React.FC<ExchangeInputProps> = ({
  showDropdown,
  type = 'text',
  value,
  name,
  onChange,
  disabled,
  inputRef,
}) => {
  return (
    <StyledCalculatorInput
      type={type}
      placeholder={showDropdown ? 'Search' : ''}
      value={value}
      name={name}
      onChange={onChange}
      disabled={disabled}
      ref={inputRef}
    />
  );
};
