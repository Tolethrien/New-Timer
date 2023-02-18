import styled from "styled-components";
import useTheme from "../hooks/useTheme";
import {
  AnimationKey,
  ButtonAnimsList,
  ButtonsAnimations,
} from "../styled/animations/buttonsAnimations";
import { vibrate } from "../utils/vibrate";
interface ClockButtonProps {
  icon: string;
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  animation?: AnimationKey;
}
const ClockButton: React.FC<ClockButtonProps> = ({
  icon,
  onClick,
  disabled = false,
  children,
  animation = "none",
}) => {
  const {
    getColor: { buttonColor, iconColor, dynamicShadowColor },
  } = useTheme();
  const clickCallback = () => {
    vibrate("short");
    onClick();
  };

  return (
    <ComponentBody>
      <Button
        bodyColor={buttonColor}
        iconColor={iconColor}
        shadowColor={dynamicShadowColor}
        img={icon}
        disabled={disabled}
        animation={animation}
        anims={ButtonAnimsList}
        onClick={clickCallback}
      ></Button>
      {children}
    </ComponentBody>
  );
};
export default ClockButton;
const ComponentBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;
const Button = styled.button<{
  img: string;
  bodyColor: string;
  iconColor: string;
  shadowColor: string;
  animation: AnimationKey;
  anims: ButtonsAnimations;
}>`
  position: relative;
  background: ${({ disabled }) =>
    disabled ? `hsla(0, 4%, 85%, 0.2)` : `hsla(0, 4%, 85%, 0.1)`};
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 10px;
  border: 1px solid hsla(0, 4%, 85%, 0.1);
  cursor: ${({ disabled }) => !disabled && "pointer"};
  transition: 0.1s;
  box-shadow: ${({ disabled, shadowColor }) =>
    !disabled
      ? `1px 1px 3px 1px ${shadowColor}`
      : ` inset 1px 1px 3px 1px hsla(0, 0%, 0%, 0.25)`};
  :active {
    filter: invert();
  }
  ::before {
    content: "";
    background: ${({ img }) => `url(${img})`};
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    box-sizing: border-box;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    filter: ${({ disabled, iconColor }) =>
      iconColor + ` opacity(${disabled ? 0.1 : 1})`};
  }
`;
