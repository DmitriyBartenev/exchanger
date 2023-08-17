import styled from 'styled-components';
import {colors} from '~/app/styles/colors';

export const StyledCalculatorInput = styled.input`
  width: 100%;
  height: 50px;
  background-color: ${colors.lightGray};
  border: solid 1px ${colors.darkGray};
  border-radius: 5px;
  color: ${colors.black};
  font-size: 16px;
  font-weight: 400;
  line-height: 23px;
  padding: 13px 0 13px 16px;
`;

export const StyledExchangeInput = styled(StyledCalculatorInput)<{
  $showdropdown: boolean;
  $error: boolean;
}>`
  border-radius: ${({$showdropdown}) => ($showdropdown ? '5px 5px 0 0' : '5px')};
  border-color: ${({$error}) => ($error ? colors.red : colors.lightGray)};
`;
