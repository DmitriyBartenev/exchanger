import React from 'react';

import {StyledExchangeInput} from './styles';

interface ExchangeInputProps {
  type?: 'email' | 'password' | 'text' | 'number';
  showDropdown: boolean;
}

export const ExchangeInput: React.FC<ExchangeInputProps> = ({showDropdown, type}) => {
  return (
    <StyledExchangeInput
      type={type !== 'text' ? type : 'text'}
      placeholder={showDropdown ? 'Search' : ''}
      $showDropdown={showDropdown}
    />
  );
};
