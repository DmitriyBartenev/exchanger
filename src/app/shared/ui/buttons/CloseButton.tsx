import {CloseIcon} from '../icons/CloseIcon';
import {StyledCloseButton} from './styles';

interface CloseButtonProps {
  onClick: () => void;
}

export const CloseButton: React.FC<CloseButtonProps> = ({onClick}) => {
  return (
    <StyledCloseButton onClick={onClick}>
      <CloseIcon />
    </StyledCloseButton>
  );
};
