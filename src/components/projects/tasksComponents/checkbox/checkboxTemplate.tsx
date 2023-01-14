import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { addNewCheckbox } from "../../../../API/handleDocs";
import { appContext } from "../../../providers/appProvider";
import ButtonAsIcon from "../../../styled/buttonAsIcon";
import { CheckBoxEmpty, Trash } from "../../../utils/icons";
interface CheckboxTemplateProps {
  setTemplateTask: React.Dispatch<React.SetStateAction<boolean>>;
  referenceButton: React.MutableRefObject<HTMLButtonElement | null>;
}
const CheckboxTemplate: React.FC<CheckboxTemplateProps> = ({
  setTemplateTask,
  referenceButton,
}) => {
  const [checkboxName, setcheckboxName] = useState("");
  const componentRef = useRef<HTMLDivElement>(null);
  const {
    text: { textColor },
  } = useContext(appContext);
  const taskId = useParams().id;

  const handleClickOutside = (e: any) => {
    if (
      !componentRef.current?.contains(e.target) &&
      !referenceButton.current?.contains(e.target)
    ) {
      setTemplateTask(false);
    }
  };

  const createNewCheckbox = () => {
    if (checkboxName.length !== 0) addNewCheckbox(taskId!, checkboxName);
    setTemplateTask(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <ComponentBody ref={componentRef}>
      <BoxWrap>
        <Box checked={false} type="checkbox" icon={CheckBoxEmpty}></Box>
      </BoxWrap>
      <NameForm onSubmit={() => createNewCheckbox()}>
        <NameInput
          textColor={textColor}
          autoFocus={true}
          placeholder="Name of Checkbox..."
          onChange={(e) => setcheckboxName(e.target.value)}
        ></NameInput>
      </NameForm>
      <ButtonAsIcon
        src={Trash}
        size={[1, 1]}
        margin="0 2%"
        onClick={() => setTemplateTask(false)}
      ></ButtonAsIcon>
    </ComponentBody>
  );
};
export default CheckboxTemplate;
const ComponentBody = styled.div`
  display: flex;
  padding-block: 0.2rem;
  margin-bottom: 0.1rem;
  background-color: hsla(169, 77%, 88%, 1);
  border-radius: 5px;
  box-shadow: 2px 2px 4px 1px hsla(0, 0%, 0%, 0.25);
`;
const NameForm = styled.form`
  display: flex;
  align-items: center;
  flex-grow: 1;
  padding-left: 2%;
`;

const NameInput = styled.input<{ textColor: number }>`
  flex-grow: 1;
  font-size: 1.4rem;
  font-weight: 500;
  background: transparent;
  color: ${({ textColor }) => `hsla(0, 0%, ${textColor}%, 1)`};
  border: none;
  outline: none;
  ::placeholder {
    font-size: 1.4rem;
    font-weight: 500;
  }
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
`;
