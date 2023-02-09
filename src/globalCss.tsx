import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
 *{
   font-family: "Roboto";
   ::-webkit-scrollbar {
     width: 6px;
    }
    ::-webkit-scrollbar-track {
      background: hsla(0, 0%, 31%, 1);
      border-radius: 5px;
      margin: 20px 0px;
    }
    ::-webkit-scrollbar-thumb {
      background: hsla(0, 0%, 43%, 1);
      border-radius: 5px;
    }
  }
  p{
    margin: 0;
  }
  body{
    margin: 0;
    padding: 0;
    background-color: #312c2c;
  }
 html{
  font-size: 16px;
 }
  dialog{
    box-sizing: border-box;
    width: clamp(235px,350px,420px);
    ::backdrop {
    backdrop-filter: blur(3px);
    max-width: 420px;
    margin-inline: auto;
    }
  }
`;
export default GlobalStyle;
