import styled, { StyledComponent } from "styled-components";
import TimeF from "react-simple-timefield-for-react18-temp";
import { useState, useRef } from "react";
import { updateTask } from "../../../API/handleDocs";
import { useParams } from "react-router-dom";
import {
  convertTimeToNumber,
  convertTimeToString,
} from "../../utils/timeConverters";
import useTheme from "../../hooks/useTheme";
import { vibrate } from "../../utils/vibrate";
interface TimeFieldProps {
  extendedStyle?: StyledComponent<"div", any, {}, never>;
  expectedTime: number;
}
const TimeField: React.FC<TimeFieldProps> = ({
  extendedStyle,
  expectedTime,
}) => {
  const [time, setTime] = useState(convertTimeToString(expectedTime));
  const fieldRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();
  const {
    getColor: { taskOptionsForegroundColor },
  } = useTheme();
  const TimeUpdate = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      vibrate("short");
      updateTask(id!, { timeExpected: convertTimeToNumber(time) });
      let inputToBlur = fieldRef!.current!.firstChild! as HTMLInputElement;
      inputToBlur.blur();
    }
  };
  return (
    <ComponentBody
      as={extendedStyle}
      ref={fieldRef}
      taskOptionsForegroundColor={taskOptionsForegroundColor}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => TimeUpdate(e)}
    >
      <NumberInput
        as={TimeF}
        value={time}
        onChange={(_, value) => setTime(value)}
        colon=":"
        showSeconds={true}
      />
    </ComponentBody>
  );
};
export default TimeField;

const ComponentBody = styled.div<{ taskOptionsForegroundColor: string }>`
  background-color: ${({ taskOptionsForegroundColor }) =>
    taskOptionsForegroundColor};
`;

const NumberInput = styled.input`
  background: transparent;
  border: none;
  font-size: inherit;
  font-weight: inherit;
  padding: 0;
  width: fit-content !important;
  text-align: center;
  color: inherit;

  :focus {
    outline: none;
  }
`;
