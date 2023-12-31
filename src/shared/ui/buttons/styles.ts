'use client';

import styled from 'styled-components';

import {colors} from '~/styles/colors';

const DefaultButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const StyledExchangeButton = styled.button`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 59px;
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
  transition: 0.2s;
  &:hover {
    background-color: ${colors.darkBlue};
    border-color: ${colors.darkBlue};
  }
  &:disabled {
    cursor: default;
    background-color: ${colors.lightGray};
    border-color: ${colors.darkGray};
    color: ${colors.darkGray};
  }
`;

export const StyledSelectCurrencyButton = styled.button<{$showDropdown: boolean}>`
  height: 100%;
  width: fit-content;
  padding: 0 8px 0 34px;
  border: none;
  border-left: solid 1px ${colors.darkGray};
  border-radius: 0 5px 5px 0;
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
  svg {
    transition: transform 0.2s ease-in-out;
    transform: ${({$showDropdown}) => ($showDropdown ? 'rotate(180deg)' : 'none')};
    path {
      stroke: ${({$showDropdown}) => ($showDropdown ? colors.darkBlue : colors.blue)};
    }
  }
  &:hover {
    svg {
      path {
        stroke: ${colors.darkBlue};
      }
    }
  }
  &:disabled {
    cursor: default;
    color: ${colors.paleBlue};
    svg {
      path {
        stroke: ${colors.paleBlue};
      }
    }
    img {
      filter: grayscale(1);
    }
  }
`;

export const StyledSwapButton = styled(DefaultButton)`
  cursor: pointer;
  svg {
    path {
      fill: ${colors.blue};
    }
  }
  &:hover {
    svg {
      path {
        fill: ${colors.darkBlue};
      }
    }
  }
  &:disabled {
    cursor: default;
    svg {
      path {
        fill: ${colors.paleBlue};
      }
    }
  }
  @media screen and (max-width: 768px) {
    transform: rotate(90deg);
  }
`;
