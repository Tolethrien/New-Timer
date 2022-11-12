import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  p{
    margin: 0;
  }
  body{
    margin: 0;
    padding: 0;
    font-family: "Roboto"
  }
  h1,h2,h3,h4{
    margin: 0;
  }
  @viewport {  
   orientation: portrait;  
 } 
`;
export default GlobalStyle;
