import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import { Edit } from "../utils/icons";
import { updateProject, updateTask } from "../../API/handleDocs";
import { useParams } from "react-router-dom";
interface EditableTextProps {
  text: string;
}
interface StyleProps {}
const EditableText: React.FC<EditableTextProps> = ({ text }) => {
  const focusRef = useRef<HTMLParagraphElement>(null);
  const componentRef = useRef<HTMLParagraphElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const temperaryText = text;
  const [route, id] = useParams()["*"]!.split("/");
  const handleClickOutside = (e: any) => {
    if (!componentRef.current?.contains(e.target)) {
      focusRef!.current!.innerText = temperaryText;
      setIsEditing(false);
    }
  };
  const updateName = () => {
    if (focusRef!.current!.innerText === "") {
      focusRef!.current!.innerText = temperaryText;
      setIsEditing(false);
      return;
    }
    if (route === "task")
      updateTask(id!, { name: focusRef!.current!.innerText });
    if (route === "project")
      updateProject(id!, { name: focusRef!.current!.innerText });
    setIsEditing(false);
  };
  useEffect(() => {
    if (isEditing) {
      const selection = window.getSelection();
      const range = document.createRange();
      selection?.removeAllRanges();
      range.selectNodeContents(focusRef.current!);
      range.collapse(false);
      selection?.addRange(range);
      document.addEventListener("click", handleClickOutside);
      focusRef.current?.focus();
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isEditing]);
  return (
    <NameSlot ref={componentRef}>
      <NameEditable
        contentEditable={isEditing}
        suppressContentEditableWarning={true}
        onKeyDown={(e) => e.key === "Enter" && updateName()}
        ref={focusRef}
      >
        {text.length > 20 && !isEditing ? text.slice(0, 20) + "..." : text}
      </NameEditable>
      <ButtonImg
        src={Edit}
        size={[15, 15]}
        margin="0 0 0 5%"
        onClick={() => setIsEditing((prev) => !prev)}
      ></ButtonImg>
    </NameSlot>
  );
};
export default EditableText;
const NameEditable = styled.p`
  outline: none;
  color: black;
  font-size: 1.5rem;
  font-weight: 600;
  width: fit-content;
  white-space: nowrap;
  overflow: hidden;
`;
const NameSlot = styled.div`
  max-width: 75%;
  flex-grow: 1;
  display: flex;
`;
const ButtonImg = styled.button<{
  src: string;
  margin?: string;
  size: number[];
}>`
  display: flex;
  align-self: center;
  height: ${({ size }) => size[0]}px;
  width: ${({ size }) => size[1]}px;
  margin: ${({ margin }) => margin};
  background-color: transparent;
  background-image: ${({ src }) => `url(${src})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border: none;
  cursor: pointer;
`;
