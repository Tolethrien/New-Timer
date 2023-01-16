import styled, { StyledComponent } from "styled-components";
import { useContext } from "react";
import { appContext } from "../providers/appProvider";

interface HeadProps {
  children?: React.ReactNode;
  extendedStyle?: StyledComponent<"div", any, {}, never>;
}
const Head: React.FC<HeadProps> = ({ children, extendedStyle }) => {
  const {
    displayMode: { displayMode },
    currentUser,
  } = useContext(appContext);
  const ComponentBodyColors = {
    login: {
      light: "hsla(359, 70%, 79%, 0.8)",
      dark: "hsla(341, 26%, 22%, 0.8)",
    },
    app: { light: "hsla(40, 76%, 69%, 0.8)", dark: "hsla(261, 16%, 40%, 0.8)" },
  };
  const test = () => {
    if (!currentUser) {
      if (displayMode === "light") {
        return ComponentBodyColors.login.light;
      } else if (displayMode === "dark") {
        return ComponentBodyColors.login.dark;
      }
    } else if (currentUser) {
      if (displayMode === "light") {
        return ComponentBodyColors.app.light;
      } else if (displayMode === "dark") {
        return ComponentBodyColors.app.dark;
      }
    }
  };
  return (
    <ComponentBody
      displayMode={displayMode}
      bodyColor={test()}
      as={extendedStyle}
    >
      {children}
    </ComponentBody>
  );
};
export default Head;
const ComponentBody = styled.div<{ displayMode: string; bodyColor: string }>`
  position: relative;
  box-sizing: border-box;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0.8rem 5%;
  background-color: ${({ bodyColor }) => bodyColor};
  backdrop-filter: blur(10px);
  width: 100%;
  border-radius: 0 0 15px 15px;
  border-bottom: 1px solid
    ${({ displayMode }) =>
      displayMode === "light" ? `hsla(0, 2%, 88%, 1)` : `hsla(0, 0%, 37%, 1)`};
  box-shadow: ${({ displayMode }) =>
    `0px 4px 4px hsla(0, 0%, ${displayMode === "light" ? 0 : 100}%, 0.25)`};
`;
