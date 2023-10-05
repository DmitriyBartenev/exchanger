import {createGlobalStyle} from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  html,
  body {
    height: 100%;
    max-width: 960px;
    margin: 0 auto;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    color: #282828;
  }

  #__next{
    height: 100%;
    width: 100%;
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
