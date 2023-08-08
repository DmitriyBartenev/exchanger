import React from 'react';
import styled, {keyframes} from 'styled-components';
import {colors} from '~/app/styles/colors';

const spinAnimation = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
`;

const SpinnerWrapper = styled.div`
  display: inline-block;
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 15px;
`;

const Dot = styled.div<{$mydelay: string}>`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${colors.blue};
  margin: 0 4px;
  animation: ${spinAnimation} 1s infinite;
  animation-delay: ${(props) => props.$mydelay || '0s'};
`;

interface ExchangeAmountSpinnerProps {
  dotCount?: number;
}

export const ExchangeAmountSpinner: React.FC<ExchangeAmountSpinnerProps> = ({dotCount = 3}) => {
  const dots = Array.from({length: dotCount}, (_, index) => (
    <Dot key={index} $mydelay={`${index * 0.2}s`} />
  ));

  return <SpinnerWrapper>{dots}</SpinnerWrapper>;
};
