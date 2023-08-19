import styled from 'styled-components';
import {colors} from '~/app/styles/colors';

export const StyledCalculator = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0 15px;
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

export const StyledCalculatorForm = styled.form`
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
  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: flex-end;
  }
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
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
`;

export const StyledCurrencySelector = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${colors.lightGray};
  border-radius: 5px;
  position: relative;
`;

export const StyledCurrencyDropdown = styled.ul`
  position: absolute;
  z-index: 2;
  width: 100%;
  max-height: 142px;
  overflow: auto;
  list-style: none;
  left: 0;
  top: 100;
  padding: 0;
  margin: 0;
  background-color: ${colors.lightGray};
  border: solid 1px ${colors.darkGray};
  border-top: none;
  border-radius: 0 0px 5px 5px;

  scrollbar-width: thin;
  scrollbar-color: ${colors.darkGray} ${colors.lightGray};

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${colors.lightBlue};
    border-radius: 5px 0 5px 0;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${colors.paleBlue};
    border-radius: 5px 0 5px 0;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${colors.blue};
  }

  li {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 13px;
    font-size: 16px;
    font-weight: 400;
    line-height: 23px;
    padding: 13px 0 13px 16px;
    cursor: pointer;
    span {
      font-size: 16px;
      line-height: 23px;
      color: ${colors.paleBlue};
    }
    &:hover {
      background-color: ${colors.lightBlue};
    }
  }
`;

export const StyledNotFoundMessage = styled.span`
  display: block;
  font-size: 16px;
  line-height: 23px;
  padding: 13px 0 13px 16px;
  font-weight: 400;
  cursor: default;
`;

export const StyledExchangeError = styled.span`
  display: block;
  position: absolute;
  right: 0;
  bottom: 100%;
  color: ${colors.red};
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
`;
