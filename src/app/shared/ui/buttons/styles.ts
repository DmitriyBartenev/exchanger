import styled from 'styled-components';
import {colors} from '~/app/styles/colors';

const DefaultButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const StyledExchangeButton = styled.button`
  padding: 15px 59px;
  background-color: ${colors.blue};
  color: ${colors.white};
  border-radius: 5px;
  border: solid 1px ${colors.blue};
  text-transform: uppercase;
  letter-spacing: 3%;
  line-height: 120%;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
`;

export const StyledSelectCurrencyButton = styled.button`
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  padding: 0 8px 0 34px;
  border: none;
  border-left: solid 1px ${colors.darkGray};
  color: ${colors.black};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  background-color: transparent;
  font-size: 16px;
  line-height: 23px;
  font-weight: 400;
  cursor: pointer;
`;

export const StyledSwapButton = styled(DefaultButton)``;

export const StyledCloseButton = styled(StyledSelectCurrencyButton)`
  border: none;
  padding: 0 8px;
`;
