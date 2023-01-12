import styled from "styled-components";
import { useContext } from "react";
import { appContext } from "../providers/appProvider";
interface ChildrenProps {
  children: React.ReactNode;
}
interface StyleProps {
  size?: number;
  weight?: number;
  margin?: string;
}
type DisplayTextProps = ChildrenProps & StyleProps;
const DisplayText: React.FC<DisplayTextProps> = ({
  children,
  size = 1,
  weight,
  margin,
}) => {
  const {
    text: { textColor },
  } = useContext(appContext);
  return (
    <ComponentBody size={size} weight={weight} margin={margin} hue={textColor}>
      {children}
    </ComponentBody>
  );
};
export default DisplayText;
const ComponentBody = styled.p<StyleProps & { hue: number }>`
  font-style: normal;
  width: 100%;
  font-size: ${({ size }) => size}rem;
  font-weight: ${({ weight }) => weight};
  margin: ${({ margin }) => margin};
  color: ${({ hue }) => `hsla(0, 0%, ${hue}%, 1)`};
`;
