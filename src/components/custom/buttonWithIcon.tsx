import { useContext } from "react";
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
    getColor: { borderColor, shadowColor, iconColor },
  } = useTheme();
  return (
    <ComponentBody
      onClick={onClick}
      ref={reference}
      as={extendedStyle}
      borderColor={borderColor}
      shadowColor={shadowColor}
      noShadow={noShadow}
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
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: 1% 2%;
  border: ${({ borderColor }) => `1px solid ${borderColor}`};
  background-color: hsla(0, 0%, 87%, 0.22);
  box-shadow: ${({ shadowColor, noShadow }) =>
    !noShadow && `0px 4px 4px ${shadowColor}`};
  color: inherit;
  font-size: 1rem;
  font-weight: 400;
  backdrop-filter: blur(15px);
  white-space: nowrap;
  transition: 0.5s;

  cursor: pointer;
`;
const ButtonIcon = styled.img<{ iconColor: string }>`
  width: 1rem;
  height: 1rem;
  padding-right: 0.4rem;
  transition: 0.5s;
  filter: ${({ iconColor }) => iconColor};
`;
