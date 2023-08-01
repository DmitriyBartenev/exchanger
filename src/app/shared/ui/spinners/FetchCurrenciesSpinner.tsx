import React from 'react';
import styled, {keyframes} from 'styled-components';
import {colors} from '~/app/styles/colors';

const FetchCurrenciesSpinnerAnimation = keyframes`
    to { transform: rotate(360deg) }
`;

const StyledFetchCurrenciesSpinner = styled.div`
  height: 20px;
  width: 20px;
  margin-right: 20px;
  border-radius: 50%;
  border: 5px solid ${colors.blue};
  border-top-color: ${colors.darkGray};
  animation: ${FetchCurrenciesSpinnerAnimation} 1s ease-in-out infinite;
`;

export const FetchCurrenciesSpinner: React.FC = () => {
  return <StyledFetchCurrenciesSpinner />;
};
