import React from 'react';

import {SwapIcon} from '~/shared/ui';

import {StyledSwapButton} from './styles';

interface SwapButtonProps {
  type?: 'reset' | 'submit' | 'button';
  disabled?: boolean;
  onClick: () => void;
}

export const SwapButton: React.FC<SwapButtonProps> = ({type = 'button', disabled, onClick}) => (
  <StyledSwapButton type={type} onClick={onClick} disabled={disabled}>
    <SwapIcon />
  </StyledSwapButton>
);
