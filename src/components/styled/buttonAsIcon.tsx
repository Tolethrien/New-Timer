import { useContext } from "react";
import styled, { StyledComponent } from "styled-components";
import useTheme from "../hooks/useTheme";
interface ButtonAsIconProps {
  src: string;
  margin?: string;
  size?: number[];
  position?: string;
  onClick: () => void;
  reference?: React.RefObject<HTMLButtonElement>;
  extendedStyle?: StyledComponent<"button", any, {}, never>;
}
const ButtonAsIcon: React.FC<ButtonAsIconProps> = ({
  src,
  margin,
  position,
  size,
  onClick,
  reference,
  extendedStyle,
}) => {
  const {
    getColor: { iconColor },
  } = useTheme();
  return (
    <ComponentBody
      onClick={onClick}
      src={src}
      margin={margin}
      size={size}
      position={position}
      ref={reference}
      as={extendedStyle}
      iconColor={iconColor}
    ></ComponentBody>
  );
};
export default ButtonAsIcon;
export const ComponentBody = styled.button<{
  src: string;
  margin?: string;
  size?: number[];
  position?: string;
  iconColor: string;
}>`
  position: relative;
  display: flex;
  align-self: center;
  height: ${({ size }) => (size && `${size[0]}rem`) ?? "1rem"};
  width: ${({ size }) => (size && `${size[1]}rem`) ?? "1rem"};
  min-width: 0.8rem;
  margin: ${({ margin }) => margin};
  background-color: transparent;
  background-image: ${({ src }) => `url(${src})`};
  background-repeat: no-repeat;
  background-position: ${({ position }) => position ?? "center"};
  background-size: contain;
  border: none;
  cursor: pointer;
  filter: ${({ iconColor }) => iconColor};
`;
