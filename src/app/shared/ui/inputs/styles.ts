import styled from 'styled-components';
import {colors} from '~/app/styles/colors';

export const StyledCalculatorInput = styled.input`
  width: 100%;
  height: 100%;
  background-color: ${colors.lightGray};
  border: none;
  border-radius: 5px;
  color: ${colors.black};
  font-size: 16px;
  font-weight: 400;
  line-height: 23px;
  padding: 13px 0 13px 16px;
`;
