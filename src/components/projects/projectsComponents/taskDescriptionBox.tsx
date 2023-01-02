import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { Add } from "../../utils/icons";
interface TaskDescriptionBoxProps {}
interface StyleProps {}
const TaskDescriptionBox: React.FC<TaskDescriptionBoxProps> = (props) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const minHeight = 100;
  const [value, setValue] = useState("");
  const [isInFocus, setisInFocus] = useState(false);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;
    setValue(val);
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
  }, [textAreaRef, value]);

  return (
    <>
      <DescriptionBox
        onChange={handleChange}
        placeholder="Description"
        ref={textAreaRef}
        rows={1}
        minHeight={minHeight}
        value={value}
      ></DescriptionBox>
      {isInFocus && (
        <SaveButton src={Add} onClick={() => setisInFocus(false)}>
          Save
        </SaveButton>
      )}
    </>
  );
};
export default TaskDescriptionBox;
const DescriptionBox = styled.textarea<{ minHeight: number }>`
  position: relative;
  width: 95%;
  height: ${({ minHeight }) => minHeight}px;
  background-color: hsla(0, 0%, 100%, 0.17);
  backdrop-filter: blur(20px);
  border: 1px solid hsla(162, 50%, 86%, 1);
  box-shadow: 0px 0px 10px -4px black;
  resize: none;
  border-radius: 5px;
  margin-top: 0.5%;
  font-weight: 500;
  font-size: 1.1rem;
  :focus {
    outline: none;
  }
`;
const SaveButton = styled.button<{ src: string }>`
  position: absolute;
  right: 50%;
  bottom: -1rem;
  height: 20px;
  background-color: transparent;
  background-image: ${({ src }) => `url(${src})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border: none;
  cursor: pointer;
  animation: wiggle 2.5s infinite;
  @keyframes wiggle {
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
      transform: rotate(-5deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
`;
