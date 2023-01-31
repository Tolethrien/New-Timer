import styled, { StyledComponent } from "styled-components";
import useUserAuth from "../hooks/useUserAuth";
import useTheme from "../hooks/useTheme";

interface HeadProps {
  children?: React.ReactNode;
  extendedStyle?: StyledComponent<"div", any, {}, never>;
}
const Head: React.FC<HeadProps> = ({ children, extendedStyle }) => {
  const {
    getColor: { appColorPrimary, appColorSecondary, borderColor, shadowColor },
  } = useTheme();
  const currentUser = useUserAuth();
  document
    .querySelector('meta[name="theme-color"]')!
    .setAttribute("content", currentUser ? appColorPrimary : appColorSecondary);
  return (
    <ComponentBody
      bodyColor={currentUser ? appColorPrimary : appColorSecondary}
      borderColor={borderColor}
      shadowColor={shadowColor}
      as={extendedStyle}
    >
      {children}
    </ComponentBody>
  );
};
export default Head;
const ComponentBody = styled.div<{
  bodyColor: string;
  borderColor: string;
  shadowColor: string;
}>`
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
  transition: 0.5s;

  border-bottom: 1px solid ${({ borderColor }) => borderColor};
  box-shadow: ${({ shadowColor }) => `0px 4px 4px ${shadowColor}`};
`;
