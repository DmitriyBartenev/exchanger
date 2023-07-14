import {SwapIcon} from '../icons/SwapIcon';
import {StyledSwapButton} from './styles';

interface SwapButtonProps {
  type: 'reset' | 'submit' | 'button';
  onClick: () => void;
}

export const SwapButton: React.FC<SwapButtonProps> = ({type, onClick}) => {
  return (
    <StyledSwapButton type={type} onClick={onClick}>
      <SwapIcon />
    </StyledSwapButton>
  );
};
