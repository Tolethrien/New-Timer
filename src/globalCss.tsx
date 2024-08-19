import { createGlobalStyle } from "styled-components";

export const MAX_WIDTH_APP: number = 420;

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
      background: hsla(0, 0%, 63%, 1);
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
 
  dialog{
    box-sizing: border-box;
    width: clamp(230px,350px,${MAX_WIDTH_APP}px);
    ::backdrop {
    backdrop-filter: blur(3px);
    max-width: ${MAX_WIDTH_APP}px;
    margin-inline: auto;
    }
  }
`;
export default GlobalStyle;
