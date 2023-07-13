import React from 'react';

import {StyledSelectCurrencyButton} from './styles';

interface SelectCurrencyButtonProps {
  title: string;
  icon: React.ReactElement;
  onClick: () => void;
}

export const SelectCurrencyButton: React.FC<SelectCurrencyButtonProps> = ({
  title,
  icon,
  onClick,
}) => {
  return (
    <StyledSelectCurrencyButton onClick={onClick}>
      {title}
      {icon}
    </StyledSelectCurrencyButton>
  );
};
