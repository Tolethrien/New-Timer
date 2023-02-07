import styled from "styled-components";

interface StyleProps {
  size?: number;
  weight?: number;
  margin?: string;
}

const DisplayText = styled.p<StyleProps>`
  font-style: normal;
  width: 100%;
  font-size: ${({ size }) => size ?? 1}rem;
  font-weight: ${({ weight }) => weight};
  margin: ${({ margin }) => margin};
`;
export default DisplayText;
