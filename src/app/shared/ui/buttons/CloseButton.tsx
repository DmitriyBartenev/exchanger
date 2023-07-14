import {StyledCloseButton} from './styles';

import {CloseIcon} from '../icons/CloseIcon';

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
