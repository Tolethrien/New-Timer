import { useContext } from "react";
import { appContext } from "../../global/provider";

import styled from "styled-components";
//=======TYPES=============
interface LineDeviderProps {
  width: number;
  thickness: number;
  margin?: number;
}
interface StyleProps {
  width: number;
  thickness: number;
  margin: number;
  color: string;
}
//=======COMPONENT=============
/**
 *@desc styled devider component
 * @param width width in % related to the parent element
 * @param margin  top&bottom margin in % (optional)
 * @param thickness thickness of devider in pixels
 * @returns JSX div styled element
 */
const LineDevider: React.FC<LineDeviderProps> = ({
  width,
  margin,
  thickness,
}) => {
  const {
    text: { textColor },
  } = useContext(appContext);

  return (
    <Wrap
      width={width}
      margin={margin ? margin : 0}
      thickness={thickness}
      color={textColor}
    ></Wrap>
  );
};
export default LineDevider;
//=======STYLE=============
const Wrap = styled.div<StyleProps>`
  width: ${({ width }) => width}%;
  height: ${({ thickness }) => thickness}px;
  background: linear-gradient(
    180deg,
    ${({ color }) => color} 0%,
    ${({ color }) => color}10 100%
  );
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  margin: ${({ margin }) => margin}% 0;
`;
