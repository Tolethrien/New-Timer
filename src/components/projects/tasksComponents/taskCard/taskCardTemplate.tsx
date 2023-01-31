import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { addTask } from "../../../../API/handleDocs";
import useTheme from "../../../hooks/useTheme";
import ButtonAsIcon from "../../../custom/buttonAsIcon";
import { Trash } from "../../../utils/icons";
interface TaskCardTemplateProps {
  referenceButton: React.MutableRefObject<HTMLButtonElement | null>;
  setTemplateTask: React.Dispatch<React.SetStateAction<boolean>>;
}
const TaskCardTemplate: React.FC<TaskCardTemplateProps> = ({
  setTemplateTask,
  referenceButton,
}) => {
  const [newTaskName, setNewTaskName] = useState("");
  const componentRef = useRef<HTMLDivElement>(null);

  const {
    getColor: { itemCardColor, taskTemplateColor },
  } = useTheme();
  const projectId = useParams().id;

  const createTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    newTaskName.length > 0 && addTask(projectId!, newTaskName);
    setTemplateTask!(false);
  };

  const handleClickOutside = (e: any) => {
    if (
      !componentRef.current?.contains(e.target) &&
      !referenceButton.current?.contains(e.target)
    ) {
      setTemplateTask(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <ComponentBody ref={componentRef} bodyColor={itemCardColor}>
      <TopBar>
        <TimerTemplate bodyColor={taskTemplateColor}></TimerTemplate>
        <NameForm onSubmit={(e) => createTask(e)}>
          <NameInput
            autoFocus={true}
            placeholder="Name of Project..."
            onChange={(e) => setNewTaskName(e.target.value)}
          ></NameInput>
        </NameForm>
        <ButtonAsIcon
          src={Trash}
          size={[1.2, 1.2]}
          onClick={() => setTemplateTask(false)}
        ></ButtonAsIcon>
      </TopBar>
      <Description bodyColor={taskTemplateColor}></Description>
    </ComponentBody>
  );
};
export default TaskCardTemplate;

const ComponentBody = styled.div<{ bodyColor: string }>`
  background-color: ${({ bodyColor }) => bodyColor};
  backdrop-filter: blur(20px);

  width: 100%;
  height: fit-content;
  margin-bottom: 0.1rem;
  border-radius: 5px;
  padding-block: 1%;
  box-shadow: 0px 4px 4px hsla(0, 0%, 0%, 0.25);
`;
const TopBar = styled.div`
  height: 50%;
  display: flex;
  align-items: center;
  padding-inline: 2%;
`;
const TimerTemplate = styled.div<{ bodyColor: string }>`
  background-color: ${({ bodyColor }) => bodyColor};
  border-radius: 5px;
  padding: 0.2rem 0.2rem;
  width: 18%;
  height: 0.8rem;
`;
const NameForm = styled.form`
  display: flex;
  align-items: center;
  flex-grow: 1;
  padding-left: 2%;
`;

const NameInput = styled.input`
  width: 100%;
  font-size: 1.4rem;
  font-weight: 700;
  background: transparent;
  border: none;
  outline: none;
  color: inherit;
  ::placeholder {
    color: inherit;
  }
`;
const Description = styled.div<{ bodyColor: string }>`
  width: 80%;
  height: 1rem;
  border-radius: 5px;
  margin-left: 1%;
  background-color: ${({ bodyColor }) => bodyColor};
`;
