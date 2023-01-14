import { useContext } from "react";
import styled from "styled-components";
import { appContext } from "../providers/appProvider";
interface ButtonAsIconProps {
  src: string;
  margin?: string;
  size?: number[];
  position?: string;
  onClick: () => void;
  children?: React.ReactNode;
  reference?: React.RefObject<HTMLButtonElement>;
}
const ButtonAsIcon: React.FC<ButtonAsIconProps> = ({
  src,
  margin,
  position,
  size,
  onClick,
  children,
  reference,
}) => {
  const {
    displayMode: { displayMode },
  } = useContext(appContext);
  return (
    <ComponentBody
      onClick={onClick}
      src={src}
      margin={margin}
      size={size}
      position={position}
      ref={reference}
      displayMode={displayMode}
    ></ComponentBody>
  );
};
export default ButtonAsIcon;
export const ComponentBody = styled.button<{
  src: string;
  margin?: string;
  size?: number[];
  position?: string;
  displayMode: string;
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
  ${({ displayMode }) =>
    displayMode === "light"
      ? `
  filter: brightness(0) invert(0.3);
  `
      : `
  filter: brightness(0) invert(0.7);
      `}
`;
