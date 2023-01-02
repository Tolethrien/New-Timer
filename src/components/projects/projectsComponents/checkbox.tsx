import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import ButtonImg from "../../styled/buttonImg";
import { Edit, CheckBoxEmpty, CheckBoxFill, Trash } from "../../utils/icons";
interface CheckBoxProps {}
const CheckBox: React.FC<CheckBoxProps> = (props) => {
  const [isChecked, setIsChecked] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState("drama");
  const focusRef = useRef<HTMLParagraphElement>(null);
  const componentRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (e: any) => {
    if (!componentRef.current?.contains(e.target)) {
      focusRef!.current!.innerText = value;
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
        onChange={() => setIsChecked((prev) => !prev)}
      ></Box>
      <BoxDescDisplay
        contentEditable={isEditing}
        suppressContentEditableWarning={true}
        ref={focusRef}
        onKeyDown={(e) =>
          e.code === "Enter" &&
          (setIsEditing(false), setValue(focusRef!.current!.innerText))
        }
      >
        {value}
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
