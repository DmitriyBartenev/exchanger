import {useAppSelector} from '~/lib/redux/hooks';
import {rootSelector} from '~/lib/redux/slices/selectors';

import {StyledSwapButton} from './styles';

import {SwapIcon} from '../icons/SwapIcon';

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
