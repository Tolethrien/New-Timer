import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import ButtonImg from "../../styled/buttonImg";
import { Edit, CheckBoxEmpty, CheckBoxFill, Trash } from "../../utils/icons";
import { updateCheckboxes } from "../../../API/handleDocs";
interface CheckBoxProps {
  checkboxData: [string, boolean];
  id: string | undefined;
}
const CheckBox: React.FC<CheckBoxProps> = ({ checkboxData, id }) => {
  const [name, value] = checkboxData;
  const [isChecked, setIsChecked] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  const [test, settest] = useState("s");
  const [temperaryName, settemperaryName] = useState(name);
  const focusRef = useRef<HTMLParagraphElement>(null);
  const componentRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (e: any) => {
    if (!componentRef.current?.contains(e.target)) {
      focusRef!.current!.innerText = temperaryName;
      setIsEditing(false);
    }
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
    <Wrap ref={componentRef}>
      <Box
        checked={isChecked}
        type="checkbox"
        icon={isChecked ? CheckBoxFill : CheckBoxEmpty}
        onChange={() => updateCheckboxes(id!, name, value)}
      ></Box>
      <BoxDescDisplay
        contentEditable={isEditing}
        suppressContentEditableWarning={true}
        ref={focusRef}
        onKeyDown={(e) =>
          e.keyCode === 13 &&
          (alert(e.code),
          setIsEditing(false),
          settemperaryName(focusRef!.current!.innerText))
        }
      >
        {temperaryName}
        {test}
      </BoxDescDisplay>
      <ButtonImg
        src={isEditing ? Trash : Edit}
        size={[15, 15]}
        margin="0 5% 0 0"
        onClick={() => (isEditing ? console.log("delete") : setIsEditing(true))}
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
const Box = styled.input<{ checked: boolean; icon: string }>`
  appearance: none;
  width: 1rem;
  height: 1rem;
  margin-left: 2%;

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
