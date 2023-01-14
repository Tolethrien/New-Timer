import styled from "styled-components";
import { useContext } from "react";
import { appContext } from "../providers/appProvider";

interface HeadProps {
  children: React.ReactNode;
}
const Head: React.FC<HeadProps> = ({ children }) => {
  const {
    displayMode: { displayMode },
  } = useContext(appContext);
  return <ComponentBody displayMode={displayMode}>{children}</ComponentBody>;
};
export default Head;
const ComponentBody = styled.div<{ displayMode: string }>`
  position: relative;
  box-sizing: border-box;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0.8rem 5%;
  background-color: ${({ displayMode }) =>
    displayMode === "light"
      ? `hsla(40, 76%, 69%, 0.8)`
      : `hsla(261, 16%, 40%, 0.8)`};
  backdrop-filter: blur(10px);
  width: 100%;
  border-radius: 0 0 15px 15px;
  border-bottom: 1px solid
    ${({ displayMode }) =>
      displayMode === "light" ? `hsla(0, 2%, 88%, 1)` : `hsla(0, 0%, 37%, 1)`};
  box-shadow: ${({ displayMode }) =>
    `0px 4px 4px hsla(0, 0%, ${displayMode === "light" ? 0 : 100}%, 0.25)`};
`;
