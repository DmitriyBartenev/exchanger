import styled from 'styled-components';
import {colors} from '~/app/styles/colors';

export const StyledCalculator = styled.div`
  width: 960px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  h1 {
    font-size: 50px;
    font-weight: 300;
    line-height: 120%;
    margin: 0;
  }
  p {
    font-size: 20px;
    line-height: 100%;
    font-size: 400;
    margin: 16px 0 60px;
  }
`;

export const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
`;

export const StyledExchangeContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 28px;
`;

export const StyledAddressContainer = styled.div`
  width: 100%;
  p {
    font-size: 16px;
    line-height: 23px;
    margin: 0 0 8px;
  }
`;

export const StyledAdressSubmit = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
`;

export const StyledCurrencySelector = styled.div`
  width: 100%;
  height: 50px;
  position: relative;
`;

export const StyledCurrencyDropdown = styled.ul`
  position: absolute;
  width: 100%;
  list-style: none;
  left: 0;
  top: 100;
  padding: 0;
  margin: 0;
  background-color: ${colors.lightGray};
  border: solid 1px ${colors.darkGray};
  border-top: none;
  border-radius: 0 0px 5px 5px;
  li {
    font-size: 16px;
    font-weight: 400;
    line-height: 23px;
    padding: 13px 0 13px 16px;
    cursor: pointer;
    &:hover {
      background-color: ${colors.lightBlue};
    }
  }
`;
