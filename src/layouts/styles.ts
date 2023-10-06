import styled from 'styled-components';

export const Container = styled.section`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Main = styled.main`
  width: 1400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  h1 {
    width: 100%;
    font-size: 50px;
    font-weight: 300;
    line-height: 120%;
    margin: 0;
  }
  p {
    width: 100%;
    font-size: 20px;
    line-height: 100%;
    margin: 16px 0 60px;
  }
`;
