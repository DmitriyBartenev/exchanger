import React from 'react';

import {ExchangeAmountSpinner} from '~/shared/ui';

import {StyledExchangeInput} from './styles';

interface ExchangeInputProps {
  type?: 'email' | 'password' | 'text' | 'number';
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name: string;
  disabled?: boolean;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  isLoading: boolean;
}

export const ExchangeInput: React.FC<ExchangeInputProps> = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  name,
  disabled,
  inputRef,
  isLoading,
}) =>
  isLoading ? (
    <ExchangeAmountSpinner />
  ) : (
    <StyledExchangeInput
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
      disabled={disabled}
      ref={inputRef}
    />
  );
