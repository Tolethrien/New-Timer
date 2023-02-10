import styled, { StyledComponent } from "styled-components";
import useUserAuth from "../hooks/useUserAuth";
import useTheme from "../hooks/useTheme";

interface HeadProps {
  children?: React.ReactNode;
  extendedStyle?: StyledComponent<"div", any, {}, never>;
}
const Head: React.FC<HeadProps> = ({ children, extendedStyle }) => {
  const {
    getColor: {
      appColorPrimary,
      appColorSecondary,
      borderColor,
      dynamicShadowColor,
    },
  } = useTheme();
  const currentUser = useUserAuth();
  const componentColor = currentUser ? appColorPrimary : appColorSecondary;
  document
    .querySelector('meta[name="theme-color"]')!
    .setAttribute("content", componentColor);
  return (
    <ComponentBody
      bodyColor={componentColor}
      borderColor={borderColor}
      shadowColor={dynamicShadowColor}
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 5%;
  border-radius: 0 0 15px 15px;
  border-bottom: 1px solid ${({ borderColor }) => borderColor};
  background-color: ${({ bodyColor }) => bodyColor};
  backdrop-filter: blur(10px);
  box-shadow: ${({ shadowColor }) => `0px 4px 4px ${shadowColor}`};
  transition: 0.5s;
`;
