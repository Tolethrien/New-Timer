import styled from "styled-components";
import { useContext } from "react";
import { appContext } from "../providers/appProvider";

interface HeadProps {
  children: React.ReactNode;
}
const Head: React.FC<HeadProps> = ({ children }) => {
  const {
    primary: { primaryColor },
  } = useContext(appContext);
  return <ComponentBody hue={primaryColor}>{children}</ComponentBody>;
};
export default Head;
const ComponentBody = styled.div<{ hue: number }>`
  position: relative;
  box-sizing: border-box;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0.8rem 5%;
  background-color: ${({ hue }) => `hsla(${hue}, 20%, 74%, 1)`};
  width: 100%;
  border-radius: 0 0 15px 15px;
  border-bottom: 1px solid hsla(0, 2%, 88%, 1);
  box-shadow: 0px 4px 4px hsla(0, 0%, 0%, 0.25);
`;
