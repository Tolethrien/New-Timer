import styled, { StyledComponent } from "styled-components";
import { useContext } from "react";
import { appContext } from "../providers/appProvider";
interface ChildrenProps {
  children: React.ReactNode;
}
interface StyleProps {
  size?: number;
  weight?: number;
  margin?: string;
  extendedStyle?: StyledComponent<"p", any, {}, never>;
  extendedProps?: {};
}
type DisplayTextProps = ChildrenProps & StyleProps;
const DisplayText: React.FC<DisplayTextProps> = ({
  children,
  size = 1,
  weight,
  margin,
  extendedStyle,
}) => {
  return (
    <ComponentBody
      size={size}
      weight={weight}
      margin={margin}
      as={extendedStyle}
    >
      {children}
    </ComponentBody>
  );
};
export default DisplayText;
const ComponentBody = styled.p<StyleProps>`
  font-style: normal;
  width: 100%;
  font-size: ${({ size }) => size}rem;
  font-weight: ${({ weight }) => weight};
  margin: ${({ margin }) => margin};
`;
