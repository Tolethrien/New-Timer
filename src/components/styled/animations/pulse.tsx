import { keyframes } from "styled-components";

export const pulse = (hue: string) => {
  return keyframes`
   
   0% {
      background: hsla(${hue}, 80%, 30%, 0.3);
      box-shadow: inset 0px 0px 10px 2px hsla(${hue}, 90%, 30%, 0.5),
        0px 0px 5px 2px hsla(${hue}, 100%, 30%, 0.3);
    }
    100% {
      background: hsla(${hue}, 80%, 30%, 1);
      box-shadow: inset 0px 0px 10px 2px hsla(${hue}, 90%, 50%, 0.5),
        0px 0px 15px 2px hsla(${hue}, 100%, 60%, 1);
    }
  `;
};
