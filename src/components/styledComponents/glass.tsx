import styled, { css } from "styled-components";
import { useContext } from "react";
import { appContext } from "../../global/provider";

interface GlassProps {
  children?: React.ReactNode;
  size: "inline" | "full";
  padding?: string;
}
interface styleProps {
  color: string;
  size: "inline" | "full";
  padding?: string;
}
const Glass: React.FC<GlassProps> = ({ size, children, padding }) => {
  const {
    primary: { primaryColor },
  } = useContext(appContext);
  return (
    <GlassStyle size={size} color={primaryColor} padding={padding}>
      {children}
    </GlassStyle>
  );
};

export default Glass;

const GlassStyle = styled.div<styleProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: fit-content;
  background-color: ${({ color }) => color};
  min-height: 20px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid #9c9c9c;
  padding: ${({ padding }) => padding};
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
