import styled from "styled-components";
import TimeF from "react-simple-timefield-for-react18-temp";
import { useState, useRef } from "react";
import { updateTask } from "../../API/handleDocs";
import { useParams } from "react-router-dom";
import { ConvertToNumber, ConvertToStringTime } from "./convertToTime";
import FindData from "./findData";
import { TasksData } from "../../API/getUserData";
interface TimeFieldProps {}
interface StyleProps {}
const TimeField: React.FC<TimeFieldProps> = (props) => {
  const { id } = useParams();
  const task = FindData(id) as TasksData;
  const [time, setTime] = useState(
    task ? ConvertToStringTime(task.data.totalTime) : "00:00:00"
  );
  return (
    <Wrap onBlur={() => updateTask(id!, { totalTime: ConvertToNumber(time) })}>
      <NumberInput
        as={TimeF}
        value={time}
        onChange={(_, value) => setTime(value)}
        colon=":"
        showSeconds={true}
      />
    </Wrap>
  );
};
export default TimeField;
const Wrap = styled.div``;

const NumberInput = styled.input<StyleProps>`
  background: transparent;
  border: none;
  :focus {
    outline: none;
  }
`;
