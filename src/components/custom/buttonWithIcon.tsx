import styled, { StyledComponent } from "styled-components";
import useTheme from "../hooks/useTheme";
import { vibrate } from "../utils/vibrate";
import {
  ButtonAnimsList,
  AnimationKey,
  ButtonsAnimations,
} from "../styled/animations/buttonsAnimations";
interface ButtonWithIconProps {
  src: string;
  alt: string;
  onClick: (
    event?: React.MouseEvent<any>
  ) => void | React.Dispatch<React.SetStateAction<any>> | Promise<void>;
  text: string;
  noShadow?: boolean;
  animation?: AnimationKey;
  reference?: React.MutableRefObject<any>;
  extendedStyle?: StyledComponent<"button", any, {}, never>;
  extendedProps?: {};
}
const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
  src,
  alt,
  onClick,
  text,
  reference,
  extendedStyle,
  extendedProps,
  animation = "none",
  noShadow = false,
}) => {
  const {
    getColor: {
      borderColor,
      iconColor,
      dynamicShadowColor,
      staticShadowColor,
      buttonWithIconColor,
    },
  } = useTheme();
  const handleClick = () => {
    vibrate("short");
    onClick();
  };
  return (
    <ComponentBody
      onClick={handleClick}
      ref={reference}
      as={extendedStyle}
      borderColor={borderColor}
      shadowColor={dynamicShadowColor}
      noShadow={noShadow}
      buttonWithIconColor={buttonWithIconColor}
      animation={animation}
      anims={ButtonAnimsList}
      {...extendedProps}
    >
      <ButtonIcon src={src} alt={alt} iconColor={iconColor}></ButtonIcon>
      {text}
    </ComponentBody>
  );
};
export default ButtonWithIcon;
const ComponentBody = styled.button<{
  borderColor: string;
  shadowColor: string;
  noShadow: boolean;
  buttonWithIconColor: string;
  isPressed: boolean;
  animation: AnimationKey;
  anims: ButtonsAnimations;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.4rem 0.6rem;
  border-radius: 5px;
  border: ${({ borderColor }) => `1px solid ${borderColor}`};
  background-color: ${({ buttonWithIconColor }) => buttonWithIconColor};
  box-shadow: ${({ shadowColor, noShadow }) =>
    !noShadow && `1px 2px 4px ${shadowColor}`};
  backdrop-filter: blur(15px);
  color: inherit;
  font-size: 1rem;
  font-weight: 400;
  white-space: nowrap;
  transition: 0.5s;
  cursor: pointer;
  :active {
    ${({ animation, anims }) => anims[animation]}
  }
`;
const ButtonIcon = styled.img<{ iconColor: string }>`
  width: 1rem;
  height: 1rem;
  transition: 0.5s;
  filter: ${({ iconColor }) => iconColor};
`;
