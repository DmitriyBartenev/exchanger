'use client';

import styled from 'styled-components';

import {colors} from '~/app/styles/colors';

export const StyledExchangeInput = styled.input`
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: none;
  border-radius: 5px 0 0 5px;
  color: ${colors.black};
  font-size: 16px;
  font-weight: 400;
  line-height: 23px;
  padding: 13px 0 13px 16px;
`;

export const StyledAddressInput = styled(StyledExchangeInput)`
  border: solid 1px ${colors.darkGray};
  background-color: ${colors.lightGray};
  border-radius: 5px;
`;
