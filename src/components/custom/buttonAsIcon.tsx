import styled, { StyledComponent } from "styled-components";
import useTheme from "../hooks/useTheme";
import {
  AnimationKey,
  ButtonsAnimations,
  ButtonAnimsList,
} from "../styled/animations/buttonsAnimations";
import { vibrate } from "../utils/vibrate";
interface ButtonAsIconProps {
  src: string;
  alt?: string;
  margin?: string;
  size?: number[];
  position?: string;
  onClick: () => void;
  reference?: React.RefObject<HTMLButtonElement>;
  extendedStyle?: StyledComponent<"button", any, {}, never>;
  extendedProps?: {};
  animation?: AnimationKey;
}
const ButtonAsIcon: React.FC<ButtonAsIconProps> = ({
  src,
  alt = "",
  margin,
  position,
  size,
  onClick,
  reference,
  extendedStyle,
  extendedProps,
  animation = "none",
}) => {
  const {
    getColor: { iconColor },
  } = useTheme();

  const handleClick = () => {
    vibrate("short");
    onClick();
  };

  return (
    <ComponentBody
      src={src}
      alt={alt}
      onClick={handleClick}
      margin={margin}
      size={size}
      position={position}
      ref={reference}
      iconColor={iconColor}
      as={extendedStyle}
      animation={animation}
      anims={ButtonAnimsList}
      {...extendedProps}
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
  isPressed: boolean;
  animation: AnimationKey;
  anims: ButtonsAnimations;
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
  transition: 0.5s;
  :active {
    ${({ animation, anims }) => anims[animation]}
  }
`;
