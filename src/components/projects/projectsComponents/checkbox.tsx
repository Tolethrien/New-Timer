import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import ButtonImg from "../../styled/buttonImg";
import { Edit, CheckBoxEmpty, CheckBoxFill, Trash } from "../../utils/icons";
import {
  updateCheckbox,
  addNewCheckbox,
  deleteCheckbox,
} from "../../../API/handleDocs";
interface CheckBoxProps {
  template?: boolean;
  closeCardMenu?: React.Dispatch<React.SetStateAction<boolean>>;
  checkboxData?: [string, { createdAt: number; name: string; value: boolean }];
  projectId: string | undefined;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  template,
  closeCardMenu,
  checkboxData,
  projectId,
}) => {
  const [checkboxId, data] = checkboxData ?? [];
  const [isChecked, setIsChecked] = useState(data?.value ?? false);
  const [isEditing, setIsEditing] = useState(!template ? false : true);
  const [temperaryName, settemperaryName] = useState(data?.name);
  const focusRef = useRef<HTMLParagraphElement>(null);
  const componentRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (e: any) => {
    if (!componentRef.current?.contains(e.target)) {
      focusRef!.current!.innerText = temperaryName as string;
      setIsEditing(false);
    }
  };
  const removeCheckbox = () => {
    if (template) closeCardMenu!(false);
    else deleteCheckbox(projectId!, checkboxId!);
  };
  const createNewCheckbox = () => {
    // (setIsEditing(false), settemperaryName(focusRef!.current!.innerText))
    if (template && focusRef!.current!.innerText.length === 0) {
      closeCardMenu!(false);
    } else if (template) {
      setIsEditing(false);
      addNewCheckbox(projectId!, focusRef!.current!.innerText);
      closeCardMenu!(false);
    } else {
      setIsEditing(false);
      updateCheckbox(
        projectId!,
        checkboxId!,
        "name",
        focusRef!.current!.innerText
      );
    }
  };

  useEffect(() => {
    if (isEditing && !template) {
      const selection = window.getSelection();
      const range = document.createRange();
      selection?.removeAllRanges();
      range.selectNodeContents(focusRef.current!);
      range.collapse(false);
      selection?.addRange(range);
      document.addEventListener("click", handleClickOutside);
      focusRef.current?.focus();
    }
    if (template) focusRef.current?.focus();
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isEditing]);
  return (
    <Wrap ref={componentRef}>
      <BoxWrap>
        <Box
          checked={isChecked}
          type="checkbox"
          icon={isChecked ? CheckBoxFill : CheckBoxEmpty}
          onChange={() =>
            !template &&
            updateCheckbox(projectId!, checkboxId!, "value", !data!.value!)
          }
        ></Box>
      </BoxWrap>
      <BoxDescDisplay
        contentEditable={isEditing}
        suppressContentEditableWarning={true}
        ref={focusRef}
        onKeyDown={(e) => e.key === "Enter" && createNewCheckbox()}
      >
        {temperaryName}
      </BoxDescDisplay>
      <ButtonImg
        src={isEditing ? Trash : Edit}
        size={[15, 15]}
        margin="0 2%"
        onClick={() => (isEditing ? removeCheckbox() : setIsEditing(true))}
      ></ButtonImg>
    </Wrap>
  );
};
export default CheckBox;
const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  color: black;
  padding: 5px 0;
  margin-top: 0.5%;
  background-color: hsla(169, 77%, 88%, 1);
  border-radius: 5px;
  filter: drop-shadow(0px 4px 4px hsla(0, 0%, 0%, 0.25));
`;
const BoxWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 2%;
`;
const Box = styled.input<{ checked: boolean; icon: string }>`
  appearance: none;
  width: 1rem;
  height: 1rem;

  background: ${({ icon }) => `url(${icon})`};
  background-size: cover;
  cursor: pointer;
`;

const BoxDescDisplay = styled.p`
  justify-self: flex-start;
  flex-grow: 1;
  font-size: 1.2rem;
  font-weight: 500;
  margin-left: 2.5%;
  :focus {
    outline: none;
  }
`;
