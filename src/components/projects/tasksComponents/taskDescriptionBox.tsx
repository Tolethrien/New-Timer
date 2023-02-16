import styled from "styled-components";
import { updateTask } from "../../../API/handleDocs";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import useTheme from "../../hooks/useTheme";
import { vibrate } from "../../utils/vibrate";
interface TaskDescriptionBoxProps {
  value: string;
  minHeight?: number;
}
const TaskDescriptionBox: React.FC<TaskDescriptionBoxProps> = ({
  value,
  minHeight = 100,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [textValue, settextValue] = useState(value as string);
  const { id } = useParams();
  const {
    getColor: { itemCardColor, borderColor, textColorNormal },
  } = useTheme();

  const updateDocText = () => {
    vibrate("short");
    updateTask(id!, { desc: textValue });
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef.current.scrollHeight;
      if (scrollHeight > minHeight) {
        textAreaRef.current.style.height = scrollHeight + "px";
      } else {
        textAreaRef.current.style.height = minHeight + "px";
      }
    }
  });

  return (
    <ComponentBody
      onChange={(e) => settextValue(e.target.value)}
      placeholder="Description"
      ref={textAreaRef}
      rows={1}
      height={minHeight}
      value={textValue}
      borderColor={borderColor}
      textColor={textColorNormal}
      onBlur={() => updateDocText()}
      bodyColor={itemCardColor}
    ></ComponentBody>
  );
};
export default TaskDescriptionBox;

const ComponentBody = styled.textarea<{
  height: number;
  bodyColor: string;
  borderColor: string;
  textColor: string;
}>`
  width: 97%;
  height: ${({ height }) => height}px;
  background-color: ${({ bodyColor }) => bodyColor};
  backdrop-filter: blur(20px);
  border: ${({ borderColor }) => borderColor};
  outline: none;
  resize: none;
  border-radius: 5px;
  padding: 0.3rem 0.3rem;
  font-size: 1.1rem;
  color: ${({ textColor }) => textColor};
  :focus {
    outline: none;
  }
`;
