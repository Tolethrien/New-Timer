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
    text: { textColor },
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
      hue={textColor}
    ></ComponentBody>
  );
};
export default TaskDescriptionBox;

const ComponentBody = styled.textarea<{ minHeight: number; hue: number }>`
  width: 95%;
  height: ${({ minHeight }) => minHeight}px;
  background-color: hsla(0, 0%, 100%, 0.17);
  backdrop-filter: blur(20px);
  border: 1px solid hsla(162, 50%, 86%, 1);
  box-shadow: 0px 0px 10px -4px hsla(0, 0%, 0%, 1);
  resize: none;
  border-radius: 5px;
  padding: 0.3rem 0.3rem;
  font-size: 1.1rem;
  color: ${({ hue }) => `hsla(0, 0%, ${hue}%, 1)`};

  :focus {
    outline: none;
  }
`;
