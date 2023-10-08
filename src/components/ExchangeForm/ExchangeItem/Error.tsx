import {exchangeSelector} from '~/redux/features/selectors';
import {useAppSelector} from '~/redux/hooks';

import {StyledErrorMessage} from '../styles';

interface ErrorProps {
  index: number;
}

export const Error: React.FC<ErrorProps> = ({index}) => {
  const {minimalExchangeAmount, estimatedExchangeAmount} = useAppSelector(exchangeSelector);

  const errorToRender = minimalExchangeAmount.error?.error || estimatedExchangeAmount.error?.error;

  const renderError = (errorMessage: string) => (
    <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
  );

  if (index === 1 && errorToRender) return renderError(errorToRender);

  return null;
};
