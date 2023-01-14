import styled, { keyframes } from "styled-components";
import { updateTask } from "../../../API/handleDocs";
import { useState, useRef, useEffect, useContext } from "react";
import { TextEdit } from "../../utils/icons";
import { appContext } from "../../providers/appProvider";
import { useParams } from "react-router-dom";
interface TaskDescriptionBoxProps {
  value: string;
  minHeight?: number;
}
interface StyleProps {}
const TaskDescriptionBox: React.FC<TaskDescriptionBoxProps> = ({
  value,
  minHeight = 100,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [textValue, settextValue] = useState(value);
  const { id } = useParams();

  const {
    displayMode: { displayMode },
  } = useContext(appContext);
  const updateDocText = () => {
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
  }, [textAreaRef.current]);

  return (
    <ComponentBody
      onChange={(e) => settextValue(e.target.value)}
      placeholder="Description"
      ref={textAreaRef}
      rows={1}
      minHeight={minHeight}
      value={textValue}
      onBlur={() => updateDocText()}
      displayMode={displayMode}
    ></ComponentBody>
  );
};
export default TaskDescriptionBox;

const ComponentBody = styled.textarea<{
  minHeight: number;
  displayMode: string;
}>`
  width: 95%;
  height: ${({ minHeight }) => minHeight}px;
  background-color: ${({ displayMode }) =>
    `hsla(0, 0%, ${displayMode === "light" ? 100 : 35}%, 0.6)`};
  backdrop-filter: blur(20px);
  border: ${({ displayMode }) =>
    `1px solid hsla(162, 50%, 86%, ${displayMode === "light" ? 1 : 0.2})`};
  /* border: none; */
  outline: none;
  /* box-shadow: 0px 0px 10px -4px hsla(0, 0%, 0%, 1); */
  resize: none;
  border-radius: 5px;
  padding: 0.3rem 0.3rem;
  font-size: 1.1rem;
  color: ${({ displayMode }) =>
    `hsla(0, 0%, ${displayMode === "light" ? 20 : 90}%, 1)`};

  :focus {
    outline: none;
  }
`;
