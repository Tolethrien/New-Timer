import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html{
    font-family: "Roboto";
  }
input{
  font-family: "Roboto";

}
  p{
    margin: 0;
  }
  button{
    font-family: "Roboto";
    font-weight: 500;
  }
  body{
    margin: 0;
    padding: 0;
    font-family: "Roboto";
    background-color: #312c2c;

  }
  h1,h2,h3,h4{
    margin: 0;
  }

`;
export default GlobalStyle;
