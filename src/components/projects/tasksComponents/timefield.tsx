import styled, { StyledComponent } from "styled-components";
import TimeF from "react-simple-timefield-for-react18-temp";
import { useState, useRef, useContext } from "react";
import { updateTask } from "../../../API/handleDocs";
import { useParams } from "react-router-dom";
import {
  conevrTimeToNumber,
  conevrtTimeToString,
} from "../../utils/timeConverters";
interface TimeFieldProps {
  extendedStyle?: StyledComponent<"div", any, {}, never>;
  expectedTime: number;
}
const TimeField: React.FC<TimeFieldProps> = ({
  extendedStyle,
  expectedTime,
}) => {
  const [time, setTime] = useState(conevrtTimeToString(expectedTime));
  const fieldRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();

  const TimeUpdate = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      updateTask(id!, { timeExpected: conevrTimeToNumber(time) });
      let temp = fieldRef!.current!.firstChild! as HTMLInputElement;
      temp.blur();
    }
  };
  return (
    <ComponentBody
      as={extendedStyle}
      ref={fieldRef}
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
const ComponentBody = styled.div``;

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
