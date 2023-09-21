'use client';

import styled from 'styled-components';

import {colors} from '~/app/styles/colors';

export const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  label {
    font-size: 16px;
    line-height: 23px;
    width: fit-content;
  }
`;

export const StyledExchangeInput = styled.input`
  width: 100%;
  height: 50px;
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
  border-radius: 5px;
  background-color: ${colors.lightGray};
  border: solid 1px ${colors.darkGray};
`;
