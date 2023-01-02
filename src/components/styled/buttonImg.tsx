import styled from "styled-components";
const ButtonImg = styled.button<{
  src: string;
  margin?: string;
  size: number[];
}>`
  display: flex;
  align-self: center;
  height: ${({ size }) => size[0]}px;
  width: ${({ size }) => size[1]}px;
  margin: ${({ margin }) => margin};
  background-color: transparent;
  background-image: ${({ src }) => `url(${src})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border: none;
  cursor: pointer;
`;
export default ButtonImg;
