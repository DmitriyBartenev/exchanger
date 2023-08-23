'use client';

import {keyframes, styled} from 'styled-components';
import {colors} from '~/app/styles/colors';

const spinAnimation = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
`;

export const StyledSpinnerWrapper = styled.div`
  display: inline-block;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 16px;
`;

export const StyledDot = styled.div<{$mydelay: string}>`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${colors.blue};
  margin: 0 4px;
  animation: ${spinAnimation} 1s infinite;
  animation-delay: ${(props) => props.$mydelay || '0s'};
`;

const FetchCurrenciesSpinnerAnimation = keyframes`
    to { transform: rotate(360deg) }
`;

export const StyledFetchCurrenciesSpinner = styled.div`
  height: 20px;
  width: 20px;
  margin-right: 20px;
  border-radius: 50%;
  border: 5px solid ${colors.blue};
  border-top-color: ${colors.darkGray};
  animation: ${FetchCurrenciesSpinnerAnimation} 1s ease-in-out infinite;
`;
