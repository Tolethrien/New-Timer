import styled, { StyledComponent } from "styled-components";
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
  /* transition: 0.5s; */
`;
