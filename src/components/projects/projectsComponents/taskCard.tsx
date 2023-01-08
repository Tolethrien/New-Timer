import styled from "styled-components";
import { useState } from "react";
import { TasksData } from "../../../API/getUserData";
import { useNavigate, useParams } from "react-router-dom";
import { Clock, GoTo, Trash } from "../../utils/icons";
import { addTask } from "../../../API/handleDocs";
import { ConvertToStringTime } from "../../hooks/convertToTime";
const TaskCard: React.FC<{
  task?: TasksData;
  template?: boolean;
  setAddCardMenu?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ task, template, setAddCardMenu }) => {
  const navigate = useNavigate();
  const [newTaskName, setNewTaskName] = useState("");
  const projectId = useParams().id;
  const color = 100;
  const createTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    newTaskName.length > 0 && addTask(projectId!, newTaskName);
    setNewTaskName("");
    setAddCardMenu!(false);
  };
  const tascDesc = () => {
    if (task && !task.data.desc) return " No description yet";
    return task!.data.desc.length > 45
      ? task!.data.desc.slice(0, 45) + "..."
      : task!.data.desc;
  };
  return (
    <Wrap onClick={() => !template && navigate(`../task/${task!.id}`)}>
      <TopInfo>
        <Tasks>
          <InfoBox hue={color} template={template}>
            {!template && (
              <>
                <InfoBoxImg src={Clock}></InfoBoxImg>
                <InfoBoxValue>
                  {ConvertToStringTime(task!.data.timeLeft)}
                </InfoBoxValue>
              </>
            )}
          </InfoBox>
        </Tasks>
        <Name>
          {template ? (
            <AddNewForm onSubmit={(e) => createTask(e)}>
              <AddNewInput
                autoFocus={true}
                placeholder="Name of task"
                onChange={(e) => setNewTaskName(e.target.value)}
              ></AddNewInput>
            </AddNewForm>
          ) : task && task?.data.name.length > 25 ? (
            task?.data.name.slice(0, 25) + "..."
          ) : (
            task?.data.name
          )}
        </Name>
        <GoToButton onClick={() => template && setAddCardMenu!(false)}>
          <ButtonImg src={template ? Trash : GoTo} alt="go to task"></ButtonImg>
        </GoToButton>
      </TopInfo>
      <Desc>
        {template ? <TemplateBox hue={color}></TemplateBox> : tascDesc()}
      </Desc>
    </Wrap>
  );
};
export default TaskCard;

const Wrap = styled.div`
  color: black;
  width: 100%;
  height: 45px;
  margin-top: 0.5%;
  border-radius: 5px;
  background-color: hsla(169, 77%, 88%, 1);
  box-shadow: 0px 4px 4px hsla(0, 0%, 0%, 0.25);
  cursor: pointer;
`;
const TopInfo = styled.div`
  height: 50%;
  display: flex;
`;
const Tasks = styled.div`
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Name = styled.div`
  width: 70%;
  font-weight: 600;
  font-size: 1.3rem;
`;
const AddNewForm = styled.form`
  display: flex;
  align-items: flex-start;
`;
const AddNewInput = styled.input`
  font-size: 1rem;
  background: transparent;
  border: none;
  color: hsla(0, 0%, 43%, 1);

  /* border-bottom: 2px solid grey; */
  outline: none;
`;
const GoToButton = styled.div`
  width: 10%;
  display: flex;
  justify-content: flex-end;
`;
const ButtonImg = styled.img`
  height: 100%;
  margin-right: 5%;
  margin-top: 5%;
`;

const Desc = styled.div`
  height: 50%;
  margin-left: 1%;
  font-weight: 500;
`;
const TemplateBox = styled.div<{ hue: number }>`
  width: 90%;
  height: 90%;
  border-radius: 5px;

  background-color: ${({ hue }) => `hsla(${hue}, 30%, 85%, 100%)`};
`;

const InfoBox = styled.div<{ hue: number; template: boolean | undefined }>`
  display: flex;
  background-color: ${({ hue }) => `hsla(${hue}, 30%, 85%, 100%)`};
  border-radius: 5px;
  width: fit-content;
  padding: 2px 5px;
  color: hsla(0, 0%, 43%, 1);
  ${({ template }) => template && `width: 60%;height: 60%;`}
`;

const InfoBoxImg = styled.img`
  width: 15px;
  margin-right: 5px;
  filter: invert(46%) sepia(9%) saturate(0%) hue-rotate(161deg) brightness(90%)
    contrast(97%);
`;
const InfoBoxValue = styled.p`
  font-weight: 500;
  font-size: 0.7rem;
  align-self: center;
`;
