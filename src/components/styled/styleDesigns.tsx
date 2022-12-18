import styled from "styled-components";
//=======TS============================
interface TextProps {
  padding: string;
  margin: string;
  weight: number;
  size: number;
}
//======DATA==========================
const textSizes: { [key: number]: string } = {
  1: "12px",
  2: "16px",
  3: "18px",
  4: "20px",
  5: "24px",
  6: "28px",
};
const PaddingsAndMargins: { [key: number]: string } = {
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "24px",
  6: "32px",
  7: "48px",
};

//===Components=======================
export const Text = styled.p<TextProps>`
  font-family: "roboto";
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  font-weight: ${({ weight }) => weight};
  font-size: ${({ size }) => textSizes[size]};
`;
