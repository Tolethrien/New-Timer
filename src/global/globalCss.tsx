import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  p{
    margin: 0;
  }
  body{
    margin: 0;
    padding: 0;
    font-family: "Roboto";
    -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  }
  h1,h2,h3,h4{
    margin: 0;
  }

`;
export default GlobalStyle;
