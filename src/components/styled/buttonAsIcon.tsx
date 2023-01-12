import styled from "styled-components";
export const ButtonAsIcon = styled.button<{
  src: string;
  margin?: string;
  size?: number[];
  position?: string;
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
`;
