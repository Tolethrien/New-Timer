import styled from "styled-components";
interface LineDeviderProps {
  width: number;
}
interface StyleProps {
  width: number;
}
const LineDevider: React.FC<LineDeviderProps> = ({ width }) => {
  return <Wrap width={width}></Wrap>;
};
export default LineDevider;
const Wrap = styled.div<StyleProps>`
  width: ${({ width }) => width}%;
  height: 2px;
  background: linear-gradient(180deg, #fffbfb 0%, rgba(255, 251, 251, 0) 100%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  margin: 10px 0;
`;
