import { useContext } from "react";
import styled, { StyledComponent } from "styled-components";
import useTheme from "../hooks/useTheme";
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
    getColor: { iconColor },
  } = useTheme();
  return (
    <ComponentBody
      src={src}
      alt={alt}
      iconColor={iconColor}
      size={size}
      absolute={absolute}
    ></ComponentBody>
  );
};
export default DisplayIcon;
const ComponentBody = styled.img<{
  iconColor: string;
  size: [number, number];
  absolute?: { x: string; y: string };
}>`
  height: ${({ size }) => size[0]}rem;
  width: ${({ size }) => size[1]}rem;
  filter: ${({ iconColor }) => iconColor};
  ${({ absolute }) =>
    absolute &&
    `
  position: absolute;
  ${absolute.x};
  ${absolute.y};
  `};
`;
