import { useContext } from "react";
import styled, { StyledComponent } from "styled-components";
import { appContext } from "../providers/appProvider";
interface DisplayIconProps {
  size?: [number, number];
  src: string;
  alt: string;
  absolute?: { x: string; y: string };
}
const DisplayIcon: React.FC<DisplayIconProps> = ({
  size = [1, 1],
  src,
  alt,
  absolute,
}) => {
  const {
    displayMode: { displayMode },
  } = useContext(appContext);
  return (
    <ComponentBody
      src={src}
      alt={alt}
      displayMode={displayMode}
      size={size}
      absolute={absolute}
    ></ComponentBody>
  );
};
export default DisplayIcon;
const ComponentBody = styled.img<{
  displayMode: string;
  size: [number, number];
  absolute?: { x: string; y: string };
}>`
  height: ${({ size }) => size[0]}rem;
  width: ${({ size }) => size[1]}rem;
  ${({ displayMode }) =>
    displayMode === "light"
      ? `
  filter: brightness(0) invert(0.3);
  `
      : `
  filter: brightness(0) invert(0.7);
      `};
  ${({ absolute }) =>
    absolute &&
    `
  position: absolute;
  ${absolute.x};
  ${absolute.y};
  `};
`;
