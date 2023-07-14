import React from 'react';
import styled, {keyframes} from 'styled-components';
import {colors} from '~/app/styles/colors';

const SpinnerAnimation = keyframes`
    to { transform: rotate(360deg) }
`;

const StyledSpinner = styled.div`
  margin: 0 auto;
  margin-bottom: 400px;
  width: 33px;
  height: 33px;
  border-radius: 50%;
  border: 5px solid ${colors.blue};
  border-top-color: ${colors.darkGray};
  animation: ${SpinnerAnimation} 1s ease-in-out infinite;
`;

export const Spinner: React.FC = () => {
  return <StyledSpinner />;
};
