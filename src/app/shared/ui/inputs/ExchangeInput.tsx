import React from 'react';

import {StyledCalculatorInput} from './styles';

interface ExchangeInputProps {
  type?: 'email' | 'password' | 'text' | 'number';
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  placeholder?: string;
}

export const ExchangeInput: React.FC<ExchangeInputProps> = ({
  type = 'text',
  value,
  name,
  onChange,
  disabled,
  inputRef,
  placeholder,
}) => {
  return (
    <StyledCalculatorInput
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
      disabled={disabled}
      ref={inputRef}
    />
  );
};
