import {SwapIcon} from '../icons/SwapIcon';
import {StyledSwapButton} from './styles';

interface SwapButtonProps {
  type: 'reset' | 'submit' | 'button';
}

export const SwapButton: React.FC<SwapButtonProps> = ({type}) => {
  return (
    <StyledSwapButton type={type}>
      <SwapIcon />
    </StyledSwapButton>
  );
};
