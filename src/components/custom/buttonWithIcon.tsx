import styled, { StyledComponent } from "styled-components";
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
  return (
    <ComponentBody onClick={() => onClick()} ref={reference} as={extendedStyle}>
      <ButtonIcon src={src} alt={alt}></ButtonIcon>
      {text}
    </ComponentBody>
  );
};
export default ButtonWithIcon;
const ComponentBody = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: 1% 2%;
  border: 1px solid hsla(0, 0%, 66%, 1);
  background-color: hsla(0, 0%, 87%, 0.22);
  box-shadow: 0px 4px 4px hsla(0, 0%, 0%, 0.25),
    inset 0px 1px 1px hsla(0, 0%, 100%, 0.25);
  font-size: 1rem;
  backdrop-filter: blur(15px);
  cursor: pointer;
`;
const ButtonIcon = styled.img`
  width: 15px;
  padding-right: 5px;
`;
