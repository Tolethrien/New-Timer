import styled from "styled-components";
import { useState, useEffect, useRef, useContext } from "react";
import { Edit, CheckBoxEmpty, CheckBoxFill, Trash } from "../../../utils/icons";
import { updateCheckbox, deleteCheckbox } from "../../../../API/handleDocs";
import { useParams } from "react-router-dom";
import ButtonAsIcon from "../../../custom/buttonAsIcon";
import focusOnEndOfLine from "../../utils/focusOnEndOfLine";
import useTheme from "../../../hooks/useTheme";
interface CheckBoxProps {
  checkboxData: [string, { createdAt: number; name: string; value: boolean }];
  taskId: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({ checkboxData, taskId }) => {
  const [checkboxId, data] = checkboxData ?? [];
  const [isEditing, setIsEditing] = useState(false);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const componentRef = useRef<HTMLDivElement>(null);
  const {
    getColor: { itemCardColor, iconColor },
  } = useTheme();
  const handleClickOutside = (e: any) => {
    if (!componentRef.current?.contains(e.target)) {
      paragraphRef.current!.innerText = data.name;
      setIsEditing(false);
    }
  };
  const removeCheckbox = () => {
    deleteCheckbox(taskId!, checkboxId!);
  };
  const changeName = () => {
    if (paragraphRef.current?.innerText.length === 0) {
      paragraphRef.current.innerText = data.name;
    } else {
      updateCheckbox(
        taskId!,
        checkboxId!,
        "name",
        paragraphRef.current!.innerText
      );
    }
    setIsEditing(false);
  };
  useEffect(() => {
    if (isEditing) {
      focusOnEndOfLine(paragraphRef);
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isEditing]);
  return (
    <ComponentBody ref={componentRef} bodyColor={itemCardColor}>
      <BoxWrap>
        <Box
          checked={data.value}
          type="checkbox"
          iconColor={iconColor}
          icon={data.value ? CheckBoxFill : CheckBoxEmpty}
          onChange={() =>
            updateCheckbox(taskId!, checkboxId!, "value", !data!.value!)
          }
        ></Box>
      </BoxWrap>
      <BoxDescDisplay
        contentEditable={isEditing}
        suppressContentEditableWarning={true}
        ref={paragraphRef}
        onKeyDown={(e) => e.key === "Enter" && changeName()}
      >
        {data.name}
      </BoxDescDisplay>
      <ButtonAsIcon
        src={isEditing ? Trash : Edit}
        size={[1, 1]}
        margin="0 2%"
        onClick={() => (isEditing ? removeCheckbox() : setIsEditing(true))}
      ></ButtonAsIcon>
    </ComponentBody>
  );
};
export default CheckBox;
const ComponentBody = styled.div<{ bodyColor: string }>`
  display: flex;
  padding-block: 0.5rem;
  margin-bottom: 0.1rem;
  background-color: ${({ bodyColor }) => bodyColor};
  border-radius: 5px;
  backdrop-filter: blur(20px);
  box-shadow: 2px 2px 4px 1px hsla(0, 0%, 0%, 0.25);
`;
const BoxWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 2%;
`;
const Box = styled.input<{
  checked: boolean;
  icon: string;
  iconColor: string;
}>`
  appearance: none;
  width: 1rem;
  height: 1rem;
  background: ${({ icon }) => `url(${icon})`};
  background-size: cover;
  cursor: pointer;
  filter: ${({ iconColor }) => iconColor};
`;
const BoxDescDisplay = styled.p`
  flex-grow: 1;
  font-size: 1.4rem;
  font-weight: 500;
  margin-left: 2%;
  :focus {
    outline: none;
  }
`;
