import React from 'react';

import {StyledExchangeInput} from './styles';

interface ExchangeInputProps {
  type?: 'email' | 'password' | 'text' | 'number';
  name: string;
  showDropdown: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export const ExchangeInput: React.FC<ExchangeInputProps> = ({
  showDropdown,
  type,
  value,
  name,
  onChange,
  disabled,
}) => {
  return (
    <StyledExchangeInput
      type={type !== 'text' ? type : 'text'}
      placeholder={showDropdown ? 'Search' : ''}
      $showDropdown={showDropdown}
      value={value}
      name={name}
      onChange={onChange}
      disabled={disabled}
    />
  );
};
