import styled, { StyledComponent } from "styled-components";
import useTheme from "../hooks/useTheme";

interface ButtonWithIconProps {
  src: string;
  alt: string;
  onClick: (
    event?: React.MouseEvent<any>
  ) => void | React.Dispatch<React.SetStateAction<any>>;
  text: string;
  noShadow?: boolean;
  reference?: React.MutableRefObject<any>;
  extendedStyle?: StyledComponent<"button", any, {}, never>;
}
const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
  src,
  alt,
  onClick,
  text,
  reference,
  extendedStyle,
  noShadow = false,
}) => {
  const {
    getColor: {
      borderColor,
      dynamicShadowColor,
      iconColor,
      buttonWithIconColor,
    },
  } = useTheme();
  return (
    <ComponentBody
      onClick={onClick}
      ref={reference}
      as={extendedStyle}
      borderColor={borderColor}
      shadowColor={dynamicShadowColor}
      noShadow={noShadow}
      buttonWithIconColor={buttonWithIconColor}
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
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.2rem 0.6rem;
  border-radius: 5px;
  border: ${({ borderColor }) => `1px solid ${borderColor}`};
  background-color: ${({ buttonWithIconColor }) => buttonWithIconColor};
  box-shadow: ${({ shadowColor, noShadow }) =>
    !noShadow && `0px 4px 4px ${shadowColor}`};
  backdrop-filter: blur(15px);
  color: inherit;
  font-size: 1rem;
  font-weight: 400;
  white-space: nowrap;
  transition: 0.5s;
  cursor: pointer;
`;
const ButtonIcon = styled.img<{ iconColor: string }>`
  width: 1rem;
  height: 1rem;
  transition: 0.5s;
  filter: ${({ iconColor }) => iconColor};
`;
