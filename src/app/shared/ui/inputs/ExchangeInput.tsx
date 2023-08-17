import React from 'react';

import {StyledExchangeInput} from './styles';

interface ExchangeInputProps {
  type?: 'email' | 'password' | 'text' | 'number';
  name: string;
  showDropdown: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error: boolean;
}

export const ExchangeInput: React.FC<ExchangeInputProps> = ({
  showDropdown,
  type = 'text',
  value,
  name,
  onChange,
  disabled,
  error,
}) => {
  return (
    <StyledExchangeInput
      type={type}
      placeholder={showDropdown ? 'Search' : ''}
      $showdropdown={showDropdown}
      $error={error}
      value={value}
      name={name}
      onChange={onChange}
      disabled={disabled}
    />
  );
};
