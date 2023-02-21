import styled from "styled-components";
import React, { useEffect, useState, useRef } from "react";
import { Edit } from "../utils/icons";
import { updateProject, updateTask } from "../../API/handleDocs";
import { useParams } from "react-router-dom";
import ButtonAsIcon from "./buttonAsIcon";
import focusOnEndOfLine from "../projects/utils/focusOnEndOfLine";
import { useClickOutside } from "../hooks/useClickOutside";
interface EditableTitleProps {
  text: string;
}

const EditableTitle: React.FC<EditableTitleProps> = ({ text }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [route, id] = useParams()["*"]!.split("/")!;
  const paragraphfocusRef = useRef<HTMLParagraphElement>(null);

  const componentRef = useClickOutside({
    state: isEditing,
    onClickOutside: () => {
      paragraphfocusRef.current!.innerText = text;
      setIsEditing(false);
    },
  });

  const updateName = () => {
    if (paragraphfocusRef.current?.innerText === "") {
      paragraphfocusRef.current.innerText = text;
      setIsEditing(false);
      return;
    }
    if (route === "task")
      updateTask(id, { name: paragraphfocusRef!.current!.innerText });
    else if (route === "project") {
      updateProject(id, { name: paragraphfocusRef!.current!.innerText });
    }
    setIsEditing(false);
  };

  useEffect(() => {
    isEditing && focusOnEndOfLine(paragraphfocusRef);
  }, [isEditing]);

  return (
    <ComponentBody ref={componentRef}>
      <NameEditable
        contentEditable={isEditing}
        suppressContentEditableWarning={true}
        onKeyDown={(e) => e.key === "Enter" && updateName()}
        ref={paragraphfocusRef}
      >
        {text}
      </NameEditable>
      <ButtonAsIcon
        src={Edit}
        size={[1, 1]}
        margin="0 0 0 5%"
        animation="scale"
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
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
