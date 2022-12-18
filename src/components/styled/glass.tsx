import styled, { css } from "styled-components";
import { useContext } from "react";
import { appContext } from "../providers/appProvider";

interface GlassProps {
  children?: React.ReactNode;
  size: "inline" | "full";
  padding?: string;
  margin?: string;
  direction?: string;
}
interface styleProps {
  color: string;
  size: "inline" | "full";
  padding?: string;
  margin?: string;
  direction?: string;
}
const Glass: React.FC<GlassProps> = ({
  size,
  children,
  padding,
  margin,
  direction,
}) => {
  const {
    primary: { primaryColor },
  } = useContext(appContext);
  return (
    <GlassStyle
      size={size}
      color={primaryColor}
      padding={padding}
      margin={margin}
      direction={direction}
    >
      {children}
    </GlassStyle>
  );
};

export default Glass;

const GlassStyle = styled.div<styleProps>`
  position: relative;
  display: flex;
  flex-direction: ${({ direction }) => direction ?? "column"};
  align-items: center;
  justify-content: center;
  height: fit-content;
  flex-shrink: 0;
  background-color: ${({ color }) => color};
  min-height: 20px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid #9c9c9c;
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  ${({ size }) => {
    if (size === "full")
      return css`
        width: 100%;
      `;
    if (size === "inline")
      return css`
        width: 90%;
        border-radius: 10px;
      `;
  }};
`;
