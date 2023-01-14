import { useContext } from "react";
import styled, { StyledComponent } from "styled-components";
import { appContext } from "../providers/appProvider";
interface ButtonWithIconProps {
  src: string;
  alt: string;
  onClick: () => void | React.Dispatch<React.SetStateAction<any>>;
  text: string;
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
}) => {
  const {
    displayMode: { displayMode },
  } = useContext(appContext);
  return (
    <ComponentBody
      onClick={() => onClick()}
      ref={reference}
      as={extendedStyle}
      displayMode={displayMode}
    >
      <ButtonIcon src={src} alt={alt} displayMode={displayMode}></ButtonIcon>
      {text}
    </ComponentBody>
  );
};
export default ButtonWithIcon;
const ComponentBody = styled.button<{ displayMode: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: 1% 2%;
  border: 1px solid hsla(0, 0%, 66%, 1);
  border: ${({ displayMode }) =>
    `1px solid hsla(0, 0%, ${displayMode === "light" ? 66 : 55}%, 1)`};
  background-color: hsla(0, 0%, 87%, 0.22);
  box-shadow: ${({ displayMode }) =>
    `0px 4px 4px hsla(0, 0%, ${displayMode === "light" ? 0 : 100}%, 0.25)`};
  color: inherit;
  font-size: 1rem;
  font-weight: 400;
  backdrop-filter: blur(15px);
  cursor: pointer;
`;
const ButtonIcon = styled.img<{ displayMode: string }>`
  width: 1rem;
  height: 1rem;
  padding-right: 0.4rem;
  ${({ displayMode }) =>
    displayMode === "light"
      ? `
  filter: brightness(0) invert(0.3);
  `
      : `
  filter: brightness(0) invert(0.7);
      `}
`;
