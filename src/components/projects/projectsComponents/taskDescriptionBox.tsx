import styled, { keyframes } from "styled-components";
import { updateTask } from "../../../API/handleDocs";
import { useState, useRef, useEffect } from "react";
import { TextEdit } from "../../utils/icons";
interface TaskDescriptionBoxProps {
  value: string;
  id: string | undefined;
  minHeight?: number;
}
interface StyleProps {}
const TaskDescriptionBox: React.FC<TaskDescriptionBoxProps> = ({
  value,
  id,
  minHeight = 100,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  // const minHeight = minHeight;
  const [temperaryNewText, setTemperaryNewText] = useState(value);
  const [isInFocus, setisInFocus] = useState(false);

  const handleChangeText = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;
    setTemperaryNewText(val);
  };

  const updateDocText = () => {
    updateTask(id!, { desc: temperaryNewText });
    setisInFocus(false);
  };
  useEffect(() => {
    if (textAreaRef.current) {
      if (document.activeElement === textAreaRef.current) {
        setisInFocus(true);
      }
      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef.current.scrollHeight;
      if (scrollHeight > minHeight) {
        textAreaRef.current.style.height = scrollHeight + "px";
      } else {
        textAreaRef.current.style.height = minHeight + "px";
      }
    }
  }, [textAreaRef, temperaryNewText]);

  return (
    <Wrap>
      <DescriptionBox
        onChange={handleChangeText}
        placeholder="Description"
        ref={textAreaRef}
        rows={1}
        minHeight={minHeight}
        value={temperaryNewText}
      ></DescriptionBox>
      {isInFocus && (
        <SaveButton onClick={() => updateDocText()}>
          <SaveButtonImg src={TextEdit} alt=""></SaveButtonImg>
          Save
        </SaveButton>
      )}
    </Wrap>
  );
};
export default TaskDescriptionBox;
const Wrap = styled.div`
  position: relative;
`;
const DescriptionBox = styled.textarea<{ minHeight: number }>`
  /* position: relative; */
  width: 95%;
  height: ${({ minHeight }) => minHeight}px;
  background-color: hsla(0, 0%, 100%, 0.17);
  backdrop-filter: blur(20px);
  border: 1px solid hsla(162, 50%, 86%, 1);
  box-shadow: 0px 0px 10px -4px black;
  resize: none;
  border-radius: 5px;
  margin-top: 0.5%;
  font-weight: 400;
  padding: 5px 5px;
  font-size: 1.1rem;
  :focus {
    outline: none;
  }
`;

const wiggle = keyframes`
    0% {
      transform: rotate(0deg);

    }
    80% {
      transform: rotate(0deg);

    }
    85% {
      transform: rotate(5deg);

    }
    95% {
      transform:  rotate(-5deg);

    }
    100% {
      transform: rotate(0deg);

    }
`;
const SaveButton = styled.button`
  position: absolute;
  display: flex;
  bottom: -0.5rem;
  right: 3%;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: 1% 2%;
  border: 1px solid hsla(0, 0%, 66%, 1);
  background-color: hsla(0, 0%, 87%, 0.22);
  box-shadow: 0px 4px 4px hsla(0, 0%, 0%, 0.25),
    inset 0px 1px 1px hsla(0, 0%, 100%, 0.25);
  font-size: 1rem;
  backdrop-filter: blur(15px);
  cursor: pointer;
  animation: ${wiggle} 2.5s infinite;
`;
const SaveButtonImg = styled.img`
  width: 15px;
  padding-right: 5px;
`;
