import styled from "styled-components";
import React, { useEffect, useState, useRef, useContext } from "react";
import { Edit } from "../utils/icons";
import { updateProject, updateTask } from "../../API/handleDocs";
import { useParams } from "react-router-dom";
import ButtonAsIcon from "../styled/buttonAsIcon";
import focusOnEndOfLine from "../projects/utils/focusOnEndOfLine";
interface EditableTitleProps {
  text: string;
}
const EditableTitle: React.FC<EditableTitleProps> = ({ text }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const paragraphfocusRef = useRef<HTMLParagraphElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [route, id] = useParams()["*"]!.split("/");

  const handleClickOutside = (event: any) => {
    if (!componentRef.current?.contains(event.target)) {
      paragraphfocusRef.current!.innerText = text;
      setIsEditing(false);
    }
  };
  const updateName = () => {
    if (paragraphfocusRef.current?.innerText === "") {
      paragraphfocusRef.current.innerText = text;
      setIsEditing(false);
      return;
    }
    if (route === "task")
      updateTask(id!, { name: paragraphfocusRef!.current!.innerText });
    else if (route === "project") {
      updateProject(id!, { name: paragraphfocusRef!.current!.innerText });
    }
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing) {
      focusOnEndOfLine(paragraphfocusRef);
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isEditing]);
  return (
    <ComponentBody ref={componentRef}>
      <NameEditable
        contentEditable={isEditing}
        suppressContentEditableWarning={true}
        onKeyDown={(e) => e.key === "Enter" && updateName()}
        ref={paragraphfocusRef}
      >
        {text.length > 20 && !isEditing ? text.slice(0, 20) + "..." : text}
      </NameEditable>
      <ButtonAsIcon
        src={Edit}
        size={[1, 1]}
        margin="0 0 0 5%"
        onClick={() => setIsEditing((prev) => !prev)}
      ></ButtonAsIcon>
    </ComponentBody>
  );
};
export default EditableTitle;
const ComponentBody = styled.div`
  display: flex;
  flex-grow: 1;
  max-width: 75%;
`;
const NameEditable = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  outline: none;
  width: fit-content;
  white-space: nowrap;
  overflow: hidden;
`;
