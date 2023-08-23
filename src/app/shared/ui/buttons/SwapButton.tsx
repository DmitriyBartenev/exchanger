import React from 'react';

import {useAppSelector} from '~/redux/hooks';
import {rootSelector} from '~/redux/slices/selectors';

import {SwapIcon} from '~/ui';

import {StyledSwapButton} from './styles';

interface SwapButtonProps {
  type?: 'reset' | 'submit' | 'button';
  onClick: () => void;
}

export const SwapButton: React.FC<SwapButtonProps> = ({type = 'button', onClick}) => {
  const {isLoading} = useAppSelector(rootSelector);

  return (
    <StyledSwapButton type={type} onClick={onClick} disabled={isLoading}>
      <SwapIcon />
    </StyledSwapButton>
  );
};
